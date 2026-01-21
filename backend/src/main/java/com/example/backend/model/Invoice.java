package com.example.backend.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String invoiceNumber;

    private String customerName;
    private String customerNumber;
    private LocalDate date;

    private double amount;
    private double gstAmount;
    private double totalAmount;

    @OneToMany(
        mappedBy = "invoice",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    private List<InvoiceItem> items = new ArrayList<>();

    // helper methods
    public void addItem(InvoiceItem item) {
        items.add(item);
        item.setInvoice(this);
    }

    public void clearItems() {
        for (InvoiceItem item : items) {
            item.setInvoice(null);
        }
        items.clear();
    }


    // ===== getters & setters =====

    public List<InvoiceItem> getItems() {
        return items;
    }

    public void setItems(List<InvoiceItem> items) {
        this.items.clear();
        if (items != null) {
            items.forEach(item -> item.setInvoice(this));
            this.items.addAll(items);
        }
    }

    // other getters/setters (id, customerName, etc.)
    // Getter and Setter for id 
    public Long getId() { 
        return id; 
    } 
    public void setId(Long id) {
         this.id = id; 
        
    } 
    // Getter and Setter for invoiceNumber 
    public String getInvoiceNumber() { 
        return invoiceNumber; 
    } 
    public void setInvoiceNumber(String invoiceNumber) {
         this.invoiceNumber = invoiceNumber; 
    } 
    // Getter and Setter for customerName 
    public String getCustomerName() { 
        return customerName; 
    } 
    public void setCustomerName(String customerName) {
         this.customerName = customerName; 
    } 
    // Getter and Setter for customerNumber
     public String getCustomerNumber() {
         return customerNumber; 
    } 
    public void setCustomerNumber(String customerNumber) {
         this.customerNumber = customerNumber; 
    } 
    // Getter and Setter for date 
    public LocalDate getDate() {
         return date; 
    } 
    public void setDate(LocalDate date) {
         this.date = date; 
    } 
    // Getter and Setter for amount 
    public double getAmount() {
         return amount; 
    } 
    public void setAmount(double amount) {
         this.amount = amount; 
    } 
    // Getter and Setter for gstAmount
    public double getGstAmount() {
         return gstAmount; 
    } 
    public void setGstAmount(double gstAmount) {
         this.gstAmount = gstAmount; 
    } 
    // Getter and Setter for totalAmount 
    public double getTotalAmount() {
         return totalAmount; 
    } 
    public void setTotalAmount(double totalAmount) {
         this.totalAmount = totalAmount; 
    }
}
