// note: state slices should be modular: ie, do not separate reducers, actions, action creators, etc by type
// instead, initialize each slice as a separate feature

export const initialState = {};

export const actions = {
    SET_COHORT: 'COHORT.SET_COHORT',
    UPDATE_COHORT: 'COHORT.UPDATE_COHORT',
    RESET_COHORT: 'COHORT.RESET_COHORT',
}

// action creators
export function setCohort(value) {
    return {type: actions.SET_COHORT, value};
}

export function updateCohort(value) {
    return {type: actions.UPDATE_COHORT, value};
}

export function resetCohort() {
    return {type: actions.RESET_COHORT};
}

export function fetchCohort(id) {
    return async function(dispatch) {
        try {
            const response = await fetch(`/api/questionnaire/cohort/${id}`)
            const value = await response.json();
            dispatch(setCohort(value));
        } catch(e) {
            console.log(e);
            dispatch(setCohort({error: String(e)}));
        }
    }
}

// root reducer
export default function reducer(state = initialState, action = {type: null}) {
    switch(action.type) {
        case actions.SET_COHORT:
            return {...action.value};
        case actions.UPDATE_COHORT:
            return {...state, ...action.value};
        case actions.RESET_COHORT:
            return {...initialState};
        default:
            return state;
    }
}

