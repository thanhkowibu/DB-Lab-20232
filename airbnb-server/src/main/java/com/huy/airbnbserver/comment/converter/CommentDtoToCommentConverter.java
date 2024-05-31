package com.huy.airbnbserver.comment.converter;

import com.huy.airbnbserver.comment.Comment;
import com.huy.airbnbserver.comment.dto.CommentDto;
import com.huy.airbnbserver.user.converter.UserDtoToUserConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentDtoToCommentConverter implements Converter<CommentDto, Comment> {
    private final UserDtoToUserConverter userDtoToUserConverter;

    @Override
    public Comment convert(@NonNull CommentDto source) {
        var comment = new Comment();
        comment.setRating(source.rating());
        comment.setContent(source.content());
        return comment;
    }
}
