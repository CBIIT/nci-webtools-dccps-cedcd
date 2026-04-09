import React from 'react';
import Select from 'react-select';

// inputId is explicitly named so callers know it must match the paired <label htmlFor>.
// Without inputId, react-select generates a random internal id that no label can target.
const AccessibleSelect = ({ inputId, ...props }) => {
  return <Select inputId={inputId} {...props} />;
};

export default AccessibleSelect;
