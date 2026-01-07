import authService from '../services/authService';

const BASE_URL = 'https://devision-be.quykhang.cloud/api';

class HttpHelper {
  async request(method, url, body = null, headers = {}, retry = true) {
    const accessToken = authService.getAccessToken();

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    // Gắn Bearer token (trừ login)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${url}`, config);

    // ❌ Token hết hạn → thử refresh
    if (response.status === 401 && retry) {
      try {
        await authService.refreshToken();
        return this.request(method, url, body, headers, false);
      } catch (err) {
        authService.logout();
        throw err;
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Request failed');
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    return response.json();
  }

  get(url, headers = {}) {
    return this.request('GET', url, null, headers);
  }

  post(url, body, headers = {}) {
    return this.request('POST', url, body, headers);
  }

  put(url, body, headers = {}) {
    return this.request('PUT', url, body, headers);
  }

  patch(url, body, headers = {}) {
    return this.request('PATCH', url, body, headers);
  }

  delete(url, headers = {}) {
    return this.request('DELETE', url, null, headers);
  }
}

const httpHelper = new HttpHelper();
export default httpHelper;
