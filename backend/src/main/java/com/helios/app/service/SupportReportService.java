package com.helios.app.service;

import com.helios.app.model.SupportReport;
import com.helios.app.repository.SupportReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupportReportService {

    @Autowired
    private SupportReportRepository supportReportRepository;

    public SupportReport saveReport(SupportReport report) {
        return supportReportRepository.save(report);
    }
}