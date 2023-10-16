const phoneValidator = (countryCode, value) => {
  if (
    /^\+0*1\s*$/.test(countryCode) &&
    value &&
    !/^(?:(?:\(\d\d\d\)-?)|(?:\d\d\d-?))\d\d\d-?\d\d\d\d$/.test(value.trim())
  )
    return "invalid phone number";
};

export default phoneValidator;
