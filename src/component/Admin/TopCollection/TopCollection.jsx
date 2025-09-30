import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
   Row,
  Col,
  Card,
  Form,
  Spinner,
  Image,
} from "react-bootstrap";
import { getProducts } from "../../api/user/Productapi";
import {getAllTopCollection,
  addOrUpdateTopCollection,
getTopCollectionById,
updateTopCollectionItem,
deleteTopCollectionItem,
updateTopCollectionsProducts} from "../../api/admin/topCollectionApi";

import Pagination from "react-bootstrap/Pagination";
import styles from "./TopCollection.module.css"
export default function TopCollection() {
  const [collections, setCollections] = useState([]);
  const [form, setForm] = useState({ title: "", description: "",  imageFile: null,   
  imagePreview: "",})  // base64  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch collections
  const fetchCollections = async () => {
    try {
      const res = await getAllTopCollection();
      setCollections(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    // Only append the file if it exists
    if (form.imageFile) {
      formData.append("image", form.imageFile); // MUST match multer.single('image')
    }
      if (editingId) {
        await updateTopCollectionItem(editingId,formData);
      } else {
        await addOrUpdateTopCollection(form);
      }
      setForm({ title: "", description: "", imageFile: "" });
      setEditingId(null);
      setShowModal(false);
      fetchCollections();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?")) return;
    try {
      await deleteTopCollectionItem(id);
      fetchCollections();
    } catch (err) {
      console.error(err);
    }
  };

  // Set form for editing
  const handleEdit = (collection) => {
    setForm({
      title: collection.title,
      description: collection.description || "",
      imageFile: collection.image,
    });
    setEditingId(collection._id);
    setShowModal(true);
  };

  // Manage products
  const handleManageProducts = async (id) => {
    // const addProducts = prompt("Enter product IDs to add (comma separated):");
    // const removeProducts = prompt("Enter product IDs to remove (comma separated):");

    // try {
    //   await axios.patch(`/collections/${id}/products`, {
    //     addProducts: addProducts ? addProducts.split(",").map((p) => p.trim()) : [],
    //     removeProducts: removeProducts ? removeProducts.split(",").map((p) => p.trim()) : [],
    //   });
    //   fetchCollections();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // Handle drag and drop image
const handleDrop = (e) => {
  e.preventDefault();
  setDragOver(false);

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    setForm({
      ...form,
      imageFile: file,                     // store File
      imagePreview: URL.createObjectURL(file), // preview
    });
  }
};

// File input
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    setForm({
      ...form,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  }
};
const [isloading, setIsLoading] = useState(true);
  const [limit] = useState(12);
 const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectRemoveProduct,setSelectRemoveProduct] =useState([])
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [topCollectionProduct,setTopCollectionProduct] =useState()
  const [addProductLoading,setAddProductLoading] =useState(false)
  const [removeProductLoading,setRemoveProductLoading] =useState(false)
  const [selectedCollectionName, setSelectedCollectionName] = useState("");
   const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

   const toggleRemoveSelectProduct = (id) => {
    setSelectRemoveProduct((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
const handleAddProducts = async () => {
    if (!selectedProducts.length) return;
    try {
      setAddProductLoading(true)
      await updateTopCollectionsProducts(topCollectionProduct._id, {addProducts:selectedProducts });
      setSelectedProducts([]);
      fetchCollections(); // refresh list
    } catch (err) {
      console.error(err);
    }finally{
      setAddProductLoading(false)
    }
  };

  // Remove products
  const handleRemoveProducts = async () => {
    if (!selectRemoveProduct.length) return;
    try {
      setRemoveProductLoading(true)
      await updateTopCollectionsProducts(topCollectionProduct._id, { removeProducts: selectRemoveProduct });
      setSelectRemoveProduct([]);
      fetchCollections(); // refresh list
    } catch (err) {
      console.error(err);
    }finally{
      setRemoveProductLoading(false)
    }
  };

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const queryParams = {
            search: searchTerm || undefined,
            header: category || undefined,
            page,
            limit,
          };
          const response = await getProducts(queryParams);
  
          setAllProducts(response.products);
          setPages(response.pages); // total pages from backend
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProducts();
    }, [searchTerm, category, page, limit]);
  
  const renderPagination = () => {
      let items = [];
      for (let number = 1; number <= pages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === page}
            onClick={() => setPage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    }
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Home Collections</h2>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setForm({ title: "", description: "", imageFile: "" });
          }}
        >
          + Add Collection
        </Button>
      </div>

      {/* Collections Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((col) => (
            <tr key={col._id}>
              <td>
                <Image
                  src={col.image}
                  alt={col.title}
                  style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>{col.title}</td>
              <td>{col.description}</td>
           
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(col)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(col._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => setTopCollectionProduct(col)}
                >
                  Manage Products
                </Button>
              </td>
            </tr>
          ))}
          {collections?.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No collections found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div style={{display:"flex",justifyContent:"space-between"}}>
               <h4>Available Product</h4>
                  {selectRemoveProduct?.length > 0 && (
                  <Button variant="danger" onClick={handleRemoveProducts} 
                   disabled={addProductLoading || selectRemoveProduct.length === 0}
                  >
                    Delete Product ({selectRemoveProduct.length})
                  </Button>
                )}
            </div>
      
           
            {topCollectionProduct?.product?.length > 0 ? (
              <div className="overflow-x-auto py-2 hide-scrollbar">
              <Row className="g-2 flex-nowrap">
                {topCollectionProduct?.product?.map((product) => {
                   const isSelectedR = selectRemoveProduct?.includes(product._id);
                  return (
                    <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
                      <Card
                        className={`h-100 text-center`}
                        style={{ cursor: "pointer", }}
                        onClick={() => toggleRemoveSelectProduct(product._id)}
                      >
                        <Card.Img
                          variant="top"
                          src={product.media?.[0]?.url}
                          alt={product.title}
                          className={styles.smallProductImage}
                        />
                        <Card.Body className="p-2 d-flex flex-column">
                          <Card.Title
                            className=" mb-1 text-truncate"
                            style={{ maxWidth: "200px", fontSize: 14 }}
                          >
                            {product.title}
                          </Card.Title>
                          <Card.Text
                            className="text-muted small mb-2 text-truncate"
                            style={{ flexGrow: 1, maxWidth: "200px" }}
                          >
                            {product.description}
                          </Card.Text>
                          <Form.Check
                             type="checkbox"
                             label="Select"
                             checked={isSelectedR}
                           
                             onChange={(e) =>
                               e.stopPropagation() || toggleRemoveSelectProduct(product._id)
                             }
                            className={`${styles.customCheckbox} small`}
                           />
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              </div>
            ) : (
              <p>No products found in this collection.</p>
            )}
      
            <br />
      
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                {selectedProducts?.length > 0 && (
                  <Button variant="primary" onClick={handleAddProducts} 
                   disabled={addProductLoading ||  topCollectionProduct?._id === null}
                  >
                    Add Product ({selectedProducts.length})
                  </Button>
                )}
                {/* Search Input */}
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 300 }}
                />
      
                {/* Category Select */}
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: 200 }}
                >
                  <option value="">Select Category</option>
                  <option value="Designer Suit">Designer Suit</option>
                  <option value="Indo Western">Indo Western</option>
                  <option value="Kurta Set">Kurta Set</option>
                  <option value="Jwellery">Jwellery</option>
                  <option value="Mens">Mens</option>
                </Form.Select>
              </div>
      
              {/* Show Selected Button */}
            </div>
            <hr />
      
            <Row className="g-2">
              {allProducts?.map((product) => {
                const isSelected = selectedProducts?.includes(product._id);
                return (
                  <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
                    <Card
                      className={`h-100 text-center`}
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSelectProduct(product._id)}
                    >
                      <Card.Img
                        variant="top"
                        src={product.media?.[0]?.url}
                        alt={product.title}
                        className={styles.smallProductImage}
                      />
                      <Card.Body className="p-2 d-flex flex-column">
                        <Card.Title
                          className=" mb-1 text-truncate"
                          style={{ maxWidth: "200px", fontSize: 14 }}
                        >
                          {product.title}
                        </Card.Title>
                        <Card.Text
                          className="text-muted small mb-2 text-truncate"
                          style={{ flexGrow: 1, maxWidth: "200px" }}
                        >
                          {product.description}
                        </Card.Text>
                        <Form.Check
                          type="checkbox"
                          label="Select"
                          checked={isSelected}
                          onChange={(e) =>
                            e.stopPropagation() || toggleSelectProduct(product._id)
                          }
                          className="small"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            {renderPagination()}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Collection" : "Add Collection"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Form.Group>

            {/* Drag & Drop Image */}
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <div
                className={`border rounded p-3 text-center ${
                  dragOver ? "bg-light border-primary" : "border-secondary"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
                style={{ cursor: "pointer" }}
              >
                {form.imagePreview  ? (
                  <Image
                    src={form.imagePreview }
                    alt="Preview"
                    thumbnail
                    style={{ maxHeight: "150px" }}
                  />
                ) : (
                  <p className="text-muted">Drag & Drop or Click to Select Image</p>
                )}
                <Form.Control
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="d-none"
                  onChange={handleFileSelect}
                />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />{" "}
                    Saving...
                  </>
                ) : editingId ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
