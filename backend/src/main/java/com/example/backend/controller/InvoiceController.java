package com.example.backend.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.InvoiceReportResponse;
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
        int next = Integer.parseInt(lastInvoice.getInvoiceNumber().split("-")[2]) + 1;
        newInvoiceNumber = "INV-" + LocalDate.now().toString().replace("-", "") +
                "-" + String.format("%03d", next);
    } else {
        newInvoiceNumber = "INV-" + LocalDate.now().toString().replace("-", "") + "-001";
    }

    invoice.setInvoiceNumber(newInvoiceNumber);
    invoice.setDate(LocalDate.now());

    double amount = 0;

    List<InvoiceItem> incomingItems = new ArrayList<>(invoice.getItems());
    invoice.clearItems();

    for (InvoiceItem item : incomingItems) {
        amount += item.getQuantity() * item.getPrice();
        invoice.addItem(item); // 🔥 sets invoice_id properly
    }

    double gst = amount * 0.18;
    invoice.setAmount(amount);
    invoice.setGstAmount(gst);
    invoice.setTotalAmount(amount + gst);

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
 // ================= REPORT =================
    @GetMapping("/report")
    public InvoiceReportResponse getInvoiceReport(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam(defaultValue = "") String customer) {

        LocalDate start = LocalDate.parse(fromDate);
        LocalDate end = LocalDate.parse(toDate);

        List<Invoice> invoices =
                invoiceRepository.findByDateBetweenAndCustomerNameContainingIgnoreCase(
                        start, end, customer
                );

        long totalInvoices = invoices.size();

        double totalRevenue = invoices.stream()
                .mapToDouble(Invoice::getTotalAmount)
                .sum();

        return new InvoiceReportResponse(invoices, totalInvoices, totalRevenue);
    }

    private String generateNextInvoiceNumber(String lastInvoiceNumber) {

    // Example: INV-20260112-005
    String[] parts = lastInvoiceNumber.split("-");

    int next = Integer.parseInt(parts[2]) + 1;

    return "INV-" +
            LocalDate.now().toString().replace("-", "") +
            "-" +
            String.format("%03d", next);
}
}

