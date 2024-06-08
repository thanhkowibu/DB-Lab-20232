package com.huy.airbnbserver.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query(value = "SELECT * FROM booking b WHERE b.user_id = :userId ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Booking> findByUserId(Integer userId, long limit, long offset);

    @Query(value = "SELECT COUNT(*) FROM booking b WHERE b.user_id = :userId", nativeQuery = true)
    Long findTotalByUserId(Integer userId);

    @Query(value = "SELECT * FROM booking b WHERE b.property_id = :propertyId ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Booking> findByPropertyId(Long propertyId, long limit, long offset);

    @Query(value = "SELECT COUNT(*) FROM booking b WHERE b.property_id = :propertyId", nativeQuery = true)
    Long getTotalBookingByPropertyId(Long propertyId);

    @Query(value = """
        SELECT
            b.id,
            b.check_in_date,
            b.check_out_date,
            b.created_at,
            b.is_confirm,
            b.nightly_fee,
            b.clean_fee,
            b.service_fee,
            b.num_alduts,
            b.num_childrens,
            b.num_pets,
            b.status,
            b.user_id,
            p.host_id,
            p.id,
            b.num_pets + b.num_childrens + b.num_alduts,
            b.nightly_fee + b.service_fee + b.clean_fee,
            u.email,
            u.firstname,
            b.is_checked_out
        FROM booking b
        LEFT JOIN property p ON b.property_id = p.id
        LEFT JOIN user_account u ON u.id = b.user_id
        LEFT JOIN card c ON c.user_id = u.id
        WHERE b.id = :id""", nativeQuery = true)
    List<Object[]> findDetailById(@NonNull Long id);


    @Modifying
    @Query(value = "UPDATE booking SET status = :status WHERE id = :id", nativeQuery = true)
    void updateStatus(@NonNull String status,@NonNull Long id);

    @Modifying
    @Query(value = "UPDATE booking SET is_confirm = true WHERE id = :id", nativeQuery = true)
    void confirmBooking(@NonNull Long id);

    @Modifying
    @Query(value = "UPDATE booking SET is_checked_out = true, status = 'CHECK_OUT' WHERE id = :bookingId", nativeQuery = true)
    void checkOut(@NonNull Long bookingId);

    @Query(value = """
            SELECT DISTINCT DATE(check_in_date) AS booking_date
            FROM booking WHERE property_id = :propertyId AND status NOT IN ('REJECTED','CANCEL') AND booking.check_in_date > CURRENT_DATE
            UNION
            SELECT DISTINCT DATE(check_out_date) AS booking_date
            FROM booking WHERE property_id = :propertyId AND status NOT IN ('REJECTED','CANCEL') AND booking.check_out_date > CURRENT_DATE""", nativeQuery = true)
    List<Date> findAllBookingDateOfProperty(@NonNull Long propertyId);

    @Query(value = """
        SELECT
            b.id,
            p.host_id
        FROM
            Booking b
        LEFT JOIN property p ON b.property_id = p.id
        WHERE b.check_out_date < CURRENT_DATE
        AND b.status = 'SUCCESS'
        AND b.is_checked_out = false""", nativeQuery = true)
    List<Object[]> findPendingCheckoutsPastEndDate();
}
