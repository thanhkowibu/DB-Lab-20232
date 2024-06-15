package com.huy.airbnbserver.user;

import com.huy.airbnbserver.AWS.AWSBucketService;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageRepository;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.system.exception.UnprocessableEntityException;
import com.huy.airbnbserver.user.dto.NotificationPreferenceDto;
import com.huy.airbnbserver.user.dto.UserDetailDto;
import com.huy.airbnbserver.user.dto.UserDto;
import com.huy.airbnbserver.user.model.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AWSBucketService awsBucketService;
    private final ImageRepository imageRepository;

    public List<User> findAll(long page, long pagesize) {
        Pageable pageable = PageRequest.of((int) page - 1, (int) pagesize);
        return userRepository.findAllEagerAvatar(pageable);
    }

    public User findById(Integer id) {
        return userRepository
                .findByIdEager(id)
                .orElseThrow(()->new ObjectNotFoundException("user", id));
    }

    public Long getTotal() {
        return userRepository.getTotalCount();
    }


    @Transactional
    public void update(Integer userId, UserDetailDto update){
        var oldUser = userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        oldUser.setFirstname(update.firstname());
        oldUser.setLastname(update.lastname());
        oldUser.setPhoneNumber(update.phone_number());
        oldUser.setGender(update.gender());
        oldUser.setDob(update.dob());

        userRepository.save(oldUser);
    }

    @Transactional
    public Image assignAvatar(Integer id, List<MultipartFile> files) throws IOException {
        var user = userRepository.findById(id).orElseThrow(()->new ObjectNotFoundException("user", id));

        Image preAvatar = user.getAvatar();
        Image newImage = awsBucketService.uploadFile(files.get(0), null);

        try {
            user.setAvatar(newImage);
            userRepository.save(user);
            if (preAvatar != null) {
                imageRepository.delete(preAvatar);
                awsBucketService.deleteFile(preAvatar);
            }
        } catch (Exception exception) {
            awsBucketService.deleteFile(newImage);

            throw exception;
        }

        return newImage;
    }

    @Transactional
    public void banUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ObjectNotFoundException("user", id)
        );
        if (user.getRoles().contains("admin")) {
            throw new UnprocessableEntityException("Can not ban user with admin roles");
        }
        if (user.isBanned()) {
            throw new UnprocessableEntityException("This user has already been banned");
        }
        user.setBanned(true);
        userRepository.save(user);
    }

    @Transactional
    public void unbanUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ObjectNotFoundException("user", id)
        );
        if (user.getRoles().contains("admin")) {
            throw new UnprocessableEntityException("Can not ban user with admin roles");
        }
        if (!user.isBanned()) {
            throw new UnprocessableEntityException("This user has not been banned yet");
        }
        user.setBanned(false);
        userRepository.save(user);
    }

    @Transactional
    public void updateNotificationPreference(NotificationPreferenceDto dto, Integer userId) {
        userRepository.updateNotificationPreference(
                dto.notifyOnBookingStatusChange(),
                dto.notifyOnHostedPropertyLike(),
                dto.notifyOnHostedPropertyBooked(),
                dto.notifyOnHostedPropertyRating(),
                dto.notifyOnSpecialOffers(),
                userId
        );
    }

    public NotificationPreferenceDto getNotificationPreference(Integer userId) {
        List<Object[]> q = userRepository.getNotificationPreference(userId);
        if (q.isEmpty()) {
            throw new ObjectNotFoundException("preference for user", userId);
        }

        Object[] res = q.get(0);

        return new NotificationPreferenceDto(
                (Boolean) res[0],
                (Boolean) res[1],
                (Boolean) res[2],
                (Boolean) res[3],
                (Boolean) res[4]
        );
    }
}
