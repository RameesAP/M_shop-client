import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Nav";
import React, { useState } from "react";
import User from "./pages/User";
import AddJob from "./pages/AddJob";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/Privaterouter";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  // const excludedRoutes = ["/sign-in"];
  // const HideMenu = excludedRoutes.some((path) =>
  //   window.location.pathname.startsWith(path)
  // );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <BrowserRouter>
      {currentUser && <Navbar toggleSidebar={toggleSidebar} />}
      {currentUser && <Sidebar isOpen={isSidebarOpen} />}
      <Routes>
        <Route
          path="/sign-in"
          element={currentUser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/addjob" element={<AddJob />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
