package com.huy.airbnbserver.comment;

import com.huy.airbnbserver.comment.converter.CommentDtoToCommentConverter;
import com.huy.airbnbserver.comment.converter.CommentToCommentDtoConverter;
import com.huy.airbnbserver.comment.dto.CommentDto;
import com.huy.airbnbserver.comment.dto.CommentsWithPaginationDto;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.report.Issue;
import com.huy.airbnbserver.report.ReportService;
import com.huy.airbnbserver.report.dto.ReportDto;
import com.huy.airbnbserver.system.*;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class CommentController {
    private final CommentService commentService;
    private final ReportService reportService;
    private final CommentDtoToCommentConverter commentDtoToCommentConverter;
    private final CommentToCommentDtoConverter commentToCommentDtoConverter;

    @GetMapping("/properties/{propertyId}/comments")
    public Result fetchAll(
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

        List<CommentDto> commentDtoList = commentService.findByPropertyId(propertyId, pageObject.getLimit(), pageObject.getOffset(), sortDirection)
                .stream()
                .map(commentToCommentDtoConverter::convert)
                .toList();

        Long totalComment = commentService.getTotalCommentOfProperty(propertyId);
        PageMetadata pageMetadata = new PageMetadata(pageObject.getPage(), pageObject.getPageSize(), totalComment);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Fetch Comments Success",
                new CommentsWithPaginationDto(pageMetadata, commentDtoList)
        );
    }

    @PostMapping("/properties/{propertyId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public Result newComment(
            @PathVariable Long propertyId,
            @Valid @RequestBody CommentDto commentDto,
            Authentication authentication
    ) {
        return new Result(
                true,
                StatusCode.CREATED,
                "Add new comment success",
                commentToCommentDtoConverter.convert(commentService.addComment(
                        Objects.requireNonNull(commentDtoToCommentConverter.convert(commentDto)),
                        propertyId,
                        Utils.extractAuthenticationId(authentication)
                ))
        );
    }

    @PutMapping("/comments/{commentId}")
    public Result updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody CommentDto commentDto,
            Authentication authentication
    ) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update comment success",
                commentToCommentDtoConverter
                        .convert(commentService.updateComment(
                                commentDtoToCommentConverter.convert(commentDto),
                                commentId,
                                Utils.extractAuthenticationId(authentication)
                        ))
        );
    }

    @DeleteMapping("/comments/{commentId}")
    public Result deleteComment(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        commentService.delete(commentId, Utils.extractAuthenticationId(authentication));
        return new Result(true, 200, "Deleted Success");
    }

    @GetMapping("/comments/test")
    public Result test() {
        return new Result(true, 200, "ok");
    }

    @PostMapping("/comments/{commentId}/report")
    public Result reportComment(@PathVariable Long commentId,
                                 @Valid @RequestBody ReportDto reportDto,
                                 Authentication authentication) {
        Issue issue = Issue.valueOf(reportDto.issue());
        Comment reportedComment = commentService.findById(commentId);

        reportService.createReport(
                Utils.extractAuthenticationId(authentication),
                issue,
                reportDto.detail(),
                reportedComment.getEntityId(),
                reportedComment.getType()
        );

        return new Result(true, 200, "Success");
    }
}
