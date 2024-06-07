package com.huy.airbnbserver.user;

import com.huy.airbnbserver.notification.model.Notification;
import com.huy.airbnbserver.notification.model.NotificationPreferences;
import com.huy.airbnbserver.user.dto.NotificationPreferenceDto;
import com.huy.airbnbserver.user.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM user_account u WHERE u.email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email);

    @NonNull
    @Query(value = "SELECT * FROM user_account u WHERE u.id = :id", nativeQuery = true)
    Optional<User> findById(@NonNull Integer id);

    @Query("SELECT u FROM User u " +
            "LEFT JOIN FETCH u.avatar " +
            "JOIN FETCH u.notificationPreferences "+
            "WHERE u.id = :id")
    Optional<User> findByIdEager(@NonNull Integer id);

    @Query(value = "SELECT u FROM User u LEFT JOIN FETCH u.avatar")
    List<User> findAllEagerAvatar();

    // ADMIN QUERY
    @Query(value = "SELECT COUNT(*) FROM user_account WHERE DATE(created_at) = CURDATE()", nativeQuery = true)
    long countUsersCreatedToday();

    @Query(value = "SELECT COUNT(*) FROM user_account WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())", nativeQuery = true)
    long countUsersCreatedThisMonth();

    @Query(value = "SELECT COUNT(*) FROM user_account WHERE YEAR(created_at) = YEAR(CURDATE())", nativeQuery = true)
    long countUsersCreatedThisYear();

    @Query(value = "SELECT COUNT(*) FROM user_account WHERE DATE(created_at) = :specificDate", nativeQuery = true)
    long countUsersCreatedOnDate(@NonNull String specificDate);

    @Query(value = "SELECT COUNT(*) FROM user_account WHERE YEAR(created_at) = :year AND MONTH(created_at) = :month", nativeQuery = true)
    long countUsersCreatedInMonth(@NonNull int year, @NonNull int month);

    @Query(value = "SELECT COUNT(*) FROM user_account WHERE YEAR(created_at) = :year", nativeQuery = true)
    long countUsersCreatedInYear(@NonNull int year);

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE
            notification_preferences
        SET
            notify_on_booking_status_change = :a,
            notify_on_hosted_property_like = :b,
            notify_on_hosted_property_booked = :c,
            notify_on_hosted_property_rating = :d,
            notify_on_special_offers = :e
        WHERE
            user_id = :userId""", nativeQuery = true
    )
    void updateNotificationPreference(@NonNull Boolean a,
                                      @NonNull Boolean b,
                                      @NonNull Boolean c,
                                      @NonNull Boolean d,
                                      @NonNull Boolean e,
                                      @NonNull Integer userId);

    @Query(value = """
        SELECT
            np.notify_on_hosted_property_rating,
            np.notify_on_hosted_property_like,
            np.notify_on_hosted_property_booked,
            np.notify_on_booking_status_change,
            np.notify_on_special_offers
        FROM notification_preferences np
        WHERE user_id = :userId""",nativeQuery = true)
    List<Object[]> getNotificationPreference(Integer userId);
}
