import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import userFace from "../../assets/Images/userFace.png";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

const UserTopNav = () => {
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [logOutOpen, setLogoutOpen] = useState(false);
  const dropdownRef = useRef();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlebellOpen = () => {
    setbellOpen(!bellOpen);
  };
  

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData.user);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

 // Disable scrolling when profile or mobile menu is open
  useEffect(() => {
    if (profile || open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [profile, open]);

  const handleProfile = () => {
    setProfile((prev) => !prev);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const bellRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setbellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (loading) {
    return <div className="w-full bg-white h-[90px]"></div>;
  }

  return (
    <div>
      <div className="w-full fixed top-0 overflow-hidden bg-white h-auto py-[30px] px-[30px] lg:px-[50px] xl:px-[137px]">
        <nav className="flex relative h-full justify-between items-center">
          <div className="flex md:gap-3 gap-2 items-center">
            <img className="md:w-[69px] w-[50px]" src={logo} alt="" />
            <h1 className="md:text-[20px] text-[15px] thick-heading">
              AUI FINAL CLEAR
            </h1>
          </div>
          <div className="bg-[#C1C1C12B] lg:flex w-[400px] justify-center hidden text-[12px] rounded-full px-6 py-3 items-center gap-[40px]">
            <NavLink
              to="/userdashboard"
              className={({ isActive }) =>
                `${isActive ? "bg-white rounded-full px-4 py-2 -mx-2 " : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/documents"
              className={({ isActive }) =>
                ` ${isActive ? "bg-white rounded-full px-2 -mx-2 py-1" : ""}`
              }
            >
              My Documents
            </NavLink>
            <NavLink
              to="/submitdocuments"
              className={({ isActive }) =>
                ` ${isActive ? "bg-white rounded-full px-2 -mx-2 py-1" : ""}`
              }
            >
              Upload
            </NavLink>
            {/* <NavLink
              to="/status"
              className={({ isActive }) =>
                ` ${isActive ? "bg-white rounded-full px-2 -mx-2 py-1" : ""}`
              }
            >
              Clearance Status
            </NavLink> */}
          </div>
          <div className="relative items-center lg:flex hidden gap-3">

            {userData && (
              <div className="flex relative gap-3 items-center">
                <div onClick={handleProfile} className="w-15 h-15 flex items-center justify-center rounded-full bg-none cursor-pointer">
                  <img src={userFace} alt="" className="w-full"/>
                </div>
                <div>
                  <h3 className="text-lg">{userData.firstName || 'User'}</h3>
                  <p className="text-xs text-[#A3A3A3]">{userData.department || 'User'}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile controls - now with profile image next to hamburger */}
          <div className="flex lg:hidden items-center gap-5">
            <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
              <img 
                src={userFace} 
                alt="Profile" 
                className="w-full h-full object-cover cursor-pointer"
                onClick={handleProfile}
              />
            </div>
            <div onClick={handleOpen} className="z-50 lg:hidden">
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Removed profile info from here */}
        <div
          className={`
            fixed top-0 left-0 w-full h-screen bg-white z-40 
            flex lg:hidden flex-col items-center justify-center gap-[40px]
            transition-transform duration-700 ease-in-out
            transform ${open ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <NavLink
            to="/userdashboard"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/documents"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            My Documents
          </NavLink>
          <NavLink
            to="/submitdocuments"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            Upload Documents
          </NavLink>
          {/* <NavLink
            to="/status"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            Clearance Status
          </NavLink> */}
          <NavLink
            to="/"
            className="text-[#000000B2] text-[12px] flex items-center gap-2"
            onClick={handleLogout}
          >
            <CiLogout /> Logout
          </NavLink>
        </div>
      </div>

      {/* Profile Panel (same as before) */}
      <div 
        className={`fixed inset-0 cursor-pointer z-50 bg-black/30 transition-all duration-700 ${
          profile
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleProfile}
      >
        <div
          className={`absolute top-0 cursor-arrow h-full right-0 bg-white shadow-lg transition-all duration-700 ${
            profile ? "lg:w-[500px] w-[300px]" : "w-0 whitespace-nowrap"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`transition-all w-full duration-700 ${
              profile
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="py-[50px] whitespace-nowrap flex flex-col gap-[5px] px-[20px] md:px-[35px]">
              <div className="flex gap-2 text-[17px] md:text-[28px] items-center">
                <h1>{userData.firstName || "User"}</h1>
                <h1>{userData.lastName || "User"}</h1>
              </div>
              <div className="border-b-[#A3A3A3] border-b-[1px] pb-8">
                <p className="text-[#A3A3A3] text-[12px]">
                  {userData.department || "User"}
                </p>
              </div>
              <div className="border-b-[#A3A3A3] flex flex-col gap-3 mt-[35px] ">
                <p className="text-[12px] text-[#A3A3A3]">Email Address:</p>
                <h1 className=" text-[17px] md:text-[28px]">{userData.email || "User"}</h1>
              </div>
              <div className="border-b-[#A3A3A3] flex flex-col gap-3 mt-[35px] ">
                <p className="text-[12px] text-[#A3A3A3]">Matric Number:</p>
                <h1 className=" text-[17px] md:text-[28px]">
                  {userData.matricNumber || "User"}
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="flex absolute bottom-[50px] cursor-pointer items-center gap-[22px] w-full text-left py-2 text-sm"
              >
                <div className="rotate-180 flex justify-center items-center w-[64px] bg-[#FF00000D] h-[64px] rounded-full">
                  <CiLogout className="text-black" size={24} />
                </div>
                <p className=" text-[17px] md:text-[20px]">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>

    
    
    </div>
  );
};

export default UserTopNav;