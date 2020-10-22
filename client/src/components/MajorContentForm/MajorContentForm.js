import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'


const MajorContentForm = ({...props}) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')
    return <div>
        <div className='col-md-offset-1 col-md-10' style={{display: 'flex', flexDirection: 'column', width: '80%'}}>           
            <h1 style={{marginTop: '10px', color: 'blue'}}>Data on Major Content Domains</h1>
            <div style={{backgroundColor: 'grey', color: 'white', marginBottom: '20px'}}>
                C.{' '} Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort
            </div>
            <div>
                <form>
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
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C. 15 Use of tobacco products other than cigarettes</span></td>
                                <td> 
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine} onClick = {() => dispatch(allactions.majorContentActions.setCigarBaseLine())} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine} onClick = {() => dispatch(allactions.majorContentActions.setPipeBaseLine())} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine} onClick = {() => dispatch(allactions.majorContentActions.setTobaccoBaseLine())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine} onClick = {() => dispatch(allactions.majorContentActions.setEcigarBaseLine())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine} onClick = {() => dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Other</span>
                                    </div>
                                    {
                                        majorContent.noncigarOtherBaseLine ? 
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                            <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                <input name='noncigarBaseLineSpecify' className='inputUnderscore' value={majorContent.noncigarBaseLineSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value))} />
                                            </span>
                                        </div> : ''
                                    }   
                                </td>
                                <td style={{verticalAlign: 'middle'}}> 
                                <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick = {() => dispatch(allactions.majorContentActions.setCigarFollowUp())} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick = {() => dispatch(allactions.majorContentActions.setPipeFollowUp())} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick = {() => dispatch(allactions.majorContentActions.setTobaccoFollowUp())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick = {() => dispatch(allactions.majorContentActions.setEcigarFollowUp())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp} onClick = {() => dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp())} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Other</span>
                                    </div>
                                    {
                                        majorContent.noncigarOtherFollowUp ? 
                                        <div className='col-sm-offset-2 col-sm-10'>
                                            <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                            <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                <input name='noncigarFollowUpSpecify' className='inputUnderscore' value={majorContent.noncigarFollowUpSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value))} />
                                            </span>
                                        </div> : ''
                                    }   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
}

export default MajorContentForm