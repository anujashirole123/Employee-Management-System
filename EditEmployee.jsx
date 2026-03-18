import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(emp => emp.id === Number(id));
    if (emp) {
      setName(emp.name);
      setRole(emp.role);
    }

    // Create stars
    const tempStars = [];
    for (let i = 0; i < 50; i++) {
      tempStars.push({
        id: i,
        top: Math.random() * 200, // scrollable height
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5
      });
    }
    setStars(tempStars);
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.map(emp => emp.id === Number(id) ? { ...emp, name, role } : emp);
    localStorage.setItem("employees", JSON.stringify(updated));
    navigate("/employees");
  };

  return (
    <>
      <style>{`
        html, body, #root {
          margin:0;
          font-family: Arial, sans-serif;
          min-height:100%;
          background: linear-gradient(135deg, #191827, #17071a);
          overflow-x: hidden;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 3s infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 0.2; transform: translateY(2px); }
        }

        .edit-card-container {
          display:flex;
          justify-content:center;
          padding:40px 20px;
        }

        .edit-card {
          width:90%;
          max-width:500px;
          background: rgba(17,17,59,0.95);
          padding:30px 35px;
          border-radius:15px;
          box-shadow:0 12px 25px rgba(0,0,0,0.5);
          color:#fff;
          text-align:center;
          opacity:0;
          transform:translateY(20px);
          animation:fadeIn 0.8s forwards;
          position: relative;
          z-index:1;
        }

        h1 {
          font-size:28px;
          background: linear-gradient(90deg,#3b82f6,#2563eb);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          margin-bottom:20px;
        }

        form {
          display:flex;
          flex-direction:column;
          gap:15px;
        }

        input {
          padding:10px;
          border-radius:5px;
          border:1px solid #fff;
          font-size:16px;
          background: rgba(5,2,2,0.2);
          color:#fff;
          transition: all 0.3s ease;
        }

        input::placeholder { color:#eee; }

        input:focus {
          border-color:#ff69b4;
          box-shadow:0 0 6px rgba(255,105,180,0.5);
          outline:none;
        }

        button {
          background:#ff1493;
          color:#fff;
          border:none;
          padding:12px;
          border-radius:5px;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background:#ff69b4;
          transform: translateY(-2px);
          box-shadow:0 6px 15px rgba(255,105,180,0.5);
        }

        @keyframes fadeIn{
          from{opacity:0; transform:translateY(20px);}
          to{opacity:1; transform:translateY(0);}
        }

        @media (max-width:500px){
          .edit-card { width:95%; padding:25px; }
          input { font-size:14px; padding:8px; }
          button { font-size:14px; padding:10px; }
        }
      `}</style>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}vh`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <div className="edit-card-container">
        <div className="edit-card">
          <h1>Edit Employee</h1>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee Name"
              required
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Employee Role"
              required
            />
            <button type="submit">Update Employee</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;