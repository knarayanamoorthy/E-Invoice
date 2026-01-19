import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
  "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"
];

const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // 🔐 get logged user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔁 Image slider
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // 🔓 LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);           // update UI immediately
    navigate("/login");      // redirect to login
  };

  return (
    <div className="container mt-4">

      {/* Image Slider */}
      <div
        style={{
          height: "300px",
          borderRadius: "12px",
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "20px"
        }}
      />

      <h2>Welcome to E-Invoice System</h2>
      <p>Manage invoices securely and professionally.</p>
     

    </div>
  );
};

export default Dashboard;
