import { useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api/user/favoriteApi";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchFavorites = async () => {
  try {
    setLoading(true);
    const data = await getFavorites();
    const favorites = data.favorites || [];

    // Extract only product IDs from populated favorites
    const productIds = favorites.map((item) => {
      if (item?.product?._id) return item.product._id;
      if (typeof item === "string") return item; // fallback if just ID
      return null;
    }).filter(Boolean); // remove nulls

    setFavorites(productIds); // favorites now contains only IDs
  } catch (err) {
    console.error("Failed to fetch favorites", err);
  } finally {
    setLoading(false);
  }
};

  const addToFavorites = async (productId) => {
    try {
      await addFavorite(productId);
      fetchFavorites(); // refresh list
    } catch (err) {
      console.error("Failed to add favorite", err);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await removeFavorite(productId);
      fetchFavorites(); // refresh list
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

    const toggleFavorite = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        await removeFavorite(productId);
        setFavorites(favorites.filter(id => id !== productId));
      } else {
        await addFavorite(productId);
        setFavorites([...favorites, productId]);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, loading, addToFavorites, removeFromFavorites,toggleFavorite };
};
