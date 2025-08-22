import axios from "../axios";

// Add a new admin
export const addAdmin = async (adminData) => {
  const response = await axios.post("/admin/add", adminData);
  return response.data;
};

// Admin login
export const loginAdmin = async (credentials) => {
  const response = await axios.post("/admin/login", credentials);
  return response.data;
};

// Admin logout (current device)
export const logoutAdmin = async () => {
  const response = await axios.post("/admin/logout");
  return response.data;
};

// Admin logout from all devices
export const logoutAllDevices = async () => {
  const response = await axios.post("/admin/logoutAll");
  return response.data;
};
