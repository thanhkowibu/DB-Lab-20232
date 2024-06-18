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
        String indexSql = """
        SELECT
            p.id AS id,
            p.nightly_price AS nightlyPrice,
            p.name AS name,
            p.longitude AS longitude,
            p.latitude AS latitude,
            p.created_at AS createdAt,
            p.updated_at AS updatedAt,
            p.num_beds AS numBeds,
            (SELECT GROUP_CONCAT(DISTINCT i.id ORDER BY i.id)
                 FROM image i
                 WHERE i.property_id = p.id) AS imageIds,
            (SELECT GROUP_CONCAT(DISTINCT i.url ORDER BY i.id)
                 FROM image i
                 WHERE i.property_id = p.id) AS imageUrls,
            (SELECT GROUP_CONCAT(DISTINCT i.name ORDER BY i.id)
                 FROM image i
                 WHERE i.property_id = p.id) AS imageNames,
            p.average_rating AS averageRating
        FROM property p
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
        AND (:maxGuest IS NULL OR p.max_guests >= :maxGuest)
        ORDER BY""" + " " + sortColumn +" "+ sortDirection +
        " \nLIMIT :limit OFFSET :offset";

        String ratingSql = """
                SELECT
                    p.id AS id,
                    p.nightly_price AS nightlyPrice,
                    p.name AS name,
                    p.longitude AS longitude,
                    p.latitude AS latitude,
                    p.created_at AS createdAt,
                    p.updated_at AS updatedAt,
                    p.num_beds AS numBeds,
                    GROUP_CONCAT(DISTINCT i.id ORDER BY i.id) AS imageIds,
                    GROUP_CONCAT(DISTINCT i.url ORDER BY i.id) AS imageUrls,
                    GROUP_CONCAT(DISTINCT i.name ORDER BY i.id) AS imageNames,
                    t.averageRating AS averageRating
                FROM property p
                LEFT JOIN image i ON i.property_id = p.id
                JOIN (
                    SELECT
                        p.id,
                        p.average_rating AS averageRating
                    FROM property p
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
                    AND (:maxGuest IS NULL OR p.max_guests >= :maxGuest)
                    ORDER BY averageRating"""+" "+sortDirection+" "+ """
                LIMIT :limit OFFSET :offset
                ) t ON p.id = t.id
                GROUP BY p.id, t.averageRating
                ORDER BY t.averageRating"""+" "+sortDirection;

        String sql;
        if (sortColumn.equals("averageRating")) {
            sql = ratingSql;
        } else {
            sql = indexSql;
        }

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
