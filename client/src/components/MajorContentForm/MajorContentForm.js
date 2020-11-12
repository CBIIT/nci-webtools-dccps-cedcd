import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch, batch} from 'react-redux'
import allactions from '../../actions'


const MajorContentForm = ({...props}) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')
    
    useEffect(() => {
        fetch('/api/questionnaire/major_content/13', {
            method: 'POST'
        }).then(res => res.json())
          .then(result => {
              let content = result.data
              //console.dir(content)
              batch(()=> {
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
              })
          })
    }, [])

    const handleSave = () => {
       /* if(Object.entries(errors).length === 0)
            saveEnrollment(79)
        else{
            //setDisplay('block')
            if(window.confirm('there are validation errors, are you sure to save?'))
                saveEnrollment(79)
        }*/
    }

    const handleSaveContinue = () => {
        /*
        if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
            saveEnrollment(79, true)}
            */
    }

    return <div className='col-md-12'>
        <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>           
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                <span>Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort</span>
            </div>
            <div>
                <form>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Question C1 through C14</div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                    <table className='table table-stripe table-responsive table-borderless'>
                        <thead>
                            <tr>
                                <th className='col-sm-5' style={{textAlign: 'center'}}>Did you collect data on</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected at baseline</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected during follow-up</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setSeStatusBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setSeStatusBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setSeStatusFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setSeStatusFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.2 Education Level</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setEducationBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setEducationBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setEducationFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setEducationFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.3 Marital Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.4 Language/Country origin</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setOriginBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setOriginBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setOriginFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setOriginFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.5 Employment Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setEmpStatusBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setEmpStatusBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setEmpStatusFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setEmpStatusFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.6 Health Insurance Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.7 Anthropometry(e.g. weight, height)</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setAnthropometryBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setAnthropometryBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setAnthropometryFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setAnthropometryFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.8 Dietary Intake</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setDietaryBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setDietaryBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setDietaryFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setDietaryFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.9 Dietary Supplement Use</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setSupplementBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setSupplementBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setSupplementFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setSupplementFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.10 Complementary and Alternative Medicine</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setMedicineBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setMedicineBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setMedicineFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setMedicineFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.11 Prescription Medication Use(not related to cancer treatment)</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setPrescriptionBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setPrescriptionBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setPrescriptionFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setPrescriptionFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.12 Non-prescription Medication Use(not related to cancer treatment)</span></td>
                                <td style={{verticalAlign: 'middle'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td style={{verticalAlign: 'middle'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C. 13 Alcohol Consumption</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setAlcoholBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setAlcoholBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td style={{verticalAlign: 'middle'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setAlcoholFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setAlcoholFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C. 14 Cigarette Smoking</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setCigaretteBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setCigaretteBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td style={{verticalAlign: 'middle'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setCigaretteFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setCigaretteFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Question C15 through C29</div>
                        <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                        <table className='table table-stripe table-responsive table-borderless'>
                            <thead>
                                <tr>
                                    <th className='col-sm-5' style={{textAlign: 'center'}}>Did you collect data on</th>
                                    <th className='col-sm-3' style={{textAlign: 'center'}}>Collected at baseline</th>
                                    <th className='col-sm-3' style={{textAlign: 'center'}}>Collected during follow-up</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C. 15 Use of tobacco products other than cigarettes</span></td>
                                <td> 
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} onClick = {(e) => dispatch(allactions.majorContentActions.setCigarBaseLine(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} onClick = {(e) => dispatch(allactions.majorContentActions.setPipeBaseLine(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} onClick = {(e) => dispatch(allactions.majorContentActions.setTobaccoBaseLine(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} onClick = {(e) => dispatch(allactions.majorContentActions.setEcigarBaseLine(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} onClick = {(e) => dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-2' style={{fontSize: '1.4rem'}}>Other</span>
                                        {
                                            majorContent.noncigarOtherBaseLine ? 
                                            <span className='col-sm-8'>
                                                <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                                <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                    <input name='noncigarBaseLineSpecify' className='inputUnderscore' value={majorContent.noncigarBaseLineSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value))} />
                                                </span>
                                            </span> : ''
                                        }
                                    </div>
                                       
                                </td>
                                <td style={{verticalAlign: 'middle'}}> 
                                <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick = {(e) => dispatch(allactions.majorContentActions.setCigarFollowUp(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick = {(e) => dispatch(allactions.majorContentActions.setPipeFollowUp(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick = {(e) => dispatch(allactions.majorContentActions.setTobaccoFollowUp(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick = {(e) => dispatch(allactions.majorContentActions.setEcigarFollowUp(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp} onClick = {(e) => dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(e.target.checked ? 1 : 0))} /></span>
                                        <span className='col-sm-2' style={{fontSize: '1.4rem'}}>Other</span>
                                        {
                                            majorContent.noncigarOtherFollowUp ? 
                                            <div className='col-sm-8'>
                                                <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                                <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                    <input name='noncigarFollowUpSpecify' className='inputUnderscore' value={majorContent.noncigarFollowUpSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value))} />
                                                </span>
                                            </div> : ''
                                        }   
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.16 Physical activity</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setPhysicalBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setPhysicalBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setPhysicalFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setPhysicalFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.17 Sleep habits</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setSleepBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setSleepBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setSleepFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setSleepFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.18 Reproductive history</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setReproduceBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setReproduceBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setReproduceFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setReproduceFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.19 Self-reported health</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setReportedHealthBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setReportedHealthBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setReportedHealthFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setReportedHealthFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.20 Quality of life</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setLifeBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setLifeBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setLifeFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setLifeFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.21 Social support</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setSocialSupportBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setSocialSupportBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setSocialSupportFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setSocialSupportFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.22 Cognitive function</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setCognitionBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setCognitionBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setCognitionFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setCognitionFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.23 Depression</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setDepressionBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setDepressionBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setDepressionFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setDepressionFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.24 Other psycosocial variables</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setPsychosocialBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setPsychosocialBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setPsychosocialFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setPsychosocialFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.25 Fatigue</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setFatigueBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setFatigueBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setFatigueFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setFatigueFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.26 Family history of cancer</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.canCerHistoryFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.27 Family history of cancer with pedigrees</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.28 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source)</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setExposureBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setExposureBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setExposureFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.psychosocialFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setExposureFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.29 Residential history information(zip code, GIS) over time</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setResidenceBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setResidenceBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setResidenceFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setResidenceFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                            <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}>Question C30 & C31</div>
                            <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                            <table className='table table-stripe table-responsive table-borderless'>
                            
                            <tbody>
                            <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                <th colSpan='3'>
                                    <span>C.30 Other Medical Conditions</span>
                                </th>
                            </tr>
                            <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                <th className='col-sm-5' style={{textAlign: 'center'}}>Did you collect data on</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected at baseline</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected during follow-up</th>
                            </tr>

                            <tr>
                                <td><span>a. Diabetes</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setDiabetesBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setDiabetesBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setDiabetesFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setDiabetesFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>b. Stroke</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setStrokeBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setStrokeBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeFollowUp' checked={majorContent.strokeFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setStrokeFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressstrokeFollowUpionFollowUp' checked={majorContent.strokeFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setStrokeFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>c. COPD and/or emphysema</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setCopdBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setCopdBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setCopdFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setCopdFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>d. Cardiovascular disease</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setCardiovascularBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setCardiovascularBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setCardiovascularFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setCardiovascularFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>e. Osteoporosis</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.canOsteoporosisFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>f. Mental health</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 0} onChange = {() => dispatch(allactions.majorContentActions.setMentalBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1} onChange = {() => dispatch(allactions.majorContentActions.setMentalBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 0} onChange = {() => dispatch(allactions.majorContentActions.setMentalFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1} onChange = {() => dispatch(allactions.majorContentActions.setMentalFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>g. Cognitive decline</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 0} onClick = {() => dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1} onClick = {() => dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(1))} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 0} onClick = {() => dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(0))} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1} onClick = {() => dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(1))} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                <th colSpan='3'>
                                    <span>C.31 Cancer related conditions</span>
                                </th>
                            </tr>
                            <tr>
                                <td colSpan='3'>
                                    <div><span>Do you have information on the following cancer related conditions?</span></div>
                                    <div>
                                        <span className='col-sm-7' style={{paddingLeft: '0'}}>Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                        <span className='col-sm-1'><input type='radio' checked={majorContent.cancerToxicity === 0} onClick={() => dispatch(allactions.majorContentActions.setCancerToxicity(0))}/>{'  '} No</span>
                                        <span className='col-sm-2'><input type='radio' checked={majorContent.cancerToxicity === 1} onClick={() => dispatch(allactions.majorContentActions.setCancerToxicity(1))}/>{'  '} Yes</span>
                                    </div>
                                    <div>
                                        <span className='col-sm-7' style={{paddingLeft: '0'}}>Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                        <span className='col-sm-1'><input type='radio' checked={majorContent.cancerLateEffects === 0} onClick={() => dispatch(allactions.majorContentActions.setCancerLateEffects(0))}/>{'  '} No</span>
                                        <span className='col-sm-2'><input type='radio' checked={majorContent.cancerLateEffects === 1} onClick={() => dispatch(allactions.majorContentActions.setCancerLateEffects(1))}/>{'  '} Yes</span>
                                    </div>
                                    <div>
                                        <span className='col-sm-7' style={{paddingLeft: '0'}}>Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                        <span className='col-sm-1'><input type='radio' checked={majorContent.cancerSymptom === 0} onClick={() => dispatch(allactions.majorContentActions.setCancerSymptom(0))}/>{'  '} No</span>
                                        <span className='col-sm-2'><input type='radio' checked={majorContent.cancerSymptom === 1} onClick={() => dispatch(allactions.majorContentActions.setCancerSymptom(1))}/>{'  '} Yes</span>
                                    </div>
                                    <div>
                                        <span className='col-sm-5' style={{paddingLeft: '0'}}>Other</span>
                                        <span className='col-sm-1'><input type='radio' checked={majorContent.cancerOther === 0} onClick={() => dispatch(allactions.majorContentActions.setCancerOther(0))}/>{'  '} No</span>
                                        <span className='col-sm-1'><input type='radio' checked={majorContent.cancerOther === 1} onClick={() => dispatch(allactions.majorContentActions.setCancerOther(1))}/>{'  '} Yes</span>
                                        {
                                            majorContent.cancerOther === 1 ? 
                                            <span className='col-sm-3'><input className='inputUnderscore' name='cancerOtherSpecify' onChange={(e) => dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value))} /></span> : ''
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </form>
                <div style={{position: 'relative'}}>
                    <span  onClick={() => props.sectionPicker('B')} style={{position: 'relative', float: 'left'}}>
                        <input type='button' className='btn btn-primary' value='Go Back' />
                    </span>
                    <span style={{position: 'relative', float: 'right'}}>
                        <span onClick={handleSave}>
                            <input type='button' className='btn btn-primary' value='Save' />
                        </span>
                        <span onClick={handleSaveContinue}>
                            <input type='button' className='btn btn-primary' value='Save & Continue' />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm