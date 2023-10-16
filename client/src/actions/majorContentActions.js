import t from "../actionTypes";

const setHasLoaded = (v) => ({ type: t.majorContentLoaded, value: v });
const seStatusBaseLine = (v) => ({ type: t.setSeStatusBaseLine, value: v });
const seStatusFollowUp = (v) => ({ type: t.setSeStatusFollowUp, value: v });
const educationBaseLine = (v) => ({ type: t.setEducationBaseLine, value: v });
const educationFollowUp = (v) => ({ type: t.setEducationFollowUp, value: v });
const maritalStatusBaseLine = (v) => ({ type: t.setMaritalStatusBaseLine, value: v });
const maritalStatusFollowUp = (v) => ({ type: t.setMaritalStatusFollowUp, value: v });
const originBaseLine = (v) => ({ type: t.setOriginBaseLine, value: v });
const originFollowUp = (v) => ({ type: t.setOriginFollowUp, value: v });
const empStatusBaseLine = (v) => ({ type: t.setEmpStatusBaseLine, value: v });
const empStatusFollowUp = (v) => ({ type: t.setEmpStatusFollowUp, value: v });
const insuranceStatusBaseLine = (v) => ({ type: t.setInsuranceStatusBaseLine, value: v });
const insuranceStatusFollowUp = (v) => ({ type: t.setInsuranceStatusFollowUp, value: v });
const anthropometryBaseLine = (v) => ({ type: t.setAnthropometryBaseLine, value: v });
const anthropometryFollowUp = (v) => ({ type: t.setAnthropometryFollowUp, value: v });
const dietaryBaseLine = (v) => ({ type: t.setDietaryBaseLine, value: v });
const dietaryFollowUp = (v) => ({ type: t.setDietaryFollowUp, value: v });
const supplementBaseLine = (v) => ({ type: t.setSupplementBaseLine, value: v });
const supplementFollowUp = (v) => ({ type: t.setSupplementFollowUp, value: v });
const medicineBaseLine = (v) => ({ type: t.setMedicineBaseLine, value: v });
const medicineFollowUp = (v) => ({ type: t.setMedicineFollowUp, value: v });

