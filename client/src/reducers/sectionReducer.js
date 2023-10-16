import InitialState from "../states";
import t from "../actionTypes";

const sectionReducer = (state = InitialState.sectionStatus, action = {}) => {
  if (action.type === t.setSectionStatus) {
    let newState = { ...state };
    newState[action.sectionKey] = action.status;
    return newState;
  } else return state;
};

export default sectionReducer;
