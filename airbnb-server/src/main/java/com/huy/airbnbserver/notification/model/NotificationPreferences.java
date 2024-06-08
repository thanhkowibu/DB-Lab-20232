package com.huy.airbnbserver.notification.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class NotificationPreferences {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private Boolean notifyOnSpecialOffers;
    @Column(nullable = false)
    private Boolean notifyOnHostedPropertyRating;
    @Column(nullable = false)
    private Boolean notifyOnHostedPropertyLike;
    @Column(nullable = false)
    private Boolean notifyOnHostedPropertyBooked;
    @Column(nullable = false)
    private Boolean notifyOnBookingStatusChange;

    public void ofUser(User user) {
        this.user = user;
        user.setNotificationPreferences(this);
    }
}
