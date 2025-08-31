import axios from "../axios";

export const getAllUser = async ({ page = 1, limit = 10 }) => {
  try {
    const res = await axios.get("/admin/users", {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      // optional: handle token expiry
      throw new Error("Unauthorized. Please log in again.");
    }
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};