import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  // 🔑 State for logged-in user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // 🔄 Listen for login/logout changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // update UI immediately
    navigate("/login");
  };

  return (
    <header style={{ padding: "10px", background: "#007bff", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1 style={{ display: "inline", marginRight: "20px" }}>E-Invoice System</h1>
        <nav style={{ display: "inline" }}>
          <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Dashboard</Link>

          {/* Admin links */}
          {user?.role === "ADMIN" && (
            <>
              <Link to="/invoices/new" style={{ color: "#fff", marginRight: "10px" }}>Create Invoice</Link>
              <Link to="/invoices" style={{ color: "#fff", marginRight: "10px" }}>Manage Invoices</Link>
            </>
          )}

          {/* User links */}
          {user?.role === "USER" && (
            <Link to="/invoices" style={{ color: "#fff", marginRight: "10px" }}>View Invoices</Link>
          )}
        </nav>
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Hi, {user.email}</span>
            <button onClick={handleLogout} style={{ padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: "#fff" }}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
