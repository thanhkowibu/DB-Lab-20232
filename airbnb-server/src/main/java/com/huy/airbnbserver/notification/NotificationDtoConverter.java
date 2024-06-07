package com.huy.airbnbserver.notification;

import com.huy.airbnbserver.notification.model.Notification;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class NotificationDtoConverter implements Converter<Notification, NotificationDto> {
    @Override
    public NotificationDto convert(Notification source) {
        return new NotificationDto(
                source.getIsRead(),
                source.getMessage(),
                source.getCreatedAt(),
                source.getType(),
                source.getReferenceId(),
                source.getUser().getId()
        );
    };
}
