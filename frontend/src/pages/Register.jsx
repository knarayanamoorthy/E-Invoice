import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: "USER"   // ✅ default role
        })
      });

      if (!response.ok) {
        alert("Registration failed");
        return;
      }

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Register</h3>

      <form onSubmit={handleRegister}>
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

        <button className="btn btn-success w-100 mt-2">
          Register
        </button>
      </form>

      {/* 🔗 Back to login */}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
