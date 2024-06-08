package com.huy.airbnbserver.review;

import com.huy.airbnbserver.system.common.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ReviewsDtoWithPagination {
    PageMetadata pagination_meta_data;
    List<ReviewDto> reviews;
}
