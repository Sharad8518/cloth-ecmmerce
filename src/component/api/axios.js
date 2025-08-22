import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:4000/api", // your backend URL
  baseURL:"https://houseofziba-nodejs.onrender.com/api", // your backend URL
});

// Automatically attach token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hfz-a_tkn_238x"); // or "a_tkn_238x" if you use that key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
