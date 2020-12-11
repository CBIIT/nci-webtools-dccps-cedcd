import t from '../actionTypes'
import InitialStates from '../states'

const cohortStatusReducer = (state=InitialStates.cohort_status, action={}) => {
    if (action.type == t.setCohortStatus)
        return action.value
    else
        return state
}

export default cohortStatusReducer