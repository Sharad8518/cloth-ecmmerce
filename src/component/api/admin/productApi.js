import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* ---------------- Add Product ---------------- */
export const addProduct = async (productData) => {
  const formData = new FormData();

  // Append media files separately (use the actual File object)
  if (productData.media && productData.media.length > 0) {
    productData.media.forEach((m) => {
      formData.append("images", m.file); // ✅ actual File
    });
  }

  // Normalize array fields before appending
  const arrayFields = ["categories", "subCategories", "collections"];

  Object.keys(productData).forEach((key) => {
    if (key !== "media") {
      let value = productData[key];

      // ✅ Ensure array fields are properly stringified
      if (arrayFields.includes(key)) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "string") {
          // if coming as single string like "Kurta"
          formData.append(key, JSON.stringify([value]));
        }
      } else if (value && typeof value === "object") {
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

export const editProduct = async (productId, productData) => {
  const response = await axios.put(
    `/admin/products/${productId}`,
    productData, // send JSON
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};



/**
 * Edit product media
 * @param {string} productId - ID of the product
 * @param {File[]} newFiles - Array of new files to upload
 * @param {string[]} deleteUrls - Array of media URLs to delete
 * @returns {Promise<Object>} - Updated media array
 */
export const editProductMedia = async ({
  productId,
  newFiles = [],
  deleteUrls = [],
}) => {
  try {
    const formData = new FormData();

    // Append new files
    newFiles.forEach((file) => {
      formData.append("file", file);
    });

    // Append delete URLs as JSON string
    formData.append("deleteUrls", JSON.stringify(deleteUrls));

    const response = await axios.put(
      `/admin/products/${productId}/media`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.media; // return updated media
  } catch (error) {
    console.error("Error updating product media:", error);
    throw error;
  }
};

/* ---------------- Get All Products ---------------- */
export const getProducts = async (queryParams = {}) => {
  try {
    // Only send defined query params
    const params = {};
    if (queryParams.search) params.search = queryParams.search;
    if (queryParams.title) params.title = queryParams.title;
    if (queryParams.header) params.header = queryParams.header;
    if (queryParams.collections) params.collections = queryParams.collections; // comma-separated
    if (queryParams.itemNumber) params.itemNumber = queryParams.itemNumber;
    if (queryParams.status) params.status = queryParams.status;
    if (queryParams.page) params.page = queryParams.page;
    if (queryParams.limit) params.limit = queryParams.limit;

    const response = await axios.get("/admin/products", { params });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch products");
  }
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

/* ---------------- Add Similar Product ---------------- */
export const addSimilarToProduct = async (productId, similarProductIds) => {
  const response = await axios.post("/admin/add-similar", {
    productId,
    similarProductIds,
  });
  return response.data;
};

export const addFBTToProduct = async (productId, fbtIds) => {
  const response = await axios.post("/admin/add-fbt", {
    productId,
    fbtIds,
  });
  return response.data;
};

export const onSaleProduct = async(productId,form)=>{
  const response = await axios.put(`/admin/product/${productId}/sale`,form)
  return response.data
}

// ✅ Add a collection to multiple products
export const addCollectionToProducts = async (collection, productIds) => {
  const response = await axios.put(`/admin/products/collections/add`, {
    collection,
    productIds,
  });
  return response.data;
};

// ✅ Remove a collection from multiple products
export const removeCollectionFromProducts = async (collection, productIds) => {
  const response = await axios.put(`/admin/products/collections/remove`, {
    collection,
    productIds,
  });
  return response.data;
};