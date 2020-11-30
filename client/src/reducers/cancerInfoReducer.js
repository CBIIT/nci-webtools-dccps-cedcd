import t from '../actionTypes'
import InitialStates from '../states'
const actions = {}

actions[t.setCancerCount] = (state, action) => {
   let counts = parseInt(action.count);
   state.counts[action.cell] = isNaN(counts) ? null : counts;
   return state;
}

actions[t.setCancerInfoFormValue] = (state, action) => {
   state.form[action.key] = action.value;
   return state;
}

actions[t.setCancerInfoCohort] = (state, action) => {
   state.cohort = action.value;
   return state;
}

export function loadCohort(id) {
   return async function(dispatch) {
       const response = await fetch(`/api/questionnaire/cohort/${id}`)
       dispatch({
           type: t.setCancerInfoCohort, 
           value: await response.json()
       });
   }
}

const cancerInfoReducer = (state=InitialStates.cancerInfo, action={}) => 
   actions[action.type] 
      ? actions[action.type]({ ...state }, action)
      : { ...state };

export default cancerInfoReducer