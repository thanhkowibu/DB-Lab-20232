package com.huy.airbnbserver.properties;

import com.huy.airbnbserver.properties.enm.Area;
import com.huy.airbnbserver.properties.dto.ReviewInfoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;


public interface PropertyRepository extends JpaRepository<Property, Long> {

    @NonNull
    @Query(value = "SELECT * FROM property p WHERE p.id = :id", nativeQuery = true)
    Optional<Property> findById(@NonNull Long id);

    @Query(value = """
            SELECT
                p.id AS id,
                p.nightly_price AS nightlyPrice,
                p.name AS name,
                p.longitude AS longitude,
                p.latitude AS latitude,
                p.created_at AS createdAt,
                p.updated_at AS updatedAt,
                p.num_beds AS numBeds,
                GROUP_CONCAT(DISTINCT i.id) AS imageIds,
                GROUP_CONCAT(DISTINCT i.url) AS imageUrls,
                GROUP_CONCAT(DISTINCT i.name) AS imageNames,
                COALESCE(AVG(c.rating), 0) AS averageRating,
                COUNT(*) OVER()
            FROM property p
            LEFT JOIN image i ON p.id = i.property_id
            LEFT JOIN comment c ON p.id = c.property_id
            LEFT JOIN liked_property lp ON p.id = lp.property_id
            WHERE lp.user_id = :userId
            GROUP BY p.id
            LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> getLikedByUserId(@NonNull Integer userId,
                        @NonNull Long limit,
                        @NonNull Long offset);

    @Query(value = "SELECT * " +
                "FROM liked_property l " +
                "WHERE l.user_id = :userId AND l.property_id = :propertyId"
            , nativeQuery = true)
    List<Object> getLikedDetailsOfUserIdAndPropertyId(Integer userId, Long propertyId);

    @NonNull
    @Query(value = """
                SELECT DISTINCT p FROM Property p
                LEFT JOIN FETCH p.images
                LEFT JOIN FETCH p.host h
                LEFT JOIN FETCH h.avatar
                WHERE p.id = :id""")
    Optional<Property> findDetailById(@NonNull Long id);



    @Query(value = """
            SELECT
                AVG(c.rating) AS averageRating,
                COUNT(*) AS totalRating
            FROM comment c
            WHERE c.property_id = :propertyId
            GROUP BY c.property_id""", nativeQuery = true)
    ReviewInfoProjection findAverageRatingForProperty(@Param("propertyId") Long propertyId);

    @Query(value = """
        SELECT
            p.id AS id,
            p.nightly_price AS nightlyPrice,
            p.name AS name,
            p.longitude AS longitude,
            p.latitude AS latitude,
            p.created_at AS createdAt,
            p.updated_at AS updatedAt,
            p.num_beds AS numBeds,
            GROUP_CONCAT(DISTINCT i.id) AS imageIds,
            GROUP_CONCAT(DISTINCT i.url) AS imageUrls,
            GROUP_CONCAT(DISTINCT i.name) AS imageNames,
            COALESCE(AVG(c.rating), 0) AS averageRating,
            COUNT(*) OVER()
        FROM property p
        LEFT JOIN image i ON p.id = i.property_id
        LEFT JOIN comment c ON p.id = c.property_id
        WHERE p.host_id = :userId
        GROUP BY p.id
        ORDER BY averageRating DESC
        LIMIT 9
    """, nativeQuery = true)
    List<Object[]> findTopRatingPropertyFromHost(@NonNull Integer userId);

    @NonNull
    @Query(value = """
        SELECT
            p.id AS id,
            p.nightly_price AS nightlyPrice,
            p.name AS name,
            p.longitude AS longitude,
            p.latitude AS latitude,
            p.created_at AS createdAt,
            p.updated_at AS updatedAt,
            p.num_beds AS numBeds,
            GROUP_CONCAT(DISTINCT i.id) AS imageIds,
            GROUP_CONCAT(DISTINCT i.url) AS imageUrls,
            GROUP_CONCAT(DISTINCT i.name) AS imageNames,
            COALESCE(AVG(c.rating), 0) AS averageRating
        FROM property p
        LEFT JOIN image i ON p.id = i.property_id
        LEFT JOIN comment c ON p.id = c.property_id
        WHERE (:category1 IS NULL OR EXISTS
            (SELECT 1 FROM property_categories pc1 WHERE pc1.property_id = p.id AND pc1.categories = :category1))
        AND (:category2 IS NULL OR EXISTS
            (SELECT 1 FROM property_categories pc2 WHERE pc2.property_id = p.id AND pc2.categories = :category2))
        AND (:tag IS NULL OR p.tag = :tag)
        AND (:area IS NULL OR
            (p.longitude BETWEEN :minLongitude AND :maxLongitude) AND
            (p.latitude BETWEEN :minLatitude AND :maxLatitude))
        AND (:minNightlyPrice IS NULL OR :maxNightlyPrice IS NULL OR
            p.nightly_price BETWEEN :minNightlyPrice AND :maxNightlyPrice)
        AND (:minBeds IS NULL OR p.num_beds >= :minBeds)
        AND (:minBathrooms IS NULL OR p.num_bathrooms >= :minBathrooms)
        AND (:minBedrooms IS NULL OR p.num_bedrooms >= :minBedrooms)
        GROUP BY p.id
        ORDER BY averageRating DESC
        LIMIT :limit OFFSET :offset
        """, nativeQuery = true)
    List<Object[]> findAllNative(@Nullable String category1,
                                 @Nullable String category2,
                                 @Nullable String tag,
                                 @Nullable Area area,
                                 @Nullable Double minLongitude,
                                 @Nullable Double maxLongitude,
                                 @Nullable Double minLatitude,
                                 @Nullable Double maxLatitude,
                                 @Nullable Double minNightlyPrice,
                                 @Nullable Double maxNightlyPrice,
                                 @Nullable Integer minBeds,
                                 @Nullable Integer minBathrooms,
                                 @Nullable Integer minBedrooms,
                                 @NonNull Long limit,
                                 @NonNull Long offset);

    @Query(value = """
        SELECT
            p.id,
            p.nightly_price,
            p.name,
            p.max_guests,
            p.num_beds,
            p.num_bedrooms,
            p.num_bathrooms,
            p.longitude,
            p.latitude,
            p.description,
            p.address_line,
            p.created_at,
            p.updated_at,
            h.firstname AS host_firstname,
            h.lastname AS host_lastname,
            a.url AS avatar_url,
            a.name AS avatar_name,
            GROUP_CONCAT(DISTINCT i.id) AS imageIds,
            GROUP_CONCAT(DISTINCT i.url) AS imageUrls,
            GROUP_CONCAT(DISTINCT i.name) AS imageNames,
            GROUP_CONCAT(DISTINCT c.categories) AS categories,
            p.tag,
            h.id AS host_id,
            h.email AS host_email,
            h.enabled AS host_enaled,
            h.created_at AS host_created_at,
            h.updated_at AS host_updated_at
        FROM property p
        LEFT JOIN image i ON p.id = i.property_id
        LEFT JOIN user_account h ON h.id = p.host_id
        LEFT JOIN image a ON h.avatar_id = a.id
        LEFT JOIN property_categories c ON p.id = c.property_id
        WHERE p.id = :id
        GROUP BY p.id""", nativeQuery = true)
    List<Object[]> findDetailByIdNative(@Param("id") Long id);

    @Modifying
    @Query(value = "INSERT INTO liked_property (user_id, property_id) VALUES (:userId, :propertyId)", nativeQuery = true)
    void userLikeProperty(@NonNull Long propertyId, @NonNull Integer userId);

    @Modifying
    @Query(value = "DELETE FROM liked_property " +
            "WHERE user_id = :userId AND property_id = :propertyId", nativeQuery = true)
    void userUnlikeProperty(@NonNull Long propertyId, @NonNull Integer userId);

    @Query(value = """
        SELECT property_id FROM liked_property WHERE user_id = :id""",nativeQuery = true)
    List<Object> getAllFavorites(Integer id);
}
