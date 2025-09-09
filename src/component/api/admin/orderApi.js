import axios from "../axios";

const token = localStorage.getItem("hfz-a_tkn_238x");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getAllOrders = async ({ 
  page = 1,
  limit = 10,  
  search = "", 
  orderNumber = "", 
  orderStatus = ""  }) => {
  try {
    const res = await axios.get("/admin/orders", {
     params: { page, limit, search, orderNumber, orderStatus },
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

// --- Monthly sales (summary)
export const getMonthlySales = async () => {
  try {
    const res = await axios.get("/admin/sales/monthly");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch monthly sales");
  }
};

// --- Total stock available
export const getTotalStock = async () => {
  try {
    const res = await axios.get("/admin/total/stock");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch total stock");
  }
};

// --- Stock sold
export const getStockSold = async () => {
  try {
    const res = await axios.get("/admin/sales/stock", );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch stock sold");
  }
};

// --- Remaining stock
export const getRemainingStock = async () => {
  try {
    const res = await axios.get("/admin/stock");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch remaining stock");
  }
};

// --- Sales Pie Chart
export const getPieChartData = async () => {
  try {
    const res = await axios.get("/admin/pieChart");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch pie chart data");
  }
};

// --- Sales Line Chart (current month)
export const getLineChartData = async () => {
  try {
    const res = await axios.get("/admin/lineChart",);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch line chart data");
  }
};