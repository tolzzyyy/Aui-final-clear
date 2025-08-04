import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const UserSubmitDocuments = () => {
  const inputRefs = useRef([]);
  const formContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    matricNumber: "",
    jambUtmeResult: null,
    oLevelResult: null,
    jambAdmissionLetter: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen = window.visualViewport?.height < window.innerHeight * 0.7;
      setKeyboardVisible(isKeyboardOpen);
      
      if (isKeyboardOpen) {
        const activeElement = document.activeElement;
        if (activeElement && inputRefs.current.includes(activeElement)) {
          setTimeout(() => {
            activeElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
          }, 100);
        }
      }
    };

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener('resize', handleResize);
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.jambUtmeResult || !formData.oLevelResult || !formData.jambAdmissionLetter) {
      toastr.error("Please upload all required documents");
      return;
    }

    try {
      setIsLoading(true);
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData)?.token : null;

      if (!token) {
        toastr.error("Authentication token not found. Please log in again.");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("department", formData.department);
      data.append("matricNumber", formData.matricNumber);
      data.append("jambUtmeResult", formData.jambUtmeResult);
      data.append("oLevelResult", formData.oLevelResult);
      data.append("jambAdmissionLetter", formData.jambAdmissionLetter);

      await axios.post(
        "https://finalclear-backend-5.onrender.com/api/credentials/upload",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toastr.success("Documents uploaded successfully!");
    } catch (error) {
      toastr.error("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] pt-[100px] md:pt-[150px] px-[30px] lg:px-[50px] xl:px-[137px] py-[40px] overflow-hidden bg-white">
      {/* Fixed Header - won't scroll */}
      <div className="shrink-0 bg-white pt-4 pb-2 px-4 sm:pb-4 sm:px-6 ">
        <h1 className="text-2xl sm:text-3xl text-center font-medium">
          Upload Documents
        </h1>
        <p className="text-[#00000099] text-sm sm:text-base text-center mt-1">
          Submit the necessary files for your clearance process
        </p>
      </div>

      {/* Scrollable Content Container */}
      <div 
        ref={formContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4"
        style={{
        
          scrollBehavior: 'smooth'
        }}
      >
        <form 
          onSubmit={handleSubmit} 
          className="max-w-md mx-auto flex flex-col gap-4 py-6"
        >
          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter full name" },
            { label: "Department", name: "department", type: "text", placeholder: "Enter department" },
            { label: "Matric Number", name: "matricNumber", type: "text", placeholder: "Enter matric number" },
          ].map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                ref={el => inputRefs.current[index] = el}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full rounded-full h-12 border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onFocus={() => {
                  if (keyboardVisible && formContainerRef.current) {
                    setTimeout(() => {
                      inputRefs.current[index]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }, 100);
                  }
                }}
              />
            </div>
          ))}

          {[
            { label: "JAMB UTME Result", name: "jambUtmeResult" },
            { label: "O-Level Result", name: "oLevelResult" },
            { label: "JAMB Admission Letter", name: "jambAdmissionLetter" },
          ].map((field, index) => (
            <div key={index + 3} className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">{field.label}</label>
              <div className="relative">
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full rounded-full h-12 border border-gray-300 px-4 flex items-center">
                  <span className="truncate text-gray-500">
                    {formData[field.name]?.name || "Choose file"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full h-12 rounded-full bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Uploading..." : "Upload Documents"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSubmitDocuments;