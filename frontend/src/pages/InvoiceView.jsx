import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/invoices/${id}`)
      .then(res => res.json())
      .then(data => setInvoice(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!invoice) return <h4>Loading invoice...</h4>;

  // ---------------- Calculate subtotal and GST ----------------
  const subtotal = invoice.items?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;
  const gstAmount = subtotal * 0.18; // 18% GST
  const totalAmount = subtotal + gstAmount;

  return (
    <div className="card p-3">
      <h4>Invoice #{invoice.invoiceNumber}</h4>
      <p><b>Customer:</b> {invoice.customerName}</p>
      <p><b>Phone:</b> {invoice.customerNumber}</p>
      {/* <p><b>Category:</b> {invoice.category}</p> */}

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items?.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.price.toFixed(2)}</td>
              <td>₹ {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mt-2">
        <p><b>Subtotal:</b> ₹ {subtotal.toFixed(2)}</p>
        <p><b>GST (18%):</b> ₹ {gstAmount.toFixed(2)}</p>
        <h5><b>Total:</b> ₹ {totalAmount.toFixed(2)}</h5>
      </div>

      <Link to="/invoices" className="btn btn-secondary mt-3 me-2">Back</Link>

      <button className="btn btn-primary mt-3" onClick={() => window.print()}>
        Print / Download PDF
      </button>
    </div>
  );
};

export default InvoiceView;
