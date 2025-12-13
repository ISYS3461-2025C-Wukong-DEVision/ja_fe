// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import AuthInput from '../common/authInput';

const RegisterForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState(t("select_country"));
    // State quản lý việc mở/đóng Dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic xử lý đăng ký (gọi API, kiểm tra thông tin,...) sẽ đặt ở đây
        console.log('Register with:', { email, password });
        alert(`Đang cố gắng đăng ký với Email: ${email}`);
        // Sau khi xử lý, bạn có thể chuyển hướng người dùng
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-6 min-w-[350px] bg-white">
            <h2 className="text-3xl text-center text-primary-dark font-allerta">
                Applicant {t('register')}
            </h2>
            <form className='w-[350px]' onSubmit={handleSubmit}>
                {/* Trường Email */}
                <div>
                    <AuthInput
                        label="email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"abc@expample.com"}
                        t={t('email')}
                    />
                </div>

                {/* Trường Mật khẩu */}
                <div className='mt-6'>
                    <AuthInput
                        label="password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('enter_pass')}
                        t={t('password')}
                    />
                </div>
                
                {/* Trường Lập Lại Mật khẩu */}
                <div className='mt-6'>
                    <AuthInput
                        label="confirm_password"
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        autoComplete="current-password"
                        required={true}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t('enter_pass')}
                        t={t('confirm')}
                    />
                </div>

                {/* Chọn quốc gia */}
                <div className="mt-6 w-full relative">
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between text-sm text-primary hover:text-primary-dark 
                                border border-primary/50 rounded-md px-3 py-2 focus:outline-none transition"
                    >
                        {country}
                        <ChevronDownIcon 
                            className={`w-4 h-4 ml-1 transition-transform duration-200 
                                    ${isDropdownOpen ? "rotate-180" : ""}`} 
                        />
                    </button>

                    {/* Dropdown mở rộng ngay bên dưới */}
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-[105%] bg-white border border-primary/30 rounded-md shadow-lg z-50">
                            {["Việt Nam", "United States", "Japan", "South Korea"].map((ct) => (
                                <button
                                    key={ct}
                                    onClick={() => {
                                        setCountry(ct);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-primary 
                                            hover:bg-gray-100 transition"
                                >
                                    {ct}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ---or continue with--- */}
                <div className='flex items-center justify-center w-auto mt-7 mx-2'>
                    <div className='h-px bg-primary flex-grow' />
                    <span className='mx-3 text-primary text-sm'>{t('continue')}</span>
                    <div className='h-px bg-primary flex-grow' />
                </div>

                {/* Sign up with facebook google github */}
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

                {/* Nút Đăng ký */}
                <div className="mt-9">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-dark hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                    {t('REGISTER')}
                </button>
                </div>
            </form>

            {/* Đã có tài khoản? Đăng nhập */}
            <div className="text-sm text-primary">
                {t('already_account')}{" "}
                <a href="/login" className="font-medium text-primary-dark hover:underline">
                    {t('login')}
                </a>
            </div>
        </div>
    );
};

export default RegisterForm;