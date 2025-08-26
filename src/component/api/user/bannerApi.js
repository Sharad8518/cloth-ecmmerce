
import axios from "../axios";
export const getBanner = async () => {
  const response = await axios.get(`/user/banner`);
  return response.data;
};
