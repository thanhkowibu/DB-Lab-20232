package com.huy.airbnbserver.comment.dto;

import com.huy.airbnbserver.user.dto.UserDto;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.Date;

public record CommentDto(
        Long id,
        @NotEmpty
        String content,
        @NotNull @Min(1) @Max(5)
        Integer rating,
        Date created_at,
        Date updated_at,
        UserDto user
) {
}
