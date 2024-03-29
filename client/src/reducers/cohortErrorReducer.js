import InitialStates from "../states";
import t from "../actionTypes";

const actions = {};
actions[t.renewCohortError] = (state, action) => ({ ...action.value });
//[t.completionDate] = (state, action) => { let cloned = {...state}; if(action.remove){if(cloned.completionDate) delete cloned.completionDate}else{if(!cloned.completionDate) cloned.completionDate=action.value}; return cloned}
actions[t.cohort_web_site] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.cohort_web_site) delete cloned.cohort_web_site;
  } else {
    if (!cloned.cohort_web_site) cloned.cohort_web_site = action.value;
  }
  return cloned;
};
actions[t.clarification_contact] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.clarification_contact) delete cloned.clarification_contact;
  } else {
    if (!cloned.clarification_contact) cloned.clarification_contact = action.value;
  }
  return cloned;
};
actions[t.completerName] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.completerName) delete cloned.completerName;
  } else {
    if (!cloned.completerName) cloned.completerName = action.value;
  }
  return cloned;
};
actions[t.completerPosition] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.completerPosition) delete cloned.completerPosition;
  } else {
    if (!cloned.completerPosition) cloned.completerPosition = action.value;
  }
  return cloned;
};
actions[t.completerPhone] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.completerPhone) delete cloned.completerPhone;
  } else {
    if (!cloned.completerPhone) cloned.completerPhone = action.value;
  }
  return cloned;
};
actions[t.completerEmail] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.completerEmail) delete cloned.completerEmail;
  } else {
    cloned.completerEmail = action.value;
  }
  return cloned;
};
actions[t.contacterName] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.contacterName) delete cloned.contacterName;
  } else {
    if (!cloned.contacterName) cloned.contacterName = action.value;
  }
  return cloned;
};
actions[t.contacterPosition] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.contacterPosition) delete cloned.contacterPosition;
  } else {
    if (!cloned.contacterPosition) cloned.contacterPosition = action.value;
  }
  return cloned;
};
actions[t.contacterPhone] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.contacterPhone) delete cloned.contacterPhone;
  } else {
    if (!cloned.contacterPhone) cloned.contacterPhone = action.value;
  }
  return cloned;
};
actions[t.contacterEmail] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.contacterEmail) delete cloned.contacterEmail;
  } else {
    cloned.contacterEmail = action.value;
  }
  return cloned;
};
actions[t.collaboratorName] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.collaboratorName) delete cloned.collaboratorName;
  } else {
    if (!cloned.collaboratorName) cloned.collaboratorName = action.value;
  }
  return cloned;
};
actions[t.collaboratorPosition] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.collaboratorPosition) delete cloned.collaboratorPosition;
  } else {
    if (!cloned.collaboratorPosition) cloned.collaboratorPosition = action.value;
  }
  return cloned;
};
actions[t.collaboratorPhone] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.collaboratorPhone) delete cloned.collaboratorPhone;
  } else {
    if (!cloned.collaboratorPhone) cloned.collaboratorPhone = action.value;
  }
  return cloned;
};
actions[t.collaboratorEmail] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.collaboratorEmail) delete cloned.collaboratorEmail;
  } else {
    cloned.collaboratorEmail = action.value;
  }
  return cloned;
};
actions[t.investigatorName] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned["investigator_name_" + action.index]) delete cloned["investigator_name_" + action.index];
  } else {
    if (!cloned["investigator_name_" + action.index]) cloned["investigator_name_" + action.index] = action.value;
  }
  return cloned;
};
actions[t.investigatorInsitution] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned["investigator_inst_" + action.index]) delete cloned["investigator_inst_" + action.index];
  } else {
    if (!cloned["investigator_inst_" + action.index]) cloned["investigator_inst_" + action.index] = action.value;
  }
  return cloned;
};
actions[t.investigatorEmail] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned["investigator_email_" + action.index]) delete cloned["investigator_email_" + action.index];
  } else {
    cloned["investigator_email_" + action.index] = action.value;
  }
  return cloned;
};
actions[t.eligible_gender_id] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.eligible_gender_id) delete cloned.eligible_gender_id;
  } else {
    if (!cloned.eligible_gender_id) cloned.eligible_gender_id = action.value;
  }
  return cloned;
};
actions[t.enrollment_ongoing] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_ongoing) delete cloned.enrollment_ongoing;
  } else {
    if (!cloned.enrollment_ongoing) cloned.enrollment_ongoing = action.value;
  }
  return cloned;
};
actions[t.enrollment_total] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_total) delete cloned.enrollment_total;
  } else {
    if (!cloned.enrollment_total) cloned.enrollment_total = action.value;
  }
  return cloned;
};
actions[t.enrollment_year_start] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_year_start) delete cloned.enrollment_year_start;
  } else {
    if (!cloned.enrollment_year_start || cloned.enrollment_year_start !== action.value)
      cloned.enrollment_year_start = action.value;
  }
  return cloned;
};

actions[t.enrollment_year_end] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_year_end) delete cloned.enrollment_year_end;
  } else {
    if (!cloned.enrollment_year_end || cloned.enrollment_year_end !== action.value)
      cloned.enrollment_year_end = action.value;
  }
  return cloned;
};

