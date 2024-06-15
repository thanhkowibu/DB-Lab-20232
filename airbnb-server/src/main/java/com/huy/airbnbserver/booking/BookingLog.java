package com.huy.airbnbserver.booking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class BookingLog {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "booking_id")
        @JsonBackReference
        private Booking booking;

        @Column(nullable = false)
        private String eventType;

        @Column(updatable = false)
        @Temporal(TemporalType.TIMESTAMP)
        @CreationTimestamp
        private Date eventTimestamp;

        @Column(nullable = false)
        private String description;

}
