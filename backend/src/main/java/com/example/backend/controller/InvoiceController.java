package com.example.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Invoice;
import com.example.backend.model.InvoiceItem;
import com.example.backend.repository.InvoiceRepository;
@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceRepository invoiceRepository;

    public InvoiceController(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    // ================= CREATE =================
    @PostMapping
    public Invoice saveInvoice(@RequestBody Invoice invoice) {

        Invoice lastInvoice = invoiceRepository.findTopByOrderByIdDesc();
        String newInvoiceNumber;

        if (lastInvoice != null && lastInvoice.getInvoiceNumber() != null) {
            String lastNumber = lastInvoice.getInvoiceNumber().split("-")[2];
            int next = Integer.parseInt(lastNumber) + 1;
            newInvoiceNumber = "INV-" + LocalDate.now().toString().replace("-", "") +
                    "-" + String.format("%03d", next);
        } else {
            newInvoiceNumber = "INV-" + LocalDate.now().toString().replace("-", "") + "-001";
        }

        invoice.setInvoiceNumber(newInvoiceNumber);

        if (invoice.getDate() == null) {
            invoice.setDate(LocalDate.now());
        }

        double amount = 0;
        for (InvoiceItem item : invoice.getItems()) {
            amount += item.getQuantity() * item.getPrice();
            item.setInvoice(invoice);
        }

        double gst = amount * 0.18;
        double total = amount + gst;

        invoice.setAmount(amount);
        invoice.setGstAmount(gst);
        invoice.setTotalAmount(total);

        return invoiceRepository.save(invoice);
    }

    // ================= READ =================
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {

        Invoice existing = invoiceRepository.findById(id).orElseThrow();

        existing.setCustomerName(invoice.getCustomerName());
        existing.setCustomerNumber(invoice.getCustomerNumber());

        existing.getItems().clear();
        double amount = 0;

        for (InvoiceItem item : invoice.getItems()) {
            item.setInvoice(existing);
            existing.getItems().add(item);
            amount += item.getQuantity() * item.getPrice();
        }

        double gst = amount * 0.18;
        existing.setAmount(amount);
        existing.setGstAmount(gst);
        existing.setTotalAmount(amount + gst);

        return invoiceRepository.save(existing);
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceRepository.deleteById(id);
    }
}
