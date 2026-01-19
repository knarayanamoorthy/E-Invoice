import axios from "axios";

const API_URL = "http://localhost:8080/api/invoices";

export const getInvoices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createInvoice = async (invoice) => {
  const response = await axios.post(API_URL, invoice);
  return response.data;
};

export const updateInvoice = async (id, invoice) => {
  const response = await axios.put(`${API_URL}/${id}`, invoice);
  return response.data;
};

export const deleteInvoice = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