const prescriptionBaseLine = (v) => ({ type: t.setPrescriptionBaseLine, value: v });
const prescriptionFollowUp = (v) => ({ type: t.setPrescriptionFollowUp, value: v });
const nonprescriptionBaseLine = (v) => ({ type: t.setNonprescriptionBaseLine, value: v });
const nonprescriptionFollowUp = (v) => ({ type: t.setNonprescriptionFollowUp, value: v });
const alcoholBaseLine = (v) => ({ type: t.setAlcoholBaseLine, value: v });
const alcoholFollowUp = (v) => ({ type: t.setAlcoholFollowUp, value: v });
const cigaretteBaseLine = (v) => ({ type: t.setCigaretteBaseLine, value: v });
const cigaretteFollowUp = (v) => ({ type: t.setCigaretteFollowUp, value: v });
const tobaccoUseBaseLine = (v) => ({ type: t.setTobaccoUseBaseLine, value: v });
const tobaccoUseFollowUp = (v) => ({ type: t.setTobaccoUseFollowUp, value: v });
const cigarBaseLine = (v) => ({ type: t.setCigarBaseLine, value: v });
const cigarFollowUp = (v) => ({ type: t.setCigarFollowUp, value: v });
const pipeBaseLine = (v) => ({ type: t.setPipeBaseLine, value: v });
const pipeFollowUp = (v) => ({ type: t.setPipeFollowUp, value: v });
const tobaccoBaseLine = (v) => ({ type: t.setTobaccoBaseLine, value: v });
const tobaccoFollowUp = (v) => ({ type: t.setTobaccoFollowUp, value: v });
const ecigarBaseLine = (v) => ({ type: t.setEcigarBaseLine, value: v });
const ecigarFollowUp = (v) => ({ type: t.setEcigarFollowUp, value: v });
const noncigarOtherBaseLine = (v) => ({ type: t.setNoncigarOtherBaseLine, value: v });
const noncigarOtherFollowUp = (v) => ({ type: t.setNoncigarOtherFollowUp, value: v });
const noncigarBaseLineSpecify = (v) => ({ type: t.setNoncigarBaseLineSpecify, value: v });
const noncigarFollowUpSpecify = (v) => ({ type: t.setNoncigarFollowUpSpecify, value: v });
const physicalBaseLine = (v) => ({ type: t.setPhysicalBaseLine, value: v });
const physicalFollowUp = (v) => ({ type: t.setPhysicalFollowUp, value: v });
const sleepBaseLine = (v) => ({ type: t.setSleepBaseLine, value: v });
const sleepFollowUp = (v) => ({ type: t.setSleepFollowUp, value: v });
const reproduceBaseLine = (v) => ({ type: t.setReproduceBaseLine, value: v });
const reproduceFollowUp = (v) => ({ type: t.setReproduceFollowUp, value: v });
const reportedHealthBaseLine = (v) => ({ type: t.setReportedHealthBaseLine, value: v });
const reportedHealthFollowUp = (v) => ({ type: t.setReportedHealthFollowUp, value: v });
const lifeBaseLine = (v) => ({ type: t.setLifeBaseLine, value: v });
const lifeFollowUp = (v) => ({ type: t.setLifeFollowUp, value: v });
const socialSupportBaseLine = (v) => ({ type: t.setSocialSupportBaseLine, value: v });
const socialSupportFollowUp = (v) => ({ type: t.setSocialSupportFollowUp, value: v });
const cognitionBaseLine = (v) => ({ type: t.setCognitionBaseLine, value: v });
const cognitionFollowUp = (v) => ({ type: t.setCognitionFollowUp, value: v });
const depressionBaseLine = (v) => ({ type: t.setDepressionBaseLine, value: v });
const depressionFollowUp = (v) => ({ type: t.setDepressionFollowUp, value: v });
const psychosocialBaseLine = (v) => ({ type: t.setPsychosocialBaseLine, value: v });
const psychosocialFollowUp = (v) => ({ type: t.setPsychosocialFollowUp, value: v });
const fatigueBaseLine = (v) => ({ type: t.setFatigueBaseLine, value: v });
const fatigueFollowUp = (v) => ({ type: t.setFatigueFollowUp, value: v });
const cancerHistoryBaseLine = (v) => ({ type: t.setCancerHistoryBaseLine, value: v });
const cancerHistoryFollowUp = (v) => ({ type: t.setCancerHistoryFollowUp, value: v });
const cancerPedigreeBaseLine = (v) => ({ type: t.setCancerPedigreeBaseLine, value: v });
const cancerPedigreeFollowUp = (v) => ({ type: t.setCancerPedigreeFollowUp, value: v });
const physicalMeasureBaseLine = (v) => ({ type: t.setPhysicalMeasureBaseLine, value: v });
const physicalMeasureFollowUp = (v) => ({ type: t.setPhysicalMeasureFollowUp, value: v });
const exposureBaseLine = (v) => ({ type: t.setExposureBaseLine, value: v });
const exposureFollowUp = (v) => ({ type: t.setExposureFollowUp, value: v });
const residenceBaseLine = (v) => ({ type: t.setResidenceBaseLine, value: v });
const residenceFollowUp = (v) => ({ type: t.setResidenceFollowUp, value: v });
const sexgenderIdentityBaseLine = (v) => ({ type: t.setSexGenderIdentityBaseLine, value: v });
const sexgenderIdentityFollowUp = (v) => ({ type: t.setSexGenderIdentityFollowUp, value: v });
const diabetesBaseLine = (v) => ({ type: t.setDiabetesBaseLine, value: v });
const diabetesFollowUp = (v) => ({ type: t.setDiabetesFollowUp, value: v });
const strokeBaseLine = (v) => ({ type: t.setStrokeBaseLine, value: v });
const strokeFollowUp = (v) => ({ type: t.setStrokeFollowUp, value: v });
const copdBaseLine = (v) => ({ type: t.setCopdBaseLine, value: v });
const copdFollowUp = (v) => ({ type: t.setCopdFollowUp, value: v });
const cardiovascularBaseLine = (v) => ({ type: t.setCardiovascularBaseLine, value: v });
const cardiovascularFollowUp = (v) => ({ type: t.setCardiovascularFollowUp, value: v });
const osteoporosisBaseLine = (v) => ({ type: t.setOsteoporosisBaseLine, value: v });
const osteoporosisFollowUp = (v) => ({ type: t.setOsteoporosisFollowUp, value: v });
const mentalBaseLine = (v) => ({ type: t.setMentalBaseLine, value: v });
const mentalFollowUp = (v) => ({ type: t.setMentalFollowUp, value: v });
const cognitiveDeclineBaseLine = (v) => ({ type: t.setCognitiveDeclineBaseLine, value: v });
const cognitiveDeclineFollowUp = (v) => ({ type: t.setCognitiveDeclineFollowUp, value: v });
const cancerRelatedConditionsNA = (v) => ({ type: t.setCancerRelatedConditions, value: v });
const cancerToxicity = (v) => ({ type: t.setCancerToxicity, value: v });
const cancerLateEffects = (v) => ({ type: t.setCancerLateEffects, value: v });
const cancerSymptom = (v) => ({ type: t.setCancerSymptom, value: v });
const cancerOther = (v) => ({ type: t.setCancerOther, value: v });
const cancerOtherSpecify = (v) => ({ type: t.setCancerOtherSpecify, value: v });
const setSectionCStatus = (v) => ({ type: t.setSectionCStatus, value: v });
export default {
  setHasLoaded,
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
  setSectionCStatus,
};
