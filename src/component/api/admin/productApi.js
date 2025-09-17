import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* ---------------- Add Product ---------------- */
export const addProduct = async (productData) => {
  const formData = new FormData();

  // --- Simple fields ---
  formData.append("header", productData.header || "");
  formData.append("itemNumber", productData.itemNumber || "");
  formData.append("title", productData.title || "");
  formData.append("description", productData.description || "");
  formData.append("mrp", productData.mrp || "");
  formData.append("costPrice", productData.costPrice || "");
  formData.append("marginPercent", productData.marginPercent || "");
  formData.append("quantity", productData.quantity || "");
  formData.append("salePrice", productData.salePrice || "");
  formData.append("colour", productData.colour || "");
  formData.append("fulfillmentType", productData.fulfillmentType || "");
  formData.append("productType", productData.productType || "");
  formData.append("occasion", productData.occasion || "");
  formData.append("estimatedShippingDays",productData.estimatedShippingDays || "");
  formData.append("productSpeciality", productData.productSpeciality || "");
  formData.append("styleNo", productData.styleNo || "");
  formData.append("fabric", productData.fabric || "");
  formData.append("work", productData.work || "");
  formData.append("packContains", productData.packContains || "");
  formData.append("care", productData.care || "");
  formData.append("note", productData.note || "");
  formData.append("plating", productData.plating || "");
  formData.append("status", productData.status || "");
  formData.append("shortDescription", productData.shortDescription || "");
  formData.append("dupatta", JSON.stringify(productData.dupatta || {}));
  formData.append(
    "productionDetail",
    JSON.stringify(productData.productionDetail || {})
  );
  formData.append("styleAndFit", productData.styleAndFit || "");

  // --- Arrays (convert to JSON) ---
  if (productData.keywords?.length) {
    formData.append("keywords", JSON.stringify(productData.keywords));
  }

  if (productData.variants?.length) {
    formData.append("variants", JSON.stringify(productData.variants));
  }

  if (productData.categories?.length) {
    productData.categories.forEach((cat) => {
      formData.append("categories[]", cat);
    });
  }

  // --- SubCategories ---
  if (productData.subCategories?.length) {
    productData.subCategories.forEach((sub) => {
      formData.append("subCategories[]", sub);
    });
  }

  // --- Collections ---
  if (productData.collections?.length) {
    productData.collections.forEach((col) => {
      formData.append("collections[]", col);
    });
  }
  if (productData.faq?.length) {
    formData.append("faq", JSON.stringify(productData.faq));
  }

  // --- Objects ---
  if (productData.shippingAndReturns) {
    formData.append(
      "shippingAndReturns",
      JSON.stringify(productData.shippingAndReturns)
    );
  }

  if (productData.seo) {
    formData.append("seo", JSON.stringify(productData.seo));
  }

  // --- Media (actual files) ---
  if (productData.media && productData.media.length > 0) {
    productData.media.forEach((m) => {
      if (m.file) {
        formData.append("images", m.file); // file upload
      }
    });
  }

  // --- API Call ---
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

export const onSaleProduct = async (productId, form) => {
  const response = await axios.put(`/admin/product/${productId}/sale`, form);
  return response.data;
};

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

export const addOrUpdateReview = async (productId, review) => {
  try {
    const formData = new FormData();
    formData.append("rating", review.rating);
    formData.append("comment", review.comment);
    formData.append("userName", review.userName);
    if (review.file instanceof File) formData.append("image", review.file);

    const res = await axios.post(
      `/admin/products/${productId}/review`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to submit review");
  }
};

export const verifyReview = async (productId, reviewId) => {
  try {
    const res = await axios.put(
      `/admin/products/${productId}/reviews/${reviewId}/verify`,
      {}, // no body needed, or you can send optional data
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to verify review");
  }
};
