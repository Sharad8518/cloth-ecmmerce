// favoriteApi.js
import axios from "../axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const addFavorite = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "/user/favorites",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeFavorite = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`/user/favorites/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFavorites = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/user/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};