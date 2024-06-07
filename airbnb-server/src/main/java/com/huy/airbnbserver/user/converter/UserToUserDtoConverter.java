package com.huy.airbnbserver.user.converter;

import com.huy.airbnbserver.image.converter.ImageToImageDtoConverter;
import com.huy.airbnbserver.user.model.User;
import com.huy.airbnbserver.user.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserToUserDtoConverter implements Converter<User, UserDto> {
    private final ImageToImageDtoConverter imageToImageDtoConverter;

    @Override
    public UserDto convert(User source) {
        return new UserDto(
                source.getId(),
                source.getFirstname(),
                source.getLastname(),
                source.getEmail(),
                source.isEnabled(),
                source.getCreatedAt(),
                source.getUpdatedAt(),
                source.getAvatar() != null
                        ? imageToImageDtoConverter.convert(source.getAvatar())
                        : null
        );
    }
}
