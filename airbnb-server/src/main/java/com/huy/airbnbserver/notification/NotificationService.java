package com.huy.airbnbserver.notification;

import com.huy.airbnbserver.notification.model.Notification;
import com.huy.airbnbserver.system.event.ui.SendingNotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public void save(SendingNotificationEvent event) {
        notificationRepository.saveNew(
                event.getReceiverID(),
                event.getMessage(),
                event.getReferencesObjectID(),
                event.getReferencesObjectType());
    }

    public void read(Integer userId) {
        notificationRepository.read(userId);
    }

    public List<Notification> findAll(Integer userId) {
        return notificationRepository.findAllByUserId(userId);
    }
}
