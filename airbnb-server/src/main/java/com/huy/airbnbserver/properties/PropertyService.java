package com.huy.airbnbserver.properties;

import com.huy.airbnbserver.AWS.AWSBucketService;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageDto;
import com.huy.airbnbserver.image.ImageInstruction;
import com.huy.airbnbserver.image.ImageRepository;
import com.huy.airbnbserver.properties.enm.*;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjection;
import com.huy.airbnbserver.system.common.SortDirection;
import com.huy.airbnbserver.system.exception.EntityAlreadyExistException;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.user.model.User;
import com.huy.airbnbserver.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final AWSBucketService awsBucketService;
    private final NativePropertyRepository nativePropertyRepository;
    private final ImageRepository imageRepository;

    public Property findById(Long id) {
        List<Object[]> res = propertyRepository.findDetailByIdNative(id);
        if (res.isEmpty()) {
            throw new ObjectNotFoundException("property", id);
        }

        return mapToProperty(res.get(0));
    }

    public void existCheck(Long id) {
        propertyRepository.findById(id).orElseThrow(
                () -> new ObjectNotFoundException("property", id)
        );
    }

    public Property findByIdLazy(Long id) {
        return propertyRepository.findById(id).orElseThrow(
                () -> new ObjectNotFoundException("property", id)
        );
    }

    @Transactional
    public void save(Property property, Integer userId, List<MultipartFile> images) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("user", userId));
        List<Image> savedImages = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                var saveImage = awsBucketService.uploadFile(image, property);
                savedImages.add(saveImage);
            }
        }

        property.setHost(user);
        property.setImages(savedImages);
        try {
            propertyRepository.save(property);
        } catch (Exception e) {
            for (Image image : savedImages) {
                awsBucketService.deleteFile(image);
            }
            throw e;
        }

    }

    @Transactional
    public void update(Long propertyId,
                       Property property,
                       @Nullable List<MultipartFile> images,
                       List<ImageInstruction> imageInstructions) {
        Property savedProperty = propertyRepository.findDetailById(propertyId).orElseThrow(
                () -> new ObjectNotFoundException("property", propertyId)
        );

        List<Image> savedImages = savedProperty.getImages();
        List<Image> newlySavedImages = new ArrayList<>();
        List<Image> imagesToMarkForDeletion = new ArrayList<>();
        try {
            if (images != null) {
                for (MultipartFile image : images) {
                    Image savedImage = awsBucketService.uploadFile(image, savedProperty);
                    savedImages.add(savedImage);
                    newlySavedImages.add(savedImage);
                }
            }

            for (Image image : new ArrayList<>(savedImages)) {
                if (imageInstructions
                        .stream()
                        .anyMatch(imageInstruction ->
                                imageInstruction.is_remove() && imageInstruction.name().equals(image.getName()))
                ) {
                    imagesToMarkForDeletion.add(image);
                    savedImages.remove(image);
                    imageRepository.delete(image);
                }
            }

            for (Category category : new HashSet<>(savedProperty.getCategories())) {
                savedProperty.removeCategory(category);
            }

            for (Category category : property.getCategories()) {
                savedProperty.addCategory(category);
            }

            savedProperty.setImages(savedImages);
            savedProperty.setTag(property.getTag());
            savedProperty.setName(property.getName());
            savedProperty.setNightlyPrice(property.getNightlyPrice());
            savedProperty.setMaxGuests(property.getMaxGuests());
            savedProperty.setNumBeds(property.getNumBeds());
            savedProperty.setNumBedrooms(property.getNumBedrooms());
            savedProperty.setNumBathrooms(property.getNumBathrooms());
            savedProperty.setLongitude(property.getLongitude());
            savedProperty.setLatitude(property.getLatitude());
            savedProperty.setDescription(property.getDescription());
            savedProperty.setAddressLine(property.getAddressLine());

            propertyRepository.save(savedProperty);
            // Commit Firebase changes only after successful database transaction
            for (Image image : imagesToMarkForDeletion) {
                awsBucketService.deleteFile(image);
            }
        } catch (Exception e) {
            // Rollback Firebase actions if saving the property fails
            for (Image image : newlySavedImages) {
                awsBucketService.deleteFile(image);
            }
        }
    }


    @Transactional
    public void delete(Long id, Integer userId) throws IOException {
        var deletedProperty = propertyRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("property", id));

        if (!userId.equals(deletedProperty.getHost().getId()) && userId != -1) {
            throw new AccessDeniedException("This user dont have access to this resource");
        }

        for (Image image: deletedProperty.getImages()){
            awsBucketService.deleteFile(image);
        }

        for (User user : deletedProperty.getLikedByUsers()) {
            user.getLikedProperty().remove(deletedProperty);
        }

        propertyRepository.delete(deletedProperty);
    }

    @Transactional
    public void like(Long id, Integer userId) {
        existCheck(id);

        if (!propertyRepository.getLikedDetailsOfUserIdAndPropertyId(userId, id).isEmpty()) {
            throw new EntityAlreadyExistException("Liked Entity Associated with this userId and propertyId");
        }

        propertyRepository.userLikeProperty(id, userId);
    }

    @Transactional
    public void unlike(Long id, Integer userId) {
        if (propertyRepository.getLikedDetailsOfUserIdAndPropertyId(userId, id).isEmpty()) {
            throw new ObjectNotFoundException("liked entity", "userId: " + userId + " propertyId: " + id);
        }

        propertyRepository.userUnlikeProperty(id, userId);
    }

    public List<PropertyOverviewProjection> getAllLikedPropertiedByUserWithUserId(Integer userId, long limit, long offset) {
        return propertyRepository
                .getLikedByUserId(userId, limit, offset)
                .stream()
                .map(this::mapToPropertyOverviewProjection)
                .toList();
    }


    public List<PropertyOverviewProjection> findALlByUserId(Integer userId, long limit, long offset) {
        return propertyRepository.findAllByUserId(userId, limit, offset)
                .stream()
                .map(this::mapToPropertyOverviewProjection)
                .toList();
    }

    public List<PropertyOverviewProjection> findTopRatingPropertiesForHost(Integer userId) {
        return propertyRepository.findTopRatingPropertyFromHost(userId)
                .stream()
                .map(this::mapToPropertyOverviewProjection)
                .toList();
    }

    public Long getTotalProperty(Category category1,
                                 Category category2,
                                 Tag tag,
                                 Area area,
                                 Double minNightlyPrice,
                                 Double maxNightlyPrice,
                                 Integer minBeds,
                                 Integer minBathrooms,
                                 Integer minBedrooms,
                                 Integer maxGuest) {
        var minLongitude = area != null ? area.getMinLongitude() : null;
        var maxLongitude = area != null ? area.getMaxLongitude() : null;
        var minLatitude = area != null ? area.getMinLatitude() : null;
        var maxLatitude = area != null ? area.getMaxLatitude() : null;

        String _category1 = category1 == null ? null : category1.name();
        String _category2 = category2 == null ? null : category2.name();
        String _tag = tag == null ? null : tag.name();

        return propertyRepository.countAll(
                _category1,
                _category2,
                _tag,
                area,
                minLongitude,
                maxLongitude,
                minLatitude,
                maxLatitude,
                minNightlyPrice,
                maxNightlyPrice,
                minBeds,
                minBathrooms,
                minBedrooms,
                maxGuest
        );
    }

    public Long getTotalLikedByUserId(Integer userId) {
        return propertyRepository.countAllLikedForUserId(userId);
    }

    public Long getTotalByUserId(Integer userId) {
        return propertyRepository.countAllForUserId(userId);
    }

    public List<PropertyOverviewProjection> findAll(
            Category category1,
            Category category2,
            Tag tag,
            Area area,
            Double minNightlyPrice,
            Double maxNightlyPrice,
            Integer minBeds,
            Integer minBathrooms,
            Integer minBedrooms,
            Integer maxGuest,
            long limit,
            long offset,
            SortColumn sortColumn,
            SortDirection sortDirection
    ) {
        var minLongitude = area != null ? area.getMinLongitude() : null;
        var maxLongitude = area != null ? area.getMaxLongitude() : null;
        var minLatitude = area != null ? area.getMinLatitude() : null;
        var maxLatitude = area != null ? area.getMaxLatitude() : null;

        String _category1 = category1 == null ? null : category1.name();
        String _category2 = category2 == null ? null : category2.name();
        String _tag = tag == null ? null : tag.name();

        List<Object[]> results = nativePropertyRepository.findAllNative(
                sortColumn.getName(),
                sortDirection.name(),
                _category1,
                _category2,
                _tag,
                area,
                minLongitude,
                maxLongitude,
                minLatitude,
                maxLatitude,
                minNightlyPrice,
                maxNightlyPrice,
                minBeds,
                minBathrooms,
                minBedrooms,
                maxGuest,
                limit,
                offset
        );

        return results.stream().map(this::mapToPropertyOverviewProjection).toList();
    }

    private PropertyOverviewProjection mapToPropertyOverviewProjection(Object[] result) {
        return new PropertyOverviewProjection() {
            @Override
            public Long getId() {
                return ((Number) result[0]).longValue();
            }

            @Override
            public BigDecimal getNightlyPrice() {
                return (BigDecimal) result[1];
            }

            @Override
            public String getName() {
                return (String) result[2];
            }

            @Override
            public BigDecimal getLongitude() {
                return ((BigDecimal) result[3]);
            }

            @Override
            public BigDecimal getLatitude() {
                return (BigDecimal) result[4];
            }

            @Override
            public Date getCreatedAt() {
                return (Date) result[5];
            }

            @Override
            public Date getUpdatedAt() {
                return (Date) result[6];
            }

            @Override
            public Integer getNumBeds() {
                return (Integer) result[7];
            }

            @Override
            public List<ImageDto> getImages() {
                String[] imageIds;
                String[] imageUrls;
                String[] imageNames;
                if (result[8] != null && result[9] != null && result[10] != null) {
                    imageIds = ((String) result[8]).split(",");
                    imageUrls = ((String) result[9]).split(",");
                    imageNames = ((String) result[10]).split(",");
                } else {
                    imageIds = new String[0];
                    imageUrls = new String[0];
                    imageNames = new String[0];
                }
                List<ImageDto> images = new ArrayList<>();
                for (int i = 0; i < imageIds.length; i++) {
                    ImageDto image = new ImageDto(
                            imageNames[i],
                            imageUrls[i]

                    );

                    images.add(image);
                }
                return images;
            }

            @Override
            public BigDecimal getAverageRating() {
                return (BigDecimal) result[11];
            }
        };
    }

    private Property mapToProperty(Object[] result) {
        Property property = new Property();
        property.setId((Long) result[0]);
        property.setNightlyPrice((BigDecimal) result[1]);
        property.setName((String) result[2]);
        property.setMaxGuests((Integer) result[3]);
        property.setNumBeds((Integer) result[4]);
        property.setNumBedrooms((Integer) result[5]);
        property.setNumBathrooms((Integer) result[6]);
        property.setLongitude((BigDecimal) result[7]);
        property.setLatitude((BigDecimal) result[8]);
        property.setDescription((String) result[9]);
        property.setAddressLine((String) result[10]);
        property.setCreatedAt((Date) result[11]);
        property.setUpdatedAt((Date) result[12]);

        User host = new User();
        host.setFirstname((String) result[13]);
        host.setLastname((String) result[14]);
        host.setId((Integer) result[22]);
        host.setEmail((String) result[23]);
        host.setEnabled((boolean) result[24]);
        host.setCreatedAt((Date) result[25]);
        host.setUpdatedAt((Date) result[26]);

        if (result[15] != null) {
            Image avatar = new Image();
            avatar.setUrl((String) result[15]);
            avatar.setName((String) result[16]);
            host.setAvatar(avatar);
        }
        property.setHost(host);

        String[] imageIds;
        String[] imageUrls;
        String[] imageNames;
        if (result[17] != null) {
            imageIds = ((String) result[17]).split(",");
            imageUrls = ((String) result[18]).split(",");
            imageNames = ((String) result[19]).split(",");
        } else {
            imageIds = new String[0];
            imageUrls = new String[0];
            imageNames = new String[0];
        }
        for (int i = 0; i < imageIds.length; i++) {
            Image image = new Image();
            image.setUrl(imageUrls[i]);
            image.setId(Long.parseLong(imageIds[i]));
            image.setName(imageNames[i]);
            property.getImages().add(image);
        }

        String[] categories;
        if (result[20] != null) {
            categories = ((String) result[20]).split(",");
        } else {
            categories = new String[0];
        }
        Set<Category> categorySet = Arrays.stream(categories)
                .map(Category::valueOf)
                .collect(Collectors.toSet());
        property.setCategories(categorySet);

        if (result[21] != null) {
            property.setTag(Tag.valueOf((String) result[21]));
        } else {
            property.setTag(null);
        }
        return property;
    }


    @Transactional
    public void saveMock(Property property, Integer userId, List<Image> images) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("user", userId));


        property.setHost(user);
        property.setImages(images);
        propertyRepository.save(property);
    }
}
