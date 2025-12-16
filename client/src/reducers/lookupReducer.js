import t from "../actionTypes";
import InitialStates from "../states";

export default function lookupReducer(state = InitialStates.lookup, action = { type: null }) {
  switch (action.type) {
    case t.setLookup:
      return { ...action.value };
    default:
      return state;
  }
}

export function initializeLookup() {
  return async function (dispatch) {
    const response = await fetch("/api/questionnaire/lookup");
    dispatch({
      type: t.setLookup,
      value: await response.json(),
    });
  };
}
