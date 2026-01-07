import { ATTACHMENT_TYPE } from "./constants";

const getLatestMediaByType = (mediaList = [], type) => {
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