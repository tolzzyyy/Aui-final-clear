import React, { useEffect, useState } from 'react';
import AuthLayout from './AuthLayout';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/signin');
    }, 5000);

    // Clean up timers
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <AuthLayout>
      <div className='h-screen w-full flex items-center justify-center'>
        <div className='flex flex-col gap-1 justify-center items-center'>
          <h1 className='md:text-[40px] text-[25px]'>Password Reset Successfully</h1>
          <p className='text-[12px] text-[#00000099] md:text-[15px]'>
            You will be redirected in {countdown} {countdown === 1 ? 'second' : 'seconds'}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Success;