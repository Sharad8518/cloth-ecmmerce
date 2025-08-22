import axios from "../axios";

/* ===================== HEADERS ===================== */

/* Get All Headers */
export const getHeaders = async () => {
  const response = await axios.get("/admin/headers");
  return response.data;
};

/* Get Single Header */
export const getHeader = async (id) => {
  const response = await axios.get(`/admin/headers/${id}`);
  return response.data;
};

/* Add Header */
export const createHeader = async (data) => {
  const response = await axios.post("/admin/headers", data);
  return response.data;
};

/* Update Header */
export const updateHeader = async (id, data) => {
  const response = await axios.put(`/admin/headers/${id}`, data);
  return response.data;
};

/* Delete Header */
export const deleteHeader = async (id) => {
  const response = await axios.delete(`/admin/headers/${id}`);
  return response.data;
};


/* ===================== CATEGORIES ===================== */

/* Get All Categories */
export const getCategories = async () => {
  const response = await axios.get('/admin/categorys');
  return response.data;
};

/* Get Single Category */
export const getCategory = async (id) => {
  const response = await axios.get(`/admin/categorys/${id}`);
  return response.data;
};

/* Add Category */
export const createCategory = async (data) => {
  const response = await axios.post("/admin/categorys", data);
  return response.data;
};

/* Update Category */
export const updateCategory = async (id, data) => {
  const response = await axios.put(`/admin/categorys/${id}`, data);
  return response.data;
};

/* Delete Category */
export const deleteCategory = async (id) => {
  const response = await axios.delete(`/admin/categorys/${id}`);
  return response.data;
};


/* ===================== SUBCATEGORIES ===================== */

/* Get All SubCategories */
export const getSubCategories = async () => {
  const response = await axios.get("/admin/subcategorys");
  return response.data;
};

/* Get Single SubCategory */
export const getSubCategory = async (id) => {
  const response = await axios.get(`/admin/subcategorys/${id}`);
  return response.data;
};

/* Add SubCategory */
export const createSubCategory = async (data) => {
  const response = await axios.post("/admin/subcategorys", data);
  return response.data;
};

/* Update SubCategory */
export const updateSubCategory = async (id, data) => {
  const response = await axios.put(`/admin/subcategorys/${id}`, data);
  return response.data;
};

/* Delete SubCategory */
export const deleteSubCategory = async (id) => {
  const response = await axios.delete(`/admin/subcategorys/${id}`);
  return response.data;
};


/* ===================== COLLECTIONS ===================== */

/* Get All Collections */
export const getCollections = async () => {
  const response = await axios.get("/admin/collections");
  return response.data;
};

/* Get Single Collection */
export const getCollection = async (id) => {
  const response = await axios.get(`/admin/collections/${id}`);
  return response.data;
};

/* Add Collection */
export const createCollection = async (data) => {
  const response = await axios.post("/admin/collections", data);
  return response.data;
};

/* Update Collection */
export const updateCollection = async (id, data) => {
  const response = await axios.put(`/admin/collections/${id}`, data);
  return response.data;
};

/* Delete Collection */
export const deleteCollection = async (id) => {
  const response = await axios.delete(`/admin/collections/${id}`);
  return response.data;
};
