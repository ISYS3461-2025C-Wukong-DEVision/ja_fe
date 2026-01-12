import httpHelper from "../Helper/httpHelper";

const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE;
const POST_MEDIA_PROFILE = import.meta.env.VITE_POST_MEDIA_PROFILE;

export const REF_MODULE = {
  APPLICANT: 'APPLICANT',
  JOB_POSTING: 'JOB_APPLICATION',
  COMPANY: 'COMPANY',
};

// Post media file
export const uploadMedia = (formData) => {
  return httpHelper.post(`${MEDIA_BASE}/upload`, formData);
};

//Post media file for applicant profile by applicantId
export const postMediaForApplicantProfile = (applicantId, mediaData) => {
  return httpHelper.post(`${POST_MEDIA_PROFILE}/${applicantId}${MEDIA_BASE}`, mediaData);
};

// Delete media by mediaId
export const deleteMediaById = (mediaId) => {
  return httpHelper.delete(`${MEDIA_BASE}/${mediaId}`);
};

// Get attachment by refModule and refId
export const getAttachments = (formData) => {
  return httpHelper.get(`${MEDIA_BASE}`, formData);
};