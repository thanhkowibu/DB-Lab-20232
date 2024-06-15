package com.huy.airbnbserver.notification;

import com.huy.airbnbserver.notification.model.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO notification " +
            "(created_at, is_read, message, user_id, type, reference_id) " +
            "VALUES (CONVERT_TZ(current_timestamp, '+00:00', '+07:00'), false, :message, :receiverId, :type, :refId)",nativeQuery = true)
    void saveNew(@NonNull Integer receiverId,
                 @NonNull String message,
                 @NonNull Long refId,
                 @NonNull String type);

    @Modifying
    @Transactional
    @Query(value = "UPDATE notification SET is_read = true WHERE user_id = :userId", nativeQuery = true)
    void read(@NonNull Integer userId);

    @Query(value = "SELECT * FROM notification WHERE user_id = :userId ORDER BY created_at DESC", nativeQuery = true)
    List<Notification> findAllByUserId(@NonNull Integer userId);
}
