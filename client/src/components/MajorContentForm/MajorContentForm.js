import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../Modal/Modal'
import Reminder from '../Tooltip/Tooltip'


const MajorContentForm = ({ ...props }) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.majorContentErrorReducer)
    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const cohortId = +window.location.pathname.split('/').pop();

    useEffect(() => {
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
                        if(content[40]){
                        dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(content[40].baseline))
                        dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(content[40].followup))
                        }

                        dispatch(allactions.majorContentActions.setCancerToxicity(cancerInfo.cancerToxicity))
                        dispatch(allactions.majorContentActions.setCancerLateEffects(cancerInfo.cancerLateEffects))
                        dispatch(allactions.majorContentActions.setCancerSymptom(cancerInfo.cancerSymptom))
                        dispatch(allactions.majorContentActions.setCancerOther(cancerInfo.cancerOther))
                        dispatch(allactions.majorContentActions.setCancerOtherSpecify(cancerInfo.cancerOtherSpecify))
                        //dispatch(allactions.majorContentActions.setHasLoaded(true))

                        if (content[0].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }
                        if (content[0].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }
                        if (content[1].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }
                        if (content[1].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }
                        if (content[2].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }
                        if (content[2].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }
                        if (content[3].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }
                        if (content[3].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }
                        if (content[4].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }
                        if (content[4].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }
                        if (content[5].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }
                        if (content[5].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }
                        if (content[6].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }
                        if (content[6].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }
                        if (content[7].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }
                        if (content[7].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }
                        if (content[8].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }
                        if (content[8].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }
                        if (content[9].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }
                        if (content[9].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }
                        if (content[10].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }
                        if (content[10].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }
                        if (content[11].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }
                        if (content[11].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }
                        if (content[12].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }
                        if (content[12].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }
                        if (content[13].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }
                        if (content[13].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }
                        if (content[14].baseline == null || content[14].baseline == 1) { dispatch(allactions.majorContentErrorActions.cigarBaseLine(true)) }
                        if (content[15].baseline == null || content[15].baseline == 1) { dispatch(allactions.majorContentErrorActions.pipeBaseLine(true)) }
                        if (content[16].baseline == null || content[16].baseline == 1) { dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(true)) }
                        if (content[17].baseline == null || content[17].baseline == 1) { dispatch(allactions.majorContentErrorActions.ecigarBaseLine(true)) }
                        if (content[18].baseline == null || content[18].baseline == 1) { dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(true)) }

                        if (content[14].followup == null || content[14].followup == 1) {dispatch(allactions.majorContentErrorActions.cigarFollowUp(true)) }
                        if (content[15].followup == null || content[15].followup == 1) { dispatch(allactions.majorContentErrorActions.pipeFollowUp(true)) }
                        if (content[16].followup == null || content[16].followup == 1) { dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(true)) }
                        if (content[17].followup == null || content[17].followup == 1) { dispatch(allactions.majorContentErrorActions.ecigarFollowUp(true)) }
                        if (content[18].followup == null || content[18].followup == 1) { dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(true)) }
                        if (content[18].other_specify_baseline) { dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(true)) }
                        

                        if (content[18].other_specify_followup) { dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(true)) }
                        if (content[19].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }
                        if (content[19].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }
                        if (content[20].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }
                        if (content[20].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }
                        if (content[21].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }
                        if (content[21].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }
                        if (content[22].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }
                        if (content[22].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }
                        if (content[23].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }
                        if (content[23].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }
                        if (content[24].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }
                        if (content[24].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }
                        if (content[25].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }
                        if (content[25].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }
                        if (content[26].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }
                        if (content[26].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }
                        if (content[27].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }
                        if (content[27].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }
                        if (content[28].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }
                        if (content[28].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }
                        if (content[29].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }
                        if (content[29].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }
                        if (content[30].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }
                        if (content[30].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }

                        if (content[31].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }
                        if (content[31].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }
                        if (content[32].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }
                        if (content[32].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }
                        if (content[33].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }
                        if (content[33].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }
                        if (content[34].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }
                        if (content[34].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }
                        if (content[35].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }
                        if (content[35].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }
                        if (content[36].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }
                        if (content[36].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }
                        if (content[37].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }
                        if (content[37].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }
                        if (content[38].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }
                        if (content[38].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }
                        if (content[39].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }
                        if (content[39].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }
                        if(content[40]){
                            if (content[40].baseline in [0, 1]) { dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }
                            if (content[40].followup in [0, 1]) { dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }
                        }

                        if (cancerInfo.cancerToxicity == null || cancerInfo.cancerToxicity == 1) { dispatch(allactions.majorContentErrorActions.cancerToxicity(true)) }
                        if (cancerInfo.cancerLateEffects == null || cancerInfo.cancerLateEffects == 1) { dispatch(allactions.majorContentErrorActions.cancerLateEffects(true)) }
                        if (cancerInfo.cancerSymptom == null || cancerInfo.cancerSymptom == 1) { dispatch(allactions.majorContentErrorActions.cancerSymptom(true)) }
                        if (cancerInfo.cancerOther == null || cancerInfo.cancerOther == 1) { dispatch(allactions.majorContentErrorActions.cancerOther(true)) }

                        //if(cancerInfo.cancerToxicity || cancerInfo.cancerSymptom || cancerInfo.cancerLateEffects || cancerInfo.cancerOther)
                        //{dispatch(allactions.majorContentErrorActions.cancerToxicity = false; shadow.cancerLateEffects = false; shadow.cancerSymptom = false; shadow.cancerOther = false; changed=true;}
                        if (cancerInfo.cancerOtherSpecify) { dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(true)) }

                        dispatch(allactions.majorContentActions.setHasLoaded(true))
                    })

                })//end of then
        }//end of if
    }, [])

    const saveMajorContent = (id, hasErrors, proceed = false) => {
        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    if (!hasErrors)
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'incomplete'))
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
        //console.log(errors.cigarFollowUp +' '+ errors.pipeFollowUp +' '+ errors.tobaccoFollowUp +' '+ errors.ecigarFollowUp +' '+ errors.noncigarOtherFollowUp)
        let errorsRemain = false;
        for (let k of Object.keys(errors)) errorsRemain |= errors[k]
        errorsRemain &= (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) || (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther)
        errorsRemain |= (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (!errors.cancerOther && errors.cancerOtherSpecify)

        setHasErrors(errorsRemain)
        if (!errorsRemain) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, hasErrors)
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)
        let errorsRemain = false;
        for (let k of Object.keys(errors)) errorsRemain |= errors[k]
        setHasErrors(errorsRemain)
        if (!errorsRemain) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, true, true)
        }
        else {
            setModalShow(true)
            setProceed(true)
        }
    }

    const confirmSaveStay = () => {
        majorContent.sectionCStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'));
        saveMajorContent(cohortId, hasErrors); setModalShow(false)
    }

    const confirmSaveContinue = () => {
        majorContent.sectionAStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
        saveMajorContent(cohortId, hasErrors, true); setModalShow(false)
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
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}><span>Major Content Domains</span></div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <thead>
                                <tr>
                                    <th className='col-sm-5' style={{ textAlign: 'center' }}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected at baseline<span style={{ color: 'red' }}>*</span></th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected during follow-up<span style={{ color: 'red' }}>*</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span>C.1 Socio-economic Status</span></td>
                                    <td style={{ backgroundColor: errors.seStatusBaseLine && saved ? 'lightcoral' : 'white', padding: '0' }} >
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setSeStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setSeStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.seStatusFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setSeStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setSeStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.2 Education Level</span></td>
                                    <td style={{ backgroundColor: errors.educationBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setEducationBaseLine(0)); dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setEducationBaseLine(1)); dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.educationFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setEducationFollowUp(0)); dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setEducationFollowUp(1)); dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.3 Marital Status</span></td>
                                    <td style={{ backgroundColor: errors.maritalStatusBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.maritalStatusFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.4 Language/Country origin</span></td>
                                    <td style={{ backgroundColor: errors.originBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setOriginBaseLine(0)); dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setOriginBaseLine(1)); dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.originFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setOriginFollowUp(0)); dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setOriginFollowUp(1)); dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.5 Employment Status</span></td>
                                    <td style={{ backgroundColor: errors.empStatusBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setEmpStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setEmpStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.empStatusFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setEmpStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setEmpStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.6 Health Insurance Status</span></td>
                                    <td style={{ backgroundColor: errors.insuranceStatusBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(0)); dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(1)); dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.insuranceStatusFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(0)); dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(1)); dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.7 Anthropometry(e.g. weight, height)</span></td>
                                    <td style={{ backgroundColor: errors.anthropometryBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setAnthropometryBaseLine(0)); dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setAnthropometryBaseLine(1)); dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.anthropometryFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setAnthropometryFollowUp(0)); dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setAnthropometryFollowUp(1)); dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.8 Dietary Intake</span></td>
                                    <td style={{ backgroundColor: errors.dietaryBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setDietaryBaseLine(0)); dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setDietaryBaseLine(1)); dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.dietaryFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setDietaryFollowUp(0)); dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setDietaryFollowUp(1)); dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.9 Dietary Supplement Use</span></td>
                                    <td style={{ backgroundColor: errors.supplementBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setSupplementBaseLine(0)); dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setSupplementBaseLine(1)); dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.supplementFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setSupplementFollowUp(0)); dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setSupplementFollowUp(1)); dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.10 Complementary and Alternative Medicine</span></td>
                                    <td style={{ backgroundColor: errors.medicineBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setMedicineBaseLine(0)); dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setMedicineBaseLine(1)); dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.medicineFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setMedicineFollowUp(0)); dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setMedicineFollowUp(1)); dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.11 Prescription Medication Use(not related to cancer treatment)</span></td>
                                    <td style={{ backgroundColor: errors.prescriptionBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setPrescriptionBaseLine(0)); dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setPrescriptionBaseLine(1)); dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.prescriptionFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setPrescriptionFollowUp(0)); dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setPrescriptionFollowUp(1)); dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.12 Non-prescription Medication Use(not related to cancer treatment)</span></td>
                                    <td style={{ backgroundColor: errors.nonprescriptionBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(0)); dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(1)); dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.nonprescriptionFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(0)); dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(1)); dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C. 13 Alcohol Consumption</span></td>
                                    <td style={{ backgroundColor: errors.alcoholBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setAlcoholBaseLine(0)); dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setAlcoholBaseLine(1)); dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.alcoholFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setAlcoholFollowUp(0)); dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setAlcoholFollowUp(1)); dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C. 14 Cigarette Smoking</span></td>
                                    <td style={{ backgroundColor: errors.cigaretteBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setCigaretteBaseLine(0)); dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setCigaretteBaseLine(1)); dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cigaretteFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setCigaretteFollowUp(0)); dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setCigaretteFollowUp(1)); dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C. 15 Use of tobacco products other than cigarettes</span></td>
                                    <td style={{ backgroundColor: (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) && saved ? 'lightcoral' : 'white' }}>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setCigarBaseLine(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cigarBaseLine(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10'>Cigars</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setPipeBaseLine(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.pipeBaseLine(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10'>Pipes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setTobaccoBaseLine(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10'>Chewing Tabacco</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setEcigarBaseLine(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.ecigarBaseLine(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10' >E-cigarettes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} onClick={(e) => { dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(!e.target.checked)) }} />  </span>
                                            <span className='col-sm-2' >Other</span>
                                        </div>
                                        <div> 
                                            <span className='col-sm-12'>
                                                <span className='col-sm-offset-3 col-sm-10' >
                                                    {errors.noncigarBaseLineSpecify && saved ? <Reminder message={'please specify'}><input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarBaseLineSpecify' style={{border: '1px solid red', height: '24px'}} className='form-control' value={majorContent.noncigarBaseLineSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value))}} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify)) } disabled={!majorContent.noncigarOtherBaseLine}/></Reminder> : <input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarBaseLineSpecify' style={{height: '24px'}} className='form-control' value={majorContent.noncigarBaseLineSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value))}}  onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify)) } disabled={!majorContent.noncigarOtherBaseLine}/>}
                                                </span>
                                            </span>   
                                        </div>
                                    </td>
                                    <td style={{ backgroundColor: (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) && saved ? 'lightcoral' : 'white' }}>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setCigarFollowUp(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cigarFollowUp(e.target.checked)) }} /> </span>
                                            <span className='col-sm-10'>Cigars</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setPipeFollowUp(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.pipeFollowUp(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10'>Pipes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setTobaccoFollowUp(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10' >Chewing Tabacco</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setEcigarFollowUp(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.ecigarFollowUp(e.target.checked)) }} />  </span>
                                            <span className='col-sm-10' >E-cigarettes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp} onClick={(e) => { dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(e.target.checked)); dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(!e.target.checked)) }} />  </span>
                                            <span className='col-sm-2' >Other</span>
                                        </div>
                                        <div> 
                                            <span className='col-sm-12'>
                                                <span className='col-sm-offset-3 col-sm-10' >
                                                    {errors.noncigarFollowUpSpecify && saved ? <Reminder message={'please specify'}><input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarFollowUpSpecify' style={{border: '1px solid red', height: '24px'}} className='form-control' value={majorContent.noncigarFollowUpSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value))}} onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify)) } disabled={!majorContent.noncigarOtherFollowUp}/></Reminder> : <input placeholder='(Max of 200 characters)' maxLength='200' name='noncigarFollowUpSpecify' style={{height: '24px'}} className='form-control' value={majorContent.noncigarFollowUpSpecify} onChange={e => { dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value))}}  onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify)) } disabled={!majorContent.noncigarOtherFollowUp}/>}
                                                </span>
                                            </span>   
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.16 Physical activity</span></td>
                                    <td style={{ backgroundColor: errors.physicalBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalBaseLine(0)); dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalBaseLine(1)); dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.physicalFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalFollowUp(0)); dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalFollowUp(1)); dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.17 Sleep habits</span></td>
                                    <td style={{ backgroundColor: errors.sleepBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setSleepBaseLine(0)); dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setSleepBaseLine(1)); dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.sleepFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setSleepFollowUp(0)); dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setSleepFollowUp(1)); dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.18 Reproductive history</span></td>
                                    <td style={{ backgroundColor: errors.reproduceBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setReproduceBaseLine(0)); dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setReproduceBaseLine(1)); dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.reproduceFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setReproduceFollowUp(0)); dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setReproduceFollowUp(1)); dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.19 Self-reported health</span></td>
                                    <td style={{ backgroundColor: errors.reportedHealthBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setReportedHealthBaseLine(0)); dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setReportedHealthBaseLine(1)); dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.reportedHealthFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setReportedHealthFollowUp(0)); dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setReportedHealthFollowUp(1)); dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.20 Quality of life</span></td>
                                    <td style={{ backgroundColor: errors.lifeBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setLifeBaseLine(0)); dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setLifeBaseLine(1)); dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.lifeFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setLifeFollowUp(0)); dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setLifeFollowUp(1)); dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.21 Social support</span></td>
                                    <td style={{ backgroundColor: errors.socialSupportBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setSocialSupportBaseLine(0)); dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setSocialSupportBaseLine(1)); dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.socialSupportFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setSocialSupportFollowUp(0)); dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setSocialSupportFollowUp(1)); dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.22 Cognitive function</span></td>
                                    <td style={{ backgroundColor: errors.cognitionBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setCognitionBaseLine(0)); dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setCognitionBaseLine(1)); dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cognitionFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setCognitionFollowUp(0)); dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setCognitionFollowUp(1)); dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.23 Depression</span></td>
                                    <td style={{ backgroundColor: errors.depressionBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setDepressionBaseLine(0)); dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setDepressionBaseLine(1)); dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.depressionFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setDepressionFollowUp(0)); dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setDepressionFollowUp(1)); dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.24 Other psycosocial variables</span></td>
                                    <td style={{ backgroundColor: errors.psychosocialBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setPsychosocialBaseLine(0)); dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setPsychosocialBaseLine(1)); dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.psychosocialFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setPsychosocialFollowUp(0)); dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setPsychosocialFollowUp(1)); dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.25 Fatigue</span></td>
                                    <td style={{ backgroundColor: errors.fatigueBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setFatigueBaseLine(0)); dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setFatigueBaseLine(1)); dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.fatigueFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setFatigueFollowUp(0)); dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setFatigueFollowUp(1)); dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.26 Family history of cancer</span></td>
                                    <td style={{ backgroundColor: errors.cancerHistoryBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(0)); dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(1)); dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cancerHistoryFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(0)); dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(1)); dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.27 Family history of cancer with pedigrees</span></td>
                                    <td style={{ backgroundColor: errors.cancerPedigreeBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(0)); dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(1)); dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cancerPedigreeFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(0)); dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(1)); dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.28 Physical function measures (e.g. grip strength, gait speed, etc.)</span></td>
                                    <td style={{ backgroundColor: errors.physicalMeasureBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(0)); dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(1)); dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.physicalMeasureFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(0)); dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(1)); dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.29 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source)</span></td>
                                    <td style={{ backgroundColor: errors.exposureBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setExposureBaseLine(0)); dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setExposureBaseLine(1)); dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.exposureFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setExposureFollowUp(0)); dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setExposureFollowUp(1)); dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.30 Residential history information(zip code, GIS) over time</span></td>
                                    <td style={{ backgroundColor: errors.residenceBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setResidenceBaseLine(0)); dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setResidenceBaseLine(1)); dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.residenceFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setResidenceFollowUp(0)); dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setResidenceFollowUp(1)); dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}><span>Other Medical Condition</span>s</div>
                    <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <tbody>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th colSpan='3'>
                                        <span>C.31 Other Medical Conditions</span>
                                    </th>
                                </tr>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th className='col-sm-5' style={{ textAlign: 'center' }}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected at baseline<span style={{ color: 'red' }}>*</span></th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected during follow-up<span style={{ color: 'red' }}>*</span></th>
                                </tr>

                                <tr>
                                    <td><span>a. Diabetes</span></td>
                                    <td style={{ backgroundColor: errors.diabetesBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setDiabetesBaseLine(0)); dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setDiabetesBaseLine(1)); dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.diabetesFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setDiabetesFollowUp(0)); dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setDiabetesFollowUp(1)); dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>b. Stroke</span></td>
                                    <td style={{ backgroundColor: errors.strokeBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setStrokeBaseLine(0)); dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setStrokeBaseLine(1)); dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.strokeFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeFollowUp' checked={majorContent.strokeFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setStrokeFollowUp(0)); dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressstrokeFollowUpionFollowUp' checked={majorContent.strokeFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setStrokeFollowUp(1)); dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>c. COPD and/or emphysema</span></td>
                                    <td style={{ backgroundColor: errors.copdBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setCopdBaseLine(0)); dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setCopdBaseLine(1)); dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.copdFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setCopdFollowUp(0)); dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setCopdFollowUp(1)); dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>d. Cardiovascular disease</span></td>
                                    <td style={{ backgroundColor: errors.cardiovascularBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setCardiovascularBaseLine(0)); dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setCardiovascularBaseLine(1)); dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cardiovascularFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(0)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setCardiovascularFollowUp(1)); dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>e. Osteoporosis</span></td>
                                    <td style={{ backgroundColor: errors.osteoporosisBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(0)); dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(1)); dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.osteoporosisFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(0)); dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(1)); dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>f. Mental health</span></td>
                                    <td style={{ backgroundColor: errors.mentalBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 0} onChange={() => { dispatch(allactions.majorContentActions.setMentalBaseLine(0)); dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1} onChange={() => { dispatch(allactions.majorContentActions.setMentalBaseLine(1)); dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.mentalFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 0} onChange={() => { dispatch(allactions.majorContentActions.setMentalFollowUp(0)); dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1} onChange={() => { dispatch(allactions.majorContentActions.setMentalFollowUp(1)); dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>g. Cognitive decline</span></td>
                                    <td style={{ backgroundColor: errors.cognitiveDeclineBaseLine && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 0} onClick={() => { dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(0)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1} onClick={() => { dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(1)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }} />{' '} Yes</span>
                                    </td>
                                    <td style={{ backgroundColor: errors.cognitiveDeclineFollowUp && saved ? 'lightcoral' : 'white' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 0} onClick={() => { dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(0)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1} onClick={() => { dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(1)); dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }} />{' '} Yes</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}><span>Cancer Related Conditions</span></div>
                    <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <tbody>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th colSpan='3'>
                                        <span>C.32 Cancer related conditions</span>
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan='3' style={{ backgroundColor: (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) && saved ? 'lightcoral' : 'white' }}>
                                        <div><span>Do you have information on the following cancer related conditions?<span style={{ color: 'red' }}>*</span></span></div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerToxicity === 1} onChange={
                                                e => {
                                                    dispatch(allactions.majorContentActions.setCancerToxicity(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cancerToxicity(e.target.checked))
                                                }} /></span>
                                            <span className='col-sm-7' style={{ padding: '0', margin: '0' }}>Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerLateEffects === 1} onChange={
                                                e => { dispatch(allactions.majorContentActions.setCancerLateEffects(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cancerLateEffects(e.target.checked)) }
                                            } /></span>
                                            <span className='col-sm-7' style={{ paddingLeft: '0' }}>Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerSymptom === 1} onChange={
                                                e => { dispatch(allactions.majorContentActions.setCancerSymptom(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cancerSymptom(e.target.checked)) }
                                            } /></span>
                                            <span className='col-sm-7' style={{ paddingLeft: '0' }}>Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerOther === 1} onChange={
                                                e => { dispatch(allactions.majorContentActions.setCancerOther(e.target.checked ? 1 : 0)); dispatch(allactions.majorContentErrorActions.cancerOther(e.target.checked)); dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(!e.target.checked)) }}
                                            /></span>
                                            <span className='col-sm-1' style={{ paddingLeft: '0', width: '25px' }}>Other</span>
                                        </div>
                                        <div className='col-sm-12' style={{marginTop: '5px'}}>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}></span>
                                            <span className='col-sm-5' style={{paddingLeft: '0'}}>
                                                {errors.cancerOtherSpecify && saved ? <Reminder message={'please specify'}><input placeholder='(Max of 200 characters)' maxLength='200' name='cancerOtherSpecify' style={{border: '1px solid red'}} className='form-control' value={majorContent.cancerOtherSpecify} onChange={e => { dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value))}} onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther}/></Reminder> : <input placeholder='(Max of 200 characters)' maxLength='200'  className='form-control' name='cancerOtherSpecify' value={majorContent.cancerOtherSpecify} onChange={e => { dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value))}} onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther} />}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <div style={{ position: 'relative' }}>
                    <span onClick={() => props.sectionPicker('B')} style={{ position: 'relative', float: 'left' }}>
                        <input type='button' className='btn btn-primary' value='Go Back' />
                    </span>
                    <span style={{ position: 'relative', float: 'right' }}>
                        <span onClick={handleSave}>
                            <input type='button' className='btn btn-primary' value='Save' />
                        </span>
                        <span onClick={handleSaveContinue}>
                            <input type='button' className='btn btn-primary' value='Save & Continue' />
                        </span>
                        {section.A === 'complete' && section.B === 'complete' && section.C === 'complete' && section.D === 'complete' && section.E === 'complete' && section.F === 'complete' && section.G === 'complete' ? <span><input type='button' className='btn btn-primary' value='Submit For Review' /></span> : ''}
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm