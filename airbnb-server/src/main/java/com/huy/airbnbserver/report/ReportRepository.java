package com.huy.airbnbserver.report;

import com.huy.airbnbserver.report.dto.ReportProjection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO report
            (user_id, issue, detail, is_resolved, created_at, report_entity_id, report_type)
        VALUES (:reportedId, :issue, :detail, :isResolved, CURRENT_TIMESTAMP, :reportEntityId, :reportType)""", nativeQuery = true)
    void saveReport(
            @NonNull Integer reportedId,
            @NonNull String issue,
            @NonNull String detail,
            @NonNull Boolean isResolved,
            @NonNull Long reportEntityId,
            @NonNull String reportType);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE report SET is_resolved = true WHERE report.id = :id""", nativeQuery = true)
    void resolveReport(@NonNull Long id);

    @Query(value = """
        SELECT
            r.id,
            r.created_at AS createdAt,
            r.detail,
            r.is_resolved AS isResolved,
            r.issue,
            r.report_entity_id AS reportEntityId,
            r.report_type AS reportType,
            r.user_id AS userId,
            COUNT(*) OVER() AS totalCount
        FROM report r
        WHERE r.report_type = 'Property' AND r.is_resolved = false
        LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<ReportProjection> getAllPropertyReports(
            @NonNull long limit,
            @NonNull long offset
    );

    @Query(value = """
        SELECT
            r.id,
            r.created_at AS createdAt,
            r.detail,
            r.is_resolved AS isResolved,
            r.issue,
            r.report_entity_id AS reportEntityId,
            r.report_type AS reportType,
            r.user_id AS userId,
            COUNT(*) OVER() AS totalCount
        FROM report r
        WHERE r.report_type = 'User' AND r.is_resolved = false
        LIMIT :limit OFFSET :offset""", nativeQuery = true)
    List<ReportProjection> getALlUserReports(
            @NonNull long limit,
            @NonNull long offset
    );
}
