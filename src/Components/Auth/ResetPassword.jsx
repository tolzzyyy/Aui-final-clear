import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackArrowSvg from "../../assets/svg's/BackArrowSvg";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Configure toastr
toastr.options = {
  closeButton: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
  extendedTimeOut: 1000,
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toastr.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://finalclear-backend-13.onrender.com/api/reset-password/${token}`,
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (response.data) {
        toastr.success("Password reset successfully!");
        setTimeout(() => navigate("/success"), 2000);
      }
    } catch (error) {
      let errorMessage = "Failed to reset password. Please try again.";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;

        // If token is invalid, redirect to forgot password
        if (error.response.status === 401 || error.response.status === 400) {
          toastr.error("Invalid or expired password reset link");
          setTimeout(() => navigate("/forgotpassword"), 3000);
          return;
        }
      }

      toastr.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex md:px-8 py-[50px] flex-col h-[100dvh] relative">
        <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0">
          <Link to="/signin" className="flex gap-3 items-center mb-4 sm:mb-6">
            <BackArrowSvg />
            <p className="font-[400] text-sm sm:text-base">Back</p>
          </Link>

          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-medium">
              Reset Your Password
            </h1>
            <p className="text-[#00000099] text-[12px] md:text-[15px] text-center mt-1">
              Enter your new password
            </p>
          </div>
        </div>

        <div className="flex-1 mt-4 overflow-y-auto overscroll-contain mb-10 hide-scrollbar px-4 pb-[env(safe-area-inset-bottom)]">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-[18px] pb-6"
          >
            <div className="flex flex-col gap-[11px]">
              <p className="text-sm text-gray-600">NEW PASSWORD</p>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-full h-12 border border-gray-300 pl-4 pr-10 text-base outline-none focus:ring-2 placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                >
                  {showPassword.password ? (
                    <FaEyeSlash color="black" size={18} />
                  ) : (
                    <FaEye color="black" size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[11px]">
              <p className="text-sm text-gray-600">CONFIRM PASSWORD</p>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-full h-12 border border-gray-300 pl-4 pr-10 text-base outline-none focus:ring-2 placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                >
                  {showPassword.confirmPassword ? (
                    <FaEyeSlash color="black" size={18} />
                  ) : (
                    <FaEye color="black" size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-[60px]">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 cursor-pointer rounded-full text-[#0149AD] border-[1px] border-[#0149AD] font-medium text-base outline-none transition duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
