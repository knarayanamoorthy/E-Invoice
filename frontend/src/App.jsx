import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InvoiceList from "./pages/InvoiceList";
import InvoiceForm from "./pages/InvoiceForm";
import InvoiceView from "./pages/InvoiceView";
import InvoiceEdit from "./pages/InvoiceEdit";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";   // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Header />

      <div className="container my-4">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ ADD */}

          {/* Invoice Pages */}
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/invoices/new" element={<InvoiceForm />} />
          <Route path="/invoices/:id" element={<InvoiceView />} />
          <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
