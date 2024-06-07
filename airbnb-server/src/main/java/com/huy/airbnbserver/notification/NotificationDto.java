package com.huy.airbnbserver.notification;

import java.util.Date;

public record NotificationDto(
        Boolean is_read,
        String message,
        Date created_at,
        String type,
        Long object_ref_id,
        Integer receiver_id

) {
}
