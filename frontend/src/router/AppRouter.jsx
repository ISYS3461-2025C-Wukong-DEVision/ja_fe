import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/home";
import Job from "../pages/job/index";
import Company from "../pages/company/index";
import CompanyDetail from "../pages/company/CompanyDetail";
import Subscription from "../pages/subscription/index";
import Profile from "../pages/profile/index";
// import Notification from "../pages/notification/index";

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
          <Route path="/jobs" element={<Job/>} />
          <Route path="/companies" element={<Company />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<>notification</>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
