package com.huy.airbnbserver.comment;

import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.system.SortDirection;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.user.User;
import com.huy.airbnbserver.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PropertyService propertyService;
    private final UserService userService;

    public Comment addComment(Comment comment, Long propertyId, Integer userId) {
        Property property = propertyService.findByIdLazy(propertyId);
        User user = userService.findById(userId);
        comment.addProperty(property);
        comment.addUser(user);
        return commentRepository.save(comment);
    }

    public Comment findById(Long id) {
        return commentRepository.findByIdLazy(id).orElseThrow(
                () -> new ObjectNotFoundException("comment", id)
        );
    }

    public List<Comment> findByPropertyId(Long propertyId,
                                          long limit,
                                          long offset,
                                          SortDirection sortDirection) {
        propertyService.existCheck(propertyId);

        if (sortDirection == SortDirection.DESC) {
            return commentRepository.findAllByPropertyIdNativeDesc(propertyId, limit,
                            offset)
                    .stream().map(this::mapToComment).toList();
        } else {
            return commentRepository.findAllByPropertyIdNativeAsc(propertyId, limit,
                            offset)
                    .stream().map(this::mapToComment).toList();
        }
    }

    public void delete(Long commentId, Integer userId) {
        var deletedComment = commentRepository.findByIdEager(commentId).orElseThrow(
                () -> new ObjectNotFoundException("comment", commentId)
        );
        if (!deletedComment.getUser().getId().equals(userId) && userId != -1) {
            throw new AccessDeniedException("Access Denied For This User");
        }

        commentRepository.delete(deletedComment);
    }

    public Long getTotalCommentOfProperty(Long propertyId) {
       return commentRepository.findTotalComment(propertyId);
    }

    public Comment updateComment(Comment comment,Long commentId, Integer userId) {
        var updatedComment = commentRepository.findByIdEager(commentId)
                .orElseThrow(() -> new ObjectNotFoundException("comment", commentId));
        if (!updatedComment.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Access Denied For This User");
        }

        updatedComment.setContent(comment.getContent());
        updatedComment.setRating(comment.getRating());

        return commentRepository.save(updatedComment);
    }


    private Comment mapToComment(Object[] result) {
        var comment = new Comment();
        comment.setId((Long) result[0]);
        comment.setContent((String) result[1]);
        comment.setRating((Integer) result[2]);
        comment.setCreatedAt((Date) result[3]);
        comment.setUpdatedAt((Date) result[4]);

        var user = new User();
        user.setId((Integer) result[5]);
        user.setFirstname((String) result[6]);
        user.setLastname((String) result[7]);
        user.setEmail((String) result[8]);
        user.setEnabled((boolean) result[9]);
        user.setCreatedAt((Date) result[10]);
        user.setUpdatedAt((Date) result[11]);

        if (result[12] != null) {
            var avatar = new Image();
            avatar.setUrl((String) result[12]);
            avatar.setName((String) result[13]);
            user.setAvatar(avatar);
        }


        comment.setUser(user);
        return comment;
    }
 }
