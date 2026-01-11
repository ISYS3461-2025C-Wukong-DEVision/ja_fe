import React, { useState, useEffect } from 'react';

const TitleLogin = ({ title, t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClick = () => {
    // 1. Bật loading
    setIsLoading(true);

    // 2. Sau 1 giây, tắt loading và hiện thông báo lỗi
    setTimeout(() => {
      setIsLoading(false);
      setShowError(true);

      // 3. Sau 2 giây nữa (hoặc tùy bạn), tự động đóng thông báo lỗi
      setTimeout(() => {
        setShowError(false);
      }, 2000); 
    }, 1000);
  };

  return (
    <div className="relative p-4">
      {/* Component Title để nhấn vào */}
      <h1 
        className="text-xl font-bold cursor-pointer hover:text-blue-500 transition-colors"
        onClick={handleClick}
      >
        {title}
      </h1>

      {/* Overlay Loading */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <LoadingAnimation text={t('loading')} />
        </div>
      )}

      {/* Thông báo lỗi (Popup) */}
      {showError && (
        <div className="fixed top-10 right-10 z-[60] bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {t('sorry')} {title}
        </div>
      )}
    </div>
  );
};

export default TitleLogin;