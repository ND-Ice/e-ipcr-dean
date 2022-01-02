import client from "./client";

const login = (user) => client.post("/auth/dean", user);

const getCurrentUser = (id) => client.get(`/deans/${id}`);

const changePassword = (id, password) =>
  client.patch(`/deans/change-password/${id}`, { password });

const forgotPassword = (email) => client.get(`/deans/forgot-password/${email}`);

const authApi = {
  login,
  getCurrentUser,
  changePassword,
  forgotPassword,
};

export default authApi;