actions[t.enrollment_target] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_target) delete cloned.enrollment_target;
  } else {
    if (!cloned.enrollment_target || cloned.enrollment_target !== action.value) cloned.enrollment_target = action.value;
  }
  return cloned;
};
actions[t.enrollment_year_complete] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_year_complete) delete cloned.enrollment_year_complete;
  } else {
    if (!cloned.enrollment_year_complete || cloned.enrollment_year_complete !== action.value)
      cloned.enrollment_year_complete = action.value;
  }
  return cloned;
};
actions[t.enrollment_age_min] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_age_min) delete cloned.enrollment_age_min;
  } else {
    if (!cloned.enrollment_age_min || action.value !== cloned.enrollment_age_min)
      cloned.enrollment_age_min = action.value;
  }
  return cloned;
};
actions[t.enrollment_age_max] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_age_max) delete cloned.enrollment_age_max;
  } else {
    if (!cloned.enrollment_age_max || action.value !== cloned.enrollment_age_max)
      cloned.enrollment_age_max = action.value;
  }
  return cloned;
};
actions[t.enrollment_age_mean] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_age_mean) delete cloned.enrollment_age_mean;
  } else {
    if (!cloned.enrollment_age_mean || action.value !== cloned.enrollmenta_age_mean)
      cloned.enrollment_age_mean = action.value;
  }
  return cloned;
};
actions[t.enrollment_age_median] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.enrollment_age_median) delete cloned.enrollment_age_median;
  } else {
    if (!cloned.enrollment_age_median || action.value !== cloned.enrollment_age_median)
      cloned.enrollment_age_median = action.value;
  }
  return cloned;
};

//actions[t.current_age_min] = (state, action) => {let cloned = {...state}; if(action.remove){if(cloned.current_age_min) delete cloned.current_age_min}else{if(!cloned.current_age_min || action.value !== cloned.current_age_min) cloned.current_age_min = action.value}; return cloned}

actions[t.current_age_min] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.current_age_min) delete cloned.current_age_min;
  } else {
    if (!cloned.current_age_min || action.value !== cloned.current_age_min) cloned.current_age_min = action.value;
  }
  return cloned;
};

actions[t.current_age_max] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.current_age_max) delete cloned.current_age_max;
  } else {
    if (!cloned.current_age_max || (action.value && action.value !== cloned.current_age_max))
      cloned.current_age_max = action.value;
  }
  return cloned;
};
actions[t.current_age_mean] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.current_age_mean) delete cloned.current_age_mean;
  } else {
    if (!cloned.current_age_mean || (action.value && action.value !== cloned.current_age_mean))
      cloned.current_age_mean = action.value;
  }
  return cloned;
};
actions[t.current_age_median] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.current_age_median) delete cloned.current_age_median;
  } else {
    if (!cloned.current_age_median || (action.value && action.value !== cloned.current_age_median))
      cloned.current_age_median = action.value;
  }
  return cloned;
};
actions[t.time_interval] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.time_interval) delete cloned.time_interval;
  } else {
    if (!cloned.time_interval) cloned.time_interval = action.value;
  }
  return cloned;
};
actions[t.most_recent_year] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.most_recent_year) delete cloned.most_recent_year;
  } else {
    if (!cloned.most_recent_year || action.value !== cloned.most_recent_year) cloned.most_recent_year = action.value;
  }
  return cloned;
};
actions[t.dataCollection] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.dataCollection) delete cloned.dataCollection;
  } else {
    if (!cloned.dataCollection) cloned.dataCollection = action.value;
  }
  return cloned;
};
actions[t.requirements] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.requirements) delete cloned.requirements;
  } else {
    if (!cloned.requirements) cloned.requirements = action.value;
  }
  return cloned;
};
actions[t.strategy] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.strategy) delete cloned.strategy;
  } else {
    if (!cloned.strategy) cloned.strategy = action.value;
  }
  return cloned;
};
actions[t.data_collected_other_specify] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.data_collected_other_specify) delete cloned.data_collected_other_specify;
  } else {
    if (!cloned.data_collected_other_specify) cloned.data_collected_other_specify = action.value;
  }
  return cloned;
};
actions[t.restrictions_other_specify] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.restrictions_other_specify) delete cloned.restrictions_other_specify;
  } else {
    if (!cloned.restrictions_other_specify) cloned.restrictions_other_specify = action.value;
  }
  return cloned;
};
actions[t.strategy_other_specify] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.strategy_other_specify) delete cloned.strategy_other_specify;
  } else {
    if (!cloned.strategy_other_specify) cloned.strategy_other_specify = action.value;
  }
  return cloned;
};
actions[t.questionnaire] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.questionnaire) {
      delete cloned.questionnaire;
    }
  } else {
    if (!cloned.questionnaire) cloned.questionnaire = action.value;
  }
  return cloned;
};
actions[t.main] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.main) delete cloned.main;
  } else {
    if (!cloned.main) cloned.main = action.value;
  }
  return cloned;
};
actions[t.data] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.data) delete cloned.data;
  } else {
    if (!cloned.data) cloned.data = action.value;
  }
  return cloned;
};
actions[t.specimen] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.specimen) delete cloned.specimen;
  } else {
    if (!cloned.specimen) cloned.specimen = action.value;
  }
  return cloned;
};
actions[t.publication] = (state, action) => {
  let cloned = { ...state };
  if (action.remove) {
    if (cloned.publication) delete cloned.publication;
  } else {
    if (!cloned.publication) cloned.publication = action.value;
  }
  return cloned;
};
const getResult = (feedState) => (feedAction) =>
  (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState;
const cohortErrorReducer = (state = InitialStates.cohortErrors, action = {}) => getResult(state)(action);

export default cohortErrorReducer;
