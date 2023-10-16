const medianAgeValidator = (value, isRequired, min, max) => {
  if (isRequired && !value) return "Required Filed";
  else if (+value < 0 || +value >= 1000) return "Invalid age";
  else {
    if (parseInt(value) < parseInt(min) || parseInt(value) > parseInt(max)) return "Out Of Age Range";
  }
};

export default medianAgeValidator;
