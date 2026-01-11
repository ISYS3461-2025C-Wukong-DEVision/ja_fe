import { getMyTransaction, getCurrentSubscription, getHistorySubscription, postCancelCurrent, postInit, postPayCurrent } from "../../services/paymentService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const usePayment = () => {
    const [myTransaction, setMyTransaction] = useState([])
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [isPremium, setIsPremium] = useState(null)
    const [myHistory, setMyHistory] = useState([])

    const fetchMyTransaction = async () => {
        setPaymentLoading(true)
        try {
            const reponse = await getMyTransaction()
            setMyTransaction(reponse?.data)
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    const fetchMyHistory = async () => {
        setPaymentLoading(true)
        try {
            const reponse = await getHistorySubscription()
            setMyHistory(reponse?.data)
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    const fetchIsPremium = async () => {
        try {
            const reponse = await getCurrentSubscription()
            setIsPremium(reponse?.data?.isPremium || false)
        } catch (error) {
            console.error(error.message)
        }
    }

    const postPay = async () => {
        setPaymentLoading(true);
        try {
            
            const reponse2 = await postInit();
            const checkoutUrl2 = reponse2?.data?.checkoutSession;

            if (checkoutUrl2) {
                window.location.href = checkoutUrl2;
            } else {
                console.error("Cả hai API đều không trả về link thanh toán");
            }

        } catch (error) {
            console.error("Lỗi Payment:", error.message);
        } finally {
            setPaymentLoading(false);
        }
    };

    const postPayCurrent = async () => {
        setPaymentLoading(true);
        try {
            
            const reponse2 = await postInit();
            const checkoutUrl2 = reponse2?.data?.checkoutSession;

            if (checkoutUrl2) {
                window.location.href = checkoutUrl2;
            } else {
                console.error("Cả hai API đều không trả về link thanh toán");
            }

        } catch (error) {
            console.error("Lỗi Payment:", error.message);
        } finally {
            setPaymentLoading(false);
        }
    };

    const postCancel= async () => {
        setPaymentLoading(true)
        try {
            const reponse = await postCancelCurrent()
            return reponse?.data
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    return {
        myTransaction, paymentLoading, myHistory, isPremium,
        fetchMyTransaction, fetchMyHistory, 
        postPay, postCancel, fetchIsPremium
    }
}