// src/services/jobService.js
import httpHelper from '../Helper/httpHelper';
import { jobs } from '../mocks/job.mock';

const JOB_BASE = '/jobs';

export const getJobs = () => {
  return httpHelper.get(JOB_BASE);
};

export const getJobById = (id) => {
  return httpHelper.get(`${JOB_BASE}/${id}`);
};

export const createJob = (data) => {
  return httpHelper.post(JOB_BASE, data);
};

export const updateJob = (id, data) => {
  return httpHelper.put(`${JOB_BASE}/${id}`, data);
};

export const patchJob = (id, data) => {
  return httpHelper.patch(`${JOB_BASE}/${id}`, data);
};

export const deleteJob = (id) => {
  return httpHelper.delete(`${JOB_BASE}/${id}`);
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
