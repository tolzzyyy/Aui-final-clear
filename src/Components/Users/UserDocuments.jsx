import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusColorMap = {
  Approved: 'text-green-500',
  Pending: 'text-yellow-500',
  Denied: 'text-red-500',
  'Under Review': 'bg-blue-500',
};

<<<<<<< HEAD
const BASE_URL = 'https://finalclear-backend-11.onrender.com';
=======

const courses = [
  {
    code: "S.E",
    title: "Software Engineering",
    status: "Pending",
    bgColor: "bg-blue-500", // optional for dynamic styling
  },
  {
    code: "D.S",
    title: "Data Science",
    status: "Approved",
    bgColor: "bg-green-500",
  },
  {
    code: "C.S",
    title: "Cyber Security",
    status: "Not Done",
    bgColor: "bg-yellow-500",
  },
  {
    code: "I.T",
    title: "Information Tech",
    status: "Pending",
    bgColor: "bg-pink-500",
  },
];
>>>>>>> 28f5bef0eb25bc4a15c4edbda609b60cd559cce5

const UserDocuments = () => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchCredentials = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const res = await axios.get(
      `${BASE_URL}/api/credentials/my-credential`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    console.log('Fetched credentials response:', data);

    // Ensure it's always an array
    const formatted = Array.isArray(data) ? data : [data];

    // ✅ Store in localStorage
    localStorage.setItem('userCredentials', JSON.stringify(formatted));

    // Update state
    setCredentials(formatted);
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn('No credentials found.');
      setCredentials([]);
      localStorage.removeItem('userCredentials'); // clear storage if not found
    } else {
      console.error('Failed to fetch credentials:', error);
    }
  } finally {
    setLoading(false);
  }
};

    fetchCredentials();
  }, []);

  const getInitials = (department) => {
    if (!department) return '';
    const words = department.trim().split(' ');
    const initials = words.slice(0, 2).map(word => word[0].toUpperCase());
    return initials.join('.');
  };

  return (
    <div className='pt-20 px-[30px] lg:px-[50px] xl:px-[137px]'>
      <section className='flex justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-5xl'>
            Upload and manage all your required clearance documents in one place.
          </h1>
        </div>
      </section>

<<<<<<< HEAD
      <section className='mt-32 flex flex-col'>
        {loading ? (
          <div className='text-center text-gray-500 text-sm'>Loading documents...</div>
        ) : credentials.length === 0 ? (
          <div className='text-center text-gray-500 text-sm'>No documents uploaded yet.</div>
        ) : (
          <div className='w-full h-auto grid md:grid-cols-2 gap-8 lg:flex items-center justify-center lg:justify-between'>
            {credentials.map((cred) => (
              <div
                key={cred._id}
                className='w-56 py-9 bg-white px-6 shadow-lg flex flex-col gap-4 justify-center items-center rounded-lg'
              >
                <div
                  className={`w-full p-8 rounded-[4px] ${statusColorMap[cred.status] || 'bg-gray-400'} flex items-center justify-center bg-green-500 text-white text-center text-[26px] font-semibold`}
                >
                  <h1>{getInitials(cred.department)}</h1>
                </div>

                <h2 className='text-lg'>{cred.department}</h2>
                <p className={`underline ${statusColorMap[cred.status] || 'bg-gray-400'} text-xs 0`}>{cred.status}</p>
                <a
                  href={`${BASE_URL}/${cred.fileUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <button className='bg-white cursor-pointer border-2 border-blue-500 px-5 py-2 rounded-full text-sm'>
                    View File
                  </button>
                </a>
              </div>
            ))}
          </div>
        )}
=======
      <section className='mt-32 mb-20 flex flex-col'>
            {/* <div className='flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Complete Clearance</h4>
                <Link to='/documents'>
                  <p className='underline text-xs text-gray-600'>View All Documents</p>
                </Link>
            </div> */}
            <div className='w-full h-auto grid md:grid-cols-2 gap-8 lg:flex items-center justify-center lg:justify-between'>
                  {courses.map((course, index) => (
                        <div
                        key={index}
                        className="w-56 py-9 bg-white px-6 shadow-lg flex flex-col gap-4 justify-center items-center rounded-lg"
                        >
                        <div className={`w-full p-8 ${course.bgColor} flex items-center justify-center text-white`}>
                            <h1>{course.code}</h1>
                        </div>
                        <h2 className="text-lg">{course.title}</h2>
                        <p className="underline text-xs text-gray-600">{course.status}</p>
                        <Link to='/submitdocuments'>
                          <button className="bg-white cursor-pointer border-2 border-blue-500 px-5 py-2 rounded-full text-sm">
                              Submit
                          </button>
                        </Link>
                        </div>
                    ))}
            </div>
>>>>>>> 28f5bef0eb25bc4a15c4edbda609b60cd559cce5
      </section>
    </div>
  );
};

export default UserDocuments;
