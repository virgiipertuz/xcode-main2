package com.helios.app.repository;

import com.helios.app.model.SupportReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportReportRepository extends JpaRepository<SupportReport, Long> {
}