package com.huy.airbnbserver.user.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.notification.model.Notification;
import com.huy.airbnbserver.notification.model.NotificationPreferences;
import com.huy.airbnbserver.admin.report.Report;
import com.huy.airbnbserver.booking.Booking;
import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.properties.Property;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "user_account", indexes = {
        @Index(name = "email_index", columnList = "email")
})
public class User{
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    @NotEmpty(message = "firstname is required")
    private String firstname;

    @Column(nullable = false, length = 200)
    @NotEmpty(message = "lastname is required")
    private String lastname;

    @Column(nullable = false, unique = true, length = 200)
    @NotEmpty(message = "email is required")
    private String email;

    @Column(length = 11)
    private String phoneNumber;
    private Date dob;
    private String gender;

    @Column(nullable = false, length = 200)
    @NotEmpty
    private String password;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    // can be null
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    @Column(nullable = false)
    private boolean enabled;

    @Column(updatable = false, nullable = false, length = 100)
    private String roles = "user";

    @Column(nullable = false)
    private boolean isBanned;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JsonManagedReference
    private NotificationPreferences notificationPreferences;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "avatar_id", referencedColumnName = "id", nullable = true)
    private Image avatar;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Property> hostedProperties = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JsonBackReference
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JsonBackReference
    private List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "reporter", fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JsonBackReference
    private List<Report> reports = new ArrayList<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "liked_property",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "property_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "property_id"})
    )
    List<Property> likedProperty = new ArrayList<>();


    public String getFullname() {
        return firstname + " " + lastname;
    }
}