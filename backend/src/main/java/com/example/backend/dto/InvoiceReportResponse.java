package com.example.backend.dto;
import java.util.List;

import com.example.backend.model.Invoice;

public class InvoiceReportResponse {

    private List<Invoice> invoices;
    private long totalCount;
    private double totalAmount;

    // Getter and Setter for invoices 
    public List<Invoice> getInvoices() { 
        return invoices; 
    }
    public void setInvoices(List<Invoice> invoices) {
         this.invoices = invoices;
    } 
    // Getter and Setter for totalCount
    public long getTotalCount() { 
        return totalCount; 
    } 
    public void setTotalCount(long totalCount) { 
        this.totalCount = totalCount;
     } 
     // Getter and Setter for totalAmount
    public double getTotalAmount() { 
        return totalAmount; 
    } 
    public void setTotalAmount(double totalAmount) {
         this.totalAmount = totalAmount; 
    }

    public InvoiceReportResponse(List<Invoice> invoices, long totalCount, double totalAmount) {
        this.invoices = invoices;
        this.totalCount = totalCount;
        this.totalAmount = totalAmount;
    }

    
}
