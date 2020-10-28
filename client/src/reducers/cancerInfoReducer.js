import t from '../actionTypes'
import InitialStates from '../states'
const actions = {}
actions[t.setCancerCount] = (state, action) => {
   let shadow = {...state}
   let counts = action.count.trim()
   if(/^\d*$/.test(counts))
    shadow[action.cell] = counts
   return shadow
}

const getResult = feedState => feedAction => actions[feedAction.type] && actions[feedAction.type](feedState, feedAction) || feedState

const cancerInfoReducer = (state=InitialStates.cancerCount, action={}) => getResult(state)(action)

export default cancerInfoReducer