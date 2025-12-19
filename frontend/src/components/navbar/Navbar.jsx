import { NavLink, useLocation } from "react-router-dom";
import { PhoneIcon, MagnifyingGlassIcon, BriefcaseIcon, BuildingOfficeIcon, UserCircleIcon, CreditCardIcon, ChevronDownIcon, BellAlertIcon } from "@heroicons/react/24/outline"; // 👈 Đã thêm ChevronDownIcon
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react'; // 👈 Cần thiết cho Dropdown
import authService from "../../services/authService";
import { getApplicantByIdMock } from "../../services/applicantService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const user = authService.getCurrentUser();
  const [applicant, setApplicant] = useState({});
  const isAuth = authService.isAuthenticated()
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) return;

    getApplicantByIdMock(user.id)
      .then(setApplicant)
      .catch(() => console.log('Applicant not found'));
  }, [user]);
  
  // State quản lý việc mở/đóng Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  // Định nghĩa các biến và hằng số
  const searchPlaceholder = t('search_home');
  const currentLang = i18n.language;
  const isVietnamese = currentLang === 'vi';
  const currentPath = location.pathname;
  const isJobPage = currentPath.startsWith('/job'); 
  const isNotificationPage = currentPath.startsWith('/notification');

  const handleLogout = async () => {
    await authService.mockLogout();
    setIsDropdownOpen2(false);
  };

  // Hàm chuyển đổi ngôn ngữ và đóng dropdown
  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };
  
  // Hàm hiển thị/ẩn dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    if (isDropdownOpen2) {
      setIsDropdownOpen2(false);
    }
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(prev => !prev);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };
  
  // Định nghĩa các mục menu (cần dịch thuật)
  const navItemsTranslated = [
    { name: t('jobs'), path: "/job", icon: <BriefcaseIcon className="w-5 h-5" /> },
    { name: t('company'), path: "/company", icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { name: t('subscription'), path: "/subscription", icon: <CreditCardIcon className="w-5 h-5" /> },
    { name: t('profile'), path: "/profile", icon: <UserCircleIcon className="w-5 h-5" /> },
  ];
  
  return (
    <nav className="w-full h-auto bg-white shadow-md shadow-primary/50 sticky top-0 z-50">
      <div className="mx-auto px-12 flex flex-col items-center justify-between w-full">
        
        {/* HÀNG TRÊN: LOGO, SEARCH, CONTACTS */}
        {/* Bố cục căn giữa các khối khi xuống hàng */}
        <div className="flex flex-wrap justify-center items-center w-full mt-6 gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-4 xl:px-9">
          
          {/* 1. LOGO */}
          {/* w-full justify-center: căn giữa khi màn hình nhỏ */}
          <NavLink to="/" className="flex items-center w-full justify-center lg:w-auto lg:justify-start flex-shrink-0">
            <div className="font-allerta text-4xl text-primary-dark">Applicant</div>
          </NavLink>
          
          {/* 2. SEARCH BAR - ẨN NẾU LÀ TRANG /JOB */}
          {/* w-full max-w-lg: giới hạn kích thước | mx-auto: căn giữa khi xuống hàng */}
          {!isJobPage && (
            <div className="relative w-full max-w-lg flex items-center order-3 lg:order-none mx-auto"> 
                
                {/* INPUT FIELD */}
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="border border-primary rounded-full px-3 py-5 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-primary-dark [&::placeholder]:italic [&::placeholder]:text-sm"
                />
                
                {/* ICON */}
                <NavLink 
                    to="/job" 
                    className="absolute inset-y-0 right-0 flex items-center justify-center pr-3" 
                >
                    <MagnifyingGlassIcon className="w-5 h-5 text-primary hover:text-purple-900 cursor-pointer" />
                </NavLink>
            </div>
          )}
          
          {/* 3. CONTACTS/LOGIN/LANG */}
          {/* w-full justify-center: Buộc xuống hàng và CĂN GIỮA nội dung ở màn hình nhỏ */}
          <div className="flex items-center w-full justify-center lg:w-auto lg:justify-end order-3 lg:order-none flex-shrink-0">
            <PhoneIcon className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-gray-500">1900 6750</div>
            <div className="text-sm text-gray-500 ml-2">|</div>
            {isAuth ? 
              (
                <div className="flex relative ml-2">
                  <button onClick={toggleDropdown2} className="flex items-center text-sm text-gray-500 hover:text-black">
                    {`${applicant.first_name} ${applicant.last_name}`}
                  </button>
                  <button onClick={() => navigate('/notification')} className={`ml-1 p-0.5 border border-gray-200 rounded-full shadow ${isNotificationPage ? "bg-primary hover:bg-primary-dark" : ""}`}>
                    <BellAlertIcon className={`w-4 h-4 ${isNotificationPage ? "text-white" : "text-gray-500 hover:text-black"}`} />
                  </button>
                  {/* KHUNG DROPDOWN (ẨN/HIỆN THEO STATE) */}
                  {isDropdownOpen2 && (
                    <div className="absolute right-0 mt w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      
                      {/* Logout */}
                      <button 
                          onClick={() => (handleLogout(), navigate(0))} 
                          className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                      >
                          {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/login" className="ml-2 text-sm text-gray-500 hover:text-black">
                  {t('login')}
                </NavLink>
              )
            }
            <div className="text-sm text-gray-500 ml-2">|</div>
            
            {/* KHỐI NÚT CHUYỂN ĐỔI NGÔN NGỮ VÀ DROPDOWN */}
            <div className="relative ml-2"> 
                
              {/* NÚT CHUYỂN ĐỔI (EN v / VI v) */}
              <button 
                  onClick={toggleDropdown} 
                  className="flex items-center text-sm text-gray-500 hover:text-black focus:outline-none"
              >
                  {isVietnamese ? "VI" : "EN"} 
                  <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200" /> 
              </button>

              {/* KHUNG DROPDOWN (ẨN/HIỆN THEO STATE) */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  
                  {/* Lựa chọn Tiếng Việt */}
                  <button 
                      onClick={() => changeLanguage('vi')} 
                      className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                      Tiếng Việt
                  </button>
                  
                  {/* Lựa chọn Tiếng Anh */}
                  <button 
                      onClick={() => changeLanguage('en')} 
                      className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                      English
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="flex justify-center gap-6 mt-8">
          {navItemsTranslated.map((item) => (
            <div key={item.name} className="flex flex-col"> 
              <NavLink
                to={item.path}
                className="flex flex-col"
              >
                {/* Hàm render prop: Sử dụng className làm hàm để lấy isActive */}
                {({ isActive }) => (
                    <>
                        {/* A. Phần Link chính */}
                        <div
                            className={`flex items-center gap-1 px-2 text-sm font-medium 
                                ${isActive ? "text-primary-dark" : "text-primary hover:text-purple-700 mt-1"}`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </div>
                        
                        {/* B. Phần Div Dải màu */}
                        <div 
                            className={`${isActive ? "h-2 bg-gradient-to-t from-primary-dark to-transparent" : "h-0"} transition-all duration-300`}
                        />
                    </>
                )}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;