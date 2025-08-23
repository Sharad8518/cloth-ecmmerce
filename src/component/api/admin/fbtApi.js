import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* ---------------- Add FBT Item ---------------- */
export const addFBTItem = async (itemData) => {
  const formData = new FormData();

  // Handle image uploads
  if (itemData.images && itemData.images.length > 0) {
    itemData.images.forEach((img) => {
      if (img instanceof File || img.file) {
        formData.append("images", img.file || img);
      } else if (img.url) {
        formData.append("existingImages[]", img.url);
      }
    });
  }

  // Append the rest of the fields
  Object.keys(itemData).forEach((key) => {
    if (key !== "images") {
      const value = itemData[key];

      if (value && typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        if (key === "price") {
          formData.append(key, Number(value));
        } else {
          formData.append(key, value);
        }
      }
    }
  });

  // Default status
  if (!itemData.status) {
    formData.append("status", "ACTIVE");
  }

  const response = await axios.post("/admin/FBTItem", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ---------------- Get All FBT Items ---------------- */
export const getFBTItems = async (queryParams = {}) => {
  const response = await axios.get("/admin/FBTItem", { params: queryParams });
  return response.data;
};

/* ---------------- Get Single FBT Item ---------------- */
export const getFBTItemById = async (itemId) => {
  const response = await axios.get(`/admin/FBTItem/${itemId}`);
  return response.data;
};

/* ---------------- Update FBT Item ---------------- */
export const updateFBTItem = async (itemId, updateData) => {
  const formData = new FormData();

  if (updateData.images && updateData.images.length > 0) {
    updateData.images.forEach((img) => {
      formData.append("images", img.file ? img.file : img);
    });
  }

  Object.keys(updateData).forEach((key) => {
    if (key !== "images") {
      const value = updateData[key];
      if (value && typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
  });

  const response = await axios.put(`/admin/FBTItem/${itemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ---------------- Delete FBT Item ---------------- */
export const deleteFBTItem = async (itemId) => {
  const response = await axios.delete(`/admin/FBTItem/${itemId}`);
  return response.data;
};


export const addFBTToProduct = async (productId, fbtIds) => {
  const response = await axios.post("/admin/add-fbt", {
    productId,
    fbtIds,
  });
  return response.data;
};

export const removeFBTFromProduct = async (productId, fbtId) => {
  const response = await axios.delete("/admin/remove-fbt", {
    data: { productId, fbtId },
  });
  return response.data;
};