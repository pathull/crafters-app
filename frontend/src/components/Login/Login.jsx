import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithPopup, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        loading="lazy"
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src="https://res.cloudinary.com/dukuzakaw/image/upload/v1667389809/knittingApp/loginPics/login-background_zkjewa.webp"
        alt="Login Background"
      />

      <div className="flex justify-center items-center h-full">
        <div className="max-w-[800px] mx-auto bg-white p-8 rounded-md">
          <h2 className="text-5xl font-bold py-4">A great project starts with the simplest idea...</h2>
          <p className="text-3xl font-light mb-8">Find things you&#39;ll love and share things you love to make.</p>
          <div className="flex justify-center">
            <button
              onClick={loginWithPopup}
              type="button"
              className="relative bg-[#6b705c] hover:bg-[#a5a58d] rounded-md py-2 px-6 text-white text-2xl"
            >
              Join us
            </button>
          </div>
          <p className="font-semibold text-[18px] mt-6">Knit it is free to use as much as you want!</p>
        </div>
      </div>
    </div>
  );
};
