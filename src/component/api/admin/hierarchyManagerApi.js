import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* ===================== HEADERS ===================== */

/* Get All Headers */
export const getHeaders = async () => {
  const response = await axios.get("/admin/headers");
  return response.data;
};


export const getHeadersAllowCategory = async () => {
  const response = await axios.get("/admin/headers/category");
  return response.data;
};

/* Get Single Header */
export const getHeader = async (id) => {
  const response = await axios.get(`/admin/headers/${id}`);
  return response.data;
};

/* Add Header */
export const createHeader = async (data) => {
  const formData = new FormData();

  // Append text fields
  if (data.title) formData.append("title", data.title);
  if (data.slug) formData.append("slug", data.slug);
  if (data.status) formData.append("status", data.status);
  if (data.showNavbar) formData.append("showNavbar", data.showNavbar);
  if (data.addCategory) formData.append("addCategory", data.addCategory);



  const response = await axios.post("/admin/headers", formData);
  return response.data;
};

/* Update Header */
export const updateHeader = async (id, data) => {
  try {
    const response = await axios.put(`/admin/headers/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update header:", error);
    throw error;
  }
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
/* Create Category */
export const createCategory = async (data) => {
  const formData = new FormData();

  // Text fields
  if (data.header) formData.append("header", data.header);
  if (data.name) formData.append("name", data.name);
  if (data.slug) formData.append("slug", data.slug);
  
  // ✅ Upload image if provided
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await axios.post("/admin/categorys", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/* Update Category */
export const updateCategory = async (id, data) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.slug) formData.append("slug", data.slug);
  
  // ✅ Replace with new image
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  // ✅ Remove image explicitly
  if (data.removeImage) {
    formData.append("removeImage", "true");
  }

  const response = await axios.put(`/admin/categorys/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  const response = await axios.post("/admin/collections", data,{
      headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/* Update Collection */
export const updateCollection = async (id, data) => {
  const response = await axios.put(`/admin/collections/${id}`, data,{
      headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/* Delete Collection */
export const deleteCollection = async (id) => {
  const response = await axios.delete(`/admin/collections/${id}`);
  return response.data;
};
