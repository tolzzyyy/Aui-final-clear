import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Components/Landing/Layout";
import Hero from "./Components/Landing/Hero";
import Features from "./Components/Landing/Features";
import Howitworks from "./Components/Landing/Howitworks";
import Faq from "./Components/Landing/Faq";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Success from "./Components/Auth/Success";
import UserLayout from "./Components/Users/UserLayout";
import ResetPassword from "./Components/Auth/ResetPassword";
import UserDashboard from "./Components/Users/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import UserDocuments from "./Components/Users/UserDocuments";
import UserStatus from "./Components/Users/UserStatus";
import UserSubmitDocuments from "./Components/Users/UserSubmitDocuments";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    const publicPaths = ["/", "/signin", "/signup", "/forgotpassword", "/features", "/faq", "/how-it-works", "/confirmation-code", "/success"];
    const isResetPasswordPath = location.pathname.startsWith("/reset-password");
    const isPublicRoute = publicPaths.includes(location.pathname) || isResetPasswordPath;
    const isProtectedRoute = !isPublicRoute;

    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (isProtectedRoute && !user) {
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      if (isProtectedRoute) {
        navigate("/signin", { replace: true });
      }
    }
  }, [location, navigate]);

  const ProtectedRoute = ({ children, requiredRole }) => {
    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      
      if (!user) {
        return <Navigate to="/signin" replace />;
      }
      
      // Special handling for user dashboard (student-only)
      if (location.pathname.startsWith("/userdashboard") && user.role !== "student") {
        return <Navigate to="/" replace />;
      }
      
      // Check role if required
      if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
      }
      
      return children;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return <Navigate to="/signin" replace />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<Howitworks />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/userdashboard" index element={<UserDashboard />} />
          <Route path="/documents" exact element={<UserDocuments />} />
          <Route path="/submitdocuments" exact element={<UserSubmitDocuments />} />
          <Route path="/status" exact element={<UserStatus />} />
        </Route>
        
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard/>} />
        </Route>
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;