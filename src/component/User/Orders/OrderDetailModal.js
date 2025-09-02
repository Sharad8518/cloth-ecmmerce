import { Modal, Table, Badge } from "react-bootstrap";
import { FaShippingFast } from "react-icons/fa";

function OrderDetailModal({ order, show, onClose }) {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="fw-bold">Order #{order.invoiceNumber}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3">
        {/* Status */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h6 className="mb-0">Status</h6>
          <Badge bg="primary" className="fs-6">
            {order.orderStatus.toUpperCase()}
          </Badge>
        </div>

        {/* Payment */}
        <div className="mb-3">
          <h6>Payment</h6>
          <div className="bg-light p-2 rounded">
            <div>Method: <strong>{order.payment.method}</strong></div>
            <div>Status: <Badge bg={order.payment.status === "paid" ? "success" : "warning"}>
              {order.payment.status}
            </Badge></div>
            <div>Txn ID: {order.payment.transactionId || "N/A"}</div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-3">
          <h6>Items</h6>
          <div className="table-responsive">
            <Table striped bordered hover size="sm">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item?.product?.title}</td>
                    <td>
                      <div><strong>SKU:</strong> {item.variant.sku}</div>
                      {item.variant.attributes?.map((attr, i) => (
                        <div key={i}>
                          {attr.name}: {attr.value}
                        </div>
                      ))}
                      {item.variant.paddingDetails && (
                        <div>
                          Waist: {item.variant.paddingDetails.waist}{" "}
                          {item.variant.paddingDetails.unit}
                        </div>
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹ {item.variant.price}</td>
                    <td>₹ {item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Addresses */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <h6>Shipping Address</h6>
            <div className="bg-light p-2 rounded small">
              <div>{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.addressLine1}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</div>
              <div>{order.shippingAddress.country}</div>
              <div>📞 {order.shippingAddress.phone}</div>
              <div>✉️ {order.shippingAddress.email}</div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <h6>Billing Address</h6>
            <div className="bg-light p-2 rounded small">
              {order.billingAddress?.name ? (
                <>
                  <div>{order.billingAddress.name}</div>
                  <div>{order.billingAddress.addressLine1}</div>
                  <div>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}</div>
                  <div>{order.billingAddress.country}</div>
                  <div>📞 {order.billingAddress.phone}</div>
                  <div>✉️ {order.billingAddress.email}</div>
                </>
              ) : (
                <div className="text-muted">Same as shipping address</div>
              )}
            </div>
          </div>
        </div>

        {/* Tracking */}
        {order.tracking?.trackingNumber && (
          <div className="mb-3">
            <h6>Tracking</h6>
            <div className="bg-light p-2 rounded small">
              <div>Courier: {order.tracking.courierName}</div>
              <div>
                <FaShippingFast className="me-2" />
                <a href={order.tracking.trackingUrl} target="_blank" rel="noreferrer">
                  {order.tracking.trackingNumber}
                </a>
              </div>
              {order.tracking.shippedAt && (
                <div>Shipped: {new Date(order.tracking.shippedAt).toLocaleString()}</div>
              )}
              {order.tracking.deliveredAt && (
                <div>Delivered: {new Date(order.tracking.deliveredAt).toLocaleString()}</div>
              )}
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="mb-3">
          <h6>Totals</h6>
          <div className="bg-light p-2 rounded small">
            <div>Items: {order.totalItems}</div>
            <div>MRP: ₹ {order.totalMrp}</div>
            <div>Discount: - ₹ {order.totalDiscount}</div>
            <div>Shipping Fee: ₹ {order.shippingFee}</div>
            <div className="fw-bold fs-5 text-success">
              Total: ₹ {order.totalAmount}
            </div>
          </div>
        </div>

        {/* Return Policy */}
        {order.returnPolicy?.isReturnable && (
          <div className="alert alert-info p-2 small">
            ✅ Returnable within {order.returnPolicy.returnWindowDays} days
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default OrderDetailModal;



