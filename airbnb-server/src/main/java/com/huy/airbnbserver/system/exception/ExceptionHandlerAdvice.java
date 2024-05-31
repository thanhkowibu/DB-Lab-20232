package com.huy.airbnbserver.system.exception;

import com.huy.airbnbserver.system.Result;
import com.huy.airbnbserver.system.StatusCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {
    @ExceptionHandler(FileSizeLimitExceededException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    Result handleFileSizeLimitExceededException(FileSizeLimitExceededException ex) {
        return new Result(false, 422,
                "Maximum Allowed Size: "+ex.getPermittedSize()+", Actual Size: " +ex.getActualSize(),
                ex.getMessage());
    }

    @ExceptionHandler(UnsupportedImageFormatException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    Result handleUnsupportedImageFormatException(UnsupportedImageFormatException ex) {
        return new Result(false, 422, ex.getMessage());
    }

    @ExceptionHandler(UnprocessableEntityException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    Result handleUnprocessableEntityException(UnprocessableEntityException ex) {
        return new Result(false, 422, ex.getMessage());
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleHandlerMethodValidationException(HandlerMethodValidationException ex) {
        return new Result(false, StatusCode.INVALID_ARGUMENT, ex.getMessage());
    }

    @ExceptionHandler(ObjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Result handleObjectNotFoundException(ObjectNotFoundException ex) {
        return new Result(false, StatusCode.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Result handleNoResourceFoundException(Exception ex) {
        return new Result(false, StatusCode.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();
        Map<String, String> map = new HashMap<>();
        errors.forEach(
                error -> {
                    String key = ((FieldError) error).getField();
                    String val = error.getDefaultMessage();
                    map.put(key, val);
                }
        );
        return new Result(false, StatusCode.INVALID_ARGUMENT, "Provided arguments are invalid, see data for details.", map);
    }

    @ExceptionHandler(InvalidSearchQueryException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleInvalidSearchQueryException(InvalidSearchQueryException exception) {
        return new Result(false, StatusCode.INVALID_ARGUMENT, "Invalid Search Query Parameter", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleMethodArgumentTypeMismatchException( MethodArgumentTypeMismatchException ex) {
        return new Result(false, StatusCode.INVALID_ARGUMENT, "Invalid Variable, Please Double Check Your Request", ex.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return new Result(false, StatusCode.INVALID_ARGUMENT, "Bad Request", ex.getMessage());
    }

    @ExceptionHandler(EntityAlreadyExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleUserAlreadyExistException(Exception ex) {
        return new Result(false, StatusCode.INVALID_ARGUMENT, "Can not insert new entity", ex.getMessage());
    }

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class, })
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    Result handleAuthenticationException(Exception ex) {
        return new Result(false, StatusCode.UNAUTHORIZED, "Username or password is incorrect", ex.getMessage());
    }

    @ExceptionHandler(LockedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    Result handleLockedException(LockedException ex) {
        return new Result(false, StatusCode.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    Result handleOtherException(Exception ex) {
        ex.printStackTrace();
        return new Result(false, StatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error.", ex.getMessage());
    }

    @ExceptionHandler(DisabledException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    Result handleDisabledException(DisabledException ex) {
        return new Result(false, 403, ex.getMessage());
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    Result handleInsufficientAuthenticationException(Exception ex) {
        return new Result(false, StatusCode.UNAUTHORIZED, "InsufficientAuthenticationException", ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    Result handleAccessDeniedException(AccessDeniedException ex) {
        return new Result(false, StatusCode.FORBIDDEN, "Permission Denied.", ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Result handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return new Result(
                false,
                StatusCode.INVALID_ARGUMENT,
                "SQL Constraint failed, if this is a many-to-many record operation, maybe the record has already exists"
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    Result handleMethodNotAllow(Exception ex) {
        return new Result(
                false,
                405,
                "This method is not allowed for this routes"
        );
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Result handleExpiredJwtException(ExpiredJwtException ex) {
        return new Result(false, 403, "JWT token has expired. Please log in again.", ex.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Result handleBadTokenException(JwtException ex) {
        return new Result(
                false,
                403,
                "Malformed Or Invalid Token."
        );
    }

    @ExceptionHandler(InvalidDateArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result handleInvalidDateException(Exception ex) {
        return new Result(
                false,
                400,
                ex.getMessage()
        );
    }
}
