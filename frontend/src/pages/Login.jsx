import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert("Invalid credentials");
        return;
      }

      const user = await response.json();

      // ✅ Save logged-in user for role-based access
      localStorage.setItem("user", JSON.stringify(user));

      // 🔄 Trigger Header to update immediately
      window.dispatchEvent(new Event("storage"));

      alert(`Welcome ${user.role}`);
      navigate("/"); // go to dashboard
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mt-2">Login</button>
      </form>

      <p className="text-center mt-3">
        Not registered?{" "}
        <Link to="/register" className="text-decoration-none">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default Login;
