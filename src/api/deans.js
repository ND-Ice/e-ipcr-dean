import client from "./client";

const registerDean = (dean) => client.post("/deans", dean);
const updateDeanInfo = (id, info) => client.patch(`/deans/${id}`, info);
const updateDeanBasicInfo = (id, info) => client.put(`/deans/${id}`, info);
const udpateProfilePicture = (id, info) => {
  const formData = new FormData();
  formData.append("image", info);

  return client.patch(`/deans/upload-profile/${id}`, formData);
};

const getCurrentDean = (id) => client.get(`/deans/${id}`);

const deansApi = {
  registerDean,
  updateDeanInfo,
  updateDeanBasicInfo,
  udpateProfilePicture,
  getCurrentDean,
};
export default deansApi;
