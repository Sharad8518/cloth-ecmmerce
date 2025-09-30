import React, { useEffect, useState } from "react";
import {
  addBanner,
  editBanner,
  getBanner,
  getActiveBanner,
  deleteBanner,
} from "../../api/admin/bannerApi";
import { Table, Button, Modal, Form, Image } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);


  const [formData, setFormData] = useState({
    title: "",
    message: "",
    startDate: "",
    showOn: "",
    endDate: "",
    image: null,
    active: true,
  });

  // Load banners
  const fetchBanners = async () => {
    const data = await getBanner();
    setBanners(data.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleSave = async () => {
    const fd = new FormData();
    // append simple fields
    fd.append("title", formData.title);
    fd.append("message", formData.message);
    fd.append("showOn", formData.showOn);
    fd.append("startDate", formData.startDate);
    fd.append("endDate", formData.endDate);
    fd.append("active", formData.active);

    // append image file if selected
    if (formData.image) {
      fd.append("image", formData.image); // must match upload.single("image")
    }

    if (editing) {
      await editBanner(editing._id, fd); // PUT /banner/:id
    } else {
      await addBanner(fd); // POST /banner
    }

    setShowModal(false);
    setEditing(null);
    setFormData({
      title: "",
      message: "",
      showOn: "",
      startDate: "",
      endDate: "",
      image: null,
      active: true,
    });
    fetchBanners();
  };

  const handleEdit = (banner) => {
    setEditing(banner);
    setFormData({
      title: banner.title,
      message: banner.message,
      showOn:banner.showOn,
      startDate: banner.startDate ? banner.startDate.split("T")[0] : "",
      endDate: banner.endDate ? banner.endDate.split("T")[0] : "",
      image: null,
      active: banner.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this banner?")) {
      await deleteBanner(id);
      fetchBanners();
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Banner Management</h3>
        <Button
          onClick={() => {
            setEditing(null);
            setFormData({
              title: "",
              message: "",
              showOn: "",
              startDate: "",
              endDate: "",
              image: null,
              active: true,
            });
            setShowModal(true);
          }}
        >
          + Add Banner
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Message</th>
            <th>Start</th>
            <th>End</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners?.map((b) => (
            <tr key={b._id}>
              <td>
                {b.imageUrl && (
                  <Image src={b.imageUrl} thumbnail style={{ width: "80px" }} />
                )}
              </td>
              <td>{b.title}</td>
              <td>{b.message}</td>
              <td>{b.startDate?.slice(0, 10)}</td>
              <td>{b.endDate?.slice(0, 10)}</td>
              <td>{b.active ? "✅" : "❌"}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleEdit(b)}
                  className="me-2"
                >
                  <FiEdit3 />
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(b._id)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Banner" : "Add Banner"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Title */}
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Message */}
            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Start Date */}
            <Form.Group className="mb-2">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>

            {/* End Date */}
            <Form.Group className="mb-2">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Show On Dropdown */}
            <Form.Group className="mb-2">
              <Form.Label>Show On</Form.Label>
              <Form.Select
                name="showOn"
                value={formData.showOn || ""}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="new-in">New-In</option>
                <option value="Embroidery-Luxe">Embroidery Luxe</option>
                <option value="Everyday-Elegance">Everyday Elegance</option>
                <option value="indoWestern">Indo-Western</option>
                <option value="Jwellery">Jewellery</option>
                <option value="potilis">Potlis</option>
                <option value="Mens">Mens</option>
                 <option value="Sale">Sale</option>
              </Form.Select>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />

              {/* Show old image when editing (if no new image selected) */}
              {editing?.imageUrl && !formData.image && (
                <Image
                  src={editing.imageUrl}
                  thumbnail
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}

              {/* Show preview of new image if user selects one */}
              {formData.image && (
                <Image
                  src={URL.createObjectURL(formData.image)}
                  thumbnail
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            {/* Active Checkbox */}
            <Form.Check
              type="checkbox"
              label="Active"
              name="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BannerManager;
