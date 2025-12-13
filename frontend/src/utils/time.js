import { useTranslation } from "react-i18next";

export const timeAgo = (inputDate) => {
    const { t } = useTranslation();
    const date = new Date(inputDate);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // chênh lệch (giây)

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const weeks = Math.floor(diff / 604800);
    const months = Math.floor(diff / 2592000);
    const years = Math.floor(diff / 31536000);

    if (diff < 60) return t('moment');
    if (minutes < 60) return `${minutes} ${t('minutes')}`;
    if (hours < 24) return `${hours} ${t('hours')}`;
    if (days < 7) return `${days} ${t('days')}`;
    if (weeks < 4) return `${weeks} ${t('weeks')}`;
    if (months < 12) return `${months} ${t('months')}`;
    return `${years} ${t('years')}`;
};
