package com.huy.airbnbserver.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query( "SELECT c FROM Comment c " +
            "LEFT JOIN FETCH c.user u " +
            "lEFT JOIN FETCH u.avatar " +
            "WHERE c.property.id = :propertyId")
    List<Comment> findAllByPropertyIdWithEagerFetching(Long propertyId);

    @NonNull
    @Query(value = "SELECT c.* FROM comment c WHERE c.id = :id", nativeQuery = true)
    Optional<Comment> findByIdLazy(@NonNull Long id);

    @Query(value = "SELECT c FROM Comment c " +
            "LEFT JOIN FETCH c.user u " +
            "LEFT JOIN FETCH u.avatar " +
            "WHERE c.id = :id")
    Optional<Comment> findByIdEager(@NonNull Long id);

    @Query(value = """
            SELECT
                c.id,
                c.content,
                c.rating,
                c.created_at,
                c.updated_at,
                u.id,
                u.firstname,
                u.lastname,
                u.email,
                u.enabled,
                u.created_at,
                u.updated_at,
                a.url,
                a.name
            FROM comment c
            LEFT JOIN user_account u ON u.id = c.user_id
            LEFT JOIN image a ON a.id = u.avatar_id
            WHERE c.property_id = :propertyId
            ORDER BY c.updated_at DESC
            LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findAllByPropertyIdNativeDesc(@NonNull Long propertyId,
                                             @NonNull Long limit,
                                             @NonNull Long offset);

    @Query(value = """
            SELECT
                COUNT(c.id)
            FROM comment c
            WHERE c.property_id = :propertyId
                """, nativeQuery = true)
    Long findTotalComment(@NonNull Long propertyId);

    @Query(value = """
            SELECT
                c.id,
                c.content,
                c.rating,
                c.created_at,
                c.updated_at,
                u.id,
                u.firstname,
                u.lastname,
                u.email,
                u.enabled,
                u.created_at,
                u.updated_at,
                a.url,
                a.name
            FROM comment c
            LEFT JOIN user_account u ON u.id = c.user_id
            LEFT JOIN image a ON a.id = u.avatar_id
            WHERE c.property_id = :propertyId
            ORDER BY c.updated_at
            LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findAllByPropertyIdNativeAsc(@NonNull Long propertyId,
                                                 @NonNull Long limit,
                                                 @NonNull Long offset);
}
