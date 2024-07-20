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
import SingleEdit from "./pages/SingleEdit";
import Preview from "./pages/Preview";
import Completed from "./pages/Completed";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const notify = () => toast("Wow so easy!");
  
  return (
    <BrowserRouter>
       <ToastContainer />
      {currentUser && <Navbar toggleSidebar={toggleSidebar} />}
      {currentUser && <Sidebar isOpen={isSidebarOpen} />}
      <Routes>
        <Route
          path="/sign-in"
          element={currentUser ? <Navigate to="/user" /> : <SignIn />}
        />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/user" element={<User />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/edit/:id" element={<SingleEdit />} />
          <Route path="/getsingle/:id" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
