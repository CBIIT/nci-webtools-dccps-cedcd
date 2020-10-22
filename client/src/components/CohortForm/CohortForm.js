import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Person from '../Person/Person'
import Investigator from '../Investigator/Investigator'
import './CohortForm.css'

const CohortForm = ({...props}) => {
    const cohort = useSelector(state => state.cohortReducer)
    const dispatch = useDispatch()
    const [contacters, setContacters] = useState([])
    const [needurl, setNeedurl] = useState(false)
    const [errors, setErrors] = useState({})
    const [displayStyle, setDisplay] = useState('none')
    const [activePanel, setActivePanel] = useState('panelA')
    useEffect(() => {
        if(cohort.contacterRight === '0') setContacters([0]) 
    },[errors])

    const saveCohort = (id=79, proceed=false) => {
        fetch(`/api/questionnaire/update_cohort_basic/${id}`,{
            method: "POST",
            body: JSON.stringify(cohort),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if(result.status === 200){
                    if(!proceed)
                        alert('Data was successfully saved')
                    else
                        props.sectionPicker('B')
                }else{
                    alert(result.message)
                }
            })
    }
    const handleSave = () => {
        if(Object.entries(errors).length === 0)
            saveCohort(79)
        else{
            setDisplay('block')
            if(window.confirm('there are validation errors, are you sure to save?'))
                saveCohort(79)
        }
    }

    const handleSaveContinue = () => {
        if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
            saveCohort(79, true)}
    }

    const getMinAgeValidationResult = (value, requiredOrNot, maxAge) => validator.minAgeValidator(value, requiredOrNot, maxAge)
    const getMaxAgeValidationResult = (value, requiredOrNot, minAge) => validator.maxAgeValidator(value, requiredOrNot, minAge)
    const getMeanMedianAgeValidationResult = (value, requiredOrNot, minAge, maxAge) => validator.medianAgeValidator(value, requiredOrNot, minAge, maxAge)

    const populateBaseLineMinAgeError = (value, requiredOrNot, maxAge) => {
        const result = getMinAgeValidationResult(value, requiredOrNot, maxAge)
        if(result){
            let shadow = {...errors}
            shadow['baseLineMinAge'] = result
            setErrors(shadow)
        }else{
            let shadow = {...errors}
            if(errors['baseLineMinAge']) delete shadow['baseLineMinAge']
            if(errors['baseLineMaxAge']) delete shadow['baseLineMaxAge']
            setErrors(shadow)
        }
    }

    const populateBaseLineMaxAgeError = (value, requiredOrNot, minAge) => {
        const result = getMaxAgeValidationResult(value, requiredOrNot, minAge)
        if(result){
            let shadow = {...errors}
            shadow['baseLineMaxAge'] = result
            setErrors(shadow)
        }else{
            let shadow = {...errors}
            if(errors['baseLineMinAge']) delete shadow['baseLineMinAge']
            if(errors['baseLineMaxAge']) delete shadow['baseLineMaxAge']
            setErrors(shadow)
        }
    }

    const populateCurrentMinAgeError = (value, requiredOrNot, maxAge) => {
        const result = getMinAgeValidationResult(value, requiredOrNot, maxAge)
        if(result){
            let shadow = {...errors}
            shadow['currentMinAge'] = result
            setErrors(shadow)
        }else{
            let shadow = {...errors}
            if(errors['currentMinAge']) delete shadow['currentMinAge']
            if(errors['currentMaxAge']) delete shadow['currentMaxAge']
            setErrors(shadow)
        }
    }

    const populateCurrentMaxAgeError = (value, requiredOrNot, minAge) => {
        const result = getMaxAgeValidationResult(value, requiredOrNot, minAge)
        if(result){
            let shadow = {...errors}
            shadow['currentMaxAge'] = result
            setErrors(shadow)
        }else{
            let shadow = {...errors}
            if(errors['currentMinAge']) delete shadow['curentMinAge']
            if(errors['currentMaxAge']) delete shadow['currentMaxAge']
            setErrors(shadow)
        }
    }

    const populateMeanMedianAgeError = (fieldName, value, requiredOrNot, minAge, maxAge) => {
        const result = getMeanMedianAgeValidationResult(value, requiredOrNot, minAge, maxAge)
        if(result){
            let shadow = {...errors}
            shadow[fieldName] = result
            setErrors(shadow)
        }else{ 
            if(errors[fieldName]){ 
                let shadow = {...errors}
                delete shadow[fieldName]
                setErrors(shadow)
            }
        }
    }
    //general validation, will be removed from this file later
    const getValidationResult = (value, requiredOrNot, type) => {
        switch(type){
            case 'string':
                return validator.stringValidator(value, requiredOrNot)
            case 'date': 
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
        }
    }
    //will be removed from this file later
    const populateErrors = (fieldName, value, requiredOrNot, valueType) => {
        const result = getValidationResult(value, requiredOrNot, valueType)
        if(result) {
            let shadow = {...errors}
            shadow[fieldName] = result
            setErrors(shadow)
        }else{
            if(errors[fieldName]){
                let shadow = {...errors}
                delete shadow[fieldName] 
                setErrors(shadow) 
            }
            
        }
    }


    function setCollaborator(e, n,p,tel,eml, checkedValue){
        let name = e.target.checked ? n : ''
        let position = e.target.checked ? p : ''
        let phone = e.target.checked ? tel : ''
        let email = e.target.checked ? eml : ''
        dispatch(allactions.cohortActions.setCollaboratorName(name))
        dispatch(allactions.cohortActions.setCollaboratorPosition(position))
        dispatch(allactions.cohortActions.setCollaboratorPhone(phone))
        dispatch(allactions.cohortActions.setCollaboratorEmail(email))
        dispatch(allactions.cohortActions.setSameAsSomeone(checkedValue))
        
    }

    return <div id='cohortContainer' className='col-md-12'>
        <div className='col-md-offset-1 col-md-10' style={{display: 'flex', flexDirection: 'column', width: '80%'}}>           
            <h1 style={{marginTop: '10px', color: 'blue'}}>Basic Information</h1>
            <div style={{backgroundColor: 'grey', color: 'white', marginBottom: '20px'}}>
                A.{' '} <b>Basic Cohort Information</b>(If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts)
            </div>
            <div>
                <form id='currentForm'>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Question 1 through 4</div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'}>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortName' className='col-md-4'>A.1a Cohort Name</label>
                            <span className='col-md-5'>
                                <input className='form-control' name='cohortName' value={cohort.name} onChange={e => dispatch(allactions.cohortActions.setCohortName(e.target.value))} onBlur={(e) => {populateErrors('cohortName', e.target.value, true, 'string')}}/>
                            </span>
                            {errors.cohortName ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.cohortName}</span> : ''}
                        </div>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortAcronym' className='col-md-4'>A.1b Cohort Abbreviation</label>
                            <span className='col-md-5'>
                                <span  style={{paddingLeft: '10px'}}>{cohort.acronym}</span>
                            </span>
                        </div>
                        <div className='form-group col-md-12' style={{paddingBottom: '10px', borderBottom: '1px solid grey'}}>
                            <label htmlFor='completionDate' className='col-md-4'>A.2 Date Form Completed</label>
                            <span className='col-md-5'>
                                <input className='form-control' name='completionDate' value={cohort.completionDate} onChange={e => dispatch(allactions.cohortActions.setCompletionDate(e.target.value))} onBlur={(e) => {populateErrors('completionDate', e.target.value, true, 'date')}}/>
                            </span>
                            {errors.completionDate ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.completionDate}</span> : ''}
                        </div>
                        <div id='question3' className='col-md-12' style={{display: 'flex', flexDirection: 'row', borderBottom: '1px solid grey', paddingBottom: '10px'}}>
                            <div id='a3a' className='col-md-6' style={{borderRight: '1px solid grey', flexGrow: '5', paddingLeft: '0'}}>
                                <div className='col-xs-12'><b>A.3a{' '}Person who completed the form:</b></div>
                                <Person id='completerInfo' name='completerName' position='completerPosition' phone='completerPhone' email='completerEmail' colWidth={12} callback={setErrors} errors={errors} displayStyle={displayStyle} />
                            </div>
                            <div id='a3b' className='col-md-6' style={{flexGrow: '5'}}>
                                <div><b>A.3b{' '}Contact Person for Clarification of this form</b></div>
                                <div>
                                    <span>Is this the person to contact with questions about this form?</span>
                                </div>
                                <div className='col-md-12' style={{textAlign: 'center'}}>
                                    <span className='col-md-3'><input type='radio' name='contacterRight' value='0' checked={cohort.contacterRight === '0'} onClick={() => {dispatch(allactions.cohortActions.setContacterRight('0')); setContacters([0])}} />No</span>
                                    <span className='col-md-3'><input type='radio' name='contacterRight' value='1' checked={cohort.contacterRight === '1'} onClick={() => {dispatch(allactions.cohortActions.setContacterRight('1')); setContacters([])}} />Yes</span>
                                </div>
                                <div id='contacterInfo'>
                                    {
                                        contacters.map(c => <Person key={c} name='contacterName' position='contacterPosition' phone='contacterPhone' email='contacterEmail' colWidth={12} callback={setErrors} errors={errors}  displayStyle={displayStyle}/>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div id='question4' className='col-md-12' style={{paddingTop: '10px', borderBottom: '1px solid grey'}}>
                        <div className='col-md-12' style={{marginBottom: '10px'}}>
                            <label className='col-md-6'  style={{paddingLeft: '0'}}>A.4{' '} Cohort Principal Investigator(s)</label>
                            <span className='col-md-4' style={{position: 'relative'}}><button className='btn btn-primary btn-sm' onClick={(e) => {e.preventDefault(); dispatch(allactions.cohortActions.addInvestigator())}} style={{position: 'absolute', right: 0}}>add new investigator</button></span>
                        </div>
                        <div className='col-md-12' style={{paddingLeft: '0'}}>
                            {
                                cohort.investigators.map((item, idx) => <Investigator key={idx} id={'investigator_'+idx} name={'investigator_name_'+idx} institution={'investigator_inst_'+idx} email={'investigator_email_'+idx} isRequired={idx === 0 ? true : false} callback={setErrors} errors={errors} investigator={item}  displayStyle={displayStyle}/>
                                )
                            }
                        </div>
                    </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Question 5 through 8</div>
                    <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'}>
                        <div id='question5' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px', borderBottom: '1px solid grey'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.5{' '}If an investigator is interested in collaborating with your cohort on a new project, whom should they contact?</label>
                            </div>
                            <Person id='collaborator' name='collaboratorName' position='collaboratorPosition' phone='collaboratorPhone' email='collaboratorEmail' colWidth={6} callback={setErrors} errors={errors} displayStyle={displayStyle} />
                            <div className='col-md-6' style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{margin: '20px auto'}}>
                                    <input type='radio' name='sameAsSomeone' value='0' checked={cohort.sameAsSomeone == 0}  onChange={(e) =>setCollaborator(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, '0')}/>{' '}
                                    <span htmlFor='sameAsSomeone'>same as 3a </span>
                                </div>
                                { 
                                    contacters.length > 0 ? 
                                    <div  style={{margin: '20px auto'}}>
                                        <input type='radio' name='sameAsSomeone' value='1' checked={cohort.sameAsSomeone == 1}  onChange={(e) =>setCollaborator(e, cohort.contacterName, cohort.contacterPosition, cohort.contacterPhone, cohort.contacterEmail, '1')}/>{' '}
                                        <span htmlFor='sameAsSomeone'>{' '} same as 3b </span>
                                    </div> : ''
                                }
                            </div>                        
                        </div>
                        <div id='question6' className='col-md-12' style={{paddingTop: '10px', borderBottom: '1px solid grey', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.6{' '}Does the cohort have a website ? </label>
                            </div>
                            <div className='col-md-12'>
                                <span className='col-md-2' style={{marginRight: '0'}}>
                                    <input type='radio' name='website'  value='1' checked={cohort.hasAWebSite === '1'} onChange={() => {dispatch(allactions.cohortActions.setHasAWebSite('1')); setNeedurl(true)}}/>{' '} Yes
                                </span>
                                <span className='col-md-10' style={{marginLeft: '0'}}>
                                    <span className='col-md-4' style={{lineHeight: '1.5em', margin: '0', padding: '0'}}>{' '} Please specify website</span>
                                    <span className='col-md-3' style={{margin: '0', padding: '0'}}><input className='form-control' name='websiteurl' value={cohort.webSite} onChange={e => dispatch(allactions.cohortActions.setWebSite(e.target.value))} onBlur={(e) => {populateErrors('websiteurl', e.target.value, true, 'string')}}/>
                                    </span>
                                    {errors.websiteurl ? <span className='col-md-5' style={{color: 'red', display: displayStyle}}>{errors.websiteurl}</span> : ''}
                                </span>
                            </div>
                            <div className='col-md-12'>
                            <span className='col-md-2' style={{marginRight: '0'}}>
                                <input type='radio' name='website'  value='0' checked={cohort.hasAWebSite === '0'} onChange={() => {dispatch(allactions.cohortActions.setHasAWebSite('0')); setNeedurl(false); dispatch(allactions.cohortActions.setWebSite(''))}}/>{' '} No
                                </span>
                            </div>
                        </div>
                        <div id='question7' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.7{' '}Cohort Description: Please provide a short paragraph describing your cohort. This will be used as an overall narrative description of your cohort on the CEDCD website.  You may provide a link to a description on your cohort’s website.</label>
                            </div>
                            <div>
                                <span className='col-md-10'><textarea className='form-control' name='cohortDes' cols='20' rows='5' value={cohort.description} onChange={e => dispatch(allactions.cohortActions.setDescription(e.target.value))} /></span>
                            </div>
                        </div>
                        <div id='question8' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'row'}}>
                            <div className='col-md-4' style={{marginBottom: '10px', flexGrow: '3', lineHeight: '16em', borderRight: '1px solid grey'}}>
                                <label style={{paddingLeft: '0'}}>A.8{' '}Eligibility Criteria</label>
                            </div>
                            <div className='col-md-7' style={{flexGrow: '7'}}>
                                <div className='col-md-12' style={{marginBottom: '10px'}}>
                                    <span style={{paddingLeft: '0'}}>Eligible gender</span>
                                </div>
                                <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>
                                    <span className='col-md-5' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='4' checked={cohort.eligibleGender === '4'} onChange={() => dispatch(allactions.cohortActions.setEligibleGender('4'))} />{' '} Both genders
                                    </span>
                                    <span className='col-md-5' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='2' checked={cohort.eligibleGender === '2'} onChange={() => dispatch(allactions.cohortActions.setEligibleGender('2'))} />{' '} Males only
                                    </span>
                                    <span className='col-md-5' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='1' checked={cohort.eligibleGender === '1'} onChange={() => dispatch(allactions.cohortActions.setEligibleGender('1'))} />{' '} Females only
                                    </span>
                                </div> 
                                <div className='col-md-12' style={{marginBottom: '10px'}}>
                                    <div style={{paddingLeft: '0'}}>Baseline population consists of</div>
                                    <div className='col-md-12'>
                                        <input type='checkbox' name='cancerSurvivors' checked={cohort.hasCancerSite} onChange={() => dispatch(allactions.cohortActions.setHasCancerSite())} />{' '} Cancer survivors only, specify cancer site(s)
                                    </div>
                                    <div className='col-md-11'>
                                        <textarea name='cancerSites' className='form-control' value={cohort.cancerSites} disabled={!cohort.hasCancerSite} onChange={e => dispatch(allactions.cohortActions.setCancerSites(e.target.value))} />
                                    </div>
                                    <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                        <div>Please specify any eligibility criteria in addition to age and gender</div>
                                        <div className='col-md-12' style={{paddingLeft: '0'}}>
                                            <span className='col-md-11'>
                                                <input className='form-control' name='otherCriteria' value={cohort.eligibilityCriteriaOther} onChange={e => dispatch(allactions.cohortActions.setEligibilityCriteriaOther(e.target.value))} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}>Question 9 through 12</div>
                    <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'}>
                        <div id='question9' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.9{' '}Enrollment Information</label>
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-6' style={{lineHeight: '2em'}}>
                                    Totoal number of subjects enrolled to date
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='enrollTotal' value={cohort.enrolledTotal} onChange={e => dispatch(allactions.cohortActions.setEnrolledTotal(e.target.value))} onBlur={(e) => {populateErrors('enrollTotal', e.target.value, true, 'number')}}/>
                            </span>
                            {errors.enrollTotal ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.enrollTotal}</span> : ''}
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <span className='col-md-3' style={{lineHeight: '2em'}}> Started in year</span>
                                <span className='col-md-2'><input className='form-control' name='enrollStartYear' placeholder='yyyy' value={cohort.enrollStartYear} onChange={e => dispatch(allactions.cohortActions.setEnrollStartYear(e.target.value))} onBlur={(e) => {populateErrors('enrollStartYear', e.target.value, true, 'year')}} /></span> 
                                <span className='col-md-3'  style={{lineHeight: '2em'}}> Ended in year</span>
                                <span className='col-md-3'><input className='form-control' name='enroll
                                EndYear' placeholder='yyyy' value={cohort.enrollEndYear} onChange={e => dispatch(allactions.cohortActions.setEnrollEndYear(e.target.value))} onBlur={(e) => {populateErrors('enrollEndYear', e.target.value, true, 'year')}} /></span>
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                {errors.enrollStartYear ? <span className='col-md-offset-3 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.enrollStartYear}</span> : ''}
                                {errors.enrollEndYear ? errors.enrollStartYear ? <span className='col-md-offset-2 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.enrollEndYear}</span> : <span className='col-md-offset-8 col-md-3' style={{color: 'red', fontSize: '1.3rem'}}>{errors.enrollEndYear}</span>:  ''}
                            </div>
                            <div className='col-md-12'>
                                <span  className='col-md-4' style={{paddingLeft: '0'}}>Is enrollment ongoing?</span>
                                <span className='col-md-3'><input type='radio' name='enrollmentCurrent' value='0' checked={cohort.enrollOnGoing === '0'} onChange={e => dispatch(allactions.cohortActions.setEnrollOnGoing('0'))} /> No</span>
                                <span className='col-md-3'><input type='radio' name='enrollmentCurrent' value='1' checked={cohort.enrollOnGoing === '1'} onChange={e => dispatch(allactions.cohortActions.setEnrollOnGoing('1'))} /> Yes</span>
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-9' style={{lineHeight: '2em'}}>
                                    If still enrolling, please specify the target number of plan to enroll
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='targetNumber' value={cohort.numOfPlans} onChange={e => dispatch(allactions.cohortActions.setNumOfPlans(e.target.value))} onBlur={(e) => {populateErrors('targetNumber', e.target.value, true, 'number')}}/>
                                </span>
                                {errors.targetNumber ? <span className='col-md-offset-9 col-md-2' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.targetNumber}</span> : ''}
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-9' style={{lineHeight: '2em'}}>
                                    If still enrolling, please specify when you plan to complete enrollment
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='yearToComplete' placeholder='yyyy' value={cohort.yearToComplete} onChange={e => dispatch(allactions.cohortActions.setYearToComplete(e.target.value))}  onBlur={(e) => {populateErrors('yearToComplete', e.target.value, true, 'year')}}/>
                                </span>
                                {errors.yearToComplete ? <span className='col-md-offset-9 col-md-2' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.yearToComplete}</span> : ''}
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Baseline age range of enrolled subjects</span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMinAge' value={cohort.baseLineMinAge} onChange={e=>dispatch(allactions.cohortActions.setBaseLineMinAge(e.target.value))} onBlur={(e) => {populateBaseLineMinAgeError(e.target.value, true, cohort.baseLineMaxAge)}} /></span> 
                                    <span className='col-md-1'  style={{lineHeight: '2em'}}> to </span>
                                    <span className='col-md-2' ><input className='form-control' name='baseLineMaxAge' value={cohort.baseLineMaxAge} onChange={e=>dispatch(allactions.cohortActions.setBaseLineMaxAge(e.target.value))} onBlur={(e) => {populateBaseLineMaxAgeError(e.target.value, true, cohort.baseLineMinAge)}} /></span>
                                </div>
                                <div className='col-md-12'>
                                    {errors.baseLineMinAge ? <span className='col-md-offset-6 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMinAge}</span> : ''}
                                    {errors.baseLineMaxAge ? errors.baseLineMinAge ? <span className='col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMaxAge}</span>: <span className='col-md-offset-9 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMaxAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-2' style={{lineHeight: '2em'}}>Median age</span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMedian' value={cohort.baseLineMedianAge} onChange={e=>dispatch(allactions.cohortActions.setBaseLineMedianAge(e.target.value))} onBlur={e => populateMeanMedianAgeError('baseLineMedianAge', e.target.value, true, cohort.baseLineMinAge, cohort.baseLineMaxAge)} /></span> 
                                    <span className='col-md-2'  style={{lineHeight: '2em'}}> Mean age </span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMean' value={cohort.baseLineMeanAge} onChange={e=>dispatch(allactions.cohortActions.setBaseLineMeanAge(e.target.value))} onBlur={e => populateMeanMedianAgeError('baseLineMeanAge', e.target.value, true, cohort.baseLineMinAge, cohort.baseLineMaxAge)}/></span>
                                </div>
                                <div>
                                    {errors.baseLineMedianAge ? <span className='col-md-offset-2 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMedianAge}</span> : ''}
                                    {errors.baseLineMeanAge ? errors.baseLineMedianAge ? <span className='col-md-offset-1 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMeanAge}</span> : <span className='col-md-offset-6 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.baseLineMeanAge}</span> : ''}
                                </div>
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Current age range of enrolled subjects</span>
                                    <span className='col-md-2'><input className='form-control' name='currentMinAge' placeholder='yyyy' value={cohort.currentMinAge} onChange={e=>dispatch(allactions.cohortActions.setCurrentMinAge(e.target.value))} onBlur={e => populateCurrentMinAgeError(e.target.value, true, cohort.currentMaxAge)}/></span> 
                                    <span className='col-md-1'  style={{lineHeight: '2em'}}> to </span>
                                    <span className='col-md-2'><input className='form-control' name='currentMaxAge' placeholder='yyyy' value={cohort.currentMaxAge} onChange={e=>dispatch(allactions.cohortActions.setCurrentMaxAge(e.target.value))} onBlur={e => populateCurrentMaxAgeError(e.target.value, true, cohort.currentMinAge)}/></span>
                                </div>
                                <div className='col-md-12'>
                                    {errors.currentMinAge ? <span className='col-md-offset-6 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMinAge}</span> : ''}
                                    {errors.currentMaxAge ? errors.currentMinAge ? <span className='col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMaxAge}</span>: <span className='col-md-offset-9 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMaxAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-2' style={{lineHeight: '2em'}}>Median age</span>
                                    <span className='col-md-2'><input className='form-control' name='currentMedian' placeholder='yyyy' value={cohort.currentMedianAge} onChange={e=>dispatch(allactions.cohortActions.setCurrentMedianAge(e.target.value))} onBlur={e => populateMeanMedianAgeError('currentMedianAge', e.target.value, true, cohort.currentMinAge, cohort.currentMaxAge)}/></span> 
                                    <span className='col-md-2'  style={{lineHeight: '2em'}}> Mean age </span>
                                    <span className='col-md-2'><input className='form-control' name='currentMean' placeholder='yyyy' value={cohort.currentMeanAge} onChange={e=>dispatch(allactions.cohortActions.setCurrentMeanAge(e.target.value))} onBlur={e => populateMeanMedianAgeError('currentMeanAge', e.target.value, true, cohort.currentMinAge, cohort.currentMaxAge)}/></span>
                                </div>
                                <div>
                                    {errors.currentMedianAge ? <span className='col-md-offset-2 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMedianAge}</span> : ''}
                                    {errors.currentMeanAge ? errors.currentMedianAge ? <span className='col-md-offset-1 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMeanAge}</span> : <span className='col-md-offset-6 col-md-3' style={{color: 'red', fontSize: '1.3rem', display: displayStyle}}>{errors.currentMeanAge}</span> : ''}
                                </div>
                            </div>
                        </div>
                        <div id='question10' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.10{' '}Specify the frequency of questionnaires, e.g, annually, every 2 years etc.</label>
                            </div>
                            <div>
                                <span className='col-md-6'><input className='form-control' name='frequency' value={cohort.timeInterval} onChange={e=>dispatch(allactions.cohortActions.setQuestionnaireFrequency(e.target.value))}  onBlur={(e) => {populateErrors('timeInterval', e.target.value, true, 'string')}}/></span>
                                {errors.timeInterval ? <span className='col-md-3'  style={{color: 'red', display: displayStyle}}>{errors.timeInterval}</span> : ''}
                            </div>
                        </div>
                        <div id='question11' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.11{' '}Most recent year when questionnaire data were collected</label>
                            </div>
                            <div>
                                <span className='col-md-6'><input className='form-control' name='yearDataCollected' value={cohort.mostRecentYear} onChange={e=>dispatch(allactions.cohortActions.setMostRecentYear(e.target.value))} placeholder='yyyy' onBlur={(e) => {populateErrors('yearDataCollected', e.target.value, true, 'year')}}/></span>
                                {errors.yearDataCollected ? <span className='col-md-3'  style={{color: 'red', display: displayStyle}}>{errors.yearDataCollected}</span> : ''}
                            </div>
                        </div>
                        <div id='question12' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'row'}}>
                            <div className='col-md-4' style={{marginBottom: '10px', flexGrow: '3',  borderRight: '1px solid grey'}}>
                                <label style={{paddingLeft: '0', marginTop: '40px'}}>A.12{' '}How was information from the questionnaire administered/collected?  (select all that apply) </label>
                            {(cohort.collectedInPerson || cohort.collectedPhone || cohort.collectedPaper || cohort.collectedWeb || cohort.collectedOther) ? delete errors.dataCollection : <span style={{color: 'red', display:displayStyle}}>{errors.dataCollection='Please select one'}</span>}
                            </div>
                            <div className='col-md-7' style={{flexGrow: '7'}}>                               
                                <div className='col-md-12'>
                                    <div className='col-md-12'>
                                        <span className='col-md-1'>
                                            <input type='checkbox' name='collectedInPerson' checked={cohort.collectedInPerson}  onChange={() => dispatch(allactions.cohortActions.setCollectedInPerson())} />{' '}
                                        </span>
                                        <span className='col-md-4'>In person</span>
                                        
                                    </div>
                                    <div className='col-md-12'>
                                        <span className='col-md-1'>
                                            <input type='checkbox' name='collectedPhone' checked={cohort.collectedPhone}  onChange={() => dispatch(allactions.cohortActions.setCollectedPhone())} />{' '}
                                        </span>
                                        <span className='col-md-4'>Phone interview</span>
                                    </div>
                                    <div className='col-md-12'>
                                    <span className='col-md-1'>
                                            <input type='checkbox' name='collectedPaper' checked={cohort.collectedPaper}  onChange={() => dispatch(allactions.cohortActions.setCollectedPaper())}/>{' '} 
                                        </span>
                                        <span className='col-md-8'>Self-administered via paper</span>
                                    </div>
                                    <div className='col-md-12'>
                                        <span className='col-md-1'>
                                            <input type='checkbox' name='collectedWeb' checked={cohort.collectedWeb}  onChange={() => dispatch(allactions.cohortActions.setCollectedWeb())}/>{' '}
                                        </span>
                                        <span className='col-md-9'>Self-administered via web-based device</span>
                                    </div>
                                    <div className='col-md-12'>
                                        <span className='col-md-1'>
                                            <input type='checkbox' name='collectedOther' checked={cohort.collectedOther}  onChange={() => dispatch(allactions.cohortActions.setCollectedOther())}/>{' '}
                                        </span>
                                        <span className='col-md-2'>Other</span>                               
                                    </div>
                                    {
                                        cohort.collectedOther ?
                                        <div className='col-md-12'>
                                            <span className='col-md-offset-1 col-md-5' style={{lineHeight: '2em'}}>If yes, please specify</span>
                                            <span  className='col-md-6' >
                                                <input name='collectedOtherSpecify' className='form-control' value={cohort.collectedOtherSpecify} onChange={e=>dispatch(allactions.cohortActions.setOtherMeans(e.target.value))} /> 
                                            </span>
                                        </div> : ''   
                                    }           
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}>Question 13 through 15</div>
                    <div className={activePanel === 'panelD' ? 'panel-active' : 'panellet'}>
                    <div id='question13' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                        <div className='col-md-12' style={{marginBottom: '10px'}}>
                            <label style={{paddingLeft: '0'}}>A.13{' '}Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?</label>
                        </div>
                        {(cohort.requireNone || cohort.requirecollab || cohort.requireIrb || cohort.requireData || cohort.restrictGenoInfo || cohort.restrictOtherDb || cohort.restrictCommercial || cohort.restrictOther) ? delete errors.requirements : <div className='col-md-12'><span style={{color: 'red', display:displayStyle}}>{errors.requirements = 'Please select one'}</span></div>}
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireNone' checked={cohort.requireNone} onChange={() => dispatch(allactions.cohortActions.setRequireNone())} /></span>
                            <span style={{lineHeight: '1.4em'}}>None</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireCollab' checked={cohort.requireCollab} onChange={() => dispatch(allactions.cohortActions.setRequireCollab())}  /></span>
                            <span style={{lineHeight: '1.4em'}}>Require collaboration with cohort investigattors</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireIrb' checked={cohort.requireIrb} onChange={() => dispatch(allactions.cohortActions.setRequireIrb())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Require IRB approvals</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireData' checked={cohort.requireData} onChange={() => dispatch(allactions.cohortActions.setRequireData())}  /></span>
                            <span style={{lineHeight: '1.4em'}}>Require data use agreements and/or materrial transfer agreement</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictGenoInfo' checked={cohort.restrictGenoInfo} onChange={() => dispatch(allactions.cohortActions.setRestrictGenoInfo())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Restrictions in the consent related to genetic information</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictOtherDb' checked={cohort.restrictOtherDb} onChange={() => dispatch(allactions.cohortActions.setRestrictOtherDb())}/></span>
                            <span style={{lineHeight: '1.4em'}}>Restrictions in the consent related to linking to other databases</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictCommercial' checked={cohort.restrictCommercial} onChange={() => dispatch(allactions.cohortActions.setRestrictCommercial())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Restrictions on commercial use</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictOther' checked={cohort.restrictOther} onChange={() => dispatch(allactions.cohortActions.setRestrictOther())} /></span>
                            <span className='col-md-1' style={{lineHeight: '1.4em', padding: '0', margin: '0'}}>Other</span>
                            {
                                cohort.restrictOther ? 
                                <span className='col-md-5' style={{margin: '0'}}><input className='form-control' name='restrictOtherSpecify' value={cohort.restrictOtherSpecify} onChange={e=>dispatch(allactions.cohortActions.setRestrictOtherSpecify(e.target.value))} /></span> : ''
                            }
                        </div>
                    </div>

                    <div id='question14' className='col-md-12' style={{borderBottom: '1px solid grey', paddingTop: '10px', paddingBottom: '10px'}}>
                        <div className='col-md-12' style={{marginBottom: '10px'}}>
                            <label style={{paddingLeft: '0'}}>A.14{' '}What strategies does your cohort use to engage participants? </label>
                        </div>
                        {(cohort.strategyRoutine || cohort.strategyMailing || cohort.strategyAggregateStudy || cohort.strategyIndividualStudy || cohort.strategyInvitation || cohort.strategyOther) ? delete errors.strategy : <div className='col-md-12'><span style={{color: 'red', display:displayStyle}}>{errors.strategy = 'Please select one'}</span></div>}
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyRoutine' checked={cohort.strategyRoutine} onChange={() => dispatch(allactions.cohortActions.setStrategyRoutine())}  /></span>
                            <span style={{lineHeight: '1.4em'}}>Nothing beyond mailing questionnaires or other routine contacts </span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyMailing' checked={cohort.strategyMailing} onChange={() => dispatch(allactions.cohortActions.setStrategyMailing())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Send newsletters or other general mailings (e.g., birthday cards)</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyAggregateStudy' checked={cohort.strategyAggregateStudy} onChange={() => dispatch(allactions.cohortActions.setStrategyAggregateStudy())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Return aggregate study results (e.g., recent findings)  </span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyIndividualStudy' checked={cohort.strategyIndividualStudy} onChange={() => dispatch(allactions.cohortActions.setStrategyIndividualStudy())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Individual study results (e.g., nutrient values)</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyInvitation' checked={cohort.strategyInvitation} onChange={() => dispatch(allactions.cohortActions.setStrategyInvitation())} /></span>
                            <span style={{lineHeight: '1.4em'}}>Invite participation on research committees</span>
                        </div>
                        <div>
                            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyOther' checked={cohort.strategyOther} onChange={() => dispatch(allactions.cohortActions.setStrategyOther())} /></span>
                            <span className='col-md-1' style={{lineHeight: '1.4em', padding: '0', margin: '0'}}>Other</span>
                            {
                                cohort.strategyOther ? 
                                <span className='col-md-5' style={{margin: '0'}}><input className='form-control' name='strategyOtherSpecify' value={cohort.strategyOtherSpecify} onChange= {e=> dispatch(allactions.cohortActions.setStrategyOtherSepcify(e.target.value))}/></span> : ''
                            }
                        </div>
                    </div>
                    <div id='question15' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        <div className='col-md-12' style={{marginBottom: '10px'}}>
                            <label style={{paddingLeft: '0'}}>A.15 {' '} As indicated on the CEDCD Approval Form, we are requesting the following items for inclusion on the CEDCD website. If you provided approval to post this information, please attach the documents and return them with this form. If they are already available on a publicly accessible website, please just provide the website address.</label>
                        </div>
                        <div className='col-md-12'>
                            <table className='table table-stripe table-responsive table-borderless'>
                                <thead>
                                    <tr>
                                        <th style={{textAlign: 'center'}}>Document</th>
                                        <th style={{textAlign: 'center'}}>Attached</th>
                                        <th style={{textAlign: 'center'}}>Website URL (if document is not attached)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                       <td>Questionnaires</td> 
                                       <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type='checkbox' name='questionnaireFile' checked={cohort.questionnaireFile} onChange={() => {dispatch(allactions.cohortActions.setQuestionnaireFile())}} /></td>
                                       <td><input className='inputWriter' name='questionnaireUrl' id='questionnaireUrl' disabled={cohort.questionnaireFile} /></td>
                                    </tr>
                                    <tr>
                                       <td>Main cohort protocol</td> 
                                       <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type='checkbox' name='mainCohortFile' checked={cohort.mainCohortFile} onChange={() => dispatch(allactions.cohortActions.setMainCohortFile())} /></td>
                                       <td><input className='inputWriter' name='mainCohortUrl' id='mainCohortUrl' disabled={cohort.mainCohortFile} /></td>
                                    </tr>
                                    <tr>
                                       <td>Data sharing policy</td> 
                                       <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type='checkbox' name='dataFile'  checked={cohort.dataFile} onChange={() => dispatch(allactions.cohortActions.setDataFile())} /></td>
                                       <td><input className='inputWriter' name='dataUrl' id='dataUrl' disabled={cohort.dataFile} /></td>
                                    </tr>
                                    <tr>
                                       <td>Biospecimen sharing policy</td> 
                                       <td style={{textAlign: 'center'}}><input type='checkbox' name='specimenFile' checked={cohort.specimenFile} onChange={() => dispatch(allactions.cohortActions.setSpecimenFile())} /></td>
                                       <td><input className='inputWriter' name='specimenUrl' id='specimenUrl' disabled={cohort.specimenFile} /></td>
                                    </tr>
                                    <tr>
                                       <td>Publication(authorship) policy</td> 
                                       <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type='checkbox' name='publicationFile' checked={cohort.publicationFile} onChange={() => dispatch(allactions.cohortActions.setPublicationFile())} /></td>
                                       <td><input className='inputWriter' name='publicationUrl' id='publicationUrl' disabled={cohort.publicationFile} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </form>
            </div> 
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <span onClick={handleSave}>
                    <input type='button' className='btn btn-primary' value='Save' />
                </span>
                <span onClick={handleSaveContinue}>
                    <input type='button' className='btn btn-primary' value='Save & Continue' />
                </span>
            </div>  
        </div>
  </div>
}

export default CohortForm