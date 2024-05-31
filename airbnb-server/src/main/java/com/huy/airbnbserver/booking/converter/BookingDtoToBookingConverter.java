package com.huy.airbnbserver.booking.converter;

import com.huy.airbnbserver.booking.Booking;
import com.huy.airbnbserver.booking.dto.BookingDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class BookingDtoToBookingConverter implements Converter<BookingDto, Booking> {
    @Override
    public Booking convert(BookingDto source) {
        var booking = new Booking();
        booking.setCheckInDate(source.check_in_date());
        booking.setCheckOutDate(source.check_out_date());
        booking.setNumAlduts(source.num_alduts());
        booking.setNumChildrens(source.num_childrens());
        booking.setNumPets(source.num_pets());
        booking.setCleanFee(source.clean_fee());
        booking.setServiceFee(source.service_fee());
        booking.setNightlyFee(source.nightly_fee());
        return booking;
    }
}
