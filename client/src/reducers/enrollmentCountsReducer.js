import actionTypes from '../actionTypes'
import t from '../actionTypes'
import InitialStates from '../states'
const enrollmentCountsReducer = (state=InitialStates.enrollmentCount, action={}) => {
    switch(action.type){
        case t.updateEnrollmentCount:
        case t.updateTotals:
            let stateCopy = {...state}
            stateCopy[action.cell] = action.value
            return stateCopy
        default:
            return state
    }
}

export default enrollmentCountsReducer