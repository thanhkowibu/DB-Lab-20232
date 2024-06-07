package com.huy.airbnbserver.user.converter;

import com.huy.airbnbserver.user.model.User;
import com.huy.airbnbserver.user.dto.UserDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserDtoToUserConverter implements Converter<UserDto, User> {
    @Override
    public User convert(UserDto source) {
        User newUser = new User();
        newUser.setFirstname(source.firstname());
        newUser.setLastname(source.lastname());
        newUser.setEmail(source.email());

        return newUser;
    }
}

