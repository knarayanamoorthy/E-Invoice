import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceView = () => {
  const { id } = useParams(); // get invoice ID from URL
  const [invoice, setInvoice] = useState(null);

fetch(`http://localhost:8080/api/invoices/${id}`)
  .then(res => res.json())
  .then(setInvoice);


  useEffect(() => {
    fetch(`http://localhost:8080/api/invoices/${id}`)
      .then((res) => res.json())
      .then(setInvoice);
  }, [id]);

  if (!invoice) return <h4>Loading invoice...</h4>;

  return (
    <div className="card p-4">
      <h3>Invoice #{invoice.invoiceNumber}</h3>
      <p><b>Customer:</b> {invoice.customerName}</p>
      <p><b>Mobile:</b> {invoice.customerNumber}</p>
      <p><b>Category:</b> {invoice.category}</p>
      <p><b>Date:</b> {invoice.date}</p>
      <p><b>Status:</b> {invoice.status}</p>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="mt-3">Subtotal: ₹ {invoice.amount.toFixed(2)}</h5>
      <h6>GST (18%): ₹ {invoice.gstAmount.toFixed(2)}</h6>
      <h4>Total: ₹ {invoice.totalAmount.toFixed(2)}</h4>

      
    </div>
  );
};

export default InvoiceView;
