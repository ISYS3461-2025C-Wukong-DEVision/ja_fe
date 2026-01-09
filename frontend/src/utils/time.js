import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'; // Cần import thêm plugin này

dayjs.extend(utc);

export const timeAgo = (inputDate, t) => {
    if (!inputDate || !t || inputDate === "N/A") return "";

    // QUAN TRỌNG: .utc(inputDate).local() để đưa giờ server về giờ máy tính của cậu
    const date = dayjs.utc(inputDate).local(); 
    const now = dayjs();
    
    // Tính toán độ lệch (giây) giữa 2 mốc giờ đã cùng là Local
    const diff = now.diff(date, 'second');

    // Nếu diff âm (do lệch giây nhỏ giữa server và client) thì coi như vừa xong
    if (diff < 60) return t('moment');
    
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} ${t('minutes')}`;
    
    const hours = Math.floor(diff / 3600);
    if (hours < 24) return `${hours} ${t('hours')}`;
    
    const days = Math.floor(diff / 86400);
    if (days < 7) return `${days} ${t('days')}`;
    
    const weeks = Math.floor(diff / 604800);
    if (weeks < 4) return `${weeks} ${t('weeks')}`;
    
    const months = Math.floor(diff / 2592000);
    if (months < 12) return `${months} ${t('months')}`;
    
    const years = Math.floor(diff / 31536000);
    return `${years} ${t('years')}`;
};