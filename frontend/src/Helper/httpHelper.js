// src/helper/httpHelper.js

class HttpHelper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, url, body = null, headers = {}) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseURL}${url}`, config);

    // Xử lý lỗi HTTP
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    // Một số DELETE không trả JSON
    if (response.status === 204) {
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

// Export instance dùng chung
const httpHelper = new HttpHelper('http://localhost:8888');

export default httpHelper;
