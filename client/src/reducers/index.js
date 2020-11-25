import {combineReducers} from 'redux'
import cohortReducer from './cohortReducer'
import enrollmentCountsReducer from './enrollmentCountsReducer'
import sectionReducer from './sectionReducer'
import majorContentReducer from './majorContentReducer'
import cancerInfoReducer from './cancerInfoReducer'
import mortalityReducer from './mortalityReducer'
import cohortErrorReducer from './cohortErrorReducer'
import enrollmentCountErrorReducer from './enrollmentCountErrorReducer'
import majorContentErrorReducer from './majorContentErrorReducer'
import specimenReducer from './specimenReducer'
const rootReducer = combineReducers({cohortReducer, enrollmentCountsReducer, majorContentReducer, cancerInfoReducer, mortalityReducer, cohortErrorReducer, enrollmentCountErrorReducer, majorContentErrorReducer, specimenReducer, sectionReducer});

export default rootReducer