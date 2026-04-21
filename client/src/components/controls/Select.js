import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

// inputId is explicitly named so callers know it must match the paired <label htmlFor>.
// Without inputId, react-select generates a random internal id that no label can target.
const Select = ({ inputId, ...props }) => {
  return <ReactSelect inputId={inputId} classNamePrefix="cedcd-select" {...props} />;
};

Select.propTypes = {
  inputId: PropTypes.string.isRequired,
};

export default Select;
