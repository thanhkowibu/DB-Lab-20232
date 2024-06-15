package com.huy.airbnbserver.booking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.review.Review;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Check(constraints = "check_in_date < check_out_date")
@Table(name = "booking", indexes = {
        @Index(name = "idx_booking_user_id", columnList = "user_id"),
        @Index(name = "idx_booking_property_id", columnList = "property_id"),
        @Index(name = "idx_booking_created_at", columnList = "created_at")

})
public class Booking{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @Future
    @NotNull
    private Date checkInDate;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @Future
    @NotNull
    private Date checkOutDate;

    @Column(nullable = false)
    private Boolean isCheckedOut;

    // confirm, pending, ...
    @Column(nullable = false)
    private boolean isConfirm = false;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false, updatable = false)
    @Min(0)
    private Integer numAlduts;

    @Column(nullable = false, updatable = false)
    @Min(0)
    private Integer numChildrens;

    @Column(nullable = false, updatable = false)
    @Min(0)
    private Integer numPets;

    @Column(nullable = false, updatable = false)
    @Min(0)
    private  BigDecimal nightlyFee;

    @Column(nullable = false, updatable = false)
    @Min(0)
    private BigDecimal cleanFee;

    @Column(nullable = false, updatable = false)
    @Min(0)
    private BigDecimal serviceFee;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonManagedReference

    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @JsonManagedReference
    private Property property;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Review review;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<BookingLog> logs = new ArrayList<>();

    public void addUser(User user) {
        this.user = user;
        user.getBookings().add(this);
    }

    public void addProperty(Property property) {
        this.property = property;
        user.getBookings().add(this);
    }

    public void addReview(Review review) {
        this.review = review;
        review.setBooking(this);
    }

    public void addLog(BookingLog log) {
        this.logs.add(log);
        log.setBooking(this);
    }
}
