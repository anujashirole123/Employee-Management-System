import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < 120; i++) { // ⭐ more stars = better look
      tempStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3
      });
    }
    setStars(tempStars);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html, #root {
          height: 100%;
          width: 100%;
          overflow-x: hidden; /* ❌ right gap fix */
          font-family: Arial, sans-serif;
        }

        body {
          background: radial-gradient(circle at top, #1a1a2e, #0f0f1a);
        }

        /* Stars */
        .stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 3s infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: translateY(0px);}
          50% { opacity: 1; transform: translateY(-2px);}
          100% { opacity: 0.2; transform: translateY(2px);}
        }

        /* Main container */
        .home-container {
          min-height: 100vh; /* ✅ full height fix */
          width: 100%;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          background: rgba(59,130,246,0.9);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo { font-size: 24px; font-weight: bold; }
        .nav-links { display: flex; gap: 15px; }

        .nav-btn {
          color: #fff;
          text-decoration: none;
          padding: 8px 15px;
          border-radius: 5px;
          font-weight: 600;
          transition: 0.3s;
        }

        .nav-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .logout-btn { background: #dc2626; }
        .logout-btn:hover { background: #b91c1c; }

        /* Hero */
        .hero-section {
          text-align: center;
          padding: 60px 20px;
          color: #fff;
        }

        .hero-section h1 {
          font-size: 38px;
          margin-bottom: 15px;
        }

        .hero-section p {
          color: #d1d5db;
          margin-bottom: 25px;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 25px;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-primary {
          background: #3b82f6;
          color: #fff;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #10b981;
          color: #fff;
        }

        .btn-secondary:hover {
          background: #059669;
        }

        /* Features */
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 30px;
        }

        .feature-card {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          width: 240px;
          border-radius: 12px;
          text-align: center;
          color: #fff;
          backdrop-filter: blur(10px);
          transition: 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

      `}</style>

      {/* Stars */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main */}
      <div className="home-container">
        {/* Navbar */}
        <nav className="navbar">
          <h2 className="logo">EmployeeMS</h2>
          <div className="nav-links">
            <Link to="/home" className="nav-btn">Home</Link>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <Link to="/employees" className="nav-btn">Employee List</Link>
            <Link to="/add" className="nav-btn">Add Employee</Link>
            <Link to="/contact" className="nav-btn">Contact</Link>
            <Link to="/" className="nav-btn logout-btn">Logout</Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-section">
          <h1>Welcome to Employee Management System</h1>
          <p>Manage your employees efficiently. Add, edit, delete, and track all employee records easily.</p>

          <div className="hero-buttons">
            <Link to="/employees" className="btn-primary">View Employees</Link>
            <Link to="/add" className="btn-secondary">Add New Employee</Link>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <h3>Add Employees</h3>
            <p>Easily add new employees with complete details like name, role, and contact info.</p>
          </div>

          <div className="feature-card">
            <h3>Edit Employees</h3>
            <p>Update employee details whenever needed.</p>
          </div>

          <div className="feature-card">
            <h3>Manage Records</h3>
            <p>View and manage all employee data easily.</p>
          </div>

          <div className="feature-card">
            <h3>Contact Support</h3>
            <p>Quickly contact admin for support.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;