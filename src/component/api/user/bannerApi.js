
import axios from "../axios";



export const getBanner = async () => {
    const token = localStorage.getItem("token");
  const response = await axios.get(`/user/banner`,{
     headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
