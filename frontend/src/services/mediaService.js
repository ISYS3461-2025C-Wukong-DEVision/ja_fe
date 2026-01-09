import httpHelper from "../Helper/httpHelper";

const MEDIA_BASE = '/media';
const POST_MEDIA_PROFILE = '/applicant-profile/profile';

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