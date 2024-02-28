import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Nav";

import React, { useState } from "react";
import User from "./pages/User";
import AddJob from "./pages/AddJob";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Routes>
        <Route path="/sign-in" element />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/addjob" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
