import httpHelper from "../Helper/httpHelper";
const PAYMENT_BASE = '/payment'
const SUBSCRIPTION_BASE = '/subscription'

export const getMyTransaction = () => {
    return httpHelper.get(`${PAYMENT_BASE}/my-transaction`)
}

export const getHistorySubscription = () => {
    return httpHelper.get(`${SUBSCRIPTION_BASE}/history`)
}

export const getCurrentSubscription = () => {
    return httpHelper.get(`${SUBSCRIPTION_BASE}/current`)
}

export const postInit = () => {
    // Lấy địa chỉ gốc hiện tại (VD: http://localhost:8081 hoặc https://myapp.vercel.app)
    const currentUrl = window.location.origin;

    const payload = {
        // Nếu thành công -> Quay về trang success của bạn
        redirectSuccessUrl: `${currentUrl}/payment/success`, // Sửa path theo route bạn đã định nghĩa
        
        // Nếu hủy -> Quay về trang cancel hoặc trang chủ
        redirectCancelUrl: `${currentUrl}/payment/cancel`   
    };

    return httpHelper.post(`${SUBSCRIPTION_BASE}/init`, payload)
}

export const postPayCurrent = () => {
    const currentUrl = window.location.origin;

    const payload = {
        // Nếu thành công -> Quay về trang success của bạn
        redirectSuccessUrl: `${currentUrl}/payment/success`, // Sửa path theo route bạn đã định nghĩa
        
        // Nếu hủy -> Quay về trang cancel hoặc trang chủ
        redirectCancelUrl: `${currentUrl}/payment/cancel`   
    };

    return httpHelper.post(`${SUBSCRIPTION_BASE}/pay-current`, payload)
}

export const postCancelCurrent = () => {
    return httpHelper.post(`${SUBSCRIPTION_BASE}/cancel-current`)
}
