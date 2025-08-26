import axios from "../axios";

export const addBanner = async (formData) => {
  try {
    const res = await axios.post("/admin/banner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};

export const editBanner = async (id, formData) => {
  try {
    const res = await axios.put(`/admin/banner/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};

export const getBanner = async () => {
  try {
    const res = await axios.get("/admin/banner", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};

export const getActiveBanner = async () => {
  try {
    const res = await axios.get("/admin/banner/active", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};



export const deleteBanner = async (id) => {
  try {
    const res = await axios.delete(`/admin/banner/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};
