import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } from "../api/user/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 })

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart|| []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddToCart = async (payload) => {
    const data = await addToCart(payload);
    fetchCart(); // Refresh cart after adding item
    // setCart(data.cart.items);
  };

  const handleIncrease = async (payload) => {
    const data = await increaseQty(payload);
    fetchCart(); // Refresh cart after increasing quantity
    // setCart(data.cart.items);
  };

  const handleDecrease = async (payload) => {
    const data = await decreaseQty(payload);
    fetchCart(); // Refresh cart after decreasing quantity
    // setCart(data.cart.items);
  };

  const handleRemove = async (payload) => {
    const data = await removeFromCart(payload);
    fetchCart();
    // setCart(data.cart.items);
  };

  const handleClear = async () => {
    const data = await clearCart();
    setCart(data.cart.items);
  };

  const buyNow = async ({ productId, sku, size, color, quantity = 1 }) => {
  try {
    // 1️⃣ Add the product to the cart
    const data = await handleAddToCart({
      productId,
      sku,
      size,
      color,
      quantity,
    });
    // 2️⃣ Navigate to checkout (you already do this in the onClick)
    // navigate("/checkout"); // optional if you want to control it outside
  } catch (err) {
    console.error("Buy Now Error:", err.message);
    
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        handleAddToCart,
        handleIncrease,
        handleDecrease,
        handleRemove,
        handleClear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
