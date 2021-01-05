import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Person from '../Person/Person'
import Investigator from '../Investigator/Investigator'
import DatePicker from 'react-datepicker';
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../controls/modal/modal'
import FileModal from '../controls/modal/FileModal.js'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';

import "react-datepicker/dist/react-datepicker.css";
import './CohortForm.scss'
import cohortErrorActions from '../../actions/cohortErrorActions'

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
        if (!cohort.hasLoaded) {
            dispatch(allactions.cohortIDAction.setCohortId(tempId))
            fetch(`/api/questionnaire/cohort_basic_info/${tempId}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
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

                            if (completer && collaborator.collaboratorEmail === completer.completerEmail) {
                                dispatch(allactions.cohortActions.sameAsSomeone(0))
                            }
                            else if (contacter && collaborator.collaboratorEmail === contacter.contacterEmail) {
                                dispatch(allactions.cohortActions.sameAsSomeone(1))
                            }
                            else {
                                dispatch(allactions.cohortActions.sameAsSomeone(-1))
                            }
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
                            if (currentCohort.enrollment_target >= 0) dispatch(allactions.cohortErrorActions.enrollment_target(true))
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

                        if (currentCohort.requireNone || currentCohort.requirecollab || currentCohort.requireIrb || currentCohort.requireData || currentCohort.restrictGenoInfo || currentCohort.restrictOtherDb || currentCohort.restrictCommercial || currentCohort.restrictOther) { dispatch(allactions.cohortErrorActions.requirements(true)) }
                        if (currentCohort.strategy_routine || currentCohort.strategy_mailing || currentCohort.strategy_aggregate_study || currentCohort.strategy_individual_study || currentCohort.strategy_invitation || currentCohort.strategy_other) { dispatch(allactions.cohortErrorActions.strategy(true)) }

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
            dispatch(allactions.cohortErrorActions.enrollment_age_min(true))
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
        if (result) {
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
                if (name) dispatch(allactions.cohortErrorActions.collaboratorName(true))
                dispatch(allactions.cohortActions.collaboratorPosition(position))
                if (position) dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                dispatch(allactions.cohortActions.collaboratorPhone(phone))
                if (phone && !getValidationResult(phone, false, 'phone')) dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                dispatch(allactions.cohortActions.collaboratorEmail(email))
                if (email && !getValidationResult(email, true, 'email')) dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
            })

        } else if (personType === 'contacter') {
            dispatch(allactions.cohortActions.clarification_contact(checkedValue))
            if (name) dispatch(allactions.cohortErrorActions.contacterName(true))
            dispatch(allactions.cohortActions.contacterName(name))
            if (position) dispatch(allactions.cohortErrorActions.contacterPosition(true))
            dispatch(allactions.cohortActions.contacterPosition(position))
            if (phone && !getValidationResult(phone, false, 'phone')) dispatch(allactions.cohortErrorActions.contacterPhone(true))
            dispatch(allactions.cohortActions.contacterPhone(phone))
            if (email && !getValidationResult(email, true, 'email')) dispatch(allactions.cohortErrorActions.contacterEmail(true))
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
                    <div className='col-xs-12' style={{ marginBottom: '3px', paddingLeft: '0' }}>
                        <span className='col-xs-10'>{f.filename}</span>
                        {!isReadOnly && <span className='col-xs-2 closer' onClick={() => deleteFileFromList(fileListName, f.fileId, cohortID)}>x</span>}
                    </div>)}
            </div>
            {/*to be removed*/}
            {/*<hr style={{ border: '0', clear: 'both', display: 'block', marginTop: '8px', marginBottom: '5px', backgroundColor: '#f2f2f2', height: '1px'}}/>
            <div className='col-xs-12' style={{height: '40px'}} onClick={()=> setFileListShow(false)}>          
                <input type='button' className='col-sm-offset-10 col-sm-2 col-xs-12 btn btn-primary' value='Close' />
            </div> */}
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

    const deleteFileFromList = (fileListName, fileId, cohort_ID) => {
        fetch(`/api/questionnaire/deleteFile`, {
            method: "POST",
            body: JSON.stringify({ id: fileId, cohortId: cohort_ID }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                if (result && result.status == 200) {
                    batch(() => {
                        console.dir('before deleting: ' + cohort[fileListName])
                        let resultList = cohort[fileListName].filter(r => r.fileId != fileId)
                        console.dir('after deleting: ' + resultList)
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

    return <div id='cohortContainer' className='container-fluid'>
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
<<<<<<< HEAD
        <FileModal show={fileModal} handleClose={() => setFileModal(false)} title={<div style={{ height: '100%', color: 'white' }}><span className='col-xs-10'><h4><b>{fileListTile}</b></h4></span><span className='col-xs-2 upperCloser' style={{ textAlign: 'center' }} onClick={() => setFileModal(false)}><h4>X</h4></span>
        </div>} body={file_list(fileListTile, currentFileListName, currentFileList, deleteFileFromList)} footer={<div className='col-xs-12' style={{ height: '40px' }} onClick={() => setFileModal(false)}> <input type='button' className='col-sm-offset-10 col-sm-2 col-xs-12 btn btn-primary' value='Close' /></div>} />
=======
        <FileModal show={fileModal} handleClose={() => setFileModal(false)}  body={file_list(fileListTile, currentFileListName, currentFileList, deleteFileFromList)} footer={<div className='col-xs-12' style={{height: '40px'}} onClick={()=> setFileModal(false)}> <input type='button' className='col-sm-offset-10 col-sm-2 col-xs-12 btn btn-primary' value='Close' /></div>}/> 
>>>>>>> cedcd-new-feature
        <div className='col-md-12'>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts
            </div>
            <div>
                <form id='currentForm'>
                    <CollapsiblePanel
                        condition={activePanel === 'panelA'}
                        onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                        panelTitle="Cohort Information">
                        <div className='form-group col-md-12'>
                            <div className='col-md-4' style={{ marginBottom: '5px' }}><b>A.1a Cohort Name</b></div>
                            <div className='col-md-8'>{cohort.cohort_name}</div>
                        </div>
                        <div className='form-group col-md-12' >
                            <span htmlFor='cohortAcronym' className='col-md-4'><b>A.1b Cohort Abbreviation</b></span>
                            <span className='col-md-5'>
                                <span  >{cohort.cohort_acronym}</span>
                            </span>
                        </div>
                        <div id='question7' className='col-md-12'>
                            <div className='col-md-12'>
                                <label style={{ paddingLeft: '0' }}>A.2{' '}Cohort Description</label>
                                <p style={{ fontSize: '16px' }}>Please provide a short paragraph describing your cohort. This will be used as an overall narrative description of your cohort on the CEDCD website.  You may provide a link to a description on your cohort’s website.</p>
                            </div>
                            <div style={{ paddingLeft: window.innerWidth <= 1000 ? '15px' : '' }}>
                                <span className='col-md-12'><textarea style={{ height: '100%' }} className='form-control' name='cohortDes' cols='20' rows='15' placeholder='(Max of 5000 characters)' maxLength='5000' style={{ resize: 'none', fontFamily: '"PT Sans", Arial, sans-serif', fontSize: '16px' }} value={cohort.cohort_description} onChange={e => dispatch(allactions.cohortActions.cohort_description(e.target.value))} readOnly={isReadOnly} /></span>
                            </div>
                        </div>
                        <div id='question6' className='col-md-12' style={{ marginTop: window.innerWidth > 800 ? '15px' : '' }}>
                            <div className='col-xs-12' style={{ marginBottom: '5px' }}>
                                <label className='col-md-6' style={{ paddingLeft: '0' }}>A.3{' '}Does the cohort have a website ? Please specify if applicable</label>
                            </div>
                            {window.innerWidth <= 1000 ?
                                <div className='col-xs-12' style={{}}>
                                    {errors.cohort_web_site && saved ? <Reminder message={errors.cohort_web_site}><span className='col-xs-12' style={{ margin: '0', paddingLeft: '0', paddingRight: '10px' }}><input style={{ border: '1px solid red' }} placeholder='Max of 200 characters' maxLength='200' className='form-control' name='cohort_web_site' value={cohort.cohort_web_site} onChange={e => dispatch(allactions.cohortActions.cohort_web_site(e.target.value))} onBlur={(e) => { populateErrors('cohort_web_site', e.target.value, false, 'string') }} readOnly={isReadOnly} /></span></Reminder> : <span className='col-xs-12' style={{ margin: '0', paddingLeft: '0', paddingRight: '30px' }}><input className='form-control' placeholder='Max of 200 characters' maxLength='200' name='cohort_web_site' value={cohort.cohort_web_site} onChange={e => dispatch(allactions.cohortActions.cohort_web_site(e.target.value))} onBlur={(e) => { populateErrors('cohort_web_site', e.target.value, false, 'string') }} readOnly={isReadOnly} /></span>}
                                </div>
                                :
                                <div className='col-md-8' style={{ maxWidth: '690px' }}>
                                    {errors.cohort_web_site && saved ? <Reminder message={errors.cohort_web_site}><span className='col-md-12' style={{ margin: '0', padding: '0' }}><input style={{ border: '1px solid red' }} placeholder='Max of 200 characters' maxLength='200' className='form-control' name='cohort_web_site' value={cohort.cohort_web_site} onChange={e => dispatch(allactions.cohortActions.cohort_web_site(e.target.value))} onBlur={(e) => { populateErrors('cohort_web_site', e.target.value, false, 'string') }} readOnly={isReadOnly} /></span></Reminder> : <span className='col-md-12' style={{ margin: '0', padding: '0' }}><input className='form-control' name='cohort_web_site' placeholder='Max of 200 characters' maxLength='200' value={cohort.cohort_web_site} onChange={e => dispatch(allactions.cohortActions.cohort_web_site(e.target.value))} onBlur={(e) => { populateErrors('cohort_web_site', e.target.value, false, 'string') }} readOnly={isReadOnly} /></span>}
                                </div>
                            }
                        </div>
                        <div className='form-group col-xs-12' style={{ marginTop: window.innerWidth > 800 ? '15px' : '8px' }}>
                            <div className='col-xs-12'>
                                <label className='col-md-4 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', marginRight: '0', width: '298px', lineHeight: '2em' }}>A.4 Date Form Completed<span style={{ color: 'red' }}>*</span></label>
                                <span className='col-md-4 col-xs-12' style={{ marginLeft: '0', paddingLeft: '0', paddingRight: '0' }}>
                                    {errors.completionDate && saved ? <Reminder message={errors.completionDate}><span className='col-md-12' style={{ padding: '0' }}><DatePicker className='form-control errorDate' placeholderText='MM/DD/YYYY' selected={cohort.completionDate ? new Date(cohort.completionDate) : null} onChange={date => {
                                        dispatch(allactions.cohortActions.completionDate(date)); if (!date) { dispatch(allactions.cohortErrorActions.completionDate(false, errorMsg)) } else {
                                            dispatch(allactions.cohortErrorActions.completionDate(true))
                                        }
                                    }} /></span></Reminder> : <span className='col-xs-12' style={{ padding: '0' }}><DatePicker className='form-control' placeholderText='MM/DD/YYYY' selected={cohort.completionDate ? new Date(cohort.completionDate) : null} onChange={date => {
                                        dispatch(allactions.cohortActions.completionDate(date)); if (!date) { dispatch(allactions.cohortErrorActions.completionDate(false, errorMsg)) } else {
                                            dispatch(allactions.cohortErrorActions.completionDate(true))
                                        }
                                    }} readOnly={isReadOnly} /></span>}
                                </span>
                            </div>
                        </div>
                        <div id='question3' className='col-xs-12' style={{ paddingBottom: '10px' }}>
                            <div id='a3a' className='col-xs-12' style={{ paddingLeft: '0', marginBottom: window.innerWidth > 800 ? '15px' : '12px' }}>
                                <div className='col-xs-12' style={{ marginBottom: '5px' }}><b>A.5a{' '}Person who completed the form:</b><span style={{ color: 'red' }}>*</span></div>
                                <div className='col-md-8' style={{ paddingLeft: '0', paddingRight: '10px' }}>
                                    <Person id='completerInfo' type='completerCountry' name='completerName' position='completerPosition' phone='completerPhone' email='completerEmail' colWidth='12' errors={errors} disabled={isReadOnly} displayStyle={saved} />
                                </div>
                            </div>
                            {window.innerWidth <= 1000 ? <div id='a3b' className='col-xs-12' style={{ paddingLeft: '0' }}>
                                <div style={{ marginBottom: '5px', paddingLeft: '15px' }}><b>A.5b{' '}Contact Person for Clarification of this form</b><span style={{ color: 'red' }}>*</span></div>
                                <div style={{ marginBottom: '20px' }}><span className='col-xs-8' style={{ marginRight: '0' }}>Is this the same person who completed the form ?</span>
                                    {errors.clarification_contact && saved ? <Reminder message={errors.clarification_contact}><span style={{ paddingLeft: '0', marginLeft: '0', marginRight: '10px', color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 0} onClick={() => dispatch(allactions.cohortActions.clarification_contact(0))} />{' '}No</span></Reminder> :
                                        <span style={{ paddingLeft: '0', marginLeft: '0', marginRight: '10px' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 0} onClick={() => { !isReadOnly && dispatch(allactions.cohortActions.clarification_contact(0)) }} />{' '}No</span>
                                    }

                                    {errors.clarification_contact && saved ? <Reminder message={errors.clarification_contact}><span style={{ paddingLeft: '0', color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 1} onClick={() => dispatch(allactions.cohortActions.clarification_contact(1))} />{' '}Yes</span></Reminder> :
                                        <span style={{ paddingLeft: '0' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 1} onClick={(e) => { !isReadOnly && setPerson(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, 1, 'contacter') }} />{' '}Yes</span>
                                    }
                                </div>
                                <Person type='contacterCountry' name='contacterName' position='contacterPosition' phone='contacterPhone' email='contacterEmail' colWidth='12' errors={errors} disabled={cohort.clarification_contactm || isReadOnly} displayStyle={saved} leftPadding='0' />
                            </div> :
                                <div id='a3b' className='col-xs-12'>
                                    <div style={{ marginBottom: '5px' }}><b>A.5b{' '}Contact Person for Clarification of this form</b><span style={{ color: 'red' }}>*</span></div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <span className='col-md-6' style={{ paddingLeft: '0', marginRight: '0' }}>Is this the person to contact with questions about this form?</span>
                                        {errors.clarification_contact && saved ? <Reminder message={errors.clarification_contact}><span style={{ paddingLeft: '0', marginLeft: '0', marginRight: '10px', color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 0} onClick={() => dispatch(allactions.cohortActions.clarification_contact(0))} />{' '}No</span></Reminder> :
                                            <span style={{ paddingLeft: '0', marginLeft: '0', marginRight: '10px' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 0} onClick={() => { !isReadOnly && dispatch(allactions.cohortActions.clarification_contact(0)) }} />{' '}No</span>
                                        }

                                        {errors.clarification_contact && saved ? <Reminder message={errors.clarification_contact}><span style={{ paddingLeft: '0', color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 1} onClick={(e) => setPerson(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, 1, 'contacter')} />{' '}Yes</span></Reminder> :
                                            <span style={{ paddingLeft: '0' }}><input type='radio' name='clarification_contact' checked={cohort.clarification_contact === 1} onClick={(e) => { !isReadOnly && setPerson(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, 1, 'contacter') }} />{' '}Yes</span>
                                        }
                                    </div>
                                    <div id='contacterInfo' className='col-md-8' style={{ paddingLeft: '0' }}>
                                        <Person type='contacterCountry' name='contacterName' position='contacterPosition' phone='contacterPhone' email='contacterEmail' colWidth='12' errors={errors} disabled={cohort.clarification_contact || isReadOnly} displayStyle={saved} leftPadding='0' />
                                    </div>
                                </div>
                            }
                        </div>
                    </CollapsiblePanel>
                    <CollapsiblePanel
                        condition={activePanel === 'panelB'}
                        onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                        panelTitle="Principal Investigators">
                        <div id='question4' className='col-md-12' style={{ paddingTop: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '15px' }}>
                                <label className='col-md-3' style={{ paddingLeft: '0', lineHeight: '1.5em' }}>A.6{' '} Cohort Principal Investigator(s)</label>
                                <span className='col-md-3'>
                                    <button className='btn btn-primary btn-sm' onClick={(e) => { e.preventDefault(); dispatch(allactions.cohortActions.addInvestigator()); let idx = cohort.investigators.length; dispatch(allactions.cohortErrorActions.investigatorName(idx, false, errorMsg)); dispatch(allactions.cohortErrorActions.investigatorInstitution(idx, false, errorMsg)); dispatch(allactions.cohortErrorActions.investigatorEmail(idx, false, errorMsg)) }} style={{ position: 'absolute', left: 0 }} disabled={isReadOnly}>Add New Investigator</button></span>
                            </div>
                            <div className={window.innerWidth <= 1000 ? 'col-xs-12' : 'col-md-12'} style={{ paddingLeft: '0' }}>
                                {
                                    cohort.investigators.map((item, idx) => <div className='col-md-12'><Investigator key={idx} id={'investigator_' + idx} name={'investigator_name_' + idx} institution={'investigator_inst_' + idx} email={'investigator_email_' + idx} handleRemove={removeInvestigator} errors={errors} disabled={isReadOnly} displayStyle={saved} /></div>
                                    )
                                }
                            </div>
                        </div>
                        <div id='question5' className={window.innerWidth <= 1000 ? 'col-xs-12' : 'col-md-12'} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px', marginRight: '0' }}>
                                <label style={{ paddingLeft: '0' }}>A.7{' '}If an investigator is interested in collaborating with your cohort on a new project, whom should they contact?</label>
                            </div>
                            <Person id='collaborator' type='collaboratorCountry' name='collaboratorName' position='collaboratorPosition' phone='collaboratorPhone' email='collaboratorEmail' colWidth='7' errors={errors} disabled={cohort.sameAsSomeone === 0 || cohort.sameAsSomeone === 1 || isReadOnly} displayStyle={saved} />
                            <div className='col-md-5' style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <input type='checkbox' name='sameAsCompleted' checked={cohort.sameAsSomeone === 0} onClick={(e) => { !isReadOnly && setPerson(e, cohort.completerName, cohort.completerPosition, cohort.completerPhone, cohort.completerEmail, 0, 'collaborator') }} />{' '}
                                    <span htmlFor='sameAsCompleted'>Same as the person who completed the form(5a) </span>
                                </div>

                                <div style={{ margin: '0', padding: '0', minWidth: '500px' }}>
                                    <input type='checkbox' name='sameAsContacted' checked={cohort.sameAsSomeone === 1} onClick={(e) => { !isReadOnly && setPerson(e, cohort.contacterName, cohort.contacterPosition, cohort.contacterPhone, cohort.contacterEmail, 1, 'collaborator') }} />{' '}
                                    <span htmlFor='sameAsContacted' style={{ padding: '0', margin: '0' }}>{' '} Same as the contact person for clarification of this form(5b) </span>
                                </div>

                            </div>
                        </div>
                    </CollapsiblePanel>
                    <CollapsiblePanel
                        condition={activePanel === 'panelC'}
                        onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                        panelTitle="Eligibility & Enrollment">

                        <div id='question8' className='col-md-12' style={{ marginBottom: window.innerWidth <= 1000 ? '' : '8px', paddingTop: '5px', display: 'flex', flexDirection: 'column' }}>
                            <div className='col-xs-12' style={{ marginBottom: '5px' }}>
                                <label>A.8{' '}Eligibility Criteria</label>
                            </div>
                            <div>
                                <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '10px' : '15px' }}>
                                    <span className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '10px' }}>
                                        <span className='col-md-2 col-xs-4' style={{ paddingLeft: '0' }}>Eligible sex<span style={{ color: 'red' }}>*</span></span>
                                        {errors.eligible_gender_id && saved ? <span className='col-md-3 col-xs-8' style={{ color: 'red', fontSize: '16px', paddingLeft: '0' }}>{errorMsg}</span> : ''}
                                    </span>
                                    {/*{errors.eligible_gender_id && saved ? <Reminder message={errors.eligible_gender_id}><span style={{ borderBottom: '1px solid red', color: 'red' }}>
                                        <input type='radio' name='eligible_gender_id' value='4' checked={cohort.eligible_gender_id === 4} onChange={() => removeEligbleGenderError(4)} />{' '} All
                                    </span></Reminder> : <span>
                                            <input type='radio' name='eligible_gender_id' value='4' checked={cohort.eligible_gender_id === 4} onChange={() => removeEligbleGenderError(4)} />{' '} All
                            </span>}*/}
                                    <div className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '5px' }}>
                                        <input type='radio' name='eligible_gender_id' value='4' checked={cohort.eligible_gender_id === 4} onChange={() => { !isReadOnly && removeEligbleGenderError(4) }} />{' '} All
                                    </div>
                                    {/*{errors.eligible_gender_id && saved ? <Reminder message={errors.eligible_gender_id}><span className='col-sm-12' style={{ borderBottom: '1px solid red', color: 'red' }}>
                                        <input type='radio' name='eligible_gender_id' value='2' checked={cohort.eligible_gender_id === 2} onChange={() => removeEligbleGenderError(2)} />{' '} Males only
                                    </span></Reminder> : <span>
                                            <input type='radio' name='eligible_gender_id' value='2' checked={cohort.eligible_gender_id === 2} onChange={() => removeEligbleGenderError(2)} />{' '} Males only
                                    </span>}*/}
                                    <div className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '5px' }}>
                                        <input type='radio' name='eligible_gender_id' value='2' checked={cohort.eligible_gender_id === 2} onChange={() => { !isReadOnly && removeEligbleGenderError(2) }} />{' '} Males only
                                    </div>
                                    {/*{errors.eligible_gender_id && saved ? <Reminder message={errors.eligible_gender_id}><span style={{ borderBottom: '1px solid red', color: 'red' }}>
                                        <input type='radio' name='eligible_gender_id' value='1' checked={cohort.eligible_gender_id === 1} onChange={() => removeEligbleGenderError(1)} />{' '} Females only
                                    </span></Reminder> : <span>
                                            <input type='radio' name='eligible_gender_id' value='1' checked={cohort.eligible_gender_id === 1} onChange={() => removeEligbleGenderError(1)} />{' '} Females only
                                </span>}*/}
                                    <div className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '5px' }}>
                                        <input type='radio' name='eligible_gender_id' value='1' checked={cohort.eligible_gender_id === 1} onChange={() => { !isReadOnly && removeEligbleGenderError(1) }} />{' '} Females only
                                    </div>
                                </div>
                                <div className='col-xs-12' style={{ marginBottom: '18px' }}>
                                    <div style={{ paddingLeft: '0', marginBottom: '5px' }}>Baseline population consists of</div>
                                    <div className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '5px' }}>
                                        <input type='checkbox' name='cancerSurvivors' checked={cohort.eligible_disease} onChange={() => dispatch(allactions.cohortActions.eligible_disease())} readOnly={isReadOnly} />{' '} Cancer survivors only, specify cancer site(s)
                                    </div>
                                    <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', marginBottom: window.innerWidth <= 1000 ? '10px' : '20px' }}>
                                        <input name='cancerSites' className='form-control' value={cohort.eligible_disease_cancer_specify} maxLength='100' placeholder='Max of 100 characters' readOnly={!cohort.eligible_disease || isReadOnly} onChange={e => dispatch(allactions.cohortActions.eligible_disease_cancer_specify(e.target.value))} />
                                    </div>
                                    <div className='col-md-12 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                        <div style={{ marginBottom: '5px' }}>Please specify any eligibility criteria in addition to age and sex</div>
                                        <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <span className='col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                <input className='form-control' placeholder='Max of 100 characters' maxLength='100' name='eligible_disease_other_specify' value={cohort.eligible_disease_other_specify} onChange={e => dispatch(allactions.cohortActions.eligible_disease_other_specify(e.target.value))} readOnly={isReadOnly} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='question9' className='col-xs-12'>
                            <div className='col-xs-12' style={{ marginBottom: '5px' }}>
                                <label style={{ paddingLeft: '0' }}>A.9{' '}Enrollment Information</label>
                            </div>
                            <div className='col-xs-12'>
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>
                                    Total number of subjects enrolled to date<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_total && saved ? <Reminder message={errors.enrollment_total}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_total' value={cohort.enrollment_total} onChange={e => dispatch(allactions.cohortActions.enrollment_total(e.target.value))} onBlur={(e) => { populateErrors('enrollment_total', e.target.value, true, 'number') }} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_total' value={cohort.enrollment_total} onChange={e => dispatch(allactions.cohortActions.enrollment_total(e.target.value))} onBlur={(e) => { populateErrors('enrollment_total', e.target.value, true, 'number') }} readOnly={isReadOnly} />}
                                </span>
                            </div>
                            <div className='col-xs-12'>
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}> Started in year<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_year_start && saved ? <Reminder message={errors.enrollment_year_start}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_year_start' placeholder='yyyy' value={cohort.enrollment_year_start} onChange={e => dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_start', e.target.value, true, 'year') }} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_year_start' placeholder='yyyy' value={cohort.enrollment_year_start} onChange={e => dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_start', e.target.value, true, 'year') }} readOnly={isReadOnly} />}
                                </span>
                            </div>
                            <div className='col-xs-12' >
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}> Ended in year<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_year_end && saved ? <Reminder message={errors.enrollment_year_end}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_year_end' placeholder='yyyy' value={cohort.enrollment_year_end} onChange={e => dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_end', e.target.value, true, 'year') }} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enroll
                                EndYear' placeholder='yyyy' value={cohort.enrollment_year_end} onChange={e => dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_end', e.target.value, true, 'year') }} readOnly={isReadOnly} />}
                                </span>
                            </div>
                            <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '3px' : '15px' }}>
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>Is enrollment ongoing?<span style={{ color: 'red' }}>*</span></span>
                                <span className='col-md-1 col-xs-6' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_ongoing && saved ? <Reminder message='Required Field'><span style={{ color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='enrollment_ongoing' value='0' checked={cohort.enrollment_ongoing === 0} onChange={e => {
                                        dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                        dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                        dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                        dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                    }} />{' '}No</span></Reminder> : <span><input type='radio' name='enrollment_ongoing' value='0' checked={cohort.enrollment_ongoing === 0} onChange={e => {
                                        if (!isReadOnly) {
                                            dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                            dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                            dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                            dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                        }
                                    }} />{' '}No</span>}
                                </span>
                                <span className='col-md-1 col-xs-6' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_ongoing && saved ? <Reminder message='Required Field'><span style={{ color: 'red', borderBottom: '1px solid red' }}><input type='radio' name='enrollment_ongoing' value='1' checked={cohort.enrollment_ongoing === 1} onChange={e => {
                                        dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                        dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                        dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                        dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                    }} />{' '}Yes</span></Reminder> : <span><input type='radio' name='enrollment_ongoing' value='1' checked={cohort.enrollment_ongoing === 1} onChange={e => {
                                        if (!isReadOnly) {
                                            dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                            dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                            dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                            dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                        }
                                    }} />{' '}Yes</span>} </span>
                            </div>
                            <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '8px' : '' }}>
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>
                                    If still enrolling, please specify the target number of plan to enroll<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-1' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_target && saved ? <Reminder message={errors.enrollment_target}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_target' value={cohort.enrollment_target} onChange={e => dispatch(allactions.cohortActions.enrollment_target(e.target.value))} onBlur={(e) => { populateErrors('enrollment_target', e.target.value, true, 'number') }} disabled={cohort.enrollment_ongoing == 0} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_target' value={cohort.enrollment_target} onChange={e => dispatch(allactions.cohortActions.enrollment_target(e.target.value))} onBlur={(e) => { populateErrors('enrollment_target', e.target.value, true, 'number') }} readOnly={cohort.enrollment_ongoing == 0 || isReadOnly} />}
                                </span>
                            </div>
                            <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '8px' : '' }}>
                                <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>
                                    If still enrolling, please specify when you plan to complete enrollment<span style={{ color: 'red' }}>*</span>
                                </span>
                                <span className='col-md-1' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                    {errors.enrollment_year_complete && saved ? <Reminder message={errors.enrollment_year_complete}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_year_complete' placeholder='yyyy' value={cohort.enrollment_year_complete} onChange={e => dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_complete', e.target.value, true, 'year') }} disabled={cohort.enrollment_ongoing == 0 || isReadOnly} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_year_complete' placeholder='yyyy' value={cohort.enrollment_year_complete} onChange={e => dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))} onBlur={(e) => { populateErrors('enrollment_year_complete', e.target.value, true, 'year') }} readOnly={cohort.enrollment_ongoing == 0 || isReadOnly} />}
                                </span>

                            </div>

                            <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '8px' : '' }}>
                                <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0', paddingRight: '0' }}>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>Baseline age range of enrolled subjects<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.enrollment_age_min && saved ? <Reminder message={errors.enrollment_age_min}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_age_min' value={cohort.enrollment_age_min} onChange={e => dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))} onBlur={(e) => { populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max) }} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_age_min' value={cohort.enrollment_age_min} onChange={e => dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))} onBlur={(e) => { populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max) }} readOnly={isReadOnly} />}
                                    </span>
                                    <span className='col-md-1 col-xs-1' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', marginLeft: window.innerWidth <= 1000 ? '' : '5px', marginRight: window.innerWidth <= 1000 ? '' : '5px', padding: '0', width: '15px' }}> to </span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                        {errors.enrollment_age_max && saved ? <Reminder message={errors.enrollment_age_max}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_age_max' value={cohort.enrollment_age_max} onChange={e => dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))} onBlur={(e) => { populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min) }} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_age_max' value={cohort.enrollment_age_max} onChange={e => dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))} onBlur={(e) => { populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min) }} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                                <div>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>Median age<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.enrollment_age_median && saved ? <Reminder message={errors.enrollment_age_median}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_age_median' value={cohort.enrollment_age_median} onChange={e => dispatch(allactions.cohortActions.enrollment_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('enrollment_age_median', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_age_median' value={cohort.enrollment_age_median} onChange={e => dispatch(allactions.cohortActions.enrollment_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('enrollment_age_median', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)} readOnly={isReadOnly} />
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}> Mean age<span style={{ color: 'red' }}>*</span> </span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.enrollment_age_mean && saved ? <Reminder message={errors.enrollment_age_mean}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='enrollment_age_mean' value={cohort.enrollment_age_mean} onChange={e => dispatch(allactions.cohortActions.enrollment_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('enrollment_age_mean', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='enrollment_age_mean' value={cohort.enrollment_age_mean} onChange={e => dispatch(allactions.cohortActions.enrollment_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('enrollment_age_mean', e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_max)} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                            </div>
                            <div className='col-xs-12'>
                                <div className='col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0', paddingRight: '0' }}>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>Current age range of enrolled subjects<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.current_age_min && saved ? <Reminder message={errors.current_age_min}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='current_age_min' value={cohort.current_age_min} onChange={e => dispatch(allactions.cohortActions.current_age_min(e.target.value))} onBlur={e => populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='current_age_min' value={cohort.current_age_min} onChange={e => dispatch(allactions.cohortActions.current_age_min(e.target.value))} onBlur={e => populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max)} readOnly={isReadOnly} />}
                                    </span>
                                    <span className='col-md-1 col-xs-1' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', marginLeft: window.innerWidth <= 1000 ? '' : '5px', marginRight: window.innerWidth <= 1000 ? '' : '5px', padding: '0', width: '15px' }}> to </span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                        {errors.current_age_max && saved ? <Reminder message={errors.current_age_max}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='current_age_max' value={cohort.current_age_max} onChange={e => dispatch(allactions.cohortActions.current_age_max(e.target.value))} onBlur={e => populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='current_age_max' value={cohort.current_age_max} onChange={e => dispatch(allactions.cohortActions.current_age_max(e.target.value))} onBlur={e => populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min)} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                                <div>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}>Median age<span style={{ color: 'red' }}>*</span></span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.current_age_median && saved ? <Reminder message={errors.current_age_median}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='current_age_median' value={cohort.current_age_median} onChange={e => dispatch(allactions.cohortActions.current_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('current_age_median', e.target.value, true, cohort.current_age_min, cohort.current_age_max)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='current_age_median' value={cohort.current_age_median} onChange={e => dispatch(allactions.cohortActions.current_age_median(e.target.value))} onBlur={e => populateMeanMedianAgeError('current_age_median', e.target.value, true, cohort.current_age_min, cohort.current_age_max)} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                                <div>
                                    <span className='col-md-7 col-xs-12' style={{ marginBottom: window.innerWidth <= 1000 ? '5px' : '', paddingLeft: '0' }}> Mean age<span style={{ color: 'red' }}>*</span> </span>
                                    <span className='col-md-1 col-xs-12' style={{ paddingLeft: '0', paddingRight: '0', paddingBottom: '5px' }}>
                                        {errors.current_age_mean && saved ? <Reminder message={errors.current_age_mean}><input style={{ paddingLeft: '8px', paddingRight: '0', border: '1px solid red' }} className='form-control' name='current_age_mean' value={cohort.current_age_mean} onChange={e => dispatch(allactions.cohortActions.current_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('current_age_mean', e.target.value, true, cohort.current_age_min, cohort.current_age_max)} /></Reminder> : <input style={{ paddingLeft: '8px', paddingRight: '0' }} className='form-control' name='current_age_mean' value={cohort.current_age_mean} onChange={e => dispatch(allactions.cohortActions.current_age_mean(e.target.value))} onBlur={e => populateMeanMedianAgeError('current_age_mean', e.target.value, true, cohort.current_age_min, cohort.current_age_max)} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CollapsiblePanel>
                    <CollapsiblePanel
                        condition={activePanel === 'panelD'}
                        onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}
                        panelTitle="Requirements & Strategies">
                        <div id='question10' className='col-md-12' style={{ marginBottom: window.innerWidth <= 800 ? '0' : '15px' }}>
                            <div className='col-md-12' style={{ marginBottom: '13px' }}>
                                <label className='col-md-8' style={{ padding: '0', margin: '0' }}>A.10{' '}Specify the frequency of questionnaires, e.g, annually, every 2 years etc.<span style={{ color: 'red' }}>*</span></label>
                            </div>
                            <div className='col-md-8'>
                                <span className='col-md-12' style={{ paddingLeft: '0', paddingRight: '6px', marginLeft: '0' }}>
                                    {errors.time_interval && saved ? <Reminder message={errors.time_interval}><input style={{ border: '1px solid red' }} placeholder='Max of 200 characters' maxLength='200' className='form-control' name='time_interval' value={cohort.time_interval} onChange={e => dispatch(allactions.cohortActions.time_interval(e.target.value))} onBlur={(e) => { populateErrors('time_interval', e.target.value, true, 'string') }} /></Reminder> : <input className='form-control' placeholder='Max of 200 characters' maxLength='200' name='time_interval' value={cohort.time_interval} onChange={e => dispatch(allactions.cohortActions.time_interval(e.target.value))} onBlur={(e) => { populateErrors('time_interval', e.target.value, true, 'string') }} readOnly={isReadOnly} />}
                                </span>
                            </div>
                        </div>
                        <div id='question11' className='col-xs-12' style={{ marginBottom: window.innerWidth <= 800 ? '18px' : '13px' }}>
                            {window.innerWidth <= 800 ?
                                <div className='col-xs-12'>
                                    <div className='col-xs-12' style={{ paddingLeft: '0', marginBottom: '13px', fontWeight: 'bold' }}>A.11{' '}Most recent year when questionnaire data were collected<span style={{ color: 'red' }}>*</span></div>
                                    <div className='col-xs-12' style={{ padding: '0' }}>
                                        {errors.most_recent_year && saved ? <Reminder message={errors.most_recent_year}><input style={{ border: '1px solid red' }} className='form-control' name='most_recent_year' value={cohort.most_recent_year} onChange={e => dispatch(allactions.cohortActions.most_recent_year(e.target.value))} placeholder='yyyy' onBlur={(e) => { populateErrors('most_recent_year', e.target.value, true, 'year') }} /></Reminder> : <input className='form-control' name='most_recent_year' value={cohort.most_recent_year} onChange={e => dispatch(allactions.cohortActions.most_recent_year(e.target.value))} placeholder='yyyy' onBlur={(e) => { populateErrors('most_recent_year', e.target.value, true, 'year') }} readOnly={isReadOnly} />}
                                    </div>
                                </div>
                                :
                                <div className='col-md-12'>
                                    <label className='col-md-6' style={{ paddingLeft: '0' }}>A.11{' '}Most recent year when questionnaire data were collected<span style={{ color: 'red' }}>*</span></label>
                                    <span className='col-md-2'>
                                        {errors.most_recent_year && saved ? <Reminder message={errors.most_recent_year}><input style={{ border: '1px solid red' }} className='form-control' name='most_recent_year' value={cohort.most_recent_year} onChange={e => dispatch(allactions.cohortActions.most_recent_year(e.target.value))} placeholder='yyyy' onBlur={(e) => { populateErrors('most_recent_year', e.target.value, true, 'year') }} /></Reminder> : <input className='form-control' name='most_recent_year' value={cohort.most_recent_year} onChange={e => dispatch(allactions.cohortActions.most_recent_year(e.target.value))} placeholder='yyyy' onBlur={(e) => { populateErrors('most_recent_year', e.target.value, true, 'year') }} readOnly={isReadOnly} />}
                                    </span>
                                </div>
                            }
                        </div>
                        <div id='question12' className='col-md-12' style={{ paddingBottom: '10px' }}>
                            <div className='col-xs-12' style={{ marginBottom: '5px' }}>
                                <span className='col-md-8 col-xs-12' style={{ paddingLeft: '0' }}><label style={{ paddingLeft: '0' }}>A.12{' '}How was information from the questionnaire administered/collected?<span style={{ color: 'red' }}>*</span>  (Select all that apply) </label></span>
                                {errors.dataCollection && saved ? <span className='col-md-4 col-xs-12' style={{ paddingLeft: '0', color: 'red' }}>{errorMsg}</span> : ''}
                            </div>
                            <div >
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='data_collected_in_person' checked={cohort.data_collected_in_person == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_phone', 'data_collected_paper', 'data_collected_web', 'data_collected_other'], 'data_collected_in_person') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}In person</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='data_collected_phone' checked={cohort.data_collected_phone == 1} onClick={(e) => { !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_paper', 'data_collected_web', 'data_collected_other'], 'data_collected_phone') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Phone interview</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='data_collected_paper' checked={cohort.data_collected_paper == 1} onClick={(e) => { !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_web', 'data_collected_other'], 'data_collected_paper') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Self-administered via paper</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='data_collected_web' checked={cohort.data_collected_web == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_paper', 'data_collected_other'], 'data_collected_web') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Self-administered via web-based device</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='data_collected_other' checked={cohort.data_collected_other == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'dataCollection', ['data_collected_in_person', 'data_collected_phone', 'data_collected_paper', 'data_collected_web'], 'data_collected_other', 'data_collected_other_specify', true) }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Other</div>
                                    </div>
                                </div>
                                <div className='col-md-8' style={{ marginTop: '5px' }}>
                                    {
                                        window.innerWidth <= 1000 ?
                                            <div>
                                                {saved && errors.data_collected_other_specify ?
                                                    <Reminder message={errors.data_collected_other_specify}><input style={{ border: '1px solid red' }} name='data_collected_other_specify' className='form-control' value={cohort.data_collected_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))} onBlur={() => populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')} disabled={!cohort.data_collected_other} /></Reminder> : <input name='data_collected_other_specify' className='form-control' value={cohort.data_collected_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))} onBlur={() => populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')} readOnly={!cohort.data_collected_other || isReadOnly} />}
                                            </div>
                                            :
                                            <span className='col-md-12' style={{ paddingLeft: '35px', paddingRight: '0' }}>
                                                {saved && errors.data_collected_other_specify ?
                                                    <Reminder message={errors.data_collected_other_specify}><input style={{ border: '1px solid red' }} name='data_collected_other_specify' className='form-control' value={cohort.data_collected_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))} onBlur={() => populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')} disabled={!cohort.data_collected_other} /></Reminder> : <input name='data_collected_other_specify' className='form-control' value={cohort.data_collected_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))} onBlur={() => populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')} readOnly={!cohort.data_collected_other || isReadOnly} />}
                                            </span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div id='question13' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '5px' }}>
                                <span className='col-xs-12' style={{ paddingLeft: '0' }}><b>A.13{' '}Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?<span style={{ color: 'red' }}>*</span> (Select all that apply)</b>
                                    {errors.requirements && saved ? <span style={{ color: 'red', marginLeft: '10px' }}>{errorMsg}</span> : ''}</span>

                            </div>
                            <div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='requireNone' checked={cohort.requireNone == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireNone') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}None</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='requireCollab' checked={cohort.requireCollab == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireNone', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireCollab') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Require collaboration with cohort investigattors</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='requireIrb' checked={cohort.requireIrb == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireNone', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireIrb') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Require IRB approvals</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='requireData' checked={cohort.requireData == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireNone', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'requireData') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Require data use agreements and/or materrial transfer agreement</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='restrictGenoInfo' checked={cohort.restrictGenoInfo == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'requireNone', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'], 'restrictGenoInfo') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Restrictions in the consent related to genetic information</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='restrictOtherDb' checked={cohort.restrictOtherDb == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'requireNone', 'restrictCommercial', 'restrictOther'], 'restrictOtherDb') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Restrictions in the consent related to linking to other databases</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='restrictCommercial' checked={cohort.restrictCommercial == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'requireNone', 'restrictOther'], 'restrictCommercial') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Restrictions on commercial use</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='restrictOther' checked={cohort.restrictOther == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'requirements', ['requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'requireNone'], 'restrictOther', 'restrictions_other_specify', true) }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Other</div>
                                    </div>
                                </div>
                                <div className='col-md-8' style={{ marginTop: '5px' }}>
                                    {window.innerWidth <= 1000 ?
                                        <div>
                                            {saved && errors.restrictions_other_specify ?
                                                <Reminder message={errors.restrictions_other_specify}><input style={{ border: '1px solid red' }} name='restrictions_other_specify' className='form-control' value={cohort.restrictions_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))} onBlur={() => populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')} disabled={!cohort.restrictOther} /></Reminder> : <input name='data_collected_other_specify' className='form-control' value={cohort.restrictions_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))} onBlur={() => populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')} readOnly={!cohort.restrictOther || isReadOnly} />}
                                        </div>
                                        :
                                        <span className='col-md-12' style={{ paddingLeft: '35px', paddingRight: '0' }}>
                                            {saved && errors.restrictions_other_specify ?
                                                <Reminder message={errors.restrictions_other_specify}><input style={{ border: '1px solid red' }} name='restrictions_other_specify' className='form-control' value={cohort.restrictions_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))} onBlur={() => populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')} disabled={!cohort.restrictOther} /></Reminder> : <input name='data_collected_other_specify' className='form-control' value={cohort.restrictions_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.restrictions_other_specify(e.target.value))} onBlur={() => populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')} readOnly={!cohort.restrictOther || isReadOnly} />}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div id='question14' className='col-md-12' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-xs-12' style={{ marginBottom: '5px' }}>
                                <span className='cl-xs-12' style={{ paddingLeft: '0' }}>
                                    <b>A.14{' '}What strategies does your cohort use to engage participants?<span style={{ color: 'red' }}>*</span>{' '}(Select all that apply)</b>
                                    {errors.strategy && saved ? <span style={{ color: 'red', marginLeft: '10px' }}>{errorMsg}</span> : ''}
                                </span>
                            </div>
                            <div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_routine' checked={cohort.strategy_routine == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_routine') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Nothing beyond mailing questionnaires or other routine contacts</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_mailing' checked={cohort.strategy_mailing == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategyRoutine', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_mailing') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Send newsletters or other general mailings (e.g., birthday cards)</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_aggregate_study' checked={cohort.strategy_aggregate_study == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategyRoutine', 'strategy_individual_study', 'strategy_invitation', 'strategy_other'], 'strategy_aggregate_study') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Return aggregate study results (e.g., recent findings) </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_individual_study' checked={cohort.strategy_individual_study == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategyRoutine', 'strategy_invitation', 'strategy_other'], 'strategy_individual_study') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Individual study results (e.g., nutrient values) </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_invitation' checked={cohort.strategy_invitation == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_routine', 'strategy_other'], 'strategy_invitation') }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Invite participation on research committees </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='col-xs-12' style={{ padding: '0', margin: '0' }}>
                                        <div className='col-xs-1' style={{ paddingRight: '0', marginRight: '0', width: window.innerWidth <= 800 ? '' : '50px' }}>
                                            <input type='checkbox' name='strategy_other' checked={cohort.strategy_other == 1} onChange={(e) => { !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_invitation', 'strategyRoutine'], 'strategy_other', 'strategy_other_specify', true) }} />
                                        </div>
                                        <div className='col-xs-11' style={{ paddingLeft: '0' }}>{' '}Other </div>
                                    </div>
                                </div>
                                <div className='col-md-8' style={{ marginTop: '5px' }}>
                                    {window.innerWidth <= 1000 ?
                                        <div>
                                            {saved && errors.strategy_other_specify ?
                                                <Reminder message={errors.strategy_other_specify}><input style={{ border: '1px solid red' }} name='strategy_other_specify' className='form-control' value={cohort.strategy_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))} onBlur={() => populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')} disabled={!cohort.strategy_other} /></Reminder> : <input name='strategy_other_specify' className='form-control' value={cohort.strategy_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))} onBlur={() => populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')} readOnly={!cohort.strategy_other || isReadOnly} />}
                                        </div>
                                        :
                                        <span className='col-md-12' style={{ paddingLeft: '35px', paddingRight: '0' }}>
                                            {saved && errors.strategy_other_specify ?
                                                <Reminder message={errors.strategy_other_specify}><input style={{ border: '1px solid red' }} name='strategy_other_specify' className='form-control' value={cohort.strategy_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))} onBlur={() => populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')} disabled={!cohort.strategy_other} /></Reminder> : <input name='strategy_other_specify' className='form-control' value={cohort.strategy_other_specify} placeholder='Max of 200 characters' maxLength='200' onChange={e => dispatch(allactions.cohortActions.strategy_other_specify(e.target.value))} onBlur={() => populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')} readOnly={!cohort.strategy_other || isReadOnly} />}
                                        </span>
                                    }
                                </div>

                            </div>
                        </div>
                    </CollapsiblePanel>
                    <CollapsiblePanel
                        condition={activePanel === 'panelE'}
                        onClick={() => setActivePanel(activePanel === 'panelE' ? '' : 'panelE')}
                        panelTitle="Documents">
                        <div id='question15' className='col-md-12' style={{ paddingLeft: window.innerWidth <= 1000 ? '0' : '', paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className='col-md-12' style={{ marginBottom: '10px' }}>
                                <label style={{ paddingLeft: '0' }}>A.15 {' '} Required Documents</label>
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
                                                                    <span className='col-xs-10' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                                        <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 1) }} multiple disabled={isReadOnly} />
                                                                    </span>
                                                                    <span className='col-xs-2 badge upperCloser' onClick={() => showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName)}>{cohort.questionnaireFileName.length}</span>
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
                                                                    <span className='col-xs-10' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                                        <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 1) }} multiple disabled={isReadOnly} />
                                                                    </span>
                                                                    <span className='col-xs-2 badge upperCloser' onClick={() => showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)}>{cohort.mainFileName.length}</span>
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
                                                                    <span className='col-xs-10' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                                        <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 2) }} multiple disabled={isReadOnly} />
                                                                    </span>
                                                                    <span className='col-xs-2 badge upperCloser' onClick={() => showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)}>{cohort.dataFileName.length}</span>
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
                                                                    <span className='col-xs-10' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                                        <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 3) }} multiple disabled={isReadOnly} />
                                                                    </span>
                                                                    <span className='col-xs-2 badge upperCloser' onClick={() => showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)}>{cohort.specimenFileName.length}</span>
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
                                                                    <span className='col-xs-10' style={{ paddingLeft: '0', paddingRight: '0' }}>
                                                                        <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 4) }} multiple disabled={isReadOnly} />
                                                                    </span>
                                                                    <span className='col-xs-2 badge upperCloser' onClick={() => showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)}>{cohort.publicationFileName.length}</span>
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
                                                    <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='questionnaire_url' id='questionnaire_url' value={cohort.questionnaire_url} onChange={e => { dispatch(allactions.cohortActions.questionnaire_url(e.target.value)) }} readOnly={isReadOnly} /></td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span className='col-sm-11' style={{ paddingLeft: '0' }}>
                                                            <input type='file' name='cohortFile' onChange={e => { handleUpload(e.target.files, 0) }} multiple disabled={isReadOnly} />
                                                        </span>
                                                        <span className={cohort.questionnaireFileName.length > 0 ? 'col-sm-1 badge upperCloser' : 'col-md-1 badge'} onClick={() => showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName)}>{cohort.questionnaireFileName.length}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>Main cohort protocol</td>
                                                    <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='main_cohort_url' id='main_cohort_url' value={cohort.main_cohort_url} onChange={e => { dispatch(allactions.cohortActions.main_cohort_url(e.target.value)) }} readOnly={isReadOnly} /></td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span className='col-sm-11' style={{ paddingLeft: '0' }}>
                                                            <input style={{ paddingRight: '0', marginRight: '0', borderRight: '0' }} type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 1) }} multiple disabled={isReadOnly} />
                                                        </span>
                                                        <span className={cohort.mainFileName.length > 0 ? 'col-sm-1 badge upperCloser' : 'col-md-1 badge'} onClick={() => showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)}>{cohort.mainFileName.length}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>Data sharing policy</td>
                                                    <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='data_url' id='data_url' value={cohort.data_url} onChange={e => { dispatch(allactions.cohortActions.data_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span className='col-sm-11' style={{ paddingLeft: '0' }}>
                                                            <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 2) }} multiple disabled={isReadOnly} />
                                                        </span>
                                                        <span className={cohort.dataFileName.length > 0 ? 'col-sm-1 badge upperCloser' : 'col-md-1 badge'} onClick={() => showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)}>{cohort.dataFileName.length}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>Biospecimen sharing policy</td>
                                                    <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='specimen_url' id='specimen_url' value={cohort.specimen_url} onChange={e => { dispatch(allactions.cohortActions.specimen_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span className='col-sm-11' style={{ paddingLeft: '0' }}>
                                                            <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 3) }} multiple disabled={isReadOnly} />
                                                        </span>
                                                        <span className={cohort.specimenFileName.length > 0 ? 'col-sm-1 badge upperCloser' : 'col-md-1 badge'} onClick={() => showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)}>{cohort.specimenFileName.length}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Publication(authorship) policy</td>
                                                    <td><input className='inputWriter' placeholder='Max of 100 characters' maxLength='100' name='publication_url' value={cohort.publication_url} id='publication_url' onChange={e => { dispatch(allactions.cohortActions.publication_url(e.target.value)) }} disabled={isReadOnly} /></td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <span className='col-sm-11' style={{ paddingLeft: '0' }}>
                                                            <input type='file' name='cohortFile' formEncType='multiple/part' onChange={e => { handleUpload(e.target.files, 4) }} multiple disabled={isReadOnly} />
                                                        </span>
                                                        <span className={cohort.publicationFileName.length > 0 ? 'col-sm-1 badge upperCloser' : 'col-md-1 badge'} onClick={() => showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)}>{cohort.publicationFileName.length}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </CollapsiblePanel>
                </form>
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
}

export default CohortForm