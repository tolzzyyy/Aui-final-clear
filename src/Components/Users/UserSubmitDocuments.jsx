import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import UserTopNav from "./UserTopNav";

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
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    matricNumber: "",
    jambUtmeResult: null,
    oLevelResult: null,
    jambAdmissionLetter: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.jambUtmeResult || !formData.oLevelResult || !formData.jambAdmissionLetter) {
      toastr.error("Please upload all required documents");
      return;
    }

    try {
      setIsLoading(true);
      toastr.info("Uploading your documents...");

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastr.success("Documents uploaded successfully!");
    } catch (error) {
      console.error(error);
      toastr.error("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col pb-[100px] px-[30px] md:px-8 pt-[20px] md:pb-[40px] h-[100dvh] relative">
      
      {/* Fixed header section */}
      <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl text-center font-medium">
            Upload Documents
          </h1>
          <p className="text-[#00000099] text-sm sm:text-base text-center mt-1">
            Submit the necessary files for your clearance process
          </p>
        </div>
      </div>

      {/* Scrollable form container */}
      <div className="flex-1 mt-4 overflow-y-auto overscroll-contain mb-6 md:mb-10 hide-scrollbar px-4 pb-[env(safe-area-inset-bottom)]">
        <form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mb-4 flex flex-col gap-[18px] pb-6"
        >
          {/* Text inputs */}
          {[
            { label: "Name", name: "name", type: "text", placeholder: "Enter full name" },
            { label: "Department", name: "department", type: "text", placeholder: "Enter department" },
            { label: "Matric Number", name: "matricNumber", type: "text", placeholder: "Enter matric number" },
          ].map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full rounded-full h-12 border border-gray-300 px-4 text-base outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          ))}

          {/* File inputs with custom styling */}
          {[
            { label: "JAMB UTME Result", name: "jambUtmeResult" },
            { label: "O-Level Result", name: "oLevelResult" },
            { label: "JAMB Admission Letter", name: "jambAdmissionLetter" },
          ].map((field, index) => (
            <div key={index + 3} className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">{field.label}</label>
              <div className="relative">
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full rounded-full h-12 border border-gray-300 px-4 flex items-center text-gray-400">
                  <span className="truncate">
                    {formData[field.name]?.name || "Choose file"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white pt-4 mb-2 md:mb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-blue-600 text-white font-medium text-base focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Uploading..." : "Upload Documents"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSubmitDocuments;