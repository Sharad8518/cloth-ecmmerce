import axios from "../axios";

export const addPromotion = async (formData) => {
  try {
    const res = await axios.post("/admin/promotional", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};

export const editPromotion = async (id, formData) => {
  try {
    const res = await axios.put(`/admin/promotional/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};

export const getPromotion= async () => {
  try {
    const res = await axios.get("/admin/promotional", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};




export const deletePromotion = async (id) => {
  try {
    const res = await axios.delete(`/admin/promotional/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};
