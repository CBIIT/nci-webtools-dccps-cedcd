export const SET_HAS_UNSAVED_CHANGES = "SET_HAS_UNSAVED_CHAANGES";

export function setHasUnsavedChanges(value) {
  return {
    type: SET_HAS_UNSAVED_CHANGES,
    value,
  };
}

export default function reducer(state = false, action) {
  if (action.type === SET_HAS_UNSAVED_CHANGES) {
    return action.value;
  } else {
    return state;
  }
}
