"use client";
import { post, get } from "../utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";

const CartContext = createContext();

export function CartProvider({ children }) {
  const  { user } = useContext(AuthContext); 
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when updated
  useEffect(() => {
    if(!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  // FETCH CART FROM BACKEND WHEN USER LOGS IN
  useEffect(() => {
    if (user) fetchUserCart();
  }, [user]);

  async function fetchUserCart() {
    const res = await get("/cart");
    if (res.success) setCart(res.cart || []);
  }

  // MERGE LOCAL CART → SERVER CART AFTER LOGIN
  async function mergeCartOnLogin(localCart) {
    if (localCart.length > 0) {
      await post("/cart/merge", { items: localCart });
      localStorage.removeItem("cart");
    }
    await fetchUserCart();
  }

  // Call this when user logs in
  const loginUser = async (userData) => {
    setUser(userData);

    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    await mergeCartOnLogin(localCart);
  };

  // ADD TO CART
  const addToCart = async (product) => {
    // Logged-in user → send to backend
// console.log("Sending to backend:", {
//   productId: product._id, quantity: 1, user
// });
    if (!user) {
  console.log("Guest user, storing cart locally");

  setCart((prev) => {
    const exists = prev.find((item) => item._id === product._id);

    if (exists) {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });

  return;  // Do NOT close function with an extra };
}


  // Logged-in user → send to backend
    const res = await post("/cart/add", {
      userId: user._id,        // required by your backend
      product: {               // backend expects entire product object
        _id: product._id,
        name: product.name,
        price: product.price,
        mainImage: product.mainImage
      },
      quantity: 1
    });

    if (res.success) setCart(res.cart);
  };

  // REMOVE FROM CART
  const removeFromCart = async (id) => {
    if (!user) {
      setCart((prev) => prev.filter((item) => item._id !== id));
      return;
    }
    const res = await post("/cart/remove", { productId: id });
    if (res.success) setCart(res.cart);
  };

  // UPDATE QUANTITY
  const updateQuantity = async (id, qty) => {
    if (!user) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: qty } : item
        )
      );
      return;
    }
    const res = await post("/cart/update", {
      productId: id,
      quantity: qty,
    });

    if (res.success) setCart(res.cart);
  };

  const clearCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const res = await post("/cart/clear");
    if (res.success) setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loginUser,
        user,
        cartCount: Array.isArray(cart)
  ? cart.reduce((total, item) => total + item.quantity, 0)
  : 0,

      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
