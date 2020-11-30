import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'


const MajorContentForm = ({ ...props }) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')
    const [errors, setErrors] = useState({
        //seStatusBaseLine: false,
        //seStatusFollowup: false
    })
    const cohortId = +window.location.pathname.split('/').pop();

    useEffect(() => {
        if (!majorContent.hasLoaded) {
            fetch(`/api/questionnaire/major_content/${cohortId}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {
                    console.dir(result)
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
                        dispatch(allactions.majorContentActions.setCancerToxicity(cancerInfo.cancerToxicity))
                        dispatch(allactions.majorContentActions.setCancerLateEffects(cancerInfo.cancerLateEffects))
                        dispatch(allactions.majorContentActions.setCancerSymptom(cancerInfo.cancerSymptom))
                        dispatch(allactions.majorContentActions.setCancerOther(cancerInfo.cancerOther))
                        dispatch(allactions.majorContentActions.setCancerOtherSpecify(cancerInfo.setCancerOtherSpecify))
                        dispatch(allactions.majorContentActions.setHasLoaded(true))
                    })//end of batch
                })//end of then
        }//end of if
    }, [])

    const saveMajorContent = (id, proceed = false) => {
        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.status)
                if (result.status === 200) {
                    console.log('success')

                    if (Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'incomplete'))
                    }

                    if (!proceed)
                        alert('Data was successfully saved')
                    else
                        props.sectionPicker('D')
                } else {
                    alert(result.message)
                }

            })
    }

    const handleSave = () => {
        if (Object.entries(errors).length === 0) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId)
        }
        else {
            //setDisplay('block')
            if (window.confirm('there are validation errors, are you sure to save?')) {
                majorContent.sectionCStatus = 'incomplete'
                dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
                saveMajorContent(cohortId)
            }
        }
    }

    const handleSaveContinue = () => {
        if (Object.entries(errors).length === 0) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, true)
        }
        else {
            if (window.confirm('there are validation errors, are you sure to save?')) {
                majorContent.sectionAStatus = 'incomplete'
                dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
                saveMajorContent(cohortId, true)
            }
        }
    }

    return <div className='col-md-12'>
        <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <span>Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort</span>
            </div>
            <div>
                <form id='currentFormMC' >
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Question C1 through C14</div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <thead>
                                <tr>
                                    <th className='col-sm-5' style={{ textAlign: 'center' }}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected at baseline</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected during follow-up</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span>C.1 Socio-economic Status</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} readOnly />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} readOnly />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 0} readonly />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1} readonly />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.2 Education Level</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.3 Marital Status</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.4 Language/Country origin</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.5 Employment Status</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.6 Health Insurance Status</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.7 Anthropometry(e.g. weight, height)</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.8 Dietary Intake</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.9 Dietary Supplement Use</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.10 Complementary and Alternative Medicine</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.11 Prescription Medication Use(not related to cancer treatment)</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.12 Non-prescription Medication Use(not related to cancer treatment)</span></td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C. 13 Alcohol Consumption</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C. 14 Cigarette Smoking</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Question C15 through C29</div>
                    <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <thead>
                                <tr>
                                    <th className='col-sm-5' style={{ textAlign: 'center' }}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected at baseline</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected during follow-up</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C. 15 Use of tobacco products other than cigarettes</span></td>
                                    <td>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} /></span>
                                            <span className='col-sm-10'>Cigars</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} /></span>
                                            <span className='col-sm-10'>Pipes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} /></span>
                                            <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>Chewing Tabacco</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} /></span>
                                            <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>E-cigarettes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} /></span>
                                            <span className='col-sm-2' style={{ fontSize: '1.4rem' }}>Other</span>
                                            {
                                                majorContent.noncigarOtherBaseLine ?
                                                    <span className='col-sm-8'>
                                                        <span className='col-sm-1' style={{ paddingLeft: '0' }}></span>
                                                        <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>
                                                            <input name='noncigarBaseLineSpecify' className='inputUnderscore' value={majorContent.noncigarBaseLineSpecify} />
                                                        </span>
                                                    </span> : ''
                                            }
                                        </div>

                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} /></span>
                                            <span className='col-sm-10'>Cigars</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} /></span>
                                            <span className='col-sm-10'>Pipes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} /></span>
                                            <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>Chewing Tabacco</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} /></span>
                                            <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>E-cigarettes</span>
                                        </div>
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{ paddingLeft: '0' }}>
                                                <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp} /></span>
                                            <span className='col-sm-2' style={{ fontSize: '1.4rem' }}>Other</span>
                                            {
                                                majorContent.noncigarOtherFollowUp ?
                                                    <div className='col-sm-8'>
                                                        <span className='col-sm-1' style={{ paddingLeft: '0' }}></span>
                                                        <span className='col-sm-10' style={{ fontSize: '1.4rem' }}>
                                                            <input name='noncigarFollowUpSpecify' className='inputUnderscore' value={majorContent.noncigarFollowUpSpecify} />
                                                        </span>
                                                    </div> : ''
                                            }
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.16 Physical activity</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.17 Sleep habits</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.18 Reproductive history</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.19 Self-reported health</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.20 Quality of life</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.21 Social support</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.22 Cognitive function</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.23 Depression</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.24 Other psycosocial variables</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.25 Fatigue</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>C.26 Family history of cancer</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>C.27 Family history of cancer with pedigrees</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.28 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source)</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.psychosocialFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>C.29 Residential history information(zip code, GIS) over time</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}>Question C30 & C31</div>
                    <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{ padding: 0 }}>
                        <table className='table table-stripe table-responsive table-borderless'>

                            <tbody>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th colSpan='3'>
                                        <span>C.30 Other Medical Conditions</span>
                                    </th>
                                </tr>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th className='col-sm-5' style={{ textAlign: 'center' }}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected at baseline</th>
                                    <th className='col-sm-3' style={{ textAlign: 'center' }}>Collected during follow-up</th>
                                </tr>

                                <tr>
                                    <td><span>a. Diabetes</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>b. Stroke</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeFollowUp' checked={majorContent.strokeFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='depressstrokeFollowUpionFollowUp' checked={majorContent.strokeFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>c. COPD and/or emphysema</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>d. Cardiovascular disease</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><span>e. Osteoporosis</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>f. Mental health</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span style={{ fontSize: '1.4rem' }}>g. Cognitive decline</span></td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1} />{' '} Yes</span>
                                    </td>
                                    <td>
                                        <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 0} />{' '} No</span>
                                        <span className='col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1} />{' '} Yes</span>
                                    </td>
                                </tr>
                                <tr style={{ backgroundColor: '#01857b', color: 'white' }}>
                                    <th colSpan='3'>
                                        <span>C.31 Cancer related conditions</span>
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan='3'>
                                        <div><span>Do you have information on the following cancer related conditions?</span></div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerToxicity === 1} /></span>
                                            <span className='col-sm-7' style={{ padding: '0', margin: '0' }}>Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerLateEffects === 1} /></span>
                                            <span className='col-sm-7' style={{ paddingLeft: '0' }}>Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerSymptom === 1} /></span>
                                            <span className='col-sm-7' style={{ paddingLeft: '0' }}>Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                        </div>
                                        <div className='col-sm-12'>
                                            <span className='col-sm-1' style={{ padding: '0', margin: '0', width: '40px' }}><input type='checkbox' checked={majorContent.cancerOther === 1} /></span>
                                            <span className='col-sm-1' style={{ paddingLeft: '0', width: '25px' }}>Other</span>
                                            {
                                                majorContent.cancerOther === 1 ?
                                                    <span className='col-sm-3'><input className='inputUnderscore' name='cancerOtherSpecify' /></span> : ''
                                            }
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
                    <span onClick={() => props.sectionPicker('D')} style={{ position: 'relative', float: 'Right' }}>
                        <input type='button' className='btn btn-primary' value='Next' />
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm