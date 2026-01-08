import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AuthInput from '../common/authInput';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../common/loadingAnimation';
import { useAuth } from '../hook/useAuth';

const LoginForm = () => {
    const { login, loading } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isShow, setIsShow] = useState(false)

    // Refs để quản lý focus
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Input States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Error States
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: '' // Dùng để lưu lỗi "Incorrect" chung cho cả 2
    });

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        let hasError = false;
        let newErrors = { email: '', password: '', auth: '' };

        // Kiểm tra bỏ trống bằng tay (không dựa vào trình duyệt)
        if (!email.trim()) {
            newErrors.email = t('please_enter_email');
            hasError = true;
            setPassword('')
        }
        if (!password.trim()) {
            newErrors.password = t('please_enter_password');
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        const log = await login(email, password);

        // Nếu login thành công
        if (log) {
            const isFromRegister = location.state?.fromRegister;
            const from = location.state?.from?.pathname || document.referrer;
            if (isFromRegister || from.includes('/register') || !from || from.includes(window.location.hostname + '/login')) {
                navigate('/', { replace: true });
            } else {
                navigate(-1); 
            }
        } else {
            // Nếu login false (thất bại)
            setErrors({
                email: ' ', // Để trống để hiện viền đỏ nhưng text thông báo nằm ở dưới
                password: '',
                auth: t('email_password_incorrect')
            });
            setPassword(''); // Xoá pass khi sai
        }
    };

    // Hàm xử lý Enter mượt mà (chống Telex nhảy ô)
    const handleKeyDown = (e, nextRef) => {
        if (e.nativeEvent.isComposing) return; // Chặn Telex nhảy lung tung
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef) {
                nextRef.current?.focus();
            } else {
                handleSubmit();
            }
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <LoadingAnimation text={t('loading')} />
                </div>
            )}
            <div className="flex flex-col items-center justify-center p-6 space-y-6 min-w-[350px] bg-white relative">
                <h2 className="text-3xl text-center text-primary-dark font-allerta">
                    Applicant {t('login')}
                </h2>
                {/* THÊM noValidate vào đây để tắt cái bong bóng mặc định của trình duyệt */}
                <form className='w-[350px]' onSubmit={handleSubmit} noValidate>
                    
                    {/* Trường Email */}
                    <div className="relative mb-6">
                        <AuthInput
                            label="email"
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            value={email}
                            required={false} // Tắt required của HTML để dùng logic React
                            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ email: '', password: '', auth: '' });
                            }}
                            placeholder={"abc@example.com"}
                            t={t('email')}
                            // Nếu có lỗi email HOẶC lỗi auth chung thì hiện viền đỏ
                            className={(errors.email || errors.auth) ? "border-red-500 ring-1 ring-red-500" : ""}
                        />
                        {/* Hiện lỗi bỏ trống email */}
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 absolute">{errors.email}</p>
                        )}
                    </div>

                    {/* Trường Mật khẩu */}
                    <div className='relative mb-8'>
                        <AuthInput
                            label="password"
                            id="password"
                            name="password"
                            type={isShow ? "text" : "password"}
                            ref={passwordRef}
                            value={password}
                            required={false} // Tắt required của HTML
                            onKeyDown={(e) => handleKeyDown(e, null)}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ email: '', password: '', auth: '' });
                            }}
                            placeholder={t('enter_pass')}
                            t={t('password')}
                            className={(errors.password || errors.auth) ? "border-red-500 ring-1 ring-red-500" : ""}
                        />
                        {/* Hiện lỗi bỏ trống pass HOẶC lỗi đăng nhập sai */}
                        {(errors.password || errors.auth) && (
                            <p className="text-red-500 text-xs mt-1 absolute">
                                {errors.password || errors.auth}
                            </p>
                        )}
                    </div>

                    {/* Liên kết Quên mật khẩu & remember */}
                    <div className="flex items-start justify-end pt-4 -mt-11">
                        <div className='flex text-sm text-primary justify-center items-center'>
                            {t('show_pass')}
                            <input 
                                type="checkbox" 
                                onChange={() => (setIsShow(!isShow))}
                                className='ml-1 accent-primary-dark border border-primary rounded-sm cursor-pointer' 
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='flex items-center justify-center w-auto mt-7 mx-2'>
                        <div className='h-px bg-primary flex-grow' />
                        <span className='mx-3 text-primary text-sm'>{t('continue')}</span>
                        <div className='h-px bg-primary flex-grow' />
                    </div>

                    {/* Social login */}
                    <div className='flex justify-center gap-8 mt-9'>
                        <button type="button" className='hover:opacity-70 transition'><img src='/assets/icons/facebook.png' alt="Facebook" className='w-12 h-12' /></button>
                        <button type="button" className='hover:opacity-70 transition'><img src="/assets/icons/google.png" alt="Google" className='w-12 h-12' /></button>
                        <button type="button" className='hover:opacity-70 transition'><img src="/assets/icons/github.png" alt="GitHub" className='w-12 h-12' /></button>
                    </div>

                    {/* Nút Đăng nhập */}
                    <div className="mt-9">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 rounded-full text-sm font-medium text-white bg-primary-dark hover:bg-indigo-600 transition duration-150"
                        >
                            {t('LOGIN')}
                        </button>
                    </div>
                </form>

                <div className="text-sm text-primary">
                    {t('no_account')}{" "}
                    <a href="/register" className="font-medium text-primary-dark hover:underline">
                        {t('register')}
                    </a>
                </div>
            </div>
        </>
    );
};

export default LoginForm;