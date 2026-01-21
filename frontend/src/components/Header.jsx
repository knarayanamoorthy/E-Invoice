import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  // 🔑 Logged-in user state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // 🔄 Auto update on login/logout
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">

        {/* 🔷 LOGO */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-receipt me-2"></i>
          E-Invoice System
        </Link>

        {/* ☰ MOBILE MENU */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔗 NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
            </li>

            {user?.role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/invoices/new">
                    <i className="bi bi-plus-circle me-1"></i>
                    Create Invoice
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/invoices">
                    <i className="bi bi-folder2-open me-1"></i>
                    Manage Invoices
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/invoices/report">
                    <i className="bi bi-bar-chart-fill me-1"></i>
                    Invoice Report
                  </Link>
                </li>
              </>
            )}

            {user?.role === "USER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/invoices">
                    <i className="bi bi-eye-fill me-1"></i>
                    View Invoices
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/invoices/report">
                    <i className="bi bi-graph-up-arrow me-1"></i>
                    Invoice Report
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* 👤 USER INFO */}
          <div className="d-flex align-items-center text-white">
            {user ? (
              <>
                <span className="me-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.role}
                </span>

                <button
                  className="btn btn-light btn-sm"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-light btn-sm" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
