import React from "react";
import { Offcanvas, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CartOffcanvas({
  show,
  handleClose,
  cart = {}, // cart object from backend
  increaseQty,
  decreaseQty,
  removeFromCart,
}) {
  const navigate = useNavigate();

  // Get items array safely
  const items = cart?.items || [];
  console.log("Cart items in Offcanvas:", items);

  // // Calculate total using variant price, fallback to product MRP
  // const total = items.reduce(
  //   (acc, item) => acc + (item.variant?.price || item.product?.mrp || 0) * (item.quantity || 0),
  //   0
  // );

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "400px" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map((item, index) => (
              <div
                key={item._id || index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px",
                }}
              >
                {/* Product Image */}
                <div style={{ flex: "0 0 80px" }}>
                  <Image
                    src={item.product?.media?.[0]?.url || "/placeholder.png"}
                    alt={item.product?.title || "Product"}
                    rounded
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Product Details */}
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <h6 style={{ margin: "0 0 5px 0" }}>
                    {item.product?.title || "Product"}
                  </h6>
                  <p style={{ margin: 0, fontWeight: "500" }}>
                    ₹{item.variant?.price || item.product?.mrp || 0}
                  </p>

                  {/* Attributes display */}
                  {item.variant?.attributes?.length > 0 && (
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {item.variant.attributes.map((attr) => (
                        <span key={attr.name} style={{ marginRight: "5px" }}>
                          {attr.name}: {attr.value}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        decreaseQty({
                          productId: item?.product?._id,
                          sku: item?.variant?.sku,
                          attributes: item?.variant?.attributes,
                        })
                      }
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 10px" }}>
                      {item.quantity || 0}
                    </span>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        increaseQty({
                          productId: item?.product?._id,
                          sku: item?.variant?.sku,
                          attributes: item?.variant?.attributes,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Remove Button */}
                <div>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      removeFromCart({productId:item?.product?._id, sku:item?.variant?.sku})
                    }
                  >
                    Remove 
                  </Button>
                </div>
              </div>
            ))}

            {/* Total and Checkout */}
            <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px" }}>
              <h5>Total: ₹{cart?.totalPrice}</h5>
              <Button
                variant="success"
                className="w-100 mt-2"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
