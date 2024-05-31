package com.huy.airbnbserver.comment.dto;

import com.huy.airbnbserver.system.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class CommentsWithPaginationDto {
    PageMetadata pagination_meta_data;
    List<CommentDto> comments;
}
