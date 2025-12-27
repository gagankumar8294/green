"use client";
import styles from "./AddressModal.module.css";
import { useEffect, useState } from "react";

export default function AddressModal({
  isOpen,
  onClose,
  address,
  setAddress,
  onSave,
  isEdit
}) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      setErrors({});
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!address.fullName || address.fullName.trim().length < 3) {
      newErrors.fullName = "Enter a valid full name";
    }

    if (!/^[6-9]\d{9}$/.test(address.phone || "")) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    if (!address.street || address.street.trim().length < 5) {
      newErrors.street = "Street address is required";
    }

    if (!address.city) {
      newErrors.city = "City is required";
    }

    if (!address.state) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(address.pincode || "")) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave();
  };

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
        {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

        <input
          placeholder="Phone Number"
          maxLength={10}
          inputMode="numeric"
          value={address.phone || ""}
          onChange={(e) =>
            setAddress({ ...address, phone: e.target.value })
          }
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}

        <input
          placeholder="Street Address"
          value={address.street || ""}
          onChange={(e) =>
            setAddress({ ...address, street: e.target.value })
          }
        />
        {errors.street && <p className={styles.error}>{errors.street}</p>}

        <div className={styles.row}>
          <div>
            <input
              placeholder="City"
              value={address.city || ""}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />
            {errors.city && <p className={styles.error}>{errors.city}</p>}
          </div>

          <div>
            <input
              placeholder="State"
              value={address.state || ""}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            {errors.state && <p className={styles.error}>{errors.state}</p>}
          </div>
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
        {errors.pincode && <p className={styles.error}>{errors.pincode}</p>}

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.save} onClick={handleSave}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import styles from "./AddressModal.module.css";
// import { useEffect } from "react";

// export default function AddressModal({
//   isOpen,
//   onClose,
//   address,
//   setAddress,
//   onSave,
//   isEdit
// }) {

//   useEffect(() => {
//     if (!isOpen) return;
//     document.body.style.overflow = "hidden";
//     return () => (
//         document.body.style.overflow = "auto"
//     );
// }, []);

// if (!isOpen) return null;


//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <h3>{isEdit ? "Edit Address" : "Add Address"}</h3>

//         <input
//           placeholder="Full Name"
//           value={address.fullName || ""}
//           onChange={(e) =>
//             setAddress({ ...address, fullName: e.target.value })
//           }
//         />

//         <input
//           placeholder="Phone Number"
//           value={address.phone || ""}
//           onChange={(e) =>
//             setAddress({ ...address, phone: e.target.value })
//           }
//         />

//         <input
//           placeholder="Street Address"
//           value={address.street || ""}
//           onChange={(e) =>
//             setAddress({ ...address, street: e.target.value })
//           }
//         />

//         <div className={styles.row}>
//           <input
//             placeholder="City"
//             value={address.city || ""}
//             onChange={(e) =>
//               setAddress({ ...address, city: e.target.value })
//             }
//           />

//           <input
//             placeholder="State"
//             value={address.state || ""}
//             onChange={(e) =>
//               setAddress({ ...address, state: e.target.value })
//             }
//           />
//         </div>

//         <input
//             placeholder="Pincode"
//             maxLength={6}
//             inputMode="numeric"
//             value={address.pincode || ""}
//             onChange={(e) =>
//                 setAddress({ ...address, pincode: e.target.value })
//             }
//         />


//         <div className={styles.actions}>
//           <button className={styles.cancel} onClick={onClose}>
//             Cancel
//           </button>
//           <button className={styles.save} onClick={onSave}>
//             Save Address
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
