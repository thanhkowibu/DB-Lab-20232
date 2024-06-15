package com.huy.airbnbserver.booking;

import com.huy.airbnbserver.booking.dto.BookingDetail;
import com.huy.airbnbserver.booking.dto.BookingDto;
import com.huy.airbnbserver.booking.dto.BookingLogProjection;
import com.huy.airbnbserver.properties.PropertyRepository;
import com.huy.airbnbserver.system.Utils;
import com.huy.airbnbserver.system.event.EventPublisher;
import com.huy.airbnbserver.system.event.ui.NotificationRefType;
import com.huy.airbnbserver.system.exception.InvalidDateArgumentException;
import com.huy.airbnbserver.system.exception.NotModifiedException;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.user.UserRepository;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final EventPublisher eventPublisher;
    private static final Logger LOG = LogManager.getLogger(BookingService.class);

    @Transactional
    public Booking save(Booking booking, Integer userId, Long propertyId) {
        var user = userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        var property = propertyRepository.findById(propertyId).orElseThrow(()->new ObjectNotFoundException("property", propertyId));


        booking.addUser(user);
        booking.addProperty(property);
        booking.setConfirm(false);
        booking.setStatus(BookingStatus.PENDING.toString());
        booking.setIsCheckedOut(false);

        var newBooking = bookingRepository.save(booking);
        bookingRepository.log(BookingStatus.PENDING.toString(), newBooking.getId(), BookingLogDes.CREATED.getDescription());
        eventPublisher.publishSendingNotificationEvent(
                property.getHost().getId(),
                propertyId,
                "Your property has a new booking! click to see in more detail.",
                NotificationRefType.PROPERTY.name()
        );
        return newBooking;
    }

    @Transactional(readOnly = true)
    public List<BookingDetail> getAllBookingByUserId(Integer userId, long limit, long offset) {
        userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        return bookingRepository.findByUserId(userId, limit, offset).stream().map(this::mapToBookingDetail).toList();
    }

    public List<BookingDetail> getAllBookingByPropertyId(Long propertyId, Integer userId, long limit, long offset) {
        var property = propertyRepository
                .findById(propertyId)
                .orElseThrow(()->new ObjectNotFoundException("property", propertyId));
        if (!property.getHost().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied for this user");
        }
        return bookingRepository.findByPropertyId(propertyId, limit, offset).stream().map(this::mapToBookingDetail).toList();
    }

    public List<BookingDetail> getAllBookingByHostId(Integer hostId,String filter, long limit, long offset) {
        return bookingRepository.findByHostId(hostId,filter, limit, offset).stream().map(this::mapToBookingDetail).toList();
    }

    public Long getAllBookingByUserIdCount(Integer userId) {
        return bookingRepository.findTotalByUserId(userId);
    }

    public Long getAllBookingByPropertyIdCount(Long propertyId) {
        return bookingRepository.getTotalBookingByPropertyId(propertyId);
    }

    public Long getAllBookingByHostIdCount(Integer hostId, String filter) {
        return bookingRepository.getTotalBookingByHostId(hostId, filter);
    }

    public BookingDetail findBookingDetail(Long id) {
        List<Object[]> res = bookingRepository.findDetailById(id);
        if (res.isEmpty()) {
            throw new ObjectNotFoundException("booking", id);
        }

        return mapToBookingDetail(res.get(0));
    }

    public List<BookingLogProjection> findBookingLog(Long id) {
        return bookingRepository.getLog(id);
    }

    private BookingDetail mapToBookingDetail(Object[] res) {
        BookingDetail bookingDetail = new BookingDetail();

        bookingDetail.setId((Long) res[0]);
        bookingDetail.setCheck_in_date((Date) res[1]);
        bookingDetail.setCheck_out_date((Date) res[2]);
        bookingDetail.setCreated_at((Date) res[3]);
        bookingDetail.setIs_confirm((Boolean) res[4]);
        bookingDetail.setNightly_fee((BigDecimal) res[5]);
        bookingDetail.setClean_fee((BigDecimal) res[6]);
        bookingDetail.setService_fee((BigDecimal) res[7]);
        bookingDetail.setNum_alduts((Integer) res[8]);
        bookingDetail.setNum_childrens((Integer) res[9]);
        bookingDetail.setNum_pets((Integer) res[10]);
        bookingDetail.setStatus((String) res[11]);
        bookingDetail.setIssuer_id((Integer) res[12]);
        bookingDetail.setHost_id((Integer) res[13]);
        bookingDetail.setProperty_id((Long) res[14]);
        bookingDetail.setNum_guests((Long) res[15]);
        bookingDetail.setTotal_fee((BigDecimal) res[16]);
        bookingDetail.setIssuer_email((String) res[17]);
        bookingDetail.setIssuer_firstname((String) res[18]);
        bookingDetail.setIs_checked_out((Boolean) res[19]);
        bookingDetail.setLongitude((BigDecimal) res[20]);
        bookingDetail.setLatitude((BigDecimal) res[21]);
        bookingDetail.setProperty_name((String) res[22]);
        bookingDetail.setBooking_preview_img((String) res[23]);
        bookingDetail.setIs_rated((Long) res[24] == 1L);

        return bookingDetail;
    }

    @Transactional
    public void reject(Long id, Integer userId) {
        var rejectedBooking = findBookingDetail(id);

        if (!userId.equals(rejectedBooking.getHost_id())) {
            throw new AccessDeniedException("Access denied for this user");
        }

        if (rejectedBooking.getIs_confirm()) {
            throw new NotModifiedException("This booking has already been confirmed");
        }

        if (!rejectedBooking.getStatus().equals(BookingStatus.PENDING.toString())) {
            throw new NotModifiedException("This booking has already been review");
        }

        eventPublisher.publishHostReviewBookingEvent(rejectedBooking, false);
    }

    @Transactional
    public void confirm(Long id, Integer userId) {
        var confirmBooking = findBookingDetail(id);
        if (!userId.equals(confirmBooking.getHost_id())) {
            throw new AccessDeniedException("Access denied for this user");
        }

        if (confirmBooking.getIs_confirm()) {
            throw new NotModifiedException("This booking has already been confirmed");
        }

        eventPublisher.publishHostReviewBookingEvent(confirmBooking, true);
    }

    @Transactional
    public void handleHostConfirmationForCheckOut(Long bookingId, boolean isCheckOut, Integer hostId) {
        BookingDetail bookingDetail = findBookingDetail(bookingId);

        if (!bookingDetail.getHost_id().equals(hostId)) {
            throw new AccessDeniedException("This user dont have permission for this action.");
        }

        if (!bookingDetail.getStatus().equals("SUCCESS") || bookingDetail.getIs_checked_out()) {
            throw new NotModifiedException("Can not check out this booking, please check its status");
        }

        if (!isCheckOut) {
            if (bookingDetail.getCheck_out_date().after(new Date())) {
                throw new NotModifiedException("Please way until the last day of check out date");
            }
            // update status to no show
            bookingRepository.updateStatus(BookingStatus.NO_SHOW.toString(),bookingId);
            bookingRepository.log(
                    BookingStatus.NO_SHOW.toString(),
                    bookingId,
                    BookingLogDes.NO_SHOW.getDescription());
            // send a notification to user
            eventPublisher.publishSendingNotificationEvent(
                    bookingDetail.getIssuer_id(),
                    bookingId,
                    "We have acknowledge you had a booking but did not show up, click for more detail",
                    NotificationRefType.BOOKING.name()
            );
        } else {
            bookingRepository.checkOut(bookingId);
            bookingRepository.log(
                    BookingStatus.CHECK_OUT.toString(),
                    bookingId,
                    BookingLogDes.CHECKED_OUT.getDescription());
            // send a notification to user ask for giving a review
            eventPublisher.publishSendingNotificationEvent(
                    bookingDetail.getIssuer_id(),
                    bookingId,
                    "Congratulation, your trip is now completed, " +
                            "consider leave a review to help other user as well.",
                    NotificationRefType.BOOKING.name()
            );
            // host get the remaining 50%
        }
    }

    @Transactional
    public void handleCancelBooking(Long bookingId, Integer userId) {
        BookingDetail bookingDetail = findBookingDetail(bookingId);

        if (!bookingDetail.getIssuer_id().equals(userId)) {
            throw new AccessDeniedException("This user can not take this action");
        }

        String status = bookingDetail.getStatus();
        if (status.equals("PENDING") || status.equals("SUCCESS") ) {
            bookingRepository.updateStatus(BookingStatus.CANCEL.toString(), bookingDetail.getId());
            bookingRepository.log(
                    BookingStatus.CANCEL.toString(),
                    bookingDetail.getId(),
                    BookingLogDes.CANCEL.getDescription());
        } else {
            throw new NotModifiedException("This booking can not be cancel anymore");
        }
        if (status.equals("SUCCESS")) {
            LOG.info("send a notification to host that a success booking has been canceled");
        }

    }

    public List<BookingDetail> getAllBooking(long limit, long offset) {
        return bookingRepository.findAllDetail(limit, offset).stream().map(this::mapToBookingDetail).toList();
    }

    public Long getTotal() {
        return bookingRepository.getTotal();
    }

    @Scheduled(cron = "0 0 1 * * ?") // Runs daily at 1 AM
    public void detectNoShows() {
        LOG.info("Auto Detect No-Show Booking Executed, Sending Notification To All Host...");
        var bookingIds = bookingRepository.findPendingCheckoutsPastEndDate();
        bookingIds.forEach(objects -> {
             Long bookingId = (Long) objects[0];
             Integer hostId = (Integer) objects[1];
            LOG.info("Potential No-Show Booking: {id:{}, hostId:{}}", bookingId, hostId);
            eventPublisher.publishSendingNotificationEvent(
                    hostId,
                    bookingId,
                    "We have notified a booking that hasn't been marked as checked out although the check_out day is pass. "
                    +" Please review this again.",
                    NotificationRefType.BOOKING.name()
            );
            // send a notification ask if the user hasn't showed up
            // or if they forgot to set the is_checked_out to be true
        });
    }


    public void isDateValidCheck(BookingDto bookingDto, Long propertyId) {
        if(isSameDay(bookingDto.check_in_date(), bookingDto.check_out_date())) {
            throw new InvalidDateArgumentException();
        }

        if (bookingDto.check_in_date().after(bookingDto.check_out_date())) {
            throw new InvalidDateArgumentException();
        }

        List<Object[]> queryDate = bookingRepository.findAllBookingDateOfProperty(propertyId);
        List<Date> fillDate = Utils.fillDateRanges(queryDate);

//        for (Date date : fillDate) {
//            System.out.println(date);
//        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(bookingDto.check_in_date());
        while (!calendar.getTime().after(bookingDto.check_out_date())) {
            Date currentDate = calendar.getTime();
            if (fillDate.stream().anyMatch(date -> isSameDay(currentDate, date))) {
                throw new InvalidDateArgumentException();
            }
            calendar.add(Calendar.DATE, 1);
        }
    }

    private boolean isSameDay(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);
        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
                cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH) &&
                cal1.get(Calendar.DAY_OF_MONTH) == cal2.get(Calendar.DAY_OF_MONTH);
    }
}
