import { useState } from "react";

const InvoiceReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [report, setReport] = useState([]);
  const [totals, setTotals] = useState({ totalInvoices: 0, totalRevenue: 0 });

  // ✅ Load report from backend
  const loadReport = async () => {
    const res = await fetch(
      `http://localhost:8080/api/invoices/report?fromDate=${fromDate}&toDate=${toDate}&customer=${customer}`
    );
    const data = await res.json();

    // Assuming backend returns { invoices: [...], totalInvoices: x, totalRevenue: y }
    setReport(data.invoices || []);
    setTotals({ totalInvoices: data.totalInvoices, totalRevenue: data.totalRevenue });
    console.log("Report API Response:", data);

  };

  // ✅ Download report as CSV
  const downloadCSV = () => {
    if (!report.length) return;

    const headers = ["Invoice Number", "Customer", "Date", "Amount", "Status"];
    const rows = report.map(inv => [
      inv.invoiceNumber,
      inv.customerName,
      inv.date,
      inv.amount,
     
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `invoice_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Print report
  const printReport = () => {
    const printContent = document.getElementById("report-table").outerHTML;
    const newWin = window.open("", "_blank");
    newWin.document.write(`<html><head><title>Invoice Report</title></head><body>${printContent}</body></html>`);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="container mt-4">
      <h4>Invoice Report</h4>

      {/* 🔍 Filter */}
      <div className="row mb-3">
        <div className="col">
          <label>From Date</label>
          <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>
        <div className="col">
          <label>To Date</label>
          <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
        <div className="col">
          <label>Customer</label>
          <input type="text" className="form-control" placeholder="Customer name" value={customer} onChange={e => setCustomer(e.target.value)} />
        </div>
        <div className="col d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={loadReport}>Generate</button>
        </div>
      </div>

      {/* 📊 Totals & Actions */}
      {report.length > 0 && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <strong>Total Invoices:</strong> {totals.totalInvoices} &nbsp; | &nbsp;
            <strong>Total Revenue:</strong> ₹ {totals.totalRevenue}
          </div>
          <div>
            <button className="btn btn-success me-2" onClick={downloadCSV}>Download CSV</button>
            <button className="btn btn-secondary" onClick={printReport}>Print</button>
          </div>
        </div>
      )}

      {/* 📝 Invoice Table */}
      {report.length > 0 && (
        <div id="report-table" className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Invoice Number</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                
              </tr>
            </thead>
            <tbody>
              {report.map((inv, index) => (
                <tr key={inv.id || index}>
                  <td>{index + 1}</td>
                  <td>{inv.invoiceNumber}</td>
                  <td>{inv.customerName}</td>
                  <td>{inv.date}</td>
                  <td>₹ {inv.amount}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No data message */}
      {report.length === 0 && <p className="text-muted">No invoices to display.</p>}
    </div>
  );
};

export default InvoiceReport;
