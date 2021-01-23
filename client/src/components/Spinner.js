import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner-grow"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
