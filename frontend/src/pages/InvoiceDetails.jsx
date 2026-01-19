import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../services/invoiceService";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    const data = await getInvoiceById(id);
    setInvoice(data);
  };

  if(!invoice) return <p>Loading...</p>;

  return (
    <div>
      <h2>Invoice Details</h2>
      <p><strong>ID:</strong> {invoice.id}</p>
      <p><strong>Customer:</strong> {invoice.customerName}</p>
      <p><strong>Amount:</strong> {invoice.amount}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
    </div>
  );
};

export default InvoiceDetails;
