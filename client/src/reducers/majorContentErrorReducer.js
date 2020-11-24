import t from '../actionTypes'
import InitialStates from '../states'

const actions = {}

actions[t.seStatusBaseLine] = (state, action) => { let cloned = {...state}; if(action.toDisable){if(cloned.seStatusBaseLine) cloned.seStatusBaseLine = false}else{ cloned.seStatusBaseLine=true}; return cloned}

const getResult = feedState => feedAction => (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const majorContentErrorReducer = (state=InitialStates.cohort, action={}) => getResult(state)(action)
    
export default majorContentErrorReducer