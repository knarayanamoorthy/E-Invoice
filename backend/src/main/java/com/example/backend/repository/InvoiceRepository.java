package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Invoice findTopByOrderByIdDesc(); // To get last invoice for auto-number
}
