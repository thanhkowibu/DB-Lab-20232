    package com.huy.airbnbserver.properties;
    
    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import com.huy.airbnbserver.report.ReportableEntity;
    import com.huy.airbnbserver.booking.Booking;
    import com.huy.airbnbserver.image.Image;
    import com.huy.airbnbserver.properties.enm.Category;
    import com.huy.airbnbserver.properties.enm.Tag;
    import com.huy.airbnbserver.user.model.User;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.Min;
    import jakarta.validation.constraints.NotEmpty;
    import jakarta.validation.constraints.NotNull;
    import lombok.*;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;

    import java.math.BigDecimal;
    import java.util.*;

    @Entity
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @EqualsAndHashCode
    @ToString
    @Table(name = "property", indexes = {
            @Index(name = "idx_property_host_id", columnList = "host_id"),
            @Index(name = "idx_property_nightly_price", columnList = "nightly_price"),
            @Index(name = "idx_property_updated_at", columnList = "updated_at")
    })
    public class Property implements ReportableEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false, updatable = false)
        private Long id;
    
        @Column(nullable = false)
        @NotNull @Min(10)
        private BigDecimal nightlyPrice;
    
        @Column(nullable = false, length = 200)
        @NotEmpty
        private String name;
    
        @Column(nullable = false)
        @NotNull @Min(0)
        private Integer maxGuests;
    
        @Column(nullable = false)
        @NotNull @Min(0)
        private Integer numBeds;
    
        @Column(nullable = false)
        @NotNull @Min(0)
        private Integer numBedrooms;
    
        @Column(nullable = false)
        @NotNull @Min(0)
        private Integer numBathrooms;
    
        @Column(nullable = false, precision = 10, scale = 2)
        @NotNull
        private BigDecimal longitude;
    
        @Column(nullable = false, precision = 10, scale = 2)
        @NotNull
        private BigDecimal latitude;
    
        @Column(nullable = false, length = 2000)
        @NotEmpty
        private String description;
    
        @Column(nullable = false, length = 500)
        @NotEmpty
        private String addressLine;
    
        @Column(nullable = false, updatable = false)
        @Temporal(TemporalType.TIMESTAMP)
        @CreationTimestamp
        private Date createdAt;
    
        // can be null
        @Temporal(TemporalType.TIMESTAMP)
        @UpdateTimestamp
        @Column(nullable = false)
        private Date updatedAt;
    
        // relationship
    
        @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
        @JsonManagedReference
        private List<Image> images = new ArrayList<>();
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "host_id", nullable = false)
        @JsonManagedReference
        private User host;
    
        @ManyToMany(mappedBy = "likedProperty", fetch = FetchType.LAZY)
        private List<User> likedByUsers = new ArrayList<>();
    
        @OneToMany(mappedBy = "property", fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JsonBackReference
        private List<Booking> bookings = new ArrayList<>();
    
        public void addImages(Image image) {
            image.setProperty(this);
            this.images.add(image);
        }
    
        public void addLikedUser(User user) {
            user.getLikedProperty().add(this);
            this.likedByUsers.add(user);
        }
    
        public void removeLikedUser(User user) {
            user.getLikedProperty().remove(this);
            this.likedByUsers.remove(user);
        }

        @ElementCollection(targetClass = Category.class)
        @CollectionTable(name = "property_categories", joinColumns = @JoinColumn(name = "property_id"))
        @Column(nullable = false)
        @Enumerated(EnumType.STRING)
        private Set<Category> categories = new HashSet<>();

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Tag tag;

        public void addCategory(Category category) {
            this.categories.add(category);
        }

        public void removeCategory(Category category) {
            this.categories.remove(category);
        }

        @Override
        public Long getEntityId() {
            return this.id;
        }

        @Override
        public String getType() {
            return "Property";
        }
    }
