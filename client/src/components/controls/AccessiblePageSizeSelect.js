import React from "react";

const AccessiblePageSizeSelect = ({ id = 'page-size-select', value, onChange, options }) => {
  return (
    <span>
      <label htmlFor={id}>Page Size</label>{' '}
      <select id={id} value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </span>
  );
};

export default AccessiblePageSizeSelect;
