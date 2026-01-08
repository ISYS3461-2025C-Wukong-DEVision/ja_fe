import authService from '../services/authService';
import toast from 'react-hot-toast';

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
    if (
      accessToken &&
      typeof accessToken === "string" &&
      accessToken.split(".").length === 3
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${url}`, config);

    // ❌ Token hết hạn
    if (response.status === 401) { // 
      authService.logout();
      
      // Phát một sự kiện tùy chỉnh thay vì gọi toast trực tiếp ở đây
      const event = new CustomEvent('auth-token-expired');
      window.dispatchEvent(event);
      
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Request failed';

      try {
        // Thử parse text đó sang JSON để lấy trường 'message'
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // Nếu không phải JSON (vd: lỗi 500 server trả về html), dùng text thô
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    // Đọc nội dung dưới dạng text trước để xử lý trường hợp trả về true/false
    const textData = await response.text();
    try {
      return JSON.parse(textData); // Trả về object hoặc giá trị true/false nếu là JSON chuẩn
    } catch (e) {
      return textData; // Nếu không phải JSON (vd: text thô), trả về text
    }
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