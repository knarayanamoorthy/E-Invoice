import { Link } from "react-router-dom";

const InvoiceItem = ({ invoice, onDelete }) => {
  return (
    <tr>
      <td>{invoice.id}</td>
      <td>{invoice.customerName}</td>
      <td>{invoice.amount}</td>
      <td>{invoice.date}</td>
      <td>
        <Link to={`/invoices/${invoice.id}`}>View</Link> | 
        <Link to={`/invoices/new?id=${invoice.id}`}>Edit</Link> | 
        <button onClick={() => onDelete(invoice.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
