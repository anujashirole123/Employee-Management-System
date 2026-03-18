import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  const handleDelete = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  return (
    <>
      <style>
        {`
        body{
          margin:0;
          font-family: Arial, sans-serif;
          background: linear-gradient(120deg,#eef2f7,#d9e4f5);
          display:flex;
          justify-content:center;
          align-items:center;
          min-height:100vh;
        }

        .list-container{
          width:600px;
          background:white;
          padding:30px;
          border-radius:12px;
          box-shadow:0 10px 25px rgba(0,0,0,0.15);
          text-align:center;
          animation:fadeIn 1s ease;
        }

        h1{
          margin-bottom:20px;
        }

        .add-btn{
          display:inline-block;
          background:#28a745;
          color:white;
          padding:10px 18px;
          margin-bottom:20px;
          text-decoration:none;
          border-radius:6px;
          transition:0.3s;
        }

        .add-btn:hover{
          background:#218838;
          transform:scale(1.05);
        }

        .employee-table{
          width:100%;
          border-collapse:collapse;
        }

        .employee-table th{
          background:#343a40;
          color:white;
          padding:10px;
        }

        .employee-table td{
          padding:10px;
          border-bottom:1px solid #ddd;
        }

        .button{
          padding:6px 12px;
          border:none;
          border-radius:4px;
          margin:2px;
          cursor:pointer;
        }

        .edit-btn{
          background:#007bff;
          color:white;
        }

        .delete-btn{
          background:#dc3545;
          color:white;
        }

        .edit-btn:hover{
          background:#0056b3;
        }

        .delete-btn:hover{
          background:#a71d2a;
        }

        @keyframes fadeIn{
          from{opacity:0; transform:translateY(20px);}
          to{opacity:1; transform:translateY(0);}
        }
        `}
      </style>

      <div className="list-container">

        <h1>Employee List</h1>

        <Link to="/add" className="add-btn">
          Add Employee
        </Link>

        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>

                <td>
                  <Link to={`/edit/${emp.id}`}>
                    <button className="button edit-btn">Edit</button>
                  </Link>

                  <button
                    className="button delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default EmployeeList;