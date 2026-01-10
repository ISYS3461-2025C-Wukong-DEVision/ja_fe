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

export const postInit = (success, cancel) => {
    const dataform = {
        redirectSuccessUrl: success,
        redirectCancelUr: cancel,
    }
    return httpHelper.post(`${SUBSCRIPTION_BASE}/init`, dataform)
}

export const postPayCurrent = (success, cancel) => {
    const dataform = {
        redirectSuccessUrl: success,
        redirectCancelUrl: cancel,
    }
    return httpHelper.post(`${SUBSCRIPTION_BASE}/pay-current`, dataform)
}

export const postCancelCurrent = () => {
    return httpHelper.post(`${SUBSCRIPTION_BASE}/cancel-current`)
}
