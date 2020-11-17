import {combineReducers} from 'redux'
import cohortReducer from './cohortReducer'
import enrollmentCountsReducer from './enrollmentCountsReducer'
import sectionReducer from './sectionReducer'
import majorContentReducer from './majorContentReducer'
import cancerInfoReducer from './cancerInfoReducer'
import mortalityReducer from './mortalityReducer'
const rootReducer = combineReducers({cohortReducer, enrollmentCountsReducer, majorContentReducer, cancerInfoReducer, mortalityReducer, sectionReducer});

export default rootReducer