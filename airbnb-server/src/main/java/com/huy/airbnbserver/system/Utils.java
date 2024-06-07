package com.huy.airbnbserver.system;


import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import com.huy.airbnbserver.user.UserPrincipal;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class Utils {

    public static void validateSearchParams(Object... params) {
        for (Object param : params) {
            if ("".equals(param)) {
                throw new InvalidSearchQueryException("Search parameter cannot be an empty string");
            }
        }
    }

    public static List<Date> fillDateRanges(List<Date> inputDates) {
        List<Date> filledDates = new ArrayList<>();
        if (inputDates.size() % 2 != 0) {
            throw new RuntimeException("Input list must have an even number of dates");
        }

        Collections.sort(inputDates);

        for (int i = 0; i < inputDates.size(); i += 2) {
            Date checkInDate = inputDates.get(i);
            Date checkOutDate = inputDates.get(i + 1);
            List<Date> dateRange = getDateRange(checkInDate, checkOutDate);
            filledDates.addAll(dateRange);
        }
        return filledDates;
    }

    private static List<Date> getDateRange(Date startDate, Date endDate) {
        List<Date> dateRange = new ArrayList<>();
        long startTime = startDate.getTime() ;
        long endTime = endDate.getTime();
        long currentTime = startTime;

        while (currentTime <= endTime) {
            dateRange.add(new Date(currentTime));
            currentTime += 24 * 60 * 60 * 1000; // Add one day
        }
        return dateRange;
    }

    public static Integer extractAuthenticationId(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ((UserPrincipal)authentication.getPrincipal()).getUser().getId();
        } else {
            throw new AccessDeniedException("Unauthenticated User");
        }
    }

    public static boolean imageValidationFailed(List<MultipartFile> images) throws FileSizeLimitExceededException {
        if (images.isEmpty()) {
            return true;
        }

        for (MultipartFile image : images) {
            if (image.getSize() > 2 * 1024 * 1024) {
                throw new FileSizeLimitExceededException(
                        "File size is too large for: " + image.getOriginalFilename(),
                        image.getSize(),
                        2 * 1024 * 1024);
            }
        }

        return !images.stream()
                .allMatch(file -> {
                    String originalName = file.getOriginalFilename();
                    String contentType = file.getContentType();
                    boolean emptyPostmanRequest = originalName != null && originalName.isEmpty();
                    boolean wrongContentType = contentType == null || !contentType.startsWith("image/");
                    return !emptyPostmanRequest && !wrongContentType;
                });
    }
}
