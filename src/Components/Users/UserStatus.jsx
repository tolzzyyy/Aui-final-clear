import React from 'react'

const UserStatus = () => {
  return (
    <div className='pt-20 px-[30px] lg:px-[50px] xl:px-[137px]'>
      
      <section className='flex justify-between items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-5xl'>
                  Track your clearance progress across all departments. See what's approved, pending, or needs your action.
                </h1>
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


    </div>
  )
}

export default UserStatus