import t from '../actionTypes'
import InitialStates from '../states'
const actions = {}

actions[t.setCancerCount] = (state, action) => {
   let counts = parseInt(action.count);
   state.counts[action.cell] = isNaN(counts) ? null : counts;
   return state;
}

actions[t.mergeCancerCounts] = (state, action) => {
   return {...state, counts: {...action.values}};
}

actions[t.setCancerInfoFormValue] = (state, action) => {
   state.form[action.key] = action.value;
   return state;
}

actions[t.mergeCancerInfoFormValues] = (state, action) => {
   return {...state, form: {...action.values}};
}

actions[t.setCancerInfoCohort] = (state, action) => {
   state.cohort = action.value;
   return state;
}

export function loadCohort(id) {
   return async function(dispatch) {
      const cohort = await fetch(`/api/questionnaire/cohort/${id}`).then(r => r.json());
      const response = {
         cancer_count: await fetch(`/api/questionnaire/cancer_count/${id}`).then(r => r.json()),
         cancer_info: await fetch(`/api/questionnaire/cancer_info/${id}`).then(r => r.json()),
      }

      dispatch({
         type: t.setCancerInfoCohort, 
         value: {
            ...cohort,
            cancer_count: response.cancer_count.data[0],
            cancer_info: response.cancer_info.data[0],
         }
      });
   }
}

const cancerInfoReducer = (state=InitialStates.cancerInfo, action={}) => 
   actions[action.type] 
      ? actions[action.type]({ ...state }, action)
      : { ...state };

export default cancerInfoReducer