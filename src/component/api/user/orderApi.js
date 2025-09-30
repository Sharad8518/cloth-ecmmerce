import axios from "../axios";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const placeOrder = async (orderData) => {
  try {
    const res = await axios.post("/user/order/place", orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to place order");
  }
}

export const verifyPayment = async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  try {
    const res = await axios.post(
      "/user/order/verify-razorpay",
      { razorpayOrderId, razorpayPaymentId, razorpaySignature },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Payment verification failed");
  }
};



export const getOrder = async () => {
  try {
    const res = await axios.get("/user/order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to place order");
  }
}

export const getUserOrder = async ({ page = 1, limit = 10 }) => {
  try{
  const res  = await axios.get("/user/order", { params: { page, limit } ,
   headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return res.data;
}catch(err){
  throw new Error(err.response?.data?.message || "Failed to place order");
}
};