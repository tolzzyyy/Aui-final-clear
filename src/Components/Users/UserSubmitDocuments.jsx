import React, { useState } from "react";
import axios from "axios";
// import AuthLayout from "./AuthLayout";
import BackArrowSvg from "../../assets/svg's/BackArrowSvg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
    toast.error("Please upload all required documents");
    return;
  }

  try {
    setIsLoading(true);
    toast.info("Uploading your documents...");

    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData)?.token : null;

    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
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

    toast.success("Documents uploaded successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Upload failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>
      <ToastContainer />
      <div className="flex md:px-8 py-[10px] flex-col h-[100dvh] relative">
        <div className="pt-4 pb-2 px-4 sm:pb-4 w-full sm:px-6 shrink-0">
          {/* <Link to="/userdashboard" className="flex gap-3 items-center mb-6">
            <BackArrowSvg />
            <p className="font-[400] text-sm sm:text-base">Back</p>
          </Link> */}

          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-medium">
              Upload Documents
            </h1>
            <p className="text-[#00000099] text-[12px] md:text-[15px] text-center mt-1">
              Submit the necessary files for your clearance process
            </p>
          </div>
        </div>

        <div className="flex-1 mt-4 overflow-y-auto mb-10 hide-scrollbar px-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-[18px] pb-6">
            {[
              { label: "Name", name: "name", type: "text", placeholder: "Enter full name" },
              { label: "Department", name: "department", type: "text", placeholder: "Enter department" },
              { label: "Matric Number", name: "matricNumber", type: "text", placeholder: "Enter matric number" },
              { label: "JAMB UTME Result", name: "jambUtmeResult", type: "file" },
              { label: "O-Level Result", name: "oLevelResult", type: "file" },
              { label: "JAMB Admission Letter", name: "jambAdmissionLetter", type: "file" }
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-[11px]">
                <p className="text-sm text-gray-600">{field.label}</p>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  onChange={handleChange}
                  className="w-full rounded-full h-12 border border-gray-300 px-4 text-base outline-none focus:ring-2 placeholder:text-gray-400"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 cursor-pointer rounded-full text-[#0149AD] border-[1px] border-[#0149AD] font-medium text-base outline-none transition duration-200 disabled:opacity-50"
            >
              {isLoading ? "Uploading..." : "Upload Documents"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSubmitDocuments;
