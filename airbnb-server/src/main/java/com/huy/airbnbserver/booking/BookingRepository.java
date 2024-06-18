package com.huy.airbnbserver.booking;

import com.huy.airbnbserver.booking.dto.BookingLogProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.lang.NonNull;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
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
                b.is_checked_out,
                p.longitude,
                p.latitude,
                p.name,
                img.url AS image_url,
                r.booking_id
            FROM booking b
            LEFT JOIN property p ON b.property_id = p.id
            LEFT JOIN user_account u ON u.id = b.user_id
            LEFT JOIN image img ON img.id = (
                SELECT i.id
                FROM image i
                WHERE i.property_id = p.id
                LIMIT 1
            )
            LEFT JOIN review r ON r.booking_id = b.id
            WHERE b.user_id = :userId
            ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findByUserId(Integer userId, long limit, long offset);

    @Query(value = "SELECT COUNT(*) FROM booking b WHERE b.user_id = :userId", nativeQuery = true)
    Long findTotalByUserId(Integer userId);

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
                b.is_checked_out,
                p.longitude,
                p.latitude,
                p.name,
                img.url AS image_url,
                r.booking_id
            FROM booking b
            LEFT JOIN property p ON b.property_id = p.id
            LEFT JOIN user_account u ON u.id = b.user_id
            LEFT JOIN image img ON img.id = (
                SELECT i.id
                FROM image i
                WHERE i.property_id = p.id
                LIMIT 1
            )
            LEFT JOIN review r ON r.booking_id = b.id
            WHERE b.property_id = :propertyId
            ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findByPropertyId(Long propertyId, long limit, long offset);

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
                p.id AS property_id,
                b.num_pets + b.num_childrens + b.num_alduts AS total_guests,
                b.nightly_fee + b.service_fee + b.clean_fee AS total_fee,
                u.email,
                u.firstname,
                b.is_checked_out,
                p.longitude,
                p.latitude,
                p.name,
                img.url AS image_url,
                r.booking_id
            FROM booking b
            LEFT JOIN property p ON b.property_id = p.id
            LEFT JOIN user_account u ON u.id = b.user_id
            LEFT JOIN image img ON img.id = (
                SELECT i.id
                FROM image i
                WHERE i.property_id = p.id
                LIMIT 1
            )
            LEFT JOIN review r ON r.booking_id = b.id
            WHERE p.host_id = :hostId
            AND (
                :filter IS NULL
                OR (
                    (:filter = 'past' AND b.status IN ('CHECK_OUT', 'NO_SHOW', 'REJECTED'))
                    OR (:filter = 'upcoming' AND b.status = 'SUCCESS')
                    OR (:filter = 'cancel' AND b.status = 'CANCEL')
                    OR (:filter = 'pending' AND b.status = 'PENDING')
                )
            )
            ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findByHostId(Integer hostId,String filter, long limit, long offset);

    @Query("SELECT b FROM Booking b WHERE b.status = 'CHECK_OUT'")
    List<Booking> findAllCheckOut();

    @Query(value = """
        SELECT COUNT(*)
        FROM booking b
        JOIN property p ON b.property_id = p.id
        WHERE p.host_id = :hostId
        AND (
            :filter IS NULL
            OR (
                (:filter = 'past' AND b.status IN ('CHECK_OUT', 'NO_SHOW', 'REJECTED'))
                OR (:filter = 'upcoming' AND b.status = 'SUCCESS')
                OR (:filter = 'cancel' AND b.status = 'CANCEL')
                OR (:filter = 'pending' AND b.status = 'PENDING')
            )
        )
        """, nativeQuery = true)
    Long getTotalBookingByHostId(Integer hostId, String filter);

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
            b.is_checked_out,
            p.longitude,
            p.latitude,
            p.name,
            img.url AS image_url,
            r.booking_id
        FROM booking b
        LEFT JOIN property p ON b.property_id = p.id
        LEFT JOIN user_account u ON u.id = b.user_id
        LEFT JOIN image img ON img.id = (
                SELECT i.id
                FROM image i
                WHERE i.property_id = p.id
                LIMIT 1
            )
        LEFT JOIN review r ON r.booking_id = b.id
        WHERE b.id = :id""", nativeQuery = true)
    List<Object[]> findDetailById(@NonNull Long id);

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
            b.is_checked_out,
            p.longitude,
            p.latitude,
            p.name,
            img.url AS image_url,
            r.booking_id
        FROM booking b
        LEFT JOIN property p ON b.property_id = p.id
        LEFT JOIN user_account u ON u.id = b.user_id
        LEFT JOIN image img ON img.id = (
                SELECT i.id
                FROM image i
                WHERE i.property_id = p.id
                LIMIT 1
            )
        LEFT JOIN review r ON r.booking_id = b.id
        ORDER BY b.created_at DESC LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<Object[]> findAllDetail(long limit, long offset);

    @Query(value = "SELECT COUNT(b.id) FROM booking b", nativeQuery = true)
    Long getTotal();


    @Modifying
    @Query(value = "UPDATE booking SET status = :status WHERE id = :id", nativeQuery = true)
    void updateStatus(@NonNull String status,@NonNull Long id);

    @Modifying
    @Query(value = "UPDATE booking SET is_confirm = true, status = 'CONFIRMED' WHERE id = :id", nativeQuery = true)
    void confirmBooking(@NonNull Long id);

    @Modifying
    @Query(value = "UPDATE booking SET is_checked_out = true, status = 'CHECK_OUT' WHERE id = :bookingId", nativeQuery = true)
    void checkOut(@NonNull Long bookingId);

//    @Query(value = """
//            SELECT DISTINCT DATE(check_in_date) AS booking_date
//            FROM booking WHERE property_id = :propertyId AND status NOT IN ('REJECTED','CANCEL') AND booking.check_in_date > CURRENT_DATE
//            UNION
//            SELECT DISTINCT DATE(check_out_date) AS booking_date
//            FROM booking WHERE property_id = :propertyId AND status NOT IN ('REJECTED','CANCEL') AND booking.check_out_date > CURRENT_DATE""", nativeQuery = true)
//    List<Date> findAllBookingDatesOfProperty(@NonNull Long propertyId);

    @Query(value = """
            SELECT DATE(check_in_date) AS check_in_date, DATE(check_out_date) AS check_out_date
            FROM booking WHERE property_id = :propertyId AND status NOT IN ('REJECTED','CANCEL') AND booking.check_out_date >= CURRENT_DATE""", nativeQuery = true)
    List<Object[]> findAllBookingDateOfProperty(@NonNull Long propertyId);

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

    @Modifying
    @Query(value = "INSERT INTO booking_log (description, event_timestamp, event_type, booking_id) VALUES " +
            "(:des, CONVERT_TZ(CURRENT_TIMESTAMP, '+00:00', '+07:00'), :type, :bookingId)",nativeQuery = true)
    void log(@NonNull String type,
             @NonNull Long bookingId,
             @NonNull String des);

    @Query(value = "SELECT event_type AS type, event_timestamp AS time, description FROM booking_log WHERE booking_id = :bookingId",nativeQuery = true)
    List<BookingLogProjection> getLog(@NonNull Long bookingId);

    @Procedure(name = "UpdateBookingStatusAndLog")
    void updateBookingStatusAndLog(Long bookingId, String newStatus, String logDescription);
}
