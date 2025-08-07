import React from "react";

export default function BreadcrumbSinglePage() {
  const breadcrumbPaths = [
    { label: "Home", link: "/" },
    { label: "Buy", link: "/buy" },
    { label: "Flash-sale-discount" }, // Current page - no link
  ];

  return (
    <nav style={styles.breadcrumb}>
      {breadcrumbPaths.map((item, index) => (
        <span key={index}>
          {item.link ? (
            <a href={item.link} style={styles.link}>
              {item.label}
            </a>
          ) : (
            <span style={styles.current}>{item.label}</span>
          )}
          {index < breadcrumbPaths.length - 1 && (
            <span style={styles.separator}> / </span>
          )}
        </span>
      ))}
    </nav>
  );
}

const styles = {
  breadcrumb: {
    fontSize: "0.95rem",
    color: "#555",
    margin: "10px 0 20px 0",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  current: {
    color: "#333",
    fontWeight: "500",
  },
  separator: {
    margin: "0 5px",
    color: "#999",
  },
};
