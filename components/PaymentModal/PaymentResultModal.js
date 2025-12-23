import { useEffect } from "react";
import styles from "./PaymentResultModal.module.css";

export default function PaymentResultModal({
  type, // "success" | "failed"
  items = [],
  total = 0,
  onClose,
  duration,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${type === "success" ? styles.success : styles.failed}`}>
        
        <h2>
          {type === "success" ? "✅ Payment Successful" : "❌ Payment Failed"}
        </h2>

        <h3 className={styles.total}>Total: ₹{total}</h3>

        <div className={styles.items}>
          {Array.isArray(items) && items.map((item, i) => (
            <div key={i} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div>
                <p className={styles.name}>{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.timer}>
          {type === "success"
            ? "Redirecting to shop..."
            : "Please try again"}
        </p>
      </div>
    </div>
  );
}
