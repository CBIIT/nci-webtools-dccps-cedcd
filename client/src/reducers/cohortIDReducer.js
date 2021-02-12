import t from '../actionTypes'
import InitialStates from '../states'

const cohortIDReducer = (state = InitialStates.cohortId, action = {}) => {
    if(action.type == t.setCohortId){
        return action.value
    }
    else{
        return state;
    }
}

export default cohortIDReducer