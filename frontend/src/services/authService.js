// authService.js
import httpHelper from '../Helper/httpHelper';
import { tokenStorage } from '../utils/tokenStorage';
import { getApplicantById } from './applicantService';
import toast from 'react-hot-toast';

const AUTH_BASE = '/applicant-auth/api/auth';

const authService = {
    async login(email, password) {
        // 1. Login lấy token (Bearer token)
        const response = await httpHelper.post(`${AUTH_BASE}/login`, { email, password });
        const { token, id, role, email: userEmail, message: loginMessage } = response;

        // Lưu tạm token để lấy profile
        tokenStorage.setAuth({ accessToken: token, user: null });

        try {
            // 2. Fetch thông tin chi tiết
            const profileData = await getApplicantById(id)

            const finalUser = {
                id,
                email: userEmail,
                role,
                name: (profileData.firstName && profileData.lastName) 
                    ? `${profileData.firstName} ${profileData.lastName}` 
                    : "Unknown User",
                country: profileData.country || "Vietnam"
            };

            tokenStorage.setAuth({ accessToken: token, user: finalUser });
            return finalUser;
        } catch (error) {
            console.error("Fetch profile failed, using basic info", error);
            const basicUser = { id, email: userEmail, role, name: "Unknown User", country: "Vietnam" };
            tokenStorage.setAuth({ accessToken: token, user: basicUser });
            return basicUser;
        }
    },

    async getGoogleAuthUrl() {
        // GET /google/url
        return await httpHelper.get(`${AUTH_BASE}/google/url`);
    },

    async loginWithGoogle(code) {
        // GET /oauth2/callback/google?code=...
        // httpHelper.get tham số thứ 2 là query params
        const response = await httpHelper.get(`${AUTH_BASE}/oauth2/callback/google`, { code });
        
        // Cấu trúc response từ hình Swagger: { token, id, email, role, message }
        const { token, id, role, email: userEmail } = response;

        // --- Logic chuẩn hóa User giống hệt hàm login thường ---
        tokenStorage.setAuth({ accessToken: token, user: null });

        try {
            // Fetch profile chi tiết để lấy tên, quốc gia...
            const profileData = await getApplicantById(id);

            const finalUser = {
                id,
                email: userEmail,
                role,
                name: (profileData.firstName && profileData.lastName) 
                    ? `${profileData.firstName} ${profileData.lastName}` 
                    : "Unknown User",
                country: profileData.country || "Vietnam"
            };

            tokenStorage.setAuth({ accessToken: token, user: finalUser });
            return finalUser;
        } catch (error) {
            console.error("Fetch profile failed after Google login", error);
            // Fallback nếu không lấy được profile chi tiết
            const basicUser = { id, email: userEmail, role, name: "Google User", country: "Vietnam" };
            tokenStorage.setAuth({ accessToken: token, user: basicUser });
            return basicUser;
        }
    },

    async validateToken() {
        const token = tokenStorage.getAccessToken();
        if (!token) return false;

        try {
            // Gửi request lên API validate (httpHelper sẽ tự đính Bearer Token vào)
            // Nếu thành công (200 OK), backend xác nhận token còn dùng được
            const isValid =  await httpHelper.get(`${AUTH_BASE}/login`);
            if (isValid === false) {
                console.warn("Token không còn hợp lệ (Backend returned false)");
                this.logout();
                return false;
            }

            return true;
        } catch (err) {
            // Nếu lỗi logout xóa sạch dữ liệu
            console.warn("Token validation failed:", err.message);
            this.logout();
            return false;
        }
    },

    logout() {
        tokenStorage.clear();
        // Có thể gọi thêm API logout của backend nếu cần
    },

    getAccessToken: tokenStorage.getAccessToken,
    getCurrentUser: tokenStorage.getCurrentUser,
    isAuthenticated: tokenStorage.isAuthenticated,

    async signup(data) {
        // Gửi yêu cầu đăng ký với: email, password, firstName, lastName, country
        const response = await httpHelper.post(`${AUTH_BASE}/register`, data);

        // response theo Screenshot: { "token": "...", "message": "Registration successful", ... }
        // Ở đây ta chỉ cần message để thông báo cho người dùng
        return response;
    },
};

export default authService;