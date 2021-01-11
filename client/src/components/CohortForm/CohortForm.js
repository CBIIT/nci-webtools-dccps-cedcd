import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Person from './Person/Person'
import Investigator from './Investigator/Investigator'
import DatePicker from 'react-datepicker';
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../controls/modal/modal'
import FileModal from '../controls/modal/FileModal.js'
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import "react-datepicker/dist/react-datepicker.css";
import './CohortForm.scss'
import cohortErrorActions from '../../actions/cohortErrorActions'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const CohortForm = ({ ...props }) => {
    const cohort = useSelector(state => state.cohortReducer)
    const cohortID = useSelector(state => state.cohortIDReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.cohortErrorReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly || false
    const errorMsg = 'Required Field'

    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [fileModal, setFileModal] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [tempId, setTempId] = useState(+window.location.pathname.split('/').pop())
    const [activePanel, setActivePanel] = useState('panelA')
    const [fileListShow, setFileListShow] = useState(false)
    const [fileListTile, setFileListTitle] = useState('')
    const [currentFileList, setCurrentFileList] = useState([])
    const [currentFileListName, setCurrentFileListName] = useState('')

    useEffect(() => {
        if (!cohort.hasLoaded || tempId != cohortID) {
            dispatch(allactions.cohortIDAction.setCohortId(tempId))
            fetch(`/api/questionnaire/cohort_basic_info/${tempId}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {
                    let currentCohort = result.data.cohort,
                        investigators = result.data.investigators.length > 0 ? result.data.investigators : cohort.investigators,
                        completer = result.data.completer, contacter = result.data.contacter, collaborator = result.data.collaborator,
                        cohort_status = result.data.cohortStatus

                    batch(() => {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: cohort_status }))
                        for (let i = 0; i < investigators.length; i++) { //first add errors dynamically, to be removed later
                            dispatch(allactions.cohortErrorActions.investigatorName(i, false, errorMsg))
                            dispatch(allactions.cohortErrorActions.investigatorInstitution(i, false, errorMsg))
                            dispatch(allactions.cohortErrorActions.investigatorEmail(i, false, errorMsg))
                        }
                        for (let k of Object.keys(currentCohort)) {
                            //if(k==='eligible_disease') console.log(currentCohort.eligible_disease)
                            dispatch(allactions.cohortActions[k](currentCohort[k]))
                        }
                        if (completer)
                            for (let k of Object.keys(completer)) {
                                if (k != 'completerCountry')
                                    dispatch(allactions.cohortActions[k](completer[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('completerCountry', completer.completerCountry))
                            }
                        if (currentCohort.clarification_contact === 1) {
                            for (let k of Object.keys(completer)) {
                                dispatch(allactions.cohortActions.contacterName(completer.completerName))
                                dispatch(allactions.cohortActions.contacterPosition(completer.completerPosition))
                                dispatch(allactions.cohortActions.country_code('contacterCountry', completer.completerCountry))
                                dispatch(allactions.cohortActions.contacterPhone(completer.completerPhone))
                                dispatch(allactions.cohortActions.contacterEmail(completer.completerEmail))
                            }
                        } else if (contacter) {
                            for (let k of Object.keys(contacter)) {
                                if (k != 'contacterCountry')
                                    dispatch(allactions.cohortActions[k](contacter[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('contacterCountry', completer.contacterCountry))
                            }
                        }
                        if (collaborator) {
                            for (let k of Object.keys(collaborator)) {
                                if (k != 'collaboratorCountry')
                                    dispatch(allactions.cohortActions[k](collaborator[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('collaboratorCountry', completer.collaboratorCountry))
                            }

                            dispatch(allactions.cohortActions.sameAsSomeone(currentCohort.sameAsSomeone))
                        }
                        if (result.data.sectionStatus)
                            for (let k of result.data.sectionStatus) {
                                dispatch(allactions.sectionActions.setSectionStatus(k.page_code, k.section_status))
                            }
                        if (investigators.length > 0) dispatch(allactions.cohortActions.setInvestigators(investigators))

                        if (currentCohort.completionDate) { dispatch(allactions.cohortErrorActions.completionDate(true)) }
                        if ([0, 1].includes(currentCohort.clarification_contact)) { dispatch(allactions.cohortErrorActions.clarification_contact(true)) }
                        if (currentCohort.data_collected_other !== 1) { dispatch(allactions.cohortErrorActions.data_collected_other_specify(true)) }
                        if (currentCohort.restrictOther !== 1) { dispatch(allactions.cohortErrorActions.restrictions_other_specify(true)) }
                        if (currentCohort.enrollment_total) { dispatch(allactions.cohortErrorActions.enrollment_total(true)) }
                        if (currentCohort.enrollment_year_start) { dispatch(allactions.cohortErrorActions.enrollment_year_start(true)) }
                        if (currentCohort.enrollment_year_end) { dispatch(allactions.cohortErrorActions.enrollment_year_end(true)) }
                        if ([0, 1].includes(currentCohort.enrollment_ongoing)) { dispatch(allactions.cohortErrorActions.enrollment_ongoing(true)) }
                        if (currentCohort.enrollment_ongoing === 0) { dispatch(allactions.cohortErrorActions.enrollment_target(true)); dispatch(allactions.cohortErrorActions.enrollment_year_complete(true)) }
                        if (currentCohort.enrollment_ongoing === 1) {
                            if (currentCohort.enrollment_target && currentCohort.enrollment_target >= 0) { dispatch(allactions.cohortErrorActions.enrollment_target(true))}
                            if (currentCohort.enrollment_year_complete) dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                        }
                        if (currentCohort.enrollment_age_min) { dispatch(allactions.cohortErrorActions.enrollment_age_min(true)) }
                        if (currentCohort.enrollment_age_max) { dispatch(allactions.cohortErrorActions.enrollment_age_max(true)) }
                        if (currentCohort.enrollment_age_mean) { dispatch(allactions.cohortErrorActions.enrollment_age_mean(true)) }
                        if (currentCohort.enrollment_age_median) { dispatch(allactions.cohortErrorActions.enrollment_age_median(true)) }
                        if (currentCohort.current_age_min) { dispatch(allactions.cohortErrorActions.current_age_min(true)) }
                        if (currentCohort.current_age_max) { dispatch(allactions.cohortErrorActions.current_age_max(true)) }
                        if (currentCohort.current_age_mean) { dispatch(allactions.cohortErrorActions.current_age_mean(true)) }
                        if (currentCohort.current_age_median) { dispatch(allactions.cohortErrorActions.current_age_median(true)) }
                        if (currentCohort.time_interval) { dispatch(allactions.cohortErrorActions.time_interval(true)) }
                        if (currentCohort.most_recent_year) { dispatch(allactions.cohortErrorActions.most_recent_year(true)) }
                        if (currentCohort.strategy_other !== 1) { dispatch(allactions.cohortErrorActions.strategy_other_specify(true)) }
                        if ([4, 2, 1].includes(currentCohort.eligible_gender_id)) { dispatch(allactions.cohortErrorActions.eligible_gender_id(true)) }

                        if (currentCohort.data_collected_in_person || currentCohort.data_collected_phone || currentCohort.data_collected_paper || currentCohort.data_collected_web || currentCohort.data_collected_other) { dispatch(allactions.cohortErrorActions.dataCollection(true)) }

                        if(currentCohort.data_collected_other_specify || !currentCohort.data_collected_other) {dispatch(allactions.cohortErrorActions.data_collected_other_specify(true))}

                        if (currentCohort.requireNone || currentCohort.requirecollab || currentCohort.requireIrb || currentCohort.requireData || currentCohort.restrictGenoInfo || currentCohort.restrictOtherDb || currentCohort.restrictCommercial || currentCohort.restrictOther) { dispatch(allactions.cohortErrorActions.requirements(true)) }

                        if(currentCohort.restrictions_other_specify || !currentCohort.restrictOther) {dispatch(allactions.cohortErrorActions.restrictions_other_specify(true))}

                        if (currentCohort.strategy_routine || currentCohort.strategy_mailing || currentCohort.strategy_aggregate_study || currentCohort.strategy_individual_study || currentCohort.strategy_invitation || currentCohort.strategy_other) { dispatch(allactions.cohortErrorActions.strategy(true)) }

                        if(currentCohort.strategy_other_specify || !currentCohort.strategy_other) {dispatch(allactions.cohortErrorActions.strategy_other_specify(true))}

                        //just need to remove the first investigator error on load, since only investigator 0 has errors initially
                        if (completer && completer.completerName) { dispatch(allactions.cohortErrorActions.completerName(true)) }
                        if (completer && completer.completerPosition) { dispatch(allactions.cohortErrorActions.completerPosition(true)) }
                        if (completer && completer.completerEmail) { dispatch(allactions.cohortErrorActions.completerEmail(true)) }


                        if (currentCohort.clarification_contact === 1 && completer) {
                            if (completer.completerName) { dispatch(allactions.cohortErrorActions.contacterName(true)) }
                            if (completer.completerPosition) { dispatch(allactions.cohortErrorActions.contacterPosition(true)) }
                            if (completer.completerEmail) { dispatch(allactions.cohortErrorActions.contacterEmail(true)) }
                        } else if (contacter) {
                            if (contacter.contacterName) { dispatch(allactions.cohortErrorActions.contacterName(true)) }
                            if (contacter.contacterPosition) { dispatch(allactions.cohortErrorActions.contacterPosition(true)) }
                            if (contacter.contacterEmail) { dispatch(allactions.cohortErrorActions.contacterEmail(true)) }
                        }

                        if (contacter && collaborator.collaboratorName) { dispatch(allactions.cohortErrorActions.collaboratorName(true)) }
                        if (contacter && collaborator.collaboratorPosition) { dispatch(allactions.cohortErrorActions.collaboratorPosition(true)) }
                        if (contacter && collaborator.collaboratorEmail) { dispatch(allactions.cohortErrorActions.collaboratorEmail(true)) }

                        for (let i = 0; i < investigators.length; i++) {
                            if (investigators[i].name) { dispatch(allactions.cohortErrorActions.investigatorName(i, true)) }
                            if (investigators[i].institution) { dispatch(allactions.cohortErrorActions.investigatorInstitution(i, true)) }
                            if (investigators[i].email) { dispatch(allactions.cohortErrorActions.investigatorEmail(i, true)) }
                        }
                        dispatch(allactions.cohortActions.setHasLoaded(true))
                    })

                })
        }
    }, [])

    const saveCohort = (id = cohortID) => {
        fetch(`/api/questionnaire/update_cohort_basic/${id}`, {
            method: "POST",
            body: JSON.stringify(cohort),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    if (Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('A', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('A', 'incomplete'))
                    }
                    if (result.newCohortInfo.newCohortID && result.newCohortInfo.newCohortID != cohortID) {
                        dispatch(allactions.cohortIDAction.setCohortId(result.newCohortInfo.newCohortID))
                        window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.newCohortInfo.newCohortID))
                    }
                    if (result.newCohortInfo.investigators) dispatch(allactions.cohortActions.setInvestigators(result.newCohortInfo.investigators))

                    if (result.newCohortInfo.status && result.newCohortInfo.status != cohortStatus) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: result.newCohortInfo.status }))
                        dispatch(fetchCohort(result.newCohortInfo.newCohortID))
                    }

                    if (!proceed) {
                        setSuccessMsg(true)
                    }
                    else
                        props.sectionPicker('B')
                } else {
                    setFailureMsg(true)
                }
            })
    }
    const handleSave = () => {
        console.dir(errors)
        setSaved(true)
        /*
                if (!(cohort.questionnaireFileName || cohort.questionnaire_url)) { if(!isReadOnly) { dispatch(allactions.cohortErrorActions.questionnaire(false, true)) }
                if (!(cohort.mainFileName || cohort.main_cohort_url)) { if(!isReadOnly) { dispatch(allactions.cohortErrorActions.main(false, true)) }
                if (!(cohort.specimenFileName || cohort.specimen_url)) { if(!isReadOnly) { dispatch(allactions.cohortErrorActions.specimen(false, true)) }
                if (!(cohort.dataFileName || cohort.data_url)) { if(!isReadOnly) { dispatch(allactions.cohortErrorActions.data(false, true)) }
                if (!(cohort.publicationFileName || cohort.publication_url)) { if(!isReadOnly) { dispatch(allactions.cohortErrorActions.publication(false, true)) }
        */
        if (Object.entries(errors).length === 0) {
            cohort.sectionAStatus = 'complete'
            dispatch(allactions.cohortActions.setSectionAStatus('complete'))
            saveCohort(cohortID)
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        
        setSaved(true)
        if (Object.entries(errors).length === 0) {
            cohort.sectionAStatus = 'complete'
            dispatch(allactions.cohortActions.setSectionAStatus('complete'))
            saveCohort(cohortID, true)

        }
        else {
            setModalShow(true)
            setProceed(true)
        }
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

    const getMinAgeValidationResult = (value, requiredOrNot, maxAge) => validator.minAgeValidator(value, requiredOrNot, maxAge)
    const getMaxAgeValidationResult = (value, requiredOrNot, minAge) => validator.maxAgeValidator(value, requiredOrNot, minAge)
    const getMeanMedianAgeValidationResult = (value, requiredOrNot, minAge, maxAge) => validator.medianAgeValidator(value, requiredOrNot, minAge, maxAge)

    const populateBaseLineMinAgeError = (value, requiredOrNot, maxAge) => {
        const result = getMinAgeValidationResult(value, requiredOrNot, maxAge)
        if (result) {
            dispatch(allactions.cohortErrorActions.enrollment_age_min(false, result))
        } else {
            dispatch(allactions.cohortErrorActions.enrollment_age_min(true))
        }
    }

    const populateBaseLineMaxAgeError = (value, requiredOrNot, minAge) => {
        const result = getMaxAgeValidationResult(value, requiredOrNot, minAge)
        if (result) {
            dispatch(allactions.cohortErrorActions.enrollment_age_max(false, result))
        } else {
            dispatch(allactions.cohortErrorActions.enrollment_age_max(true))
        }
    }

    const populateCurrentMinAgeError = (value, requiredOrNot, maxAge) => {
        const result = getMinAgeValidationResult(value, requiredOrNot, maxAge)
        if (result) {
            dispatch(allactions.cohortErrorActions.current_age_min(false, result))
        } else {
            dispatch(allactions.cohortErrorActions.current_age_min(true))
        }
    }

    const populateCurrentMaxAgeError = (value, requiredOrNot, minAge) => {
        const result = getMaxAgeValidationResult(value, requiredOrNot, minAge)
        if (result) {
            dispatch(allactions.cohortErrorActions.current_age_max(false, result))
        } else {
            dispatch(allactions.cohortErrorActions.current_age_max(true))
        }
    }

    const populateMeanMedianAgeError = (fieldName, value, requiredOrNot, minAge, maxAge) => {
        const result = getMeanMedianAgeValidationResult(value, requiredOrNot, minAge, maxAge)
        if (result) {
            dispatch(allactions.cohortErrorActions[fieldName](false, result))
        } else {
            dispatch(allactions.cohortErrorActions[fieldName](true))
        }
    }
    //general validation, will be removed from this file later
    const getValidationResult = (value, requiredOrNot, type) => {
        switch (type) {
            case 'phone':
                return validator.phoneValidator(value)
            case 'date':
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'startyear':
            case 'endyear':
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            case 'most_recent_year': 
                return validator.yearValidator(value, requiredOrNot, false)
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
        var result = getValidationResult(value, requiredOrNot, valueType)
        if(valueType === 'startyear' && value && cohort.enrollment_year_end > 0 && value > cohort.enrollment_year_end)
            result = 'start year after end year'
        else if (valueType === 'endyear' && value && cohort.enrollment_year_start > 0 && value < cohort.enrollment_year_start)
            result = 'end year is before start year'

        
        if (result) {
            //console.log('field name: '+fieldName+' '+result)
            dispatch(allactions.cohortErrorActions[fieldName](false, result))
        } else {
            if (cohortErrorActions[fieldName])
                dispatch(allactions.cohortErrorActions[fieldName](true, result))
        }
    }

    const removeInvestigator = (idx) => {
        //batch(
        dispatch(allactions.cohortActions.removeInvestigator(idx))
        //remove investigator also remove the errors
        dispatch(allactions.cohortErrorActions.investigatorName(idx, true))
        dispatch(allactions.cohortErrorActions.investigatorInstitution(idx, true))
        dispatch(allactions.cohortErrorActions.investigatorEmail(idx, true))
    }

    const removeEligbleGenderError = (v) => {
        dispatch(allactions.cohortErrorActions.eligible_gender_id(true))
        dispatch(allactions.cohortActions.eligible_gender_id(v))
    }

    const updateErrors = (event, errorname, allfields = [], dispatchname = '', otherFieldName = '', furtherProcessing = false) => {
        let currentState = false
        for (let f of allfields) currentState = currentState || cohort[f]
        currentState = currentState || event.target.checked

        if (currentState) {//if any of the checkboxes is checked remove error
            dispatch(allactions.cohortErrorActions[errorname](true))
        } else {// if none of them is checked
            dispatch(allactions.cohortErrorActions[errorname](false, 'Required Field'))
        }
        if (furtherProcessing) {
            if (!event.target.checked) {
                dispatch(allactions.cohortActions[otherFieldName](''))
                dispatch(allactions.cohortErrorActions[otherFieldName](true))
            } else {
                dispatch(allactions.cohortErrorActions[otherFieldName](false, errorMsg))
            }
        }
        dispatch(allactions.cohortActions[dispatchname](event.target.checked ? 1 : 0));
    }

    function setPerson(e, n, p, tel, eml, checkedValue, personType) {
        let name = e.target.checked ? n : ''
        let position = e.target.checked ? p : ''
        let phone = e.target.checked ? tel : ''
        let email = e.target.checked ? eml : ''

        if (personType === 'collaborator') {

            batch(() => {

                if (checkedValue === cohort.sameAsSomeone) {
                    dispatch(allactions.cohortActions.sameAsSomeone(-1))
                }
                else {
                    dispatch(allactions.cohortActions.sameAsSomeone(checkedValue))
                }
                
                dispatch(allactions.cohortActions.collaboratorName(name))
                //if ([0,1].includes(cohort.sameAsSomeone) || name) dispatch(allactions.cohortErrorActions.collaboratorName(true))
                dispatch(allactions.cohortActions.collaboratorPosition(position))
                //if ([0,1].includes(cohort.sameAsSomeone) ||position) dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                dispatch(allactions.cohortActions.collaboratorPhone(phone))
                //if ([0,1].includes(cohort.sameAsSomeone) || phone && !getValidationResult(phone, false, 'phone')) dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                dispatch(allactions.cohortActions.collaboratorEmail(email))
                //if ([0,1].includes(cohort.sameAsSomeone) || email && !getValidationResult(email, true, 'email')) dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
            })

        } else if (personType === 'contacter') {
            dispatch(allactions.cohortActions.clarification_contact(checkedValue))
            dispatch(allactions.cohortErrorActions.clarification_contact(true))
            //if (cohort.clarification_contact == 1 || name) dispatch(allactions.cohortErrorActions.contacterName(true))
            dispatch(allactions.cohortActions.contacterName(name))
            //if (cohort.clarification_contact == 1 || position) dispatch(allactions.cohortErrorActions.contacterPosition(true))
            dispatch(allactions.cohortActions.contacterPosition(position))
            //if (cohort.clarification_contact == 1 || phone && !getValidationResult(phone, false, 'phone')) dispatch(allactions.cohortErrorActions.contacterPhone(true))
            dispatch(allactions.cohortActions.contacterPhone(phone))
            //if (cohort.clarification_contact == 1 || email && !getValidationResult(email, true, 'email')) dispatch(allactions.cohortErrorActions.contacterEmail(true))
            dispatch(allactions.cohortActions.contacterEmail(email))
        }
    }



    const handleUpload = (fileData, category) => {
        if (fileData) {
            let fileList = []
            const formData = new FormData();

            for (let i = 0; i < fileData.length; i++) {
                formData.append('cohortFile', fileData[i], fileData[i].name)
                fileList.push(fileData[i].name)
            }

            fetch(`/api/questionnaire/upload/${cohortID}/${category}`, {
                method: "POST",
                body: formData
            }).then(res => res.json())
                .then((result) => {
                    if (result.status === 200) {
                        let dispatchName = ''
                        switch (category) {
                            case 0: dispatchName = 'questionnaireFileName'; break;
                            case 1: dispatchName = 'mainFileName'; break;
                            case 2: dispatchName = 'dataFileName'; break;
                            case 3: dispatchName = 'specimenFileName'; break;
                            case 4: dispatchName = 'publicationFileName'; break;
                        }
                        if (dispatchName) dispatch(allactions.cohortActions[dispatchName](result.data.files))
                        if (result.data.new_ID != cohortID) {
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.new_ID))
                            window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.new_ID))
                        }
                    }
                })

        }
    }
    // model definition
    const file_list = (title='', fileListName, files=[], deleteFileFromList=f=>f) => {
    //    const file_list = (title='', fileListName, files=[]) => {
        return <div className='col-xs-12' style={{border: '1px solid lightgrey', marginTop: '10px', padding: '0'}}>
            <div style={{position: 'relative', height: '40px', backgroundColor: '#01857b', color: 'white', margin: '0 0 10px 0'}}>
                <span className='col-xs-10'><h4><b>{title}</b></h4></span>
                {/*<span className='col-xs-2 upperCloser' style={{textAlign: 'center'}} onClick={()=> setFileModal(false)}><h4>X</h4></span>*/}
                <input type="button" style={{position: 'absolute', right: '10px', background: 'transparent', border: 'none', lineHeight: '2em'}} value='x' onClick={()=> setFileModal(false)} />
            </div> 
            <div style={{height: '30px', width: '96%', margin: 'auto', backgroundColor: '#f2f2f2', boxShadow: '0 1px #ccc'}}>
                <span className='col-md-10 col-xs-9 specialSpan' style={{fontSize: '1.5rem'}}><h5>File Name</h5></span>
                <span className='col-md-2 col-xs-3 specialSpan'><h5>Remove</h5></span>
            </div>
            <div>
                {files.map(f =>
                    <div className='row' style={{ marginBottom: '3px', paddingLeft: '10px'}}>
                        <span className='col-10'>{f.filename}</span>
                        {/*<span className='text-center'>{!isReadOnly && <span className='col-2 glyphicon glyphicon-trash closer' onClick={() => deleteFileFromList(fileListName, f.filename, f.fileId, cohortID)}><span></span></span>}</span>*/}
                        <span className='text-center'>{!isReadOnly && <span className='closer' onClick={() => deleteFileFromList(fileListName, f.filename, f.fileId, cohortID)}>x<span></span></span>}</span>
                    </div>)}
            </div>
        </div>
    }

    const showFileList = (title, fileListName, targetList) => {
        batch(() => {
            setFileListTitle(title)
            setCurrentFileListName(fileListName)
            setCurrentFileList(targetList)
            //setFileListShow(targetList.length > 0)
            setFileModal(true)
        })
    }

    const deleteFileFromList = (fileListName, fileName, fileId, cohort_ID) => {
        fetch(`/api/questionnaire/deleteFile`, {
            method: "POST",
            body: JSON.stringify({ filename: fileName, id: fileId, cohortId: cohort_ID }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                if (result && result.status == 200) {
                    batch(() => {
                        let resultList = cohort[fileListName].filter(r => r.fileId != fileId)
                        if (result.data && result.data != cohortID) {
                            dispatch(allactions.cohortIDAction.setCohortId(result.data))
                            window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data))
                        }
                        if (resultList.length > 0) {
                            setCurrentFileList(resultList)
                            dispatch(allactions.cohortActions[fileListName](resultList))
                        }
                        else {
                            setFileModal(false)
                            //setFileListShow(false)
                            dispatch(allactions.cohortActions[fileListName]([]))
                        }
                    })
                }
            })
    }

    const confirmSaveStay = () => {
        cohort.sectionAStatus = 'incomplete'
        dispatch(allactions.cohortActions.setSectionAStatus('incomplete'));
        saveCohort(cohortID); setModalShow(false)

    }

    const confirmSaveContinue = () => {
        cohort.sectionAStatus = 'incomplete'
        dispatch(allactions.cohortActions.setSectionAStatus('incomplete'))
        saveCohort(cohortID, true); setModalShow(false)
    }

    return (
        <div id='cohortContainer' className='container-fluid'>
            {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
            <FileModal show={fileModal} handleClose={() => setFileModal(false)}  body={file_list(fileListTile, currentFileListName, currentFileList, deleteFileFromList)} footer={<div className='col-xs-12' style={{height: '40px'}} onClick={()=> setFileModal(false)}> <input type='button' className='col-sm-offset-10 col-sm-2 col-xs-12 btn btn-primary' value='Close' /></div>}/> 
            <div className='col-md-12'>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts
                </div>
                <div>
                    <Form>
                        <CollapsiblePanelContainer>

                            {/* Cohort Information */}
                            <CollapsiblePanel
                                condition={activePanel === 'panelA'}
                                onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                                panelTitle="Cohort Information">

                                {/* A.1a Cohort Name */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">
                                        A.1a Cohort Name
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" value={cohort.cohort_name} readOnly/>
                                    </Col>
                                </Form.Group>
    
                                {/* A.1b Cohort Abbreviation */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">
                                        A.1b Cohort Abbreviation
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control type="text" value={cohort.cohort_acronym} readOnly />
                                    </Col>
                                </Form.Group>
                    
                                {/* A.2 Cohort Description */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.2 Cohort Description
                                    </Form.Label>
                                    <Col sm="12">
                                        <p>
                                            Please provide a short paragraph describing your cohort. This will be used as an overall 
                                            narrative description of your cohort on the CEDCD website.  You may provide a link to a 
                                            description on your cohort’s website.
                                        </p>
                                    </Col>
                                    <Col sm="12">
                                        <Form.Control as="textarea" rows={15} 
                                            placeholder={"Max of 5000 characters"}
                                            style={{ fontSize: '16px' }}
                                            maxLength="5000" 
                                            value={cohort.cohort_description} 
                                            onChange={e => 
                                                dispatch(allactions.cohortActions.cohort_description(e.target.value))
                                            } 
                                            readOnly={isReadOnly}/>
                                    </Col>
                                </Form.Group>

                                {/* A.3 Cohort Website */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.3 Does the cohort have a website? Please specify if applicable
                                    </Form.Label>
                                    <Col sm="12">
                                        {errors.cohort_web_site && saved ? 
                                            <Reminder message={errors.cohort_web_site}>
                                                <Form.Control type="text" style={{ color: 'red', border: '1px solid red' }} 
                                                    placeholder='Max of 200 characters' 
                                                    maxLength='200'
                                                    value={cohort.cohort_web_site} 
                                                    onChange={e => 
                                                        dispatch(allactions.cohortActions.cohort_web_site(e.target.value))
                                                    }
                                                    onBlur={e => 
                                                        populateErrors('cohort_web_site', e.target.value, false, 'string') 
                                                    } 
                                                    readOnly={isReadOnly} />
                                            </Reminder> : 
                                            <Form.Control type="text"
                                                placeholder='Max of 200 characters' 
                                                maxLength='200' 
                                                value={cohort.cohort_web_site} 
                                                onChange={e => 
                                                    dispatch(allactions.cohortActions.cohort_web_site(e.target.value))
                                                } 
                                                onBlur={e => 
                                                    populateErrors('cohort_web_site', e.target.value, false, 'string') 
                                                }
                                                readOnly={isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>
                                
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.4a Person who completed the form<span style={{ color: 'red' }}>*</span>
                                    </Form.Label>
                                    <Col sm="12">
                                        <Person id="completerInfo" 
                                            type="completerCountry" 
                                            name="completerName" 
                                            position="completerPosition" 
                                            phone="completerPhone" 
                                            email="completerEmail" 
                                            marginWidth="5"
                                            inputWidth="3"
                                            errors={errors} 
                                            disabled={isReadOnly} 
                                            displayStyle={saved} />
                                    </Col>
                                </Form.Group>

                                {/* A.4b Contact Person */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.4b Contact Person for Clarification of this form<span style={{ color: 'red' }}>*</span>
                                    </Form.Label>
                                    <Form.Label column sm="5" style={{ fontWeight: 'normal' }}>
                                        Is this the same person who completed this form?
                                    </Form.Label>
                                    <Col sm="6" className="align-self-center">
                                        <div key="radio">
                                            {errors.clarification_contact && saved ? 
                                                <Reminder message={errors.clarification_contact}>
                                                    <Form.Check type="radio"
                                                        id="clarification-contact-radio-no"
                                                        inline
                                                        style={{ color: 'red', borderBottom: '1px solid red' }}
                                                        name='clarification_contact'>
                                                        <Form.Check.Input bsPrefix  
                                                            type="radio"
                                                            className="mr-2"
                                                            checked={cohort.clarification_contact === 0} 
                                                            onClick={e => {
                                                                //setPerson(e, '', '', '', '', 0, 'contacter')
                                                                if(!isReadOnly) {
                                                                    dispatch(allactions.cohortActions.clarification_contact(0))
                                                                    dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterName(false, 'Required Field'))
                                                                    dispatch(allactions.cohortErrorActions.contacterPosition(false, 'Required Field'))
                                                                    dispatch(allactions.cohortErrorActions.contacterPhone(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterEmail(false, 'Required Field'))
                                                                }
                                                            }} />
                                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                            No
                                                        </Form.Check.Label>
                                                    </Form.Check>                                              
                                                </Reminder> :
                                                <Form.Check type="radio"
                                                    id="clarification-contact-radio-no"
                                                    inline
                                                    name='clarification_contact'>
                                                    <Form.Check.Input bsPrefix
                                                        type="radio"
                                                        className="mr-2"
                                                        checked={cohort.clarification_contact === 0} 
                                                        onClick={e => {
                                                            //!isReadOnly && setPerson(e, '', '', '', '', 0, 'contacter')
                                                            if(!isReadOnly) {
                                                                dispatch(allactions.cohortActions.clarification_contact(0));
                                                                dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                                dispatch(allactions.cohortErrorActions.contacterName(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.contacterPosition(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.contacterPhone(true))
                                                                dispatch(allactions.cohortErrorActions.contacterEmail(false, 'Required Field'))
                                                            } 
                                                        }} />
                                                    <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                        No
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            }

                                            {errors.clarification_contact && saved ? 
                                                <Reminder message={errors.clarification_contact}>
                                                    <Form.Check type="radio"
                                                        id="clarification-contact-radio-yes"
                                                        inline
                                                        style={{ color: 'red', borderBottom: '1px solid red' }}
                                                        name="clarification_contact">
                                                        <Form.Check.Input bsPrefix
                                                            type="radio"
                                                            className="mr-2"
                                                            checked={cohort.clarification_contact === 1} 
                                                            onClick={e => {
                                                                //!isReadOnly && setPerson(e, '', '', '', '', 1, 'contacter')
                                                                if(!isReadOnly) {
                                                                    setPerson(e, '', '', '', '', 1, 'contacter');
                                                                    dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterName(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterPosition(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterPhone(true))
                                                                    dispatch(allactions.cohortErrorActions.contacterEmail(true))
                                                            }} 
                                                            }/>
                                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                            Yes 
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </Reminder> :
                                                <Form.Check type="radio"
                                                    id="clarification-contact-radio-yes"
                                                    inline
                                                    style={{ fontWeight: 'normal '}}
                                                    name="clarification_contact">
                                                    <Form.Check.Input bsPrefix
                                                        type="radio"
                                                        className="mr-2"
                                                        checked={cohort.clarification_contact === 1} 
                                                        onClick={e => {
                                                            //!isReadOnly && setPerson(e, '', '', '', '', 1, 'contacter')
                                                            if(!isReadOnly) {
                                                                setPerson(e, '', '', '', '', 1, 'contacter');
                                                                dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                                dispatch(allactions.cohortErrorActions.contacterName(true))
                                                                dispatch(allactions.cohortErrorActions.contacterPosition(true))
                                                                dispatch(allactions.cohortErrorActions.contacterPhone(true))
                                                                dispatch(allactions.cohortErrorActions.contacterEmail(true))
                                                        }
                                                        }} />
                                                    <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                        Yes
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            }
                                        </div>
                                    </Col>
                                    <Col sm="12">
                                        <Person id='contacterInfo'
                                            type="contacterCountry" 
                                            name="contacterName" 
                                            position="contacterPosition" 
                                            phone="contacterPhone" 
                                            email="contacterEmail" 
                                            marginWidth="5"
                                            inputWidth="3"
                                            errors={errors}
                                            disabled={cohort.clarification_contact||isReadOnly} 
                                            displayStyle={saved} 
                                            leftPadding="0" />
                                    </Col>
                                </Form.Group>
                            </CollapsiblePanel>
                            
                            {/* Principal Investigators */}
                            <CollapsiblePanel
                                condition={activePanel === 'panelB'}
                                onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                                panelTitle="Principal Investigators">
                                
                                {/* A.5 Cohort Principal Investigator(s) */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.5 Cohort Principal Investigator(s)
                                    </Form.Label>
                                    <Col sm="12">
                                        <button className="btn btn-primary btn-sm mb-1" 
                                            onClick={e => { 
                                                e.preventDefault(); 
                                                dispatch(allactions.cohortActions.addInvestigator()); 
                                                let idx = cohort.investigators.length; 
                                                dispatch(allactions.cohortErrorActions.investigatorName(idx, false, errorMsg)); 
                                                dispatch(allactions.cohortErrorActions.investigatorInstitution(idx, false, errorMsg)); 
                                                dispatch(allactions.cohortErrorActions.investigatorEmail(idx, false, errorMsg)) }
                                            } 
                                            disabled={isReadOnly}>
                                            Add New Investigator
                                        </button>
                                    </Col>
                                    {
                                        cohort.investigators.map((item, idx) => 
                                            <Col className="mb-1" sm="12" key={'investigator_key_' + idx}>
                                                <Investigator key={idx} 
                                                    id={'investigator_' + idx} 
                                                    name={'investigator_name_' + idx} 
                                                    institution={'investigator_inst_' + idx} 
                                                    email={'investigator_email_' + idx} 
                                                    handleRemove={removeInvestigator} 
                                                    errors={errors} 
                                                    disabled={isReadOnly} 
                                                    displayStyle={saved} />
                                            </Col>
                                        )
                                    }
                                </Form.Group>

                                {/* A.6 Investigator Contact */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.6 If an investigator is interested in collaborating with your cohort on a new project, whom should they contact?
                                    </Form.Label>
                                    <Col sm="6">
                                            <Person id='collaboratorInfo'
                                                type="collaboratorCountry" 
                                                name="collaboratorName" 
                                                position="collaboratorPosition" 
                                                phone="collaboratorPhone" 
                                                email="collaboratorEmail" 
                                                marginWidth="6"
                                                inputWidth="6"
                                                errors={errors} 
                                                disabled={cohort.sameAsSomeone === 0 || cohort.sameAsSomeone === 1 || isReadOnly} 
                                            displayStyle={saved}/>
                                    </Col>
                                    <Col sm="6">
                                        <div key="checkbox">
                                            <Form.Check type="checkbox"
                                                className="pl-0"
                                                id="default-completerName-check"
                                                name='sameAsCompleted'>
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2"
                                                    checked={cohort.sameAsSomeone === 0} 
                                                    onClick={e => {
                                                        //!isReadOnly && setPerson(e, '', '', '', '', 0, 'collaborator') 
                                                        if(!isReadOnly) {
                                                            setPerson(e, '', '', '', '', 0, 'collaborator');
                                                            if(e.target.checked)
                                                            {
                                                                dispatch(allactions.cohortErrorActions.collaboratorName(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
                                                            }
                                                            else{
                                                                dispatch(allactions.cohortErrorActions.collaboratorName(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPosition(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPhone(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorEmail(false, 'Required Filed'))
                                                            }
                                                    }     
                                                    }} />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Same as the person who completed the form(4a)
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-contacterName-check"
                                                name="sameAsContacted">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={cohort.sameAsSomeone === 1} 
                                                    onClick={e => {
                                                        if(!isReadOnly) {
                                                            setPerson(e, '', '', '', '', 1, 'collaborator')
                                                            if(e.target.checked)
                                                            {
                                                                dispatch(allactions.cohortErrorActions.collaboratorName(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                                                                dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
                                                            }
                                                            else{
                                                                dispatch(allactions.cohortErrorActions.collaboratorName(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPosition(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorPhone(false, 'Required Field'))
                                                                dispatch(allactions.cohortErrorActions.collaboratorEmail(false, 'Required Filed'))
                                                            }
                                                    }}
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Same as the contact person for clarification of this form(4b)
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                    </Col>

                                </Form.Group>
                            </CollapsiblePanel>

                            {/* Eligibility & Enrollment */}
                            <CollapsiblePanel
                                condition={activePanel === 'panelC'}
                                onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                                panelTitle="Eligibility & Enrollment">

                                {/* A.7 Eligibility Criteria */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.7 Eligibility Criteria
                                        {errors.eligible_gender_id && saved && 
                                            <div>
                                                <span style={{ color: 'red', fontSize: '16px', paddingLeft: '0' }}>
                                                    {errorMsg}
                                                </span> 
                                            </div>
                                        }
                                    </Form.Label>
                                    <Col sm="12" className="p-0 mb-3">
                                        <Form.Label column sm="6" style={{ fontWeight: 'normal' }}>
                                            Eligible sex<span style={{color: 'red'}}>*</span>
                                        </Form.Label>
                                        <Col sm="6">
                                            <div key="radio">
                                                <Form.Check type="radio" 
                                                    className="pl-0"
                                                    id="default-gender-all"
                                                    name="eligible_gender_id">
                                                    <Form.Check.Input bsPrefix
                                                        type="radio" 
                                                        className="mr-2" 
                                                        value='4' 
                                                        checked={cohort.eligible_gender_id === 4} 
                                                        onChange={() => 
                                                            !isReadOnly && removeEligbleGenderError(4) 
                                                        } />
                                                    <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                        All
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check type="radio" 
                                                    className="pl-0"
                                                    id="default-gender-males"
                                                    name="eligible_gender_id">
                                                    <Form.Check.Input bsPrefix
                                                        type="radio" 
                                                        className="mr-2" 
                                                        value="2" 
                                                        checked={cohort.eligible_gender_id === 2} 
                                                        onChange={() => 
                                                            !isReadOnly && removeEligbleGenderError(2) 
                                                        } />
                                                    <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                        Males only
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check type="radio" 
                                                    className="pl-0"
                                                    id="default-gender-females"
                                                    name="eligible_gender_id">
                                                    <Form.Check.Input bsPrefix
                                                        type="radio" 
                                                        className="mr-2" 
                                                        value="1"
                                                        checked={cohort.eligible_gender_id === 1} 
                                                        onChange={() => 
                                                            !isReadOnly && removeEligbleGenderError(1) 
                                                        } />
                                                    <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                        Females only
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </div>
                                        </Col>
                                    </Col>
                                    <Form.Label column sm="6" style={{ fontWeight: 'normal' }}>
                                        Baseline population consists of
                                    </Form.Label>
                                    <Col sm="6" className="align-self-center">
                                        <div key="checkbox">
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-cancerSurvivors"
                                                name="cancerSurvivors">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.eligible_disease} 
                                                    onChange={() => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.eligible_disease(!cohort.eligible_disease))
                                                    }  />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Cancer survivors only, specify cancer site(s)
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                    {/* </Col>
                                    <Col sm={{offset: "6", span: "6"}}> */}
                                        <Form.Control type="text" className='text-capitalize'
                                            name='cancerSites' 
                                            value={cohort.eligible_disease_cancer_specify} 
                                            maxLength="100" 
                                            placeholder="Max of 100 characters" 
                                            readOnly={!cohort.eligible_disease || isReadOnly} 
                                            onChange={e => 
                                                dispatch(allactions.cohortActions.eligible_disease_cancer_specify(e.target.value))
                                            } />
                                    </Col>
                                    <Form.Label column sm="12" style={{ fontWeight: 'normal' }}>
                                        Please specify any eligibility criteria in addition to age and sex
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control type="text" 
                                            placeholder='Max of 100 characters'
                                            maxLength="100" 
                                            name='eligible_disease_other_specify' 
                                            value={cohort.eligible_disease_other_specify} 
                                            onChange={e => 
                                                !isReadOnly && dispatch(allactions.cohortActions.eligible_disease_other_specify(e.target.value))
                                            } 
                                            readOnly={isReadOnly} />
                                    </Col>
                                </Form.Group>
                                    
                                {/* A.8 Enrollment Information */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.8 Enrollment Information
                                    </Form.Label>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Total number of subjects enrolled to date<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_total && saved ? 
                                                <Reminder message={errors.enrollment_total}>
                                                    <Form.Control type="text"  
                                                        style={{ color: 'red', border: '1px solid red' }}
                                                        name='enrollment_total' 
                                                        value={cohort.enrollment_total} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_total(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateErrors('enrollment_total', e.target.value, true, 'number')
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" 
                                                    name='enrollment_total' 
                                                    value={cohort.enrollment_total} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_total(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateErrors('enrollment_total', e.target.value, true, 'number') 
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Started in year<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_year_start && saved ? 
                                                <Reminder message={errors.enrollment_year_start}>
                                                    <Form.Control type="text" 
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='enrollment_year_start' 
                                                        placeholder='yyyy' 
                                                        value={cohort.enrollment_year_start} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateErrors('enrollment_year_start', e.target.value, true, 'startyear') 
                                                        } />
                                                </Reminder> :
                                                <Form.Control   
                                                    name='enrollment_year_start' 
                                                    placeholder='yyyy' 
                                                    value={cohort.enrollment_year_start} 
                                                    onChange={e => 
                                                        !isReadOnly &&  dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateErrors('enrollment_year_start', e.target.value, true, 'startyear')
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Ended in year<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_year_end && saved ? 
                                                <Reminder message={errors.enrollment_year_end}>
                                                    <input style={{ color: 'red', border: '1px solid red' }} 
                                                        className='form-control' 
                                                        name='enrollment_year_end' 
                                                        placeholder='yyyy' 
                                                        value={cohort.enrollment_year_end} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateErrors('enrollment_year_end', e.target.value, true, 'endyear') 
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    className='form-control' 
                                                    name='enrollment_year_end' 
                                                    placeholder='yyyy' 
                                                    value={cohort.enrollment_year_end} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateErrors('enrollment_year_end', e.target.value, true, 'endyear') 
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Is enrollment ongoing?<span style={{ color: 'red' }}>*</span>   
                                        </Form.Label>
                                        <Col sm="2" className="align-self-center">
                                            <div key="radio">
                                                {errors.enrollment_ongoing && saved ? 
                                                    <Reminder message='Required Field'>
                                                        <Form.Check type="radio"
                                                            id="enrollment-ongoing-radio-no"
                                                            inline
                                                            style={{ color: 'red', borderBottom: '1px solid red' }}
                                                            name='enrollment_ongoing'>
                                                            <Form.Check.Input bsPrefix  
                                                                type="radio"
                                                                className="mr-2"
                                                                // value='0' 
                                                                checked={cohort.enrollment_ongoing === 0} 
                                                                onChange={() => {
                                                                    if(!isReadOnly){
                                                                        dispatch(allactions.cohortActions.enrollment_ongoing(0));
                                                                        dispatch(allactions.cohortErrorActions.enrollment_ongoing(true));
                                                                        dispatch(allactions.cohortErrorActions.enrollment_target(true));
                                                                        dispatch(allactions.cohortErrorActions.enrollment_year_complete(true));
                                                                    }
                                                                }} />
                                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                                No
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                    </Reminder> : 
                                                    <Form.Check type="radio"
                                                        id="enrollment-ongoing-radio-no"
                                                        inline
                                                        name='enrollment_ongoing'>
                                                        <Form.Check.Input bsPrefix
                                                            type="radio"
                                                            className="mr-2"
                                                            // value='0' 
                                                            checked={cohort.enrollment_ongoing === 0} 
                                                            onChange={e => {
                                                                if (!isReadOnly) {
                                                                    dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                                                    dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                                    dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                                                    dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                                                }
                                                            }} />
                                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                            No
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                }

                                                {errors.enrollment_ongoing && saved ? 
                                                    <Reminder message='Required Field'>
                                                        <Form.Check type="radio"
                                                            id="enrollment-ongoing-radio-yes"
                                                            inline
                                                            style={{ color: 'red', borderBottom: '1px solid red' }}
                                                            name='enrollment_ongoing'>
                                                            <Form.Check.Input bsPrefix  
                                                                type="radio"
                                                                className="mr-2"
                                                                // value='1' 
                                                                checked={cohort.enrollment_ongoing === 1} 
                                                                onChange={() => {
                                                                    if(!isReadOnly){
                                                                        dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                                                        dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                                        dispatch(allactions.cohortErrorActions.enrollment_target(false, 'Required Field'))
                                                                        dispatch(allactions.cohortErrorActions.enrollment_year_complete(false, 'Requred Filed'))
                                                                    }
                                                                }} />
                                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                                Yes
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                    </Reminder> : 
                                                    <Form.Check type="radio"
                                                        id="enrollment-ongoing-radio-yes"
                                                        inline
                                                        name="enrollment_ongoing">
                                                        <Form.Check.Input type='radio' 
                                                            className="mr-2"
                                                            // value='1' 
                                                            checked={cohort.enrollment_ongoing === 1} 
                                                            onChange={e => {

                                                                if (!isReadOnly) {
                                                                    dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                                                    
                                                                    dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                                    !cohort.enrollment_target && dispatch(allactions.cohortErrorActions.enrollment_target(false ,'Required Field'))
                                                                    !cohort.enrollment_year_complete && dispatch(allactions.cohortErrorActions.enrollment_year_complete(false, 'Required Field'))
                                                                }
                                                            }} />
                                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                            Yes
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                } 
                                            </div>
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            If still enrolling, please specify the target number of plan to enroll<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_target && saved ? 
                                                <Reminder message={errors.enrollment_target}>
                                                    <Form.Control type="text" className='text-capitalize'
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='enrollment_target' 
                                                        value={cohort.enrollment_target} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_target(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateErrors('enrollment_target', e.target.value, true, 'number')
                                                        } 
                                                        disabled={cohort.enrollment_ongoing == 0} />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    name='enrollment_target' 
                                                    value={cohort.enrollment_target} 
                                                    onChange={e =>
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_target(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateErrors('enrollment_target', e.target.value, true, 'number')
                                                    } 
                                                    readOnly={cohort.enrollment_ongoing == 0 || isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            If still enrolling, please specify when you plan to complete enrollment<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_year_complete && saved ? 
                                                <Reminder message={errors.enrollment_year_complete}>
                                                    <Form.Control type="text" 
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='enrollment_year_complete' 
                                                        placeholder='yyyy' 
                                                        value={cohort.enrollment_year_complete} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateErrors('enrollment_year_complete', e.target.value, true, 'year')
                                                        } 
                                                        disabled={cohort.enrollment_ongoing == 0 || isReadOnly} />
                                                </Reminder> : 
                                                <Form.Control type="text" 
                                                    name='enrollment_year_complete' 
                                                    placeholder='yyyy' 
                                                    value={cohort.enrollment_year_complete} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))
                                                    }
                                                    onBlur={e => 
                                                        populateErrors('enrollment_year_complete', e.target.value, true, 'year')
                                                    } 
                                                    readOnly={cohort.enrollment_ongoing == 0 || isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Baseline age range of enrolled subjects<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="4">
                                            <InputGroup>
                                                {errors.enrollment_age_min && saved ? 
                                                    <Reminder message={errors.enrollment_age_min}>
                                                        <Form.Control type="text" className='text-capitalize'
                                                            style={{ color: 'red', border: '1px solid red' }} 
                                                            name='enrollment_age_min' 
                                                            value={cohort.enrollment_age_min} 
                                                            onChange={e => 
                                                                !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))
                                                            } 
                                                            onBlur={e => 
                                                                populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max) 
                                                            } />
                                                    </Reminder> : 
                                                    <Form.Control type="text" className='text-capitalize'
                                                        name='enrollment_age_min' 
                                                        value={cohort.enrollment_age_min} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max) 
                                                        } 
                                                        readOnly={isReadOnly} />
                                                }
                                                <InputGroup.Append>
                                                    <InputGroup.Text style={{ fontSize: '16px' }}>to</InputGroup.Text>
                                                </InputGroup.Append>
                                                {errors.enrollment_age_max && saved ? 
                                                    <Reminder message={errors.enrollment_age_max}>
                                                        <Form.Control type="text" className='text-capitalize'
                                                            style={{ color: 'red', border: '1px solid red' }} 
                                                            name='enrollment_age_max' 
                                                            value={cohort.enrollment_age_max} 
                                                            onChange={e => 
                                                                !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))
                                                            } 
                                                            onBlur={e => 
                                                                populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min) 
                                                            } />
                                                    </Reminder> : 
                                                    <Form.Control type="text" className='text-capitalize'
                                                        name='enrollment_age_max' 
                                                        value={cohort.enrollment_age_max} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min) 
                                                        }
                                                        readOnly={isReadOnly} />
                                                }
                                            </InputGroup>
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Median age<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_age_median && saved ? 
                                                <Reminder message={errors.enrollment_age_median}>
                                                    <Form.Control type="text" className='text-capitalize'
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='enrollment_age_median' 
                                                        value={cohort.enrollment_age_median} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_median(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateMeanMedianAgeError('enrollment_age_median', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    name='enrollment_age_median' 
                                                    value={cohort.enrollment_age_median} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_median(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateMeanMedianAgeError('enrollment_age_median', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Mean age<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.enrollment_age_mean && saved ? 
                                                <Reminder message={errors.enrollment_age_mean}>
                                                    <Form.Control type="text" className='text-capitalize'
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='enrollment_age_mean' 
                                                        value={cohort.enrollment_age_mean} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_mean(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateMeanMedianAgeError('enrollment_age_mean', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    name='enrollment_age_mean' 
                                                    value={cohort.enrollment_age_mean} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_mean(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateMeanMedianAgeError('enrollment_age_mean', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Current age range of enrolled subjects<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="4">
                                            <InputGroup>
                                                {errors.current_age_min && saved ? 
                                                    <Reminder message={errors.current_age_min}>
                                                        <Form.Control type="text" className='text-capitalize'
                                                            style={{ color: 'red', border: '1px solid red' }} 
                                                            name='current_age_min' 
                                                            value={cohort.current_age_min} 
                                                            onChange={e => 
                                                                !isReadOnly && dispatch(allactions.cohortActions.current_age_min(e.target.value))
                                                            } 
                                                            onBlur={e => 
                                                                populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max)
                                                            } />
                                                    </Reminder> : 
                                                    <Form.Control type="text" className='text-capitalize'
                                                        name='current_age_min' 
                                                        value={cohort.current_age_min} 
                                                        onChange={e => 
                                                            !isReadOnly && dispatch(allactions.cohortActions.current_age_min(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max)
                                                        } 
                                                        readOnly={isReadOnly} />
                                                }
                                                <InputGroup.Append>
                                                    <InputGroup.Text style={{ fontSize: '16px' }}>to</InputGroup.Text>
                                                </InputGroup.Append>
                                                {errors.current_age_max && saved ? 
                                                    <Reminder message={errors.current_age_max}>
                                                        <Form.Control type="text" className='text-capitalize'
                                                            style={{ color: 'red', border: '1px solid red' }} 
                                                            name='current_age_max' 
                                                            value={cohort.current_age_max} 
                                                            onChange={e => 
                                                                !isReadOnly && dispatch(allactions.cohortActions.current_age_max(e.target.value))
                                                            } 
                                                            onBlur={e => 
                                                                populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min)
                                                            } />
                                                    </Reminder> : 
                                                    <Form.Control type="text" className='text-capitalize'
                                                        name='current_age_max' 
                                                        value={cohort.current_age_max} 
                                                        onChange={e => 
                                                            !isReadOnly &&  dispatch(allactions.cohortActions.current_age_max(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min)
                                                        } 
                                                        readOnly={isReadOnly} />
                                                }
                                            </InputGroup>
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Median age<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.current_age_median && saved ? 
                                                <Reminder message={errors.current_age_median}>
                                                    <Form.Control type="text" className='text-capitalize'
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='current_age_median' 
                                                        value={cohort.current_age_median} 
                                                        onChange={e => 
                                                            !isReadOnly &&  dispatch(allactions.cohortActions.current_age_median(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateMeanMedianAgeError('current_age_median', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    name='current_age_median' 
                                                    value={cohort.current_age_median}
                                                    onChange={e => 
                                                        !isReadOnly &&  dispatch(allactions.cohortActions.current_age_median(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateMeanMedianAgeError('current_age_median', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                    <Col sm="12" className="p-0" className="mb-1">
                                        <Form.Label className="pl-0" column sm="6" style={{ fontWeight: 'normal' }}>
                                            Mean age<span style={{ color: 'red' }}>*</span>
                                        </Form.Label>
                                        <Col sm="2">
                                            {errors.current_age_mean && saved ? 
                                                <Reminder message={errors.current_age_mean}>
                                                    <Form.Control type="text" className='text-capitalize'
                                                        style={{ color: 'red', border: '1px solid red' }} 
                                                        name='current_age_mean' 
                                                        value={cohort.current_age_mean} 
                                                        onChange={e => 
                                                            !isReadOnly &&  dispatch(allactions.cohortActions.current_age_mean(e.target.value))
                                                        } 
                                                        onBlur={e => 
                                                            populateMeanMedianAgeError('current_age_mean', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                        } />
                                                </Reminder> : 
                                                <Form.Control type="text" className='text-capitalize'
                                                    name='current_age_mean' 
                                                    value={cohort.current_age_mean} 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.current_age_mean(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateMeanMedianAgeError('current_age_mean', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                    } 
                                                    readOnly={isReadOnly} />
                                            }
                                        </Col>
                                    </Col>
                                </Form.Group>
                            </CollapsiblePanel>
                            
                            {/* Requirements & Strategies */}
                            <CollapsiblePanel
                                condition={activePanel === 'panelD'}
                                onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}
                                panelTitle="Requirements & Strategies">

                                {/* A.9 Specify the Frequency of Questionnaires */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.9{' '}Specify the frequency of questionnaires, e.g, annually, every 2 years etc.<span style={{ color: 'red' }}>*</span>
                                    </Form.Label>
                                    <Col sm="12">
                                        {errors.time_interval && saved ? 
                                            <Reminder message={errors.time_interval}>
                                                <Form.Control type="text" className='text-capitalize'
                                                    style={{ color: 'red', border: '1px solid red' }} 
                                                    placeholder='Max of 200 characters' 
                                                    maxLength='200' c
                                                    name='time_interval' 
                                                    value={cohort.time_interval} 
                                                    onChange={e => 
                                                        !isReadOnly &&  dispatch(allactions.cohortActions.time_interval(e.target.value))
                                                    } 
                                                    onBlur={e => 
                                                        populateErrors('time_interval', e.target.value, true, 'string') 
                                                    } />
                                            </Reminder> : 
                                            <Form.Control type="text" className='text-capitalize'
                                                placeholder='Max of 200 characters'
                                                maxLength='200' 
                                                name='time_interval' 
                                                value={cohort.time_interval} 
                                                onChange={e => 
                                                    !isReadOnly &&  dispatch(allactions.cohortActions.time_interval(e.target.value))
                                                } 
                                                onBlur={e => 
                                                    populateErrors('time_interval', e.target.value, true, 'string') 
                                                } 
                                                readOnly={isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>

                                {/* A.10 Most Recent Year Questionnaire Collected */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="6">
                                        A.10 Most recent year when questionnaire data were collected<span style={{ color: 'red' }}>*</span>
                                    </Form.Label>
                                    <Col sm="2">
                                        {errors.most_recent_year && saved ? 
                                            <Reminder message={errors.most_recent_year}>
                                                <Form.Control type="text" 
                                                    style={{ color: 'red', border: '1px solid red' }} 
                                                    name='most_recent_year' 
                                                    value={cohort.most_recent_year}
                                                    onChange={e => 
                                                        !isReadOnly &&  dispatch(allactions.cohortActions.most_recent_year(e.target.value))
                                                    } 
                                                    placeholder='yyyy' 
                                                    onBlur={e => 
                                                        populateErrors('most_recent_year', e.target.value, true, 'most_recent_year') 
                                                    } />
                                            </Reminder> : 
                                            <Form.Control type="text" 
                                                name='most_recent_year' 
                                                value={cohort.most_recent_year} 
                                                onChange={e => 
                                                    !isReadOnly &&  dispatch(allactions.cohortActions.most_recent_year(e.target.value))
                                                }
                                                placeholder='yyyy' 
                                                onBlur={e => 
                                                    populateErrors('most_recent_year', e.target.value, true, 'most_recent_year') 
                                                } 
                                                readOnly={isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>

                                {/* A.11 How was Info Collected */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.11 How was information from the questionnaire administered/collected?<span style={{ color: 'red' }}>*</span> (Select all that apply)
                                        {errors.dataCollection && saved &&
                                            <div>
                                                <span style={{ color: 'red', marginLeft: '10px' }}>
                                                    {errorMsg}
                                                </span> 
                                            </div>
                                        }
                                    </Form.Label>
                                    <Col sm="12">
                                        <div key="checkbox">
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-collected-in-person"
                                                name="data_collected_in_person">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.data_collected_in_person == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_phone', 'data_collected_paper', 'data_collected_web', 'data_collected_other'], 'data_collected_in_person') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    In person
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-collected-phone"
                                                name="data_collected_phone">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.data_collected_phone == 1} 
                                                    onClick={e => 
                                                        !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_paper', 'data_collected_web', 'data_collected_other'], 'data_collected_phone') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Phone interview
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-collected-paper"
                                                name="data_collected_paper">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.data_collected_paper == 1} 
                                                    onClick={e =>
                                                        !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_web', 'data_collected_other'], 'data_collected_paper') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Self-administered via paper
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-collected-web"
                                                name="data_collected_web">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.data_collected_web == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_paper', 'data_collected_other'], 'data_collected_web') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Self-administered via web-based device
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-collected-other"
                                                name="data_collected_other">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.data_collected_other == 1}
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_paper', 'data_collected_web'], 'data_collected_other', 'data_collected_other_specify', true) 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Other, please specify
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                        {saved && errors.data_collected_other_specify ?
                                            <Reminder message={errors.data_collected_other_specify}>
                                                <Form.Control type="text" className='text-capitalize'
                                                    style={{ color: 'red', border: '1px solid red' }} 
                                                    name='data_collected_other_specify'
                                                    value={cohort.data_collected_other_specify} 
                                                    placeholder='Max of 200 characters'
                                                    maxLength='200' 
                                                    onChange={e => 
                                                        !isReadOnly &&  dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))
                                                    }
                                                    onBlur={() => 
                                                        populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')
                                                    }
                                                    disabled={!cohort.data_collected_other} />
                                            </Reminder> : 
                                            <Form.Control type="text" className='text-capitalize'
                                                name='data_collected_other_specify' 
                                                value={cohort.data_collected_other_specify} 
                                                placeholder='Max of 200 characters'
                                                maxLength='200' 
                                                onChange={e => 
                                                    !isReadOnly &&  dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))
                                                } 
                                                onBlur={() => 
                                                    populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')
                                                }
                                                readOnly={!cohort.data_collected_other || isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>

                                {/* A.12 Specific Requirements */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.12 Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?<span style={{ color: 'red' }}>*</span> (Select all that apply)
                                        {errors.requirements && saved &&
                                            <div>
                                                <span style={{ color: 'red', marginLeft: '10px' }}>
                                                    {errorMsg}
                                                </span> 
                                            </div>
                                        }
                                    </Form.Label>
                                    <Col sm="12">
                                        <div key="checkbox">
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-require-none"
                                                name="requireNone">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.requireNone == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireNone') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    None
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-require-collab"
                                                name="requireCollab">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.requireCollab == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireNone', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireCollab') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Require collaboration with cohort investigators
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-require-irb"
                                                name="requireIrb">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.requireIrb == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireNone', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireIrb')
                                                    }/>
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Require IRB approvals
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-require-data"
                                                name="requireData">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.requireData == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireNone', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireData') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Require data use agreements and/or materrial transfer agreement
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-restrict-geno-info"
                                                name="restrictGenoInfo">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.restrictGenoInfo == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'requireNone', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'restrictGenoInfo') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Restrictions in the consent related to genetic information
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-restrict-other-db"
                                                name="restrictOtherDb">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.restrictOtherDb == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'requireNone', 'restrictCommercial', 'restrictOther'], 'restrictOtherDb') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Restrictions in the consent related to linking to other databases
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-restrict-commercial"
                                                name="restrictCommercial">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.restrictCommercial == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'requireNone', 'restrictOther'], 'restrictCommercial') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Restrictions on commercial use
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-restrict-other"
                                                name="restrictOther">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.restrictOther == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'requireNone'], 'restrictOther', 'restrictions_other_specify', true) 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Other, please specify
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                        {saved && errors.restrictions_other_specify ?
                                            <Reminder message={errors.restrictions_other_specify}>
                                                <Form.Control type="text" className='text-capitalize' style={{ color: 'red', border: '1px solid red' }} 
                                                    name='restrictions_other_specify' 
                                                    value={cohort.restrictions_other_specify} 
                                                    placeholder='Max of 200 characters' 
                                                    maxLength='200' 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))
                                                    } 
                                                    onBlur={() => 
                                                        populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')
                                                    } 
                                                    disabled={!cohort.restrictOther} />
                                            </Reminder> : 
                                            <Form.Control type="text" className='text-capitalize'
                                                name='data_collected_other_specify' 
                                                value={cohort.restrictions_other_specify}
                                                placeholder='Max of 200 characters' 
                                                maxLength='200' 
                                                onChange={e => 
                                                    !isReadOnly && dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))
                                                } 
                                                onBlur={() => 
                                                    populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')
                                                }
                                                readOnly={!cohort.restrictOther || isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>

                                {/* A.13 Strategies Used */}
                                <Form.Group as={Row}>
                                    <Form.Label column sm="12">
                                        A.13 What strategies does your cohort use to engage participants?<span style={{ color: 'red' }}>*</span> (Select all that apply)
                                        {errors.strategy && saved && 
                                            <div>
                                                <span style={{ color: 'red', marginLeft: '10px' }}>
                                                    {errorMsg}
                                                </span>
                                            </div>
                                        }
                                    </Form.Label>
                                    <Col sm="12">
                                        <div key="checkbox">
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-routine"
                                                name="strategy_routine">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_routine == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_routine') 
                                                    }/>
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Nothing beyond mailing questionnaires or other routine contacts
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-mailing"
                                                name="strategy_mailing">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_mailing == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategyRoutine', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_mailing') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Send newsletters or other general mailings (e.g., birthday cards)
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-aggregate-study"
                                                name="strategy_aggregate_study">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_aggregate_study == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategyRoutine', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_aggregate_study') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Return aggregate study results (e.g., recent findings)
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-individual-study"
                                                name="strategy_individual_study">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_individual_study == 1} 
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategyRoutine', 'strategy_invitation', 'strategy_other'], 'strategy_individual_study') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Individual study results (e.g., nutrient values)
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-invitation"
                                                name="strategy_invitation">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_invitation == 1}
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_routine', 'strategy_other'], 'strategy_invitation') 
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Invite participation on research committees
                                                </Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="checkbox" 
                                                className="pl-0"
                                                id="default-strategy-other"
                                                name="strategy_other">
                                                <Form.Check.Input bsPrefix
                                                    type="checkbox" 
                                                    className="mr-2" 
                                                    checked={cohort.strategy_other == 1}
                                                    onChange={e => 
                                                        !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategyRoutine'], 'strategy_other', 'strategy_other_specify', true) 
                                                    }/>
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Other, please specify
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                        {saved && errors.strategy_other_specify ?
                                            <Reminder message={errors.strategy_other_specify}>
                                                <Form.Control type="text" className='text-capitalize' style={{ color: 'red', border: '1px solid red' }} 
                                                    name='strategy_other_specify' 
                                                    value={cohort.strategy_other_specify} 
                                                    placeholder='Max of 200 characters' 
                                                    maxLength='200' 
                                                    onChange={e => 
                                                        !isReadOnly && dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))
                                                    } 
                                                    onBlur={() => 
                                                        populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')
                                                    } 
                                                    disabled={!cohort.strategy_other} />
                                            </Reminder> : 
                                            <Form.Control type="text" className='text-capitalize'
                                                name='strategy_other_specify' 
                                                value={cohort.strategy_other_specify}
                                                placeholder='Max of 200 characters' 
                                                maxLength='200' 
                                                onChange={e => 
                                                    !isReadOnly && dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))
                                                } 
                                                onBlur={() => 
                                                    populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')
                                                } 
                                                readOnly={!cohort.strategy_other || isReadOnly} />
                                        }
                                    </Col>
                                </Form.Group>
                             </CollapsiblePanel>
                            
                            {/* Documents */}
                            <CollapsiblePanel
                                condition={activePanel === 'panelE'}
                                onClick={() => setActivePanel(activePanel === 'panelE' ? '' : 'panelE')}
                                panelTitle="Documents">
                                <div id='question15' className='col-md-12' style={{ paddingLeft: window.innerWidth <= 1000 ? '0' : '', paddingTop: '10px', paddingBottom: '10px' }}>
                                    <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                        <label style={{ paddingLeft: '0' }}>A.14 {' '} Required Documents</label>
                                        <p style={{ fontSize: '16px' }}>As indicated on the CEDCD Approval Form, we are requesting the following items for inclusion on the CEDCD website. If you provided approval to post this information, please attach the documents and return them with this form. If they are already available on a publicly accessible website, please just provide the website address.</p>
                                    </div>
                                    <div className='col-md-12'>
                                        {window.innerWidth <= 800 ?
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#01857b', color: 'white' }}>Questionnarie</th>
                                                        <td style={{ padding: '0' }}>
                                                            <table style={{ width: '100%', height: '100%', marginBottom: '0' }} className='table '>
                                                                <tbody>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                        <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='questionnaire_url' id='questionnaire_url' readOnly={isReadOnly} value={cohort.questionnaire_url} onChange={e => dispatch(allactions.cohortActions.questionnaire_url(e.target.value))} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                        <td>
                                                                        {
                                                                            !isReadOnly && 
                                                                            <div className="input-group">
                                                                                <div className="custom-file">
                                                                                    <input
                                                                                    type="file"
                                                                                    className="custom-file-input"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile01"
                                                                                    aria-describedby="inputGroupFileAddon01"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onChange={e => !isReadOnly && handleUpload(e.target.files, 0)} />
                                                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                                    Choose Files
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <div>
                                                                            {cohort.questionnaireFileName.length > 0 && <span>{cohort.questionnaireFileName[0].filename}{' '} {!isReadOnly && <span>(
                                                                                <span class="closer" onClick={() => deleteFileFromList('questionnaireFileName', cohort.questionnaireFileName[0].filename, cohort.questionnaireFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                            {cohort.questionnaireFileName.length > 1 && <a href='#' onClick={() => showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName)}>{' '}and {cohort.questionnaireFileName.length-1} more</a>}
                                                                        </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#01857b', color: 'white' }}>Main cohort protocol</th>
                                                        <td style={{ padding: '0' }}>
                                                            <table style={{ width: '100%', height: '100%', marginBottom: '0' }} className='table '>
                                                                <tbody>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                        <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='main_cohort_url' id='main_cohort_url' disabled={isReadOnly} value={cohort.main_cohort_url} onChange={e => dispatch(allactions.cohortActions.main_cohort_url(e.target.value))} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                        <td>
                                                                        {
                                                                            !isReadOnly && 
                                                                            <div className="input-group">
                                                                                <div className="custom-file">
                                                                                    <input
                                                                                    type="file"
                                                                                    className="custom-file-input"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile02"
                                                                                    aria-describedby="inputGroupFileAddon02"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onChange={e => handleUpload(e.target.files, 1)} />
                                                                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                                                                    Choose Files
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <div>
                                                                            {cohort.mainFileName.length > 0 && <span>{cohort.mainFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                                <span class="closer" onClick={() => deleteFileFromList('mainFileName', cohort.mainFileName[0].filename, cohort.mainFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                            {cohort.mainFileName.length > 1 && <a href='#' onClick={() => showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)}>{' '}and {cohort.mainFileName.length-1} more</a>}
                                                                        </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#01857b', color: 'white' }}>Data sharing policy</th>
                                                        <td style={{ padding: '0' }}>
                                                            <table style={{ width: '100%', height: '100%', marginBottom: '0' }} className='table '>
                                                                <tbody>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                        <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='data_url' id='data_url' disabled={isReadOnly} value={cohort.data_url} onChange={e => dispatch(allactions.cohortActions.data_url(e.target.value))} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                        <td>
                                                                        {
                                                                            !isReadOnly && 
                                                                            <div className="input-group">
                                                                                <div className="custom-file">
                                                                                    <input
                                                                                    type="file"
                                                                                    className="custom-file-input"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile03"
                                                                                    aria-describedby="inputGroupFileAddon03"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onChange={e => handleUpload(e.target.files, 2)} />
                                                                                    <label className="custom-file-label" htmlFor="inputGroupFile03">
                                                                                    Choose Files
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                     }
                                                                    <div>
                                                                        {cohort.dataFileName.length > 0 && <span>{cohort.dataFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                            <span class="closer" onClick={() => deleteFileFromList('dataFileName', cohort.dataFileName[0].filename, cohort.dataFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                        {cohort.dataFileName.length > 1 && <a href='#' onClick={() => showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)}>{' '}and {cohort.dataFileName.length-1} more</a>}
                                                                    </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#01857b', color: 'white' }}>Biospecimen sharing policy</th>
                                                        <td style={{ padding: '0' }}>
                                                            <table style={{ width: '100%', height: '100%', marginBottom: '0' }} className='table '>
                                                                <tbody>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                        <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='specimen_url' id='specimen_url' disabled={isReadOnly} value={cohort.specimen_url} onChange={e => dispatch(allactions.cohortActions.specimen_url(e.target.value))} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                        <td>
                                                                        {
                                                                            !isReadOnly && 
                                                                            <div className="input-group">
                                                                                <div className="custom-file">
                                                                                    <input
                                                                                    type="file"
                                                                                    className="custom-file-input"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile04"
                                                                                    aria-describedby="inputGroupFileAddon04"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onChange={e => handleUpload(e.target.files, 3)} />
                                                                                    <label className="custom-file-label" htmlFor="inputGroupFile04">
                                                                                    Choose Files
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }       
                                                                        <div>
                                                                            {cohort.specimenFileName.length > 0 && <span>{cohort.specimenFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                                <span class="closer" onClick={() => deleteFileFromList('specimenFileName', cohort.specimenFileName[0].filename, cohort.specimenFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                            {cohort.specimenFileName.length > 1 && <a href='#' onClick={() => showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)}>{' '}and {cohort.specimenFileName.length-1} more</a>}
                                                                        </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#01857b', color: 'white' }}>Publication (authorship) policy</th>
                                                        <td style={{ padding: '0' }}>
                                                            <table style={{ width: '100%', height: '100%', marginBottom: '0' }} className='table '>
                                                                <tbody>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                        <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='publication_url' value={cohort.publication_url} id='publication_url' onChange={e => dispatch(allactions.cohortActions.publication_url(e.target.value))} disabled={isReadOnly} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                        <td >
                                                                        {
                                                                            !isReadOnly && 
                                                                            <div className="input-group">
                                                                                <div className="custom-file">
                                                                                    <input
                                                                                    type="file"
                                                                                    className="custom-file-input"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile05"
                                                                                    aria-describedby="inputGroupFileAddon05"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onChange={e => handleUpload(e.target.files, 4)} />
                                                                                    <label className="custom-file-label" htmlFor="inputGroupFile05">
                                                                                    Choose Files
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        <div>
                                                                            {cohort.publicationFileName.length > 0 && <span>{cohort.publicationFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                                <span class="closer" onClick={() => deleteFileFromList('publicationFileName', cohort.publicationFileName[0].filename, cohort.publicationFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                            {cohort.publicationFileName.length > 1 && <a href='#' onClick={() => showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)}>{' '}and {cohort.publicationFileName.length-1} more</a>}
                                                                        </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            <div className="table-responsive">
                                                <table className='table table-stripe'>
                                                    <thead>
                                                        <tr>
                                                            <th className='col-sm-3' style={{ textAlign: 'center' }}>Document</th>
                                                            <th style={{ textAlign: 'center' }}>Website URL (preferred)</th>
                                                            <th style={{ textAlign: 'center' }}>Attached (if url not applicable)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Questionnaires</td>
                                                            <td>
                                                               <input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='questionnaire_url' id='questionnaire_url' value={cohort.questionnaire_url} onChange={e => { dispatch(allactions.cohortActions.questionnaire_url(e.target.value)) }} readOnly={isReadOnly} /></td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                                {
                                                                    !isReadOnly && 
                                                                    <div className="input-group">
                                                                        <div className="custom-file">
                                                                            <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            name='cohortFile'
                                                                            id="inputGroupFile01"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            multiple readOnly={isReadOnly}
                                                                            onChange={e => !isReadOnly && handleUpload(e.target.files, 0)} />
                                                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                            Choose Files
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div>
                                                                    {cohort.questionnaireFileName.length > 0 && <span>{cohort.questionnaireFileName[0].filename}{' '} {!isReadOnly && <span>(
                                                                        <span class="closer" onClick={() => deleteFileFromList('questionnaireFileName', cohort.questionnaireFileName[0].filename, cohort.questionnaireFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                    {cohort.questionnaireFileName.length > 1 && <a href='#' onClick={() => showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName)}>{' '}and {cohort.questionnaireFileName.length-1} more</a>}
                                                                </div>
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>Main cohort protocol</td>
                                                            <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='main_cohort_url' id='main_cohort_url' value={cohort.main_cohort_url} onChange={e => { dispatch(allactions.cohortActions.main_cohort_url(e.target.value)) }} readOnly={isReadOnly} /></td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                                {
                                                                    !isReadOnly && 
                                                                    <div className="input-group">
                                                                        <div className="custom-file">
                                                                            <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            name='cohortFile'
                                                                            id="inputGroupFile02"
                                                                            aria-describedby="inputGroupFileAddon02"
                                                                            multiple readOnly={isReadOnly}
                                                                            onChange={e => handleUpload(e.target.files, 1)} />
                                                                            <label className="custom-file-label" htmlFor="inputGroupFile02">
                                                                            Choose Files
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div>
                                                                    {cohort.mainFileName.length > 0 && <span>{cohort.mainFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                        <span class="closer" onClick={() => deleteFileFromList('mainFileName', cohort.mainFileName[0].filename, cohort.mainFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                    {cohort.mainFileName.length > 1 && <a href='#' onClick={() => showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)}>{' '}and {cohort.mainFileName.length-1} more</a>}
                                                                </div>

                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td>Data sharing policy</td>
                                                            <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='data_url' id='data_url' value={cohort.data_url} onChange={e => { dispatch(allactions.cohortActions.data_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                            {
                                                                    !isReadOnly && 
                                                                    <div className="input-group">
                                                                        <div className="custom-file">
                                                                            <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            name='cohortFile'
                                                                            id="inputGroupFile03"
                                                                            aria-describedby="inputGroupFileAddon03"
                                                                            multiple readOnly={isReadOnly}
                                                                            onChange={e => handleUpload(e.target.files, 2)} />
                                                                            <label className="custom-file-label" htmlFor="inputGroupFile03">
                                                                            Choose Files
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                            }
                                                                <div>
                                                                    {cohort.dataFileName.length > 0 && <span>{cohort.dataFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                        <span class="closer" onClick={() => deleteFileFromList('dataFileName', cohort.dataFileName[0].filename, cohort.dataFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                    {cohort.dataFileName.length > 1 && <a href='#' onClick={() => showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)}>{' '}and {cohort.dataFileName.length-1} more</a>}
                                                                </div>
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td>Biospecimen sharing policy</td>
                                                            <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='specimen_url' id='specimen_url' value={cohort.specimen_url} onChange={e => { dispatch(allactions.cohortActions.specimen_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                            {
                                                                    !isReadOnly && 
                                                                    <div className="input-group">
                                                                        <div className="custom-file">
                                                                            <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            name='cohortFile'
                                                                            id="inputGroupFile04"
                                                                            aria-describedby="inputGroupFileAddon04"
                                                                            multiple readOnly={isReadOnly}
                                                                            onChange={e => handleUpload(e.target.files, 3)} />
                                                                            <label className="custom-file-label" htmlFor="inputGroupFile04">
                                                                            Choose Files
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                }       
                                                                <div>
                                                                    {cohort.specimenFileName.length > 0 && <span>{cohort.specimenFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                        <span class="closer" onClick={() => deleteFileFromList('specimenFileName', cohort.specimenFileName[0].filename, cohort.specimenFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                    {cohort.specimenFileName.length > 1 && <a href='#' onClick={() => showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)}>{' '}and {cohort.specimenFileName.length-1} more</a>}
                                                                </div>

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Publication(authorship) policy</td>
                                                            <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='publication_url' value={cohort.publication_url} id='publication_url' onChange={e => { dispatch(allactions.cohortActions.publication_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                            {
                                                                    !isReadOnly && 
                                                                    <div className="input-group">
                                                                        <div className="custom-file">
                                                                            <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            name='cohortFile'
                                                                            id="inputGroupFile05"
                                                                            aria-describedby="inputGroupFileAddon05"
                                                                            multiple readOnly={isReadOnly}
                                                                            onChange={e => handleUpload(e.target.files, 4)} />
                                                                            <label className="custom-file-label" htmlFor="inputGroupFile05">
                                                                            Choose Files
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div>
                                                                    {cohort.publicationFileName.length > 0 && <span>{cohort.publicationFileName[0].filename}{' '}{!isReadOnly && <span>(
                                                                        <span class="closer" onClick={() => deleteFileFromList('publicationFileName', cohort.publicationFileName[0].filename, cohort.publicationFileName[0].fileId, cohortID)}>x</span>)</span>}</span>}
                                                                    {cohort.publicationFileName.length > 1 && <a href='#' onClick={() => showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)}>{' '}and {cohort.publicationFileName.length-1} more</a>}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </CollapsiblePanel>
                        </CollapsiblePanelContainer>
                    </Form>
                </div>

                <div style={{ position: 'relative' }} className="my-4">
                    <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0' }}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' disabled />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('B')} />
                    </span>
                    {!isReadOnly ?
                        <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                            <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                                <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus) || isReadOnly} />
                            </span>
                            <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                                <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus) || isReadOnly} style={{ marginRight: '5px', marginBottom: '5px' }} />
                            </span>
                            <span className='col-xs-4' onClick={() => resetCohortStatus(cohortID, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A !== 'complete' || section.B !== 'complete' || section.C !== 'complete' || section.D !== 'complete' || section.E !== 'complete' || section.F !== 'complete' || section.G !== 'complete'} /></span>
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

                {
                    // fileListShow && file_list(fileListTile, currentFileListName, currentFileList)
                }
                
            </div>
        </div>
    )
}

export default CohortForm