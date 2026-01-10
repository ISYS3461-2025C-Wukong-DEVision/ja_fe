import {useState} from 'react'
import { getNotification } from '../../services/notificationService'

export const useNotification = () => {
    const [myNotification, setMyNotification] = useState({})
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({target_module:"JOB_POST_MATCH", age_no: 1, page_sz: 5})

    const fetchMyNotification = async () => {
        setLoading(true);
        try {
            const reponse = await getNotification(pagination)
            setMyNotification(reponse?.data || {})
        } catch (error) {
            console.error(error.message)
        } finally { setLoading(false); }
    }

    return {
        myNotification, fetchMyNotification, loading, pagination, setPagination
    }
}