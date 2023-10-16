import t from "../actionTypes";

const seStatusBaseLine = (disabled) => ({ type: t.seStatusBaseLine, toDisable: disabled });
const seStatusFollowUp = (disabled) => ({ type: t.seStatusFollowUp, toDisable: disabled });
const educationBaseLine = (disabled) => ({ type: t.educationBaseLine, toDisable: disabled });
const educationFollowUp = (disabled) => ({ type: t.educationFollowUp, toDisable: disabled });
const maritalStatusBaseLine = (disabled) => ({ type: t.maritalStatusBaseLine, toDisable: disabled });
const maritalStatusFollowUp = (disabled) => ({ type: t.maritalStatusFollowUp, toDisable: disabled });
const originBaseLine = (disabled) => ({ type: t.originBaseLine, toDisable: disabled });
const originFollowUp = (disabled) => ({ type: t.originFollowUp, toDisable: disabled });
const empStatusBaseLine = (disabled) => ({ type: t.empStatusBaseLine, toDisable: disabled });
const empStatusFollowUp = (disabled) => ({ type: t.empStatusFollowUp, toDisable: disabled });
const insuranceStatusBaseLine = (disabled) => ({ type: t.insuranceStatusBaseLine, toDisable: disabled });
const insuranceStatusFollowUp = (disabled) => ({ type: t.insuranceStatusFollowUp, toDisable: disabled });
const anthropometryBaseLine = (disabled) => ({ type: t.anthropometryBaseLine, toDisable: disabled });
const anthropometryFollowUp = (disabled) => ({ type: t.anthropometryFollowUp, toDisable: disabled });
const dietaryBaseLine = (disabled) => ({ type: t.dietaryBaseLine, toDisable: disabled });
const dietaryFollowUp = (disabled) => ({ type: t.dietaryFollowUp, toDisable: disabled });
const supplementBaseLine = (disabled) => ({ type: t.supplementBaseLine, toDisable: disabled });
const supplementFollowUp = (disabled) => ({ type: t.supplementFollowUp, toDisable: disabled });
const medicineBaseLine = (disabled) => ({ type: t.medicineBaseLine, toDisable: disabled });
const medicineFollowUp = (disabled) => ({ type: t.medicineFollowUp, toDisable: disabled });
const prescriptionBaseLine = (disabled) => ({ type: t.prescriptionBaseLine, toDisable: disabled });
const prescriptionFollowUp = (disabled) => ({ type: t.prescriptionFollowUp, toDisable: disabled });
const nonprescriptionBaseLine = (disabled) => ({ type: t.nonprescriptionBaseLine, toDisable: disabled });
const nonprescriptionFollowUp = (disabled) => ({ type: t.nonprescriptionFollowUp, toDisable: disabled });
const alcoholBaseLine = (disabled) => ({ type: t.alcoholBaseLine, toDisable: disabled });
const alcoholFollowUp = (disabled) => ({ type: t.alcoholFollowUp, toDisable: disabled });
const cigaretteBaseLine = (disabled) => ({ type: t.cigaretteBaseLine, toDisable: disabled });
const cigaretteFollowUp = (disabled) => ({ type: t.cigaretteFollowUp, toDisable: disabled });
const tobaccoUseBaseLine = (disabled) => ({ type: t.tobaccoUseBaseLine, toDisable: disabled });
const tobaccoUseFollowUp = (disabled) => ({ type: t.tobaccoUseFollowUp, toDisable: disabled });
const cigarBaseLine = (disabled) => ({ type: t.cigarBaseLine, toDisable: disabled });
const cigarFollowUp = (disabled) => ({ type: t.cigarFollowUp, toDisable: disabled });
const pipeBaseLine = (disabled) => ({ type: t.pipeBaseLine, toDisable: disabled });
const pipeFollowUp = (disabled) => ({ type: t.pipeFollowUp, toDisable: disabled });
const tobaccoBaseLine = (disabled) => ({ type: t.tobaccoBaseLine, toDisable: disabled });
const tobaccoFollowUp = (disabled) => ({ type: t.tobaccoFollowUp, toDisable: disabled });
const ecigarBaseLine = (disabled) => ({ type: t.ecigarBaseLine, toDisable: disabled });
const ecigarFollowUp = (disabled) => ({ type: t.ecigarFollowUp, toDisable: disabled });
const noncigarOtherBaseLine = (disabled) => ({ type: t.noncigarOtherBaseLine, toDisable: disabled });
const noncigarOtherFollowUp = (disabled) => ({ type: t.noncigarOtherFollowUp, toDisable: disabled });
const noncigarBaseLineSpecify = (disabled) => ({ type: t.noncigarBaseLineSpecify, toDisable: disabled });
const noncigarFollowUpSpecify = (disabled) => ({ type: t.noncigarFollowUpSpecify, toDisable: disabled });
const physicalBaseLine = (disabled) => ({ type: t.physicalBaseLine, toDisable: disabled });
const physicalFollowUp = (disabled) => ({ type: t.physicalFollowUp, toDisable: disabled });
const sleepBaseLine = (disabled) => ({ type: t.sleepBaseLine, toDisable: disabled });
const sleepFollowUp = (disabled) => ({ type: t.sleepFollowUp, toDisable: disabled });
const reproduceBaseLine = (disabled) => ({ type: t.reproduceBaseLine, toDisable: disabled });
const reproduceFollowUp = (disabled) => ({ type: t.reproduceFollowUp, toDisable: disabled });
const reportedHealthBaseLine = (disabled) => ({ type: t.reportedHealthBaseLine, toDisable: disabled });
const reportedHealthFollowUp = (disabled) => ({ type: t.reportedHealthFollowUp, toDisable: disabled });
const lifeBaseLine = (disabled) => ({ type: t.lifeBaseLine, toDisable: disabled });
const lifeFollowUp = (disabled) => ({ type: t.lifeFollowUp, toDisable: disabled });
const socialSupportBaseLine = (disabled) => ({ type: t.socialSupportBaseLine, toDisable: disabled });
const socialSupportFollowUp = (disabled) => ({ type: t.socialSupportFollowUp, toDisable: disabled });
const cognitionBaseLine = (disabled) => ({ type: t.cognitionBaseLine, toDisable: disabled });
const cognitionFollowUp = (disabled) => ({ type: t.cognitionFollowUp, toDisable: disabled });
const depressionBaseLine = (disabled) => ({ type: t.depressionBaseLine, toDisable: disabled });
const depressionFollowUp = (disabled) => ({ type: t.depressionFollowUp, toDisable: disabled });
const psychosocialBaseLine = (disabled) => ({ type: t.psychosocialBaseLine, toDisable: disabled });
const psychosocialFollowUp = (disabled) => ({ type: t.psychosocialFollowUp, toDisable: disabled });
const fatigueBaseLine = (disabled) => ({ type: t.fatigueBaseLine, toDisable: disabled });
const fatigueFollowUp = (disabled) => ({ type: t.fatigueFollowUp, toDisable: disabled });
const cancerHistoryBaseLine = (disabled) => ({ type: t.cancerHistoryBaseLine, toDisable: disabled });
const cancerHistoryFollowUp = (disabled) => ({ type: t.cancerHistoryFollowUp, toDisable: disabled });
const cancerPedigreeBaseLine = (disabled) => ({ type: t.cancerPedigreeBaseLine, toDisable: disabled });
const cancerPedigreeFollowUp = (disabled) => ({ type: t.cancerPedigreeFollowUp, toDisable: disabled });
const physicalMeasureBaseLine = (disabled) => ({ type: t.physicalMeasureBaseLine, toDisable: disabled });
const physicalMeasureFollowUp = (disabled) => ({ type: t.physicalMeasureFollowUp, toDisable: disabled });
const exposureBaseLine = (disabled) => ({ type: t.exposureBaseLine, toDisable: disabled });
const exposureFollowUp = (disabled) => ({ type: t.exposureFollowUp, toDisable: disabled });
const residenceBaseLine = (disabled) => ({ type: t.residenceBaseLine, toDisable: disabled });
const residenceFollowUp = (disabled) => ({ type: t.residenceFollowUp, toDisable: disabled });
const sexgenderIdentityBaseLine = (disabled) => ({ type: t.sexgenderIdentityBaseLine, toDisable: disabled });
const sexgenderIdentityFollowUp = (disabled) => ({ type: t.sexgenderIdentityFollowUp, toDisable: disabled });
const diabetesBaseLine = (disabled) => ({ type: t.diabetesBaseLine, toDisable: disabled });
const diabetesFollowUp = (disabled) => ({ type: t.diabetesFollowUp, toDisable: disabled });
const strokeBaseLine = (disabled) => ({ type: t.strokeBaseLine, toDisable: disabled });
const strokeFollowUp = (disabled) => ({ type: t.strokeFollowUp, toDisable: disabled });
const copdBaseLine = (disabled) => ({ type: t.copdBaseLine, toDisable: disabled });
const copdFollowUp = (disabled) => ({ type: t.copdFollowUp, toDisable: disabled });
const cardiovascularBaseLine = (disabled) => ({ type: t.cardiovascularBaseLine, toDisable: disabled });
const cardiovascularFollowUp = (disabled) => ({ type: t.cardiovascularFollowUp, toDisable: disabled });
const osteoporosisBaseLine = (disabled) => ({ type: t.osteoporosisBaseLine, toDisable: disabled });
const osteoporosisFollowUp = (disabled) => ({ type: t.osteoporosisFollowUp, toDisable: disabled });
const mentalBaseLine = (disabled) => ({ type: t.mentalBaseLine, toDisable: disabled });
const mentalFollowUp = (disabled) => ({ type: t.mentalFollowUp, toDisable: disabled });
const cognitiveDeclineBaseLine = (disabled) => ({ type: t.cognitiveDeclineBaseLine, toDisable: disabled });
const cognitiveDeclineFollowUp = (disabled) => ({ type: t.cognitiveDeclineFollowUp, toDisable: disabled });
const cancerRelatedConditionsNA = (disabled) => ({ type: t.cancerRelatedConditionsNA, toDisable: disabled });
const cancerToxicity = (disabled) => ({ type: t.cancerToxicity, toDisable: disabled });
const cancerLateEffects = (disabled) => ({ type: t.cancerLateEffects, toDisable: disabled });
const cancerSymptom = (disabled) => ({ type: t.cancerSymptom, toDisable: disabled });
const cancerOther = (disabled) => ({ type: t.cancerOther, toDisable: disabled });
const cancerOtherSpecify = (disabled) => ({ type: t.cancerOtherSpecify, toDisable: disabled });

