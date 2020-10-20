import {combineReducers} from 'redux'
import cohortReducer from './cohortReducer'
import enrollmentCountsReducer from './enrollmentCountsReducer'
import sectionReducer from './sectionReducer'
const rootReducer = combineReducers({cohortReducer, enrollmentCountsReducer, sectionReducer});

export default rootReducer