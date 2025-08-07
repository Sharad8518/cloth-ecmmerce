import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Badge,
  Button,
} from "react-bootstrap";
import NavbarMenu from "../../Navbar/NavbarMenu";
import ProductList from "../../ProductList/ProductList";
import BreadcrumbSinglePage from "../../layout/BreadcrumbSinglePage";
import Footer from "../../Footer/Footer";

// products.js
const products = [
  {
    id: 1,
    title: "Elegant Silk Saree",
    description: "Hand-woven silk saree with intricate border details.",
    price: 1499,
    image:
      "https://images.meesho.com/images/products/374162167/yqups_512.webp?width=512",
  },
  {
    id: 2,
    title: "Designer Lehenga",
    description: "Heavy embroidered lehenga perfect for weddings.",
    price: 2999,
    image:
      "https://images.meesho.com/images/products/374162166/y2r1s_512.webp?width=512",
  },
  {
    id: 3,
    title: "Chiffon Dupatta Set",
    description: "Lightweight dupatta set for casual occasions.",
    price: 799,
    image: "https://images.meesho.com/images/products/243573297/7umse_512.jpg",
  },
  {
    id: 4,
    title: "Printed Cotton Kurti",
    description: "Comfortable kurti with vibrant prints.",
    price: 999,
    image: "https://images.meesho.com/images/products/354373806/eoupw_512.webp",
  },
  {
    id: 5,
    title: "Chiffon Dupatta Set",
    description: "Lightweight dupatta set for casual occasions.",
    price: 799,
    image: "https://images.meesho.com/images/products/243573297/7umse_512.jpg",
  },
  {
    id: 6,
    title: "Printed Cotton Kurti",
    description: "Comfortable kurti with vibrant prints.",
    price: 999,
    image: "https://images.meesho.com/images/products/354373806/eoupw_512.webp",
  },
  {
    id: 7,
    title: "Chiffon Dupatta Set",
    description: "Lightweight dupatta set for casual occasions.",
    price: 799,
    image: "https://images.meesho.com/images/products/243573297/7umse_512.jpg",
  },
  {
    id: 8,
    title: "Printed Cotton Kurti",
    description: "Comfortable kurti with vibrant prints.",
    price: 999,
    image: "https://images.meesho.com/images/products/354373806/eoupw_512.webp",
  },
  {
    id: 9,
    title: "Chiffon Dupatta Set",
    description: "Lightweight dupatta set for casual occasions.",
    price: 799,
    image: "https://images.meesho.com/images/products/243573297/7umse_512.jpg",
  },
  {
    id: 10,
    title: "Printed Cotton Kurti",
    description: "Comfortable kurti with vibrant prints.",
    price: 999,
    image: "https://images.meesho.com/images/products/354373806/eoupw_512.webp",
  },
];

export default function CategoryProduct() {
  // State to track all selected filters
  const [filters, setFilters] = useState({
    price: [],
    category: [],
    size: [],
    color: [],
    fabric: [],
    craft: [],
    occasion: [],
    dupatta: [],
  });

  // Add or remove filter
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      price: [],
      category: [],
      size: [],
      color: [],
      fabric: [],
      craft: [],
      occasion: [],
      dupatta: [],
    });
  };

  // Get all selected filters as flat array with type
  const selectedFilters = Object.entries(filters).flatMap(([type, values]) =>
    values.map((v) => ({ type, value: v }))
  );

  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // adjust per need
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products for pagination
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting (placeholder logic – you can customize)
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // reset to first page on sort change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <NavbarMenu />
      <br />
      <br />
      <div style={{ width: "100%", height: 300, boxSizing: "border-box" }}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/392/141/small/raksha-bandhan-invitation-banner-or-header-with-crystal-rakhi-free-vector.jpg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <br />
      <Container fluid>
        <BreadcrumbSinglePage />
        <Row>
          {/* Left Filter Section */}
          <Col md={3} style={{ background: "#f8f9fa", padding: "20px" }}>
            <h5>Filters</h5>
            <Accordion defaultActiveKey="0" alwaysOpen>
              {/* Shop by Price */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>Shop by Price</Accordion.Header>
                <Accordion.Body>
                  {[
                    "Under ₹500",
                    "₹500 - ₹1000",
                    "₹1000 - ₹2000",
                    "Above ₹2000",
                  ].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.price.includes(val)}
                      onChange={() => handleFilterChange("price", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Category */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>Category</Accordion.Header>
                <Accordion.Body>
                  {["Sarees", "Lehengas", "Kurtis", "Suits"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.category.includes(val)}
                      onChange={() => handleFilterChange("category", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Size */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                  {["XS", "S", "M", "L", "XL"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.size.includes(val)}
                      onChange={() => handleFilterChange("size", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Color */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>Color</Accordion.Header>
                <Accordion.Body>
                  {["Red", "Blue", "Green", "Black", "White"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.color.includes(val)}
                      onChange={() => handleFilterChange("color", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Fabric */}
              <Accordion.Item eventKey="4">
                <Accordion.Header>Fabric</Accordion.Header>
                <Accordion.Body>
                  {["Cotton", "Silk", "Chiffon", "Georgette"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.fabric.includes(val)}
                      onChange={() => handleFilterChange("fabric", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Craft */}
              <Accordion.Item eventKey="5">
                <Accordion.Header>Craft</Accordion.Header>
                <Accordion.Body>
                  {["Embroidery", "Zari", "Block Print"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.craft.includes(val)}
                      onChange={() => handleFilterChange("craft", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Occasion */}
              <Accordion.Item eventKey="6">
                <Accordion.Header>Occasion</Accordion.Header>
                <Accordion.Body>
                  {["Wedding", "Casual", "Party", "Festive"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.occasion.includes(val)}
                      onChange={() => handleFilterChange("occasion", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Include Dupatta */}
              <Accordion.Item eventKey="7">
                <Accordion.Header>Include Dupatta</Accordion.Header>
                <Accordion.Body>
                  {["Yes", "No"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.dupatta.includes(val)}
                      onChange={() => handleFilterChange("dupatta", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          {/* Right Product Section */}
          <Col md={9} style={{ padding: "20px" }}>
            {/* Selected Filters */}
            {selectedFilters.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <strong>Selected Filters:</strong>
                  {selectedFilters.map((filter, idx) => (
                    <Badge
                      key={idx}
                      bg="secondary"
                      style={{
                        padding: "6px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                      }}
                    >
                      {filter.value}
                      <span
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            [filter.type]: prev[filter.type].filter(
                              (v) => v !== filter.value
                            ),
                          }));
                        }}
                        style={{
                          marginLeft: 4,
                          fontWeight: "bold",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        &times;
                      </span>
                    </Badge>
                  ))}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}

            {/* Product List Placeholder */}
            <div
              style={{
                background: "#e9ecef",
                minHeight: "500px",
                padding: "20px",
              }}
            >
              {/* <h4>Product Listings</h4> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      style={{
                        padding: "6px 10px",
                        margin: "0 5px",
                        background:
                          currentPage === i + 1 ? "#cf3715ff" : "transparent",
                        color: currentPage === i + 1 ? "#fff" : "#000",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {/* Sort By Selector */}
                <div>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                    style={{ padding: 10, paddingRight: 5, outline: "none" }}
                  >
                    <option value="bestseller">Best Seller</option>
                    <option value="bestseller">Best Seller</option>
                    <option value="new">New Arrival</option>
                    <option value="popularity">Popularity</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="priceLow">Price: Low to High</option>
                  </select>
                </div>

                {/* Pagination */}
              </div>
              <ProductList products={products} />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}
