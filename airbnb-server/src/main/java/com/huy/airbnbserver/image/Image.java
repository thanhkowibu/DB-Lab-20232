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
@Table(indexes = {@Index(name = "imgName_index", columnList = "name")})
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
