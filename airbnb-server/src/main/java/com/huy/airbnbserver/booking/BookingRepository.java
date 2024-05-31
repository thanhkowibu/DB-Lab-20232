package com.huy.airbnbserver.booking;

import org.springframework.data.jpa.repository.JpaRepository;
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
        SELECT b FROM Booking b
        LEFT JOIN FETCH b.property p
        LEFT JOIN FETCH p.host
        WHERE b.id = :id""")
    Optional<Booking> findByIdEagerPropertyHost(Long id);

    @Query(value = """
        SELECT b FROM Booking b
        LEFT JOIN FETCH b.user
        WHERE b.id = :id""")
    Optional<Booking> findByIdEagerHost(Long id);

    @Query(value = """
            SELECT 
                DISTINCT DATE(check_in_date) AS booking_date
            FROM booking WHERE property_id = :propertyId 
            UNION 
            SELECT 
                DISTINCT DATE(check_out_date) AS booking_date
            FROM booking WHERE property_id = :propertyId""", nativeQuery = true)
    List<Date> findAllBookingDateOfProperty(@NonNull Long propertyId);
}
