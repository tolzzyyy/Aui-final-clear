import React from "react";
import img from "../../assets/Images/path74 (1).png";
import authImage from "../../assets/images/image (3).png";
import img6 from "../../assets/Images/path74 (2).png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-full h-dvh bg-gray-50">
      {/* Left Side  */}
      <div className=" flex-1 flex flex-col ">
        <div className="relative  overflow-hidden">
          <img
            src={img}
            className="absolute top-7 md:top-1 left-[-10px]  md:left-0 w-[40px] md:w-[90px] lg:w-[70px]"
            alt="decoration"
          />
          <img
            src={img6}
            className="absolute bottom-0 hidden md:block  z-50 left-[-10px] md:left-0 w-[50px] md:w-[90px] xl:w-[90px]"
            alt="decoration"
          />

          <div className="w-full h-dvh flex justify-center items-start ">
            <div className="w-full px-[18px]   relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side  */}
      <div className="hidden lg:block flex-1  relative min-w-0">
        <img
          src={authImage}
          alt="Authentication Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="text-white max-w-[491px] right-[16%] text-center great-vibes-text text-[48px] flex items-center justify-center  top-[41%] absolute">“Your Final Clearance, Now Just a Click Away”</h1>
      </div>
    </div>
  );
};

export default AuthLayout;
