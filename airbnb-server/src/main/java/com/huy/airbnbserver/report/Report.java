package com.huy.airbnbserver.report;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.user.User;
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
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(nullable = false, updatable = false)
    private String detail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Issue issue;

    @Column(nullable = false)
    private Boolean isResolved = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonManagedReference
    private User reporter;

    @Column(nullable = false)
    private String report_type;

    @Column(nullable = false)
    private Long report_entity_id;
}
