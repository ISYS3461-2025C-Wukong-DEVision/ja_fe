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
import ToastListener from "../components/common/ToastListener";
import Notification from "../pages/notification/index";
import GoogleCallback from "../components/auth/GoogleCallback";
import PaymentCancel from "../pages/subscription/paymentCancel";
import PaymentSuccess from "../pages/subscription/paymentSuccess";
import JobDetail from "../pages/job/JobDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastListener/>
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
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<Company />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/api/auth/oauth2/callback/google" element={<GoogleCallback />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
