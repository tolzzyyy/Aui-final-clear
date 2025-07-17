import React, { useState } from "react";
import img from "../../assets/Images/path74 (1).png";
import img6 from "../../assets/Images/path74 (2).png";
import img5 from "../../assets/Images/path12.png";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import DownArrow from "../../assets/svg's/DownArrow";

const Faq = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const accordions = [
    { id: 1, title: 'How do I create an account?', content: 'You can sign up using your matric number, university email, and a secure password on the login page.' },
    { id: 2, title: 'What documents do I need to upload?', content: 'Content for Accordion 2' },
    { id: 3, title: 'Can I track my clearance progress?', content: 'Content for Accordion 3' },
    { id: 4, title: 'What happens if documents are rejected?', content: 'Content for Accordion 4' },
    { id: 5, title: 'How do I access the admin dashboard?', content: 'Login using your staff credentials provided by the ICT unit or OCS system admin.' },
    { id: 6, title: 'What can I do as an admin?', content: 'Content for Accordion 6' },
    { id: 7, title: 'Can multiple admins access the system?', content: 'Content for Accordion 7' },
    { id: 8, title: 'How secure is the system?', content: 'Content for Accordion 8' }
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  return (
    <div className="px-[30px] lg:px-[50px] xl:px-[137px] relative max-w-[1500px] w-full">
      <img
        src={img}
        className="absolute top-4 md:top-0 left-[-15px] md:left-0 w-[50px] md:w-[90px]"
        alt=""
      />

      <div className="xl:py-[70px] w-full py-[50px] relative items-center flex flex-col gap-[18px]">
        <img
          className="absolute w-[99px] hidden lg:flex right-[70px] top-[-130px]"
          src={img5}
          alt=""
        />
        <h1 className="xl:text-[50px] text-[24px] text-center max-w-[633px] xl:leading-[52px] w-full">
          Frequently Asked Questions
        </h1>
        <p className="text-[12px] text-[#000000B2] xl:text-[15px] text-center max-w-[633px] font-[400] leading-[25px] w-full">
          Answers to common questions about using the OCS platform for both students and administrators.
        </p>
        <div className="flex gap-[14px] mt-[26px] mx-auto xl:mx-0 items-center">
          <button className="bg-[#3355FF] text-white text-[16px] w-[152px] h-[51px] flex items-center justify-center rounded-full">
            <Link>Get Started</Link>
          </button>
          <button className="text-black border border-black text-[16px] w-[153px] h-[51px] flex items-center justify-center rounded-full">
            <Link className="flex gap-[5px] items-center">
              How it Works <MdArrowOutward size={20} />
            </Link>
          </button>
        </div>
        <div className="flex flex-col items-center md:gap-[5px] mt-[30px] lg:mt-[40px]">
          <p className="font-[600] text-center text-[16px]">Powered By:</p>
          <div className="flex items-center gap-[10px] md:gap-[16px]">
            <img src={logo} className="md:w-[89px] w-[60px]" alt="" />
            <h1 className="md:text-[16px] text-[12px]">
              AUGUSTINE UNIVERSITY, ILARE-EPE, LAGOS
            </h1>
          </div>
        </div>
      </div>

      {/* Improved Accordion Grid */}
      <div className="flex flex-col gap-7">
        <h1 className="text-center text-[20px] md:text-[32px]">Q&A’s</h1>
     <div className="flex flex-col md:flex-row gap-6 pb-20">
  {/* Grid 1 */}
  <div className="flex-1 space-y-4">
    <p className="text-[13px] md:text-[16px]">For Students:</p>
    {accordions.slice(0, 4).map(item => (
      <div 
        key={item.id} 
        className=" transition-all cursor-pointer rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
      >
        <button
          className={`w-full cursor-pointer    p-4 text-left flex justify-between items-center ${
            activeAccordion === item.id 
              ? 'bg-white rounded-t-lg  shadow-[0_5px_8px_-3px_rgba(0,0,0,0.12)]' 
              : 'bg-white rounded-lg  '
          }`}
          onClick={() => toggleAccordion(item.id)}
        >
               <h1 className="font-medium text-[13px] md:text-[16px]">{item.title}</h1>
          <span className="text-lg transition-transform duration-300">
            {activeAccordion === item.id ? '-' : '+'}
          </span>
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            activeAccordion === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden rounded-b-lg">
            <div className="p-4 bg-white shadow-[inset_0_6px_8px_-6px_rgba(0,0,0,0.1)]">
             <p className="text-[11px] text-[#000000B2]"> {item.content} </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Grid 2 */}
  <div className="flex-1 space-y-4">
        <p className="text-[13px] md:text-[16px]">For Admins:</p>
    {accordions.slice(4, 8).map(item => (
      <div 
        key={item.id} 
        className="rounded-lg cursor-pointer transition-all shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
      >
         <button
          className={`w-full cursor-pointer   p-4 text-left flex justify-between items-center ${
            activeAccordion === item.id 
              ? 'bg-white rounded-t-lg  shadow-[0_5px_8px_-3px_rgba(0,0,0,0.12)]' 
              : 'bg-white rounded-lg  '
          }`}
          onClick={() => toggleAccordion(item.id)}
        >
          <h1 className="font-medium text-[13px] md:text-[16px]">{item.title}</h1>
          <span className="text-lg transition-transform duration-300">
            {activeAccordion === item.id ? '−' : '+'}
          </span>
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            activeAccordion === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden rounded-b-lg">
            <div className="p-4 bg-white shadow-[inset_0_6px_8px_-6px_rgba(0,0,0,0.1)]">
             <p className="text-[11px] text-[#000000B2]"> {item.content} </p>
            </div>
          </div>
        </div>
      </div>
    ))}
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

export default Faq;