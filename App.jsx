// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

// Components
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Add Employee */}
        <Route path="/add" element={<AddEmployee />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/contact" element={<Contact />} />

        {/* Employee Management */}
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditEmployee />} />

        {/* Catch All */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;