import t from '../actionTypes'
import InitialStates from '../states'
const actions = {}
actions[t.majorContentLoaded] = (state, action) => ({ ...state, hasLoaded: action.value })
actions[t.setSeStatusBaseLine] = (state, action) => ({ ...state, seStatusBaseLine: action.value })
actions[t.setSeStatusFollowUp] = (state, action) => ({ ...state, seStatusFollowUp: action.value })
actions[t.setEducationBaseLine] = (state, action) => ({ ...state, educationBaseLine: action.value })
actions[t.setEducationFollowUp] = (state, action) => ({ ...state, educationFollowUp: action.value })
actions[t.setMaritalStatusBaseLine] = (state, action) => ({ ...state, maritalStatusBaseLine: action.value })
actions[t.setMaritalStatusFollowUp] = (state, action) => ({ ...state, maritalStatusFollowUp: action.value })
actions[t.setOriginBaseLine] = (state, action) => ({ ...state, originBaseLine: action.value })
actions[t.setOriginFollowUp] = (state, action) => ({ ...state, originFollowUp: action.value })
actions[t.setEmpStatusBaseLine] = (state, action) => ({ ...state, empStatusBaseLine: action.value })
actions[t.setEmpStatusFollowUp] = (state, action) => ({ ...state, empStatusFollowUp: action.value })
actions[t.setInsuranceStatusBaseLine] = (state, action) => ({ ...state, insuranceStatusBaseLine: action.value })
actions[t.setInsuranceStatusFollowUp] = (state, action) => ({ ...state, insuranceStatusFollowUp: action.value })
actions[t.setAnthropometryBaseLine] = (state, action) => ({ ...state, anthropometryBaseLine: action.value })
actions[t.setAnthropometryFollowUp] = (state, action) => ({ ...state, anthropometryFollowUp: action.value })

actions[t.setDietaryBaseLine] = (state, action) => ({ ...state, dietaryBaseLine: action.value })
actions[t.setDietaryFollowUp] = (state, action) => ({ ...state, dietaryFollowUp: action.value })

actions[t.setSupplementBaseLine] = (state, action) => ({ ...state, supplementBaseLine: action.value })
actions[t.setSupplementFollowUp] = (state, action) => ({ ...state, supplementFollowUp: action.value })

actions[t.setMedicineBaseLine] = (state, action) => ({ ...state, medicineBaseLine: action.value })
actions[t.setMedicineFollowUp] = (state, action) => ({ ...state, medicineFollowUp: action.value })

