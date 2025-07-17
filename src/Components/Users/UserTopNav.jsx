import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Images/aui_logo_2 1 (1).png";
import userFace from "../../assets/Images/userFace.png";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

const notifications = [
  { id: 1, message: "📢 Hostel clearance approved", time: "2h ago" },
  { id: 2, message: "⚠️ Faculty document rejected", time: "4h ago" },
  { id: 3, message: "📩 New message from admin", time: "Yesterday" },
  { id: 4, message: "🗃️ Library clearance verified", time: "2 days ago" },
];

const latestThree = notifications.slice(0, 3);

const UserTopNav = () => {
  const [open, setOpen] = useState(false);
  const [bellOpen, setbellOpen] = useState(false);
  const [logOutOpen, setLogoutOpen] = useState(false);
  const dropdownRef = useRef();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlebellOpen = () => {
    setbellOpen(!bellOpen);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
  const storedData = localStorage.getItem('user');
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData.user); // ✅ this line fixes your bug
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      localStorage.removeItem('user');
    }
  }
   setLoading(false); // This was missing in your code
}, []);


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
    localStorage.removeItem('user');
    window.location.href = '/signin'; // Or use navigate if you have react-router
  };

  if (loading) {
    return <div className="w-full bg-white h-[90px]"></div>; // Loading placeholder
  }

  return (
    <div>
      <div className="w-full overflow-hidden bg-white h-auto py-[30px] px-[30px] lg:px-[50px] xl:px-[137px]">
        <nav className="flex relative justify-between items-center">
          <div className="flex md:gap-3 gap-2 items-center">
            <img className="md:w-[69px] w-[50px]" src={logo} alt="" />
            <h1 className="md:text-[20px] text-[15px] thick-heading">
              AUI FINAL CLEAR
            </h1>
          </div>
          <div className="bg-[#C1C1C12B] lg:flex w-[410px] hidden text-[12px] rounded-full px-6 py-3 items-center gap-[40px]">
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
              to="/"
              className={({ isActive }) =>
                ` ${isActive ? "bg-white rounded-full px-2 -mx-2 py-1" : ""}`
              }
            >
              Clearance Status
            </NavLink>
          </div>
          <div className="relative items-center lg:flex hidden gap-3" ref={bellRef}>
            <div 
              onClick={() => setbellOpen(!bellOpen)} 
              className="w-15 h-15 flex items-center justify-center rounded-full bg-[#FAFAFA]">
              <FiBell size={25}/>
            </div>

            {userData && (
              <div className="flex relative gap-3 items-center">
                <div className="w-15 h-15 flex items-center justify-center rounded-full bg-none">
                  <img src={userFace} alt="" className="w-full"/>
                </div>
                <div>
                  <h3 className="text-lg">{userData.firstName || 'User'}</h3>
                  <p className="text-xs text-[#A3A3A3]">{userData.department || 'User'}</p>
                </div>
                <div className="cursor-pointer" onClick={() => setLogoutOpen(!logOutOpen)} ref={dropdownRef}>
                  <FiChevronDown />
                </div>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <div
              onClick={() => setbellOpen(!bellOpen)} 
              className="w-12 h-12 flex lg:hidden items-center justify-center rounded-full bg-[#FAFAFA]">
              <FiBell size={25}/>
            </div>
            <div onClick={handleOpen} className="z-50 lg:hidden">
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
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
            Dashboard
          </NavLink>
          <NavLink
            to="/"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            My Documents
          </NavLink>
          <NavLink
            to="/"
            className="text-[#000000B2] text-[12px]"
            onClick={() => setOpen(false)}
          >
            Clearance Status
          </NavLink>
          <NavLink
            to="/"
            className="text-[#000000B2] text-[12px] flex items-center gap-2"
            onClick={handleLogout}
          >
            <CiLogout /> Logout
          </NavLink>

          {userData && (
            <div className="flex w-full px-[30px] flex-col items-center gap-5 mt-8">
              <div className="flex gap-3 items-center">
                <div className="w-15 h-15 flex items-center justify-center rounded-full bg-none">
                  <img src={userFace} alt="" className="w-full"/>
                </div>
                <div>
                  <h3 className="text-lg">{userData.firstName || 'User'}</h3>
                  <p className="text-xs text-[#A3A3A3]">Software Engineering</p>
                </div>
                <div className="hidden lg:flex">
                  <FiChevronDown />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {bellOpen && (
        <div className="absolute top-24 right-5 lg:right-28 w-80 bg-white shadow-lg rounded-lg p-6 z-[9999]">
          <p className="font-semibold text-gray-800 mb-4">Notifications</p>
          <ul className="text-sm text-gray-600 space-y-4">
            {latestThree.map((note) => (
              <li key={note.id} className="flex justify-between">
                <span>{note.message}</span>
                <span className="text-xs text-gray-400">{note.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dropdown */}
      {logOutOpen && (
        <div className="absolute top-24 right-5 lg:right-28 w-40 bg-white shadow-lg rounded-lg p-4 z-[9999]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <CiLogout /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTopNav;