import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const statusColorMap = {
  Approved: 'text-green-500',
  Pending: 'text-yellow-500',
  Rejected: 'text-red-500',
  'Under Review': 'bg-blue-500',
};

const notifications = [
  { id: 1, message: "📢 Hostel clearance approved", time: "2h ago" },
  { id: 2, message: "⚠️ Faculty document rejected", time: "4h ago" },
  { id: 3, message: "📩 New message from admin", time: "Yesterday" },
  { id: 4, message: "🗃️ Library clearance verified", time: "2 days ago" },
];

const latestThree = notifications.slice(0, 3);

const UserDashboard = ({ targetPercentage = 50 }) => {
  const [percentage, setPercentage] = useState(0);
  const [bellOpen, setbellOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData.user);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        localStorage.removeItem('user');
      }
    }

    const creds = JSON.parse(localStorage.getItem('userCredentials'));
    if (Array.isArray(creds)) setCredentials(creds);
  }, []);

  const completedCount = credentials.filter(
    (cred) => cred.status === 'Approved' || cred.status === 'Under Review'
  ).length;

  const totalCount = credentials.length;

  if (!userData) {
    return (
      <div className="pt-20 px-[30px] lg:px-[50px] xl:px-[137px]">
        <p className="text-lg text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className='md:pt-20 pt-10 px-[30px] lg:px-[50px] xl:px-[137px]'>
      <section className='flex justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <h1 className=' text-2xl md:text-5xl'>Welcome, {userData.firstName}!</h1>
          <p className='text-sm text-gray-600'>
            You've completed clearance with {completedCount} out of {totalCount} departments.
          </p>
        </div>
      </section>

      <section className='mt-[60px] w-full flex flex-col gap-10'>
        <div className='flex flex-col md:flex-row gap-3 justify-between items-start'>
          <h4 className='text-xl font-semibold'>Complete Clearance</h4>
          <Link to='/documents'>
            <p className='underline text-xs text-gray-600'>View All Documents</p>
          </Link>
        </div>

        <div className='w-full h-auto flex flex-col md:grid md:grid-cols-3 xl:grid-cols-4 gap-8  items-center justify-center '>
          {credentials.length > 0 ? (
            credentials.map((cred, index) => {
              const initials = cred.department
                ? cred.department
                    .trim()
                    .split(' ')
                    .slice(0, 2)
                    .map((word) => word[0].toUpperCase())
                    .join('.')
                : 'N/A';

              const bgColor = statusColorMap[cred.status] || 'bg-gray-500';

              return (
                <div
                  key={index}
                  className=' w-full  py-9 bg-white px-6 shadow-lg flex flex-col  gap-4 justify-center items-center rounded-lg'
                >
                  <div className={`w-full px-8 ${bgColor} bg-green-500 py-[50px] rounded-[4px] flex text-[26px] items-center justify-center text-white`}>
                    <h1>{initials}</h1>
                  </div>
                  <h2 className='text-lg text-center'>{cred.department}</h2>
                   <p className={`underline ${statusColorMap[cred.status] || 'bg-gray-400'} text-xs 0`}>{cred.status}</p>
                  <Link to='/userdocuments'>
                    <button className='bg-white cursor-pointer border-2 border-blue-500 px-5 py-2 rounded-full text-sm'>
                      See More
                    </button>
                  </Link>
                </div>
              );
            })
          ) : (
            <p className='text-sm text-gray-500'>No credentials found.</p>
          )}
        </div>
      </section>

      <section className='mt-32 mb-20 flex flex-col gap-10'>
        <div className='flex justify-between items-center'>
          <h4 className='text-xl font-semibold'>Notifications</h4>
        </div>
        <div className='w-full h-auto flex items-center justify-between'>
          <div className='w-full'>
            <ul className='text-sm text-gray-600 space-y-8'>
              {latestThree.map((note) => (
                <li key={note.id} className='flex justify-between'>
                  <span>{note.message}</span>
                  <span className='text-xs text-gray-400'>{note.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
