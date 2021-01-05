import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Reminder from '../Tooltip/Tooltip'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';

const MajorContentForm = ({ ...props }) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.majorContentErrorReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const cohortId = useSelector(state => state.cohortIDReducer)
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly || false
    const [activePanel, setActivePanel] = useState('panelA')
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    //const cohortId = +window.location.pathname.split('/').pop();



    useEffect(() => {
        //let id = 118
        //window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', `/cohort/questionnaire/${id}`)
        if (!majorContent.hasLoaded) {
            fetch(`/api/questionnaire/major_content/${cohortId}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {
                    let content = result.data.counts
                    let cancerInfo = result.data.cancerInfo

                    batch(() => {
                        dispatch(allactions.majorContentActions.setSeStatusBaseLine(content[0].baseline))
                        dispatch(allactions.majorContentActions.setSeStatusFollowUp(content[0].followup))
                        dispatch(allactions.majorContentActions.setEducationBaseLine(content[1].baseline))
                        dispatch(allactions.majorContentActions.setEducationFollowUp(content[1].followup))
                        dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(content[2].baseline))
                        dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(content[2].followup))
                        dispatch(allactions.majorContentActions.setOriginBaseLine(content[3].baseline))
                        dispatch(allactions.majorContentActions.setOriginFollowUp(content[3].followup))
                        dispatch(allactions.majorContentActions.setEmpStatusBaseLine(content[4].baseline))
                        dispatch(allactions.majorContentActions.setEmpStatusFollowUp(content[4].followup))
                        dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(content[5].baseline))
                        dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(content[5].followup))
                        dispatch(allactions.majorContentActions.setAnthropometryBaseLine(content[6].baseline))
                        dispatch(allactions.majorContentActions.setAnthropometryFollowUp(content[6].followup))
                        dispatch(allactions.majorContentActions.setDietaryBaseLine(content[7].baseline))
                        dispatch(allactions.majorContentActions.setDietaryFollowUp(content[7].followup))
                        dispatch(allactions.majorContentActions.setSupplementBaseLine(content[8].baseline))
                        dispatch(allactions.majorContentActions.setSupplementFollowUp(content[8].followup))
                        dispatch(allactions.majorContentActions.setMedicineBaseLine(content[9].baseline))
                        dispatch(allactions.majorContentActions.setMedicineFollowUp(content[9].followup))
                        dispatch(allactions.majorContentActions.setPrescriptionBaseLine(content[10].baseline))
                        dispatch(allactions.majorContentActions.setPrescriptionFollowUp(content[10].followup))
                        dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(content[11].baseline))
                        dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(content[11].followup))
                        dispatch(allactions.majorContentActions.setAlcoholBaseLine(content[12].baseline))
                        dispatch(allactions.majorContentActions.setAlcoholFollowUp(content[12].followup))
                        dispatch(allactions.majorContentActions.setCigaretteBaseLine(content[13].baseline))
                        dispatch(allactions.majorContentActions.setCigaretteFollowUp(content[13].followup))
                        dispatch(allactions.majorContentActions.setCigarBaseLine(content[14].baseline))
                        dispatch(allactions.majorContentActions.setCigarFollowUp(content[14].followup))
                        dispatch(allactions.majorContentActions.setPipeBaseLine(content[15].baseline))
                        dispatch(allactions.majorContentActions.setPipeFollowUp(content[15].followup))
                        dispatch(allactions.majorContentActions.setTobaccoBaseLine(content[16].baseline))
                        dispatch(allactions.majorContentActions.setTobaccoFollowUp(content[16].followup))
                        dispatch(allactions.majorContentActions.setEcigarBaseLine(content[17].baseline))
                        dispatch(allactions.majorContentActions.setEcigarFollowUp(content[17].followup))
                        dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(content[18].baseline))
                        dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(content[18].followup))
                        dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(content[18].other_specify_baseline))
                        dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(content[18].other_specify_followup))
                        dispatch(allactions.majorContentActions.setPhysicalBaseLine(content[19].baseline))
                        dispatch(allactions.majorContentActions.setPhysicalFollowUp(content[19].followup))
                        dispatch(allactions.majorContentActions.setSleepBaseLine(content[20].baseline))
                        dispatch(allactions.majorContentActions.setSleepFollowUp(content[20].followup))
                        dispatch(allactions.majorContentActions.setReproduceBaseLine(content[21].baseline))
                        dispatch(allactions.majorContentActions.setReproduceFollowUp(content[21].followup))
                        dispatch(allactions.majorContentActions.setReportedHealthBaseLine(content[22].baseline))
                        dispatch(allactions.majorContentActions.setReportedHealthFollowUp(content[22].followup))
                        dispatch(allactions.majorContentActions.setLifeBaseLine(content[23].baseline))
                        dispatch(allactions.majorContentActions.setLifeFollowUp(content[23].followup))
                        dispatch(allactions.majorContentActions.setSocialSupportBaseLine(content[24].baseline))
                        dispatch(allactions.majorContentActions.setSocialSupportFollowUp(content[24].followup))
                        dispatch(allactions.majorContentActions.setCognitionBaseLine(content[25].baseline))
                        dispatch(allactions.majorContentActions.setCognitionFollowUp(content[25].followup))
                        dispatch(allactions.majorContentActions.setDepressionBaseLine(content[26].baseline))
                        dispatch(allactions.majorContentActions.setDepressionFollowUp(content[26].followup))
                        dispatch(allactions.majorContentActions.setPsychosocialBaseLine(content[27].baseline))
                        dispatch(allactions.majorContentActions.setPsychosocialFollowUp(content[27].followup))
                        dispatch(allactions.majorContentActions.setFatigueBaseLine(content[28].baseline))
                        dispatch(allactions.majorContentActions.setFatigueFollowUp(content[28].followup))
                        dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(content[29].baseline))
                        dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(content[29].followup))
                        dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(content[30].baseline))
                        dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(content[30].followup))

                        dispatch(allactions.majorContentActions.setExposureBaseLine(content[31].baseline))
                        dispatch(allactions.majorContentActions.setExposureFollowUp(content[31].followup))
                        dispatch(allactions.majorContentActions.setResidenceBaseLine(content[32].baseline))
                        dispatch(allactions.majorContentActions.setResidenceFollowUp(content[32].followup))
                        dispatch(allactions.majorContentActions.setDiabetesBaseLine(content[33].baseline))
                        dispatch(allactions.majorContentActions.setDiabetesFollowUp(content[33].followup))
                        dispatch(allactions.majorContentActions.setStrokeBaseLine(content[34].baseline))
                        dispatch(allactions.majorContentActions.setStrokeFollowUp(content[34].followup))
                        dispatch(allactions.majorContentActions.setCopdBaseLine(content[35].baseline))
                        dispatch(allactions.majorContentActions.setCopdFollowUp(content[35].followup))
                        dispatch(allactions.majorContentActions.setCardiovascularBaseLine(content[36].baseline))
                        dispatch(allactions.majorContentActions.setCardiovascularFollowUp(content[36].followup))
                        dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(content[37].baseline))
                        dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(content[37].followup))
                        dispatch(allactions.majorContentActions.setMentalBaseLine(content[38].baseline))
                        dispatch(allactions.majorContentActions.setMentalFollowUp(content[38].followup))
                        dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(content[39].baseline))
                        dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(content[39].followup))
                        if (content[40]) {
                            dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(content[40].baseline))
                            dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(content[40].followup))
                        }

                        dispatch(allactions.majorContentActions.setCancerToxicity(cancerInfo.cancerToxicity))
                        dispatch(allactions.majorContentActions.setCancerLateEffects(cancerInfo.cancerLateEffects))
                        dispatch(allactions.majorContentActions.setCancerSymptom(cancerInfo.cancerSymptom))
                        dispatch(allactions.majorContentActions.setCancerOther(cancerInfo.cancerOther))
                        dispatch(allactions.majorContentActions.setCancerOtherSpecify(cancerInfo.cancerOtherSpecify))
                        //dispatch(allactions.majorContentActions.setHasLoaded(true))

                        if ([0,1].includes(content[0].baseline)) {  dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }
                        if ([0,1].includes(content[0].followup)) {  dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }
                        if ([0,1].includes(content[1].baseline)) {  dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }
                        if ([0,1].includes(content[1].followup)) {  dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }
                        if ([0,1].includes(content[2].baseline)) {  dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }
                        if ([0,1].includes(content[2].followup)) {  dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }
                        if ([0,1].includes(content[3].baseline)) {  dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }
                        if ([0,1].includes(content[3].followup)) {  dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }
                        if ([0,1].includes(content[4].baseline)) {  dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }
                        if ([0,1].includes(content[4].followup)) {  dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }
                        if ([0,1].includes(content[5].baseline)) {  dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }
                        if ([0,1].includes(content[5].followup)) {  dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }
                        if ([0,1].includes(content[6].baseline)) {  dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }
                        if ([0,1].includes(content[6].followup)) {  dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }
                        if ([0,1].includes(content[7].baseline)) {  dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }
                        if ([0,1].includes(content[7].followup)) {  dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }
                        if ([0,1].includes(content[8].baseline)) {  dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }
                        if ([0,1].includes(content[8].followup)) {  dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }
                        if ([0,1].includes(content[9].baseline)) {  dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }
                        if ([0,1].includes(content[9].followup)) {  dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }
                        if ([0,1].includes(content[10].baseline)) {  dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }
                        if ([0,1].includes(content[10].followup)) {  dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }
                        if ([0,1].includes(content[11].baseline)) {  dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }
                        if ([0,1].includes(content[11].followup)) {  dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }
                        if ([0,1].includes(content[12].baseline)) {  dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }
                        if ([0,1].includes(content[12].followup)) {  dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }
                        if ([0,1].includes(content[13].baseline)) {  dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }
                        if ([0,1].includes(content[13].followup)) {  dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }
                        if (content[14].baseline == 1) {  dispatch(allactions.majorContentErrorActions.cigarBaseLine(true)) }
                        if (content[15].baseline == 1) {  dispatch(allactions.majorContentErrorActions.pipeBaseLine(true)) }
                        if (content[16].baseline == 1) {  dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(true)) }
                        if (content[17].baseline == 1) {  dispatch(allactions.majorContentErrorActions.ecigarBaseLine(true)) }
                        if (content[18].baseline == 1) {  dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(true)) }

                        if (content[14].followup == 1) {  dispatch(allactions.majorContentErrorActions.cigarFollowUp(true)) }
                        if (content[15].followup == 1) {  dispatch(allactions.majorContentErrorActions.pipeFollowUp(true)) }
                        if (content[16].followup == 1) {  dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(true)) }
                        if (content[17].followup == 1) {  dispatch(allactions.majorContentErrorActions.ecigarFollowUp(true)) }
                        if (content[18].followup == 1) {  dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(true)) }
                        if (content[18].baseline == 0 || content[18].other_specify_baseline) { dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(true)) }


                        if (content[18].followup == 0 || content[18].other_specify_followup) { dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(true)) }
                        if ([0,1].includes(content[19].baseline)) {  dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }
                        if ([0,1].includes(content[19].followup)) {  dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }
                        if ([0,1].includes(content[20].baseline)) {  dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }
                        if ([0,1].includes(content[20].followup)) {  dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }
                        if ([0,1].includes(content[21].baseline)) {  dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }
                        if ([0,1].includes(content[21].followup)) {  dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }
                        if ([0,1].includes(content[22].baseline)) {  dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }
                        if ([0,1].includes(content[22].followup)) {  dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }
                        if ([0,1].includes(content[23].baseline)) {  dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }
                        if ([0,1].includes(content[23].followup)) {  dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }
                        if ([0,1].includes(content[24].baseline)) {  dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }
                        if ([0,1].includes(content[24].followup)) {  dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }
                        if ([0,1].includes(content[25].baseline)) {  dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }
                        if ([0,1].includes(content[25].followup)) {  dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }
                        if ([0,1].includes(content[26].baseline)) {  dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }
                        if ([0,1].includes(content[26].followup)) {  dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }
                        if ([0,1].includes(content[27].baseline)) {  dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }
                        if ([0,1].includes(content[27].followup)) {  dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }
                        if ([0,1].includes(content[28].baseline)) {  dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }
                        if ([0,1].includes(content[28].followup)) {  dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }
                        if ([0,1].includes(content[29].baseline)) {  dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }
                        if ([0,1].includes(content[29].followup)) {  dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }
                        if ([0,1].includes(content[30].baseline)) {  dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }
                        if ([0,1].includes(content[30].followup)) {  dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }

                        if ([0,1].includes(content[31].baseline)) {  dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }
                        if ([0,1].includes(content[31].followup)) {  dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }
                        if ([0,1].includes(content[32].baseline)) {  dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }
                        if ([0,1].includes(content[32].followup)) {  dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }
                        if ([0,1].includes(content[33].baseline)) {  dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }
                        if ([0,1].includes(content[33].followup)) {  dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }
                        if ([0,1].includes(content[34].baseline)) {  dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }
                        if ([0,1].includes(content[34].followup)) {  dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }
                        if ([0,1].includes(content[35].baseline)) {  dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }
                        if ([0,1].includes(content[35].followup)) {  dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }
                        if ([0,1].includes(content[36].baseline)) {  dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }
                        if ([0,1].includes(content[36].followup)) {  dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }
                        if ([0,1].includes(content[37].baseline)) {  dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }
                        if ([0,1].includes(content[37].followup)) {  dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }
                        if ([0,1].includes(content[38].baseline)) {  dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }
                        if ([0,1].includes(content[38].followup)) {  dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }
                        if ([0,1].includes(content[39].baseline)) {  dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }
                        if ([0,1].includes(content[39].followup)) {  dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }
                        if (content[40]) {
                            if ([0,1].includes(content[40].baseline)) {  dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }
                            if ([0,1].includes(content[40].followup)) {  dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }
                        }

                        if (cancerInfo.cancerToxicity == 1) {  dispatch(allactions.majorContentErrorActions.cancerToxicity(true)) }
                        if (cancerInfo.cancerLateEffects == 1) { dispatch(allactions.majorContentErrorActions.cancerLateEffects(true)) }
                        if (cancerInfo.cancerSymptom == 1) {  dispatch(allactions.majorContentErrorActions.cancerSymptom(true)) }
                        if (cancerInfo.cancerOther == 1) { dispatch(allactions.majorContentErrorActions.cancerOther(true)) }

                        //if(cancerInfo.cancerToxicity || cancerInfo.cancerSymptom || cancerInfo.cancerLateEffects || cancerInfo.cancerOther)
                        //{dispatch(allactions.majorContentErrorActions.cancerToxicity = false; shadow.cancerLateEffects = false; shadow.cancerSymptom = false; shadow.cancerOther = false; changed=true;}
                        if (!cancerInfo.cancerOther || cancerInfo.cancerOtherSpecify) {
                            dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(true))
                        }

                        dispatch(allactions.majorContentActions.setHasLoaded(true))
                    })

                })//end of then
        }//end of if
    }, [])


    /*const refreshErrors = () => (errors.seStatusBaseLine && errors.seStatusFollowUp) || (errors.educationBaseLine && errors.educationFollowUp) || (errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) || (errors.originBaseLine && errors.originFollowUp) || (errors.empStatusBaseLine && errors.empStatusFollowUp) || (errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) || (errors.anthropometryBaseLine && errors.anthropometryFollowUp) || (errors.dietaryBaseLine && errors.dietaryFollowUp) || (errors.supplementBaseLine && errors.supplementFollowUp) || (errors.medicineBaseLine && errors.medicineFollowUp) || (errors.prescriptionBaseLine && errors.prescriptionFollowUp) || (errors.nonprescriptionBaseLine && errors.nonprescriptionFollowUp) || (errors.alcoholBaseLine && errors.alcoholFollowUp) || (errors.cigaretteBaseLine && errors.cigaretteFollowUp) || (errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.physicalBaseLine && errors.physicalFollowUp) || (errors.sleepBaseLine && errors.sleepFollowUp) || (errors.reproduceBaseLine && errors.reproduceFollowUp) || (errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) || (errors.lifeBaseLine && errors.lifeFollowUp) || (errors.socialSupportBaseLine && errors.socialSupportFollowUp) || (errors.cognitionBaseLine & errors.cognitionFollowUp) || (errors.depressionBaseLine && errors.depressionFollowUp) || (errors.psychosocialBaseLine && errors.psychosocialFollowUp) || (errors.fatigueBaseLine && errors.fatigueFollowUp) || (errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) || (errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) || (errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) || (errors.exposureBaseLine && errors.exposureFollowUp) || (errors.residenceBaseLine && errors.residenceFollowUp) || (errors.diabetesBaseLine && errors.diabetesFollowUp) || (errors.strokeBaseLine && errors.strokeFollowUp) || (errors.copdBaseLine && errors.copdFollowUp) || (errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) || (errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) || (errors.mentalBaseLine && errors.mentalFollowUp) || (errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify) */

    const refreshErrors = () => {
        console.log(errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp)
        for(let k of Object.keys(errors)){
            if(errors[k]) return true;
        }
        return false
    }

    const resetCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: nextStatus }))
                    }
                })
        }
    }

    const saveMajorContent = (id, errorsRemain = true, proceed = false) => {
        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    if (!errorsRemain)
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'incomplete'))
                    }
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId)
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                        if(result.data.status && result.data.status != cohortStatus){
                            dispatch(({type: 'SET_COHORT_STATUS', value: result.data.status}))
                            dispatch(fetchCohort(result.data.duplicated_cohort_id))
                        }
                    }
                    if (!proceed)
                        setSuccessMsg(true)
                    else
                        props.sectionPicker('D')
                } else {
                    setFailureMsg(true)
                }

            })
    }


    const handleSave = () => {
        setSaved(true)
        let errorsRemain = refreshErrors()
        if (!refreshErrors()) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, errorsRemain)
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)
        let errorsRemain = refreshErrors()
        if (!errorsRemain) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, errorsRemain, true)
        }
        else {
            setModalShow(true)
            setProceed(true)
        }
    }

    const confirmSaveStay = () => {
        majorContent.sectionCStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'));
        saveMajorContent(cohortId); setModalShow(false)
    }

    const confirmSaveContinue = () => {
        majorContent.sectionAStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
        saveMajorContent(cohortId, true); setModalShow(false)
    }

    return <div className='col-md-12'>
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
        <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>

            <div>
                <form>
                    <CollapsiblePanel
                        condition={activePanel === 'panelA'}
                        onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                        panelTitle="Major Content Domains">

                        <div >
                            <span>Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort</span>
                        </div>

                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.1 Socio-economic Status<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.seStatusBaseLine && errors.seStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setSeStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setSeStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setSeStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setSeStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.2 Education Level<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.educationBaseLine && errors.educationFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='educationBaseLine' checked={majorContent.educationBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEducationBaseLine(0)); dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='educationBaseLine' checked={majorContent.educationBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEducationBaseLine(1)); dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='educationFollowUp' checked={majorContent.educationFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEducationFollowUp(0)); dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='educationFollowUp' checked={majorContent.educationFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEducationFollowUp(1)); dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.3 Marital Status<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.4 Language/Country origin<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.originBaseLine && errors.originFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='originBaseLine' checked={majorContent.originBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setOriginBaseLine(0)); dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='originBaseLine' checked={majorContent.originBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setOriginBaseLine(1)); dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='originFollowUp' checked={majorContent.originFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setOriginFollowUp(0)); dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='originFollowUp' checked={majorContent.originFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setOriginFollowUp(1)); dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.5 Employment Status<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.empStatusBaseLine && errors.empStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEmpStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='empStatusBaseLine' checked={majorContent.originBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEmpStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEmpStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setEmpStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.6 Health Insurance Status<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-5 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.7 Anthropometry(e.g. weight, height)<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.anthropometryBaseLine && errors.anthropometryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setAnthropometryBaseLine(0)); dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setAnthropometryBaseLine(1)); dispatch(allactions.majorContentErrorActions.setAnthropometryBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setAnthropometryFollowUp(0)); dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setAnthropometryFollowUp(1)); dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.8 Dietary Intake<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.dietaryBaseLine && errors.dietaryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setDietaryBaseLine(0)); dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setDietaryBaseLine(1)); dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setDietaryFollowUp(0)); dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }} }/>{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) {dispatch(allactions.majorContentActions.setDietaryFollowUp(1)); dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.9 Dietary Supplement Use<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.supplementBaseLine && errors.supplementFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='supplementBaseLine' checked={majorContent.supplementBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSupplementBaseLine(0)); dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }} }/>{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSupplementBaseLine(1)); dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }} }/>{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='supplementFollowUp' checked={majorContent.supplementFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSupplementFollowUp(0)); dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSupplementFollowUp(1)); dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.10 Complementary and Alternative Medicine<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.medicineBaseLine && errors.medicineFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='medicineBaseLine' checked={majorContent.medicineBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMedicineBaseLine(0)); dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMedicineBaseLine(1)); dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='medicineFollowUp' checked={majorContent.medicineFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMedicineFollowUp(0)); dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMedicineFollowUp(1)); dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.11 Prescription Medication Use(not related to cancer treatment)<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.prescriptionBaseLine && errors.prescriptionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPrescriptionBaseLine(0)); dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPrescriptionBaseLine(1)); dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPrescriptionFollowUp(0)); dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPrescriptionFollowUp(1)); dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.12 Non-prescription Medication Use(not related to cancer treatment)<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.nonprescriptioinBaseLine && errors.nonprescriptionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(0)); dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(1)); dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(0)); dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }} }/>{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(1)); dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.13 Alcohol Consumption<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.alcoholBaseLine && errors.alcoholFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setAlcoholBaseLine(0)); dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setAlcoholBaseLine(1)); dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setAlcoholFollowUp(0)); dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setAlcoholFollowUp(1)); dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.14 Cigarette Smoking<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.cigaretteBaseLine && errors.cigaretteFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigaretteBaseLine(0)); dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigaretteBaseLine(1)); dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigaretteFollowUp(0)); dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigaretteFollowUp(1)); dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-6 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.15 Use of tobacco products other than cigarettes{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-9 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>If data was collected at baseline, please specify all tobacco products that apply</span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigarBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigarBaseLine(e.target.checked)) }}}/>{' '} Cigars
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPipeBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.pipeBaseLine(e.target.checked)) }}}/>{' '} Pipes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setTobaccoBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(e.target.checked)) }}}/>{' '} Chewing Tabacco
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setEcigarBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.ecigarBaseLine(e.target.checked)) }}}/>{' '} E-cigarettes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(!e.target.checked)) }}}/> {' '} Other
                                </span>
                                </div>
                                <div>
                                    <span className='col-sm-12'>
                                        <span className='col-md-11 col-sm-10 col-xs-12' >
                                            {majorContent.noncigarOtherBaseLine === 1 && errors.noncigarBaseLineSpecify && saved ? <Reminder message={'Required Field'}><input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarBaseLineSpecify' style={{ border: '1px solid red' }} className='form-control' value={majorContent.noncigarBaseLineSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))} disabled={!majorContent.noncigarOtherBaseLine} /></Reminder> : <input placeholder='Max of 200 characters' maxLength='200' name='noncigarBaseLineSpecify' className='form-control' value={majorContent.noncigarBaseLineSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))} disabled={!majorContent.noncigarOtherBaseLine||isReadOnly} />}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className='col-md-9 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>If data was collected during follow-up, please specify all tobacco products that apply</span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCigarFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigarFollowUp(e.target.checked)) }} }/>{' '} Cigars
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPipeFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.pipeFollowUp(e.target.checked)) }} }/> {' '} Pipes </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setTobaccoFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(e.target.checked)) }} }/>{' '} Chewing Tabacco
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setEcigarFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.ecigarFollowUp(e.target.checked)) }}}/>{' '} E-cigarettes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp === 1} onClick={(e) => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify((!e.target.checked) || majorContent.noncigarFollowUpSpecify)) }}} />  {' '} Other
                                </span>
                                </div>
                                <div>
                                    <span className='col-sm-12'>
                                        <span className='col-md-11 col-sm-10 col-xs-12' >
                                            {majorContent.noncigarOtherFollowUp === 1 && errors.noncigarFollowUpSpecify && saved ? <Reminder message={'please specify'}><input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarFollowUpSpecify' style={{ border: '1px solid red' }} className='form-control' value={majorContent.noncigarFollowUpSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))} disabled={!majorContent.noncigarOtherFollowUp} /></Reminder> : <input placeholder='Max of 200 characters' maxLength='200' name='noncigarFollowUpSpecify' className='form-control' value={majorContent.noncigarFollowUpSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))} disabled={!majorContent.noncigarOtherFollowUp||isReadOnly} />}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.16 Physical activity<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.physicalBaseLine && errors.physicalFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalBaseLine' checked={majorContent.physicalBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalBaseLine(0)); dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalBaseLine(1)); dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalFollowUp' checked={majorContent.physicalFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalFollowUp(0)); dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalFollowUp(1)); dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.17 Sleep habits<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.sleepBaseLine && errors.sleepFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='sleepBaseLine' checked={majorContent.sleepBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSleepBaseLine(0)); dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSleepBaseLine(1)); dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='sleepFollowUp' checked={majorContent.sleepFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSleepFollowUp(0)); dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSleepFollowUp(1)); dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.18 Reproductive history<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.reproduceBaseLine && errors.reproduceFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReproduceBaseLine(0)); dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReproduceBaseLine(1)); dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReproduceFollowUp(0)); dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReproduceFollowUp(1)); dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.19 Self-reported health<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReportedHealthBaseLine(0)); dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReportedHealthBaseLine(1)); dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReportedHealthFollowUp(0)); dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setReportedHealthFollowUp(1)); dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.20 Quality of life<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.lifeBaseLine && errors.lifeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='lifeBaseLine' checked={majorContent.lifeBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setLifeBaseLine(0)); dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setLifeBaseLine(1)); dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='lifeFollowUp' checked={majorContent.lifeFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setLifeFollowUp(0)); dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setLifeFollowUp(1)); dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.21 Social support<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.socialSupportBaseLine && errors.socialSupportFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSocialSupportBaseLine(0)); dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSocialSupportBaseLine(1)); dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSocialSupportFollowUp(0)); dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setSocialSupportFollowUp(1)); dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.22 Cognitive function<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.cognitionBaseLine && errors.cognitionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>

                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitionBaseLine(0)); dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitionBaseLine(1)); dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitionFollowUp(0)); dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitionFollowUp(1)); dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.23 Depression<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.depressionBaseLine && errors.depressionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='depressionBaseLine' checked={majorContent.depressionBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDepressionBaseLine(0)); dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDepressionBaseLine(1)); dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='depressionFollowUp' checked={majorContent.depressionFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDepressionFollowUp(0)); dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDepressionFollowUp(1)); dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.24 Other psycosocial variables<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.psychosocialBaseLine && errors.psychosocialFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPsychosocialBaseLine(0)); dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPsychosocialBaseLine(1)); dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPsychosocialFollowUp(0)); dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPsychosocialFollowUp(1)); dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.25 Fatigue<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.fatigueBaseLine && errors.fatigueFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setFatigueBaseLine(0)); dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setFatigueBaseLine(1)); dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setFatigueFollowUp(0)); dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setFatigueFollowUp(1)); dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.26 Family history of cancer<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(0)); dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(1)); dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(0)); dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(1)); dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-5 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.27 Family history of cancer with pedigrees<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(0)); dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(1)); dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(0)); dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(1)); dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.28 Physical function measures (e.g. grip strength, gait speed, etc.)<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(0)); dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(1)); dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(0)); dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(1)); dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12' style={{ paddingLeft: '0' }}><b className="d-block control-label">C.29 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source)<span style={{ color: 'red' }}>*</span></b>
                                    {(errors.exposureBaseLine && errors.exposureFollowUp) && saved && <span className='col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </span>
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='exposureBaseLine' checked={majorContent.exposureBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setExposureBaseLine(0)); dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setExposureBaseLine(1)); dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='exposureFollowUp' checked={majorContent.exposureFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setExposureFollowUp(0)); dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='exposureFollowUp' checked={majorContent.exposureFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setExposureFollowUp(1)); dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.30 Residential history information(zip code, GIS) over time<span style={{ color: 'red' }}>*</span></label></span>
                                {(errors.residenceBaseLine && errors.residenceFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-12'>
                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='residenceBaseLine' checked={majorContent.residenceBaseLine === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setResidenceBaseLine(0)); dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setResidenceBaseLine(1)); dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                    <div className='col-lg-6 col-xs-12'>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='residenceFollowUp' checked={majorContent.residenceFollowUp === 0}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setResidenceFollowUp(0)); dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }}} />{" "}No</span>
                                        </div>
                                        <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                            <span ><input type='radio' style={{ marign: 'auto' }} name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1}
                                                onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setResidenceFollowUp(1)); dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }}} />{' '}Yes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsiblePanel>

                    <CollapsiblePanel
                        condition={activePanel === 'panelB'}
                        onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                        panelTitle="Other Medical Conditions">

                        {/*} <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{paddingLeft: '0'}}>
                                <span className='col-xs-12' style={{paddingLeft: '0'}}><label className="d-block control-label">C.31 Other Medical Conditions</label></span>
                            </div>
                        </div> */}

                        <div className="col-md-12"><label>C.31 How did you collect data for the other medical conditions?</label></div>

                        <div className='col-md-12 col-xs-12'>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">a. Diabetes<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.diabetesBaseLine && errors.diabetesFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>

                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDiabetesBaseLine(0)); dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDiabetesBaseLine(1)); dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDiabetesFollowUp(0)); dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setDiabetesFollowUp(1)); dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">b. Stroke<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.strokeBaseLine && errors.strokeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='strokeBaseLine' checked={majorContent.strokeBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setStrokeBaseLine(0)); dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setStrokeBaseLine(1)); dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='strokeFollowUp' checked={majorContent.strokeFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setStrokeFollowUp(0)); dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='strokeFollowUp' checked={majorContent.strokeFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setStrokeFollowUp(1)); dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">c. COPD and/or emphysema<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.copdBaseLine && errors.copdFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='copdBaseLine' checked={majorContent.copdBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCopdBaseLine(0)); dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='copdBaseLine' checked={majorContent.copdBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCopdBaseLine(1)); dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='copdFollowUp' checked={majorContent.copdFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCopdFollowUp(0)); dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='copdFollowUp' checked={majorContent.copdFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCopdFollowUp(1)); dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">d. Cardiovascular disease<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCardiovascularBaseLine(0)); dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCardiovascularBaseLine(1)); dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(0)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(1)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">e. Osteoporosis<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>

                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(0)); dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(1)); dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(0)); dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(1)); dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">f. Mental health<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.mentalBaseLine && errors.mentalFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>

                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='mentalBaseLine' checked={majorContent.mentalBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMentalBaseLine(0)); dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMentalBaseLine(1)); dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='mentalFollowUp' checked={majorContent.mentalFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMentalFollowUp(0)); dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setMentalFollowUp(1)); dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">g. Cognitive decline<span style={{ color: 'red' }}>*</span></div></span>
                                    {(errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-12'>
                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className=' col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at baseline</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(0)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(1)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-sm-8' style={{ paddingLeft: '0' }}>
                                        <div className='col-lg-6 col-xs-12' style={{ paddingLeft: '0' }}>Collected at other time points</div>
                                        <div className='col-lg-6 col-xs-12'>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 0}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(0)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }}} />{" "}No</span>
                                            </div>
                                            <div className='col-lg-3 col-xs-4' style={{ paddingLeft: '0' }}>
                                                <span ><input type='radio' style={{ marign: 'auto' }} name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1}
                                                    onClick={() => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(1)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }}} />{' '}Yes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsiblePanel>

                    <CollapsiblePanel
                        condition={activePanel === 'panelC'}
                        onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                        panelTitle="Cancer Related Conditions">
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-8 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.32 Do you have information on the following cancer related conditions?{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerToxicity === 1} onChange={
                                            e => {
                                                if(!isReadOnly) {dispatch(allactions.majorContentActions.setCancerToxicity(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerToxicity(e.target.checked))
                                            }}} />
                                    </span>
                                    <span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerLateEffects === 1} onChange={
                                            e => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerLateEffects(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerLateEffects(e.target.checked)) }
                                        }}/>
                                    </span>
                                    <span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerSymptom === 1} onChange={
                                            e => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerSymptom(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerSymptom(e.target.checked)) }
                                        }}/>
                                    </span><span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerOther === 1} onChange={
                                            e => { if(!isReadOnly) { dispatch(allactions.majorContentActions.setCancerOther(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerOther(e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerOtherSpecify((!e.target.checked) || majorContent.cancerOtherSpecify)) }}}/>
                                    </span>
                                    <span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Other</span>
                                </span>
                            </div>
                            <div>
                                <span className='col-sm-12'>
                                    <span className='col-md-11 col-sm-10 col-xs-12' >
                                        {majorContent.cancerOther && errors.cancerOtherSpecify && saved ? <Reminder message={'Required Field'}><input placeholder='Max of 200 characters' maxLength='200' name='cancerOtherSpecify' style={{ border: '1px solid red' }} className='form-control' value={majorContent.cancerOtherSpecify} onChange={e => { dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther} /></Reminder> : <input placeholder='Max of 200 characters' maxLength='200' className='form-control' name='cancerOtherSpecify' value={majorContent.cancerOtherSpecify} onChange={e => { dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value)) }} onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther} disabled={isReadOnly}/>}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </CollapsiblePanel>
                </form>
                <div style={{ position: 'relative' }} className="my-4">
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0' }}>
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('B')} />
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('D')} />
                </span>
                {!isReadOnly ?
                    <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                        <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)|| isReadOnly} />
                        </span>
                        <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)||isReadOnly} style={{ marginRight: '5px', marginBottom: '5px' }} />
                        </span>
                        <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'||isReadOnly} /></span>
                    </span>
                    :
                    <span className='col-md-6 col-xs-12' style={{ position: 'relative', paddingLeft: '0', paddingRight: '0' }}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Approve'
                            disabled />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Reject'
                            disabled />
                    </span>
                }        
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm