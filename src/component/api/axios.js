import axios from "axios";

const instance = axios.create({
  //  baseURL: "http://localhost:4000/api",
  baseURL:"https://houseofziba-nodejs.onrender.com/api", 
});

// No token interceptor
// instance.interceptors.request.use(...) removed

export default instance;