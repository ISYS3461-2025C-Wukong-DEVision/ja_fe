import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import AuthInput from '../common/authInput';
import { useAuth } from '../hook/useAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../common/loadingAnimation';

const RegisterForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { signup, loading, initiateGoogleLogin } = useAuth();

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const confirmPasswordRef = React.useRef(null);

    // Input States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState(t("select_country"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(false);
    const [fakeError, setFakeError] = useState(null);
    
    // State để ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // Error States
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        country: false
    });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };
    const generateRandomPhone = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 9; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let hasError = false;
        let newErrors = { email: '', password: '', confirmPassword: '', country: false };

        // 1. Validate Email
        if (!email) {
            newErrors.email = t('please_enter_email');
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = t('invalid_email_format');
            hasError = true;
        }

        // 2. Validate Password (Các điều kiện cậu vừa thêm)
        if (!password) {
            newErrors.password = t('please_enter_password');
            hasError = true;
        } else if (password.length < 8) {
            newErrors.password = t('Password_need_more_8');
            hasError = true;
        } else if (!/\d/.test(password)) {
            newErrors.password = t('Password_need_at_least_1_number');
            hasError = true;
        } else if (!/[!@#$%^&*(),.?":{}|<>?]/.test(password)) {
            newErrors.password = t('Password_need_at_least_1_special_character');
            hasError = true;
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = t('Password_need_at_least_1_capitalized_letter');
            hasError = true;
        }

        // 3. Validate Confirm Password
        if (!confirmPassword) {
            newErrors.confirmPassword = t('please_enter_password');
            hasError = true;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('passwords_do_not_match');
            hasError = true;
        }

        // 4. Validate Country
        if (country === t("select_country")) {
            newErrors.country = true;
            hasError = true;
        }

        setErrors(newErrors);

        // Nếu có lỗi thì dừng lại ngay, KHÔNG xóa password lúc này để user còn biết đường sửa
        if (hasError) {
            // Chỉ xóa nếu cậu muốn ép user nhập lại từ đầu, nhưng thường là không nên
            setPassword('');
            setConfirmPassword('');
            return; 
        }

        const formData = { 
            email, 
            password, 
            role: "APPLICANT", 
            firstname: "", 
            lastName: "", 
            objective: "", 
            phone: generateRandomPhone(), 
            country, 
            city: "", 
            address: "" 
        };

        // Gọi API
        const result = await signup(formData);
        
        if (result) {
            toast.success(t('register_success'));
            navigate('/login', { state: { fromRegister: true } });
        } else {
            // Khi API lỗi (email trùng...), lúc này mới cần xóa pass để bảo mật
            setPassword('');
            setConfirmPassword('');
        }
    };

    const handleUnsupportedLogin = (name) => {
        setFakeLoading(true); // 1. Hiện Loading của bạn

        setTimeout(() => {
            setFakeLoading(false); // 2. Tắt Loading
            setFakeError(name);    // 3. Hiện thông báo 

            // 4. Sau 2 giây tự đóng thông báo lỗi
            setTimeout(() => {
                setFakeError(null);
            }, 2000);
        }, 1000);
    };

    return (
        <>
            {(loading || fakeLoading) && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <LoadingAnimation text={t('loading')} />
                </div>
            )}
            {fakeError && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20">
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-red-500 animate-bounce min-h-44">
                        <p className="text-gray-800 font-medium">
                            ❌ Xin lỗi, hiện tại chưa hỗ trợ đăng nhập bằng <span className="font-bold text-red-600">{fakeError}</span>
                        </p>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center p-6 space-y-6 min-w-[350px] bg-white">
                <h2 className="text-3xl text-center text-primary-dark font-allerta">
                    Applicant {t('register')}
                </h2>
                <form className='w-[350px]' onSubmit={handleSubmit} noValidate>
                    
                    {/* Email */}
                    <div className="relative mb-6">
                        <AuthInput
                            label="email"
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            ref={emailRef}
                            onKeyDown={(e) => {
                                if (e.nativeEvent.isComposing) return;
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // CHẶN SUBMIT FORM
                                    passwordRef.current?.focus();
                                }
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            placeholder={"abc@example.com"}
                            t={t('email')}
                            className={errors.email ? "border-red-500 ring-1 focus:ring-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 absolute">{errors.email}</p>
                        )}
                    </div>

                    {/* Password & Confirm Password Group */}
                    <div className="space-y-6">
                        {/* Password */}
                        <div className='relative'>
                            <AuthInput
                                label="password"
                                id="password"
                                name="password"
                                // Thay đổi type dựa trên checkbox
                                type={showPassword ? "text" : "password"}
                                value={password}
                                ref={passwordRef}
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.isComposing) return;
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // CHẶN SUBMIT FORM
                                        confirmPasswordRef.current?.focus();
                                    }
                                }}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                }}
                                placeholder={t('enter_pass')}
                                t={t('password')}
                                className={errors.password ? "border-red-500 ring-1 focus:ring-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1 absolute">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className='relative'>
                            <AuthInput
                                label="confirm_password"
                                id="confirm_password"
                                name="confirm_password"
                                // Thay đổi type dựa trên checkbox
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                ref={confirmPasswordRef}
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.isComposing) return;
                                    if (e.key === 'Enter') {
                                        handleSubmit(e);
                                    }
                                }}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                }}
                                placeholder={t('enter_pass')}
                                t={t('confirm')}
                                className={errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1 absolute">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Show Password Checkbox - Nằm dưới bên phải của khối mật khẩu */}
                    <div className='flex text-sm text-primary justify-end items-center mt-2'>
                        <label className='flex items-center cursor-pointer'>
                            {t('show_pass')}
                            <input 
                                type="checkbox" 
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className='ml-2 accent-primary-dark border border-primary rounded-sm' 
                            />
                        </label>
                    </div>

                    {/* Country Selection */}
                    <div className="mt-6 w-full relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-md outline-none transition
                                    ${errors.country ? "border-red-500 border-2" : "border border-primary/50 text-primary"} 
                                    hover:text-primary-dark`}
                        >
                            {country}
                            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        {errors.country && (
                            <p className="text-red-500 text-xs mt-1 absolute">{t('please_select_country')}</p>
                        )}

                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-[105%] bg-white border border-primary/30 rounded-md shadow-lg z-50">
                                {["Việt Nam", "United States", "Japan", "South Korea"].map((ct) => (
                                    <button
                                        key={ct}
                                        type="button"
                                        onClick={() => {
                                            setCountry(ct);
                                            setErrors(prev => ({...prev, country: false}));
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-gray-100 transition"
                                    >
                                        {ct}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Phụ trợ UI & Buttons */}
                    <div className='flex items-center justify-center w-auto mt-7 mx-2'>
                        <div className='h-px bg-primary flex-grow' />
                        <span className='mx-3 text-primary text-sm'>{t('continue')}</span>
                        <div className='h-px bg-primary flex-grow' />
                    </div>

                    <div className='flex justify-center gap-8 mt-6'>
                        <img src='/assets/icons/facebook.png' alt="FB" className='w-12 h-12 cursor-pointer' onClick={() => handleUnsupportedLogin('Facebook')} />
                        <img src="/assets/icons/google.png" alt="GG" className='w-12 h-12 cursor-pointer' onClick={initiateGoogleLogin} disabled={loading} />
                        <img src="/assets/icons/github.png" alt="GH" className='w-12 h-12 cursor-pointer' onClick={() => handleUnsupportedLogin('GitHub')} />
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-full text-white bg-primary-dark hover:bg-indigo-600 transition"
                        >
                            {t('REGISTER')}
                        </button>
                    </div>
                </form>

                <div className="text-sm text-primary">
                    {t('already_account')}{" "}
                    <a href="/login" className="font-medium text-primary-dark hover:underline">{t('login')}</a>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;