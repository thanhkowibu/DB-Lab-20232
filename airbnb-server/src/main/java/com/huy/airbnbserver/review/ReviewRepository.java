package com.huy.airbnbserver.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query( "SELECT r FROM Review r " +
            "LEFT JOIN FETCH r.booking b " +
            "lEFT JOIN FETCH b.user u " +
            "LEFT JOIN FETCH u.avatar "+
            "WHERE b.property.id = :propertyId")
    List<Review> findAllByPropertyIdWithEagerFetching(Long propertyId);

    @NonNull
    @Query(value = "SELECT r.* FROM review r WHERE r.id = :id", nativeQuery = true)
    Optional<Review> findByIdLazy(@NonNull Long id);

    @Query(value = "SELECT r FROM Review r " +
            "LEFT JOIN FETCH r.booking b " +
            "lEFT JOIN FETCH b.user u " +
            "LEFT JOIN FETCH u.avatar "+
            "WHERE r.id = :id")
    Optional<Review> findByIdEager(@NonNull Long id);

    @Query(value = """
            SELECT
                r.id,
                r.content,
                r.rating,
                r.created_at,
                b.check_out_date,
                u.id,
                u.firstname,
                u.lastname,
                u.email,
                u.enabled,
                u.created_at,
                u.updated_at,
                a.url,
                a.name,
                r.is_recommend
            FROM review r
            LEFT JOIN booking b ON r.booking_id = b.id
            LEFT JOIN user_account u on b.user_id = u.id
            LEFT JOIN image a ON u.avatar_id = a.id
            WHERE b.property_id = :propertyId
            ORDER BY r.updated_at DESC
            LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findAllByPropertyIdDesc(@NonNull Long propertyId,
                                                 @NonNull Long limit,
                                                 @NonNull Long offset);

    @Query(value = """
            SELECT
                r.id,
                r.content,
                r.rating,
                r.created_at,
                r.updated_at,
                u.id,
                u.firstname,
                u.lastname,
                u.email,
                u.enabled,
                u.created_at,
                u.updated_at,
                a.url,
                a.name,
                r.is_recommend
            FROM review r
            LEFT JOIN booking b ON r.booking_id = b.id
            LEFT JOIN user_account u on b.user_id = u.id
            LEFT JOIN image a ON u.avatar_id = a.id
            WHERE b.property_id = :propertyId
            ORDER BY r.updated_at
            LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findAllByPropertyIdAsc(@NonNull Long propertyId,
                                                 @NonNull Long limit,
                                                 @NonNull Long offset);

    @Query(value = """
            SELECT
                COUNT(r.id)
            FROM review r
            JOIN booking b ON r.booking_id = b.id
            WHERE b.property_id = :propertyId
                """, nativeQuery = true)
    Long findTotalReview(@NonNull Long propertyId);

}
