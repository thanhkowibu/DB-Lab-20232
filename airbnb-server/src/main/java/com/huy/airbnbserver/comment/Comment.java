package com.huy.airbnbserver.comment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.huy.airbnbserver.report.ReportableEntity;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = {
        @Index(name = "host_id_index", columnList = "property_id")
})
public class Comment implements ReportableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private Integer rating;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @JsonBackReference
    private Property property;


    public void addUser(User user) {
        this.user = user;
    }

    public void addProperty(Property property) {
        this.property = property;
        property.getComments().add(this);
    }

    @Override
    public Long getEntityId() {
        return this.id;
    }

    @Override
    public String getType() {
        return "Comment";
    }
}
