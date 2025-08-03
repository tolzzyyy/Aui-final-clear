import React from "react";
import img from "../../assets/Images/path74 (1).png";
import img6 from "../../assets/Images/path74 (2).png";
import img5 from "../../assets/Images/path12.png";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import YellowSvg from "../../assets/svg's/YellowSvg";
import ArrowSvg from "../../assets/svg's/ArrowSvg";
import ArrowSvg2 from "../../assets/svg's/ArrowSvg2";
const Howitworks = () => {
  return (
    <div className=" px-[30px]  lg:px-[50px] xl:px-[137px]   relative max-w-[1500px]  w-full">
      <img
        src={img}
        className="absolute top-4 md:top-0 left-[-15px] md:left-0 w-[50px] md:w-[90px]"
        alt=""
      />

      <div className="xl:py-[70px]  w-full  py-[50px] relative items-center flex flex-col gap-[18px]">
        <img
          className="absolute w-[99px] hidden lg:flex right-[70px] top-[-130px]"
          src={img5}
          alt=""
        />
        <h1 className="xl:text-[50px] text-[24px] text-center   max-w-[633px] xl:leading-[52px] w-full">
          How The AUI FINAL CLEAR Works
        </h1>
        <p className="text-[12px] xl:text-[15px] text-[#000000B2] text-center  max-w-[633px] font-[400] leading-[25px] w-full">
          Whether you're a student completing your final clearance or an admin
          managing approvals, OCS keeps everything simple, secure, and
          streamlined{" "}
        </p>
        <div className="flex gap-[14px] mt-[26px] mx-auto xl:mx-0 items-center">
          <Link to="/signup">
            <button className="bg-[#3355FF] text-white text-[16px] w-[152px] h-[51px] cursor-pointer flex items-center justify-center rounded-full">
              Get Started
            </button>
          </Link>

          <Link to="/faq">
            {" "}
            <button className="text-black border cursor-pointer border-black text-[16px] w-[153px] h-[51px] flex items-center justify-center rounded-full">
              <p className="flex gap-[5px] items-center">
                FAQ <MdArrowOutward size={20} />
              </p>
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center  md:gap-[5px] mt-[30px]  lg:mt-[40px]">
          <p className="font-[600] text-center  text-[16px]">Powered By:</p>
          <div className="flex items-center gap-[10px] md:gap-[16px]">
            <img src={logo} className="md:w-[89px] w-[60px]" alt="" />
            <h1 className="md:text-[16px] text-[12px]">
              AUGUSTINE UNIVERSITY, ILARE-EPE, LAGOS
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto w-full gap-[63px]">
        <h1 className="text-center text-[25px] md:text-[32px]">
          Simple Steps for Everyone
        </h1>

        <div className=" md:grid md:grid-cols-2 md:gap-[100px] flex lg:flex lg:flex-row  flex-col gap-[16px] lg:gap-[16px] pb-10 md:max-w-full justify-center items-center">
          <div className="w-[221px] flex flex-col gap-[10px] py-[30px] border-[1px] rounded-[10px] border-[#5F5F5F59] px-[20px]">
            <div className="relative flex items-center justify-center w-full">
              <YellowSvg />
              <h1 className="absolute top-[20%] text-[18px] left-[20%]">
                Get started
              </h1>
            </div>
            <div></div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Students:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Create your OCS account using your matric number and set up your
                profile.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Admins:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Login with your staff ID to access your department’s clearance
                dashboard.
              </p>
            </div>
          </div>
          <div className="hidden  md:hidden lg:flex">
            <ArrowSvg />
          </div>
          <div className="flex md:hidden ">
            <ArrowSvg2 />
          </div>
          <div className="w-[221px]  flex flex-col gap-[10px] py-[30px] border-[1px] rounded-[10px] border-[#5F5F5F59] px-[20px]">
            <div className="relative flex items-center justify-center w-full">
              <YellowSvg />
              <h1 className="absolute  top-[20%] text-[18px] left-[10%]">
                Upload & Review
              </h1>
            </div>
            <div></div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Students:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Submit your clearance documents digitally for each department.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Admins:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Review uploaded documents, approve valid submissions, or request
                updates.
              </p>
            </div>
          </div>
          <div className="hidden  md:hidden lg:flex">
            <ArrowSvg />
          </div>
          <div className="flex md:hidden ">
            <ArrowSvg2 />
          </div>
          <div className="w-[221px] flex flex-col gap-[10px] py-[30px] border-[1px] border-[#5F5F5F59] rounded-[10px] px-[20px]">
            <div className="relative flex items-center justify-center w-full">
              <YellowSvg />
              <h1 className="absolute top-[20%] text-[18px] left-[10%]">
                Track & Approve
              </h1>
            </div>
            <div></div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Students:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Track your clearance progress in real time and receive instant
                notifications.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] items-center">
              <h1>For Admins:</h1>
              <p className="w-full text-center text-[#000000B2] text-[12px]">
                Approve final clearances and generate reports — all from one
                centralized system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <img
        src={img6}
        className="absolute w-[50px] md:w-[90px] xl:w-[200px] left-0 bottom-0"
        alt=""
      />
    </div>
  );
};

export default Howitworks;
