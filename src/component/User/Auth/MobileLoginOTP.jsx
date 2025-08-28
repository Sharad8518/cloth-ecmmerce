import React, { useState } from "react";
import { sendOTP, verifyOTP, updateProfile } from "../../api/user/authApi";
import CompleteProfile from "../CompleteProfile";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function MobileLoginOTP({ isOpen, closeModal }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [completeProfileOpen, setCompleteProfileOpen] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // toggle between login & signup

  const handleSendOTP = async () => {
    if (mobile.length === 10) {
      try {
        const res = await sendOTP(mobile); // call API
        setIsOTPSent(true);
        setMessage(res.message); // show server message
      } catch (err) {
        setMessage(err.message); // show error message if failed
      }
    } else {
      setMessage("Please enter a valid 10-digit mobile number");
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  console.log("OTP:", otp.join(""));

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      try {
        const res = await verifyOTP(mobile, otpValue); // call API
        console.log("OTP verification response:", res);
        setMessage(res.message); // "Login successful"

        // Save token & user
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        //   closeModal(); // close OTP modal

        // If user is guest, open CompleteProfile modal
        if (res.user.accountType === "guest") {
          setCompleteProfileOpen(true);
        } else if (res.user.accountType === "customer") {
          closeModal(); // close OTP modal
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "OTP verification failed");
      }
    } else {
      setMessage("Please enter 6-digit OTP");
    }
  };
  const handleResendOTP = () => {
    setMessage(`OTP resent to +91 ${mobile}`);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState([
    {
      label: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  ]);

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        label: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
    ]);
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
      const res = await updateProfile({ name, email, addresses });
      setMessage(res.message);
      closeModal();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      if (!credentialResponse.credential) return;

      const token = credentialResponse.credential;
      const userInfo = jwtDecode(token); // Decode the JWT
      console.log("User Info:", userInfo);

      // Optionally save user info locally
  
    },
    onError: () => {
      console.log("Login Failed");
    },
  });



  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: 20,
      }}
    >
      {/* OTP Modal */}
      {!completeProfileOpen && (
        <div
          style={{
            maxWidth: 700,
            width: "100%",
            height: 500,
            padding: 30,
            borderRadius: 15,
            backgroundColor: "#fff",
            boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
            textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {/* Left side: form */}
          <div
            style={{
              flex: 1,
              paddingRight: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => closeModal()}
              style={{
                position: "absolute",
                top: 15,
                right: 15,
                background: "transparent",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ marginBottom: 10 }}>House of Ziba</h2>

            {!isOTPSent ? (
              <>
                <p>{isLogin ? "Login to your account" : "Create Account"}</p>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    margin: "20px 0",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 16,
                  }}
                />
                <button
                  onClick={handleSendOTP}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 6,
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  Send OTP
                </button>

                <p style={{ marginTop: 15 }}>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <span
                    style={{ color: "#007bff", cursor: "pointer" }}
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setMessage("");
                    }}
                  >
                    {isLogin ? "Create Account" : "Login now"}
                  </span>
                </p>
                <p style={{ fontSize: 12 }}>Or continue with</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}

                    onClick={()=>loginWithGoogle()}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                      style={{ width: 40, height: 40 }}
                    />
                  </div>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      marginLeft: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png"
                      style={{ width: 40, height: 40 }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>Enter the 6-digit OTP sent to +91 {mobile}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(idx, e.target.value)}
                      style={{
                        width: 40,
                        height: 50,
                        fontSize: 24,
                        textAlign: "center",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ color: "#007bff", cursor: "pointer" }}
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </span>
                  <button
                    onClick={handleVerifyOTP}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "green",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Verify
                  </button>
                </div>
                {message && (
                  <p style={{ marginTop: 15, color: "#333" }}>{message}</p>
                )}
              </>
            )}
          </div>

          {/* Right side: image - hide on mobile */}
          <div
            className="right-image"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src="https://i.ibb.co/2kF3Gsm/mobile-login.png"
              alt="Mobile Illustration"
              style={{
                width: "80%",
                animation: "float 2s ease-in-out infinite",
              }}
            />
          </div>

          <style>
            {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          @media (max-width: 768px) {
            .right-image {
              display: none;
            }
          }
        `}
          </style>
        </div>
      )}

      {/* CompleteProfile modal opens only after OTP success */}
      {completeProfileOpen && (
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
          <h2 style={{ fontSize: "1.5rem", marginBottom: 20 }}>
            Complete Your Profile
          </h2>

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
              {["label", "street", "city", "state", "postalCode"].map(
                (field) => (
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
                )
              )}
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

          {message && (
            <p style={{ marginTop: 15, fontSize: "0.95rem" }}>{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
