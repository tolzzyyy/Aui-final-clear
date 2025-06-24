import React from 'react'
import AuthLayout from './AuthLayout'

const Success = () => {
  return (
    <AuthLayout>
    <div className='h-screen w-full flex items-center justify-center'>
<div className='flex flex-col gap-1 justify-center items-center'>
    <h1 className='md:text-[40px] text-[25px]'>Password Reset Successfully</h1>
    <p className='text-[12px] text-[#00000099] md:text-[15px]'>You will be redirected in 5 seconds</p>
</div>
    </div>
    </AuthLayout>
  )
}

export default Success