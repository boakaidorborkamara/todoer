import React from "react";

function FilterButton(props) {
  // handles fitering of task base on the status selected
  function handleFilter() {
    props.getTasksType(props.name);
  }

  return (
    <button
      type="button"
      className="btn toggle-btn filter-btn"
      aria-pressed="true"
      onClick={handleFilter}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
