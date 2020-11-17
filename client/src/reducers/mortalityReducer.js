import t from '../actionTypes'
import InitialStates from '../states'
const actions = {}
actions[t.setMortalityLoaded] = (state, action) => ({ ...state, hasLoaded: action.value })
actions[t.setMortalityYear] = (state, action) => ({ ...state, mortalityYear: action.value })
actions[t.setDeathIndex] = (state, action) => ({ ...state, deathIndex: action.value })
actions[t.setDeathCertificate] = (state, action) => ({ ...state, deathCertificate: action.value })
actions[t.setDeathOther] = (state, action) => ({ ...state, deathOther: action.value })
actions[t.setHaveDeathDate] = (state, action) => ({ ...state, haveDeathDate: action.value })
actions[t.setIcd9] = (state, action) => ({ ...state, icd9: action.value })
actions[t.setIcd10] = (state, action) => ({ ...state, icd10: action.value })
actions[t.setNotCoded] = (state, action) => ({ ...state, notCoded: action.value })
actions[t.setOtherCode] = (state, action) => ({ ...state, otherCode: action.value })
actions[t.setDeathNumbers] = (state, action) => ({ ...state, deathNumbers: action.value })
actions[t.setSectionEStatus] = (state, action) => ({ ...state, sectionEStatus: action.value })

const getResult = feedState => feedAction => actions[feedAction.type] && actions[feedAction.type](feedState, feedAction) || feedState
const mortalityReducer = (state=InitialStates.mortality, action={}) => getResult(state)(action)

export default mortalityReducer
