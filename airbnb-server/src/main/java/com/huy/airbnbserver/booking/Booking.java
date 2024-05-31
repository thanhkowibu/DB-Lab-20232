package com.huy.airbnbserver.booking;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Check(constraints = "check_in_date < check_out_date")
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

    // confirm, pending, ...
    @Column(nullable = false)
    private boolean isConfirm = false;

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

    public void addUser(User user) {
        this.user = user;
        user.getBookings().add(this);
    }

    public void addProperty(Property property) {
        this.property = property;
        user.getBookings().add(this);
    }

    public void cancel() {
        this.user.getBookings().remove(this);
        this.property.getBookings().remove(this);
    }
}
