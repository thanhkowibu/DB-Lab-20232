package com.huy.airbnbserver.admin.report;

import com.huy.airbnbserver.admin.report.dto.ReportDto;
import com.huy.airbnbserver.admin.report.dto.ReportProjection;
import com.huy.airbnbserver.system.exception.ObjectNotFoundException;
import com.huy.airbnbserver.system.exception.UnprocessableEntityException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;

    @Transactional
    public void createReport(Integer reporterId,
                             Issue issue,
                             String detail,
                             Integer reportedUserId) {
        reportRepository.saveReport(
                reporterId,
                issue.name(),
                detail,
                false,
                reportedUserId);
    }

//    public List<ReportDto> findAllPropertyReports(long limit, long offset) {
//        return reportRepository.
//                getAllPropertyReports(limit, offset)
//                .stream()
//                .map(this::mapToReportDto)
//                .toList();
//        return new ArrayList<>();
//    }
//
//    public List<ReportDto> findAllUserReports(long limit, long offset) {
//        return reportRepository.
//                getALlUserReports(limit, offset)
//                .stream()
//                .map(this::mapToReportDto)
//                .toList();
//        return new ArrayList<>();
//    }
//
//    public List<ReportDto> findAllHostRequest(long limit, long offset) {
//        return reportRepository.getAllHostRequest(limit, offset)
//                .stream()
//                .map(this::mapToReportDto)
//                .toList();
//        return new ArrayList<>();
//    }

    public List<ReportDto> findAllResolvedReports(long limit, long offset) {
        return reportRepository.getAllResolvedReports(limit, offset)
                .stream()
                .map(this::mapToReportDto)
                .toList();
    }

    public List<ReportDto> findAllReports(long limit, long offset) {
        return reportRepository.getAllReports(limit, offset)
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
                reportProjection.getReportedUserId(),
                reportProjection.getTotalCount()
        );

    }
}
