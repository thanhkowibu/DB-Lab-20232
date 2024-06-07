package com.huy.airbnbserver.booking;

import com.huy.airbnbserver.booking.converter.BookingDtoToBookingConverter;
import com.huy.airbnbserver.booking.converter.BookingToBookingDtoConverter;
import com.huy.airbnbserver.booking.dto.BookingDto;
import com.huy.airbnbserver.booking.dto.BookingPageDto;
import com.huy.airbnbserver.system.*;
import com.huy.airbnbserver.system.common.Page;
import com.huy.airbnbserver.system.common.PageMetadata;
import com.huy.airbnbserver.system.common.Result;
import com.huy.airbnbserver.system.common.StatusCode;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class BookingController {
    private final BookingService bookingService;
    private final BookingDtoToBookingConverter bookingDtoToBookingConverter;
    private final BookingToBookingDtoConverter bookingToBookingDtoConverter;

    @PostMapping("/properties/{propertyId}/bookings")
    public Result newBooking(
            @Valid @RequestBody BookingDto bookingDto,
            @PathVariable Long propertyId,
            Authentication authentication
            ) {
        bookingService.isDateValidCheck(bookingDto, propertyId);

        var savedBooking = bookingService.save(
                Objects.requireNonNull(bookingDtoToBookingConverter.convert(bookingDto)),
                Utils.extractAuthenticationId(authentication),
                propertyId
        );

        // publishEvent

        return new Result(
                true,
                StatusCode.SUCCESS,
                "New booking pending...",
                bookingToBookingDtoConverter.convert(savedBooking)
        );
    }

    @GetMapping("/users/{userId}/bookings")
    public Result getAllBookingsByUser(Authentication authentication,
                                       @PathVariable Integer userId,
                                       @RequestParam(value = "page", required = false) Long page,
                                       @RequestParam(value = "page_size", required = false) Long pageSize) {
        Integer authId = Utils.extractAuthenticationId(authentication);

        if (!authId.equals(userId)) {
            throw new AccessDeniedException("Access denied for this user");
        }

        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        var bookingList = bookingService.getAllBookingByUserId(userId, pageObject.getLimit(), pageObject.getOffset());
        var bookingDtoList = bookingList
                .stream()
                .map(bookingToBookingDtoConverter::convert)
                .toList();
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                bookingService.getAllBookingByUserIdCount(userId));
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Fetch all booking for user with id: " + userId,
                new BookingPageDto(pageMetadata, bookingDtoList)
        );
    }

    @GetMapping("/properties/{propertyId}/bookings")
    public Result getAllBookingsForPropertyHost(
            @PathVariable Long propertyId,
            Authentication authentication,
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        var bookingList = bookingService
                .getAllBookingByPropertyId(propertyId, Utils.extractAuthenticationId(authentication), pageObject.getLimit(), pageObject.getOffset());
        var bookingDtoList = bookingList
                .stream()
                .map(bookingToBookingDtoConverter::convert)
                .toList();
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                bookingService.getAllBookingByPropertyIdCount(propertyId));
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Fetch all booking for property with id: " + propertyId,
                new BookingPageDto(pageMetadata, bookingDtoList)
        );
    }

    @DeleteMapping("/bookings/{id}")
    public Result cancelBooking(
            @PathVariable Long id,
            Authentication authentication
    ) {
        bookingService.handleCancelBooking(id, Utils.extractAuthenticationId(authentication));
//        bookingService.delete(id, 2);
        return new Result(true, StatusCode.SUCCESS, "cancel booking success");
    }

    @PutMapping("/bookings/{id}")
    public Result confirmBooking(
            @PathVariable Long id,
            Authentication authentication,
            @RequestParam(value = "confirm", required = false) Boolean isConfirm
    ) {
        if (isConfirm==null) {
            isConfirm = true;
        }

        var hostId = Utils.extractAuthenticationId(authentication);

        if (isConfirm) {
            bookingService.confirm(id, hostId);
        } else {
            bookingService.reject(id, hostId);
        }

        return new Result(true, StatusCode.SUCCESS,
                isConfirm ? "Confirm booking success" : "Reject booking success");
    }

    @PutMapping("/bookings/{id}/check-out")
    public Result checkoutBooking(
            @PathVariable Long id,
            Authentication authentication,
            @RequestParam(value = "checkout", required = false) Boolean isCheckOut
    ) {
        if (isCheckOut == null) {
            isCheckOut = true;
        }

        var hostId = Utils.extractAuthenticationId(authentication);
        bookingService.handleHostConfirmationForCheckOut(id, isCheckOut, hostId);
        return new Result(true, 200, "Check out successful");
    }

    private void pageSizeCheck(Long page, Long pageSize) {
        if (page != null && page < 1) {
            throw new InvalidSearchQueryException("Page must be greater than zero");
        }

        if (pageSize != null && pageSize < 5) {
            throw new InvalidSearchQueryException("Page size must be at least 5");
        }
    }

    @GetMapping("/bookings/{id}")
    public Result getBookingDetail(@PathVariable Long id) {
        return new Result(true, 200, "Success", bookingService.findBookingDetail(id));
    }

    @GetMapping("/bookings/test")
    public void test() {
        bookingService.detectNoShows();
    }
}
