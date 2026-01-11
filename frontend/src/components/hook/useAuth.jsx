import { useState, createContext, useContext, useEffect } from 'react';
import authService from '../../services/authService';
import { tokenStorage } from '../../utils/tokenStorage';
import { usePayment } from './usePayment';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(tokenStorage.getCurrentUser()); // Lấy user từ localStorage khi khởi tạo
  const [loading, setLoading] = useState(false);
  const {isPremium, fetchIsPremium} = usePayment()

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password); // Gọi hàm login
      setUser(userData);
      toast.success('Đăng nhập thành công!');
      return userData;
    } catch (error) {
      toast.error('Đăng nhập thất bại, kiểm tra lại tài khoản và mật khẩu của bạn');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    authService.logout(); //
    setUser(null);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const signup = async (formData) => {
      setLoading(true);
      try {
          const response = await authService.signup(formData);
          
          // 1. Tắt loading ngay khi có phản hồi
          setLoading(false);
          
          // 2. Chờ 0.5s (500ms) rồi mới hiện Toast thành công
          await sleep(500);
          toast.success(response.message || 'Đăng ký thành công!');
          
          // 3. Chờ tiếp 0.5s nữa rồi mới trả về để Component navigate sang /login
          await sleep(500);
          return response; 

      } catch (error) {
          // Tắt loading nếu lỗi
          setLoading(false);
          
          // 1. Chờ 0.5s rồi hiện Toast lỗi
          await sleep(500);
          toast.error(error.message || 'Đăng ký thất bại');
          
          // Ko trả về response và ko nhảy trang
          throw error;
      }
  };

  const initiateGoogleLogin = async () => {
    setLoading(true);
    try {
      const data = await authService.getGoogleAuthUrl();
      if (data?.url) {
        // Redirect sang Google
        window.location.href = data.url;
      } else {
        toast.error("Không lấy được đường dẫn đăng nhập Google");
      }
    } catch (error) {
      toast.error(error.message || 'Lỗi kết nối Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCallback = async (code) => {
    setLoading(true);
    try {
      const userData = await authService.loginWithGoogle(code);
      setUser(userData);
      toast.success('Đăng nhập Google thành công!');
      return userData; // Trả về để component biết đường navigate
    } catch (error) {
      toast.error(error.message || 'Đăng nhập Google thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, loading, login, logout, signup, initiateGoogleLogin, handleGoogleCallback, isPremium, fetchIsPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được dùng trong AuthProvider");
  }
  return context;
};