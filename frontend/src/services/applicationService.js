import httpHelper from "../Helper/httpHelper";
const APPLICATION_BASE = import.meta.env.VITE_APPLICATION_BASE;

export const getApplications = (query) => {
  return httpHelper.get(APPLICATION_BASE, query);
};

export const createApplication = (data) => {
  return httpHelper.post(APPLICATION_BASE, data);
};
