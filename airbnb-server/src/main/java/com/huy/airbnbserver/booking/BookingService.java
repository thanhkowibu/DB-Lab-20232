package com.huy.airbnbserver.booking;

import com.huy.airbnbserver.booking.dto.BookingDto;
import com.huy.airbnbserver.properties.PropertyRepository;
import com.huy.airbnbserver.system.Utils;
import com.huy.airbnbserver.system.exception.InvalidDateArgumentException;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public Booking save(Booking booking, Integer userId, Long propertyId) {
        var user = userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        var property = propertyRepository.findById(propertyId).orElseThrow(()->new ObjectNotFoundException("property", propertyId));


        booking.addUser(user);
        booking.addProperty(property);
        booking.setConfirm(false);

        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = true)
    public List<Booking> getAllBookingByUserId(Integer userId, long limit, long offset) {
        userRepository.findById(userId).orElseThrow(()->new ObjectNotFoundException("user", userId));
        return bookingRepository.findByUserId(userId, limit, offset);
    }

    public Long getAllBookingByUserIdCount(Integer userId) {
        return bookingRepository.findTotalByUserId(userId);
    }

    public Long getAllBookingByPropertyIdCount(Long propertyId) {
        return bookingRepository.getTotalBookingByPropertyId(propertyId);
    }

    @Transactional(readOnly = true)
    public List<Booking> getAllBookingByPropertyId(Long propertyId, Integer userId, long limit, long offset) {
        var property = propertyRepository
                .findById(propertyId)
                .orElseThrow(()->new ObjectNotFoundException("property", propertyId));
        if (!property.getHost().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied for this user");
        }
        return bookingRepository.findByPropertyId(propertyId, limit, offset);
    }

    @Transactional
    public void delete(Long id, Integer userId) {
        var deletedBooking = bookingRepository.findByIdEagerHost(id).orElseThrow(()->new ObjectNotFoundException("booking", id));

        if (!userId.equals(deletedBooking.getUser().getId())) {
            throw new AccessDeniedException("Access denied for this user");
        }

        deletedBooking.cancel();
        bookingRepository.delete(deletedBooking);
    }

    @Transactional
    public void confirm(Long id, Integer userId) {
        var confirmBooking = bookingRepository.findByIdEagerPropertyHost(id).orElseThrow(()->new ObjectNotFoundException("booking", id));
        if (!confirmBooking.getProperty().getHost().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied for this user");
        }

        confirmBooking.setConfirm(true);
        bookingRepository.save(confirmBooking);
    }

    public void isDateValidCheck(BookingDto bookingDto, Long propertyId) {
        if(isSameDay(bookingDto.check_in_date(), bookingDto.check_out_date())) {
            throw new InvalidDateArgumentException();
        }

        if (bookingDto.check_in_date().after(bookingDto.check_out_date())) {
            throw new InvalidDateArgumentException();
        }

        List<Date> queryDate = bookingRepository.findAllBookingDateOfProperty(propertyId);
        List<Date> fillDate = Utils.fillDateRanges(queryDate);

        for (Date date : fillDate) {
            System.out.println(date);
        }

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
