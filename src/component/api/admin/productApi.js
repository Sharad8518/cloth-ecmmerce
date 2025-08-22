import axios from "../axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


/* ---------------- Add Product ---------------- */
export const addProduct = async (productData) => {
  const formData = new FormData();

  // Append media files separately (use the actual File object)
  if (productData.media && productData.media.length > 0) {
    productData.media.forEach((m) => {
      formData.append("images", m.file); // ✅ use the File object, not the preview object
    });
  }

  // Append the rest of the productData
  Object.keys(productData).forEach((key) => {
    if (key !== "media") {
      const value = productData[key];
      if (value && typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
  });

  const response = await axios.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


/* ---------------- Get All Products ---------------- */
export const getProducts = async (queryParams = {}) => {
  const response = await axios.get("/admin/products", { params: queryParams });
  return response.data;
};

/* ---------------- Get Single Product ---------------- */
export const getProductById = async (productId) => {
  const response = await axios.get(`/admin/products/${productId}`);
  return response.data;
};

/* ---------------- Update Product ---------------- */
export const updateProduct = async (productId, updateData) => {
  const response = await axios.put(`/admin/products/${productId}`, updateData);
  return response.data;
};

/* ---------------- Delete Product ---------------- */
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`/admin/products/${productId}`);
  return response.data;
};
