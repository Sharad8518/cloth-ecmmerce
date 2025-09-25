import axios from "../axios";

export const getAllTopCollection = async () => {
  try {
    const response = await axios.get("/user/topCollection");
    return response.data;
  } catch (err) {
    console.error("Error fetching Luxe items:", err);
    throw err;
  }
};