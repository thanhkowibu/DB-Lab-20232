package com.huy.airbnbserver.system.event;

import com.huy.airbnbserver.email.EmailService;
import com.huy.airbnbserver.email.EmailTemplateName;
import com.huy.airbnbserver.notification.NotificationController;
import com.huy.airbnbserver.system.event.ui.SendingBookingEmailEvent;
import com.huy.airbnbserver.system.event.ui.SendingNotificationEvent;
import com.huy.airbnbserver.user.UserService;
import com.huy.airbnbserver.user.dto.NotificationPreferenceDto;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class CommonEventListener {
    private static final Logger LOG = LogManager.getLogger(CommonEventListener.class);
    private final EmailService emailService;
    private final NotificationController notificationController;
    private final UserService userService;

    @EventListener
    @Async
    public void handleSendingBookingEmailEvent(SendingBookingEmailEvent event) {
        var bookingDetail = event.getBookingDetail();
        try {
            LOG.info("sending email confirm email to {}", bookingDetail.getIssuer_email());
            emailService.sendBookingEmail(
                    bookingDetail.getIssuer_email(),
                    bookingDetail.getIssuer_firstname(),
                    EmailTemplateName.BOOKING_SUCCESS,
                    bookingDetail,
                    "New Booking Confirmed"
            );
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @EventListener
    @Async
    public void handleSendingNotificationEvent(SendingNotificationEvent event) {
        NotificationPreferenceDto notificationPreferences = userService.
                getNotificationPreference(event.getReceiverID());
        if (notificationPreferences.notifyOnHostedPropertyBooked() && event.getReferencesObjectType().equals("PROPERTY")) {
            LOG.info("publish message: {}, receiverID: {}, referenceId: {}",
                    event.getMessage(),
                    event.getReceiverID(),
                    event.getReferencesObjectID());
            notificationController.sendNotification(event);
        }

        if (notificationPreferences.notifyOnBookingStatusChange() && event.getReferencesObjectType().equals("BOOKING")) {
            LOG.info("publish message: {}, receiverID: {}, referenceId: {}",
                    event.getMessage(),
                    event.getReceiverID(),
                    event.getReferencesObjectID());
            notificationController.sendNotification(event);
        }

        if (event.getReferencesObjectType().equals("USER")) {
            notificationController.sendNotification(event);
        }

    }
}
