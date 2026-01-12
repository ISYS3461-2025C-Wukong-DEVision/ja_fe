// src/services/jobService.js
import httpHelper from '../Helper/httpHelper';
import { jobs } from '../mocks/job.mock';

const JOB_BASE = import.meta.env.VITE_JOB_BASE;

export const getJobs = (queryFilter) => {
  return httpHelper.get(`${JOB_BASE}/search/advance`, queryFilter);
};

export const getJobById = (id) => {
  return httpHelper.get(`${JOB_BASE}/${id}`);
};



/* =========================
   MOCK API (chưa có backend)
========================= */
export const getJobsMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs);
    }, 500);
  });
};
