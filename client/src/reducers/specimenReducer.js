import t from '../actionTypes'
import InitialStates from '../states'

const actions = {}
actions[t.setSpecimenCount] = (state, action) => {
    let shallow = {...state}
    if(/^\d*$/.test(action.value.trim())){
        shallow.counts[action.cell] = action.value
        return shallow
    }
}
actions[t.setSectionGStatus] = (state, action) => ({...state, sectionGStatus: action.value})

const getResult = feedState => feedAction => (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const specimenReducer = (state=InitialStates.specimen, action={}) => getResult(state)(action)

export default specimenReducer