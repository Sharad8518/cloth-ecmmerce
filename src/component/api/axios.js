import axios from "axios";

const instance = axios.create({
  //  baseURL: "http://localhost:4000/api", // your backend URL
  baseURL:"https://houseofziba-nodejs.onrender.com/api", // your backend URL
});

// No token interceptor
// instance.interceptors.request.use(...) removed

export default instance;