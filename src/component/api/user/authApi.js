import axios from "../axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const sendOTP = async (phone) => {
  try {
    const response = await axios.post("/user/sentOTP", { phone });
    return response.data; // { message: "OTP sent successfully" }
  } catch (error) {
    // Show server error
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to send OTP");
    } else {
      throw new Error("Network error");
    }
  }
};

export const verifyOTP = async (phone, otp) => {
  try {
    const res = await axios.post("/user/verifyOTP", { phone, otp });
    return res.data; // { message: "Login successful", token, user }
  } catch (error) {
    // Show failed OTP message
    if (error.response) {
      throw new Error(error.response.data.message || "OTP verification failed");
    } else {
      throw new Error("Network error");
    }
  }
};

export const loginWithGoogleAPI = async (idToken) => {
  try {
    const response = await axios.post("/user/googleLogin", { idToken });
    return response.data; // { success, token, user }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Google login failed");
    } else {
      throw new Error("Network error");
    }
  }
};

export const updateProfile = async ({ userId, name, email, addresses }) => {
  try {
    const res = await axios.post("/user/completeProfile", {
      name,
      email,
      addresses
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // if using token auth
      }
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error updating profile");
  }
};

export const getProfile = async () => {
  try {
    const res = await axios.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // if using token auth,
      },
    });
    return res.data; // { status: true, message, data: user }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error fetching profile");
  }
};