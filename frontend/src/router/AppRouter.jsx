import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/home";
import Job from "../pages/job";
import Company from "../pages/company";
import Subscription from "../pages/subscription";
import Profile from "../pages/profile";
import Notification from "../pages/notification";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH LAYOUT */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/company" element={<Company />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
