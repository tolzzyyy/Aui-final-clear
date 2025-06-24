import React from "react";
import img from "../../assets/Images/path74 (1).png";
import img5 from "../../assets/Images/path12.png";
import img6 from "../../assets/Images/path74 (2).png";
import { MdArrowOutward } from "react-icons/md";
import logo from '../../assets/Images/aui_logo_2 1 (1).png'
import { Link } from "react-router-dom";

const Features = () => {
  return (
   <div className=" px-[30px] lg:px-[50px] xl:px-[137px]   relative max-w-[1500px]  w-full">
         <img src={img} className="absolute top-4 md:top-0 left-[-15px] md:left-0 w-[50px] md:w-[90px]" alt="" />
         <img src={img6} className="absolute w-[50px] md:w-[90px] xl:w-[200px] left-0 bottom-0" alt="" />
         <div className="xl:py-[124px]  py-[50px] w-full flex-col xl:flex-row justify-between items-center gap-[50px] xl:gap-[8px] flex">
           <div className="xl:w-1/2 relative flex flex-col gap-[18px]">
           <img className="absolute w-[99px] hidden lg:flex right-[70px] top-[-130px]" src={img5} alt="" />
             <h1 className="xl:text-[50px] text-[24px] text-center xl:text-left max-w-[523px] xl:leading-[52px] w-full">
              Everything You Need for a Hassle-Free Clearance
             </h1>
             <p className="text-[12px] text-[#000000B2] text-center xl:text-left max-w-[521px] font-[400] leading-[25px] w-full">
             A fully digital platform designed to simplify, automate, and speed up the final-year clearance process for students and administrators.
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
            <div className="bg-[#4258BA94] flex flex-col md:grid md:grid-cols-2 gap-3 py-[24px] px-[20px] lg:px-[22px] rounded-[15px] w-full h-auto relative">
  {/* First row - 2 boxes */}
  <div className="bg-white flex text-center items-center rounded-[10px] gap-3 py-[30px] flex-col w-full">
    <h1 className="text-[21px] font-[700]">Student Dashboard</h1>
    <p className="text-[12px] max-w-[191px] leading-[25px] w-full">Track your clearance progress in real time from a centralized interface.</p>
  </div>
  <div className="bg-white flex flex-col w-full py-[30px] rounded-[10px] px-[4px] text-center  items-center gap-3">
    <h1 className="text-[21px] font-[700]">File Upload & Verification</h1>
    <p className="text-[12px] max-w-[249px] leading-[25px] w-full">Securely upload required files. Admins can verify and approve them digitally.</p>
  </div>

  {/* Second row - 2 boxes */}
  <div className="bg-white flex text-center items-center rounded-[10px] gap-3 px-[4px] py-[30px] flex-col w-full">
    <h1 className="text-[21px] font-[700]">Automated Approval Workflow</h1>
    <p className="text-[12px] max-w-[249px] leading-[25px] w-full">No more delays — clearance requests are routed instantly to the right departments..</p>
  </div>
  <div className="bg-white flex flex-col w-full py-[30px] rounded-[10px] text-center items-center gap-3">
    <h1 className="text-[21px] font-[700]">Admin Panel</h1>
    <p className="text-[12px] max-w-[249px] leading-[25px] w-full">Staff and officers can manage student requests, documents, and records from one place.</p>
  </div>

  {/* Third row - 1 box spanning 2 columns */}
  <div className="bg-white flex text-center items-center rounded-[10px] gap-3 py-[30px] flex-col md:w-1/2 col-span-2">
    <h1 className="text-[21px] font-[700]">Real-Time Notifications</h1>
    <p className="text-[12px] max-w-[191px] leading-[25px] w-full">Stay updated with email alerts about your clearance status.</p>
  </div>
</div>
           </div>
         </div>
       </div>
  )
}

export default Features