import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  // 🔑 Get role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || ""; // "ADMIN" or "USER"

  useEffect(() => {
    loadInvoices();
  }, []);

  // ================= LOAD INVOICES =================
  const loadInvoices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/invoices", {
        headers: { Role: role } // send role header to backend
      });

      if (!res.ok) {
        console.error("API failed:", res.status);
        setInvoices([]);
        return;
      }

      const data = await res.json();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setInvoices([]);
    }
  };

  // ================= DELETE =================
  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/invoices/${id}`, {
        method: "DELETE",
        headers: { Role: role }
      });

      if (res.ok) {
        alert("Invoice deleted successfully ✅");
        loadInvoices();
      } else {
        alert("Delete failed ❌");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting invoice");
    }
  };

  // ================= SEARCH FILTER =================
  const filtered = invoices.filter(
    (i) =>
      (i.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.invoiceNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4 container">
      <h4>Invoice List</h4>

      <input
        className="form-control mb-3"
        placeholder="Search by customer or invoice number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No invoices
              </td>
            </tr>
          )}

          {filtered.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customerName}</td>
              <td>₹ {inv.totalAmount}</td>
              <td>
                {/* View always visible */}
                <Link
                  to={`/invoices/${inv.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  View
                </Link>

                {/* Delete visible only for ADMIN */}
                {role === "ADMIN" && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteInvoice(inv.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
