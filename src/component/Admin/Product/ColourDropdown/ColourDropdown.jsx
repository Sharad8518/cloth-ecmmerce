import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const colourOptions = [
  { value: "Black", label: "Black", color: "#000000" },
  { value: "White", label: "White", color: "#FFFFFF" },
  { value: "Red", label: "Red", color: "#FF0000" },
  { value: "Blue", label: "Blue", color: "#0000FF" },
  { value: "Green", label: "Green", color: "#008000" },
  { value: "Yellow", label: "Yellow", color: "#FFFF00" },
  { value: "Pink", label: "Pink", color: "#FFC0CB" },
  { value: "Purple", label: "Purple", color: "#800080" },
  { value: "Orange", label: "Orange", color: "#FFA500" },
  { value: "Brown", label: "Brown", color: "#8B4513" },
  { value: "Grey", label: "Grey", color: "#808080" },
  { value: "Beige", label: "Beige", color: "#F5F5DC" },
  { value: "Navy", label: "Navy", color: "#000080" },
  { value: "Maroon", label: "Maroon", color: "#800000" },
  { value: "Olive", label: "Olive", color: "#808000" },
  { value: "Teal", label: "Teal", color: "#008080" },
  { value: "Gold", label: "Gold", color: "#FFD700" },
  { value: "Silver", label: "Silver", color: "#C0C0C0" },
];

// Custom rendering with swatch + label
const customStyles = {
  option: (styles, { data, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? "#f0f0f0" : isSelected ? "#e0e0e0" : "#fff",
    color: "#000",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
};

const formatOptionLabel = ({ label, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <span
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: color,
        border: "1px solid #ccc",
      }}
    ></span>
    {label}
  </div>
);

export default function ColourDropdown({ product, setProduct }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:500,fontSize:14}}>Colour</Form.Label>
      <Select
        options={colourOptions}
        style={{ fontSize: 14 }}
        value={colourOptions.find(c => c.value === product.colour) || null}
        onChange={(selected) =>
          setProduct((prev) => ({ ...prev, colour: selected.value }))
        }
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        placeholder="Select Colour"
        isClearable
      />
    </Form.Group>
  );
}
