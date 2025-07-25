import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusColorMap = {
  Approved: 'text-green-500',
  Pending: 'text-yellow-500',
  Denied: 'text-red-500',
  'Under Review': 'bg-blue-500',
};

const BASE_URL = 'https://finalclear-backend-11.onrender.com';

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
    <div className='md:pt-20 pt-10 px-[30px] h-full mb-4 lg:px-[50px] xl:px-[137px]'>
      <section className='flex justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <h1 className=' text-2xl md:text-5xl'>
            Upload and manage all your required clearance documents in one place.
          </h1>
        </div>
      </section>

      <section className='mt-32 flex flex-col'>
        {loading ? (
          <div className='text-center text-gray-500 text-sm'>Loading documents...</div>
        ) : credentials.length === 0 ? (
          <div className='text-center text-gray-500 text-sm'>No documents uploaded yet.</div>
        ) : (
          <div className='w-full h-auto flex flex-col md:grid md:grid-cols-3 xl:grid-cols-4 gap-8  items-center justify-center lg:justify-between'>
            {credentials.map((cred) => (
              <div
                key={cred._id}
                className='w-full py-9 bg-white px-6 shadow-lg flex flex-col gap-4 justify-center items-center rounded-lg'
              >
                <div
                  className={`w-full px-8 py-[50px] rounded-[4px] ${statusColorMap[cred.status] || 'bg-gray-400'} flex items-center justify-center bg-green-500 text-white text-center text-[26px] font-semibold`}
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
      </section>
    </div>
  );
};

export default UserDocuments;
