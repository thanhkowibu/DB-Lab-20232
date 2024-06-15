package com.huy.airbnbserver.user.converter;

import com.huy.airbnbserver.image.converter.ImageToImageDtoConverter;
import com.huy.airbnbserver.user.dto.UserDetailDto;
import com.huy.airbnbserver.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class UserToUserDetailDtoConverter implements Converter<User, UserDetailDto> {
    private final ImageToImageDtoConverter imageToImageDtoConverter;

    @Override
    public UserDetailDto convert(User source) {
        return new UserDetailDto(
                source.getId(),
                source.getFirstname(),
                source.getLastname(),
                source.getEmail(),
                source.isEnabled(),
                source.isBanned(),
                source.getCreatedAt(),
                Arrays.asList(source.getRoles().split(" ")),
                source.getPhoneNumber(),
                source.getGender(),
                source.getDob(),
                source.getAvatar() != null
                        ? imageToImageDtoConverter.convert(source.getAvatar())
                        : null
        );
    }
}
