import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'
import validator from '../../../validators'
import Person from './Person'
import Investigator from './Investigator'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './CohortForm.css'

const CohortForm = ({ ...props }) => {
    const cohort = useSelector(state => state.cohortReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch()

    const [displayStyle, setDisplay] = useState('none')
    const [activePanel, setActivePanel] = useState('panelA')

    useEffect(() => {
        if (!cohort.hasLoaded) {

            fetch('/api/questionnaire/cohort_basic_info/79', {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {
                    let currentCohort = result.data.cohort, changed = false,
                        investigators = result.data.investigators.length > 0 ? result.data.investigators : cohort.investigators, startChange = false,
                        completer = result.data.completer, contacter = result.data.contacter, collaborator = result.data.collaborator
                    batch(() => {
                        for (let k of Object.keys(currentCohort)) {
                            dispatch(allactions.cohortActions[k](currentCohort[k]))
                        }
                        if (completer)
                            for (let k of Object.keys(completer)) {
                                if (k != 'completerCountry')
                                    dispatch(allactions.cohortActions[k](completer[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('completerCountry', completer.completerCountry))
                            }
                        if (contacter)
                            for (let k of Object.keys(contacter)) {
                                if (k != 'contacterCountry')
                                    dispatch(allactions.cohortActions[k](contacter[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('contacterCountry', completer.contacterCountry))
                            }
                        if (collaborator)
                            for (let k of Object.keys(collaborator)) {
                                if (k != 'collaboratorCountry')
                                    dispatch(allactions.cohortActions[k](collaborator[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('collaboratorCountry', completer.collaboratorCountry))
                            }
                        if (result.data.sectionStatus)
                            for (let k of result.data.sectionStatus) {
                                dispatch(allactions.sectionActions.setSectionStatus(k.page_code, k.section_status))
                            }
                        if (investigators.length > 0) dispatch(allactions.cohortActions.setInvestigators(investigators))
                        dispatch(allactions.cohortActions.setHasLoaded(true))
                    })

                })

        }
    }, [])



    return <div id='cohortContainer' className='col-md-12'>
        <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts
            </div>
            <div>
                <form id='currentForm' readOnly>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>
                        <span>Cohort Information</span></div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'}>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortName' className='col-md-4'>A.1a Cohort Name<span style={{ color: 'red' }}>*</span></label>
                            <span className='col-md-8' style={{ paddingLeft: '25px' }}>{cohort.cohort_name}</span>
                        </div>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortAcronym' className='col-md-4'>A.1b Cohort Abbreviation</label>
                            <span className='col-md-5'>
                                <span style={{ paddingLeft: '10px' }}>{cohort.cohort_acronym}</span>
                            </span>
                        </div>
                        <div id='question7' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <label style={{ paddingLeft: '0' }}>A.7{' '}Cohort Description</label>
                                <p style={{ fontSize: '16px' }}>Please provide a short paragraph describing your cohort. This will be used as an overall narrative description of your cohort on the CEDCD website.  You may provide a link to a description on your cohort’s website.</p>
                            </div>
                            <div>
                                <span className='col-md-12'><textarea className='form-control' name='cohortDes' cols='20' rows='15' style={{ resize: 'none', fontFamily: '"PT Sans", Arial, sans-serif', fontSize: '16px' }} value={cohort.cohort_description} /></span>
                            </div>
                        </div>
                        <div id='question6' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12'>
                                <label className='col-md-6' style={{ paddingLeft: '0' }}>A.6{' '}Does the cohort have a website ? Please specify if applicable</label>
                            </div>
                            <div className='col-md-8' style={{ maxWidth: '670px' }}>
                                <span className='col-md-12' style={{ margin: '0', padding: '0' }}><input className='form-control' name='websiteurl' value={cohort.cohort_web_site} /></span>
                            </div>
                        </div>
                        <div className='form-group col-md-12'>
                            <div className='col-md-12'>
                                <label className='col-md-4' style={{ paddingLeft: '0', marginRight: '0', width: '298px', lineHeight: '2em' }}>A.2 Date Form Completed<span style={{ color: 'red' }}>*</span></label>
                                <span className='col-md-4' style={{ marginLeft: '0', paddingLeft: '0', paddingRight: '0' }}>
                                    <DatePicker className='form-control' selected={new Date(cohort.completionDate)} dateFormat='MM/dd/yyyy' readOnly />
                                </span>
                            </div>
                        </div>
                        <div id='question3' className='col-md-12' style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
                            <div id='a3a' className='col-md-8' style={{ paddingLeft: '0', marginBottom: '25px' }} readOnly>
                                <div className='col-xs-12' style={{ marginBottom: '5px' }}><b>A.3a{' '}Person who completed the form:</b><span style={{ color: 'red' }}>*</span></div>
                                {<Person id='completerInfo' type='completerCountry' name='completerName' position='completerPosition' phone='completerPhone' email='completerEmail' colWidth='12' displayStyle={displayStyle} />
                                } </div>
                            <div id='a3b' className='col-md-12'>
                                <div style={{ marginBottom: '5px' }}><b>A.3b{' '}Contact Person for Clarification of this form</b><span style={{ color: 'red' }}>*</span></div>
                                <div style={{ marginBottom: '40px' }}>
                                    <span className='col-md-6' style={{ marginRight: '0' }}>Is this the person to contact with questions about this form?</span>
                                    <span className='col-md-1' style={{ paddingLeft: '0', marginLeft: '0' }}><input type='radio' name='contacterRight' checked={cohort.clarification_contact === 0} />{' '}No</span>
                                    <span className='col-md-1' style={{ paddingLeft: '0' }}><input type='radio' name='contacterRight' checked={cohort.clarification_contact === 1} />{' '}Yes</span>
                                </div>
                                <div id='contacterInfo' className='col-sm-8' style={{ paddingLeft: '0' }}>
                                    {
                                        cohort.clarification_contact === 0 ?
                                            <Person type='contacterCountry' name='contacterName' position='contacterPosition' phone='contacterPhone' email='contacterEmail' colWidth='12' displayStyle={displayStyle} leftPadding='0' /> : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}><span>Principal Investigators</span></div>
                    <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'}>
                        <div id='question4' className='col-md-12' style={{ paddingTop: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                <label className='col-md-3' style={{ paddingLeft: '0' }}>A.4{' '} Cohort Principal Investigator(s)</label>

                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                {
                                    cohort.investigators.map((item, idx) => <div className='col-md-12'><Investigator key={idx} id={'investigator_' + idx}
                                        name={'investigator_name_' + idx} institution={'investigator_inst_' + idx} email={'investigator_email_' + idx}
                                        displayStyle={displayStyle} /></div>
                                    )
                                }
                            </div>
                        </div>
                        <div id='question5' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px', marginRight: '0' }}>
                                <label style={{ paddingLeft: '0' }}>A.5{' '}If an investigator is interested in collaborating with your cohort on a new project, whom should they contact?</label>
                            </div>
                            {<Person id='collaborator' type='collaboratorCountry' name='collaboratorName' position='collaboratorPosition' phone='collaboratorPhone' email='collaboratorEmail' colWidth='7' displayStyle={displayStyle} />
                            } <div className='col-md-5' style={{ display: 'flex', flexDirection: 'column' }}> </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}><span>Eligibility  & Enrollment</span></div>
                    <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'}>
                        <div id='question8' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <label>A.8{' '}Eligibility Criteria<span style={{ color: 'red' }}>*</span></label>
                            </div>
                            <div>
                                <div className='col-md-12' style={{ marginBottom: '15px' }}>
                                    <span className='col-md-2' style={{ paddingLeft: '0' }}>Eligible gender</span>
                                    <span className='col-md-2' style={{ marginRight: '0' }}>
                                        <input type='radio' name='eligibleGender' value='4' checked={cohort.eligible_gender_id === 4} />{' '} Both genders
                                    </span>
                                    <span className='col-md-2' style={{ marginRight: '0' }}>
                                        <input type='radio' name='eligibleGender' value='2' checked={cohort.eligible_gender_id === 2} />{' '} Males only
                                    </span>
                                    <span className='col-md-2' style={{ marginRight: '0' }}>
                                        <input type='radio' name='eligibleGender' value='1' checked={cohort.eligible_gender_id === 1} />{' '} Females only
                                    </span>

                                </div>
                                <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                    <div style={{ paddingLeft: '0', marginBottom: '5px' }}>Baseline population consists of<span style={{ color: 'red' }}>*</span></div>
                                    <div className='col-md-12'>
                                        <input type='checkbox' name='cancerSurvivors' checked={cohort.eligible_disease} />{' '} Cancer survivors only, specify cancer site(s)
                                    </div>
                                    <div className='col-md-6' style={{ marginBottom: '20px' }}>
                                        <input name='cancerSites' className='form-control' value={cohort.eligible_disease} maxlength='100' placeholder='no more than 100 characters' disabled={!cohort.eligible_disease} />
                                    </div>
                                    <div className='col-md-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                        <div style={{ marginBottom: '5px' }}>Please specify any eligibility criteria in addition to age and sex</div>
                                        <div className='col-md-6' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <span className='col-md-12'>
                                                <input className='form-control' placeholder='no more than 100 characters' maxLength='100' name='otherCriteria' value={cohort.eligible_disease_other_specify} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='question9' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12'>
                                <label style={{ paddingLeft: '0' }}>A.9{' '}Enrollment Information</label>
                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-6' style={{ lineHeight: '2em' }}>
                                    Totoal number of subjects enrolled to date<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='enrollTotal' value={cohort.enrollment_total} />
                                </span>

                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-6' style={{ lineHeight: '2em' }}> Started in year<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-2'><input className='form-control' name='enrollStartYear' placeholder='yyyy' value={cohort.enrollment_year_start} /></span>

                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0', marginBottom: '8px' }}>
                                <span className='col-md-6' style={{ lineHeight: '2em' }}> Ended in year<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-2'><input className='form-control' name='enrollEndYear' placeholder='yyyy' value={cohort.enrollment_year_end} /></span>

                            </div>
                            <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                <span className='col-md-6' style={{ paddingLeft: '0' }}>Is enrollment ongoing?<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-1'><input type='radio' name='enrollment_ongoing' value='0' checked={cohort.enrollment_ongoing === 0} /> No</span>
                                <span className='col-md-1'><input type='radio' name='enrollment_ongoing' value='1' checked={cohort.enrollment_ongoing === 1} /> Yes</span>
                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-6' style={{ lineHeight: '2em' }}>
                                    If still enrolling, please specify the target number of plan to enroll<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='targetNumber' value={cohort.enrollment_target} />
                                </span>
                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <span className='col-md-6' style={{ lineHeight: '2em' }}>
                                    If still enrolling, please specify when you plan to complete enrollment<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='yearToComplete' placeholder='yyyy' value={cohort.enrollment_year_complete} />
                                </span>
                            </div>

                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}>Baseline age range of enrolled subjects<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-2'>
                                        <input className='form-control' name='enrollment_age_min' value={cohort.enrollment_age_min} />
                                    </span>
                                    <span className='col-md-1' style={{ lineHeight: '2em', padding: '0', margin: '0', width: '15px' }}> to </span>
                                    <span className='col-md-2'><input className='form-control' name='enrollment_age_max' value={cohort.enrollment_age_max} /></span>
                                </div>

                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}>Median age<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='enrollment_age_median' value={cohort.enrollment_age_median} /></span>
                                </div>
                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}> Mean age<span style={{ color: 'red' }}>*</span> </span>
                                    <span className='col-md-2'><input className='form-control' name='enrollment_age_mean' value={cohort.enrollment_age_mean} /></span>
                                </div>
                            </div>
                            <div className='col-md-12' style={{ paddingLeft: '0' }}>
                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}>Current age range of enrolled subjects<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='current_age_min' value={cohort.current_age_min} /></span>
                                    <span className='col-md-1' style={{ lineHeight: '2em', padding: '0', margin: '0', width: '15px' }}> to </span>
                                    <span className='col-md-2'><input className='form-control' name='current_age_max' value={cohort.current_age_max} /></span>
                                </div>
                                <div className='col-md-12'>
                                </div>
                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}>Median age<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='current_age_median' value={cohort.current_age_median} /></span>
                                </div>
                                <div>
                                    <span className='col-md-6' style={{ lineHeight: '2em' }}> Mean age<span style={{ color: 'red' }}>*</span> </span>
                                    <span className='col-md-2'><input className='form-control' name='current_age_mean' value={cohort.current_age_mean} /></span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}><span>Requirements & Strategies</span></div>
                    <div className={activePanel === 'panelD' ? 'panel-active' : 'panellet'}>
                        <div id='question10' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                <label className='col-md-8' style={{ padding: '0', margin: '0' }}>A.10{' '}Specify the frequency of questionnaires, e.g, annually, every 2 years etc.<span style={{ color: 'red' }}>*</span></label>
                            </div>
                            <div className='col-md-8' style={{ padding: '0 3px' }}>
                                <span className='col-md-12' style={{ paddingLeft: '8px', paddingRight: '18px', marginLeft: '0' }}><input className='form-control' name='time_interval' value={cohort.time_interval} /></span>

                            </div>
                        </div>
                        <div id='question11' className='col-md-12' style={{ paddingTop: '10px' }}>
                            <div className='col-md-12'>
                                <label className='col-md-6' style={{ paddingLeft: '0' }}>A.11{' '}Most recent year when questionnaire data were collected<span style={{ color: 'red' }}>*</span></label>
                                <span className='col-md-2'><input className='form-control' name='most_recent_year' value={cohort.most_recent_year} /></span>

                            </div>
                        </div>
                        <div id='question12' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <label style={{ paddingLeft: '0' }}>A.12{' '}How was information from the questionnaire administered/collected?<span style={{ color: 'red' }}>*</span>  (select all that apply) </label>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                                        <input type='checkbox' name='data_collected_in_person' checked={cohort.data_collected_in_person == 1} />{' '}
                                    </span>
                                    <span>In person</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                                        <input type='checkbox' name='data_collected_phone' checked={cohort.data_collected_phone == 1} />{' '}
                                    </span>
                                    <span>Phone interview</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                                        <input type='checkbox' name='data_collected_paper' checked={cohort.data_collected_paper == 1} />{' '}
                                    </span>
                                    <span>Self-administered via paper</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                                        <input type='checkbox' name='data_collected_web' checked={cohort.data_collected_web == 1} />{' '}
                                    </span>
                                    <span>Self-administered via web-based device</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                                        <input type='checkbox' name='data_collected_other' checked={cohort.data_collected_other == 1} />{' '}
                                    </span>
                                    <span className='col-md-1' style={{ paddingLeft: '0', marginLeft: '0', marginRight: '0', width: '50px' }}>Other</span>
                                    {
                                        cohort.collectedOther ?
                                            <span className='col-md-6' style={{ marginLeft: '0' }}>
                                                <input style={{ height: '20px' }} name='data_collected_other_specify' className='form-control' value={cohort.data_collected_other_specify} placeholder='no more than 100 characters' />
                                            </span> : ''
                                    }

                                </div>
                            </div>
                        </div>
                        <div id='question13' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <label style={{ paddingLeft: '0' }}>A.13{' '}Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?<span style={{ color: 'red' }}>*</span></label>
                            </div>

                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='requireNone' checked={cohort.requireNone === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>None</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='requireCollab' checked={cohort.requireCollab === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Require collaboration with cohort investigattors</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='requireIrb' checked={cohort.requireIrb === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Require IRB approvals</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='requireData' checked={cohort.requireData === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Require data use agreements and/or materrial transfer agreement</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='restrictGenoInfo' checked={cohort.restrictGenoInfo === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Restrictions in the consent related to genetic information</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='restrictOtherDb' checked={cohort.restrictOtherDb === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Restrictions in the consent related to linking to other databases</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='restrictCommercial' checked={cohort.restrictCommercial === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Restrictions on commercial use</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='restrictOther' checked={cohort.restrictOther === 1} /></span>
                                <span className='col-md-1' style={{ lineHeight: '1.4em', padding: '0', margin: '0', width: '50px' }}>Other</span>
                                {
                                    cohort.restrictOther === 1 ?
                                        <span className='col-md-6' style={{ margin: '0' }}><input style={{ height: '20px' }} className='form-control' name='restrictions_other_specify' placeholder='no more than 100 characters' value={cohort.restrictions_other_specify} /></span> : ''
                                }
                            </div>
                        </div>

                        <div id='question14' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <label style={{ paddingLeft: '0' }}>A.14{' '}What strategies does your cohort use to engage participants?<span style={{ color: 'red' }}>*</span> </label>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_routine' checked={cohort.strategy_routine === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Nothing beyond mailing questionnaires or other routine contacts </span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_mailing' checked={cohort.strategy_mailing === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Send newsletters or other general mailings (e.g., birthday cards)</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_aggregate_study' checked={cohort.strategy_aggregate_study === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Return aggregate study results (e.g., recent findings)  </span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_individual_study' checked={cohort.strategy_individual_study === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Individual study results (e.g., nutrient values)</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_invitation' checked={cohort.strategy_invitation === 1} /></span>
                                <span style={{ lineHeight: '1.4em' }}>Invite participation on research committees</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}><input type='checkbox' name='strategy_other' checked={cohort.strategy_other === 1} /></span>
                                <span className='col-md-1' style={{ lineHeight: '1.4em', padding: '0', margin: '0', width: '50px' }}>Other</span>
                                {
                                    cohort.strategyOther ?
                                        <span className='col-md-6' style={{ margin: '0' }}><input style={{ height: '20px' }} className='form-control' name='strategy_other_specify' value={cohort.strategy_other_specify} placeholder='no more than 100 characters' /></span> : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelE' ? '' : 'panelE')}><span>Documents</span></div>
                    <div className={activePanel === 'panelE' ? 'panel-active' : 'panellet'}>
                        <div id='question15' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                <label style={{ paddingLeft: '0' }}>A.15 {' '} As indicated on the CEDCD Approval Form, we are requesting the following items for inclusion on the CEDCD website. If you provided approval to post this information, please attach the documents and return them with this form. If they are already available on a publicly accessible website, please just provide the website address.<span style={{ color: 'red' }}>*</span></label>
                            </div>
                            <div className='col-md-12'>
                                <table className='table table-stripe table-responsive table-borderless' readOnly>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Document</th>
                                            <th style={{ textAlign: 'center' }}>Website URL (preferred)</th>
                                            <th style={{ textAlign: 'center' }}>Attached (if url not applicable)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={''}>
                                            <td>Questionnaires</td>
                                            <td><input className='inputWriter' name='questionnaireUrl' id='questionnaireUrl' disabled={cohort.questionnaireFileName} value={cohort.questionnaire_url} readOnly /></td>
                                            <td >
                                                <input className='inputWriter' name='cohortFile' value={cohort.questioinnaireFileName} readOnly />
                                            </td>
                                        </tr>
                                        <tr className={''}>
                                            <td>Main cohort protocol</td>
                                            <td><input className='inputWriter' name='main_cohort_url' id='main_cohort_url' disabled={cohort.mainFileName} value={cohort.main_cohort_url} readOnly /></td>
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <input className='inputWriter' name='cohortFile' value={cohort.mainFileName} readOnly />
                                            </td>

                                        </tr>
                                        <tr className={''}>
                                            <td>Data sharing policy</td>
                                            <td><input className='inputWriter' name='data_url' id='data_url' disabled={cohort.dataFileName} value={cohort.data_url} readOnly /></td>
                                            <td style={{ verticalAlign: 'middle' }}><input className='inputWriter' name='cohortFile' value={cohort.dataFileName} readOnly /></td>

                                        </tr>
                                        <tr className={''}>
                                            <td>Biospecimen sharing policy</td>
                                            <td><input className='inputWriter' name='specimen_url' id='specimen_url' disabled={cohort.specimenFileName} value={cohort.specimen_url} readOnly /></td>
                                            <td style={{ verticalAlign: 'middle' }}><input className='inputWriter' name='cohortFile' value={cohort.specimenFileName} readOnly /></td>

                                        </tr>
                                        <tr className={''}>
                                            <td>Publication(authorship) policy</td>
                                            <td><input className='inputWriter' name='publicationUrl' value={cohort.publication_url} id='publication_url' disabled={cohort.publicationFileName} readOnly /></td>
                                            <td style={{ verticalAlign: 'middle' }}><input className='inputWriter' name='cohortFile' value={cohort.publicationFileName} readOnly /></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span onClick={() => props.sectionPicker('B')} style={{ position: 'relative', float: 'Right' }}>
                        <input type='button' className='btn btn-primary' value='Next' />
                    </span>
                </div>
            </div>
        </div >
    </div >

}

export default CohortForm
