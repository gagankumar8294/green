"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../utils/api";
import { AuthContext } from "./AuthContex";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
  if (!user) {
    setCart([]);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const data = await get("/cart");
      if (data.success) {
        setCart(data.cart.items || []);
      }
    } catch (err) {
      console.error("Fetch cart error", err);
    }
  }, 300); // ⬅️ VERY IMPORTANT

  return () => clearTimeout(timer);
}, [user]);
  
  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const data = await post("/cart/add", {
        productId: product._id,
      });

      if (data.success) {
        setCart(data.cart.items);
      }
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

const updateQuantity = async (productId, newQuantity) => {

  if (newQuantity < 1 || syncing) return;

  setSyncing(true);

  try {
    const data = await post("/cart/update", {
      productId,
      quantity: newQuantity,
    });

    if (data.success && data.cart?.items) {
      setCart(data.cart.items);
      setTotal(data.cart.total); // ✅ backend total
    }
  } catch (err) {
    console.error(err);
  }

  setSyncing(false);
};





  // 🔹 Remove item
  const removeItem = async (productId) => {
    // optimistic remove
  setCart(prev =>
    prev.filter(item => item.productId.toString() !== productId)
  );

  try {
    const data = await post("/cart/remove", { productId });
    if (data.success) {
      setCart(data.cart.items);
    }
  } catch (err) {
    console.error("Remove failed", err);
  }
  
    // const data = await post("/cart/remove", { productId });
    // if (data.success) setCart(data.cart.items);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        setTotal,
        addToCart,
        updateQuantity,
        removeItem,
        setCart,
        syncing,
        cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);