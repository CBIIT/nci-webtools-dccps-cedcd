import {combineReducers} from 'redux'
import cohortReducer from './cohortReducer'
import enrollmentCountsReducer from './enrollmentCountsReducer'
import sectionReducer from './sectionReducer'
import majorContentReducer from './majorContentReducer'
import cancerInfoReducer from './cancerInfoReducer'
import mortalityReducer from './mortalityReducer'
import cohortReducer from './cohortErrorReducer'
import majorContentErrorReducer from './majorContentErrorReducer'
const rootReducer = combineReducers({cohortReducer, enrollmentCountsReducer, majorContentReducer, cancerInfoReducer, mortalityReducer, cohortReducer, majorContentErrorReducer, sectionReducer});

export default rootReducer