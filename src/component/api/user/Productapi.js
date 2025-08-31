import axios from "../axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getProducts = async (queryParams = {}) => {
  const response = await axios.get("/user/products", { params: queryParams });
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await axios.get(`/user/products/${productId}`);
  return response.data;
};


export const filterProduct = async (params = {}) => {
  console.log('params',params)
  const response = await axios.get(`/user/productsfilter`,{ params });
  return response.data;
};
