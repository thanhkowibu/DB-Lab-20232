package com.huy.airbnbserver.report;

import com.huy.airbnbserver.report.dto.ReportDto;
import com.huy.airbnbserver.report.dto.ReportProjection;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.system.exception.UnprocessableEntityException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    @Transactional
    public void createReport(Integer reporterId,
                             Issue issue,
                             String detail,
                             Long reportEntityId,
                             String reportType) {
        reportRepository.saveReport(
                reporterId,
                issue.name(),
                detail,
                false,
                reportEntityId,
                reportType);
    }

    @Transactional
    public void resolveReport(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow(
                () -> new ObjectNotFoundException("report", reportId)
        );
        if (report.getIsResolved()) {
            throw new UnprocessableEntityException("This report has already been resolved");
        }
        reportRepository.resolveReport(reportId);
    }

    public List<ReportDto> findAllPropertyReports(long limit, long offset) {
        return reportRepository.
                getAllPropertyReports(limit, offset)
                .stream()
                .map(this::mapToReportDto)
                .toList();
    }

    public List<ReportDto> findAllUserReports(long limit, long offset) {
        return reportRepository.
                getALlUserReports(limit, offset)
                .stream()
                .map(this::mapToReportDto)
                .toList();
    }
    private ReportDto mapToReportDto(ReportProjection reportProjection) {
        return new ReportDto(
                reportProjection.getId(),
                reportProjection.getUserId(),
                reportProjection.getCreatedAt(),
                reportProjection.getDetail(),
                reportProjection.getIssue(),
                reportProjection.getIsResolved(),
                new ReportableEntity() {
                    @Override
                    public Long getEntityId() {
                        return reportProjection.getReportEntityId();
                    }

                    @Override
                    public String getType() {
                        return reportProjection.getReportType();
                    }
                },
                reportProjection.getTotalCount()
        );
    }
}
