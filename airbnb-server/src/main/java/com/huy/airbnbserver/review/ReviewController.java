package com.huy.airbnbserver.review;

import com.huy.airbnbserver.system.Utils;
import com.huy.airbnbserver.system.common.Page;
import com.huy.airbnbserver.system.common.PageMetadata;
import com.huy.airbnbserver.system.common.Result;
import com.huy.airbnbserver.system.common.SortDirection;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/properties/{propertyId}/reviews")
    public Result test(
            @PathVariable Long propertyId,
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize,
            @RequestParam(value = "sort_direction", required = false) String sortDirectionParam
    ) {
        if (page != null && page < 1) {
            throw new InvalidSearchQueryException("Page must be greater than zero");
        }

        if (pageSize != null && pageSize < 5) {
            throw new InvalidSearchQueryException("Page size must be at least 5");
        }

        SortDirection sortDirection;
        if (sortDirectionParam == null) {
            sortDirection = SortDirection.DESC;
        } else {
            try {
                sortDirection = SortDirection.valueOf(sortDirectionParam.toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new InvalidSearchQueryException("Sort direction can only be either 'asc' or 'desc'");
            }
        }

        Page pageObject =  new Page(page,pageSize);
        List<ReviewDto> reviewsDto = reviewService.
                findByPropertyId(
                        propertyId,
                        pageObject.getLimit(),
                        pageObject.getOffset(),
                        sortDirection);

        Long totalReview = reviewService.getTotalReviewOfProperty(propertyId);
        PageMetadata pageMetadata = new PageMetadata(pageObject.getPage(), pageObject.getPageSize(), totalReview);

        return new Result(
                true,
                200,
                "Fetching all reviews",
                new ReviewsDtoWithPagination(
                        pageMetadata,
                        reviewsDto
                )
        );
    }

    @PostMapping("/bookings/{bookingId}/add-reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public Result createReview(
            @PathVariable Long bookingId,
            Authentication authentication,
            @Valid @RequestBody ReviewDto reviewDto
    ) {
        reviewService.addReview(
                reviewDto,
                bookingId,
                Utils.extractAuthenticationId(authentication));

        return new Result(true, 200, "Adding review success");
    }
}
