import React, { useState } from "react";
import { updateProfile } from "../api/user/authApi";

export default function CompleteProfile({ isOpen, userId, closeModal }) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [addresses, setAddresses] = useState([
    { label: "", street: "", city: "", state: "", postalCode: "", country: "India" }
  ]);
  const [message, setMessage] = useState("");

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { label: "", street: "", city: "", state: "", postalCode: "", country: "India" }]);
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      setMessage("Name and email are required");
      return;
    }
    try {
      const res = await updateProfile({ userId, name, email, addresses });
      setMessage(res.message);
      closeModal();
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
  style={{
    maxWidth: 600,
    width: "95%",
    margin: "20px auto",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    boxSizing: "border-box",
  }}
>
  <h2 style={{ fontSize: "1.5rem", marginBottom: 20 }}>Complete Your Profile</h2>

  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      margin: "10px 0",
      borderRadius: 6,
      border: "1px solid #ccc",
      fontSize: "1rem",
      boxSizing: "border-box",
    }}
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      margin: "10px 0",
      borderRadius: 6,
      border: "1px solid #ccc",
      fontSize: "1rem",
      boxSizing: "border-box",
    }}
  />

  {addresses.map((address, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 6,
        marginBottom: 15,
      }}
    >
      <h4 style={{ fontSize: "1.1rem" }}>Address {index + 1}</h4>
      {["label", "street", "city", "state", "postalCode"].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={address[field]}
          onChange={(e) =>
            handleAddressChange(index, field, e.target.value)
          }
          style={{
            width: "100%",
            padding: 10,
            margin: "5px 0",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: "0.95rem",
            boxSizing: "border-box",
          }}
        />
      ))}
      <button
        onClick={() => handleRemoveAddress(index)}
        style={{
          marginTop: 8,
          padding: 8,
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          width: "100%",
          fontSize: "0.9rem",
        }}
      >
        Remove Address
      </button>
    </div>
  ))}

  <button
    onClick={handleAddAddress}
    style={{
      padding: 12,
      marginBottom: 15,
      borderRadius: 6,
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      width: "100%",
      fontSize: "1rem",
      boxSizing: "border-box",
    }}
  >
    Add Another Address
  </button>

  <button
    onClick={handleSubmit}
    style={{
      width: "100%",
      padding: 14,
      marginTop: 10,
      borderRadius: 6,
      backgroundColor: "green",
      color: "#fff",
      border: "none",
      fontSize: "1.1rem",
      boxSizing: "border-box",
    }}
  >
    Save Profile
  </button>

  {message && <p style={{ marginTop: 15, fontSize: "0.95rem" }}>{message}</p>}
</div>
  );
}