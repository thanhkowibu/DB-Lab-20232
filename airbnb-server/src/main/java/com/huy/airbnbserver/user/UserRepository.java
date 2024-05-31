package com.huy.airbnbserver.user;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
