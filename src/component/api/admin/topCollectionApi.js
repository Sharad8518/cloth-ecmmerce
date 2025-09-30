import axios from "../axios";


export const addOrUpdateTopCollection = async (collectionData) => {
  try {
    const formData = new FormData();
    formData.append("title", collectionData.title);
    formData.append("description", collectionData.description);
    formData.append("image",collectionData.imageFile);

    // Add products (array of IDs)
    if (Array.isArray(collectionData.products)) {
      collectionData.products.forEach((p) => formData.append("product", p));
    }


    const res = await axios.post(`/admin/topCollection`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add Luxeobel");
  }
};




export const getAllTopCollection = async () => {
  try {
    const response = await axios.get("/admin/topCollection",{
        headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching Luxe items:", err);
    throw err;
  }
};

// Get single Luxe item by ID
export const getTopCollectionById = async (id) => {
  try {
    const response = await axios.get(`/admin/topCollection/${id}`,{
       headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching Luxe item ${id}:`, err);
    throw err;
  }
};

// Update Luxe item by ID
export const updateTopCollectionItem = async (id, data) => {
  try {
    const response = await axios.put(`/admin/topCollection/${id}`, data,{
       headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(`Error updating Luxe item ${id}:`, err);
    throw err;
  }
};

// Delete Luxe item by ID
export const deleteTopCollectionItem = async (id) => {
  try {
    const response = await axios.delete(`/admin/topCollection/${id}`,{
          headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`Error deleting Luxe item ${id}:`, err);
    throw err;
  }
};

// Add or remove products from Luxe
export const updateTopCollectionsProducts = async (id, { addProducts = [], removeProducts = [] }) => {
  try {
    const response = await axios.put(`/admin/topCollection/${id}/products`, { addProducts, removeProducts });
    return response.data;
  } catch (err) {
    console.error(`Error updating products for Luxe item ${id}:`, err);
    throw err;
  }
};