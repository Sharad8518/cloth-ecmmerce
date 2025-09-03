
import axios from "axios";

export const getAllUser = async ({
  page = 1,
  limit = 10,
  startDate,
  endDate,
  state,
  hasPurchased,
  lastLogin,
  // search, // optional (for name/email/phone search)
}) => {
  try {
    const res = await axios.get("/admin/users", {
      params: {
        page,
        limit,
        startDate,
        endDate,
        state,
        hasPurchased,
        lastLogin,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};
