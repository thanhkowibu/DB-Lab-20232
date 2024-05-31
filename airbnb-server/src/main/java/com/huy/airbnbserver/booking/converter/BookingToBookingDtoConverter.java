package com.huy.airbnbserver.booking.converter;

import com.huy.airbnbserver.booking.Booking;
import com.huy.airbnbserver.booking.dto.BookingDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class BookingToBookingDtoConverter implements Converter<Booking, BookingDto> {
    @Override
    public BookingDto convert(Booking source) {
        return new BookingDto(
                source.getProperty().getId(),
                source.getId(),
                source.getCheckInDate(),
                source.getCheckOutDate(),
                source.getNumAlduts(),
                source.getNumChildrens(),
                source.getNumPets(),
                source.getNightlyFee(),
                source.getCleanFee(),
                source.getServiceFee(),
                source.getCreatedAt(),
                source.isConfirm()
        );
    }
}
