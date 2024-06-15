package com.huy.airbnbserver.image;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.huy.airbnbserver.properties.Property;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
@Table(name = "image", indexes = {
        @Index(name = "idx_image_property_id", columnList = "property_id")
})
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = true)
    @JsonBackReference
    private Property property;

}
