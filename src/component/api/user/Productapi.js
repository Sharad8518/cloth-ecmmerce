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

export const productNewIn = async (params = {}) => {
  console.log('params',params)
  const response = await axios.get(`/user/newIn`,{ params });
  return response.data;
};



// export const getProductsNewIn = async (queryParams = {}) => {
//   const response = await axios.get("/user//products/current-month", { params: queryParams });
//   return response.data;
// };

export const addOrUpdateReview = async (productId, { rating, title, comment, userName,file }) => {
  try {
    const formData = new FormData();
    formData.append("rating", rating);
    if (title) formData.append("title", title);
    if (comment) formData.append("comment", comment);
    if (userName) formData.append("userName", userName);
    if (file) formData.append("file", file); // only if user uploads a file

    const res = await axios.post(`/user/products/${productId}/review`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to submit review");
  }
};

export const getAllLuxe = async () => {
  try {
    const response = await axios.get("/user/luxeObel");
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to  Luxe items");;
  }
};