import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const Login = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-primary/10 px-4">
      <div className="flex flex-row rounded bg-white m-10 shadow-lg">
        <img src="assets/images/Register.png" alt="bg" className='max-h-[90vh] min-h-[700px] object-cover transition-all duration-300 ease-in-out sm:min-w-[180px] md:min-w-[350px] lg:min-w-[600px] xl:min-w-[700px] min-w-px max-[525px]:opacity-0'/>
        <div className="flex items-center justify-center min-h-[700px] relative">
            {/* nút back (quay về trang trước) */}
            <button
                type="button"
                onClick={() => window.history.back()}
                className="absolute left-4 top-4 flex items-center text-primary hover:text-primary-dark transition"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-4 h-4 mr-1"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-normal">Back</span>
            </button>
            <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
