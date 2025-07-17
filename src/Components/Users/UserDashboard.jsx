import React, { useEffect, useState } from 'react';

const UserDashboard = ({ targetPercentage = 50 }) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
    // Animation effect
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return (
    <div className='pt-20 px-[30px] lg:px-[50px] xl:px-[137px]'>
        <section className='flex justify-between items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-5xl'>Welcome, Malu!</h1>
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

        <section className='mt-32'>
            <div className='flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Complete Clearance</h4>
                <p className='underline text-xs text-gray-600'>View All Documents</p>
            </div>
        </section>
    </div>
  )
}

export default UserDashboard