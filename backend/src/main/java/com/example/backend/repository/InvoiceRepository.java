package com.example.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Invoice findTopByOrderByIdDesc();

    List<Invoice> findByDateBetweenAndCustomerNameContainingIgnoreCase(
            LocalDate startDate,
            LocalDate endDate,
            String customerName
    );
}
