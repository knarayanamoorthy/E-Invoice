import axios from "axios";

const API_URL = "http://localhost:8080/api/einvoice";

export const generateEInvoice = (invoiceId) => {
  return axios.post(`${API_URL}/generate/${invoiceId}`);
};

export const getInvoices = () => {
  return axios.get("http://localhost:8080/api/invoice");
};
