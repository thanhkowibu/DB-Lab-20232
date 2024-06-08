package com.huy.airbnbserver.properties;

import com.huy.airbnbserver.properties.enm.Area;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class NativePropertyRepository {
    @PersistenceContext
    private EntityManager entityManager;


    // only use for dynamic column and keyword on sorting query, for school project purpose
    // sql injection prevent by enum checking
    public List<Object[]> findAllNative(String sortColumn, String sortDirection,
                                        String category1, String category2, String tag, Area area,
                                        Double minLongitude, Double maxLongitude, Double minLatitude, Double maxLatitude,
                                        Double minNightlyPrice, Double maxNightlyPrice,
                                        Integer minBeds, Integer minBathrooms, Integer minBedrooms, Integer maxGuest,
                                        Long limit, Long offset) {
        String sql = """
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
            COALESCE(AVG(r.rating), 0) AS averageRating
        FROM property p
        LEFT JOIN image i ON p.id = i.property_id
        LEFT JOIN booking b on b.property_id = p.id LEFT JOIN review r on r.booking_id = b.id
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
        AND (:maxGuest IS NULL OR p.max_guests <= :maxGuest)
        GROUP BY p.id
        ORDER BY""" + " " + sortColumn +" "+ sortDirection +
        " \nLIMIT :limit OFFSET :offset";

        Query query = entityManager.createNativeQuery(sql);

        // Set parameters
        query.setParameter("category1", category1);
        query.setParameter("category2", category2);
        query.setParameter("tag", tag);
        query.setParameter("area", area);
        query.setParameter("minLongitude", minLongitude);
        query.setParameter("maxLongitude", maxLongitude);
        query.setParameter("minLatitude", minLatitude);
        query.setParameter("maxLatitude", maxLatitude);
        query.setParameter("minNightlyPrice", minNightlyPrice);
        query.setParameter("maxNightlyPrice", maxNightlyPrice);
        query.setParameter("minBeds", minBeds);
        query.setParameter("minBathrooms", minBathrooms);
        query.setParameter("minBedrooms", minBedrooms);
        query.setParameter("limit", limit);
        query.setParameter("offset", offset);
        query.setParameter("maxGuest", maxGuest);

        return query.getResultList();
    }

}
