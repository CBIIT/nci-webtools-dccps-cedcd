const maxAgeValidator = (value, isRequired, minAge, median, mean) => {
  // console.log(value)
  // console.log(/^\s*[0-9][0-9]?[0-9]?\s*$/.test(value))
  if (isRequired && value === "") return "Required Filed";
  else if (+value < 0 || +value >= 1000) {
    return "Invalid age";
  } else if (minAge && parseInt(value) < parseInt(minAge)) return "Max Age Is Less Than Min Age";
  else if (median && +value < median) return "Max age is less than age median";
  else if (mean && +value < mean) return "Max age is less than age mean";
};

export default maxAgeValidator;
