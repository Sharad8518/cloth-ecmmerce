import React, { useEffect, useState } from "react";
import {
  addPromotion,
  editPromotion,
  getPromotion,
  deletePromotion,
} from "../api/admin/promotionApi";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({
    topBannerText: "",
    promoOffers: [{ condition: "", reward: "" }],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await getPromotion();
      setPromotions(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChangeOffer = (index, field, value) => {
    const updatedOffers = [...formData.promoOffers];
    updatedOffers[index][field] = value;
    setFormData({ ...formData, promoOffers: updatedOffers });
  };

  const addOffer = () => {
    setFormData({
      ...formData,
      promoOffers: [...formData.promoOffers, { condition: "", reward: "" }],
    });
  };

  const removeOffer = (index) => {
    const updatedOffers = formData.promoOffers.filter((_, i) => i !== index);
    setFormData({ ...formData, promoOffers: updatedOffers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await editPromotion(editingId, formData);
        setEditingId(null);
      } else {
        await addPromotion(formData);
      }
      setFormData({ topBannerText: "", promoOffers: [{ condition: "", reward: "" }] });
      fetchPromotions();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (promo) => {
    setEditingId(promo._id);
    setFormData({
      topBannerText: promo.topBannerText,
      promoOffers: promo.promoOffers.length ? promo.promoOffers : [{ condition: "", reward: "" }],
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deletePromotion(id);
        fetchPromotions();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Promotions Management</h1>

      {/* Promotion Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Promotion" : "Add Promotion"}
        </h2>

        <input
          type="text"
          placeholder="Top Banner Text"
          value={formData.topBannerText}
          onChange={(e) =>
            setFormData({ ...formData, topBannerText: e.target.value })
          }
          className="p-2 border rounded w-full mb-4"
          required
        />

        <div>
          <h3 className="font-semibold mb-2">Promo Offers</h3>
          {formData.promoOffers.map((offer, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Condition"
                value={offer.condition}
                onChange={(e) => handleChangeOffer(index, "condition", e.target.value)}
                className="p-2 border rounded flex-1"
                required
              />
              <input
                type="text"
                placeholder="Reward"
                value={offer.reward}
                onChange={(e) => handleChangeOffer(index, "reward", e.target.value)}
                className="p-2 border rounded flex-1"
                required
              />
              <button
                type="button"
                onClick={() => removeOffer(index)}
                className="px-2 py-1 bg-red-500 text-black rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOffer}
            className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 mt-2"
          >
            Add Offer
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
        >
          {editingId ? "Update Promotion" : "Create Promotion"}
        </button>
      </form>

      {/* Promotions Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Banner Text</th>
            <th className="border p-2">Offers</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id} className="hover:bg-gray-50">
              <td className="border p-2">{promo.topBannerText}</td>
              <td className="border p-2">
                <ul>
                  {promo.promoOffers.map((offer, i) => (
                    <li key={i}>
                      {offer.condition} → {offer.reward}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  onClick={() => handleEdit(promo)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-black rounded hover:bg-red-600"
                  onClick={() => handleDelete(promo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {promotions.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No promotions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
