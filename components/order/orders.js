"use client";

import { useEffect, useState } from "react";
import styles from "./orders.module.css";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3200/api/payment/my-orders", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleOrder = (id) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p className={styles.loading}>Loading orders...</p>;

  if (!orders.length) {
    return (
      <div className={styles.empty}>
        <h2>No Orders Yet</h2>
        <p>You haven’t placed any orders.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order._id}>
            {/* ORDER CARD */}
            <div className={styles.orderCard}>
              <div className={styles.left}>
                <img
                  src={order.items[0]?.image}
                  className={styles.productImage}
                  alt=""
                />
              </div>

              <div className={styles.middle}>
                <p className={styles.orderId}>
                  Order #{order._id.slice(-6)}
                </p>

                <p className={styles.productName}>
                  {order.items[0]?.name}
                  {order.items.length > 1 && (
                    <span className={styles.moreItems}>
                      +{order.items.length - 1} more
                    </span>
                  )}
                </p>

                <p className={styles.date}>
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div className={styles.right}>
                <span
                  className={`${styles.status} ${
                    order.status === "PAID"
                      ? styles.paid
                      : styles.failed
                  }`}
                >
                  {order.status}
                </span>

                <p className={styles.amount}>₹{order.totalAmount}</p>

                {order.status === "PAID" && (
                  <button
                    className={styles.viewBtn}
                    onClick={() => toggleOrder(order._id)}
                  >
                    {openOrderId === order._id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                )}
              </div>
            </div>

            {/* PAID ORDER DETAILS */}
            {order.status === "PAID" &&
              openOrderId === order._id && (
                <div className={styles.orderDetails}>
                  {/* ITEMS */}
                  <div className={styles.itemsList}>
                    {order.items.map((item, i) => (
                      <div key={i} className={styles.itemRow}>
                        <img src={item.image} alt="" />
                        <div>
                          <p>{item.name}</p>
                          <span>
                            ₹{item.price} × {item.quantity}
                          </span>
                        </div>
                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* SUMMARY */}
                  <div className={styles.summary}>
                    <p>
                      Total Items:{" "}
                      <strong>{order.items.length}</strong>
                    </p>
                    <p>
                      Order Total:{" "}
                      <strong>₹{order.totalAmount}</strong>
                    </p>
                  </div>

                  {/* TRACKER */}
                  <OrderProgress status={order.orderStatus} />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================================================
   DELIVERY TRACKER
====================================================== */
function OrderProgress({ status }) {
  const steps = [
    "ORDERED",
    "SHIPPED",
    "PICKED",
    "ARRIVED",
    "DELIVERED",
  ];

  const activeIndex = steps.indexOf(status);

  return (
    <div className={styles.tracker}>
      {steps.map((step, index) => {
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <div key={step} className={styles.step}>
            {index !== 0 && (
              <span
                className={`${styles.progressLine} ${
                  isCompleted ? styles.completedLine : ""
                }`}
              />
            )}

            <span
              className={`${styles.progressDot} ${
                isCompleted
                  ? styles.completed
                  : isActive
                  ? styles.active
                  : ""
              }`}
            />

            <span
              className={`${styles.progressLabel} ${
                isActive ? styles.activeText : ""
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
