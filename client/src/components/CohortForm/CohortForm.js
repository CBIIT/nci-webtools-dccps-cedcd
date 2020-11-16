import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch, batch} from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Person from '../Person/Person'
import Investigator from '../Investigator/Investigator'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './CohortForm.css'

const CohortForm = ({...props}) => {
    const cohort = useSelector(state => state.cohortReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch()

    const errorMsg = 'please provide a value'
    
    const [errors, setErrors] = useState({
        cohortName: errorMsg,
        completionDate: errorMsg,
        contacterRight: 'please choose one',
        collectedOtherSpecify: 'please specify',
        completerName: errorMsg,
        completerPosition: errorMsg,
        completerEmail: errorMsg,
        contacterName: errorMsg,
        contacterPosition: errorMsg,
        contacterEmail: errorMsg,
        collaboratorName: errorMsg,
        collaboratorPosition: errorMsg,
        collaboratorEmail: errorMsg,
        eligibleGender: 'please select one',
        enrollOnGoing: 'please select one',
        enrollTotal: errorMsg,
        enrollStartYear: errorMsg,
        enrollEndYear: errorMsg,
        enrollOnGoing: 'please select one',
        numOfPlans: 'please specify',
        yearToComplete: 'please specify',
        baseLineMinAge: 'please specify',
        baseLineMaxAge: errorMsg,
        baseLineMeanAge: errorMsg,
        baseLineMedianAge: errorMsg,
        currentMinAge: 'please specify',
        currentMaxAge: errorMsg,
        currentMeanAge: errorMsg,
        currentMedianAge: errorMsg,
        timeInterval: errorMsg,
        mostRecentYear: errorMsg,
        dataCollection: 'please select at least one value',
        requirements: 'please select at least one value', 
        strategy: 'please select at least one value', 
        collectedOtherSpecify: 'please specify', 
        restrictOtherSpecify: 'please specify', 
        strategyOtherSpecify: 'please specify', 
        questionnaire: false, 
        main: false, 
        data: false, 
        specimen: false, 
        publication: false
    })

    const [displayStyle, setDisplay] = useState('none')
    const [activePanel, setActivePanel] = useState('panelA')

    useEffect(() => {
        if(!cohort.hasLoaded){
            let shadow = {...errors}
            fetch('/api/questionnaire/cohort_basic_info/13', {
                method: 'POST'
            }).then(res => res.json())
            .then(result => {
                let cohort = result.data.cohort, changed = false, investigators = result.data.investigators, startChange = false,
                    completer = result.data.completer, contacter = result.data.contacter, collaborator = result.data.collaborator
                for(let i=0; i < investigators.length; i++){
                    shadow['investigator_name_'+i] = errorMsg
                    shadow['investigator_inst_'+i] = errorMsg
                    shadow['investigator_email_'+i] = errorMsg
                    startChange = true
                }
                if(startChange) setErrors(shadow)
                batch(() =>{
                    for(let k of Object.keys(cohort)){
                        dispatch(allactions.cohortActions[k](cohort[k]))
                    }
                    
                    for(let k of Object.keys(completer)){
                        dispatch(allactions.cohortActions[k](completer[k]))
                    }
                    for(let k of Object.keys(contacter)){
                        dispatch(allactions.cohortActions[k](contacter[k]))
                    }
                    for(let k of Object.keys(collaborator)){
                        dispatch(allactions.cohortActions[k](collaborator[k]))
                    }
                    for(let k of result.data.sectionStatus){
                        dispatch(allactions.sectionActions.setSectionStatus(k.page_code, k.section_status))
                    }
                    dispatch(allactions.cohortActions.setInvestigators(investigators))
                    dispatch(allactions.cohortActions.setHasLoaded(true))
                }) 
                
                if(cohort.cohort_name) {delete shadow.cohortName; changed=true}
                if(cohort.completionDate) {delete shadow.completionDate; changed = true}
                if(cohort.clarification_contact in [0,1]) {delete shadow.contacterRight; changed=true}
                if(cohort.data_collected_other !== 1) {delete shadow.collectedOtherSpecify; changed=true}
                if(cohort.restrictOther !== 1) {delete shadow.restrictOtherSpecify; changed=true}
                if(cohort.enrollment_total) {delete shadow.enrollTotal; changed=true}
                if(cohort.enrollment_year_start) {delete shadow.enrollStartYear; changed=true}
                if(cohort.enrollment_year_end) {delete shadow.enrollEndYear; changed=true}
                if(cohort.enrollment_ongoing in [0, 1]) {delete shadow.enrollOnGoing; changed=true}
                if(cohort.enrollment_ongoing === 0) { delete shadow.numOfPlans; delete shadow.yearToComplete; changed=true }
                if(cohort.enrollment_age_min) {delete shadow.baseLineMinAge; changed=true}
                if(cohort.enrollment_age_max) {delete shadow.baseLineMaxAge; changed=true}
                if(cohort.enrollment_age_mean) {delete shadow.baseLineMeanAge; changed=true}
                if(cohort.enrollment_age_median) {delete shadow.baseLineMedianAge; changed=true}
                if(cohort.current_age_min) {delete shadow.currentMinAge; changed=true}
                if(cohort.current_age_max) {delete shadow.currentMaxAge; changed=true}
                if(cohort.current_age_mean) {delete shadow.currentMeanAge; changed=true}
                if(cohort.current_age_median) {delete shadow.currentMedianAge; changed=true}
                if(cohort.time_interval) {delete shadow.timeInterval; changed=true}
                if(cohort.most_recent_year) {delete shadow.mostRecentYear; changed = true}
                if(cohort.strategy_other !== 1) {delete shadow.strategyOtherSpecify; changed=true}
                if(cohort.eligible_gender_id in [4, 2, 1]) {delete shadow.eligibleGender; changed=true}
                if(cohort.data_collected_in_person || cohort.data_collected_phone || cohort.data_collected_paper || cohort.data_collected_web || cohort.data_collected_other) {delete shadow.dataCollection; changed=true}
                if(cohort.requireNone || cohort.requirecollab || cohort.requireIrb || cohort.requireData || cohort.restrictGenoInfo || cohort.restrictOtherDb || cohort.restrictCommercial || cohort.restrictOther) {delete shadow.requirements; changed=true}
                if(cohort.strategy_routine || cohort.strategy_mailing || cohort.strategy_aggregate_study || cohort.strategy_individual_study || cohort.strategy_invitation || cohort.strategy_other) {delete shadow.strategy; changed=true}
                //just need to remove the first investigator error on load, since only investigator 0 has errors initially
                if(completer.completerName) {delete shadow.completerName; changed=true}
                if(completer.completerPosition) {delete shadow.completerPosition; changed=true}
                if(completer.completerEmail) {delete shadow.completerEmail; changed=true}
                if(contacter.contacterName) {delete shadow.contacterName; changed=true}
                if(contacter.contacterPosition) {delete shadow.contacterPosition; changed=true}
                if(contacter.contacterEmail) {delete shadow.contacterEmail; changed=true}

                if(collaborator.collaboratorName) {delete shadow.collaboratorName; changed=true}
                if(collaborator.collaboratorPosition) {delete shadow.collaboratorPosition; changed=true}
                if(collaborator.collaboratorEmail) {delete shadow.collaboratorEmail; changed=true}

                for(let i=0; i < investigators.length; i++){
                    if(investigators[i].name){delete shadow['investigator_name_'+i]; changed=true}
                    if(investigators[i].institution){delete shadow['investigator_inst_'+i]; changed=true}
                    if(investigators[i].email){delete shadow['investigator_email_'+i]; changed=true}
                }
                
                if(changed) setErrors(shadow)
                
            })
        }
    }, [])

    const saveCohort = (id=13, proceed=false) => {
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
                    if(Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('A', 'complete'))
                    else{
                        dispatch(allactions.sectionActions.setSectionStatus('A', 'incomplete'))
                    }

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
        let shadow = {...errors}
        let changed = false
        if(!(cohort.questionnaireFileName || cohort.questionnaireUrl))
        {shadow.questionnaire = true; changed = true}
        if(!(cohort.mainFileName || cohort.mainCohortUrl))
        {shadow.main = true; changed = true}
        if(!(cohort.specimenFileName || cohort.specimenUrl))
        {shadow.specimen = true; changed = true}
        if(!(cohort.dataFileName || cohort.dataUrl))
        {shadow.data = true; changed = true}
        if(!(cohort.publicationFileName || cohort.publicationUrl))
        {shadow.publication = true; changed = true}
        if(changed) setErrors(shadow)

        if(Object.entries(errors).length === 0){
            cohort.sectionAStatus='complete'
            dispatch(allactions.cohortActions.setSectionAStatus('complete'))
            saveCohort(13)
        }
        else{
            setDisplay('block')
            if(window.confirm('there are validation errors, are you sure to save?')){
                cohort.sectionAStatus='incomplete'
                dispatch(allactions.cohortActions.setSectionAStatus('incomplete'))
                console.log(cohort.sectionAStatus)
                saveCohort(13)
            }
        }
    }

    const handleSaveContinue = () => {
        if(Object.entries(errors).length === 0){
            cohort.sectionAStatus='complete'
            dispatch(allactions.cohortActions.setSectionAStatus('complete'))
            saveCohort(13, true)
        }
        else{
            if(window.confirm('there are validation errors, are you sure to save?')){
                cohort.sectionAStatus='incomplete'
                dispatch(allactions.cohortActions.setSectionAStatus('incomplete'))
                saveCohort(13, true)
            }
        }
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
            //if(errors['baseLineMaxAge']) delete shadow['baseLineMaxAge']
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
            //if(errors['baseLineMinAge']) delete shadow['baseLineMinAge']
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
            //if(errors['currentMaxAge']) delete shadow['currentMaxAge']
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
            //if(errors['currentMinAge']) delete shadow['curentMinAge']
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
            case 'phone':
                return validator.phoneValidator(value)
            case 'date': 
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            case 'url': 
                return validator.urlValidator(value)
            case 'email':
                return validator.emailValidator(value)
            default: 
                return validator.stringValidator(value, requiredOrNot)
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

    const updateWebSiteError =(errorToAdd, errorToRemove, dispatchname, v) => {
        dispatch(allactions.cohortActions[dispatchname](v))
        let changed = false
        let shadow = {...errors}
        for(let e of errorToRemove){
            if(errors[e]){
                delete shadow[e]
                changed = true
            }
        }
        if(errorToAdd && !errors[errorToAdd]){
            shadow[errorToAdd] = 'please provide a value'
            changed = true
        }
        if(changed) setErrors(shadow)
    }

    const removeInvestigator = (idx) => {
        dispatch(allactions.cohortActions.removeInvestigator(idx))
        //remove investigator also remove the errors
        let changed = false, shadow = {...errors}
        if(errors['investigator_name_'+idx]) {delete shadow['investigator_name_'+idx]; changed=true}
        if(errors['investigator_inst_'+idx]) {delete shadow['investigator_inst_'+idx]; changed=true}
        if(errors['investigator_email_'+idx]) {delete shadow['investigator_email_'+idx]; changed=true}
        if(changed) setErrors(shadow)
    }

    const removeEligbleGenderError = (v) => {
        if(errors.eligibleGender){
            let shadow = {...errors}
            delete shadow['eligibleGender'] 
            setErrors(shadow) 
        }
        dispatch(allactions.cohortActions.eligible_gender_id(v))
    }

    const updateErrors = (event, errorname, allfields=[], dispatchname='', otherFieldName='', furtherProcessing= false) => {
        dispatch(allactions.cohortActions[dispatchname](event.target.checked ? 1 : 0));
        let currentState = false
        for (let f of allfields) currentState = currentState || cohort[f] 
        currentState = currentState || event.target.checked
        let changed = false
        let shadow = {...errors}
        if(currentState){//if any of the checkboxes is checked remove error
            if(errors[errorname]){
                delete shadow[errorname]
                changed = true
            }
        }else{// if none of them is checked
            if(!errors[errorname]){
                shadow[errorname] = 'please select at lease one value'
                changed = true
            }
        }

        if(furtherProcessing){
            if(!event.target.checked){
                if(errors[otherFieldName]){
                    delete shadow[otherFieldName]
                    changed = true
                }
            }else{
                if(!errors[otherFieldName]){
                    shadow[otherFieldName] = 'please provide a value'
                    changed = true
                }
            }
        }

        if(changed) setErrors(shadow)
    }

    function setCollaborator(e, n,p,tel,eml, checkedValue){
        let name = e.target.checked ? n : ''
        let position = e.target.checked ? p : ''
        let phone = e.target.checked ? tel : ''
        let email = e.target.checked ? eml : ''

        dispatch(allactions.cohortActions.collaboratorName(name))
        dispatch(allactions.cohortActions.collaboratorPosition(position))
        dispatch(allactions.cohortActions.collaboratorPhone(phone))
        dispatch(allactions.cohortActions.collaboratorEmail(email))
        dispatch(allactions.cohortActions.sameAsSomeone(checkedValue))
        
    }

    const handleUpload = (fileData, category) => {
        if(fileData.name){    
            const formData = new FormData(); 
            formData.append( 
                'cohortFile', 
                fileData, 
                fileData.name 
            ); 
            fetch(`/api/questionnaire/upload/13/${category}`,{
                method: "POST",
                body: formData
            }).then(res => res.json())
            .then((result) => {
                if(result.status === 200){
                }
            })
        }
    }

    return <div id='cohortContainer' className='col-md-12'>
        <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>           
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts
            </div>
            <div>
                <form id='currentForm'>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}><span>Cohort Information</span></div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'}>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortName' className='col-md-4'>A.1a Cohort Name<span style={{color: 'red'}}>*</span></label>
                            <span className='col-md-5'>
                                <input className='form-control' name='cohortName' value={cohort.name} onChange={e => dispatch(allactions.cohortActions.cohort_name(e.target.value))} onBlur={(e) => {populateErrors('cohortName', e.target.value, true, 'string')}}/>
                            </span>
                            {errors.cohortName && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.cohortName}</span> }
                        </div>
                        <div className='form-group col-md-12'>
                            <label htmlFor='cohortAcronym' className='col-md-4'>A.1b Cohort Abbreviation</label>
                            <span className='col-md-5'>
                                <span  style={{paddingLeft: '10px'}}>{cohort.acronym}</span>
                            </span>
                        </div>
                        <div id='question7' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '5px'}}>
                                <label style={{paddingLeft: '0'}}>A.7{' '}Cohort Description: Please provide a short paragraph describing your cohort. This will be used as an overall narrative description of your cohort on the CEDCD website.  You may provide a link to a description on your cohort’s website.</label>
                            </div>
                            <div>
                                <span className='col-md-12'><textarea className='form-control' name='cohortDes' cols='20' rows='10' style={{resize: 'none', fontFamily: '"PT Sans", Arial, sans-serif', fontSize: '16px'}} value={cohort.description} onChange={e => dispatch(allactions.cohortActions.cohort_description(e.target.value))} /></span>
                            </div>
                        </div>
                        <div id='question6' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12'>
                                <label className='col-md-6' style={{paddingLeft: '0'}}>A.6{' '}Does the cohort have a website ? Please specify if applicable</label>
                                <span className='col-md-3' style={{marginLeft: '0', paddingLeft:'0', paddingRight: '0'}}>
                                    <span className='col-md-12' style={{margin: '0', padding: '0'}}><input className='form-control' name='websiteurl' value={cohort.webSite} onChange={e => dispatch(allactions.cohortActions.cohort_web_site(e.target.value))} onBlur={(e) => {populateErrors('websiteurl', e.target.value, true, 'string')}}/>
                                    </span>
                                    {errors.websiteurl && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.websiteurl}</span>}
                                </span> 
                            </div>
                        </div>
                        <div className='form-group col-md-12'>
                            <div className='col-md-12'>
                                <label className='col-md-6' style={{paddingLeft: '0'}}>A.2 Date Form Completed<span style={{color: 'red'}}>*</span></label>
                                <span className='col-md-3' style={{marginLeft: '0', paddingLeft:'0', paddingRight: '0'}}>
                                   
                                    <span className='col-md-12' style={{padding: '0'}}><DatePicker className='form-control' selected={cohort.completionDate ? new Date(cohort.completionDate) : null} onChange={date => {dispatch(allactions.cohortActions.completionDate(date)); if(!date){setErrors({...errors, completionDate: 'please provide a value'})}else{
                                        let shadow = {...errors}; if(shadow.completionDate) delete shadow.completionDate; setErrors(shadow)
                                    }}} /></span> 
                                </span>
                                <span>{errors.completionDate ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.completionDate}</span> : ''}</span>
                            </div>
                        </div>
                        <div id='question3' className='col-md-12' style={{display: 'flex', flexDirection: 'column', paddingBottom: '10px'}}>
                            <div id='a3a' className='col-md-8' style={{paddingLeft: '0', marginBottom: '25px'}}>
                                <div className='col-xs-12' style={{marginBottom: '5px'}}><b>A.3a{' '}Person who completed the form:</b><span style={{color: 'red'}}>*</span></div>
                                <Person id='completerInfo' name='completerName' position='completerPosition' phone='completerPhone' email='completerEmail' colWidth='12' callback={setErrors} errors={errors} displayStyle={displayStyle} />
                            </div>
                            <div id='a3b' className='col-md-12'>
                                <div style={{marginBottom: '5px'}}><b>A.3b{' '}Contact Person for Clarification of this form</b><span style={{color: 'red'}}>*</span></div>
                                <div style={{marginBottom: '40px'}}> 
                                    <span className='col-md-6' style={{marginRight: '0'}}>Is this the person to contact with questions about this form?</span>
                                    <span className='col-md-1' style={{paddingLeft: '0', marginLeft: '0'}}><input type='radio' name='contacterRight' checked={cohort.contacterRight === 0} onClick={() => dispatch(allactions.cohortActions.clarification_contact(0))} />{' '}No</span>
                                    <span className='col-md-1' style={{paddingLeft: '0'}}><input type='radio' name='contacterRight' checked={cohort.contacterRight === 1} onClick={() => dispatch(allactions.cohortActions.clarification_contact(1))} />{' '}Yes</span>
                                    {errors.contacterRight && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.contacterRight}</span>}
                                </div>
                                <div id='contacterInfo' className='col-sm-8' style={{paddingLeft: '0'}}>
                                    {
                                        cohort.contacterRight === 0 ? 
                                        <Person name='contacterName' position='contacterPosition' phone='contacterPhone' email='contacterEmail' colWidth='12' callback={setErrors} errors={errors}  displayStyle={displayStyle} leftPadding='0' /> : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}><span>Principal Investigators</span></div>
                    <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'}>
                        <div id='question4' className='col-md-12' style={{paddingTop: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label className='col-md-6'  style={{paddingLeft: '0'}}>A.4{' '} Cohort Principal Investigator(s)</label>
                                <span className='col-md-4' style={{position: 'relative'}}><button className='btn btn-primary btn-sm' onClick={(e) => {e.preventDefault(); dispatch(allactions.cohortActions.addInvestigator()); let shadow={...errors}, idx=cohort.investigators.length; shadow['investigator_name_'+idx]=errorMsg; shadow['investigator_inst_'+idx]=errorMsg; shadow['investigator_email_'+idx]=errorMsg; setErrors(shadow)}} style={{position: 'absolute', right: 0}}>Add New Investigator</button></span>
                            </div>
                            <div className='col-md-12' style={{paddingLeft: '0'}}>
                                {
                                    cohort.investigators.map((item, idx) => <div className='col-md-12'><Investigator key={idx} id={'investigator_'+idx} name={'investigator_name_'+idx} institution={'investigator_inst_'+idx} email={'investigator_email_'+idx} isRequired={idx === 0 ? true : false} callback={setErrors} handleRemove={removeInvestigator} errors={errors} investigator={item}  displayStyle={displayStyle}/></div>
                                    )
                                }
                            </div>
                        </div>
                        <div id='question5' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.5{' '}If an investigator is interested in collaborating with your cohort on a new project, whom should they contact?</label>
                            </div>
                            <Person id='collaborator' name='collaboratorName' position='collaboratorPosition' phone='collaboratorPhone' email='collaboratorEmail' colWidth='6' callback={setErrors} errors={errors} displayStyle={displayStyle} />
                            <div className='col-md-6' style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{marginBottom: '40px'}}>
                                    <input type='radio' name='sameAsSomeone' value='0' checked={cohort.sameAsSomeone == 0}  onChange={(e) =>setCollaborator(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, '0')}/>{' '}
                                    <span htmlFor='sameAsSomeone'>same as the person who completed the questionnaire </span>
                                </div>
                                { 
                                    cohort.contacterRight === 0 ? 
                                    <div>
                                        <input type='radio' name='sameAsSomeone' value='1' checked={cohort.sameAsSomeone == 1}  onChange={(e) =>setCollaborator(e, cohort.contacterName, cohort.contacterPosition, cohort.contacterPhone, cohort.contacterEmail, '1')}/>{' '}
                                        <span htmlFor='sameAsSomeone'>{' '} same as contact person </span>
                                    </div> : ''
                                }
                            </div>                        
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}><span>Eligibility  & Enrollment</span></div>
                    <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'}>
                        <div id='question8' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'column'}}>
                            <div className='col-md-12' style={{marginBottom: '5px'}}>
                                <label>A.8{' '}Eligibility Criteria<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <div>
                                <div className='col-md-12' style={{marginBottom: '15px'}}>
                                    <span className='col-md-2' style={{paddingLeft: '0'}}>Eligible gender</span>
                                    <span className='col-md-2' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='4' checked={cohort.eligibleGender === 4} onChange={() => removeEligbleGenderError(4)} />{' '} Both genders
                                    </span>
                                    <span className='col-md-2' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='2' checked={cohort.eligibleGender === 2} onChange={() => removeEligbleGenderError(2)} />{' '} Males only
                                    </span>
                                    <span className='col-md-2' style={{marginRight: '0'}}>
                                        <input type='radio' name='eligibleGender'  value='1' checked={cohort.eligibleGender === 1} onChange={() => removeEligbleGenderError(1)} />{' '} Females only
                                    </span>
                                    {errors.eligibleGender ? <span className='col-sm-3' style={{color: 'red', display: displayStyle}}>{errors.eligibleGender}</span> : ''}
                                </div>
                                <div className='col-md-12' style={{marginBottom: '10px'}}>
                                    <div style={{paddingLeft: '0', marginBottom: '5px'}}>Baseline population consists of<span style={{color: 'red'}}>*</span></div>
                                    <div className='col-md-12'>
                                        <input type='checkbox' name='cancerSurvivors' checked={cohort.hasCancerSite} onChange={() => dispatch(allactions.cohortActions.eligible_disease())} />{' '} Cancer survivors only, specify cancer site(s)
                                    </div>
                                    <div className='col-md-6' style={{marginBottom: '20px'}}>
                                        <input name='cancerSites' className='form-control' value={cohort.cancerSites} maxlength='100' placeholder='no more than 100 characters' disabled={!cohort.hasCancerSite} onChange={e => dispatch(allactions.cohortActions.eligible_disease_cancer_specify(e.target.value))} />
                                    </div>
                                    <div className='col-md-12'  style={{paddingLeft: '0', paddingRight: '0'}}>
                                        <div style={{marginBottom: '5px'}}>Please specify any eligibility criteria in addition to age and sex</div>
                                        <div className='col-md-6' style={{paddingLeft: '0', paddingRight: '0'}}>
                                            <span className='col-md-12'>
                                                <input className='form-control' name='otherCriteria' value={cohort.eligibilityCriteriaOther} onChange={e => dispatch(allactions.cohortActions.eligible_disease_other_specify(e.target.value))} />
                                            </span>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div id='question9' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12'>
                                <label style={{paddingLeft: '0'}}>A.9{' '}Enrollment Information</label>
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-6' style={{lineHeight: '2em'}}>
                                    Totoal number of subjects enrolled to date<span style={{color: 'red'}}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='enrollTotal' value={cohort.enrolledTotal} onChange={e => dispatch(allactions.cohortActions.enrollment_total(e.target.value))} onBlur={(e) => {populateErrors('enrollTotal', e.target.value, true, 'number')}}/>
                                </span>
                                {errors.enrollTotal && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.enrollTotal}</span>}
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <span className='col-md-6' style={{lineHeight: '2em'}}> Started in year<span style={{color: 'red'}}>*</span></span>
                                <span className='col-md-2'><input className='form-control' name='enrollStartYear' placeholder='yyyy' value={cohort.enrollStartYear} onChange={e => dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))} onBlur={(e) => {populateErrors('enrollStartYear', e.target.value, true, 'year')}} /></span> 
                                {errors.enrollStartYear ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.enrollStartYear}</span> : ''}
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0', marginBottom: '8px'}}>
                                <span className='col-md-6'  style={{lineHeight: '2em'}}> Ended in year<span style={{color: 'red'}}>*</span></span>
                                <span className='col-md-2'><input className='form-control' name='enroll
                                EndYear' placeholder='yyyy' value={cohort.enrollEndYear} onChange={e => dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))} onBlur={(e) => {populateErrors('enrollEndYear', e.target.value, true, 'year')}} /></span>
                                {errors.enrollEndYear ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.enrollEndYear}</span>:  ''}
                            </div>
                            <div className='col-md-12' style={{marginBottom: '8px'}}>
                                <span  className='col-md-6' style={{paddingLeft: '0'}}>Is enrollment ongoing?<span style={{color: 'red'}}>*</span></span>
                                <span className='col-md-1'><input type='radio' name='enrollmentCurrent' value='0' checked={cohort.enrollOnGoing === 0} onChange={e => {
                                        dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                        let shadow={...errors}, changed = false
                                        if(errors.enrollOnGoing) {delete shadow.enrollOnGoing; changed = true}
                                        if(errors.numOfPlans)  {delete shadow.numOfPlans; changed = true}
                                        if(errors.yearToComplete)  {delete shadow.yearToComplete; changed = true}
                                        if(changed) setErrors(shadow)
                                    }} /> No</span>
                                <span className='col-md-1'><input type='radio' name='enrollmentCurrent' value='1' checked={cohort.enrollOnGoing === 1} onChange={e => {
                                    dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                    let shadow={...errors}, changed = false
                                    if(errors.enrollOnGoing) {delete shadow.enrollOnGoing; changed = true}
                                    if(!errors.numOfPlans)  {shadow.numOfPlans = 'please specify'; changed = true}
                                    if(!errors.yearToComplete)  {shadow.yearToComplete='please specify'; changed = true}
                                    if(changed) setErrors(shadow)
                                }} /> Yes</span>
                                {errors.enrollOnGoing && <span className='col-md-2' style={{color: 'red', paddingLeft: '10px', display: displayStyle}}>{errors.enrollOnGoing}</span>}
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-6' style={{lineHeight: '2em'}}>
                                    If still enrolling, please specify the target number of plan to enroll<span style={{color: 'red'}}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='targetNumber' value={cohort.numOfPlans} onChange={e => dispatch(allactions.cohortActions.enrollment_target(e.target.value))} onBlur={(e) => {populateErrors('numOfPlans', e.target.value, true, 'number')}}/>
                                </span>
                                {errors.numOfPlans && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.numOfPlans}</span>}
                            </div>
                            <div  className='col-md-12' style={{paddingLeft: '0'}}>
                                <span className='col-md-6' style={{lineHeight: '2em'}}>
                                    If still enrolling, please specify when you plan to complete enrollment<span style={{color: 'red'}}>*</span>
                                </span>
                                <span className='col-md-2'>
                                    <input className='form-control' name='yearToComplete' placeholder='yyyy' value={cohort.yearToComplete} onChange={e => dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))}  onBlur={(e) => {populateErrors('yearToComplete', e.target.value, true, 'year')}}/>
                                </span> 
                                {errors.yearToComplete && <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.yearToComplete}</span>}                              
                            </div>
                            
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Baseline age range of enrolled subjects<span style={{color: 'red'}}>*</span></span>
                                    <span className='col-md-2'>
                                       <input className='form-control' name='baseLineMinAge' value={cohort.baseLineMinAge} onChange={e=>dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))} onBlur={(e) => {populateBaseLineMinAgeError(e.target.value, true, cohort.baseLineMaxAge)}} />
                                    </span> 
                                    <span className='col-md-1' style={{lineHeight: '2em', padding: '0', margin: '0', width: '15px'}}> to </span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMaxAge' value={cohort.baseLineMaxAge} onChange={e=>dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))} onBlur={(e) => {populateBaseLineMaxAgeError(e.target.value, true, cohort.baseLineMinAge)}} /></span>
                                </div>
                                <div className='col-md-12'>
                                    {errors.baseLineMinAge ? <span className='col-md-offset-6 col-md-2' style={{color: 'red', display: displayStyle}}>{errors.baseLineMinAge}</span> : ''}
                                    {errors.baseLineMaxAge ? errors.baseLineMinAge ? <span className='col-md-3' style={{color: 'red', paddingLeft: '20px', display: displayStyle}}>{errors.baseLineMaxAge}</span>: <span className='col-md-offset-8 col-md-3' style={{color: 'red', paddingLeft: '20px', display: displayStyle}}>{errors.baseLineMaxAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Median age<span style={{color: 'red'}}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMedian' value={cohort.baseLineMedianAge} onChange={e=>dispatch(allactions.cohortActions.enrollment_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('baseLineMedianAge', e.target.value, true, cohort.baseLineMinAge, cohort.baseLineMaxAge)} /></span> 
                                    {errors.baseLineMedianAge ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.baseLineMedianAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-6'  style={{lineHeight: '2em'}}> Mean age<span style={{color: 'red'}}>*</span> </span>
                                    <span className='col-md-2'><input className='form-control' name='baseLineMean' value={cohort.baseLineMeanAge} onChange={e=>dispatch(allactions.cohortActions.enrollment_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('baseLineMeanAge', e.target.value, true, cohort.baseLineMinAge, cohort.baseLineMaxAge)}/></span>
                                    {errors.baseLineMeanAge ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.baseLineMeanAge}</span> : ''}
                                </div>
                            </div>
                            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Current age range of enrolled subjects<span style={{color: 'red'}}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='currentMinAge' value={cohort.currentMinAge} onChange={e=>dispatch(allactions.cohortActions.current_age_min(e.target.value))} onBlur={e => populateCurrentMinAgeError(e.target.value, true, cohort.currentMaxAge)}/></span> 
                                    <span className='col-md-1' style={{lineHeight: '2em', padding: '0', margin: '0', width: '15px'}}> to </span>
                                    <span className='col-md-2'><input className='form-control' name='currentMaxAge' value={cohort.currentMaxAge} onChange={e=>dispatch(allactions.cohortActions.current_age_max(e.target.value))} onBlur={e => populateCurrentMaxAgeError(e.target.value, true, cohort.currentMinAge)}/></span>
                                </div>
                                <div className='col-md-12'>
                                    {errors.currentMinAge ? <span className='col-md-offset-6 col-md-2' style={{color: 'red', display: displayStyle}}>{errors.currentMinAge}</span> : ''}
                                    {errors.currentMaxAge ? errors.currentMinAge ? <span className='col-md-3' style={{color: 'red', paddingLeft: '20px', display: displayStyle}}>{errors.currentMaxAge}</span>: <span className='col-md-offset-8 col-md-3' style={{color: 'red', paddingLeft: '20px', display: displayStyle}}>{errors.currentMaxAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-6' style={{lineHeight: '2em'}}>Median age<span style={{color: 'red'}}>*</span></span>
                                    <span className='col-md-2'><input className='form-control' name='currentMedian' value={cohort.currentMedianAge} onChange={e=>dispatch(allactions.cohortActions.current_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('currentMedianAge', e.target.value, true, cohort.currentMinAge, cohort.currentMaxAge)}/></span> 
                                    {errors.currentMedianAge ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.currentMedianAge}</span> : ''}
                                </div>
                                <div>
                                    <span className='col-md-6'  style={{lineHeight: '2em'}}> Mean age<span style={{color: 'red'}}>*</span> </span>
                                    <span className='col-md-2'><input className='form-control' name='currentMean' value={cohort.currentMeanAge} onChange={e=>dispatch(allactions.cohortActions.current_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('currentMeanAge', e.target.value, true, cohort.currentMinAge, cohort.currentMaxAge)}/></span>
                                    {errors.currentMeanAge ? <span className='col-md-3' style={{color: 'red', display: displayStyle}}>{errors.currentMeanAge}</span> : ''}
                                </div>
                            </div>
                        </div>
                        <div id='question10' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label className='col-md-6' style={{padding: '0', margin: '0'}}>A.10{' '}Specify the frequency of questionnaires, e.g, annually, every 2 years etc.<span style={{color: 'red'}}>*</span></label>
                                <span className='col-md-4' style={{paddingLeft: '8px', paddingRight: '18px', marginLeft: '0'}}><input className='form-control' name='frequency' value={cohort.timeInterval} onChange={e=>dispatch(allactions.cohortActions.time_interval(e.target.value))}  onBlur={(e) => {populateErrors('timeInterval', e.target.value, true, 'string')}}/></span>
                                {errors.timeInterval ? <span className='col-md-3'  style={{color: 'red', display: displayStyle}}>{errors.timeInterval}</span> : ''}
                            </div>       
                        </div>
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}><span>Requirements & Strategies</span></div>
                    <div className={activePanel === 'panelD' ? 'panel-active' : 'panellet'}>
                        <div id='question11' className='col-md-12' style={{paddingTop: '10px'}}>
                            <div className='col-md-12'>
                                <label className='col-md-6' style={{paddingLeft: '0'}}>A.11{' '}Most recent year when questionnaire data were collected<span style={{color: 'red'}}>*</span></label>
                                <span className='col-md-2'><input className='form-control' name='mostRecentYear' value={cohort.mostRecentYear} onChange={e=>dispatch(allactions.cohortActions.most_recent_year(e.target.value))} placeholder='yyyy' onBlur={(e) => {populateErrors('mostRecentYear', e.target.value, true, 'year')}}/></span>
                                {errors.mostRecentYear && <span className='col-md-3'  style={{color: 'red', display: displayStyle}}>{errors.mostRecentYear}</span> }
                            </div>
                        </div>
                        <div id='question12' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px', display: 'flex', flexDirection: 'column'}}>
                            <div className='col-md-12' style={{marginBottom: '5px'}}>
                                <label style={{paddingLeft: '0'}}>A.12{' '}How was information from the questionnaire administered/collected?<span style={{color: 'red'}}>*</span>  (select all that apply) </label>
                                {errors.dataCollection ? <span style={{color: 'red', display:displayStyle}}>{errors.dataCollection}</span> : '' }
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>                                
                                <div>
                                    <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}>
                                        <input type='checkbox' name='collectedInPerson' checked={cohort.collectedInPerson == 1}  onChange={(e)=> updateErrors(e, 'dataCollection', ['collectedPhone', 'collectedPaper', 'collectedWeb', 'collectedOther'], 'data_collected_in_person')} />{' '}
                                    </span> 
                                    <span>In person</span>    
                                </div>
                                <div>
                                    <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}>
                                        <input type='checkbox' name='collectedPhone' checked={cohort.collectedPhone == 1}  onChange={(e) => updateErrors(e, 'dataCollection', ['collectedInPerson', 'collectedPaper', 'collectedWeb', 'collectedOther'], 'data_collected_phone')} />{' '}
                                    </span>
                                    <span>Phone interview</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}>
                                        <input type='checkbox' name='collectedPaper' checked={cohort.collectedPaper == 1}  onChange={(e) => updateErrors(e, 'dataCollection', ['collectedInPerson', 'collectedPhone', 'collectedWeb', 'collectedOther'], 'data_collected_paper')}/>{' '} 
                                    </span>
                                    <span>Self-administered via paper</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}>
                                        <input type='checkbox' name='collectedWeb' checked={cohort.collectedWeb == 1}  onChange={(e) => updateErrors(e, 'dataCollection', ['collectedInPerson', 'collectedPhone', 'collectedPaper', 'collectedOther'], 'data_collected_web')}/>{' '}
                                    </span>
                                    <span>Self-administered via web-based device</span>
                                </div>
                                <div>
                                    <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}>
                                        <input type='checkbox' name='collectedOther' checked={cohort.collectedOther == 1}  onChange={(e) => updateErrors(e,'dataCollection', ['collectedInPerson', 'collectedPhone', 'collectedPaper', 'collectedWeb'], 'data_collected_other', 'collectedOtherSpecify', true)}/>{' '}
                                    </span>
                                    <span className='col-md-1' style={{paddingLeft: '0', marginLeft: '0', marginRight: '0', width: '50px'}}>Other</span> 
                                    {
                                        cohort.collectedOther ? 
                                        <span  className='col-md-4' style={{marginLeft: '0'}}>
                                            <input name='collectedOtherSpecify' className='form-control' value={cohort.collectedOtherSpecify} onChange={e=>{dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value)); populateErrors('collectedOtherSpecify', e.target.value, true, 'string')}}/> 
                                        </span> : ''
                                    }   
                                    {
                                        errors.collectedOtherSpecify && <span className='col-md-4' style={{color: 'red', display: displayStyle}}>{errors.collectedOtherSpecify}</span> 
                                    }                               
                                </div> 
                            </div> 
                        </div>
                        <div id='question13' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '5px'}}>
                                <label style={{paddingLeft: '0'}}>A.13{' '}Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?<span style={{color: 'red'}}>*</span></label>
                            </div>
                            {errors.requirements ? <span style={{color: 'red', paddingLeft: '10px', display:displayStyle}}>{errors.requirements}</span> : '' }
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireNone' checked={cohort.requireNone === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireNone')} /></span>
                                <span style={{lineHeight: '1.4em'}}>None</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireCollab' checked={cohort.requireCollab === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireNone', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireCollab')}/></span>
                                <span style={{lineHeight: '1.4em'}}>Require collaboration with cohort investigattors</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireIrb' checked={cohort.requireIrb === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireNone', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireIrb')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Require IRB approvals</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='requireData' checked={cohort.requireData === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireNone', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireData')}  /></span>
                                <span style={{lineHeight: '1.4em'}}>Require data use agreements and/or materrial transfer agreement</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictGenoInfo' checked={cohort.restrictGenoInfo === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'requireNone', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'restrictGenoInfo')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Restrictions in the consent related to genetic information</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictOtherDb' checked={cohort.restrictOtherDb === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'requireNone', 'restrictCommercial', 'restrictOther'], 'restrictOtherDb')}/></span>
                                <span style={{lineHeight: '1.4em'}}>Restrictions in the consent related to linking to other databases</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictCommercial' checked={cohort.restrictCommercial === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'requireNone', 'restrictOther'], 'restrictCommercial')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Restrictions on commercial use</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='restrictOther' checked={cohort.restrictOther === 1} onChange={(e) => updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'requireNone'], 'restrictOther', 'restrictOtherSpecify', true)} /></span>
                                <span className='col-md-1' style={{lineHeight: '1.4em', padding: '0', margin: '0', width: '50px'}}>Other</span>
                                {
                                    cohort.restrictOther === 1 ? 
                                    <span className='col-md-4' style={{margin: '0'}}><input className='form-control' name='restrictOtherSpecify' value={cohort.restrictOtherSpecify} onChange={e=>{dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value)); populateErrors('restrictOtherSpecify', e.target.value, true, 'string')}}/></span> : ''
                                }
                                {errors.restrictOtherSpecify && <span style={{color: 'red', display: displayStyle}}>{errors.restrictOtherSpecify}</span> }
                            </div>
                        </div>

                        <div id='question14' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '5px'}}>
                                <label style={{paddingLeft: '0'}}>A.14{' '}What strategies does your cohort use to engage participants?<span style={{color: 'red'}}>*</span> </label>
                            </div>
                            {errors.strategy ? <div><span style={{color: 'red', paddingLeft: '10px', display:displayStyle}}>{errors.strategy}</span></div> : ''}
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyRoutine' checked={cohort.strategyRoutine === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyMailing', 'strategyAggregateStudy', 'strategyIndividualStudy', 'strategyInvitation', 'strategyOther'], 'strategy_routine')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Nothing beyond mailing questionnaires or other routine contacts </span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyMailing' checked={cohort.strategyMailing === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyRoutine', 'strategyAggregateStudy', 'strategyIndividualStudy', 'strategyInvitation', 'strategyOther'], 'strategy_mailing')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Send newsletters or other general mailings (e.g., birthday cards)</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyAggregateStudy' checked={cohort.strategyAggregateStudy === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyMailing', 'strategyRoutine', 'strategyIndividualStudy', 'strategyInvitation', 'strategyOther'], 'strategy_aggregate_study')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Return aggregate study results (e.g., recent findings)  </span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyIndividualStudy' checked={cohort.strategyIndividualStudy === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyMailing', 'strategyAggregateStudy', 'strategyRoutine', 'strategyInvitation', 'strategyOther'], 'strategy_individual_study')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Individual study results (e.g., nutrient values)</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyInvitation' checked={cohort.strategyInvitation === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyMailing', 'strategyAggregateStudy', 'strategyIndividualStudy', 'strategyRoutine', 'strategyOther'], 'strategy_invitation')} /></span>
                                <span style={{lineHeight: '1.4em'}}>Invite participation on research committees</span>
                            </div>
                            <div>
                                <span className='col-md-1' style={{paddingRight: '0', marginRight: '0', width: '50px'}}><input type='checkbox' name='strategyOther' checked={cohort.strategyOther === 1} onChange={(e) => updateErrors(e, 'strategy', ['strategyMailing', 'strategyAggregateStudy', 'strategyIndividualStudy', 'strategyInvitation', 'strategyRoutine'], 'strategy_other', 'strategyOtherSpecify', true)} /></span>
                                <span className='col-md-1' style={{lineHeight: '1.4em', padding: '0', margin: '0', width: '50px'}}>Other</span>
                                {
                                    cohort.strategyOther ? 
                                    <span className='col-md-4' style={{margin: '0'}}><input className='form-control' name='strategyOtherSpecify' value={cohort.strategyOtherSpecify} onChange={e => {dispatch(allactions.cohortActions.strategy_other_sepcify(e.target.value)); populateErrors('strategyOtherSpecify', e.target.value, true, 'string')}}/></span> : ''
                                }
                                {errors.strategyOtherSpecify ? <span style={{color: 'red', display: displayStyle}}>{errors.strategyOtherSpecify}</span> : ''}
                            </div>
                        </div>                  
                    </div>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelE' ? '' : 'panelE')}><span>Documents</span></div>
                    <div className={activePanel === 'panelE' ? 'panel-active' : 'panellet'}>
                        <div id='question15' className='col-md-12' style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <div className='col-md-12' style={{marginBottom: '10px'}}>
                                <label style={{paddingLeft: '0'}}>A.15 {' '} As indicated on the CEDCD Approval Form, we are requesting the following items for inclusion on the CEDCD website. If you provided approval to post this information, please attach the documents and return them with this form. If they are already available on a publicly accessible website, please just provide the website address.<span style={{color: 'red'}}>*</span></label>
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
                                        <tr className={errors.questionnaire ? 'errorBackground' : ''}>
                                        <td>Questionnaires</td> 
                                        <td style={{verticalAlign: 'middle'}}>
                                            <input type='file' name='cohortFile'  formEncType='multiple/part' value={cohort.questioinnaireFileName} onChange={e => {handleUpload(e.target.files[0], 1); dispatch(allactions.cohortActions.questionnaire_file(e.target.files[0].name)); if('questionnaire' in errors){let shadow={...errors}; delete shadow.questionnaire; setErrors(shadow)}}} disabled={cohort.questionnaireUrl} />
                                        </td>
                                        <td><input className='inputWriter' name='questionnaireUrl' id='questionnaireUrl' disabled={cohort.questionnaireFileName} value={cohort.questionnaireUrl} onChange={e => {dispatch(allactions.cohortActions.questionnaire_url(e.target.value)); if(errors.questionnaire){let shadow={...errors}; delete shadow.questionnaire; setErrors(shadow)}}} /></td>
                                        </tr>
                                        <tr className={errors.main ? 'errorBackground' : ''}>
                                        <td>Main cohort protocol</td> 
                                        <td style={{verticalAlign: 'middle'}}>
                                                <input type='file' name='cohortFile'  formEncType='multiple/part' onChange={e => {handleUpload(e.target.files[0], 2); dispatch(allactions.cohortActions.main_file(e.target.files[0].name)); if('main' in errors){let shadow={...errors}; delete shadow.main; setErrors(shadow)}}} disabled={cohort.mainCohortUrl}/>
                                        </td>
                                        <td><input className='inputWriter' name='mainCohortUrl' id='mainCohortUrl' disabled={cohort.mainFileName}  value={cohort.mainCohortUrl} onChange={e => {dispatch(allactions.cohortActions.main_cohort_url(e.target.value)); console.log(errors); if(errors.main){let shadow={...errors}; delete shadow.main; setErrors(shadow)}}} /></td>
                                        </tr>
                                        <tr className={errors.data ? 'errorBackground' : ''}>
                                        <td>Data sharing policy</td> 
                                        <td style={{verticalAlign: 'middle'}}><input type='file' name='cohortFile'  formEncType='multiple/part' onChange={e => {handleUpload(e.target.files[0], 3); dispatch(allactions.cohortActions.data_file(e.target.files[0].name)); if('data' in errors){let shadow={...errors}; delete shadow.data; setErrors(shadow)}}}disabled={cohort.dataUrl}/></td>
                                        <td><input className='inputWriter' name='dataUrl' id='dataUrl' disabled={cohort.dataFileName}  value={cohort.dataUrl} onChange={e => {dispatch(allactions.cohortActions.data_url(e.target.value)); if(errors.data){let shadow={...errors}; delete shadow.data; setErrors(shadow)}}} /></td>
                                        </tr>
                                        <tr className={errors.specimen ? 'errorBackground' : ''}>
                                        <td>Biospecimen sharing policy</td> 
                                        <td style={{verticalAlign: 'middle'}}><input type='file' name='cohortFile'  formEncType='multiple/part' onChange={e => {handleUpload(e.target.files[0], 3); dispatch(allactions.cohortActions.specimen_file(e.target.files[0].name)); if('specimen' in errors){let shadow={...errors}; delete shadow.specimen; setErrors(shadow)}}} disabled={cohort.specimenUrl}/></td>
                                        <td><input className='inputWriter' name='specimenUrl' id='specimenUrl' disabled={cohort.specimenFileName}  value={cohort.specimenUrl} onChange={e => {dispatch(allactions.cohortActions.specimen_url(e.target.value)); if(errors.specimen){let shadow={...errors}; delete shadow.specimen; setErrors(shadow)}}} /></td>
                                        </tr>
                                        <tr className={errors.publication ? 'errorBackground' : ''}>
                                        <td>Publication(authorship) policy</td> 
                                        <td style={{verticalAlign: 'middle'}}><input type='file' name='cohortFile'  formEncType='multiple/part' onChange={e => {handleUpload(e.target.files[0], 3); dispatch(allactions.cohortActions.publication_file(e.target.files[0].name)); if('publication' in errors){let shadow={...errors}; delete shadow.publication; setErrors(shadow)}}} disabled={cohort.publicationUrl}/></td>
                                        <td><input className='inputWriter' name='publicationUrl' value={cohort.publicationUrl} id='publicationUrl' disabled={cohort.publicationFileName} onChange={e => {dispatch(allactions.cohortActions.publication_url(e.target.value)); if(errors.publication){let shadow={...errors}; delete shadow.publication; setErrors(shadow)}}} /></td>
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
                {section.A === 'complete' && section.B === 'complete' && section.C === 'complete' && section.D === 'complete' && section.E === 'complete' && section.F === 'complete' && section.G === 'complete' ? <span onClick={() => alert('submitted')}><input type='button' className='btn btn-primary' value='Submit For Review' /></span> : ''}
            </div>  
        </div>
  </div>
}

export default CohortForm