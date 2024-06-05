package com.huy.airbnbserver.user;

import com.huy.airbnbserver.AWS.AWSBucketService;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageRepository;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.system.exception.UnprocessableEntityException;
import com.huy.airbnbserver.user.dto.UserDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AWSBucketService awsBucketService;
    private final ImageRepository imageRepository;

    public List<User> findAll() {
        return userRepository.findAllEagerAvatar();
    }

    public User findById(Integer id) {
        return userRepository
                .findByIdEager(id)
                .orElseThrow(()->new ObjectNotFoundException("user", id));
    }


    public User update(Integer userId, UserDto update){
        var oldUser = userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        oldUser.setFirstname(update.firstname());
        oldUser.setLastname(update.lastname());

        return userRepository.save(oldUser);
    }

    @Transactional
    public void assignAvatar(Integer id, List<MultipartFile> files) throws IOException {
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
}
