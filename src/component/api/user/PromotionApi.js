import axios from "../axios";

export const getPromotion= async () => {
  try {
    const res = await axios.get("/user/promotional");
    return res;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to banner");
  }
};
