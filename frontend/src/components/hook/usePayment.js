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
            toast.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    const fetchMyHistory = async () => {
        setPaymentLoading(true)
        try {
            const reponse = await getHistorySubscription()
            setMyHistory(reponse?.data)
        } catch (error) {
            toast.error(error.message)
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

    const postInitPay = async (success, cancel) => {
        setPaymentLoading(true)
        try {
            const reponse = await postInit(success, cancel)
            return reponse?.data
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    const postPay = async (success, cancel) => {
        setPaymentLoading(true)
        try {
            const reponse = await postPayCurrent(success, cancel)
            return reponse?.data
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    const postCancel= async (success, cancel) => {
        setPaymentLoading(true)
        try {
            const reponse = await postCancelCurrent(success, cancel)
            return reponse?.data
        } catch (error) {
            console.error(error.message)
        } finally { setPaymentLoading(false); }
    }

    useEffect(() => {
        fetchIsPremium()
    }, [])

    return {
        myTransaction, paymentLoading, myHistory, isPremium,
        fetchMyTransaction, fetchMyHistory, 
        postInitPay, postPay, postCancel
    }
}