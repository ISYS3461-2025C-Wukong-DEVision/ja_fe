import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import { tokenStorage } from '../../utils/tokenStorage';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState(tokenStorage.getCurrentUser()); // Lấy user từ localStorage khi khởi tạo
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password); // Gọi hàm login
      setUser(userData);
      console.log("user: ", userData)
      toast.success('Đăng nhập thành công!');
      return userData;
    } catch (error) {
      toast.error(error.message || 'Đăng nhập thất bại');
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

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    signup
  };
};