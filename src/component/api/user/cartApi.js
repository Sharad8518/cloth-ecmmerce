import axios from "../axios"; // your axios instance

// Attach token automatically
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ✅ Get all cart items
export const getCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("/user/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { cart: [...] }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error fetching cart");
  }
};

// ✅ Add product to cart
export const addToCart = async ({ productId, sku, color, size, quantity = 1,paddingDetails  }) => {
  try {
    const token = localStorage.getItem("token");

    const attributes = [];
    if (color) attributes.push({ name: "Color", value: color });
    if (size) attributes.push({ name: "Size", value: size });

    const res = await axios.post(
      "/user/cart/add",
      { productId, sku, attributes, quantity,paddingDetails  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // { success: true, cart }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error adding to cart");
  }
};

// ✅ Increase quantity
export const increaseQty = async ({ productId, sku, attributes = [] }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/user/cart/increase",
      { productId, sku, attributes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error increasing quantity");
  }
};

// ✅ Decrease quantity
export const decreaseQty = async ({ productId, sku, attributes = [] }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/user/cart/decrease",
      { productId, sku, attributes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error decreasing quantity");
  }
};

// ✅ Remove item
export const removeFromCart = async ({ productId, sku }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/user/cart/remove",
      { productId, sku }, // only send productId and sku
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error removing from cart");
  }
};

// ✅ Clear cart
export const clearCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/user/cart/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error clearing cart");
  }
};
