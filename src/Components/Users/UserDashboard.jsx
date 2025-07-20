import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const courses = [
  {
    code: "S.E",
    title: "Software Engineering",
    status: "Under Review",
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
    status: "Pending",
    bgColor: "bg-yellow-500",
  },
  {
    code: "I.T",
    title: "Information Tech",
    status: "Pending",
    bgColor: "bg-pink-500",
  },
];

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
    

    useEffect(() => {
    // Animation effect
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [targetPercentage]);


  const handlebellOpen = () => {
    setbellOpen(!bellOpen);
  };

  return (
    <div className='pt-20 px-[30px] lg:px-[50px] xl:px-[137px]'>
        <section className='flex justify-between items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-5xl'>Welcome, Malu Obi!</h1>
                <p className='text-sm text-gray-600'>You've completed clearance with 3 out of 6 departments.</p>
            </div>
            {/* <div className='w-auto h-auto bg-white shadow-md flex items-center py-5 px-10 gap-8 rounded-md'>
                <div className='flex items-center justify-center border-4 border-black rounded-full w-auto h-auto p-5 '>
                    50%
                </div>
                
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-2xl'>Keep Going!</h3>
                    <p className='text-xs underline'>Complete Submission</p>
                </div>
            </div> */}
        </section>

        <section className='mt-32 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Complete Clearance</h4>
                <Link to='/documents'>
                  <p className='underline text-xs text-gray-600'>View All Documents</p>
                </Link>
            </div>
            <div className='w-full h-auto grid md:grid-cols-2 lg:grid-cols-4 space-y-8 items-center justify-center'>
                {/* <div className='w-56 py-9 bg-white px-6 shadow-lg flex flex-col gap-4 justify-center items-center rounded-lg'>
                    <div className='w-full p-8 bg-blue-500 flex items-center justify-center text-white'>
                        <h1>S.E</h1>
                    </div>
                    <h2 className='text-lg'>Software Engineering</h2>
                    <p className='underline text-xs text-gray-600'>Under Review</p>
                    <button className='bg-white border-2 border-blue-500 px-5 py-2 rounded-full text-sm'>See More</button>
                </div> */}
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
                        <Link to='/documents'>
                          <button className="bg-white cursor-pointer border-2 border-blue-500 px-5 py-2 rounded-full text-sm">
                              See More
                          </button>
                        </Link>
                        </div>
                    ))}
            </div>
        </section>

        <section className='mt-32 mb-20 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Notifications</h4>
                {/* <p className='underline text-xs text-gray-600'>View All Notifications</p> */}
            </div>
            <div className='w-full h-auto flex items-center justify-between'>
              <div className='w-full'>
                <ul className="text-sm text-gray-600 space-y-8">
                  {latestThree.map((note) => (
                    <li key={note.id} className="flex justify-between">
                      <span>{note.message}</span>
                      <span className="text-xs text-gray-400">{note.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </section>
    </div>
  )
}

export default UserDashboard