package com.huy.airbnbserver.system.event;

import com.huy.airbnbserver.booking.BookingRepository;
import com.huy.airbnbserver.booking.BookingStatus;
import com.huy.airbnbserver.system.event.booking.*;
import com.huy.airbnbserver.system.event.ui.NotificationRefType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingEventListener {
    private static final Logger LOG = LogManager.getLogger(BookingEventListener.class);
    private final EventPublisher eventPublisher;
    private final BookingRepository bookingRepository;

    @EventListener
    @Async
    @Transactional
    public void handleHostReviewBookingEvent(HostReviewBookingEvent event) {
        var booking = event.getBooking();
        try {
            if (event.getIsConfirm()) {
                LOG.info("HOST CONFIRM BOOKING {}", booking.getId());
                bookingRepository.updateStatus(BookingStatus.CONFIRMED.toString(), booking.getId());
                eventPublisher.publishPaymentProcessedEvent(booking);
            } else {
                LOG.info("HOST REJECT BOOKING {}", booking.getId());
                bookingRepository.updateStatus(BookingStatus.REJECTED.toString(), booking.getId());
                eventPublisher.publishBookingRejectEvent(booking, "Host rejected booking");
            }
        } catch (Exception exception) {
            eventPublisher.publishBookingRejectEvent(
                    booking,
                    "Can not commit transaction due to technical issue");
            throw exception;
        }
    }

    @EventListener
    @Transactional
    public void handlePaymentProcessedEvent(PaymentProcessedEvent event) {
        var booking = event.getBooking();
        try {
            Boolean paymentSuccess = processPayment(booking.getHost_id(), booking.getIssuer_id());
            if (paymentSuccess) {
                bookingRepository.updateStatus(BookingStatus.SUCCESS.toString(), booking.getId());
                eventPublisher.publishBookingSuccessEvent(booking);
            } else {
                booking.setStatus(BookingStatus.REJECTED.toString());
                eventPublisher.publishBookingRejectEvent(
                        booking,
                        "Payment failed, not enough balance");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            eventPublisher.publishBookingRejectEvent(
                    booking,
                    "Payment process interrupted");
            throw new RuntimeException("Payment process interrupted", e);
        } catch (Exception exception) {
            eventPublisher.publishBookingRejectEvent(
                    booking,
                    "Can not commit transaction due to technical issue");
            throw exception;
        }
    }


    @EventListener
    @Async
    public void handleBookingSuccessEvent(BookingSuccessEvent event) {
        var booking = event.getBooking();
        LOG.info("Booking {} successful", booking.getId());
        eventPublisher.publishSendingBookingEmailEvent(booking);
        eventPublisher.publishSendingNotificationEvent(
                booking.getIssuer_id(),
                booking.getId(),
                "Your booking has been confirmed from host, click for me detail!",
                NotificationRefType.BOOKING.name());
    }

    @EventListener
    @Async
    public void handleBookingRejectEvent(BookingRejectEvent event) {
        var booking = event.getBooking();
        LOG.info("Booking {} rejected:, Reason: {}" ,booking.getId(),event.getReason());
        eventPublisher.publishSendingNotificationEvent(
                booking.getIssuer_id(),
                booking.getId(),
                "Your booking has failed due to these reason: "+event.getReason()+". Please try to plan your book again!",
                NotificationRefType.BOOKING.name()
        );
    }

    // mocking the payment processing flow
    private Boolean processPayment(Integer hostId, Integer userId) throws InterruptedException {
        Thread.sleep(5000);
        return true;
    }

}
