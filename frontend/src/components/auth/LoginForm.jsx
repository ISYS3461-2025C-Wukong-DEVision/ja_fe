// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic xử lý đăng nhập (gọi API, kiểm tra thông tin,...) sẽ đặt ở đây
        console.log('Login with:', { email, password });
        alert(`Đang cố gắng đăng nhập với Email: ${email}`);
        // Sau khi xử lý, bạn có thể chuyển hướng người dùng
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-6 min-w-[350px] bg-white relative">
            <h2 className="text-3xl text-center text-primary-dark font-allerta">
                Applicant {t('login')}
            </h2>
            <form className='w-[350px]' onSubmit={handleSubmit}>
                {/* Trường Email */}
                <div>
                <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-primary"
                >
                    {t('email')}
                </label>
                <div className="mt-1">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 rounded-sm bg-primary/50 shadow-sm placeholder-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 border border-primary/50"
                    placeholder="abc@example.com"
                    />
                </div>
                </div>

                {/* Trường Mật khẩu */}
                <div className='mt-6'>
                <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-primary"
                >
                    {t('password')}
                </label>
                <div className="mt-1">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-primary/50 bg-primary/50 rounded-sm shadow-sm placeholder-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                    placeholder={t('enter_pass')}
                    />
                </div>
                </div>
                {/* Liên kết Quên mật khẩu & remember */}
                <div className="flex items-center justify-between mt-1">
                    <a 
                    href="#" 
                    className="text-base text-primary hover:text-indigo-500"
                    >
                    {t('forgot_pass')}
                    </a>
                    <div className='flex text-base text-primary justify-center items-center'>
                        {t('remember')}
                        <input 
                            type="checkbox" 
                            className='ml-1 accent-primary-dark border border-primary rounded-sm' 
                        />
                    </div>
                </div>

                {/* ---or continue with--- */}
                <div className='flex items-center justify-center w-auto mt-7 mx-2'>
                    <div className='h-px bg-primary flex-grow' />
                    <span className='mx-3 text-primary text-sm'>{t('continue')}</span>
                    <div className='h-px bg-primary flex-grow' />
                </div>

                {/* login with facebook google github */}
                <div className='flex justify-center gap-8 mt-9'>
                    {/* Facebook */}
                    <button type="button" className='rounded-full hover:bg-primary/20 transition' onClick={() => console.log('Login with Facebook')}>
                        <img src='/assets/icons/facebook.png' alt="Facebook" className='w-14 h-14' />
                    </button>

                    {/* Google */}
                    <button type="button" className='rounded-full hover:bg-primary/20 transition' onClick={() => console.log('Login with Google')}>
                        <img src="/assets/icons/google.png" alt="Google" className='w-14 h-14' />
                    </button>

                    {/* GitHub */}
                    <button type="button" className='rounded-full hover:bg-primary/20 transition' onClick={() => console.log('Login with GitHub')}>
                        <img src="/assets/icons/github.png" alt="GitHub" className='w-14 h-14' />
                    </button>
                </div>

                {/* Nút Đăng nhập */}
                <div className="mt-9">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-dark hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                    {t('LOGIN')}
                </button>
                </div>
            </form>

            {/* Chưa có tài khoản? Đăng ký */}
            <div className="text-sm text-primary">
                {t('no_account')}{" "}
                <a href="/register" className="font-medium text-primary-dark hover:underline">
                    {t('register')}
                </a>
            </div>
        </div>
    );
};

export default LoginForm;