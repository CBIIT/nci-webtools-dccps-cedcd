const yearValidator = (value, isRequired, canBeFuture = true) => {
  let pattern = /^\s*(?:(19\d\d)|(2\d\d\d))\s*$/;
  if (isRequired && !value) return "Required Field";
  if (!pattern.test(value)) return "Invalid year";
  if (!canBeFuture && +value > new Date().getFullYear()) return "Expecting year in the past";
  else if (canBeFuture && +value < new Date().getFullYear()) return "Enrollment should not complete in the past";
};

export default yearValidator;
