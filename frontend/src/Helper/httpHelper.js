import authService from '../services/authService';

const BASE_URL = 'https://devision-be.quykhang.cloud/api';

class HttpHelper {
  async request(method, url, body = null, headers = {}, retry = true) {
    const accessToken = authService.getAccessToken();

    const isFormData = body instanceof FormData;

    const config = {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
    };

    // Gắn Bearer token
    if (
      accessToken &&
      typeof accessToken === "string" &&
      accessToken.split(".").length === 3
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (body) {
      // 3. NẾU LÀ FORMDATA: Giữ nguyên body, không được stringify
      config.body = isFormData ? body : JSON.stringify(body);
    }

    // Lưu ý: url ở đây sẽ là url đã được nối query string từ hàm get
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
      // Thử parse JSON error để hiển thị đẹp hơn
      try {
        const jsonError = JSON.parse(errorText);
        throw new Error(jsonError.message || errorText);
      } catch (e) {
        throw new Error(errorText || 'Request failed');
      }
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    return response.json();
  }


  get(url, options = {}) {
    // Tách params ra, phần còn lại giữ là headers
    const { params, ...headers } = options;

    let finalUrl = url;

    if (params) {
      // Dùng URLSearchParams để tạo chuỗi ?key=value&key2=value2
      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString;
      }
    }
    // console.log("Final URL: ", finalUrl); 
    return this.request('GET', finalUrl, null, headers);
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