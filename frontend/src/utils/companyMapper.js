import { ATTACHMENT_TYPE } from "./constants";

export const getLatestMediaByType = (mediaList = [], type) => {
    return mediaList.reduce((latest, current) => {
        if (current.attachmentType !== type) return latest;

        if (
        !latest ||
        new Date(current.createdAt) > new Date(latest.createdAt)
        ) {
        return current;
        }

        return latest;
    }, null);
};

export const getMediaByType = (mediaList = [], type) => {
    if (!Array.isArray(mediaList)) return [];

    return mediaList
        .filter(item => item.attachmentType === type)
        // Sắp xếp từ mới nhất đến cũ nhất (Nếu cậu không cần sắp xếp thì xóa 3 dòng dưới)
        .sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
};

export const mapCompanyFromApi = (response) => {
  const data = response?.data;
  if (!data) return null;

  console.log("Media List:", data.mediaList);

  const latestAvatar = getLatestMediaByType(
    data.mediaList,
    ATTACHMENT_TYPE.AVATAR
  );

  const latestImage = getLatestMediaByType(
    data.mediaList,
    ATTACHMENT_TYPE.IMAGE
  );

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,

    about: data.descAbout,
    target: data.descTarget,

    location: {
      country: data.country,
      city: data.city,
      address: data.address,
    },

    avatar: latestAvatar?.url || null,
    latestImage: latestImage?.url || null,
  };
};