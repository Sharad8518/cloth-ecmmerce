import axios from "../axios";

export const addPolicy = async (formData) => {
  try {
    const res = await axios.post("/admin/policy", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to Policy");
  }
};

export const editPolicy = async (id, formData) => {
  try {
    const res = await axios.put(`/admin/policy/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to Policy");
  }
};

export const getPolicies = async () => {
  try {
    const res = await axios.get("/admin/policy", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to Policy");
  }
};




export const deletePolicy = async (id) => {
  try {
    const res = await axios.delete(`/admin/policy/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to policy");
  }
};
