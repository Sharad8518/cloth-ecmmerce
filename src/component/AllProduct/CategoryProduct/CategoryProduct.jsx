import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import NavbarMenu from "../../Navbar/NavbarMenu";
import ProductList from "../../ProductList/ProductList";
import BreadcrumbSinglePage from "../../layout/BreadcrumbSinglePage";
import Footer from "../../Footer/Footer";
import styles from "./CategoryProduct.module.css";
import { filterProduct } from "../../api/user/Productapi";
import { getBanner } from "../../api/user/bannerApi";
import Lottie from "lottie-react";
import { useLocation } from "react-router-dom";
import loadingAnimation from "../../../assets/Anim/loading.json";

export default function CategoryProduct() {
   const location = useLocation();
  const category = location.state?.category; // safely access passed category
  // State to track filters
  console.log('category',category)
  const [filters, setFilters] = useState({
    price: [],
    collection: Array.isArray(category) ? category : category ? [category] : [],
    size: [],
    color: [],
    fabric: [],
    craft: [],
    occasion: Array.isArray(category) ? category : category ? [category] : [],
    dupatta: [],
    discount: [], // example: [10, 50] → between 10% and 50%
  });

  // Data from API
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await getBanner();
        console.log("banner", res);
        setBanner(res);
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    };

    fetchBanner();
  }, []);
  // 🔹 Convert filter state into params object for API
  // 🛠 Convert filters state into query params
  const buildParams = (filters, currentPage = 1, sortBy = "newest") => {
    const params = {
      page: currentPage,
      limit: 12,
      sortBy, // backend expects "sortBy", not "sort"
    };

    const normalize = (arr) =>
      Array.isArray(arr) && arr.length ? arr.join(",") : undefined;
    // 🎨 Color → backend expects `colour`
    if (filters.color.length) {
      params.colour = normalize(filters.color); // Express will handle ?colour=Red&colour=Blue
    }

    // 📏 Size
    if (filters.size.length) {
      params.size = normalize(filters.size); // backend supports ?size=M&size=XL
    }

    // 🧵 Fabric
    if (filters.fabric.length) {
      params.fabric = normalize(filters.fabric);
    }

    // 🎨 Craft → backend expects `work`
    if (filters.craft.length) {
      params.work = normalize(filters.craft);
    }

    // 🎉 Occasion → backend expects `collections`
    if (filters.occasion.length) {
      params.occasion = normalize(filters.occasion);
    }

    // 👗 Collection → backend expects `categories`
    if (filters.collection.length) {
      params.collection = normalize(filters.collection);
    }

    // 🧣 Dupatta (⚠️ not in backend code — you may need to add)
    if (filters.dupatta.length) {
      params.dupatta = normalize(filters.dupatta)
    }

    // 💰 Price buckets → map labels to minPrice / maxPrice
    if (filters.price.length) {
      filters.price.forEach((range) => {
        if (range === "Under ₹500") {
          params.minPrice = 0;
          params.maxPrice = 500;
        } else if (range === "₹500 - ₹1000") {
          params.minPrice = 500;
          params.maxPrice = 1000;
        } else if (range === "₹1000 - ₹2000") {
          params.minPrice = 1000;
          params.maxPrice = 2000;
        } else if (range === "Above ₹2000") {
          params.minPrice = 2000;
        }
      });
    }

    // 🔖 Discount
    if (filters.discount.length) {
      params.minDiscount = filters.discount[0];
    }

    return params;
  };
  // 🔹 Fetch products from API
  const fetchProducts = async () => {
    try {
      const data = await filterProduct(
        buildParams(filters, currentPage, sortBy)
      );
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("filters", filters);
  console.log("Final Params 👉", buildParams(filters));
  // Run whenever filters, page, or sort change
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage, sortBy]);

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
    setCurrentPage(1); // reset to first page
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
    setCurrentPage(1);
  };

  // Selected filter tags
  const selectedFilters = Object.entries(filters).flatMap(([type, values]) =>
    values.map((v) => ({ type, value: v }))
  );

  console.log("selectedFilters", selectedFilters);
  console.log("products", products);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff", // optional
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
        <p style={{ marginTop: "1rem", fontSize: "18px", color: "#333" }}>
          Please wait, loading...
        </p>
      </div>
    ); // or a spinner component
  }

  return (
    <div>
      <NavbarMenu />
      <br />
      <div
        style={{ width: "100%", boxSizing: "border-box" }}
        className={styles.CategoryProductBanner}
      >
        <img
          src={banner[0]?.imageUrl}
          style={{ width: "100%", height: "100%" }}
          alt="Banner"
        />
      </div>
      <br />
      <Container fluid className={styles.categoryProductContainer}>
        <BreadcrumbSinglePage />
        <Row >
          {/* Left Filters */}
         <Col
            md={2}
            style={{ background: "#f8f9fa", padding: "20px" }}
            className={styles.filterBox}
          >
            <h5>Filters</h5>
            <Accordion defaultActiveKey="0" alwaysOpen>
              {/* Price */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>Shop by Price</Accordion.Header>
                <Accordion.Body>
                  {[
                    "Under ₹3000",
                    "₹3000 - ₹6000",
                    "₹6000 - ₹10000",
                    "Above ₹10000",
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

              <Accordion.Item eventKey="8">
                <Accordion.Header>Discount</Accordion.Header>
                <Accordion.Body>
                  {["Upto - 10%", "10 - 25%", "25 - 50%", "Above 50%"].map(
                    (val, idx) => (
                      <Form.Check
                        key={idx}
                        type="checkbox"
                        label={val}
                        checked={filters.discount.includes(val)}
                        onChange={() => handleFilterChange("discount", val)}
                      />
                    )
                  )}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header>Occasion</Accordion.Header>
                <Accordion.Body>
                  {[
                    "Casual",
                    "Workwear",
                    "Everyday",
                    "Party",
                    "Wedding",
                    "Festive",
                    "Gifting",
                  ].map((val) => (
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

              {/* Color */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>Color Shades</Accordion.Header>
                <Accordion.Body>
                  {[
                    "White",
                    "Pink",
                    "Red",
                    "Black",
                    "Green",
                    "Blue",
                    "Yellow",
                    "Purple",
                    "Multicolour",
                  ].map((val) => (
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
                  {[
                    "Silk",
                    "Modal Silk",
                    "Glass Silk",
                    "Shimmer Silk",
                    "Organza Silk",
                    "Viscose Silk",
                    "Cotton Silk",
                    ,
                    "Tissue",
                    "Geogett",
                    "Crepe",
                    "Shaneel(Chenille)",
                    "Velvet",
                    "Chanderi",
                    "Linen",
                    "Cotton",
                  ].map((val) => (
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
                  {[
                    "Dabka Work",
                    "Mirror Work",
                    "Resham Work",
                    "Sequins Work",
                    "Bead Work",
                    "Pearl Work",
                    "Sarahi Work",
                    "Kahmiri Tilla",
                    "Pitta Work",
                    "Zardosi",
                    "Anchor Threads",
                    "Machine Threads",
                    "Hand Painting",
                    "Block Painting",
                  ].map((val) => (
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

              {/* Other filter sections (category, size, color, etc.) */}
              {/* Example for Category */}
              {/* <Accordion.Item eventKey="1">
                <Accordion.Header>Collection</Accordion.Header>
                <Accordion.Body>
                  {["Sarees", "Lehengas", "Kurtis", "Suits"].map((val) => (
                    <Form.Check
                      key={val}
                      type="checkbox"
                      label={val}
                      checked={filters.collections.includes(val)}
                      onChange={() => handleFilterChange("collections", val)}
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item> */}
              {/* Repeat for Size, Color, Fabric, Craft, Occasion, Dupatta */}
              {/* Size */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                  {["XS", "S", "M", "L", "XL","XXL","3XL","4XL"].map((val) => (
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

              {/* Occasion */}

              {/* Include Dupatta */}
             
            </Accordion>
          </Col>

          {/* Right Product Section */}
          <Col md={10}>
            {/* Selected filters */}
            {selectedFilters?.length > 0 && (
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
                  {selectedFilters?.map((filter, idx) => (
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
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            [filter.type]: prev[filter.type].filter(
                              (v) => v !== filter.value
                            ),
                          }))
                        }
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

            {/* Sorting + Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {/* Pagination buttons */}
              <div>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
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

              {/* Sort By */}
              <div>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ padding: 10, paddingRight: 5, outline: "none" }}
                >
                  <option value="bestseller">Best Seller</option>
                  <option value="newest">New Arrival</option>
                  <option value="popularity">Popularity</option>
                  <option value="highmrp">Price: High to Low</option>
                  <option value="lowmrp">Price: Low to High</option>
                </select>
              </div>
            </div>

            <ProductList products={products} />
          </Col>
        </Row>
      </Container>
      <br />
      <Footer />
    </div>
  );
}
