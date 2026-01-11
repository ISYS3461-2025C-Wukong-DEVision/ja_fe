// utils/tokenStorage.js

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'authUser';

export const tokenStorage = {
  /* ======================
     SAVE AUTH DATA
  ====================== */
  setAuth({ accessToken, refreshToken, user }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

 // utils/tokenStorage.js
  setUser(user) { // Bỏ dấu { }
      if (!user) return;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
  },



  /* ======================
     CLEAR AUTH DATA
  ====================== */
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /* ======================
     GETTERS
  ====================== */
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);
    // Thêm kiểm tra tránh chữ "undefined" độc hại
    if (!user || user === "undefined") return null;
    try {
        return JSON.parse(user);
    } catch (e) {
        return null;
    }
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },
};
