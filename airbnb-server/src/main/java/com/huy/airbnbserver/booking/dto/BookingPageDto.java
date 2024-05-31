package com.huy.airbnbserver.booking.dto;

import com.huy.airbnbserver.system.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BookingPageDto {
    PageMetadata pagination_meta_data;
    List<BookingDto> bookings;
}
