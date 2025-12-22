"use client";
import styles from "./AddressModal.module.css";
import { useEffect } from "react";

export default function AddressModal({
  isOpen,
  onClose,
  address,
  setAddress,
  onSave,
  isEdit
}) {

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => (
        document.body.style.overflow = "auto"
    );
}, []);

if (!isOpen) return null;


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{isEdit ? "Edit Address" : "Add Address"}</h3>

        <input
          placeholder="Full Name"
          value={address.fullName || ""}
          onChange={(e) =>
            setAddress({ ...address, fullName: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          value={address.phone || ""}
          onChange={(e) =>
            setAddress({ ...address, phone: e.target.value })
          }
        />

        <input
          placeholder="Street Address"
          value={address.street || ""}
          onChange={(e) =>
            setAddress({ ...address, street: e.target.value })
          }
        />

        <div className={styles.row}>
          <input
            placeholder="City"
            value={address.city || ""}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
          />

          <input
            placeholder="State"
            value={address.state || ""}
            onChange={(e) =>
              setAddress({ ...address, state: e.target.value })
            }
          />
        </div>

        <input
            placeholder="Pincode"
            maxLength={6}
            inputMode="numeric"
            value={address.pincode || ""}
            onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
            }
        />


        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} onClick={onSave}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}
