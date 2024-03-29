import actionTypes from "../actionTypes";
import t from "../actionTypes";
import InitialStates from "../states";
const enrollmentCountsReducer = (state = InitialStates.enrollmentCount, action = {}) => {
  switch (action.type) {
    case t.renewEnrollmentCounts:
      return { ...action.value };
    case t.updateEnrollmentCount:
      let shallow = { ...state };
      if (/^\d*$/.test(action.value.trim())) shallow[action.cell] = action.value;
      return shallow;
    case t.updateTotals:
      let stateCopy = { ...state };
      if (/^\d*$/.test(String(action.value).trim())) stateCopy[action.cell] = action.value;
      return stateCopy;
    case t.updateMostRecentDate:
      return {
        ...state,
        mostRecentDate: action.dateString,
      };
    case t.enrollmentCountLoaded:
      return {
        ...state,
        hasLoaded: action.value,
      };
    case t.setSectionBStatus:
      return {
        ...state,
        sectionBStatus: action.value,
      };
    default:
      return state;
  }
};

export default enrollmentCountsReducer;