actions[t.setPrescriptionBaseLine] = (state, action) => ({ ...state, prescriptionBaseLine: action.value })
actions[t.setPrescriptionFollowUp] = (state, action) => ({ ...state, prescriptionFollowUp: action.value })
actions[t.setNonprescriptionBaseLine] = (state, action) => ({ ...state, nonprescriptionBaseLine: action.value })
actions[t.setNonprescriptionFollowUp] = (state, action) => ({ ...state, nonprescriptionFollowUp: action.value })
actions[t.setAlcoholBaseLine] = (state, action) => ({ ...state, alcoholBaseLine: action.value })
actions[t.setAlcoholFollowUp] = (state, action) => ({ ...state, alcoholFollowUp: action.value })
actions[t.setCigaretteBaseLine] = (state, action) => ({ ...state, cigaretteBaseLine: action.value })
actions[t.setCigaretteFollowUp] = (state, action) => ({ ...state, cigaretteFollowUp: action.value })
actions[t.setTobaccoUseBaseLine] = (state, action) => ({
    ...state,
    tobaccoUseBaseLine: action.value,
    cigarBaseLine: !action.value ? state.cigarBaseLine || 0 : 0,
    pipeBaseLine: !action.value ? state.pipeBaseLine || 0 : 0,
    tobaccoBaseLine: !action.value ? state.tobaccoBaseLine || 0 : 0,
    ecigarBaseLine: !action.value ? state.ecigarBaseLine || 0 : 0,
    noncigarOtherBaseLine: !action.value ? state.noncigarOtherBaseLine || 0 : 0,
    noncigarBaseLineSpecify: !action.value ? state.noncigarBaseLineSpecify || '' : ''
})
actions[t.setTobaccoUseFollowUp] = (state, action) => ({
    ...state,
    tobaccoUseFollowUp: action.value,
    cigarFollowUp: !action.value ? state.cigarFollowUp || 0 : 0,
    pipeFollowUp: !action.value ? state.pipeBFollowUp || 0 : 0,
    tobaccoFollowUp: !action.value ? state.tobaccoFollowUp || 0 : 0,
    ecigarFollowUp: !action.value ? state.ecigarFollowUp || 0 : 0,
    noncigarOtherFollowUp: !action.value ? state.noncigarOtherFollowUp || 0 : 0,
    noncigarFollowUpSpecify: !action.value ? state.noncigarFollowUpSpecify || '' : ''
})
actions[t.setCigarBaseLine] = (state, action) => ({ ...state, cigarBaseLine: action.value })
actions[t.setCigarFollowUp] = (state, action) => ({ ...state, cigarFollowUp: action.value })
actions[t.setPipeBaseLine] = (state, action) => ({ ...state, pipeBaseLine: action.value })
actions[t.setPipeFollowUp] = (state, action) => ({ ...state, pipeFollowUp: action.value })
actions[t.setTobaccoBaseLine] = (state, action) => ({ ...state, tobaccoBaseLine: action.value })
actions[t.setTobaccoFollowUp] = (state, action) => ({ ...state, tobaccoFollowUp: action.value })
actions[t.setEcigarBaseLine] = (state, action) => ({ ...state, ecigarBaseLine: action.value })
actions[t.setEcigarFollowUp] = (state, action) => ({ ...state, ecigarFollowUp: action.value })
actions[t.setNoncigarOtherBaseLine] = (state, action) => ({ ...state, noncigarOtherBaseLine: action.value, noncigarBaseLineSpecify: action.value ? state.noncigarBaseLineSpecify : '' })
actions[t.setNoncigarOtherFollowUp] = (state, action) => ({ ...state, noncigarOtherFollowUp: action.value, noncigarFollowUpSpecify: action.value ? state.noncigarFollowUpSpecify : '' })
actions[t.setNoncigarBaseLineSpecify] = (state, action) => ({ ...state, noncigarBaseLineSpecify: action.value })
actions[t.setNoncigarFollowUpSpecify] = (state, action) => ({ ...state, noncigarFollowUpSpecify: action.value })
actions[t.setPhysicalBaseLine] = (state, action) => ({ ...state, physicalBaseLine: action.value })
actions[t.setPhysicalFollowUp] = (state, action) => ({ ...state, physicalFollowUp: action.value })
actions[t.setSleepBaseLine] = (state, action) => ({ ...state, sleepBaseLine: action.value })
actions[t.setSleepFollowUp] = (state, action) => ({ ...state, sleepFollowUp: action.value })
actions[t.setReproduceBaseLine] = (state, action) => ({ ...state, reproduceBaseLine: action.value })
actions[t.setReproduceFollowUp] = (state, action) => ({ ...state, reproduceFollowUp: action.value })
actions[t.setReportedHealthBaseLine] = (state, action) => ({ ...state, reportedHealthBaseLine: action.value })
actions[t.setReportedHealthFollowUp] = (state, action) => ({ ...state, reportedHealthFollowUp: action.value })
actions[t.setLifeBaseLine] = (state, action) => ({ ...state, lifeBaseLine: action.value })
actions[t.setLifeFollowUp] = (state, action) => ({ ...state, lifeFollowUp: action.value })
actions[t.setSocialSupportBaseLine] = (state, action) => ({ ...state, socialSupportBaseLine: action.value })
actions[t.setSocialSupportFollowUp] = (state, action) => ({ ...state, socialSupportFollowUp: action.value })
actions[t.setCognitionBaseLine] = (state, action) => ({ ...state, cognitionBaseLine: action.value })
actions[t.setCognitionFollowUp] = (state, action) => ({ ...state, cognitionFollowUp: action.value })
actions[t.setDepressionBaseLine] = (state, action) => ({ ...state, depressionBaseLine: action.value })
actions[t.setDepressionFollowUp] = (state, action) => ({ ...state, depressionFollowUp: action.value })
actions[t.setPsychosocialBaseLine] = (state, action) => ({ ...state, psychosocialBaseLine: action.value })
actions[t.setPsychosocialFollowUp] = (state, action) => ({ ...state, psychosocialFollowUp: action.value })
actions[t.setFatigueBaseLine] = (state, action) => ({ ...state, fatigueBaseLine: action.value })
actions[t.setFatigueFollowUp] = (state, action) => ({ ...state, fatigueFollowUp: action.value })
actions[t.setCancerHistoryBaseLine] = (state, action) => ({ ...state, cancerHistoryBaseLine: action.value })
actions[t.setCancerHistoryFollowUp] = (state, action,) => ({ ...state, cancerHistoryFollowUp: action.value })
actions[t.setCancerPedigreeBaseLine] = (state, action) => ({ ...state, cancerPedigreeBaseLine: action.value })
actions[t.setCancerPedigreeFollowUp] = (state, action) => ({ ...state, cancerPedigreeFollowUp: action.value })
actions[t.setPhysicalMeasureBaseLine] = (state, action) => ({ ...state, physicalMeasureBaseLine: action.value })
actions[t.setPhysicalMeasureFollowUp] = (state, action) => ({ ...state, physicalMeasureFollowUp: action.value })
actions[t.setExposureBaseLine] = (state, action) => ({ ...state, exposureBaseLine: action.value })
actions[t.setExposureFollowUp] = (state, action) => ({ ...state, exposureFollowUp: action.value })
actions[t.setResidenceBaseLine] = (state, action) => ({ ...state, residenceBaseLine: action.value })
actions[t.setResidenceFollowUp] = (state, action) => ({ ...state, residenceFollowUp: action.value })
actions[t.setDiabetesBaseLine] = (state, action) => ({ ...state, diabetesBaseLine: action.value })
actions[t.setDiabetesFollowUp] = (state, action) => ({ ...state, diabetesFollowUp: action.value })
actions[t.setStrokeBaseLine] = (state, action) => ({ ...state, strokeBaseLine: action.value })
actions[t.setStrokeFollowUp] = (state, action) => ({ ...state, strokeFollowUp: action.value })
actions[t.setCopdBaseLine] = (state, action) => ({ ...state, copdBaseLine: action.value })
actions[t.setCopdFollowUp] = (state, action) => ({ ...state, copdFollowUp: action.value })
actions[t.setCardiovascularBaseLine] = (state, action) => ({ ...state, cardiovascularBaseLine: action.value })
actions[t.setCardiovascularFollowUp] = (state, action) => ({ ...state, cardiovascularFollowUp: action.value })
actions[t.setOsteoporosisBaseLine] = (state, action) => ({ ...state, osteoporosisBaseLine: action.value })
actions[t.setOsteoporosisFollowUp] = (state, action) => ({ ...state, osteoporosisFollowUp: action.value })
actions[t.setMentalBaseLine] = (state, action) => ({ ...state, mentalBaseLine: action.value })
actions[t.setMentalFollowUp] = (state, action) => ({ ...state, mentalFollowUp: action.value })
actions[t.setCognitiveDeclineBaseLine] = (state, action) => ({ ...state, cognitiveDeclineBaseLine: action.value })
actions[t.setCognitiveDeclineFollowUp] = (state, action) => ({ ...state, cognitiveDeclineFollowUp: action.value })
actions[t.setCancerRelatedConditions] = (state, action) => ({
    ...state,
    cancerRelatedConditionsNA: action.value,
    cancerToxicity: !action.value ? state.cancerToxicity || 0 : 0,
    cancerLateEffects: !action.value ? state.cancerLateEffects || 0 : 0,
    cancerSymptom: !action.value ? state.cancerSymptom || 0 : 0,
    cancerOther: !action.value ? state.cancerOther || 0 : 0,
    cancerOtherSpecify: !action.value ? state.cancerOtherSpecify || '' : ''
})
actions[t.setCancerToxicity] = (state, action) => ({ ...state, cancerToxicity: action.value })
actions[t.setCancerLateEffects] = (state, action) => ({ ...state, cancerLateEffects: action.value })
actions[t.setCancerSymptom] = (state, action) => ({ ...state, cancerSymptom: action.value })
actions[t.setCancerOther] = (state, action) => ({ ...state, cancerOther: action.value, cancerOtherSpecify: action.value ? state.cancerOtherSpecify : '' })
actions[t.setCancerOtherSpecify] = (state, action) => ({ ...state, cancerOtherSpecify: action.value })
actions[t.setSectionCStatus] = (state, action) => ({ ...state, sectionCStatus: action.value })
const getResult = feedState => feedAction => actions[feedAction.type] && actions[feedAction.type](feedState, feedAction) || feedState
const majorContent = (state = InitialStates.majorContent, action = {}) => getResult(state)(action)

export default majorContent