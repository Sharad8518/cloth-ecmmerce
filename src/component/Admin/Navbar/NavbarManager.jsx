import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarManager = () => {
  const [items, setItems] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    url: "",
    icon: "",
    order: 0,
    isActive: true,
    subcategories: [],
  });

  const fetchNavbarItems = async () => {
    // TODO: Replace with API call
    setItems([
      {
        _id: "1",
        label: "Home",
        url: "/",
        icon: "home",
        order: 1,
        isActive: true,
        subcategories: [
          {
            _id: "11",
            label: "Category A",
            subcategories: [
              { _id: "111", label: "Sub A1", url: "/a1", icon: "star" },
              { _id: "112", label: "Sub A2", url: "/a2", icon: "heart" },
            ],
          },
        ],
      },
      {
        _id: "2",
        label: "About",
        url: "/about",
        icon: "info",
        order: 2,
        isActive: true,
        subcategories: [],
      },
    ]);
  };

  useEffect(() => {
    fetchNavbarItems();
  }, []);

  const handleChange = (e, index, sub = false) => {
    const { name, value, type, checked } = e.target;
    if (sub) {
      const updatedSubs = [...formData.subcategories];
      updatedSubs[index][name] = value;
      setFormData({ ...formData, subcategories: updatedSubs });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleAddSubcategory = () => {
    setFormData({
      ...formData,
      subcategories: [
        ...formData.subcategories,
        { label: "", url: "", icon: "", order: 0 },
      ],
    });
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubs = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: updatedSubs });
  };

  const handleSave = async () => {
    if (editingItem) {
      // TODO: Update API
      setItems((prev) =>
        prev.map((i) => (i._id === editingItem._id ? { ...formData } : i))
      );
    } else {
      // TODO: Add API
      setItems((prev) => [...prev, { ...formData, _id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      label: "",
      url: "",
      icon: "",
      order: 0,
      isActive: true,
      subcategories: [],
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // TODO: Delete API
      setItems((prev) => prev.filter((i) => i._id !== id));
      if (selectedHeader?._id === id) setSelectedHeader(null);
    }
  };

  return (
    <div className="p-4">
      {/* Header row with Add button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Manage Navbar</h3>
        <Button onClick={() => setShowModal(true)}>Add Navbar Item</Button>
      </div>

      {/* Headers Row */}
      <div className="flex space-x-3 border-b pb-2 mb-4 overflow-x-auto">
        {items.map((header) => (
          <Button
            key={header._id}
            variant={
              selectedHeader?._id === header._id
                ? "primary"
                : "outline-primary"
            }
            onClick={() => {
              setSelectedHeader(header);
              setSelectedCategory(null);
            }}
          >
            {header.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Categories */}
        <div>
          <h5 className="mb-3 font-semibold">Categories sdfsdf</h5>
          {selectedHeader?.subcategories?.length ? (
            <ul className="list-disc pl-4 space-y-2">
              {selectedHeader.subcategories.map((cat) => (
                <li
                  key={cat._id}
                  className={`cursor-pointer ${
                    selectedCategory?._id === cat._id
                      ? "text-orange-500 font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No categories</p>
          )}
        </div>

        {/* Subcategories */}
        <div className="col-span-2">
          <h5 className="mb-3 font-semibold">Subcategories</h5>
          {selectedCategory?.subcategories?.length ? (
            <div className="grid grid-cols-2 gap-3">
              {selectedCategory.subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="p-3 border rounded-lg hover:shadow-md transition"
                >
                  <h6 className="font-medium text-gray-800">{sub.label}</h6>
                  <p className="text-sm text-gray-500">{sub.url}</p>
                  {sub.icon && (
                    <span className="text-gray-400">Icon: {sub.icon}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Select a category to view subcategories
            </p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingItem(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem ? "Edit Navbar Item" : "Add Navbar Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Order</Form.Label>
              <Form.Control
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingItem ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavbarManager;
