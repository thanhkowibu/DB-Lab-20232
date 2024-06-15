package com.huy.airbnbserver.admin;

import com.huy.airbnbserver.admin.dto.BookingStatusCountProjection;
import com.huy.airbnbserver.booking.Booking;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface AdminRepository extends JpaRepository<Booking, Long> {

    // Get total Revenue in a year (all property) - admin
    @Query(value = "SELECT MONTH(b.check_out_date) AS m, SUM(b.nightly_fee * DATEDIFF(b.check_out_date, b.check_in_date) + b.clean_fee + b.service_fee) " +
            "FROM booking b " +
            "WHERE b.status = 'CHECK_OUT' " +
            "AND YEAR(b.check_out_date) = :year " +
            "GROUP BY MONTH(b.check_out_date) " +
            "ORDER BY m", nativeQuery = true)
    List<Object[]> findRevenueInYear(int year);

    // Get total Revenue in a month (all property) - admin
    @Query(value = "SELECT DAY(b.check_out_date) AS d, SUM(b.nightly_fee * DATEDIFF(b.check_out_date, b.check_in_date) + b.clean_fee + b.service_fee) " +
            "FROM booking b " +
            "WHERE b.status = 'CHECK_OUT' " +
            "AND YEAR(b.check_out_date) = :year " +
            "AND MONTH(b.check_out_date) = :month " +
            "GROUP BY DAY(b.check_out_date) " +
            "ORDER BY d", nativeQuery = true)
    List<Object[]> findRevenueInMonth(int year, int month);

    @Query(value = "SELECT MONTH(b.created_at), SUM(b.nightly_fee * DATEDIFF(b.check_out_date, b.check_in_date) + b.clean_fee + b.service_fee) " +
            "FROM booking b " +
            "JOIN property p ON b.property_id = p.id " +
            "WHERE b.status = 'CHECK_OUT' " +
            "AND YEAR(b.created_at) = :year " +
            "AND p.host_id = :hostId " +
            "GROUP BY MONTH(b.created_at)", nativeQuery = true)
    List<Object[]> findRevenueByHostInYear(int year, Integer hostId);

    @Query(value = "SELECT DAY(b.created_at), SUM(b.nightly_fee * DATEDIFF(b.check_out_date, b.check_in_date) + b.clean_fee + b.service_fee) " +
            "FROM booking b " +
            "JOIN property p ON b.property_id = p.id " +
            "WHERE b.status = 'CHECK_OUT' " +
            "AND YEAR(b.created_at) = :year " +
            "AND MONTH(b.created_at) = :month " +
            "AND p.host_id = :hostId " +
            "GROUP BY DAY(b.created_at)", nativeQuery = true)
    List<Object[]> findRevenueByHostInMonth(int year, int month, Integer hostId);

    @Query(value = "SELECT " +
            "SUM(CASE WHEN b.status = 'CANCEL' THEN 1 ELSE 0 END) AS cancel, " +
            "SUM(CASE WHEN b.status = 'CHECK_OUT' THEN 1 ELSE 0 END) AS checkedOut, " +
            "SUM(CASE WHEN b.status = 'NO_SHOW' THEN 1 ELSE 0 END) AS noShow " +
            "FROM " +
            "Booking b " +
            "WHERE " +
            "MONTH(b.check_in_date) = :month AND " +
            "YEAR(b.check_in_date) = :year", nativeQuery = true)
    BookingStatusCountProjection findBookingStatus(int year, int month);


    @Query(value = "SELECT " +
            "(SELECT COUNT(u.id) FROM user_account u " +
            "WHERE MONTH(u.created_at) = MONTH(CURRENT_DATE()) AND YEAR(u.created_at) = YEAR(CURRENT_DATE())) as currentMonthUserCount, " +
            "(SELECT COUNT(b.id) FROM booking b " +
            "WHERE MONTH(b.check_in_date) = MONTH(CURRENT_DATE()) AND YEAR(b.check_in_date) = YEAR(CURRENT_DATE())) as currentMonthBookingCount, " +
            "(SELECT COUNT(u.id) FROM user_account u " +
            "WHERE MONTH(u.created_at) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) AND YEAR(u.created_at) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))) as lastMonthUserCount, " +
            "(SELECT COUNT(b.id) FROM booking b " +
            "WHERE MONTH(b.check_in_date) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) AND YEAR(b.check_in_date) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))) as lastMonthBookingCount",
            nativeQuery = true)
    List<Object[]> countUsersAndBookingsByCurrentAndLastMonth();

    @Modifying
    @Transactional
    @Query(value = "UPDATE user_account SET roles = 'user admin' WHERE id = :userId",nativeQuery = true)
    void setAdminPrivilege(@NonNull Integer userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user_account SET roles = 'user' WHERE id = :userId", nativeQuery = true)
    void setUserPrivilege(@NonNull Integer userId);
}
