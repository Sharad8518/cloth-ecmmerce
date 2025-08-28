import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getAllOrders = async ({ page = 1, limit = 10 }) => {
  try {
    const res = await axios.get("/admin/orders", {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to place order");
  }
};

export const updateOrdersStatus = async (updateOrderId, updateOrderStatus) => {
  try {
    const res = await axios.put(
      "/admin/updateOrdersStatus",
      {
        orderId: updateOrderId,
        status: updateOrderStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hfz-a_tkn_238x")}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to update order status"
    );
  }
};