export default {
  seStatusBaseLine,
  seStatusFollowUp,
  educationBaseLine,
  educationFollowUp,
  maritalStatusBaseLine,
  maritalStatusFollowUp,
  originBaseLine,
  originFollowUp,
  empStatusBaseLine,
  empStatusFollowUp,
  insuranceStatusBaseLine,
  insuranceStatusFollowUp,
  anthropometryBaseLine,
  anthropometryFollowUp,
  dietaryBaseLine,
  dietaryFollowUp,
  supplementBaseLine,
  supplementFollowUp,
  medicineBaseLine,
  medicineFollowUp,
  prescriptionBaseLine,
  prescriptionFollowUp,
  nonprescriptionBaseLine,
  nonprescriptionFollowUp,
  alcoholBaseLine,
  alcoholFollowUp,
  cigaretteBaseLine,
  cigaretteFollowUp,
  tobaccoUseBaseLine,
  tobaccoUseFollowUp,
  cigarBaseLine,
  cigarFollowUp,
  pipeBaseLine,
  pipeFollowUp,
  tobaccoBaseLine,
  tobaccoFollowUp,
  ecigarBaseLine,
  ecigarFollowUp,
  noncigarOtherBaseLine,
  noncigarOtherFollowUp,
  noncigarBaseLineSpecify,
  noncigarFollowUpSpecify,
  physicalBaseLine,
  physicalFollowUp,
  sleepBaseLine,
  sleepFollowUp,
  reproduceBaseLine,
  reproduceFollowUp,
  reportedHealthBaseLine,
  reportedHealthFollowUp,
  lifeBaseLine,
  lifeFollowUp,
  socialSupportBaseLine,
  socialSupportFollowUp,
  cognitionBaseLine,
  cognitionFollowUp,
  depressionBaseLine,
  depressionFollowUp,
  psychosocialBaseLine,
  psychosocialFollowUp,
  fatigueBaseLine,
  fatigueFollowUp,
  cancerHistoryBaseLine,
  cancerHistoryFollowUp,
  cancerPedigreeBaseLine,
  cancerPedigreeFollowUp,
  physicalMeasureBaseLine,
  physicalMeasureFollowUp,
  exposureBaseLine,
  exposureFollowUp,
  residenceBaseLine,
  residenceFollowUp,
  sexgenderIdentityBaseLine,
  sexgenderIdentityFollowUp,
  diabetesBaseLine,
  diabetesFollowUp,
  strokeBaseLine,
  strokeFollowUp,
  copdBaseLine,
  copdFollowUp,
  cardiovascularBaseLine,
  cardiovascularFollowUp,
  osteoporosisBaseLine,
  osteoporosisFollowUp,
  mentalBaseLine,
  mentalFollowUp,
  cognitiveDeclineBaseLine,
  cognitiveDeclineFollowUp,
  cancerRelatedConditionsNA,
  cancerToxicity,
  cancerLateEffects,
  cancerSymptom,
  cancerOther,
  cancerOtherSpecify,
};
