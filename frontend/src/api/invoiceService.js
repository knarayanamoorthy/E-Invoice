import axios from "axios";

const API_URL = "http://localhost:8080/api/invoices";

export const getAllInvoices = () => {
    return axios.get(API_URL);
};

export const createInvoice = (invoice) => {
    return axios.post(API_URL, invoice);
};
