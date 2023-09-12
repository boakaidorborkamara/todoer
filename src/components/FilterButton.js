import React from "react";

function FilterButton(props) {
  console.log("PROPS", props);
  return (
    <button
      type="button"
      className="btn toggle-btn filter-btn"
      aria-pressed="true"
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
