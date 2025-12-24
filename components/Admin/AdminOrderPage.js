"use client";

import { useEffect, useState } from "react";
import styles from "./adminOrders.module.css";

const STEPS = ["ORDERED", "SHIPPED", "PICKED", "ARRIVED", "DELIVERED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://green-world-backend-ydlf.onrender.com/api/admin/orders", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      });
  }, []);

  const updateStatus = async (orderId, status) => {
    const res = await fetch(
      `https://green-world-backend-ydlf.onrender.com/api/admin/orders/${orderId}/status`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setOrders(prev =>
        prev.map(o => (o._id === orderId ? data.order : o))
      );
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Admin – All Orders</h1>

      {orders.map(order => (
        <div key={order._id} className={styles.orderCard}>
          {/* HEADER */}
          <div className={styles.header}>
            <div>
              <h3>Order #{order._id}</h3>
              <p className={styles.time}>
                Created: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className={styles.time}>
                Updated: {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className={styles.statusBox}>
              <span
                className={`${styles.paymentStatus} ${
                  order.status === "PAID"
                    ? styles.paid
                    : order.status === "CANCELLED"
                    ? styles.cancelled
                    : styles.pending
                }`}
              >
                {order.status}
              </span>
              <span className={styles.orderStatus}>
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className={styles.section}>
            <h4>Delivery Address</h4>
            <p>{order.address?.fullName}</p>
            <p>{order.address?.phone}</p>
            <p>
              {order.address?.street}, {order.address?.city}
            </p>
            <p>
              {order.address?.state} – {order.address?.pincode}
            </p>
          </div>

          {/* ITEMS */}
          <div className={styles.section}>
            <h4>Items</h4>
            <div className={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.itemRow}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemInfo}>
                    <strong>{item.name}</strong>
                    <span>₹{item.price} × {item.quantity}</span>
                  </div>
                  <div className={styles.itemTotal}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT */}
          <div className={styles.section}>
            <h4>Payment Details</h4>
            <p>Razorpay Order ID: {order.payment?.razorpayOrderId || "-"}</p>
            <p>Payment ID: {order.payment?.razorpayPaymentId || "-"}</p>
            <p>Signature: {order.payment?.razorpaySignature || "-"}</p>
          </div>

          {/* TOTAL */}
          <div className={styles.total}>
            Total Amount: ₹{order.totalAmount}
          </div>

          {/* ADMIN CONTROLS */}
          <div className={styles.actions}>
            {STEPS.map(step => (
              <button
                key={step}
                disabled={order.orderStatus === step}
                className={
                  order.orderStatus === step ? styles.active : ""
                }
                onClick={() => updateStatus(order._id, step)}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}