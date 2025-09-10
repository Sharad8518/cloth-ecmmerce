// src/components/PrintableOrder.jsx
import React from "react";

const PrintableOrder = React.forwardRef(({ order }, ref) => (
  <div ref={ref} style={{ padding: "20px", fontSize: "14px", width: "600px" }}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
      Order Invoice
    </h2>
    <hr />

    {/* Order Info */}
    <div style={{ marginBottom: "15px" }}>
      <p><strong>Order ID:</strong> {order.invoiceNumber || order._id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
    </div>

    {/* Customer */}
    <div style={{ marginBottom: "15px" }}>
      <h4>Customer</h4>
      <p>{order.user?.name} <br /> {order.user?.email}</p>
    </div>

    {/* Shipping */}
    <div style={{ marginBottom: "15px" }}>
      <h4>Shipping Address</h4>
      <p>{order.shippingAddress?.state}</p>
    </div>

    {/* Items */}
    <div style={{ marginBottom: "15px" }}>
      <h4>Items</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Qty</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{i + 1}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.quantity}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{item.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ₹{item.quantity * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Payment */}
    <div style={{ marginBottom: "15px" }}>
      <h4>Payment</h4>
      <p>
        Method: {order.payment?.method} <br />
        Status: {order.payment?.status}
      </p>
    </div>

    {/* Totals */}
    <div style={{ marginTop: "20px", textAlign: "right" }}>
      <h3>Total: ₹{order.totalAmount}</h3>
    </div>

    {/* Footer */}
    <hr />
    <p style={{ textAlign: "center" }}>Thank you for your purchase!</p>
  </div>
));

export default PrintableOrder;
