import t from "../actionTypes";
import InitialStates from "../states";

const actions = {};

actions[t.seStatusBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.seStatusBaseLine) cloned.seStatusBaseLine = false;
  } else {
    cloned.seStatusBaseLine = true;
  }
  return cloned;
};
actions[t.seStatusFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.seStatusFollowUp) cloned.seStatusFollowUp = false;
  } else {
    cloned.seStatusFollowUp = true;
  }
  return cloned;
};
actions[t.educationBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.educationBaseLine) cloned.educationBaseLine = false;
  } else {
    cloned.educationBaseLine = true;
  }
  return cloned;
};
actions[t.educationFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.educationFollowUp) cloned.educationFollowUp = false;
  } else {
    cloned.educationFollowUp = true;
  }
  return cloned;
};
actions[t.maritalStatusBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.maritalStatusBaseLine) cloned.maritalStatusBaseLine = false;
  } else {
    cloned.maritalStatusBaseLine = true;
  }
  return cloned;
};
actions[t.maritalStatusFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.maritalStatusFollowUp) cloned.maritalStatusFollowUp = false;
  } else {
    cloned.maritalStatusFollowUp = true;
  }
  return cloned;
};
actions[t.originBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.originBaseLine) cloned.originBaseLine = false;
  } else {
    cloned.originBaseLine = true;
  }
  return cloned;
};
actions[t.originFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.originFollowUp) cloned.originFollowUp = false;
  } else {
    cloned.originFollowUp = true;
  }
  return cloned;
};
actions[t.empStatusBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.empStatusBaseLine) cloned.empStatusBaseLine = false;
  } else {
    cloned.empStatusBaseLine = true;
  }
  return cloned;
};
actions[t.empStatusFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.empStatusFollowUp) cloned.empStatusFollowUp = false;
  } else {
    cloned.empStatusFollowUp = true;
  }
  return cloned;
};
actions[t.insuranceStatusBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.insuranceStatusBaseLine) cloned.insuranceStatusBaseLine = false;
  } else {
    cloned.insuranceStatusBaseLine = true;
  }
  return cloned;
};
actions[t.insuranceStatusFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.insuranceStatusFollowUp) cloned.insuranceStatusFollowUp = false;
  } else {
    cloned.insuranceStatusFollowUp = true;
  }
  return cloned;
};
actions[t.anthropometryBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.anthropometryBaseLine) cloned.anthropometryBaseLine = false;
  } else {
    cloned.anthropometryBaseLine = true;
  }
  return cloned;
};
actions[t.anthropometryFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.anthropometryFollowUp) cloned.anthropometryFollowUp = false;
  } else {
    cloned.anthropometryFollowUp = true;
  }
  return cloned;
};
actions[t.dietaryBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.dietaryBaseLine) cloned.dietaryBaseLine = false;
  } else {
    cloned.dietaryBaseLine = true;
  }
  return cloned;
};
actions[t.dietaryFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.dietaryFollowUp) cloned.dietaryFollowUp = false;
  } else {
    cloned.dietaryFollowUp = true;
  }
  return cloned;
};
actions[t.supplementBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.supplementBaseLine) cloned.supplementBaseLine = false;
  } else {
    cloned.supplementBaseLine = true;
  }
  return cloned;
};
actions[t.supplementFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.supplementFollowUp) cloned.supplementFollowUp = false;
  } else {
    cloned.supplementFollowUp = true;
  }
  return cloned;
};
actions[t.medicineBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.medicineBaseLine) cloned.medicineBaseLine = false;
  } else {
    cloned.medicineBaseLine = true;
  }
  return cloned;
};
actions[t.medicineFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.medicineFollowUp) cloned.medicineFollowUp = false;
  } else {
    cloned.medicineFollowUp = true;
  }
  return cloned;
};
actions[t.prescriptionBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.prescriptionBaseLine) cloned.prescriptionBaseLine = false;
  } else {
    cloned.prescriptionBaseLine = true;
  }
  return cloned;
};
actions[t.prescriptionFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.prescriptionFollowUp) cloned.prescriptionFollowUp = false;
  } else {
    cloned.prescriptionFollowUp = true;
  }
  return cloned;
};
actions[t.nonprescriptionBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.nonprescriptionBaseLine) cloned.nonprescriptionBaseLine = false;
  } else {
    cloned.nonprescriptionBaseLine = true;
  }
  return cloned;
};
actions[t.nonprescriptionFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.nonprescriptionFollowUp) cloned.nonprescriptionFollowUp = false;
  } else {
    cloned.nonprescriptionFollowUp = true;
  }
  return cloned;
};
actions[t.alcoholBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.alcoholBaseLine) cloned.alcoholBaseLine = false;
  } else {
    cloned.alcoholBaseLine = true;
  }
  return cloned;
};
actions[t.alcoholFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.alcoholFollowUp) cloned.alcoholFollowUp = false;
  } else {
    cloned.alcoholFollowUp = true;
  }
  return cloned;
};
actions[t.cigaretteBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cigaretteBaseLine) cloned.cigaretteBaseLine = false;
  } else {
    cloned.cigaretteBaseLine = true;
  }
  return cloned;
};
actions[t.cigaretteFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cigaretteFollowUp) cloned.cigaretteFollowUp = false;
  } else {
    cloned.cigaretteFollowUp = true;
  }
  return cloned;
};
actions[t.tobaccoUseBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.tobaccoUseBaseLine) cloned.tobaccoUseBaseLine = false;
  } else {
    cloned.tobaccoUseBaseLine = true;
  }
  return cloned;
};
actions[t.tobaccoUseFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.tobaccoUseFollowUp) cloned.tobaccoUseFollowUp = false;
  } else {
    cloned.tobaccoUseFollowUp = true;
  }
  return cloned;
};
actions[t.cigarBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cigarBaseLine) cloned.cigarBaseLine = false;
  } else {
    cloned.cigarBaseLine = true;
  }
  return cloned;
};
actions[t.cigarFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cigarFollowUp) cloned.cigarFollowUp = false;
  } else {
    cloned.cigarFollowUp = true;
  }
  return cloned;
};
actions[t.pipeBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.pipeBaseLine) cloned.pipeBaseLine = false;
  } else {
    cloned.pipeBaseLine = true;
  }
  return cloned;
};
actions[t.pipeFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.pipeFollowUp) cloned.pipeFollowUp = false;
  } else {
    cloned.pipeFollowUp = true;
  }
  return cloned;
};
actions[t.tobaccoBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.tobaccoBaseLine) cloned.tobaccoBaseLine = false;
  } else {
    cloned.tobaccoBaseLine = true;
  }
  return cloned;
};
actions[t.tobaccoFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.tobaccoFollowUp) cloned.tobaccoFollowUp = false;
  } else {
    cloned.tobaccoFollowUp = true;
  }
  return cloned;
};
actions[t.ecigarBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.ecigarBaseLine) cloned.ecigarBaseLine = false;
  } else {
    cloned.ecigarBaseLine = true;
  }
  return cloned;
};
actions[t.ecigarFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.ecigarFollowUp) cloned.ecigarFollowUp = false;
  } else {
    cloned.ecigarFollowUp = true;
  }
  return cloned;
};
actions[t.noncigarOtherBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.noncigarOtherBaseLine) cloned.noncigarOtherBaseLine = false;
  } else {
    cloned.noncigarOtherBaseLine = true;
  }
  return cloned;
};
actions[t.noncigarOtherFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.noncigarOtherFollowUp) cloned.noncigarOtherFollowUp = false;
  } else {
    cloned.noncigarOtherFollowUp = true;
  }
  return cloned;
};
actions[t.noncigarBaseLineSpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.noncigarBaseLineSpecify) cloned.noncigarBaseLineSpecify = false;
  } else {
    cloned.noncigarBaseLineSpecify = true;
  }
  return cloned;
};
actions[t.noncigarFollowUpSpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.noncigarFollowUpSpecify) cloned.noncigarFollowUpSpecify = false;
  } else {
    cloned.noncigarFollowUpSpecify = true;
  }
  return cloned;
};
actions[t.physicalBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.physicalBaseLine) cloned.physicalBaseLine = false;
  } else {
    cloned.physicalBaseLine = true;
  }
  return cloned;
};
actions[t.physicalFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.physicalFollowUp) cloned.physicalFollowUp = false;
  } else {
    cloned.physicalFollowUp = true;
  }
  return cloned;
};
actions[t.sleepBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.sleepBaseLine) cloned.sleepBaseLine = false;
  } else {
    cloned.sleepBaseLine = true;
  }
  return cloned;
};
actions[t.sleepFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.sleepFollowUp) cloned.sleepFollowUp = false;
  } else {
    cloned.sleepFollowUp = true;
  }
  return cloned;
};
actions[t.reproduceBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.reproduceBaseLine) cloned.reproduceBaseLine = false;
  } else {
    cloned.reproduceBaseLine = true;
  }
  return cloned;
};
actions[t.reproduceFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.reproduceFollowUp) cloned.reproduceFollowUp = false;
  } else {
    cloned.reproduceFollowUp = true;
  }
  return cloned;
};
actions[t.reportedHealthBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.reportedHealthBaseLine) cloned.reportedHealthBaseLine = false;
  } else {
    cloned.reportedHealthBaseLine = true;
  }
  return cloned;
};
actions[t.reportedHealthFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.reportedHealthFollowUp) cloned.reportedHealthFollowUp = false;
  } else {
    cloned.reportedHealthFollowUp = true;
  }
  return cloned;
};
actions[t.lifeBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.lifeBaseLine) cloned.lifeBaseLine = false;
  } else {
    cloned.lifeBaseLine = true;
  }
  return cloned;
};
actions[t.lifeFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.lifeFollowUp) cloned.lifeFollowUp = false;
  } else {
    cloned.lifeFollowUp = true;
  }
  return cloned;
};
actions[t.socialSupportBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.socialSupportBaseLine) cloned.socialSupportBaseLine = false;
  } else {
    cloned.socialSupportBaseLine = true;
  }
  return cloned;
};
actions[t.socialSupportFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.socialSupportFollowUp) cloned.socialSupportFollowUp = false;
  } else {
    cloned.socialSupportFollowUp = true;
  }
  return cloned;
};
actions[t.cognitionBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cognitionBaseLine) cloned.cognitionBaseLine = false;
  } else {
    cloned.cognitionBaseLine = true;
  }
  return cloned;
};
actions[t.cognitionFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cognitionFollowUp) cloned.cognitionFollowUp = false;
  } else {
    cloned.cognitionFollowUp = true;
  }
  return cloned;
};
actions[t.depressionBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.depressionBaseLine) cloned.depressionBaseLine = false;
  } else {
    cloned.depressionBaseLine = true;
  }
  return cloned;
};
actions[t.depressionFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.depressionFollowUp) cloned.depressionFollowUp = false;
  } else {
    cloned.depressionFollowUp = true;
  }
  return cloned;
};
actions[t.psychosocialBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.psychosocialBaseLine) cloned.psychosocialBaseLine = false;
  } else {
    cloned.psychosocialBaseLine = true;
  }
  return cloned;
};
actions[t.psychosocialFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.psychosocialFollowUp) cloned.psychosocialFollowUp = false;
  } else {
    cloned.psychosocialFollowUp = true;
  }
  return cloned;
};
actions[t.fatigueBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.fatigueBaseLine) cloned.fatigueBaseLine = false;
  } else {
    cloned.fatigueBaseLine = true;
  }
  return cloned;
};
actions[t.fatigueFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.fatigueFollowUp) cloned.fatigueFollowUp = false;
  } else {
    cloned.fatigueFollowUp = true;
  }
  return cloned;
};
actions[t.cancerHistoryBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerHistoryBaseLine) cloned.cancerHistoryBaseLine = false;
  } else {
    cloned.cancerHistoryBaseLine = true;
  }
  return cloned;
};
actions[t.cancerHistoryFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerHistoryFollowUp) cloned.cancerHistoryFollowUp = false;
  } else {
    cloned.cancerHistoryFollowUp = true;
  }
  return cloned;
};
actions[t.cancerPedigreeBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerPedigreeBaseLine) cloned.cancerPedigreeBaseLine = false;
  } else {
    cloned.cancerPedigreeBaseLine = true;
  }
  return cloned;
};
actions[t.cancerPedigreeFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerPedigreeFollowUp) cloned.cancerPedigreeFollowUp = false;
  } else {
    cloned.cancerPedigreeFollowUp = true;
  }
  return cloned;
};
actions[t.physicalMeasureBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.physicalMeasureBaseLine) cloned.physicalMeasureBaseLine = false;
  } else {
    cloned.physicalMeasureBaseLine = true;
  }
  return cloned;
};
actions[t.physicalMeasureFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.physicalMeasureFollowUp) cloned.physicalMeasureFollowUp = false;
  } else {
    cloned.physicalMeasureFollowUp = true;
  }
  return cloned;
};
actions[t.exposureBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.exposureBaseLine) cloned.exposureBaseLine = false;
  } else {
    cloned.exposureBaseLine = true;
  }
  return cloned;
};
actions[t.exposureFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.exposureFollowUp) cloned.exposureFollowUp = false;
  } else {
    cloned.exposureFollowUp = true;
  }
  return cloned;
};
actions[t.residenceBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.residenceBaseLine) cloned.residenceBaseLine = false;
  } else {
    cloned.residenceBaseLine = true;
  }
  return cloned;
};
actions[t.residenceFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.residenceFollowUp) cloned.residenceFollowUp = false;
  } else {
    cloned.residenceFollowUp = true;
  }
  return cloned;
};
actions[t.sexgenderIdentityBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.sexgenderIdentityBaseLine) cloned.sexgenderIdentityBaseLine = false;
  } else {
    cloned.sexgenderIdentityBaseLine = true;
  }
  return cloned;
};
actions[t.sexgenderIdentityFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.sexgenderIdentityFollowUp) cloned.sexgenderIdentityFollowUp = false;
  } else {
    cloned.sexgenderIdentityFollowUp = true;
  }
  return cloned;
};
actions[t.diabetesBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.diabetesBaseLine) cloned.diabetesBaseLine = false;
  } else {
    cloned.diabetesBaseLine = true;
  }
  return cloned;
};
actions[t.diabetesFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.diabetesFollowUp) cloned.diabetesFollowUp = false;
  } else {
    cloned.diabetesFollowUp = true;
  }
  return cloned;
};
actions[t.strokeBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.strokeBaseLine) cloned.strokeBaseLine = false;
  } else {
    cloned.strokeBaseLine = true;
  }
  return cloned;
};
actions[t.strokeFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.strokeFollowUp) cloned.strokeFollowUp = false;
  } else {
    cloned.strokeFollowUp = true;
  }
  return cloned;
};
actions[t.copdBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.copdBaseLine) cloned.copdBaseLine = false;
  } else {
    cloned.copdBaseLine = true;
  }
  return cloned;
};
actions[t.copdFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.copdFollowUp) cloned.copdFollowUp = false;
  } else {
    cloned.copdFollowUp = true;
  }
  return cloned;
};
actions[t.cardiovascularBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cardiovascularBaseLine) cloned.cardiovascularBaseLine = false;
  } else {
    cloned.cardiovascularBaseLine = true;
  }
  return cloned;
};
actions[t.cardiovascularFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cardiovascularFollowUp) cloned.cardiovascularFollowUp = false;
  } else {
    cloned.cardiovascularFollowUp = true;
  }
  return cloned;
};
actions[t.osteoporosisBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.osteoporosisBaseLine) cloned.osteoporosisBaseLine = false;
  } else {
    cloned.osteoporosisBaseLine = true;
  }
  return cloned;
};
actions[t.osteoporosisFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.osteoporosisFollowUp) cloned.osteoporosisFollowUp = false;
  } else {
    cloned.osteoporosisFollowUp = true;
  }
  return cloned;
};
actions[t.mentalBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.mentalBaseLine) cloned.mentalBaseLine = false;
  } else {
    cloned.mentalBaseLine = true;
  }
  return cloned;
};
actions[t.mentalFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.mentalFollowUp) cloned.mentalFollowUp = false;
  } else {
    cloned.mentalFollowUp = true;
  }
  return cloned;
};
actions[t.cognitiveDeclineBaseLine] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cognitiveDeclineBaseLine) cloned.cognitiveDeclineBaseLine = false;
  } else {
    cloned.cognitiveDeclineBaseLine = true;
  }
  return cloned;
};
actions[t.cognitiveDeclineFollowUp] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cognitiveDeclineFollowUp) cloned.cognitiveDeclineFollowUp = false;
  } else {
    cloned.cognitiveDeclineFollowUp = true;
  }
  return cloned;
};
actions[t.cancerRelatedConditionsNA] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerRelatedConditionsNA) cloned.cancerRelatedConditionsNA = false;
  } else {
    cloned.cancerRelatedConditionsNA = true;
  }
  return cloned;
};
actions[t.cancerToxicity] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerToxicity) cloned.cancerToxicity = false;
  } else {
    cloned.cancerToxicity = true;
  }
  return cloned;
};
actions[t.cancerLateEffects] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerLateEffects) cloned.cancerLateEffects = false;
  } else {
    cloned.cancerLateEffects = true;
  }
  return cloned;
};
actions[t.cancerSymptom] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerSymptom) cloned.cancerSymptom = false;
  } else {
    cloned.cancerSymptom = true;
  }
  return cloned;
};
actions[t.cancerOther] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerOther) cloned.cancerOther = false;
  } else {
    cloned.cancerOther = true;
  }
  return cloned;
};
actions[t.cancerOtherSpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.cancerOtherSpecify) cloned.cancerOtherSpecify = false;
  } else {
    cloned.cancerOtherSpecify = true;
  }
  return cloned;
};

const getResult = (feedState) => (feedAction) =>
  (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState;
const majorContentErrorReducer = (state = InitialStates.majorContentError, action = {}) => getResult(state)(action);

export default majorContentErrorReducer;
