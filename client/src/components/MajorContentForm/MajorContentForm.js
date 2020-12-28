import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Reminder from '../Tooltip/Tooltip'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';


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

                        if (content[0].baseline) { dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }
                        if (content[0].followup) { dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }
                        if (content[1].baseline) { dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }
                        if (content[1].followup) { dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }
                        if (content[2].baseline) { dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }
                        if (content[2].followup) { dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }
                        if (content[3].baseline) { dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }
                        if (content[3].followup) { dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }
                        if (content[4].baseline) { dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }
                        if (content[4].followup) { dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }
                        if (content[5].baseline) { dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }
                        if (content[5].followup) { dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }
                        if (content[6].baseline) { dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }
                        if (content[6].followup) { dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }
                        if (content[7].baseline) { dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }
                        if (content[7].followup) { dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }
                        if (content[8].baseline) { dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }
                        if (content[8].followup) { dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }
                        if (content[9].baseline) { dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }
                        if (content[9].followup) { dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }
                        if (content[10].baseline) { dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }
                        if (content[10].followup) { dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }
                        if (content[11].baseline) { dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }
                        if (content[11].followup) { dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }
                        if (content[12].baseline) { dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }
                        if (content[12].followup) { dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }
                        if (content[13].baseline) { dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }
                        if (content[13].followup) { dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }
                        if (content[14].baseline == null || content[14].baseline == 1) { dispatch(allactions.majorContentErrorActions.cigarBaseLine(true)) }
                        if (content[15].baseline == null || content[15].baseline == 1) { dispatch(allactions.majorContentErrorActions.pipeBaseLine(true)) }
                        if (content[16].baseline == null || content[16].baseline == 1) { dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(true)) }
                        if (content[17].baseline == null || content[17].baseline == 1) { dispatch(allactions.majorContentErrorActions.ecigarBaseLine(true)) }
                        if (content[18].baseline == null || content[18].baseline == 1) { dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(true)) }

                        if (content[14].followup == null || content[14].followup == 1) { dispatch(allactions.majorContentErrorActions.cigarFollowUp(true)) }
                        if (content[15].followup == null || content[15].followup == 1) { dispatch(allactions.majorContentErrorActions.pipeFollowUp(true)) }
                        if (content[16].followup == null || content[16].followup == 1) { dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(true)) }
                        if (content[17].followup == null || content[17].followup == 1) { dispatch(allactions.majorContentErrorActions.ecigarFollowUp(true)) }
                        if (content[18].followup == null || content[18].followup == 1) { dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(true)) }
                        if (content[18].baseline == 0 || content[18].other_specify_baseline) { dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(true)) }


                        if (content[18].followup == 0 || content[18].other_specify_followup) { dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(true)) }
                        if (content[19].baseline) { dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }
                        if (content[19].followup) { dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }
                        if (content[20].baseline) { dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }
                        if (content[20].followup) { dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }
                        if (content[21].baseline) { dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }
                        if (content[21].followup) { dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }
                        if (content[22].baseline) { dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }
                        if (content[22].followup) { dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }
                        if (content[23].baseline) { dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }
                        if (content[23].followup) { dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }
                        if (content[24].baseline) { dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }
                        if (content[24].followup) { dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }
                        if (content[25].baseline) { dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }
                        if (content[25].followup) { dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }
                        if (content[26].baseline) { dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }
                        if (content[26].followup) { dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }
                        if (content[27].baseline) { dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }
                        if (content[27].followup) { dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }
                        if (content[28].baseline) { dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }
                        if (content[28].followup) { dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }
                        if (content[29].baseline) { dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }
                        if (content[29].followup) { dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }
                        if (content[30].baseline) { dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }
                        if (content[30].followup) { dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }

                        if (content[31].baseline) { dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }
                        if (content[31].followup) { dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }
                        if (content[32].baseline) { dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }
                        if (content[32].followup) { dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }
                        if (content[33].baseline) { dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }
                        if (content[33].followup) { dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }
                        if (content[34].baseline) { dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }
                        if (content[34].followup) { dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }
                        if (content[35].baseline) { dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }
                        if (content[35].followup) { dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }
                        if (content[36].baseline) { dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }
                        if (content[36].followup) { dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }
                        if (content[37].baseline) { dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }
                        if (content[37].followup) { dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }
                        if (content[38].baseline) { dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }
                        if (content[38].followup) { dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }
                        if (content[39].baseline) { dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }
                        if (content[39].followup) { dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }
                        if (content[40]) {
                            if (content[40].baseline) { dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }
                            if (content[40].followup) { dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }
                        }

                        if (cancerInfo.cancerToxicity == null || cancerInfo.cancerToxicity == 1) { dispatch(allactions.majorContentErrorActions.cancerToxicity(true)) }
                        if (cancerInfo.cancerLateEffects == null || cancerInfo.cancerLateEffects == 1) { dispatch(allactions.majorContentErrorActions.cancerLateEffects(true)) }
                        if (cancerInfo.cancerSymptom == null || cancerInfo.cancerSymptom == 1) { dispatch(allactions.majorContentErrorActions.cancerSymptom(true)) }
                        if (cancerInfo.cancerOther == null || cancerInfo.cancerOther == 1) { dispatch(allactions.majorContentErrorActions.cancerOther(true)) }

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


    const refreshErrors = () => (errors.seStatusBaseLine && errors.seStatusFollowUp) || (errors.educationBaseLine && errors.educationFollowUp) || (errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) || (errors.originBaseLine && errors.originFollowUp) || (errors.empStatusBaseLine && errors.empStatusFollowUp) || (errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) || (errors.anthropometryBaseLine && errors.anthropometryFollowUp) || (errors.dietaryBaseLine && errors.dietaryFollowUp) || (errors.supplementBaseLine && errors.supplementFollowUp) || (errors.medicineBaseLine && errors.medicineFollowUp) || (errors.prescriptionBaseLine && errors.prescriptionFollowUp) || (errors.nonprescriptionBaseLine && errors.nonprescriptionFollowUp) || (errors.alcoholBaseLine && errors.alcoholFollowUp) || (errors.cigaretteBaseLine && errors.cigaretteFollowUp) || (errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.physicalBaseLine && errors.physicalFollowUp) || (errors.sleepBaseLine && errors.sleepFollowUp) || (errors.reproduceBaseLine && errors.reproduceFollowUp) || (errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) || (errors.lifeBaseLine && errors.lifeFollowUp) || (errors.socialSupportBaseLine && errors.socialSupportFollowUp) || (errors.cognitionBaseLine & errors.cognitionFollowUp) || (errors.depressionBaseLine && errors.depressionFollowUp) || (errors.psychosocialBaseLine && errors.psychosocialFollowUp) || (errors.fatigueBaseLine && errors.fatigueFollowUp) || (errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) || (errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) || (errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) || (errors.exposureBaseLine && errors.exposureFollowUp) || (errors.residenceBaseLine && errors.residenceFollowUp) || (errors.diabetesBaseLine && errors.diabetesFollowUp) || (errors.strokeBaseLine && errors.strokeFollowUp) || (errors.copdBaseLine && errors.copdFollowUp) || (errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) || (errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) || (errors.mentalBaseLine && errors.mentalFollowUp) || (errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify)

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
                        if (result.data.status)
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
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
        if (!errorsRemain) {
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
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <span>Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort</span>
            </div>
            <div>
                <form>
                    <CollapsiblePanel
                        condition={activePanel === 'panelA'}
                        onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                        panelTitle="Major Content Domains">
                    
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.1 Socio-economic Status{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.seStatusBaseLine && errors.seStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSeStatusBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.seStatusBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSeStatusFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.seStatusFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.2 Education Level{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.educationBaseLine && errors.educationFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='educationBaseLine' checked={majorContent.educationBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setEducationBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.educationBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='educationFollowUp' checked={majorContent.educationFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setEducationFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.educationFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.3 Marital Status{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.4 Language/Country origin{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.originBaseLine && errors.originFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='originBaseLine' checked={majorContent.originBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setOriginBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.originBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='originFollowUp' checked={majorContent.originFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setOriginFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.originFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.5 Employment Status{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.empStatusBaseLine && errors.empStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setEmpStatusBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.empStatusBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setEmpStatusFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.empStatusFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.6 Health Insurance Status{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-5 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.7 Anthropometry(e.g. weight, height){' '} <small>(Select all that apply)</small></label></span>
                                {(errors.anthropometryBaseLine && errors.anthropometryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setAnthropometryBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setAnthropometryFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.8 Dietary Intake{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.dietaryBaseLine && errors.dietaryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setDietaryBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.dietaryBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setDietaryFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.dietaryFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.9 Dietary Supplement Use{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.supplementBaseLine && errors.supplementFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSupplementBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.supplementBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSupplementFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.supplementFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.10 Complementary and Alternative Medicine{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.medicineBaseLine && errors.medicineFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setMedicineBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.medicineBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setMedicineFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.medicineFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.11 Prescription Medication Use(not related to cancer treatment){' '} <small>(Select all that apply)</small></label></span>
                                {(errors.prescriptionBaseLine && errors.prescriptionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setPrescriptionBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setPrescriptionFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.12 Non-prescription Medication Use(not related to cancer treatment){' '} <small>(Select all that apply)</small></label></span>
                                {(errors.nonprescriptioinBaseLine && errors.nonprescriptionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.13 Alcohol Consumption{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.alcoholBaseLine && errors.alcoholFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setAlcoholBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.alcoholBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setAlcoholFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.alcoholFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.14 Cigarette Smoking{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cigaretteBaseLine && errors.cigaretteFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setCigaretteBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setCigaretteFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
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
                                        <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCigarBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigarBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} Cigars
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPipeBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.pipeBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} Pipes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setTobaccoBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} Chewing Tabacco
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setEcigarBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.ecigarBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} E-cigarettes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(!e.target.checked)) }} disabled={isReadOnly}/> {' '} Other
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
                                        <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setCigarFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cigarFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} Cigars
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setPipeFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.pipeFollowUp(e.target.checked)) }} disabled={isReadOnly}/> {' '} Pipes </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setTobaccoFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} Chewing Tabacco
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setEcigarFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.ecigarFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} E-cigarettes
                                </span>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify((!e.target.checked) || majorContent.noncigarFollowUpSpecify)) }} disabled={isReadOnly}/>  {' '} Other
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
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.16 Physical activity{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.physicalBaseLine && errors.physicalFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPhysicalBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.physicalBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPhysicalFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.physicalFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.17 Sleep habits{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.sleepBaseLine && errors.sleepFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setSleepBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.sleepBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setSleepFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.sleepFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.18 Reproductive history{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.reproduceBaseLine && errors.reproduceFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setReproduceBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.reproduceBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setReproduceFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.reproduceFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.19 Self-reported health{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setReportedHealthBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setReportedHealthFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.20 Quality of life{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.lifeBaseLine && errors.lifeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setLifeBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.lifeBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setLifeFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.lifeFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.21 Social support{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.socialSupportBaseLine && errors.socialSupportFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSocialSupportBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setSocialSupportFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.22 Cognitive function{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cognitionBaseLine && errors.cognitionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCognitionBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cognitionBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCognitionFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cognitionFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.23 Depression{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.depressionBaseLine && errors.depressionFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setDepressionBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.depressionBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setDepressionFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.depressionFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.24 Other psycosocial variables{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.psychosocialBaseLine && errors.psychosocialFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPsychosocialBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPsychosocialFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.25 Fatigue{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.fatigueBaseLine && errors.fatigueFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setFatigueBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.fatigueBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setFatigueFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.fatigueFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-4 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.26 Family history of cancer{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-5 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.27 Family history of cancer with pedigrees{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='depressionFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.28 Physical function measures (e.g. grip strength, gait speed, etc.){' '} <small>(Select all that apply)</small></label></span>
                                {(errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12' style={{ paddingLeft: '0' }}><b className="d-block control-label">C.29 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source){' '} <small>(Select all that apply)</small></b>
                                    {(errors.exposureBaseLine && errors.exposureFollowUp) && saved && <span className='col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </span>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setExposureBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.exposureBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setExposureFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.exposureFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                            <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-7 col-sm-4 col-xs-12' style={{ paddingLeft: '0' }}><label className="d-block control-label">C.30 Residential history information(zip code, GIS) over time{' '} <small>(Select all that apply)</small></label></span>
                                {(errors.residenceBaseLine && errors.residenceFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setResidenceBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.residenceBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                </span>
                                </div>
                                <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-xs-12'>
                                        <input type='checkbox' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setResidenceFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.residenceFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                </span>
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
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">a. Diabetes{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.diabetesBaseLine && errors.diabetesFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setDiabetesBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.diabetesBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setDiabetesFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.diabetesFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">b. Stroke{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.strokeBaseLine && errors.strokeFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setStrokeBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.strokeBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='strokeFollowUp' checked={majorContent.strokeFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setStrokeFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.strokeFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">c. COPD and/or emphysema{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.copdBaseLine && errors.copdFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='copdBaseLine' checked={majorContent.copdBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCopdBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.copdBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='copdFollowUp' checked={majorContent.copdFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCopdFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.copdFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">d. Cardiovascular disease{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setCardiovascularBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">e. Osteoporosis{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">f. Mental health{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.mentalBaseLine && errors.mentalFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setMentalBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.mentalBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1} onChange={(e) => { dispatch(allactions.majorContentActions.setMentalFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.mentalFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                                <div className='col-xs-12' style={{ paddingLeft: '0' }}>
                                    <span className='col-md-4 col-sm-5 col-xs-12' style={{ paddingLeft: '0' }}><div className="d-block control-label">g. Cognitive decline{' '} <small>(Select all that apply)</small></div></span>
                                    {(errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) && saved && <span className='col-md-3 col-sm-3 col-xs-12' style={{ color: 'red' }}>Required Filed</span>}
                                </div>
                                <div className='col-md-8 col-xs-12'>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(e.target.checked)) }} disabled={isReadOnly}/>{' '} At baseline
                                    </span>
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                        <span className='col-xs-12'>
                                            <input type='checkbox' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(e.target.checked)) }} disabled={isReadOnly}/>{' '} During follow-up
                                    </span>
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
                                                dispatch(allactions.majorContentActions.setCancerToxicity(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerToxicity(e.target.checked))
                                            }} disabled={isReadOnly}/>
                                    </span>
                                    <span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerLateEffects === 1} onChange={
                                            e => { dispatch(allactions.majorContentActions.setCancerLateEffects(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerLateEffects(e.target.checked)) }
                                        } disabled={isReadOnly}/>
                                    </span>
                                    <span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerSymptom === 1} onChange={
                                            e => { dispatch(allactions.majorContentActions.setCancerSymptom(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerSymptom(e.target.checked)) }
                                        } disabled={isReadOnly}/>
                                    </span><span className='col-xs-11' style={{ paddingLeft: '0' }}>{' '} Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                </span>
                                <span className='col-xs-12'>
                                    <span className='col-xs-1' style={{ paddingLeft: '0', width: '18px' }}>
                                        <input type='checkbox' checked={majorContent.cancerOther === 1} onChange={
                                            e => { dispatch(allactions.majorContentActions.setCancerOther(+e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerOther(e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerOtherSpecify((!e.target.checked) || majorContent.cancerOtherSpecify)) }}
                                            disabled={isReadOnly}/>
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
                    <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                        <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)||isReadOnly} />
                        </span>
                        <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)||isReadOnly} style={{ marginRight: '5px', marginBottom: '5px' }} />
                        </span>
                        <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete' || isReadOnly} /></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm