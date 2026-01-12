import httpHelper from "../Helper/httpHelper";
const NOTIFICATION_BASE = import.meta.env.VITE_NOTIFICATION_BASE;

export const getNotification = (query) => {
  return httpHelper.get(NOTIFICATION_BASE, query);
};
