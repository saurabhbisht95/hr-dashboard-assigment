import React from "react";
import "./Topbar.css";

export default function Topbar({ filters = [], actions = [] }) {
  return (
    <div className="topbar">
      <div className="filters">
        {filters.map((filter, idx) => (
          filter.type === "search" ? (
            <input key={idx} type="text" placeholder={filter.placeholder || "Search..."} className="search-input" />
          ) : filter.type === "select" ? (
            <select key={idx} className="filter-select">
              <option>{filter.label}</option>
              {filter.options.map((opt, i) => <option key={i}>{opt}</option>)}
            </select>
          ) : null
        ))}
      </div>

      <div className="actions">
        {actions.map((action, idx) => (
          <button key={idx} className={`btn ${action.variant || "btn-primary"}`} onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
