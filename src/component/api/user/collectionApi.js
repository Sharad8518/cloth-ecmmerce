
import axios from "../axios";
export const getCollection = async () => {
      const token = localStorage.getItem("token");
  const response = await axios.get(`/user/collections`,{
     headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};