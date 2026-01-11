import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useTranslation } from 'react-i18next';

const GoogleCallback = () => {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleGoogleCallback } = useAuth();
    const processedRef = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');
        
        if (code && !processedRef.current) {
            processedRef.current = true;
            
            handleGoogleCallback(code)
                .then(() => {
                    navigate('/');
                })
                .catch(() => {
                    navigate('/login');
                });
        } else if (!code) {
            navigate('/login');
        }
    }, [searchParams, handleGoogleCallback, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Card Container */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center transform transition-all hover:scale-105 duration-500 ease-out border border-gray-100">
                
                {/* Animation Area */}
                <div className="relative flex justify-center items-center py-4">
                    {/* Vòng tròn nền mờ (Hiệu ứng Pulse) */}
                    <div className="absolute animate-ping inline-flex h-20 w-20 rounded-full bg-blue-100 opacity-75"></div>
                    
                    {/* Vòng tròn tĩnh */}
                    <div className="relative inline-flex rounded-full h-20 w-20 bg-blue-50 items-center justify-center">
                        {/* Spinner xoay quanh logo */}
                        <div className="absolute w-24 h-24 border-4 border-blue-100 rounded-full"></div>
                        <div className="absolute w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        
                        {/* Google Logo ở chính giữa */}
                        <img 
                            src="https://www.svgrepo.com/show/475656/google-color.svg" 
                            alt="Google" 
                            className="w-8 h-8 z-10"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900">
                        {t('verified')}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t('connect')} <br/>
                        {t('connect2')}
                    </p>
                </div>

                {/* Loading Bar (Optional decoration) */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full animate-progress w-full origin-left-right"></div>
                </div>
            </div>

            {/* CSS Animation Keyframes cho thanh loading chạy qua lại (nếu Tailwind chưa có sẵn) */}
            <style>{`
                @keyframes progress {
                    0% { width: 0%; margin-left: 0; }
                    50% { width: 100%; margin-left: 0; }
                    100% { width: 0%; margin-left: 100%; }
                }
                .animate-progress {
                    animation: progress 1.5s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default GoogleCallback;