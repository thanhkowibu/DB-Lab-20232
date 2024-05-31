package com.huy.airbnbserver.comment.converter;

import com.huy.airbnbserver.comment.Comment;
import com.huy.airbnbserver.comment.dto.CommentDto;
import com.huy.airbnbserver.user.converter.UserToUserDtoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentToCommentDtoConverter implements Converter<Comment, CommentDto> {
    private final UserToUserDtoConverter userToUserDtoConverter;

    @Override
    public CommentDto convert(@NonNull Comment source) {
        return new CommentDto(
                source.getId(),
                source.getContent(),
                source.getRating(),
                source.getCreatedAt(),
                source.getUpdatedAt(),
                userToUserDtoConverter.convert(source.getUser())
        );
    }
}
