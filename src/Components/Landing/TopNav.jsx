import React, { useState, useEffect } from "react";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const TopNav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="w-full overflow-hidden bg-white  h-auto py-[30px] px-[30px] lg:px-[50px] xl:px-[137px]">
      <nav className="flex relative justify-between items-center">
        <div className="flex  md:gap-3 gap-2 items-center">
          <img className="md:w-[69px] w-[50px]" src={logo} alt="" />
          <h1 className="md:text-[20px] text-[15px] thick-heading">
            AUI FINAL CLEAR
          </h1>
        </div>
        <div className="bg-[#C1C1C12B] lg:flex w-[400px] hidden text-[12px] rounded-full px-9 py-2 items-center gap-[40px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "bg-white rounded-full px-2 py-1 -mx-2 " : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={({ isActive }) =>
              ` ${isActive ? "bg-white rounded-full px-2 -mx-2  py-1" : ""}`
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              ` ${isActive ? "bg-white rounded-full px-2 -mx-2  py-1" : ""}`
            }
          >
            How it Works
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              ` ${isActive ? "bg-white rounded-full px-2 -mx-2  py-1" : ""}`
            }
          >
            FAQ
          </NavLink>
        </div>
        <div className="items-center lg:flex hidden gap-5">
          <Link className="text-[14px] font-[500]" to='/signin'>Sign in</Link>
          <div className="w-[152px] text-[#4258BA] font-[500] flex items-center justify-center text-[16px] h-[51px] rounded-full border-[1px] border-[#4258BA]">
            <Link to='/signup'>Create Account</Link>
          </div>
        </div>

        <div onClick={handleOpen} className="z-50 lg:hidden">
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
        fixed top-0 left-0 w-full h-screen bg-white z-40 
        flex flex-col items-center justify-center gap-[40px]
        transition-all duration-700 ease-in-out
        ${open ? "translate-y-0" : "-translate-y-full"}
      `}
      >
        <NavLink
          to="/"
          className="text-[#000000B2] text-[12px]"
          onClick={() => setOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/features"
          className="text-[#000000B2] text-[12px]"
          onClick={() => setOpen(false)}
        >
          Features
        </NavLink>
        <NavLink
          to="/how-it-works"
          className="text-[#000000B2] text-[12px]"
          onClick={() => setOpen(false)}
        >
          How it Works
        </NavLink>
        <NavLink
          to="/faq"
          className="text-[#000000B2] text-[12px]"
          onClick={() => setOpen(false)}
        >
          FAQ
        </NavLink>

        <div className="flex w-full px-[30px] flex-col items-center gap-5 mt-8">
          <Link to='/signin' className="text-[14px] cursor-pointer font-[500]">Sign in</Link>
          <div className="w-full md:w-[162px] text-[#4258BA] font-[500] flex items-center justify-center text-[16px] h-[51px] rounded-full border-[1px] border-[#4258BA]">
            <Link to='/signup' className="cursor-pointer">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
