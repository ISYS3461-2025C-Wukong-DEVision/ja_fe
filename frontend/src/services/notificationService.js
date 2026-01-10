import httpHelper from "../Helper/httpHelper";
const NOTIFICATION_BASE = '/notification/my-notifications';

export const getNotification = (query) => {
  return httpHelper.get(NOTIFICATION_BASE, query);
};
