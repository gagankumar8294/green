"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { get, post } from "../utils/api";
import { AuthContext } from "./AuthContex";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
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

    
  // 🔹 Fetch cart after login
  // useEffect(() => {
  //   if (!user) {
  //     setCart([]);
  //     return;
  //   }

  //   async function fetchCart() {
  //     try {
  //       const data = await get("/cart");
  //       if (data.success) {
  //         setCart(data.cart.items || []);
  //       }
  //     } catch (err) {
  //       console.error("Fetch cart error", err);
  //     }
  //   }
  //   fetchCart();
  // }, [user]);

  
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

  // 🔹 Update quantity
const updateQuantity = async (productId, newQuantity) => {

  // ❗ HARD GUARD
  if (newQuantity < 1) return;

  if (syncing) return;
  setSyncing(true);

  // Optimistic update
  setCart(prev =>
    prev.map(i =>
      i.productId.toString() === productId
        ? { ...i, quantity: newQuantity }
        : i
    )
  );

  try {
    const data = await post("/cart/update", {
      productId,
      quantity: newQuantity,
    });

    if (data.success) {
      setCart(data.cart.items);
    }
  } catch (err) {
    console.error("Failed to update quantity", err);
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

// import { createContext, useContext, useEffect, useState } from "react";
// import { post, get } from "../utils/api";
// import { AuthContext } from "./AuthContex";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const { user } = useContext(AuthContext);
//   const [cart, setCart] = useState([]);

//   /* ======================================================
//      GUEST CART → LOAD FROM LOCALSTORAGE (ON FIRST LOAD)
//   ====================================================== */
//   useEffect(() => {
//     if (!user) {
//       const savedCart = localStorage.getItem("cart");
//       if (savedCart) {
//         setCart(JSON.parse(savedCart));
//       }
//     }
//   }, [user]);

//   /* ======================================================
//      SAVE GUEST CART TO LOCALSTORAGE
//   ====================================================== */
//   useEffect(() => {
//     if (!user) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, user]);

//   /* ======================================================
//      FETCH CART FROM DB WHEN USER LOGS IN
//   ====================================================== */
//   useEffect(() => {
//     if (user) {
//       fetchUserCart();
//     }
//   }, [user]);

//   async function fetchUserCart() {
//     try {
//       const res = await get(`/cart?userId=${user._id}`);
//       if (res.success) {
//         setCart(res.cart || []);
//       }
//     } catch (err) {
//       console.error("Fetch cart error:", err);
//     }
//   }

//   /* ======================================================
//      MERGE LOCAL CART → DB AFTER LOGIN
//   ====================================================== */
//   async function mergeCartOnLogin() {
//     const localCart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (localCart.length > 0) {
//       await post("/cart/merge", {
//         userId: user._id,
//         localCart,
//       });
//       localStorage.removeItem("cart");
//     }

//     await fetchUserCart();
//   }

//   /* ======================================================
//      ADD TO CART
//   ====================================================== */
//   const addToCart = async (product) => {
//     // ✅ Guest user
//     if (!user) {
//       setCart((prev) => {
//         const exists = prev.find((i) => i._id === product._id);
//         if (exists) {
//           return prev.map((i) =>
//             i._id === product._id
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//           );
//         }
//         return [...prev, { ...product, quantity: 1 }];
//       });
//       return;
//     }

//     // ✅ Logged-in user
//     const res = await post("/cart/add", {
//       userId: user._id,
//       product: {
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         mainImage: product.mainImage,
//       },
//       quantity: 1,
//     });

//     if (res.success) {
//       setCart(res.cart);
//     }
//   };

//   /* ======================================================
//      REMOVE FROM CART
//   ====================================================== */
//   const removeFromCart = async (productId) => {
//     if (!user) {
//       setCart((prev) => prev.filter((i) => i._id !== productId));
//       return;
//     }

//     const res = await post("/cart/remove", {
//       userId: user._id,
//       productId,
//     });

//     if (res.success) {
//       setCart(res.cart);
//     }
//   };

//   /* ======================================================
//      UPDATE QUANTITY
//   ====================================================== */
//   const updateQuantity = async (productId, qty) => {
//     if (!user) {
//       setCart((prev) =>
//         prev.map((i) =>
//           i._id === productId ? { ...i, quantity: qty } : i
//         )
//       );
//       return;
//     }

//     const res = await post("/cart/update", {
//       userId: user._id,
//       productId,
//       qty,
//     });

//     if (res.success) {
//       setCart(res.cart.items || res.cart);
//     }
//   };

//   /* ======================================================
//      CLEAR CART
//   ====================================================== */
//   const clearCart = async () => {
//     if (!user) {
//       setCart([]);
//       localStorage.removeItem("cart");
//       return;
//     }

//     await post("/cart/clear", { userId: user._id });
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         mergeCartOnLogin,
//         cartCount: cart.reduce(
//           (total, item) => total + item.quantity,
//           0
//         ),
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);
