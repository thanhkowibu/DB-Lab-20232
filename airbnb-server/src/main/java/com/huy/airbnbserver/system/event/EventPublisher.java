package com.huy.airbnbserver.system.event;

import com.huy.airbnbserver.booking.dto.BookingDetail;
import com.huy.airbnbserver.system.event.booking.*;
import com.huy.airbnbserver.system.event.ui.SendingBookingEmailEvent;
import com.huy.airbnbserver.system.event.ui.SendingNotificationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {
    private final ApplicationEventPublisher applicationEventPublisher;

    public void publishHostReviewBookingEvent(BookingDetail booking, Boolean isConfirm) {
        HostReviewBookingEvent e = new HostReviewBookingEvent(booking, isConfirm);
        applicationEventPublisher.publishEvent(e);
    }

    public void publishPaymentProcessedEvent(BookingDetail booking) {
        PaymentProcessedEvent e = new PaymentProcessedEvent(booking);
        applicationEventPublisher.publishEvent(e);
    }

    public void publishBookingSuccessEvent(BookingDetail booking) {
        BookingSuccessEvent e = new BookingSuccessEvent(booking);
        applicationEventPublisher.publishEvent(e);
    }

    public void publishBookingRejectEvent(BookingDetail booking, String reason) {
        BookingRejectEvent e = new BookingRejectEvent(booking, reason);
        applicationEventPublisher.publishEvent(e);
    }

    public void publishSendingNotificationEvent(Integer receiverID, Long referencesObjectID, String message, String type) {
        SendingNotificationEvent e = new SendingNotificationEvent(type, receiverID, referencesObjectID, message);
        applicationEventPublisher.publishEvent(e);
    }

    public void publishSendingBookingEmailEvent(BookingDetail bookingDetail) {
        SendingBookingEmailEvent e = new SendingBookingEmailEvent(bookingDetail);
        applicationEventPublisher.publishEvent(e);
    }
}
