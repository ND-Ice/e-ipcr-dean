import client from "./client";

const login = (user) => client.post("/auth/dean", user);

const getCurrentUser = (id) => client.get(`/deans/${id}`);

const activateuserAccount = (email) =>
  client.get(`/deans/activate-account/${email}`);

const changePassword = (id, password) =>
  client.patch(`/deans/change-password/${id}`, { password });

const forgotPassword = (email) => client.get(`/deans/forgot-password/${email}`);

const authApi = {
  login,
  getCurrentUser,
  activateuserAccount,
  changePassword,
  forgotPassword,
};

export default authApi;
