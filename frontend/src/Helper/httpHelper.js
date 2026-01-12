import authService from '../services/authService';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL

class HttpHelper {
  async request(method, url, body = null, headers = {}, retry = true) {
    const accessToken = authService.getAccessToken();

    // Kiểm tra xem body có phải là FormData không
    const isFormData = body instanceof FormData;

    const config = {
      method,
      headers: {
        ...headers,
      },
    };

    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      // Nếu là FormData, để trình duyệt tự xử lý Content-Type (nó sẽ tự thêm boundary)
      // Xoá header Content-Type nếu lỡ có bị set đè vào
      if (config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
      }
    }

    // Gắn Bearer token (trừ login)
    if (accessToken && typeof accessToken === "string") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }


        // 👇👇👇 CHÈN ĐOẠN DEBUG NÀY VÀO ĐÂY 👇👇👇
    // console.group(`🔥 HTTP REQUEST: ${method} ${url}`);
    // console.log("🔗 Full URL:", `${BASE_URL}${url}`);
    // console.log("🧢 Headers:", config.headers);

    if (body) {
      if (isFormData) {
        config.body = body; // Giữ nguyên FormData, KHÔNG stringify
      } else {
        config.body = JSON.stringify(body); // JSON bình thường thì stringify
        // try {
        //     // // Parse ngược lại để bạn dễ nhìn cấu trúc object
        //     console.log("📦 Body Object (Dễ nhìn):", JSON.parse(config.body)); 
        //     // // In ra chuỗi thô để check kỹ từng ký tự (quan trọng để soi camelCase/snake_case)
        //     console.log("📝 Body Raw String (Gửi đi thật):", config.body); 
        // } catch (e) {
        //     console.log("📦 Body:", config.body);
        // }
      }
    }
    // console.groupEnd();
    // 👆👆👆 HẾT ĐOẠN DEBUG 👆👆👆

    const response = await fetch(`${BASE_URL}${url}`, config);

    const isLoginRequest = url.toLowerCase().includes('/login') || url.toLowerCase().includes('/signin');

    // ❌ Token hết hạn
    if (response.status === 401 && !isLoginRequest) { // 
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

  buildQueryString(params) {
    if (!params || Object.keys(params).length === 0) return '';

    // Lọc bỏ các giá trị null, undefined hoặc rỗng để URL sạch đẹp
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const searchParams = new URLSearchParams(cleanParams);
    
    // toString() của URLSearchParams sẽ tự động encode (vd: dấu phẩy , thành %2C)
    // đúng như cái URL mẫu cậu đưa.
    return searchParams.toString();
  }

  // --- CÁC METHOD ĐƯỢC NÂNG CẤP ---

  // Thêm tham số params vào vị trí thứ 2
  get(url, params = {}, headers = {}) {
    let finalUrl = url;
    const queryString = this.buildQueryString(params);

    if (queryString) {
      // Kiểm tra xem url gốc đã có ? chưa để nối cho đúng
      finalUrl += (url.includes('?') ? '&' : '?') + queryString;
    }

    return this.request('GET', finalUrl, null, headers);
  }

  // Delete đôi khi cũng cần query params
  delete(url, params = {}, headers = {}) {
    let finalUrl = url;
    const queryString = this.buildQueryString(params);

    if (queryString) {
      finalUrl += (url.includes('?') ? '&' : '?') + queryString;
    }

    return this.request('DELETE', finalUrl, null, headers);
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

}

const httpHelper = new HttpHelper();
export default httpHelper;