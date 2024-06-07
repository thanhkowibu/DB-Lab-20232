package com.huy.airbnbserver.review;

import com.huy.airbnbserver.booking.Booking;
import com.huy.airbnbserver.booking.BookingRepository;
import com.huy.airbnbserver.image.ImageDto;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.system.common.SortDirection;
import com.huy.airbnbserver.system.exception.NotModifiedException;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PropertyService propertyService;
    private final BookingRepository bookingRepository;

    public Review addReview(ReviewDto reviewDto, Long bookingId, Integer userId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(
                () -> new ObjectNotFoundException("Booking", bookingId)
        );

        if (!booking.getIsCheckedOut()) {
            throw new NotModifiedException("This booking has not check out yet");
        }

        if (!booking.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("This action is not allowed for this user");
        }

        Review review = new Review();
        review.setRating(reviewDto.rating());
        review.setContent(reviewDto.content());
        review.setIs_recommend(reviewDto.is_recommend());
        review.registerBooking(booking);
        return reviewRepository.save(review);
    }

    public Review findById(Long id) {
        return reviewRepository.findByIdLazy(id).orElseThrow(
                () -> new ObjectNotFoundException("review", id)
        );
    }

    public List<ReviewDto> findByPropertyId(Long propertyId,
                                          long limit,
                                          long offset,
                                          SortDirection sortDirection) {
        propertyService.existCheck(propertyId);

        if (sortDirection == SortDirection.DESC) {
            return reviewRepository.findAllByPropertyIdDesc(propertyId, limit,
                            offset)
                    .stream().map(this::mapToReviewDto).toList();
        } else {
            return reviewRepository.findAllByPropertyIdAsc(propertyId, limit,
                            offset)
                    .stream().map(this::mapToReviewDto).toList();
        }
    }

    public Long getTotalReviewOfProperty(Long propertyId) {
        return reviewRepository.findTotalReview(propertyId);
    }

    public Review updateReview(Review review,Long id, Integer userId) {
        var updatedReview = reviewRepository.findByIdEager(id)
                .orElseThrow(() -> new ObjectNotFoundException("comment", id));
        if (!updatedReview.getBooking().getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Access Denied For This User");
        }

        updatedReview.setContent(review.getContent());
        updatedReview.setRating(review.getRating());

        return reviewRepository.save(updatedReview);
    }


    private ReviewDto mapToReviewDto(Object[] result) {
        ImageDto avatar = null;

        if (result[12] != null) {
            avatar = new ImageDto((String) result[13],(String) result[12]);
        }

        var userDto = new UserDto(
                (Integer) result[5],
                (String) result[6],
                (String) result[7],
                (String) result[8],
                (boolean) result[9],
                (Date) result[10],
                (Date) result[11],
                avatar
        );

        return new ReviewDto(
                (Long) result[0],
                (String) result[1],
                (Integer) result[2],
                (Date) result[3],
                (Date) result[4],
                (Boolean) result[14],
                userDto
        );
    }
}
