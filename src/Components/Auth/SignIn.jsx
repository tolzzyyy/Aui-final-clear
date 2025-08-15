import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "./AuthLayout";
import BackArrowSvg from "../../assets/svg's/BackArrowSvg";
import MailSvg from "../../assets/svg's/MailSvg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const SignIn = () => {
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 2);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toastr.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://finalclear-backend-13.onrender.com/api/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));

        toastr.success("Login successful!");

        if (response.data.role === "admin") {
          setTimeout(() => navigate("/admindashboard"), 1500);
        } else {
          setTimeout(() => navigate("/userdashboard"), 1500);
        }
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.status === 400) {
          errorMessage = "Bad request. Please check your input.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      toastr.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
        inputRefs.current[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleFocus = () => {
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
  };

  const handleBlur = () => {
    document.removeEventListener("touchmove", handleTouchMove);
  };

  const formFields = [
    {
      label: "EMAIL ADDRESS",
      type: "email",
      name: "email",
      icon: <MailSvg />,
      placeholder: "Enter Email",
    },
    {
      label: "PASSWORD",
      type: showPassword.password ? "text" : "password",
      name: "password",
      icons: showPassword.password ? (
        <FaEyeSlash color="black" size={18} />
      ) : (
        <FaEye color="black" size={18} />
      ),
      placeholder: "Enter password",
      text: "Forgot Password?",
      path: "/forgotpassword",
    },
  ];

  return (
    <AuthLayout>
      <div className="flex md:px-8 py-[50px] flex-col h-[100dvh] relative">
        <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0 ">
          <Link to="/signup" className="flex gap-3 items-center mb-4 sm:mb-6">
            <BackArrowSvg />
            <p className="font-[400] text-sm sm:text-base">Back</p>
          </Link>

          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-medium">
              Welcome Back
            </h1>
            <p className="text-[#00000099] text-[12px] md:text-[15px] text-center mt-1">
              Check your current progress
            </p>
          </div>
        </div>
        <div className="flex-1 mt-4 overflow-y-auto overscroll-contain mb-10 hide-scrollbar px-4 pb-[env(safe-area-inset-bottom)]">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-[18px] pb-6"
          >
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-[11px]">
                <p className="text-sm text-gray-600">{field.label}</p>
                <div className="relative">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full rounded-full h-12 border border-gray-300 pl-4 pr-10 text-base outline-none focus:ring-2 placeholder:text-gray-400"
                  />
                  {field.icon && (
                    <p className="absolute bg-white top-[14px] right-4">
                      {field.icon}
                    </p>
                  )}
                  {field.icons && (
                    <button
                      type="button"
                      className="absolute cursor-pointer right-4 top-3.5 text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {field.icons}
                    </button>
                  )}
                  {field.text && (
                    <Link
                      className="float-right py-2 underline "
                      to={field.path}
                    >
                      <p className="w-full underline text-[11px] text-[#3355FF] text-right float-right">
                        {field.text}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-[11px]">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 cursor-pointer rounded-full text-[#0149AD] border-[1px] border-[#0149AD] font-medium text-base outline-none transition duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mb-10 flex flex-col w-full items-center">
            <p className="text-center text-[#667185] text-[14px]">Or</p>
            <div className="text-[#000000B2] mt-5">
              <p>
                Don't Have An Account?{" "}
                <Link className="text-[#0149AD]" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
