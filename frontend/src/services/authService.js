import httpHelper from '../Helper/httpHelper';
import { tokenStorage } from '../utils/tokenStorage';
import { users } from '../mocks/user.mock';


/* ======================
   UTILS
====================== */

// Fake API delay để giống backend thật
const fakeDelay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// Fake token generator (giả lập JWE/JWS)
const generateFakeToken = (payload, expiresInMs) => {
    return btoa(
        JSON.stringify({
        ...payload,
        iat: Date.now(),
        exp: Date.now() + expiresInMs,
        })
    );
};

const authService = {
    /* ======================
        LOGIN
    ====================== */
    async login(email, password) {
        const response = await httpHelper.post('/auth/login', {
        email,
        password,
        });

        const { accessToken, refreshToken, user } = response;
        tokenStorage.setAuth({ accessToken, refreshToken, user });

        return user;
    },

    /* ======================
        LOGOUT
    ====================== */
    async logout() {
        try {
        await httpHelper.post('/auth/logout');
        } catch (e) {
        // ignore backend error
        } finally {
        tokenStorage.clear();
        }
    },

    /* ======================
        REFRESH TOKEN
    ====================== */
    async refreshToken() {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');
        const { accessToken } = await httpHelper.post('/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        });
        tokenStorage.setAuth({
            accessToken,
            refreshToken,
            user: tokenStorage.getCurrentUser(),
        });
        return accessToken;
    },


    /* ======================
        HELPERS
    ====================== */
    getAccessToken: tokenStorage.getAccessToken,
    getCurrentUser: tokenStorage.getCurrentUser,
    isAuthenticated: tokenStorage.isAuthenticated,



    /* ======================
        LOGIN (MOCK)
    ====================== */
    async mockLogin(email, password) {
        await fakeDelay();

        // 1. Validate user
        const user = users.find(
        (u) => u.email === email && u.password_hash === password
        );

        if (!user) {
        throw new Error('Invalid email or password');
        }

        if (!user.is_active) {
        throw new Error('Account is inactive');
        }

        // 2. Generate fake tokens
        const accessToken = generateFakeToken(
        { userId: user.id, role: user.role, type: 'ACCESS' },
        15 * 60 * 1000 // 15 phút
        );

        const refreshToken = generateFakeToken(
        { userId: user.id, type: 'REFRESH' },
        7 * 24 * 60 * 60 * 1000 // 7 ngày
        );

        // 3. Public user info (giống backend trả về)
        const safeUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        };

        // 4. Save auth state
        tokenStorage.setAuth({
        accessToken,
        refreshToken,
        user: safeUser,
        });

        // 5. Return giống backend thật
        return {
        user: safeUser,
        accessToken,
        refreshToken,
        };
    },

    /* ======================
        LOGOUT MOCK
    ====================== */
    async mockLogout() {
        // Mock backend logout
        tokenStorage.clear();
    },
};

export default authService;
