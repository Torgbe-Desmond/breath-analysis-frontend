import React from "react";

export default function FloatingCounter({ filledInputs, totalInputs }) {
  if (filledInputs === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "90%",
        right: "10%",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "25px",
        fontWeight: "bold",
        fontSize: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {filledInputs} / {totalInputs}
    </div>
  );
}
