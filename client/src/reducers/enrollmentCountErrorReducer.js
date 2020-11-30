import t from '../actionTypes'
import InitialStates from '../states'

const enrollmentCountErrorReducer = (state=InitialStates.enrollmentCountErrors, action={}) => {
    if(action.type == t.enrollment_most_recent_date){
        let cloned = {...state}
        if(action.remove){
            if(cloned.mostRecentDate)
                delete cloned.mostRecentDate
        }else{
            if(!cloned.mostRecentDate)
                cloned.mostRecentDate = action.value
        }
        return cloned
    }else return state
}

export default enrollmentCountErrorReducer