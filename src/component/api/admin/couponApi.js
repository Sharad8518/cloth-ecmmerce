import axios from "../axios";

export const addCoupon = async (formData) => {
  try {
    const res = await axios.post("/admin/coupon", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};


export const getCoupon = async () => {
  try {
    const res = await axios.get("/admin/coupon", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner order");
  }
};