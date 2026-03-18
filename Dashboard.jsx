import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const attendanceStats = { present: 18, absent: 7 };
  const pendingLeavesStats = [
    { name: "Rahul Patil", days: 2 },
    { name: "Rohan Kulkarni", days: 1 },
    { name: "Sanya Deshmukh", days: 3 },
  ];

  const employeeList = [
    "Anu Sharma",
    "Rahul Patil",
    "Sanya Deshmukh",
    "Pruthvii More",
    "Rohan Kulkarni",
  ];

  const departmentsList = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const newEmployeesList = ["Sanya Deshmukh", "Pruthvii More"];
  const attendanceList = [
    { name: "Anu Sharma", status: "Present" },
    { name: "Rahul Patil", status: "Absent" },
    { name: "Sanya Deshmukh", status: "Present" },
    { name: "Pruthvii More", status: "Present" },
    { name: "Rohan Kulkarni", status: "Absent" },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAttendanceTable, setShowAttendanceTable] = useState(false);
  const [showPendingLeavesTable, setShowPendingLeavesTable] = useState(false);
  const [showEmployeesTable, setShowEmployeesTable] = useState(false);
  const [showDepartmentsTable, setShowDepartmentsTable] = useState(false);
  const [showNewEmployeesTable, setShowNewEmployeesTable] = useState(false);
  const [bgPos, setBgPos] = useState(0);

  const cards = [
    { title: "Total Employees", value: employeeList.length, color: "#3b82f6", isEmployees: true },
    { title: "Departments", value: departmentsList.length, color: "#10b981", isDepartments: true },
    { title: "New Employees", value: newEmployeesList.length, color: "#f59e0b", isNewEmployees: true },
    { title: "Pending Leaves", value: pendingLeavesStats.length, color: "#f97316", isPendingLeaves: true },
    { title: "Attendance Today", value: `${attendanceStats.present} Present / ${attendanceStats.absent} Absent`, color: "#14b8a6", isAttendance: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgPos((prev) => (prev + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        background: `linear-gradient(135deg, #191827, #17071a, #1f1a2f, #3b0f4a) ${bgPos}% 0% / 200% 200%`,
        transition: "background-position 0.5s linear",
        color: "#fff",
      }}
    >
      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "36px",
        textShadow: "2px 2px 6px rgba(0,0,0,0.7)"
      }}>
        Employee Dashboard
      </h1>

      {/* Cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
        {cards.map((card, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              if (card.isAttendance) setShowAttendanceTable(!showAttendanceTable);
              if (card.isPendingLeaves) setShowPendingLeavesTable(!showPendingLeavesTable);
              if (card.isEmployees) setShowEmployeesTable(!showEmployeesTable);
              if (card.isDepartments) setShowDepartmentsTable(!showDepartmentsTable);
              if (card.isNewEmployees) setShowNewEmployeesTable(!showNewEmployeesTable);
            }}
            style={{
              background: `linear-gradient(135deg, ${card.color}, #00000030)`,
              padding: "30px",
              borderRadius: "15px",
              width: "220px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: hoveredCard === index ? "scale(1.1) rotateZ(1deg)" : "scale(1)",
              boxShadow: hoveredCard === index
                ? `0 15px 30px rgba(0,0,0,0.5)`
                : `0 5px 15px rgba(0,0,0,0.2)`,
              marginBottom: "20px",
              fontWeight: "500",
              color: "#fff",
              backdropFilter: "blur(8px)",
              animation: "fadeSlide 0.6s ease",
            }}
          >
            <h2>{card.title}</h2>
            <p style={{ fontSize: card.isAttendance || card.isPendingLeaves ? "18px" : "30px", marginTop: "10px" }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tables */}
      {[{show: showAttendanceTable, title: "Attendance Details", data: attendanceList, cols: ["Employee Name", "Status"]},
        {show: showPendingLeavesTable, title: "Pending Leaves", data: pendingLeavesStats, cols: ["Employee Name", "Pending Days"]},
        {show: showEmployeesTable, title: "Total Employees", data: employeeList.map(e => ({ name: e })), cols: ["Employee Name"]},
        {show: showDepartmentsTable, title: "Departments", data: departmentsList.map(d => ({ name: d })), cols: ["Department Name"]},
        {show: showNewEmployeesTable, title: "New Employees", data: newEmployeesList.map(n => ({ name: n })), cols: ["Employee Name"]},
      ].map((table, i) => table.show && (
        <div key={i} style={{ marginTop: "30px", textAlign: "center", animation: "fadeSlide 0.6s ease" }}>
          <h2>{table.title}</h2>
          <table style={{
            margin: "auto",
            borderCollapse: "collapse",
            width: "80%",
            background: "#1e1b2f",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            <thead>
              <tr>
                {table.cols.map((col, idx) => (
                  <th key={idx} style={{
                    borderBottom: "1px solid #555",
                    padding: "12px",
                    backgroundColor: "#2a243f",
                    color: "#fff",
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, idy) => (
                    <td key={idy} style={{
                      borderBottom: "1px solid #555",
                      padding: "10px",
                      color: row.status === "Present" ? "#10b981" : row.status === "Absent" ? "#ef4444" : "#fff",
                      fontWeight: row.status ? "bold" : "normal",
                      textAlign: "center",
                    }}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Search */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #444",
            fontSize: "16px",
            outline: "none",
            background: "#1e1b2f",
            color: "#fff",
            transition: "box-shadow 0.3s ease",
          }}
          onFocus={(e) => e.target.style.boxShadow = "0 0 10px rgba(59,130,246,0.6)"}
          onBlur={(e) => e.target.style.boxShadow = "none"}
        />
        <button
          onClick={() => alert(`Searching for: ${searchTerm}`)}
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            backgroundColor: "#3b82f6",
            color: "#fff",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
        >
          Search
        </button>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          style={btnStyle("#10b981")}
          onClick={() => navigate("/add")}
        >
          Add Employee
        </button>
        <button
          style={btnStyle("#f59e0b")}
          onClick={() => navigate("/employees")}
        >
          View Employee List
        </button>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from {opacity: 0; transform: translateY(-15px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

const btnStyle = (bg) => ({
  padding: "15px 30px",
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
});

export default Dashboard;