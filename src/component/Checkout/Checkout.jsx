import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarMenu from "../Navbar/NavbarMenu";
import { getProfile, updateProfile } from "../api/user/authApi";
import { placeOrder, verifyPayment } from "../api/user/orderApi";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

export default function Checkout() {
  const Razorpay = useRazorpay();
  const { cart } = useCart();
  const location = useLocation();

  const navigator = useNavigate();

  const [editing, setEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [itemsToCheckout, setItemsToCheckout] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingPhone, setEditingPhone] = useState(false);

  console.log("itemsToCheckout Address:", itemsToCheckout);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  // New Address State
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res.status) {
        setUserDetails(res.data);

        // auto-select default address
        const defaultAddr = res.data.addresses?.find((a) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
        }
      } else {
        alert(res.message || "Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      alert("Unable to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    if (location.state?.buyNowItem) {
      setItemsToCheckout([location.state.buyNowItem]);
    } else {
      setItemsToCheckout(cart.items || []);
    }
  }, [cart, location.state]);

  const subtotal = itemsToCheckout.reduce(
    (total, item) =>
      total + (item.salePrice || item.variant.price) * item.quantity,
    0
  );

  const handleSaveNewAddress = async () => {
    try {
      const updated = {
        ...userDetails,
        addresses: [...(userDetails.addresses || []), newAddress],
      };

      await updateProfile(updated); // update in backend
      setUserDetails(updated);
      setSelectedAddress(newAddress);

      setNewAddress({
        label: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
      setAddingAddress(false);
    } catch (err) {
      alert("Failed to save new address");
    }
  };

  const handleSavePhone = async () => {
    if (!userDetails.phone) {
      alert("Phone number cannot be empty");
      return;
    }

    try {
      // Only send the necessary fields
      await updateProfile({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        addresses: userDetails.addresses || [],
      });
      alert("Phone number updated!");
      setEditingPhone(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update phone number");
    }
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    if (!userDetails?.phone) {
      alert("Please add a phone number before placing the order");
      return; // Stop execution
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const orderPayload = {
        buyNow: !!location.state?.buyNowItem,
        shippingAddress: {
          name: userDetails?.name,
          email: userDetails?.email,
          phone: userDetails?.phone,
          addressLine1: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country || "India",
        },
        paymentMethod,
        ...(location.state?.buyNowItem && {
          productId: location.state.buyNowItem.productId,
          variant: location.state.buyNowItem.variant,
          quantity: location.state.buyNowItem.quantity,
        }),
      };

      const res = await placeOrder(orderPayload);

      if (!res.success) {
        alert("Failed to place order");
        return;
      }

      if (paymentMethod === "ONLINE" && res.razorpayOrder) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert("Failed to load Razorpay SDK");
          return;
        }
        const options = {
          key: "rzp_test_RBrvv86oXQyKgx",
          amount: res.razorpayOrder.amount,
          currency: res.razorpayOrder.currency,
          order_id: res.razorpayOrder.id,
          name: userDetails?.name,
          description: `Order #${res.order.invoiceNumber}`,
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone,
          },
          handler: async (response) => {
            try {
              await verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              alert("✅ Payment successful!");
              navigator("/");
            } catch (err) {
              alert("❌ Payment verification failed: " + err.message);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("✅ Order placed successfully (COD)");
        // navigator("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  console.log("itemsToCheckout", itemsToCheckout);

  return (
    <>
      <NavbarMenu />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 20,
          paddingBottom: 100,
        }}
      >
        <h2
          style={{
            borderBottom: "2px solid #eee",
            paddingBottom: 10,
            marginBottom: 30,
          }}
        >
          Checkout
        </h2>

        {/* Shipping Details */}
        <div style={{ marginBottom: 40 }}>
          <h4>Shipping Details</h4>
          <p>
            <b>{userDetails?.name}</b> ({userDetails?.email} |{" "}
            {editingPhone ? (
              <input
                type="text"
                value={userDetails.phone || ""}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                placeholder="Enter phone number"
                style={{
                  padding: 5,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  width: 150,
                  marginRight: 10,
                }}
              />
            ) : (
              userDetails?.phone || "No phone added"
            )}
            {editingPhone ? (
              <button
                onClick={handleSavePhone}
                style={{
                  marginLeft: 5,
                  padding: "4px 10px",
                  borderRadius: 4,
                  backgroundColor: "green",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingPhone(true)}
                style={{
                  marginLeft: 5,
                  padding: "4px 10px",
                  borderRadius: 4,
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {userDetails?.phone ? "Edit" : "Add"}
              </button>
            )}
          </p>

          {/* Saved addresses */}
          <div>
            {userDetails?.addresses?.length > 0 ? (
              userDetails.addresses.map((addr, idx) => (
                <label
                  key={idx}
                  style={{
                    display: "block",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedAddress === addr ? "#e6f7ff" : "#fff",
                  }}
                >
                  <input
                    type="radio"
                    name="deliveryAddress"
                    checked={selectedAddress === addr}
                    onChange={() => setSelectedAddress(addr)}
                    style={{ marginRight: "10px" }}
                  />
                  <b>{addr.label}</b> — {addr.street}, {addr.city}, {addr.state}
                  , {addr.postalCode}, {addr.country}
                  {addr.isDefault && (
                    <span style={{ color: "green", marginLeft: 8 }}>
                      (Default)
                    </span>
                  )}
                </label>
              ))
            ) : (
              <p>No saved addresses. Please add one below.</p>
            )}

            {/* Add new address */}
            {!addingAddress ? (
              <button
                onClick={() => setAddingAddress(true)}
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "1px solid #007bff",
                  backgroundColor: "#fff",
                  color: "#007bff",
                  cursor: "pointer",
                }}
              >
                + Add New Address
              </button>
            ) : (
              <div
                style={{
                  marginTop: 15,
                  padding: 15,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                }}
              >
                {[
                  "label",
                  "street",
                  "city",
                  "state",
                  "postalCode",
                  "country",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newAddress[field]}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, [field]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: 6,
                    }}
                  />
                ))}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  Set as Default Address
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={handleSaveNewAddress}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      backgroundColor: "green",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => setAddingAddress(false)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h4>Payment Method</h4>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            style={{ marginRight: "10px" }}
          />
          Cash on Delivery (COD)
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="radio"
            name="paymentMethod"
            value="ONLINE "
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
            style={{ marginRight: "10px" }}
          />
          Online Payment
        </label>
        <br />

        {/* 📦 Place Order Button */}

        {/* Order Summary */}
        <div
          style={{
            marginBottom: 30,
            padding: 20,
            borderRadius: 10,
            border: "1px solid #eee",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4 style={{ marginBottom: 20 }}>
            Order Summary ({itemsToCheckout.length} items)
          </h4>
          {itemsToCheckout.map((item) => (
            <div
              key={item.productId || item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 15,
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <img
                  src={item.product?.media?.[0]?.url || item?.media[0].url}
                  alt={item.title}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {item?.product?.title || item?.title}
                  </p>
                  <small style={{ color: "#555" }}>Qty: {item.quantity}</small>
                </div>
              </div>
              <span style={{ fontWeight: 600 }}>
                ₹
                {(item.product?.salePrice || item.variant.price) *
                  item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky Footer */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
            zIndex: 1000,
          }}
        >
          <h3 style={{ margin: 0 }}>Total: ₹{subtotal}</h3>
          <button
            onClick={handlePlaceOrder}
            style={{
              padding: "12px 25px",
              borderRadius: 8,
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
