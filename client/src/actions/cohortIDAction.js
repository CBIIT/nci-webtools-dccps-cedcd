import t from "../actionTypes";
/*
const setSpecimenCounts = (countsObj) => ({
    type: t.setSpecimenCounts,
    value: countsObj
})
*/
const setCohortId = (id) => ({
  type: t.setCohortId,
  value: id,
});

export default {
  // setSpecimenCounts,
  setCohortId,
};
