package com.huy.airbnbserver.user.dto;

import jakarta.validation.constraints.NotNull;

public record NotificationPreferenceDto(

        @NotNull
        Boolean notifyOnHostedPropertyRating,

        @NotNull
        Boolean notifyOnHostedPropertyLike,

        @NotNull
        Boolean notifyOnHostedPropertyBooked,

        @NotNull
        Boolean notifyOnBookingStatusChange,

        @NotNull
        Boolean notifyOnSpecialOffers
) {
}
