import React, { forwardRef } from "react";
import { Table, Badge } from "react-bootstrap";

const PrintableOrder = forwardRef(({ order }, ref) => {
  if (!order) return null;

  return (
    <div ref={ref} style={{ padding: "20px", fontSize: "14px" }}>
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order.invoiceNumber || order._id} <br />
        <strong>Placed At:</strong> {new Date(order.placedAt).toLocaleString()}
      </p>

      <hr />
      <h4>Customer Details</h4>
      <p>
        <strong>{order.shippingAddress?.name}</strong> <br />
        {order.shippingAddress?.email} <br />
        {order.shippingAddress?.phone} <br />
        {order.shippingAddress?.addressLine1}{" "}
        {order.shippingAddress?.addressLine2 && `, ${order.shippingAddress.addressLine2}`} <br />
        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
      </p>

      <hr />
      <h4>Products</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>SKU</th>
            <th>Attributes</th>
            <th>Padding Details</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product?.title}</td>
              <td>{item.variant?.sku}</td>
              <td>
                {item.variant?.attributes?.map((attr, i) => (
                  <div key={i}>
                    {attr.name}: {attr.value}
                  </div>
                ))}
              </td>
              <td>
                {item.variant?.paddingDetails && (
                  <div
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#fff3cd", // light yellow
                      color: "#856404",
                      padding: "4px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Bust: {item.variant.paddingDetails.bust} | Waist: {item.variant.paddingDetails.waist} | Length: {item.variant.paddingDetails.length} | Height: {item.variant.paddingDetails.height} | Hip: {item.variant.paddingDetails.hip} | Unit: {item.variant.paddingDetails.unit}
                  </div>
                )}
              </td>
              <td>{item.quantity}</td>
              <td>₹ {item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      <h4>Order Summary</h4>
      <p>
        <strong>Items:</strong> {order.totalItems} <br />
        <strong>Total MRP:</strong> ₹ {order.totalMrp} <br />
        <strong>Discount:</strong> ₹ {order.totalDiscount} <br />
        <strong>Shipping Fee:</strong> ₹ {order.shippingFee} <br />
        <strong>Total Amount:</strong> ₹ {order.totalAmount} <br />
        <strong>Payment:</strong> {order.payment?.method} -{" "}
        <Badge
          bg={
            order.payment?.status === "paid"
              ? "success"
              : order.payment?.status === "pending"
              ? "warning"
              : "danger"
          }
        >
          {order.payment?.status.toUpperCase()}
        </Badge>
        <br />
        <strong>Order Status:</strong>{" "}
        <Badge
          bg={
            order.orderStatus === "delivered"
              ? "success"
              : order.orderStatus === "cancelled"
              ? "danger"
              : "info"
          }
        >
          {order.orderStatus.toUpperCase()}
        </Badge>
      </p>
    </div>
  );
});

export default PrintableOrder;
