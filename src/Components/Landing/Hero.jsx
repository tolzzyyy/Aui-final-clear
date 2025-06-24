import React from "react";
import img from "../../assets/Images/path74 (1).png";
import img2 from "../../assets/Images/image (2).png";
import img3 from "../../assets/Images/path94 (1).png";
import img4 from "../../assets/Images/Vector 1.png";
import img5 from "../../assets/Images/path12.png";
import img6 from "../../assets/Images/path74 (2).png";
import { MdArrowOutward } from "react-icons/md";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className=" px-[30px] lg:px-[50px] xl:px-[137px]  relative max-w-[1500px]  w-full">
      <img src={img} className="absolute top-4 md:top-0 left-[-15px] md:left-0 w-[50px] md:w-[90px]" alt="" />
      <img src={img6} className="absolute w-[50px] md:w-[90px] xl:w-[200px] left-0 bottom-0" alt="" />
      <div className="xl:pt-[100px]  py-[50px] w-full flex-col xl:flex-row justify-between items-center gap-[50px] xl:gap-[8px] flex">
        <div className="xl:w-1/2 relative flex flex-col gap-[18px]">
        <img className="absolute w-[99px] hidden lg:flex right-[70px] top-[-130px]" src={img5} alt="" />
          <h1 className="xl:text-[50px] text-[24px] text-center xl:text-left max-w-[523px] xl:leading-[52px] w-full">
            Clear Your Final Year Faster and Smarter
          </h1>
          <p className="text-[12px] text-[#000000B2] text-center xl:text-left max-w-[521px] font-[400] leading-[25px] w-full">
            Experience a faster, smarter way to complete your final year
            clearance online. Upload documents, track progress, and get approved
            — all from your device
          </p>
          <div className="flex gap-[14px] mt-[32px] mx-auto xl:mx-0 items-center">
            <button className="bg-[#3355FF] text-white text-[16px] w-[152px] h-[51px] flex items-center justify-center rounded-full"><Link>Get Started</Link></button>
            <button className="text-black border border-black text-[16px] w-[152px] h-[51px] flex items-center justify-center rounded-full"><Link className="flex gap-[5px] items-center">How it Works <MdArrowOutward size={20} /></Link></button>
          </div>
          <div className="flex flex-col items-center xl:items-start md:gap-[11px] mt-[50px]  lg:mt-[111px]">
            <p className="font-[600] text-center xl:text-left text-[16px]">Powered By:</p>
            <div className="flex items-center gap-[10px] md:gap-[16px]">
              <img src={logo} className="md:w-[89px] w-[60px]" alt="" />
              <h1 className="md:text-[16px] text-[12px]">AUGUSTINE UNIVERSITY, ILARE-EPE, LAGOS</h1>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2  relative h-full">
          <div className="bg-[#4258BA94] flex flex-col py-[24px] px-[20px] lg:px-[32px] rounded-[15px] w-full h-auto relative">
            <img
              src={img4}
              className="absolute w-[70px] xl:w-[132px] top-[-34px] right-[-30px] xl:top-[-60px] xl:right-[-60px]"
              alt=""
            />
            {/* Smaller image with max-width */}
            <img
              src={img2}
              className="w-full max-w-[500px] mx-auto  object-contain"
              alt=""
            />

            {/* Text positioned at bottom */}
            <div className="xl:mt-[-50px] mt-[-30px] flex items-center gap-[2px] md:gap-[20px] xl:gap-3 w-full">
              <h1 className="great-vibes-text text-white max-w-[193px] md:max-w-[250px] lg:max-w-[303px] leading-[40px] lg:leading-[52px] text-[20px] lg:text-[34px] text-left">
                Your Final Clearance, Now Just a Click Away
              </h1>
              <img src={img3} className="lg:w-[42px] w-[20px] md:w-[30px]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
