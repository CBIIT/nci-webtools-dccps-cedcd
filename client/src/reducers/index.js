import {combineReducers} from 'redux'
import cohortReducer from './cohortReducer'
import enrollmentCountsReducer from './enrollmentCountsReducer'
import sectionReducer from './sectionReducer'
import majorContentReducer from './majorContentReducer'
const rootReducer = combineReducers({cohortReducer, enrollmentCountsReducer, majorContentReducer, sectionReducer});

export default rootReducer