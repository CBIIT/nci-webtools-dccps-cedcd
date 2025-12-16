import { combineReducers } from "redux";
import cohort from "./cohort";
import user from "./user";
import cohortReducer from "./cohortReducer";
import enrollmentCountsReducer from "./enrollmentCountsReducer";
import sectionReducer from "./sectionReducer";
import majorContentReducer from "./majorContentReducer";
import cancerInfoReducer from "./cancerInfoReducer";
import mortalityReducer from "./mortalityReducer";
import dataLinkageReducer from "./dataLinkageReducer";
import cohortErrorReducer from "./cohortErrorReducer";
import enrollmentCountErrorReducer from "./enrollmentCountErrorReducer";
import majorContentErrorReducer from "./majorContentErrorReducer";
import lookupReducer from "./lookupReducer";
import specimenReducer from "./specimenReducer";
import specimenInfoErrorReducer from "./specimenInfoErrorReducer";
import cohortIDReducer from "./cohortIDReducer";
import cohortStatusReducer from "./cohortStatusReducer";
import unsavedChangesReducer from "./unsavedChangesReducer";

const rootReducer = combineReducers({
  cohort,
  user,
  cohortReducer,
  enrollmentCountsReducer,
  majorContentReducer,
  cancerInfoReducer,
  mortalityReducer,
  dataLinkageReducer,
  cohortErrorReducer,
  enrollmentCountErrorReducer,
  majorContentErrorReducer,
  sectionReducer,
  specimenReducer,
  specimenInfoErrorReducer,
  lookupReducer,
  cohortIDReducer,
  cohortStatusReducer,
  unsavedChangesReducer,
});

export default rootReducer;
