import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const viewOnly = role === "USER";

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [items, setItems] = useState([
    { productName: "", quantity: 1, price: 0 }
  ]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/invoices/${id}`)
        .then(res => res.json())
        .then(data => {
          setCustomerName(data.customerName);
          setCustomerNumber(data.customerNumber);
          setItems(data.items || []);
        });
    }
  }, [id]);

  const handleItemChange = (index, field, value) => {
    if (viewOnly) return;
    const updated = [...items];
    updated[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;
    setItems(updated);
  };

  const addItem = () => {
    if (viewOnly) return;
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    if (viewOnly) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );
  const gstAmount = subtotal * 0.18;
  const totalAmount = subtotal + gstAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewOnly) return;

    const invoiceData = {
      customerName,
      customerNumber,
      items
    };

    const url = id
      ? `http://localhost:8080/api/invoices/${id}`
      : "http://localhost:8080/api/invoices";

    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData)
    });

    alert(id ? "Invoice Updated" : "Invoice Created");
    navigate("/invoices");
  };

  return (
    <div className="card p-3">
      <h4>{viewOnly ? "View Invoice" : id ? "Edit Invoice" : "Create Invoice"}</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Customer Name"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          readOnly={viewOnly}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Customer Number"
          value={customerNumber}
          onChange={e => setCustomerNumber(e.target.value)}
          readOnly={viewOnly}
          required
        />

        <h5>Items</h5>

        {items.map((item, i) => (
          <div className="row mb-2" key={i}>
            <div className="col">
              <input
                className="form-control"
                placeholder="Product"
                value={item.productName}
                onChange={e => handleItemChange(i, "productName", e.target.value)}
                readOnly={viewOnly}
              />
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                value={item.quantity}
                onChange={e => handleItemChange(i, "quantity", e.target.value)}
                readOnly={viewOnly}
              />
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                value={item.price}
                onChange={e => handleItemChange(i, "price", e.target.value)}
                readOnly={viewOnly}
              />
            </div>

            {!viewOnly && (
              <div className="col">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeItem(i)}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}

        {!viewOnly && (
          <button
            type="button"
            className="btn btn-secondary mb-2"
            onClick={addItem}
          >
            Add Item
          </button>
        )}

        <h6>Subtotal: ₹ {subtotal}</h6>
        <h6>GST (18%): ₹ {gstAmount.toFixed(2)}</h6>
        <h5>Total: ₹ {totalAmount.toFixed(2)}</h5>

        {!viewOnly && (
          <button className="btn btn-success mt-2">
            {id ? "Update Invoice" : "Save Invoice"}
          </button>
        )}
      </form>
    </div>
  );
};

export default InvoiceForm;
