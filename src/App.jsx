import React from "react";
import Layout from "./Components/Landing/Layout";
import Hero from "./Components/Landing/Hero";
import { Route, Routes } from "react-router-dom";
import Features from "./Components/Landing/Features";
import Howitworks from "./Components/Landing/Howitworks";
import Faq from "./Components/Landing/Faq";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ConfirmCode from "./Components/Auth/ConfirmCode";
import Success from "./Components/Auth/Success";
import UserLayout from "./Components/Users/UserLayout";
import { Navigate } from "react-router-dom";
import ResetPassword from "./Components/Auth/ResetPassword";
import UserDashboard from "./Components/Users/UserDashboard";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      return user ? children : <Navigate to="/signin" replace />;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return <Navigate to="/signin" replace />;
    }
  };
  return (
    <div className="max-w-[1600px] mx-auto">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/features" exact element={<Features />} />
          <Route path="/how-it-works" exact element={<Howitworks />} />
          <Route path="/faq" exact element={<Faq />} />
        </Route>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/confirmation-code" exact element={<ConfirmCode />} />
        <Route path="/success" exact element={<Success />} />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/confirmation-code" exact element={<ConfirmCode />} />
        <Route path="/success" exact element={<Success />} />
        // Add this new route
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
