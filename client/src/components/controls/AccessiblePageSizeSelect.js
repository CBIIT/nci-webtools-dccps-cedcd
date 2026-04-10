import React from "react";
import PropTypes from "prop-types";

const AccessiblePageSizeSelect = ({ id, value, onChange, options }) => {
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

AccessiblePageSizeSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })),
};

export default AccessiblePageSizeSelect;
