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
  Offcanvas,
  Carousel,
} from "react-bootstrap";
import NavbarMenu from "../Navbar/NavbarMenu";
import ProductList from "../ProductList/ProductList";
import BreadcrumbSinglePage from "../layout/BreadcrumbSinglePage";
import Footer from "../Footer/Footer";
import styles from "./Jewellery.module.css";
import { filterProduct } from "../api/user/Productapi";
import { getBanner } from "../api/user/bannerApi";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Anim/loading.json";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import BannerSlider from "../Banner/BannerSlider";

export default function Jewellery() {
  const { category, subName } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);
  // State to track filters
  const [filters, setFilters] = useState({
    header: ["Jwellery"],
    subCategories: Array.isArray(subName) ? subName : subName ? [subName] : [],
    categories: Array.isArray(category) ? category : category ? [category] : [],
    collections: [],
    price: [],
    size: [],
    color: [],
    fabric: [],
    craft: [],
    plating: [],
    occasion: [],
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
    const [showSort, setShowSort] = useState(false);
  

  useEffect(() => {
     const fetchBanner = async () => {
       try {
         const res = await getBanner({ showOn: "Jwellery", active: true });
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

    if (filters.header) {
      params.header = normalize(filters.header); // pass directly
    }

    if (filters.categories.length) {
      params.categories = normalize(filters.categories);
    }

    if (filters.subCategories.length) {
      params.subCategories = normalize(filters.subCategories);
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

    // 🎉 Occasion → backend expects `occasion`
    if (filters.plating.length) {
      params.plating = normalize(filters.plating);
    }

    if (filters.occasion.length) {
      params.occasion = normalize(filters.occasion);
    }

    // 👗 Collection → backend expects `categories`
    if (filters.collections.length) {
      params.collections = normalize(filters.collections);
    }

    // 👗 Collection → backend expects `categories`

    // 🧣 Dupatta (⚠️ not in backend code — you may need to add)
    if (filters.dupatta.length) {
      params.dupatta = filters.dupatta;
    }

    // 💰 Price buckets → map labels to minPrice / maxPrice
    if (filters.price.length) {
      filters.price.forEach((range) => {
        if (range === "Under ₹500") {
          params.minPrice = 0;
          params.maxPrice = 500;
        } else if (range === "₹500 - ₹1500") {
          params.minPrice = 500;
          params.maxPrice = 1500;
        } else if (range === "₹1500 - ₹3000") {
          params.minPrice = 1500;
          params.maxPrice = 3000;
        } else if (range === "Above ₹3000") {
          params.minPrice = 3000;
        }
      });
    }

    // 🔖 Discount
    if (filters.discount.length) {
      filters.discount.forEach((range) => {
        if (range === "Upto 10%") {
          params.minDiscount = 0;
          params.maxDiscount = 10;
        } else if (range === "10% - 25%") {
          params.minDiscount = 10;
          params.maxDiscount = 25;
        } else if (range === "25% - 50%") {
          params.minDiscount = 25;
          params.maxDiscount = 50;
        } else if (range === "Above 50%") {
          params.minDiscount = 50;
        }
      });
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
      collections: [],
      size: [],
      color: [],
      fabric: [],
      plating: [],
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
    <div width="100%" style={{ backgroundColor: "#f1f2f6",overflowX:"hidden" ,display:"flex",flexDirection:"column",alignItems:"center" }}>
      <NavbarMenu />
     
      <div
        style={{ width: "100%", boxSizing: "border-box" }}
        className={styles.CategoryProductBanner}
      >
        <Carousel>
          {banner.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.imageUrl}
                alt={`Banner ${index + 1}`}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {/* <BannerSlider/> */}
      <br />
      <div className={styles.mainProductContainer}>
        <div className={styles.categoryProductContainer}>
          <div style={{ display: "flex" }}>
            <BreadcrumbSinglePage />
            <span style={{ marginTop: 10, marginLeft: 5 }}>
              {" "}
              / Indo Western
            </span>
            <span style={{ marginTop: 10, marginLeft: 5 }}> / {subName}</span>
          </div>
          <Row>
            {/* Left Filters */}
            <Col
              md={3}
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
                      "Under ₹500",
                      "₹500 - ₹1500",
                      "₹1500 - ₹3000",
                      "Above ₹3000",
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

                {/* Occasion */}
                <Accordion.Item eventKey="6">
                  <Accordion.Header>Occasion</Accordion.Header>
                  <Accordion.Body>
                    {[
                      "Casual",
                      "Workwear",
                      "Everyday",
                      "Party",
                      "Festivel",
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
                  <Accordion.Header>Color</Accordion.Header>
                  <Accordion.Body>
                    {[
                      "Golden Finish",
                      "Silver Finish",
                      "Antique Finish",
                      "Dual Stone Finish",
                      "Green Stone",
                      "Blue Stone",
                      "Yellow Stone",
                      "Multicolor",
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

                <Accordion.Item eventKey="9">
                  <Accordion.Header>Material</Accordion.Header>
                  <Accordion.Body>
                    {[
                      "Brass",
                      "Cropper",
                      "Nickel Silver",
                      "Stainless Steel",
                      "Alloy",
                    ].map((val) => (
                      <Form.Check
                        key={val}
                        type="checkbox"
                        label={val}
                        checked={filters.color.includes(val)}
                        onChange={() => handleFilterChange("fabric", val)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                {/* Other filter sections (category, size, color, etc.) */}
                {/* Example for Category */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Plating</Accordion.Header>
                  <Accordion.Body>
                    {[
                      "Silver Plating",
                      "Gold Plating",
                      "Rose Gold Plating",
                      "Rhodium Plating",
                      "Oxidized",
                    ].map((val) => (
                      <Form.Check
                        key={val}
                        type="checkbox"
                        label={val}
                        checked={filters.plating.includes(val)}
                        onChange={() => handleFilterChange("plating", val)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>

          

            {/* Offcanvas for Mobile */}
            <Offcanvas
              show={showFilters}
              onHide={handleCloseFilters}
              placement="start"
              style={{ width: "70%" }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Accordion defaultActiveKey="0" alwaysOpen>
                  {/* Copy same Accordion.Items as desktop filters */}
                  {/* Price */}
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Shop by Price</Accordion.Header>
                    <Accordion.Body>
                      {[
                        "Under ₹500",
                        "₹500 - ₹1500",
                        "₹1500 - ₹3000",
                        "Above ₹3000",
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

                  {/* Occasion */}
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Occasion</Accordion.Header>
                    <Accordion.Body>
                      {[
                        "Casual",
                        "Workwear",
                        "Everyday",
                        "Party",
                        "Festivel",
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
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                      {[
                        "Golden Finish",
                        "Silver Finish",
                        "Antique Finish",
                        "Dual Stone Finish",
                        "Green Stone",
                        "Blue Stone",
                        "Yellow Stone",
                        "Multicolor",
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

                  <Accordion.Item eventKey="9">
                    <Accordion.Header>Material</Accordion.Header>
                    <Accordion.Body>
                      {[
                        "Brass",
                        "Cropper",
                        "Nickel Silver",
                        "Stainless Steel",
                        "Alloy",
                      ].map((val) => (
                        <Form.Check
                          key={val}
                          type="checkbox"
                          label={val}
                          checked={filters.color.includes(val)}
                          onChange={() => handleFilterChange("fabric", val)}
                        />
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Other filter sections (category, size, color, etc.) */}
                  {/* Example for Category */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Plating</Accordion.Header>
                    <Accordion.Body>
                      {[
                        "Silver Plating",
                        "Gold Plating",
                        "Rose Gold Plating",
                        "Rhodium Plating",
                        "Oxidized",
                      ].map((val) => (
                        <Form.Check
                          key={val}
                          type="checkbox"
                          label={val}
                          checked={filters.plating.includes(val)}
                          onChange={() => handleFilterChange("plating", val)}
                        />
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Add other filters here same as desktop */}
                </Accordion>
              </Offcanvas.Body>
            </Offcanvas>
            {/* Right Product Section */}
            <Col md={9}>
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
                <div className={styles.sortByContainer}>
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
        </div>
      </div>
      <br />
      <Footer />
      {showSort && (
        <div
          className={styles.sortDropdownOverlay}
          onClick={() => setShowSort(false)} // click outside closes
        >
          <div
            className={styles.sortDropdownContainer}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortDropdownSelect}
            >
              <option value="bestseller">Best Seller</option>
              <option value="newest">New Arrival</option>
              <option value="popularity">Popularity</option>
              <option value="highmrp">Price: High to Low</option>
              <option value="lowmrp">Price: Low to High</option>
            </select>
          </div>
        </div>
      )}

      <div className={styles.mobileBottomBar}>
        <button
          className={styles.mobileBottomBarButton}
          onClick={handleShowFilters}
        >
          Filter
        </button>
        <button
          className={styles.mobileBottomBarButton}
          // onClick={() => setShowSort(true)}
          onClick={() => setShowSort(true)}
        >
          Sort By
        </button>
      </div>
    </div>
  );
}
