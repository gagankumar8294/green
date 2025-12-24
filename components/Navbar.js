"use client";
import { useMemo } from "react";
import React, { useState, useContext, useRef } from "react";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { get } from "../utils/api";
import AddressModal from "./AddressModal/AddressModal";
import PaymentResultModal from "./PaymentModal/PaymentResultModal";

export default function Navbar() {
  const [paymentModal, setPaymentModal] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const paymentCompletedRef = useRef(false);
  const cartSnapshotRef = useRef([]);

  const goToOrders = () => {
    setDropdownOpen(false);
    window.location.href = "/my-orders";
  };

  const { cart,total,setTotal, updateQuantity, removeItem, syncing, clearCart } = useCart();
  const [ addressModalOpen, setAddressModalOpen] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useContext(ThemeContext); // Get current theme
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [user, setUser] = useState(null);

  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

useEffect(() => {
  if (user?.address) {
    setAddress(user.address);
  }
}, [user]);

const saveAddress = async () => {
  // 🔒 Frontend validation
  if (!address.fullName || !address.phone || !address.pincode) {
    alert("Please fill required fields (Name, Phone, Pincode)");
    return;
  }

  try {
    const res = await fetch("https://green-world-backend-ydlf.onrender.com/api/user/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(address),
    });

    const data = await res.json();

    if (data.success) {
      setUser({ ...user, address: data.address });
      setAddressModalOpen(false);
    } else {
      alert(data.message || "Failed to save address");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};



const handleCheckout = async () => {
  const loaded = await loadRazorpay();
  cartSnapshotRef.current = cart;
  paymentCompletedRef.current = false;

  if (!loaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // 1️⃣ Create order (BACKEND TOTAL)
  const res = await fetch("https://green-world-backend-ydlf.onrender.com/api/payment/create-order", {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.message || "Unable to create order");
    return;
  }

  // 2️⃣ Open Razorpay
  const options = {
    key: data.key,
    amount: data.order.amount,
    currency: "INR",
    name: "Green Living",
    description: "Purchasing Plants",
    order_id: data.order.id,

    handler: async function (response) {
      // 3️⃣ Verify payment
      const verifyRes = await fetch(
        "https://green-world-backend-ydlf.onrender.com/api/payment/verify-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(response),
        }
      );

      const verifyData = await verifyRes.json();

      if (verifyData.success && verifyData.order) {
        paymentCompletedRef.current = true;    
        // ✅ SUCCESS MODAL (ORDER DATA)
        setPaymentModal({
          type: "success",
          items: verifyData.order.items,
          total: verifyData.order.totalAmount,
          duration: 10000,
        });
        // alert("Payment successful");
        clearCart();    // frontend cleanup
        setTotal(0);
        setCartOpen(false);

        setTimeout(() => {
          window.location.href = "/shop"
        }, 10000)

        return; // STOP HERE
      } else {
        // alert("Payment verification failed");
            // ❌ FAILED MODAL (CART DATA)
        setPaymentModal({
          type: "failed",
          items: cartSnapshotRef.current,
          total: Number(total) || 0,
          // total: verifyData,
          duration: 10000,
        });
      }
    },

    modal: {
    ondismiss: async function () {

      if(paymentCompletedRef.current) return;

      try {
        await fetch("https://green-world-backend-ydlf.onrender.com/api/payment/cancel", {
          method: "POST",
          credentials: "include",
        });
      } catch {}
      // alert("Payment cancelled");
          setPaymentModal({
            type: "failed",
            items: cartSnapshotRef.current,
            total,
            duration: 10000,
          });
          setCartOpen(true);
    },
  },

    theme: {
      color: "#000000",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};


  useEffect(() => {
  fetch("https://green-world-backend-ydlf.onrender.com/api/auth/me", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) setUser(data.user);
      
    });
}, []);

useEffect(() => {
  async function fetchTotal() {
    try {
      const data = await get("/cart/total");
      if (data.success) setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  }
  fetchTotal();
}, [cart]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
    <nav className={`${styles.navbar} ${theme === "dark" ? styles.dark : styles.light}`}>
      {/* ======= Left Section (Large Screen) ======= */}
      <div className={styles.leftSection}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.phoneIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011-.27 11.36 11.36 0 003.56.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.27 1z" />
        </svg>
        <span className={styles.callText}>Call us: +91 98442 99703</span>
      </div>

      {/* ======= Mobile Left Section ======= */}
      <div className={styles.mobileLeft}>
        <button onClick={toggleMenu} className={styles.menuButton}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <img src="/logo.webp" alt="Logo" className={styles.mobileLogo} />
      </div>

      {/* ======= Center Section (Logo) ======= */}
      <div className={styles.centerSection}>
        <img src="/logo.webp" alt="Logo" className={styles.logo} />
      </div>

      {/* ======= Right Section (Icons) ======= */}
      <div className={styles.rightSection}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

<div className={styles.rightSection}>
        
        {user ? (
          <div className={styles.userWrapper} ref={dropdownRef}>
            <div
              className={styles.userSection}
              onClick={() => setDropdownOpen((prev) => !(prev))}
            >
              <img
                src={user.image}
                alt="User"
                className={styles.userImage}
              />

              <div className={styles.userData}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            </div>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div className={`${styles.dropdown} ${theme}`}>
                
                    {/* 🧾 MY ORDERS */}
                <button
                  className={styles.dropdownBtn}
                  onClick={goToOrders}
                >
                  📦 My Orders
                </button>
                <button
                  className={styles.addressBtn}
                  onClick={() => setAddressModalOpen(true)}
                >
                  <span>{user.address ? "✏️" : "➕"}</span>
                  {user.address ? "Edit Address" : "Add Address"}
                </button>
{/* <button
                  className={styles.dropdownBtn}
                  onClick={() => setAddressModalOpen(true)}
                >
                  {user.address ? (
                    <>
                      ✏️ Edit Address
                    </>
                  ) : (
                    <>
                      ➕ Add Address
                    </>
                  )}
                </button> */}
                <button
                  className={styles.logoutBtn}
                  onClick={() =>
                    (window.location.href =
                      "https://green-world-backend-ydlf.onrender.com/api/auth/logout")
                  }
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="https://green-world-backend-ydlf.onrender.com/api/auth/google" className={styles.loginBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0113 0" />
            </svg>
          </a>
        )}
      </div>


        {/* CART ICON */}
<div className={styles.cartIconWrapper} onClick={() => setCartOpen(true)}>
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.7L23 6H6" />
  </svg>

  {/* CART COUNT */}
  {cart?.length > 0 && (
    <span className={styles.cartCount}>{cart.length}</span>
  )}
</div>

      </div>

      {/* ======= Mobile Menu ======= */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""} ${theme === "dark" ? styles.darkMenu : ""}`}>
        <button onClick={toggleMenu} className={styles.closeButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
          </svg>
        </button>
        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Wedding Favours</li>
          <li>Corporate Gifting</li>
        </ul>
      </div>
    </nav>
    {/* CART SIDEBAR */}
<div className={`${styles.cartSidebar} ${cartOpen ? styles.open : ""} ${theme === "dark" ? styles.dark : styles.light}`}>
  <button className={styles.closeCartBtn} onClick={() => setCartOpen(false)}>✕</button>

  <h3 className={styles.cartTitle}>Your Cart</h3>



{/* CART ITEMS */}
<div className={styles.cartItems}>
  {(!cart || cart.length === 0) ? (
    <p className={styles.emptyCart}>Your cart is empty</p>
  ) : (
    cart.map((item) => (
      <div 
        key={item.productId.toString()} 
        className={styles.cartItem}
      >
        <img
          src={item.image}
          className={styles.cartItemImage}
          alt={item.name}
        />

        <div className={styles.cartItemInfo}>
          <p className={styles.cartItemName}>{item.name}</p>
          <p className={styles.cartItemPrice}>
            {item.inStock ? `₹${item.price}` : `Out of Stock`}
          </p>

          {/* Quantity Controls */}
          <div className={styles.quantityControls}>
            <button
              disabled={syncing || !item.inStock || item.quantity <= 1} // disable if out of stock
              onClick={() => 
                updateQuantity(item.productId.toString(), item.quantity - 1)
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              disabled={syncing || !item.inStock} // disable if out of stock
              onClick={() => updateQuantity(item.productId.toString(), item.quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Remove Item */}
          <button
            className={styles.removeItemBtn}
            onClick={() => removeItem(item.productId.toString())}
          >
            Remove
          </button>
        </div>
      </div>
    ))
  )}
</div>

{/* Total Price */}
{/* <div className={styles.cartTotal}>
  <h4>
    Total: ₹{total}
  </h4>
  <button
    className={styles.checkoutBtn}
    disabled={cart.length === 0 || !user?.address}
    onClick={()=> {
      if(!user?.address) {
        setAddressModalOpen(true);
        return;
      }
      handleCheckout()
    }}
  >
    Checkout
  </button>
</div> */}
{/* Total Price */}
<div className={styles.cartTotal}>
  <h4>Total: ₹{total}</h4>

  {user?.address ? (
    /* ✅ USER HAS ADDRESS → SHOW CHECKOUT */
    <button
      className={styles.checkoutBtn}
      disabled={cart.length === 0}
      onClick={handleCheckout}
    >
      Checkout
    </button>
  ) : (
    /* ❌ NO ADDRESS → SHOW ADD ADDRESS CTA */
    <div className={styles.addressRequiredBox}>
      <p className={styles.addressText}>
        Please add your delivery address to continue
      </p>

      <button
        className={styles.addAddressBtn}
        onClick={() => setAddressModalOpen(true)}
      >
        ➕ Add Address
      </button>
    </div>
  )}
</div>



</div>
<AddressModal
  isOpen={addressModalOpen}
  onClose={() => setAddressModalOpen(false)}
  address={address}
  setAddress={setAddress}
  onSave={saveAddress}
  isEdit={!!user?.address}
/>
{paymentModal && (
  <PaymentResultModal
    type={paymentModal.type}
    items={Array.isArray(paymentModal.items) ? paymentModal.items: []}
    total={typeof paymentModal.total === "number" ? paymentModal.total : 0}
    duration={paymentModal.duration}
    onClose={() => setPaymentModal(null)}
  />
)}

</>

  );
}