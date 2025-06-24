import React, { useRef, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import BackArrowSvg from "../../assets/svg's/BackArrowSvg";
import { MdMail } from "react-icons/md";
import MailSvg from "../../assets/svg's/MailSvg";
import CircleCheckSvg from "../../assets/svg's/CircleCheckSvg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 7);
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
        // Smooth scroll to the input
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
    { label: "FULL NAME", type: "text", placeholder: "Enter Full Name" },
    {
      label: "MATRIC NUMBER",
      type: "text",
      placeholder: "Enter Matric Number",
    },
    {
      label: "EMAIL ADDRESS",
      type: "email",
      icon: <MailSvg />,
      placeholder: "Enter Email",
    },
    { label: "PASSWORD", type: "select", placeholder: "Create password" },
    {
      label: "CONFIRM PASSWORD",
      type: "password",
      placeholder: "Confirm password",
    },
    { label: "PHONE NUMBER", type: "tel", placeholder: "Enter phone number" },
    { label: "ADDRESS", type: "text", placeholder: "Enter your address" },
  ];

  return (
    <AuthLayout>
      <div className="flex  md:px-8 py-[50px] flex-col h-[100dvh] relative">
        <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0 ">
         <Link to='/' className="flex gap-3 items-center mb-4 sm:mb-6">
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
          <form className="max-w-md mx-auto flex flex-col gap-[18px] pb-6">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-[11px]">
                <p className="text-sm text-gray-600">{field.label}</p>
                <div className="relative">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type={field.type}
                    placeholder={field.placeholder}
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

            <div className="mt-[11px] ">
              <button
                type="submit"
                className="w-full h-12 rounded-full text-[#0149AD] border-[1px] border-[#0149AD] font-medium text-base  outline-none  transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mb-10 flex flex-col w-full items-center">
            <p className="text-center text-[#667185] text-[14px]">Or</p>
            <div className=" text-[#000000B2] mt-5">
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
