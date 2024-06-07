package com.huy.airbnbserver.admin;

import com.github.javafaker.Faker;
import com.huy.airbnbserver.booking.Booking;
import com.huy.airbnbserver.booking.BookingRepository;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.PropertyRepository;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.properties.enm.Category;
import com.huy.airbnbserver.properties.enm.Tag;
import com.huy.airbnbserver.review.Review;
import com.huy.airbnbserver.review.ReviewRepository;
import com.huy.airbnbserver.user.UserRepository;
import com.huy.airbnbserver.user.model.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class FakerService {
    private final Faker faker;
    private final BookingRepository bookingRepository;
    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    @Transactional
    public void generateBooking() {
        // Create a new Booking object
        Booking fakeBooking = new Booking();

        // Generate random check-in and check-out dates
        LocalDate checkInLocalDate = faker.date().past(365, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate checkOutLocalDate = checkInLocalDate.plusDays(faker.number().numberBetween(1, 15));

        // Convert LocalDate to Date
        Date checkInDate = Date.from(checkInLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date checkOutDate = Date.from(checkOutLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        fakeBooking.setCheckInDate(checkInDate);
        fakeBooking.setCheckOutDate(checkOutDate);
        fakeBooking.setStatus("CHECK_OUT");
        fakeBooking.setConfirm(true);
        fakeBooking.setIsCheckedOut(true);
        User user = userRepository.findById(2).orElseThrow(
                () -> new RuntimeException("asd")
        );
        fakeBooking.setUser(user);

        // Generate random number of adults, children, and pets
        fakeBooking.setNumAlduts(1);
        fakeBooking.setNumChildrens(faker.number().numberBetween(0, 1));
        fakeBooking.setNumPets(faker.number().numberBetween(0, 1));

        // Generate random nightly fee, cleaning fee, and service fee
        fakeBooking.setNightlyFee(BigDecimal.valueOf(faker.number().randomDouble(2, 50, 300)));
        fakeBooking.setCleanFee(BigDecimal.valueOf(faker.number().randomDouble(2, 0, 100)));
        fakeBooking.setServiceFee(BigDecimal.valueOf(faker.number().randomDouble(2, 10, 50)));

        List<Long> propertyIds = propertyRepository.findAll()
                .stream()
                .map(Property::getId)
                .toList();
        Long propertyId = propertyIds.get(faker.random().nextInt(propertyIds.size()));
        Property property = propertyRepository.findById(propertyId).orElseThrow(
                () -> new RuntimeException("")
        );


        fakeBooking.addProperty(property);

        Review fakeReview = new Review();

        String content = faker.lorem().paragraph(30);
        fakeReview.setContent(content);

        // Generate a random rating between 1 and 5
        Integer rating = faker.number().numberBetween(1, 6);
        fakeReview.setRating(rating);
        fakeReview.setIs_recommend(faker.random().nextBoolean());

        fakeBooking.addReview(fakeReview);

        bookingRepository.save(fakeBooking);
    }

    @Transactional
    public void generateProperty() throws IOException {
        Property fakeProperty = new Property();

        // Generate random property details
        fakeProperty.setNightlyPrice(BigDecimal.valueOf(faker.number().randomDouble(2, 50, 300)));
        fakeProperty.setName(faker.address().streetName());
        fakeProperty.setMaxGuests(faker.number().numberBetween(1, 10));
        fakeProperty.setNumBeds(faker.number().numberBetween(1, 5));
        fakeProperty.setNumBedrooms(faker.number().numberBetween(1, 5));
        fakeProperty.setNumBathrooms(faker.number().numberBetween(1, 5));
        fakeProperty.setLongitude(BigDecimal.valueOf(Double.parseDouble(faker.address().longitude())));
        fakeProperty.setLatitude(BigDecimal.valueOf(Double.parseDouble(faker.address().latitude())));
        fakeProperty.setDescription(faker.lorem().paragraph(3));
        fakeProperty.setAddressLine(faker.address().fullAddress());

        // Generate random categories
        List<Category> allCategories = Arrays.asList(Category.values());
        Collections.shuffle(allCategories);
        Set<Category> categories = new HashSet<>(allCategories.subList(0, faker.number().numberBetween(1, allCategories.size())));
        fakeProperty.setCategories(categories);

        // Generate a random tag
        Tag tag = faker.options().option(Tag.class);
        fakeProperty.setTag(tag);


        List<MultipartFile> fakeImage = new ArrayList<>();
        int length = faker.number().numberBetween(3, 6);
        for (int i = 0; i < length; i++) {
            fakeImage.add(getMultipartFile(getFilepath(faker.number().numberBetween(1,37))));
        }

        // Save the Property using the repository
        propertyService.save(fakeProperty, 2, fakeImage);
    }

    private static MultipartFile getMultipartFile(String filePath) throws IOException {
        File file = new File(filePath);
        byte[] content = Files.readAllBytes(file.toPath());

        return new CustomMultipartFile(
                file.getName(),
                file.getName(),
                Files.probeContentType(file.toPath()),
                content
        );
    }

    private static String getFilepath(Integer index) {
        return  "C:/Users/PC/Downloads/house-pictures-2019/170159165_"+index+".jpg";
    }
}
