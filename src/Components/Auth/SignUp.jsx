import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";
import BackArrowSvg from "../../assets/svg's/BackArrowSvg";
import MailSvg from "../../assets/svg's/MailSvg";
import CircleCheckSvg from "../../assets/svg's/CircleCheckSvg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const navigate = useNavigate(); // Add this line
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    department: ""
    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize refs array
   useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 7);
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
    setError(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.matricNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phoneNumber ||
      !formData.department
    ) {
      toast.error("Please fill in all required fields");
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      toast.info("Creating your account...");
      
      const response = await axios.post(
        "https://finalclear-backend-5.onrender.com/api/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          matricNumber: formData.matricNumber,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phoneNumber: formData.phoneNumber,
          department: formData.department,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
      // PROPERLY STORE USER DATA
      const userData = {
        token: response.data.token, // Make sure your backend returns these
        user: response.data.user   // Typically contains id, name, email etc.
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast.success("Registration successful!");
      navigate('/userdashboard'); // Redirect to dashboard
    }
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
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
      label: "FIRST NAME", 
      type: "text", 
      placeholder: "Enter First Name",
      name: "firstName"
    },
    { 
      label: "LAST NAME", 
      type: "text", 
      placeholder: "Enter Last Name",
      name: "lastName"
    },
    { 
      label: "Department", 
      type: "text", 
      placeholder: "Enter Department",
      name: "department"
    },
    {
      label: "MATRIC NUMBER",
      type: "text",
      placeholder: "Enter Matric Number",
      name: "matricNumber"
    },
    {
      label: "EMAIL ADDRESS",
      type: "email",
      icon: <MailSvg />,
      placeholder: "Enter Email",
      name: "email"
    },
    { 
      label: "PASSWORD", 
      type: "password", 
      placeholder: "Create password",
      name: "password"
    },
    {
      label: "CONFIRM PASSWORD",
      type: "password",
      placeholder: "Confirm password",
      name: "confirmPassword"
    },
    { 
      label: "PHONE NUMBER", 
      type: "tel", 
      placeholder: "Enter phone number",
      name: "phoneNumber"
    },
   
  ];

  if (success) {
    return (
      <AuthLayout>
           <ToastContainer />
        <div className="flex flex-col items-center justify-center h-[100dvh] p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-6">Your account has been created successfully.</p>
            <Link
              to="/signin"
              className="bg-[#0149AD] text-white px-6 py-2 rounded-full"
            >
              Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex md:px-8 py-[50px] flex-col h-[100dvh] relative">
        <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0">
          <Link to="/" className="flex gap-3 items-center mb-4 sm:mb-6">
            <BackArrowSvg />
            <p className="font-[400] text-sm sm:text-base">Back</p>
          </Link>

          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-medium">
              Create an Account
            </h1>
            <p className="text-[#00000099] text-[12px] md:text-[15px] text-center mt-1">
              Begin the Final Journey to your Academic Success
            </p>
          </div>
        </div>

        <div className="flex-1 mt-4 overflow-y-auto overscroll-contain mb-10 hide-scrollbar px-4 pb-[env(safe-area-inset-bottom)]">
          {/* {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )} */}
          
          <form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-[18px] pb-6"
            ref={formRef}
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
        value={formData[field.name] || ""}
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
    </div>
  </div>
))}

            <div className="flex items-center mt-[11px] gap-[21px]">
              <CircleCheckSvg />
              <p className="text-[14px] font-[400]">
                Yes, I am a Final Year Student
              </p>
            </div>

            <div className="mt-[11px]">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 cursor-pointer rounded-full text-[#0149AD] border-[1px] border-[#0149AD] font-medium text-base outline-none transition duration-200 disabled:opacity-50"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
          
          <div className="mb-10 flex flex-col w-full items-center">
            <p className="text-center text-[#667185] text-[14px]">Or</p>
            <div className="text-[#000000B2] mt-5">
              <p>
                Already Have An Account?{" "}
                <Link className="text-[#0149AD]" to="/signin">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;