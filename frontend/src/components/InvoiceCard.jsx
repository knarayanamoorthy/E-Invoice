import { generateEInvoice } from "../api/einvoiceApi";

const InvoiceCard = ({ invoice }) => {

  const handleGenerate = () => {
    generateEInvoice(invoice.id)
      .then(() => alert("IRN Generated Successfully"))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "6px"
    }}>
      <p><b>Invoice No:</b> {invoice.invoiceNo}</p>
      <p><b>Total:</b> ₹{invoice.totalValue}</p>
      <p><b>Status:</b> {invoice.gstStatus}</p>

      {invoice.gstStatus !== "IRN_GENERATED" ? (
        <button onClick={handleGenerate}>
          Generate E-Invoice
        </button>
      ) : (
        <p style={{ color: "green" }}>
          IRN: {invoice.irn}
        </p>
      )}
    </div>
  );
};

export default InvoiceCard;
