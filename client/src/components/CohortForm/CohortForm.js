import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import allactions from '../../actions';
import validator from '../../validators';
import Person from './Person/Person';
import Investigator from './Investigator/Investigator';
import DatePicker from 'react-datepicker';
import Messenger from '../Snackbar/Snackbar';
import Reminder from '../Tooltip/Tooltip';
import CenterModal from '../controls/modal/modal';
import ReviewModal from '../controls/modal/modal';
import FileModal from '../controls/modal/FileModal.js';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter';
import "react-datepicker/dist/react-datepicker.css";
import './CohortForm.scss';
import cohortErrorActions from '../../actions/cohortErrorActions';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const CohortForm = ({ ...props }) => {
    const cohort = useSelector(state => state.cohortReducer)
    const cohortID = useSelector(state => state.cohortIDReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.cohortErrorReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const userSession = useSelector(state => state.user);
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly || false
    const errorMsg = 'Required Field'

    const [QfileLoading, setQfileLoading] = useState(false)
    const [MfileLoading, setMfileLoading] = useState(false)
    const [DfileLoading, setDfileLoading] = useState(false)
    const [SfileLoading, setSfileLoading] = useState(false)
    const [PfileLoading, setPfileLoading] = useState(false)

    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [fileModal, setFileModal] = useState(false)
    const [urlModal, setUrlModal] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [tempId, setTempId] = useState(+window.location.pathname.split('/').pop())
    const [activePanel, setActivePanel] = useState('panelA')
    const [fileListShow, setFileListShow] = useState(false)
    const [fileListTile, setFileListTitle] = useState('')
    const [currentFileList, setCurrentFileList] = useState([])
    const [currentFileListName, setCurrentFileListName] = useState('')

    const [urlTitle, setUrlTitle] = useState('')
    const [urlTile, setUrlTile] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [urlList, setUrlListModal] = useState(false)
    const [currentUrlList, setCurrentUrlList] = useState([])

    const history = useHistory();

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
                            if(!isReadOnly){
                                    dispatch(allactions.cohortActions.contacterName(''))
                                    dispatch(allactions.cohortActions.contacterPosition(''))
                                    dispatch(allactions.cohortActions.country_code(''))
                                    dispatch(allactions.cohortActions.contacterPhone(''))
                                    dispatch(allactions.cohortActions.contacterEmail(''))
                                }else{
                                    dispatch(allactions.cohortActions.contacterName(completer.completerName))
                                    dispatch(allactions.cohortActions.contacterPosition(completer.completerPosition))
                                    dispatch(allactions.cohortActions.country_code('contacterCountry', completer.completerCountry))
                                    dispatch(allactions.cohortActions.contacterPhone(completer.completerPhone))
                                    dispatch(allactions.cohortActions.contacterEmail(completer.completerEmail))
                                }
                        }else if (contacter) { // 0 
                                for (let k of Object.keys(contacter)) {
                                    if (k != 'contacterCountry')
                                        dispatch(allactions.cohortActions[k](contacter[k]))
                                    else
                                        dispatch(allactions.cohortActions.country_code('contacterCountry', contacter.contacterCountry))
                                }
                        }

                        if([0,1].includes(currentCohort.sameAsSomeone)){
                            if(!isReadOnly){
                                dispatch(allactions.cohortActions.collaboratorName(''))
                                dispatch(allactions.cohortActions.collaboratorPosition(''))
                                dispatch(allactions.cohortActions.country_code(''))
                                dispatch(allactions.cohortActions.collaboratorPhone(''))
                                dispatch(allactions.cohortActions.collaboratorEmail(''))
                            }else{
                                if(currentCohort.sameAsSomeone === 0){
                                    if(completer){
                                        dispatch(allactions.cohortActions.collaboratorName(completer.completerName))
                                        dispatch(allactions.cohortActions.collaboratorPosition(completer.completerPosition))
                                        dispatch(allactions.cohortActions.country_code('contacterCountry', completer.completerCountry))
                                        dispatch(allactions.cohortActions.collaboratorPhone(completer.completerPhone))
                                        dispatch(allactions.cohortActions.collaboratorEmail(completer.completerEmail))
                                    }
                                }else{
                                    if(contacter){
                                        dispatch(allactions.cohortActions.collaboratorName(contacter.contacterName))
                                        dispatch(allactions.cohortActions.collaboratorPosition(contacter.contacterPosition))
                                        dispatch(allactions.cohortActions.country_code('contacterCountry', contacter.contacterCountry))
                                        dispatch(allactions.cohortActions.collaboratorPhone(contacter.contacterPhone))
                                        dispatch(allactions.cohortActions.collaboratorEmail(contacter.contacterEmail))
                                    }
                                }
                            }
                        }
                        else if (collaborator) {
                            for (let k of Object.keys(collaborator)) {
                                if (k != 'collaboratorCountry')
                                    dispatch(allactions.cohortActions[k](collaborator[k]))
                                else
                                    dispatch(allactions.cohortActions.country_code('collaboratorCountry', collaborator.collaboratorCountry))
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

                        if (currentCohort.enrollment_year_end && currentCohort.enrollment_year_end >= currentCohort.enrollment_year_start && currentCohort.enrollment_year_end <= (new Date()).getFullYear() && errors.enrollment_year_end) { dispatch(allactions.cohortErrorActions.enrollment_year_end(true)) }

                        if ([0, 1].includes(currentCohort.enrollment_ongoing)) { dispatch(allactions.cohortErrorActions.enrollment_ongoing(true)) }
                        if (currentCohort.enrollment_ongoing === 0) {
                            dispatch(allactions.cohortErrorActions.enrollment_target(true))
                            dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                            if (!currentCohort.enrollment_year_end) dispatch(allactions.cohortErrorActions.enrollment_year_end(false, 'Required Filed'))
                        }
                        if (currentCohort.enrollment_ongoing === 1) {
                            if (currentCohort.enrollment_target && currentCohort.enrollment_target >= 0) { dispatch(allactions.cohortErrorActions.enrollment_target(true)) }
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
                        if (currentCohort.most_recent_year) {
                            if (currentCohort.most_recent_year <= (new Date()).getFullYear()) { dispatch(allactions.cohortErrorActions.most_recent_year(true)) }
                            else dispatch(allactions.cohortErrorActions.most_recent_year(false, 'expecting year in the past'))
                        }
                        if (currentCohort.strategy_other !== 1) { dispatch(allactions.cohortErrorActions.strategy_other_specify(true)) }
                        if ([4, 2, 1].includes(currentCohort.eligible_gender_id)) { dispatch(allactions.cohortErrorActions.eligible_gender_id(true)) }

                        if (currentCohort.data_collected_in_person || currentCohort.data_collected_phone || currentCohort.data_collected_paper || currentCohort.data_collected_web || currentCohort.data_collected_other) { dispatch(allactions.cohortErrorActions.dataCollection(true)) }

                        if (currentCohort.data_collected_other_specify || !currentCohort.data_collected_other) { dispatch(allactions.cohortErrorActions.data_collected_other_specify(true)) }

                        if (currentCohort.requireNone || currentCohort.requirecollab || currentCohort.requireIrb || currentCohort.requireData || currentCohort.restrictGenoInfo || currentCohort.restrictOtherDb || currentCohort.restrictCommercial || currentCohort.restrictOther) { dispatch(allactions.cohortErrorActions.requirements(true)) }

                        if (currentCohort.restrictions_other_specify || !currentCohort.restrictOther) { dispatch(allactions.cohortErrorActions.restrictions_other_specify(true)) }

                        if (currentCohort.strategy_routine || currentCohort.strategy_mailing || currentCohort.strategy_aggregate_study || currentCohort.strategy_individual_study || currentCohort.strategy_committees || currentCohort.strategy_invitation || currentCohort.strategy_participant_input || currentCohort.strategy_other) { dispatch(allactions.cohortErrorActions.strategy(true)) }

                        if (currentCohort.strategy_other_specify || !currentCohort.strategy_other) { dispatch(allactions.cohortErrorActions.strategy_other_specify(true)) }

                        //just need to remove the first investigator error on load, since only investigator 0 has errors initially
                        if (completer && completer.completerName) { dispatch(allactions.cohortErrorActions.completerName(true)) }
                        if (completer && completer.completerPosition) { dispatch(allactions.cohortErrorActions.completerPosition(true)) }
                        if (completer && completer.completerEmail) { dispatch(allactions.cohortErrorActions.completerEmail(true)) }

                        if (currentCohort.clarification_contact === 1) {
                            dispatch(allactions.cohortErrorActions.contacterName(true))
                            dispatch(allactions.cohortErrorActions.contacterPosition(true))
                            dispatch(allactions.cohortErrorActions.contacterEmail(true))
                        } else {
                            if (contacter && contacter.contacterName) { dispatch(allactions.cohortErrorActions.contacterName(true)) }
                            if (contacter && contacter.contacterPosition) { dispatch(allactions.cohortErrorActions.contacterPosition(true)) }
                            if (contacter && contacter.contacterEmail) { dispatch(allactions.cohortErrorActions.contacterEmail(true)) }
                        }


                        if ([0, 1].includes(currentCohort.sameAsSomeone)) {
                            dispatch(allactions.cohortErrorActions.collaboratorName(true))
                            dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                            dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
                        } else {
                            if (collaborator && collaborator.collaboratorName) { dispatch(allactions.cohortErrorActions.collaboratorName(true)) }
                            if (collaborator && collaborator.collaboratorPosition) { dispatch(allactions.cohortErrorActions.collaboratorPosition(true)) }
                            if (collaborator && collaborator.collaboratorEmail) { dispatch(allactions.cohortErrorActions.collaboratorEmail(true)) }
                        }

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

    const saveCohort = (id = cohortID, goNext = proceed || false) => {

        let userID = userSession.id

        let cohortBody = cohort
        cohortBody["userID"] = userID

        fetch(`/api/questionnaire/update_cohort_basic/${id}`, {
            method: "POST",
            body: JSON.stringify(cohortBody),
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
                        dispatch(fetchCohort(result.newCohortInfo.newCohortID))
                        // if cohort_id changed, refresh section status
                        let secStatusList = result.newCohortInfo.sectionStatusList
                        if (secStatusList && secStatusList.length > 0) secStatusList.map((item, idx) => {
                            dispatch(allactions.sectionActions.setSectionStatus(item.page_code, item.status))
                        })
                        // context.cohorts.push({id: result.newCohortInfo.newCohortID})
                        dispatch(allactions.cohortIDAction.setCohortId(result.newCohortInfo.newCohortID))
                        history.push(window.location.pathname.replace(/\d+$/, result.newCohortInfo.newCohortID))
                        // window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.newCohortInfo.newCohortID))
                    } else {
                        dispatch(fetchCohort(cohortID))
                    }
                    if (result.newCohortInfo.investigators) dispatch(allactions.cohortActions.setInvestigators(result.newCohortInfo.investigators))

                    if (result.newCohortInfo.status && result.newCohortInfo.status != cohortStatus) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: result.newCohortInfo.status }))
                    }
                    if (!goNext) {
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
        //console.dir(errors)
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

    const handleSubmitForReview = () => {
        setReviewModalShow(true);
    }

    const sendEmail = (template, topic) => {

        fetch('/api/questionnaire/select_admin_info', {
            method: "POST",
            body: JSON.stringify({ id: cohortID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {

                    result.data.map((admin) => {
                        let reqBody = {
                            templateData: {
                                user: admin.first_name + ' ' + admin.last_name,
                                cohortName: admin.name,
                                cohortAcronym: admin.acronym,
                                website: window.location.origin,
                                publishDate: new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'
                            },
                            email: admin.email,
                            template: template,
                            topic: topic + admin.acronym
                        }

                        fetch('/api/cohort/sendUserEmail', {
                            method: "POST",
                            body: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => res.json())
                            .then(result => {
                                if (result && result.status === 200) {
                                    //let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                                    //clearTimeout(timedMessage)
                                }
                                else {
                                    //let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                                    //clearTimeout(timedMessage)
                                }
                            })
                    })
                }
            })
    }

    const resetCohortStatus = (cohortID, nextStatus) => {

        let userId = userSession.id

        if (['new', 'draft', 'published', 'submitted', 'rejected', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}/${userId}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: nextStatus }))
                        dispatch(fetchCohort(cohortID))

                        if (nextStatus === 'submitted')
                            sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ');
                            setReviewModalShow(false);
                    }
                })
        }
    }

    const getMinAgeValidationResult = (value, requiredOrNot, maxAge, medianAge, meanAge) => validator.minAgeValidator(value, requiredOrNot, maxAge, medianAge, meanAge)
    const getMaxAgeValidationResult = (value, requiredOrNot, minAge, medianAge, meanAge) => validator.maxAgeValidator(value, requiredOrNot, minAge, medianAge, meanAge)
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
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            case 'startyear':
            case 'endyear':
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
        if (!result) {
            if (valueType === 'startyear' && value && cohort.enrollment_year_end > 0 && value > cohort.enrollment_year_end)
                result = 'start year after end year'
            else if (value <= cohort.enrollment_year_end) {
                if (cohort.enrollment_year_end <= (new Date()).getFullYear())
                    dispatch(allactions.cohortErrorActions.enrollment_year_end(true))
                else
                    dispatch(allactions.cohortErrorActions.enrollment_year_end(false, 'expecting a year value in the past'))

            }
            if (valueType === 'endyear' && value && cohort.enrollment_year_start > 0 && value < cohort.enrollment_year_start)
                result = 'end year is before start year'
            else if (value >= cohort.enrollment_year_start) {
                if (cohort.enrollment_year_start && cohort.enrollment_year_start <= (new Date()).getFullYear())
                    dispatch(allactions.cohortErrorActions.enrollment_year_start(true))
                else
                    dispatch(allactions.cohortErrorActions.enrollment_year_start(false, 'expecting a year value in the past'))

            }
        }

        if (result) {
            dispatch(allactions.cohortErrorActions[fieldName](false, result))
        } else {
            if (cohortErrorActions[fieldName]) {
                dispatch(allactions.cohortErrorActions[fieldName](true))
            }
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

            fetch(`/api/questionnaire/upload/${cohortID}/${cohort.cohort_acronym}/${category}`, {
                method: "POST",
                body: formData
            }).then(res => res.json())
                .then((result) => {
                    if (result.status === 200) {
                        let dispatchName = ''
                        switch (category) {
                            case 0:
                                dispatchName = 'questionnaireFileName';
                                setQfileLoading(false)
                                break;
                            case 1:
                                dispatchName = 'mainFileName';
                                setMfileLoading(false)
                                break;
                            case 2:
                                dispatchName = 'dataFileName';
                                setDfileLoading(false)
                                break;
                            case 3:
                                dispatchName = 'specimenFileName';
                                setSfileLoading(false)
                                break;
                            case 4:
                                dispatchName = 'publicationFileName';
                                setPfileLoading(false)
                                break;
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
    const file_list = (title = '', fileListName, files = [], deleteFileFromList = f => f) => {
        return (
            <Col md="12" className="p-0 m-0">
                {/* Header */}
                <div style={{
                    height: '40px',
                    backgroundColor: '#01857b',
                    color: 'white',
                }}>
                    <Col sm="10">
                        <h4><b>{title}</b></h4>
                    </Col>
                    <input type="button" style={{ position: 'absolute', right: '10px', background: 'transparent', border: 'none', lineHeight: '2em' }} value='x' onClick={() => setFileModal(false)} />
                </div>
                {/* Table */}
                <Col md="12" className="mb-3 px-0">
                    {/* Table header */}
                    <div className="bg-light-grey" style={{
                        height: '30px',
                        borderBottom: '1px solid #dee2e6'
                    }}>
                        <Col md="10" style={{ fontSize: '1.5rem' }}>
                            <h5>File Name</h5>
                        </Col>
                        <Col md="2" style={{ fontSize: '1.5rem' }}>
                            <h5>Remove</h5>
                        </Col>
                    </div>
                    {/* File list rows */}
                    <div className="mb-3">
                        {files.map(f =>
                            <div className="my-1">
                                <Col md="10">
                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + f.filename} target="_blank">{f.filename}</a>
                                </Col>
                                <Col md="2" className="text-center">
                                    <span>
                                        {!isReadOnly &&
                                            <span className='closer'
                                                onClick={() =>
                                                    deleteFileFromList(fileListName, f.filename, f.fileId, cohortID)
                                                }>
                                                x
                                            </span>
                                        }
                                    </span>
                                </Col>
                            </div>
                        )}
                    </div>
                </Col>

            </Col>
        )
    }

    const url_list = (urlTitle, urlTile, urls) => {

        return (
            <Col md="12" className="col-xs-12 p-0 m-0">
                {/* Header */}
                <div style={{
                    height: '40px',
                    backgroundColor: '#01857b',
                    color: 'white',
                }}>
                    <Col sm="10">
                        <h4><b>{urlTitle}</b></h4>
                    </Col>
                    <input type="button" style={{ position: 'absolute', right: '10px', background: 'transparent', border: 'none', lineHeight: '2em' }} value='x' onClick={() => setUrlListModal(false)} />
                </div>
                {/* Table */}
                <Col md="12" className=" col-xs-12 mb-3 px-0">
                    {/* Table header */}
                    <div className="bg-light-grey" style={{
                        height: '30px',
                        borderBottom: '1px solid #dee2e6'
                    }}>
                        <Col md="10" className="col-xs-9" style={{ fontSize: '1.5rem' }}>
                            <h5>File Name</h5>
                        </Col>
                        <Col md="2" className="col-xs-2" style={{ fontSize: '1.5rem' }}>
                            <h5>Remove</h5>
                        </Col>
                    </div>
                    {/* File list rows */}
                    <div className="mb-3">
                        {urls.map((url, index) =>
                            <div className="my-1">
                                <Col md="10" className="col-xs-9">
                                    <a href={url} target="_blank">{url}</a>
                                </Col>
                                <Col md="2" className="col-xs-2 text-center">
                                    <span>
                                        {!isReadOnly &&
                                            <span className='closer'
                                                onClick={() => {
                                                    urls.splice(index, 1)
                                                    switch (urlTile) {
                                                        case 'questionnaire_url':
                                                            dispatch(allactions.cohortActions.questionnaire_url(urls))
                                                            break;
                                                        case 'main_cohort_url':
                                                            dispatch(allactions.cohortActions.main_cohort_url(urls))
                                                            break;
                                                        case 'data_url':
                                                            dispatch(allactions.cohortActions.data_url(urls))
                                                            break;
                                                        case 'specimen_url':
                                                            dispatch(allactions.cohortActions.specimen_url(urls))
                                                            break;
                                                        case 'publication_url':
                                                            dispatch(allactions.cohortActions.publication_url(urls))
                                                            break;
                                                    }
                                                }}>
                                                x
                                            </span>
                                        }
                                    </span>
                                </Col>
                            </div>
                        )}
                    </div>
                </Col>
            </Col>
        )
    }

    const add_url = () => {
        console.log(add_url)
        return (
            <Col md="12" className="px-0">
                {/* Header */}
                <div style={{
                    height: '40px',
                    backgroundColor: '#01857b',
                    color: 'white',
                }}>
                    <Col sm="10">
                        <h4><b>{urlTitle}</b></h4>
                    </Col>
                    <input type="button" style={{ position: 'absolute', right: '10px', background: 'transparent', border: 'none', lineHeight: '2em' }} value='x' onClick={() => setUrlModal(false)} />
                </div>
                <Col sm="12" className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Max of 100 characters"
                        maxLength="100"
                        onChange={e => setUrlInput(e.target.value)}
                    />
                </Col>
            </Col>
        )
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

    const showUrlModal = (title, urlTile) => {

        batch(() => {

            setUrlTitle(title)
            setUrlTile(urlTile)
            setUrlInput(''); // remove previous url
            setUrlModal(true)
        })
    }

    const showUrlListModal = (title, urlTile) => {

        batch(() => {

            setUrlTitle(title)
            setUrlTile(urlTile)
            setCurrentUrlList(cohort[urlTile])
            setUrlListModal(true)
        })
    }

    const deleteFileFromList = (fileListName, fileName, fileId, cohort_ID) => {
        fetch(`/api/questionnaire/deleteFile`, {
            method: "POST",
            body: JSON.stringify({ filename: fileName, id: fileId, cohortId: cohort_ID, cohortAcronym: cohort.cohort_acronym}),
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
        <Container>
            {console.log(urlInput)}
            {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
            <CenterModal show={modalShow}
                handleClose={() =>
                    setModalShow(false)
                }
                handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />

            <ReviewModal show={reviewModalShow}
                title={
                    <span>
                        Submit for Review
                    </span>
                }
                body={
                    <span>
                        This cohort questionnaire will be locked against further modifications 
                        once you submit it for review. Are you sure you want to continue?                  
                    </span>
                }
                footer={
                    <div>
                        <Button 
                            variant="secondary" 
                            className="col-lg-2 col-md-6" 
                            onClick={_ => setReviewModalShow(false)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            className="col-lg-2 col-md-6" 
                            onClick={_ => resetCohortStatus(cohortID, 'submitted')}>
                            Submit
                        </Button>
                    </div>
                }
            />

            <FileModal show={urlModal}
                handleClose={() =>
                    setUrlModal(false)
                }
                body={add_url()}
                footer={
                    <div>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                setUrlModal(false)
                            }
                            className='col-lg-2 col-md-6'>
                            Close
                        </Button>
                        <Button
                            variant='primary'
                            onClick={() => {
                                let copy = [];
                                switch (urlTile) {

                                    case "questionnaire_url":
                                        copy = [...cohort.questionnaire_url]
                                        if (urlInput) {
                                            copy.push(urlInput)
                                            dispatch(allactions.cohortActions.questionnaire_url(copy));
                                        }
                                        break;
                                    case "main_cohort_url":
                                        copy = [...cohort.main_cohort_url]
                                        if (urlInput) {
                                            copy.push(urlInput)
                                            dispatch(allactions.cohortActions.main_cohort_url(copy));
                                        }
                                        break;
                                    case "data_url":
                                        copy = [...cohort.data_url]
                                        if (urlInput) {
                                            copy.push(urlInput)
                                            dispatch(allactions.cohortActions.data_url(copy));
                                        }
                                        break;
                                    case "specimen_url":
                                        copy = [...cohort.specimen_url]
                                        if (urlInput) {
                                            copy.push(urlInput)
                                            dispatch(allactions.cohortActions.specimen_url(copy));
                                        }
                                        break;
                                    case "publication_url":
                                        copy = [...cohort.publication_url]
                                        if (urlInput) {
                                            copy.push(urlInput)
                                            dispatch(allactions.cohortActions.publication_url(copy));
                                        }
                                        break;
                                }
                                setUrlModal(false)
                            }}
                            className='col-lg-2 col-md-6'>
                            Add URL
                        </Button>
                    </div>
                }
            />

            <FileModal show={fileModal}
                handleClose={() =>
                    setFileModal(false)
                }
                body={file_list(fileListTile, currentFileListName, currentFileList, deleteFileFromList)}
                footer={
                    <Button
                        variant="primary"
                        onClick={() =>
                            setFileModal(false)
                        }
                        className='col-lg-2 col-md-6'>
                        Close
                    </Button>
                } />

            <FileModal show={urlList}
                handleClose={() =>
                    setUrlListModal(false)
                }
                body={url_list(urlTitle, urlTile, currentUrlList)}
                footer={
                    <Button
                        variant='primary'
                        onClick={() =>
                            setUrlListModal(false)
                        }
                        className='col-lg-2 col-md-6'>
                        Close
                    </Button>
                }
            />

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                If your cohort is comprised of more than one distinct enrollment period or population, please complete separate CEDCD Data Collection Forms to treat them as separate cohorts
                </div>
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
                                <Form.Control type="text" value={cohort.cohort_name} readOnly />
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
                                    readOnly={isReadOnly} />
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
                                <span className="required-label">Is this the same person who completed this form?</span>
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
                                                        if (!isReadOnly) {
                                                            let emailCheckResult = getValidationResult(cohort.contacterEmail, true, 'email')
                                                            let phoneCheckResult = getValidationResult(cohort.contacterPhone, false, 'phone')
                                                            dispatch(allactions.cohortActions.clarification_contact(0))
                                                            dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                            !cohort.contacterName && dispatch(allactions.cohortErrorActions.contacterName(false, 'Required Field'))
                                                            !cohort.contacterPosition && dispatch(allactions.cohortErrorActions.contacterPosition(false, 'Required Field'))
                                                            if (cohort.contacterPhone && phoneCheckResult) dispatch(allactions.cohortErrorActions.contacterPhone(false, phoneCheckResult))
                                                            if (!cohort.contacterEmail) dispatch(allactions.cohortErrorActions.contacterEmail(false, 'Required Field'))
                                                            else if (emailCheckResult)
                                                                dispatch(allactions.cohortErrorActions.contacterEmail(false, emailCheckResult))
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
                                            style={{ fontWeight: 'normal ' }}
                                            name='clarification_contact'>
                                            <Form.Check.Input bsPrefix
                                                type="radio"
                                                className="mr-2"
                                                checked={cohort.clarification_contact === 0}
                                                onClick={e => {
                                                    //setPerson(e, '', '', '', '', 0, 'contacter')
                                                    if (!isReadOnly) {
                                                        let emailCheckResult = getValidationResult(cohort.contacterEmail, true, 'email')
                                                        let phoneCheckResult = getValidationResult(cohort.contacterPhone, false, 'phone')
                                                        dispatch(allactions.cohortActions.clarification_contact(0))
                                                        dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                        !cohort.contacterName && dispatch(allactions.cohortErrorActions.contacterName(false, 'Required Field'))
                                                        !cohort.contacterPosition && dispatch(allactions.cohortErrorActions.contacterPosition(false, 'Required Field'))
                                                        if (cohort.contacterPhone && phoneCheckResult) dispatch(allactions.cohortErrorActions.contacterPhone(false, phoneCheckResult))
                                                        if (!cohort.contacterEmail) dispatch(allactions.cohortErrorActions.contacterEmail(false, 'Required Field'))
                                                        else if (emailCheckResult)
                                                            dispatch(allactions.cohortErrorActions.contacterEmail(false, emailCheckResult))
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
                                                        if (!isReadOnly) {
                                                            setPerson(e, '', '', '', '', 1, 'contacter');
                                                            dispatch(allactions.cohortErrorActions.clarification_contact(true))
                                                            dispatch(allactions.cohortErrorActions.contacterName(true))
                                                            dispatch(allactions.cohortErrorActions.contacterPosition(true))
                                                            dispatch(allactions.cohortErrorActions.contacterPhone(true))
                                                            dispatch(allactions.cohortErrorActions.contacterEmail(true))
                                                        }
                                                    }
                                                    } />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Yes
                                                    </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type="radio"
                                            id="clarification-contact-radio-yes"
                                            inline
                                            style={{ fontWeight: 'normal ' }}
                                            name="clarification_contact">
                                            <Form.Check.Input bsPrefix
                                                type="radio"
                                                className="mr-2"
                                                checked={cohort.clarification_contact === 1}
                                                onClick={e => {
                                                    //!isReadOnly && setPerson(e, '', '', '', '', 1, 'contacter')
                                                    if (!isReadOnly) {
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
                                        </Form.Check>}
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
                                    disabled={cohort.clarification_contact || isReadOnly}
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
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label column sm="6">
                                A.5 Cohort Principal Investigator(s)
                                </Form.Label>
                            <Col sm="6">
                                <Button
                                    variant="primary"
                                    className="float-right"
                                    disabled={isReadOnly}
                                    onClick={e => {
                                        e.preventDefault();
                                        dispatch(allactions.cohortActions.addInvestigator());
                                        let idx = cohort.investigators.length;
                                        dispatch(allactions.cohortErrorActions.investigatorName(idx, false, errorMsg));
                                        dispatch(allactions.cohortErrorActions.investigatorInstitution(idx, false, errorMsg));
                                        dispatch(allactions.cohortErrorActions.investigatorEmail(idx, false, errorMsg))
                                    }}>
                                    Add New Investigator
                                    </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            {/* </Col> */}
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
                                    displayStyle={saved} />
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
                                                if (!isReadOnly) {
                                                    setPerson(e, '', '', '', '', 0, 'collaborator');
                                                    if (e.target.checked) {
                                                        dispatch(allactions.cohortErrorActions.collaboratorName(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
                                                    }
                                                    else {
                                                        let phoneCheckResult = getValidationResult(cohort.collaboratorPhone, false, 'phone')
                                                        dispatch(allactions.cohortErrorActions.collaboratorName(false, 'Required Field'))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPosition(false, 'Required Field'))
                                                        if (cohort.collaboratorPhone && phoneCheckResult) dispatch(allactions.cohortErrorActions.collaboratorPhone(false, 'Required Field'))
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
                                                if (!isReadOnly) {
                                                    setPerson(e, '', '', '', '', 1, 'collaborator')
                                                    if (e.target.checked) {
                                                        dispatch(allactions.cohortErrorActions.collaboratorName(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPosition(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPhone(true))
                                                        dispatch(allactions.cohortErrorActions.collaboratorEmail(true))
                                                    }
                                                    else {
                                                        let phoneCheckResult = getValidationResult(cohort.collaboratorPhone, false, 'phone')
                                                        dispatch(allactions.cohortErrorActions.collaboratorName(false, 'Required Field'))
                                                        dispatch(allactions.cohortErrorActions.collaboratorPosition(false, 'Required Field'))
                                                        if (cohort.collaboratorPhone && phoneCheckResult) dispatch(allactions.cohortErrorActions.collaboratorPhone(false, 'Required Field'))
                                                        dispatch(allactions.cohortErrorActions.collaboratorEmail(false, 'Required Filed'))
                                                    }
                                                }
                                            }
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
                                    {/* {errors.eligible_gender_id && saved && 
                                        <div>
                                            <span style={{ color: 'red', fontSize: '16px', paddingLeft: '0' }}>
                                                {errorMsg}
                                            </span> 
                                        </div>
                                    } */}
                            </Form.Label>
                            <Col sm="12" className="p-0 mb-3">
                                <Form.Label column sm="12" style={{ fontWeight: 'normal' }}>
                                    Eligible sex<span style={{ color: 'red' }}>*</span>
                                    {errors.eligible_gender_id && saved && <span className="text-danger ml-3">
                                        {errorMsg}
                                    </span>}
                                </Form.Label>
                                <Col sm="12">
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
                            <Col sm="12" className="p-0 mb-3">
                                <Form.Label column sm="12" style={{ fontWeight: 'normal' }}>
                                    Baseline population consists of
                                    </Form.Label>
                                <Col sm="12" className="mb-3">
                                    <div key="checkbox">
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="default-cancerSurvivors"
                                            name="cancerSurvivors">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={cohort.eligible_disease === 1}
                                                onClick={(e) => {
                                                    if (!isReadOnly) dispatch(allactions.cohortActions.eligible_disease(+e.target.checked))
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Cancer survivors only, specify cancer site(s)
                                                </Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                </Col>
                                <Col sm="12">
                                    <Form.Control type="text"
                                        name='cancerSites'
                                        value={cohort.eligible_disease_cancer_specify}
                                        maxLength="100"
                                        placeholder="Max of 100 characters"
                                        readOnly={!cohort.eligible_disease || isReadOnly}
                                        onChange={e =>
                                            dispatch(allactions.cohortActions.eligible_disease_cancer_specify(e.target.value))
                                        } />
                                </Col>
                            </Col>
                            <Col sm="12" className="p-0">
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
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
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                name='enrollment_year_start'
                                                placeholder='YYYY'
                                                value={cohort.enrollment_year_start}
                                                onChange={e =>
                                                    !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateErrors('enrollment_year_start', e.target.value, true, 'startyear')
                                                } />
                                        </Reminder> :
                                        <Form.Control
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
                                            name='enrollment_year_start'
                                            placeholder='YYYY'
                                            value={cohort.enrollment_year_start}
                                            onChange={e =>
                                                !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_start(e.target.value))
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
                                            <input style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                className='form-control'
                                                name='enrollment_year_end'
                                                placeholder='YYYY'
                                                value={cohort.enrollment_year_end}
                                                onChange={e => {
                                                    if (!isReadOnly) {
                                                        e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))
                                                        if (/^\s*\d{4}\s*$/.test(e.target.value) && e.target.value <= (new Date()).getFullYear()) {
                                                            batch(() => {
                                                                dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                                                dispatch(allactions.cohortErrorActions.enrollment_ongoing(true));
                                                                dispatch(allactions.cohortErrorActions.enrollment_target(true));
                                                                dispatch(allactions.cohortErrorActions.enrollment_year_complete(true));
                                                                cohort.enrollment_target && dispatch(allactions.cohortActions.enrollment_target(''))
                                                                cohort.enrollment_year_complete && dispatch(allactions.cohortActions.enrollment_year_complete(''))
                                                            })
                                                        }
                                                    }
                                                }}
                                                onBlur={e =>
                                                    populateErrors('enrollment_year_end', e.target.value, true, 'endyear')
                                                } />
                                        </Reminder> :
                                        <Form.Control type="text" className='text-capitalize'
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
                                            className='form-control'
                                            name='enrollment_year_end'
                                            placeholder='YYYY'
                                            value={cohort.enrollment_year_end}
                                            onChange={e => { // if it is already ended turn off on going
                                                if (!isReadOnly) {
                                                    e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_end(e.target.value))
                                                    if (/^\s*\d{4}\s*$/.test(e.target.value) && e.target.value <= (new Date()).getFullYear()) {
                                                        batch(() => {
                                                            dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                                            dispatch(allactions.cohortErrorActions.enrollment_ongoing(true));
                                                            dispatch(allactions.cohortErrorActions.enrollment_target(true));
                                                            dispatch(allactions.cohortErrorActions.enrollment_year_complete(true));
                                                            cohort.enrollment_target && dispatch(allactions.cohortActions.enrollment_target(''))
                                                            cohort.enrollment_year_complete && dispatch(allactions.cohortActions.enrollment_year_complete(''))
                                                        })
                                                    }
                                                }
                                            }}
                                            onBlur={e =>
                                                populateErrors('enrollment_year_end', e.target.value, cohort.enrollment_ongoing === 0, 'endyear')
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
                                                        onClick={() => {
                                                            //if (!isReadOnly && !cohort.enrollment_year_end && errors.enrollment_year_end !== 'undefined') {
                                                            if (!isReadOnly) {
                                                                dispatch(allactions.cohortActions.enrollment_ongoing(0));
                                                                dispatch(allactions.cohortErrorActions.enrollment_ongoing(true));
                                                                dispatch(allactions.cohortErrorActions.enrollment_target(true));
                                                                dispatch(allactions.cohortErrorActions.enrollment_year_complete(true));
                                                                cohort.enrollment_target && dispatch(allactions.cohortActions.enrollment_target(''))
                                                                cohort.enrollment_year_complete && dispatch(allactions.cohortActions.enrollment_year_complete(''))
                                                            }
                                                        }
                                                        } />
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
                                                    onClick={e => {
                                                        //if (!isReadOnly && !cohort.enrollment_year_end && errors.enrollment_year_end !== 'undefined') {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.cohortActions.enrollment_ongoing(0))
                                                            //dispatch(allactions.cohortErrorActions.enrollment_year_end(false, 'Required field'))
                                                            dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                            dispatch(allactions.cohortErrorActions.enrollment_target(true))
                                                            dispatch(allactions.cohortErrorActions.enrollment_year_complete(true))
                                                            cohort.enrollment_target && dispatch(allactions.cohortActions.enrollment_target(''))
                                                            cohort.enrollment_year_complete && dispatch(allactions.cohortActions.enrollment_year_complete(''))
                                                        }
                                                    }
                                                    } />
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
                                                        onClick={() => {
                                                            //if (!isReadOnly && !cohort.enrollment_year_end && !errors.enrollment_year_end !== 'undefined') {
                                                            if (!isReadOnly) {
                                                                dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                                                //errors.enrollment_year_end && dispatch(allactions.cohortErrorActions.enrollment_year_end(true))
                                                                dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                                !cohort.enrollment_target && dispatch(allactions.cohortErrorActions.enrollment_target(false, 'Required Field'))
                                                                !cohort.enrollment_year_complete && dispatch(allactions.cohortErrorActions.enrollment_year_complete(false, 'Requred Filed'))
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
                                                    checked={cohort.enrollment_ongoing === 1}
                                                    onClick={e => {
                                                        //if (!isReadOnly && !cohort.enrollment_year_end && !errors.enrollment_year_end !== 'undefined') {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.cohortActions.enrollment_ongoing(1))
                                                            //errors.enrollment_year_end && dispatch(allactions.cohortErrorActions.enrollment_year_end(true))
                                                            dispatch(allactions.cohortErrorActions.enrollment_ongoing(true))
                                                            !cohort.enrollment_target && dispatch(allactions.cohortErrorActions.enrollment_target(false, 'Required Field'))
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                name='enrollment_target'
                                                value={cohort.enrollment_target}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.enrollment_target(e.target.value))
                                                }
                                                onBlur={e => {
                                                    //if (!isReadOnly && !(cohort.enrollment_year_end && !errors.enrollment_year_end)) 
                                                    if (!isReadOnly && cohort.enrollment_ongoing !== 0) populateErrors('enrollment_target', e.target.value, true, 'number')
                                                }
                                                }
                                                disabled={cohort.enrollment_ongoing == 0} />
                                        </Reminder> :
                                        <Form.Control type="text" className='text-capitalize'
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
                                            name='enrollment_target'
                                            value={cohort.enrollment_target}
                                            onChange={e =>
                                                !isReadOnly && dispatch(allactions.cohortActions.enrollment_target(e.target.value))
                                            }
                                            onBlur={e => {
                                                //if (!isReadOnly && !(cohort.enrollment_year_end && !errors.enrollment_year_end)) 
                                                if (!isReadOnly && cohort.enrollment_ongoing !== 0) populateErrors('enrollment_target', e.target.value, true, 'number')
                                            }
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                name='enrollment_year_complete'
                                                placeholder='YYYY'
                                                value={cohort.enrollment_year_complete}
                                                onChange={e =>
                                                    !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))
                                                }
                                                onBlur={e => {
                                                    if (!isReadOnly && cohort.enrollment_ongoing !== 0) populateErrors('enrollment_year_complete', e.target.value, true, 'year')
                                                }}
                                                disabled={cohort.enrollment_ongoing == 0 || isReadOnly} />
                                        </Reminder> :
                                        <Form.Control type="text"
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
                                            name='enrollment_year_complete'
                                            placeholder='YYYY'
                                            value={cohort.enrollment_year_complete}
                                            onChange={e =>
                                                !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.enrollment_year_complete(e.target.value))
                                            }
                                            onBlur={e => {
                                                if (!isReadOnly && cohort.enrollment_ongoing !== 0) populateErrors('enrollment_year_complete', e.target.value, true, 'year')
                                            }}
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
                                                    style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                    name='enrollment_age_min'
                                                    value={cohort.enrollment_age_min}
                                                    onChange={e =>
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))
                                                    }
                                                    onBlur={e =>
                                                        populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max, cohort.enrollment_age_median, cohort.enrollment_age_mean)
                                                    } />
                                            </Reminder> :
                                            <Form.Control type="text" className='text-capitalize'
                                                style={{ minWidth: '100px', maxWidth: '100px' }}
                                                name='enrollment_age_min'
                                                value={cohort.enrollment_age_min}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_min(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateBaseLineMinAgeError(e.target.value, true, cohort.enrollment_age_max, cohort.enrollment_age_median, cohort.enrollment_age_mean)
                                                }
                                                readOnly={isReadOnly} />
                                        }
                                        <InputGroup.Append>
                                            <InputGroup.Text style={{ fontSize: '16px' }}>to</InputGroup.Text>
                                        </InputGroup.Append>
                                        {errors.enrollment_age_max && saved ?
                                            <Reminder message={errors.enrollment_age_max} >
                                                <Form.Control type="text" className='text-capitalize'
                                                    style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                    name='enrollment_age_max'
                                                    value={cohort.enrollment_age_max}
                                                    onChange={e =>
                                                        !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))
                                                    }
                                                    onBlur={e =>
                                                        populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_median, cohort.enrollment_age_mean)
                                                    } />
                                            </Reminder> :
                                            <Form.Control type="text" className='text-capitalize'
                                                style={{ minWidth: '100px', maxWidth: '100px' }}
                                                name='enrollment_age_max'
                                                value={cohort.enrollment_age_max}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.enrollment_age_max(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateBaseLineMaxAgeError(e.target.value, true, cohort.enrollment_age_min, cohort.enrollment_age_median, cohort.enrollment_age_mean)
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
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
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
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
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
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
                                                    style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                    name='current_age_min'
                                                    value={cohort.current_age_min}
                                                    onChange={e =>
                                                        !isReadOnly && dispatch(allactions.cohortActions.current_age_min(e.target.value))
                                                    }
                                                    onBlur={e =>
                                                        populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max, cohort.current_age_median, cohort.current_age_mean)
                                                    } />
                                            </Reminder> :
                                            <Form.Control type="text" className='text-capitalize'
                                                style={{ minWidth: '100px', maxWidth: '100px' }}
                                                name='current_age_min'
                                                value={cohort.current_age_min}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.current_age_min(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateCurrentMinAgeError(e.target.value, true, cohort.current_age_max, cohort.current_age_median, cohort.current_age_mean)
                                                }
                                                readOnly={isReadOnly} />
                                        }
                                        <InputGroup.Append>
                                            <InputGroup.Text style={{ fontSize: '16px' }}>to</InputGroup.Text>
                                        </InputGroup.Append>
                                        {errors.current_age_max && saved ?
                                            <Reminder message={errors.current_age_max}>
                                                <Form.Control type="text" className='text-capitalize'
                                                    style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                    name='current_age_max'
                                                    value={cohort.current_age_max}
                                                    onChange={e =>
                                                        !isReadOnly && dispatch(allactions.cohortActions.current_age_max(e.target.value))
                                                    }
                                                    onBlur={e =>
                                                        populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min, cohort.current_age_median, cohort.current_age_mean)
                                                    } />
                                            </Reminder> :
                                            <Form.Control type="text" className='text-capitalize'
                                                style={{ minWidth: '100px', maxWidth: '100px' }}
                                                name='current_age_max'
                                                value={cohort.current_age_max}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.current_age_max(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateCurrentMaxAgeError(e.target.value, true, cohort.current_age_min, cohort.current_age_median, cohort.current_age_mean)
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                name='current_age_median'
                                                value={cohort.current_age_median}
                                                onChange={e =>
                                                    !isReadOnly && dispatch(allactions.cohortActions.current_age_median(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateMeanMedianAgeError('current_age_median', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                } />
                                        </Reminder> :
                                        <Form.Control type="text" className='text-capitalize'
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
                                            name='current_age_median'
                                            value={cohort.current_age_median}
                                            onChange={e =>
                                                !isReadOnly && dispatch(allactions.cohortActions.current_age_median(e.target.value))
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
                                                style={{ color: 'red', border: '1px solid red', minWidth: '100px', maxWidth: '100px' }}
                                                name='current_age_mean'
                                                value={cohort.current_age_mean}
                                                onChange={e =>
                                                    !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.current_age_mean(e.target.value))
                                                }
                                                onBlur={e =>
                                                    populateMeanMedianAgeError('current_age_mean', e.target.value, true, cohort.current_age_min, cohort.current_age_max)
                                                } />
                                        </Reminder> :
                                        <Form.Control type="text" className='text-capitalize'
                                            style={{ minWidth: '100px', maxWidth: '100px' }}
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
                                            maxLength='200'
                                            name='time_interval'
                                            value={cohort.time_interval}
                                            onChange={e =>
                                                !isReadOnly && dispatch(allactions.cohortActions.time_interval(e.target.value))
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
                                            !isReadOnly && dispatch(allactions.cohortActions.time_interval(e.target.value))
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
                                                !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.most_recent_year(e.target.value))
                                            }
                                            placeholder='YYYY'
                                            onBlur={e =>
                                                populateErrors('most_recent_year', e.target.value, true, 'most_recent_year')
                                            } />
                                    </Reminder> :
                                    <Form.Control type="text"
                                        name='most_recent_year'
                                        value={cohort.most_recent_year}
                                        onChange={e =>
                                            !isReadOnly && e.target.value.length <= 4 && dispatch(allactions.cohortActions.most_recent_year(e.target.value))
                                        }
                                        placeholder='YYYY'
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
                                A.11 How was information from the questionnaire administered/collected?<span style={{ color: 'red' }}>*</span><span className="font-weight-normal">{' '}(Select all that apply)</span>
                                {errors.dataCollection && saved &&
                                    <span style={{ color: 'red', marginLeft: '10px', fontWeight: 'normal' }}>
                                        {errorMsg}
                                    </span>
                                }
                            </Form.Label>
                            <Col sm="12">
                                <div key="checkbox" className="mb-3">
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
                                                !isReadOnly && dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))
                                            }
                                            onBlur={() =>
                                                cohort.data_collected_other && populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')
                                            }
                                            disabled={!cohort.data_collected_other} />
                                    </Reminder> :
                                    <Form.Control type="text" className='text-capitalize'
                                        name='data_collected_other_specify'
                                        value={cohort.data_collected_other_specify}
                                        placeholder='Max of 200 characters'
                                        maxLength='200'
                                        onChange={e =>
                                            !isReadOnly && dispatch(allactions.cohortActions.data_collected_other_specify(e.target.value))
                                        }
                                        onBlur={() =>
                                            cohort.data_collected_other && populateErrors('data_collected_other_specify', cohort.data_collected_other_specify, true, 'string')
                                        }
                                        readOnly={!cohort.data_collected_other || isReadOnly} />
                                }
                            </Col>
                        </Form.Group>

                        {/* A.12 Specific Requirements */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                A.12 Does your cohort have any specific requirements or restrictions concerning participanting in collaborative projects involving pooling of data or specimens or use of specimens in genomic studies?<span style={{ color: 'red' }}>*</span><span className="font-weight-normal">{' '}(Select all that apply)</span>
                                {errors.requirements && saved &&
                                    <span style={{ color: 'red', marginLeft: '10px', fontWeight: 'normal' }}>
                                        {errorMsg}
                                    </span>
                                }
                            </Form.Label>
                            <Col sm="12">
                                <div key="checkbox" className="mb-3">
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
                                            } />
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
                                                cohort.restrictOther && populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')
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
                                            cohort.restrictOther && populateErrors('restrictions_other_specify', cohort.restrictions_other_specify, true, 'string')
                                        }
                                        readOnly={!cohort.restrictOther || isReadOnly} />
                                }
                            </Col>
                        </Form.Group>

                        {/* A.13 Strategies Used */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                A.13 What strategies does your cohort use to engage participants?<span style={{ color: 'red' }}>*</span><span className="font-weight-normal">{' '}(Select all that apply)</span>
                                {errors.strategy && saved &&
                                    <span style={{ color: 'red', marginLeft: '10px', fontWeight: 'normal' }}>
                                        {errorMsg}
                                    </span>
                                }
                            </Form.Label>
                            <Col sm="12">
                                <div key="checkbox" className="mb-3">
                                    <Form.Check type="checkbox"
                                        className="pl-0"
                                        id="default-strategy-routine"
                                        name="strategy_routine">
                                        <Form.Check.Input bsPrefix
                                            type="checkbox"
                                            className="mr-2"
                                            checked={cohort.strategy_routine == 1}
                                            onChange={e =>
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'], 'strategy_routine')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            None
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
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_routine', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'], 'strategy_mailing')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Send newsletters or other information or personal mailings unrelated to data collection (e.g., birthday cards)
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
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_routine', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'], 'strategy_aggregate_study')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Share study findings with participants
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
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_routine', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'], 'strategy_individual_study')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Provide individual results to participants (e.g. genetic variants, blood pressure)
                                            </Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type="checkbox"
                                        className="pl-0"
                                        id="default-strategy-committees"
                                        name="strategy_committees">
                                        <Form.Check.Input bsPrefix
                                            type="checkbox"
                                            className="mr-2"
                                            checked={cohort.strategy_committees == 1}
                                            onChange={e =>
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_routine', 'strategy_individual_study', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'], 'strategy_committees')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Include participants on advisory committees
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
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_routine', 'strategy_participant_input', 'strategy_other'], 'strategy_invitation')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Invite participants to attend meetings/workshops
                                            </Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type="checkbox"
                                        className="pl-0"
                                        id="default-strategy-participant"
                                        name="strategy_participant">
                                        <Form.Check.Input bsPrefix
                                            type="checkbox"
                                            className="mr-2"
                                            checked={cohort.strategy_participant_input == 1}
                                            onChange={e =>
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_routine',
                                                    'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_other'], 'strategy_participant_input')
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Incorporate participant input on research process
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
                                                !isReadOnly && updateErrors(e, 'strategy', ['strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_routine'], 'strategy_other', 'strategy_other_specify', true)
                                            } />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Other participant-centered or outreach activities, please specify
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
                                                cohort.strategy_other && populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')
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
                                            cohort.strategy_other && populateErrors('strategy_other_specify', cohort.strategy_other_specify, true, 'string')
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

                        {/* A.14 Required Documents */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                A.14 Required Documents
                                </Form.Label>
                            <Col sm="12">
                                <p>
                                    As indicated on the CEDCD Approval Form, we are requesting the following
                                    items for inclusion on the CEDCD website. If you provided approval to post
                                    this information, please attach the documents and return them with this form.
                                    If they are already available on a publicly accessible website, please just
                                    provide the website address.
                                    </p>
                            </Col>
                            <Col sm="12">

                                {/* Only show for medium windows and smaller */}
                                <div className="table-responsive d-md-none">
                                    <Table bordered condensed className="table-valign-middle">
                                        <tbody>
                                            <tr>
                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Questionnaire</th>
                                                <td className="p-0">
                                                    <Table style={{ width: '100%', height: '100%', marginBottom: '0' }} bordered condensed className="table-valign-middle">
                                                        <tbody>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col xs="12">
                                                                            {

                                                                                !isReadOnly &&
                                                                                <Button
                                                                                    variant="primary"
                                                                                    bsPrefix
                                                                                    name='questionnaire_url'
                                                                                    id="questionnaire_url"
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={() => {
                                                                                        if (!isReadOnly) {
                                                                                            showUrlModal("Questionniare URL", "questionnaire_url")
                                                                                        }
                                                                                    }}>Add URL</Button>

                                                                            }
                                                                        </Col>
                                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} lg={!isReadOnly ? "7" : "11"}>
                                                                            {cohort.questionnaire_url.length === 0 && (
                                                                                <span>
                                                                                    No URL(s) entered
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.questionnaire_url.length > 0 && (
                                                                                <span>
                                                                                    <a href={cohort.questionnaire_url[0]} target="_blank">{cohort.questionnaire_url[0]}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() => {
                                                                                                    const copy = [...cohort.questionnaire_url];
                                                                                                    copy.splice(0, 1)
                                                                                                    dispatch(allactions.cohortActions.questionnaire_url(copy))
                                                                                                }}>
                                                                                                x
                                                                                                </span>)
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.questionnaire_url.length > 1 && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showUrlListModal('Questionnaire Url', 'questionnaire_url')
                                                                                            }}>
                                                                                            {cohort.questionnaire_url.length - 1} more
                                                                                            </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col sm="12">
                                                                            {
                                                                                !isReadOnly &&
                                                                                <Form.Control
                                                                                    type="file"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile01"
                                                                                    aria-describedby="inputGroupFileAddon01"
                                                                                    multiple
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={e => e.target.value = null}
                                                                                    onChange={e => {
                                                                                        if (!isReadOnly) {
                                                                                            setQfileLoading(true)
                                                                                            handleUpload(e.target.files, 0)
                                                                                        }
                                                                                    }} />
                                                                            }
                                                                        </Col>
                                                                        <Col sm="12">
                                                                            {QfileLoading && (
                                                                                <span>
                                                                                    Loading...
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {!QfileLoading && cohort.questionnaireFileName.length === 0 && (
                                                                                <span>
                                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.questionnaireFileName.length > 0 && (
                                                                                <span>
                                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.questionnaireFileName[0].filename} target="_blank">{cohort.questionnaireFileName[0].filename}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() =>
                                                                                                    deleteFileFromList('questionnaireFileName', cohort.questionnaireFileName[0].filename, cohort.questionnaireFileName[0].fileId, cohortID)
                                                                                                }>
                                                                                                x
                                                                                                    </span>
                                                                                                    )
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.questionnaireFileName.length > 1 && !QfileLoading && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName);
                                                                                            }}>
                                                                                            {cohort.questionnaireFileName.length - 1} more
                                                                                                    </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Main cohort protocol</th>
                                                <td className="p-0">
                                                    <Table style={{ width: '100%', height: '100%', marginBottom: '0' }} bordered condensed className="table-valign-middle">
                                                        <tbody>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col xs="12">
                                                                            {

                                                                                !isReadOnly &&
                                                                                <Button
                                                                                    variant="primary"
                                                                                    bsPrefix
                                                                                    name='main_cohort_url'
                                                                                    id="main_cohort_url"
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={() => {
                                                                                        if (!isReadOnly) {
                                                                                            showUrlModal("Main Cohort URL", "main_cohort_url")
                                                                                        }
                                                                                    }}>Add URL</Button>

                                                                            }
                                                                        </Col>
                                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} lg={!isReadOnly ? "7" : "11"}>
                                                                            {cohort.main_cohort_url.length === 0 && (
                                                                                <span>
                                                                                    No URL(s) entered
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.main_cohort_url.length > 0 && (
                                                                                <span>
                                                                                    <a href={cohort.main_cohort_url[0]} target="_blank">{cohort.main_cohort_url[0]}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() => {
                                                                                                    const copy = [...cohort.main_cohort_url];
                                                                                                    copy.splice(0, 1)
                                                                                                    dispatch(allactions.cohortActions.main_cohort_url(copy))
                                                                                                }}>
                                                                                                x
                                                                                                </span>)
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.main_cohort_url.length > 1 && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showUrlListModal('Main Cohort Url', 'main_cohort_url')
                                                                                            }}>
                                                                                            {cohort.questionnaire_url.length - 1} more
                                                                                            </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col sm="12">
                                                                            {
                                                                                !isReadOnly &&
                                                                                <Form.Control
                                                                                    type="file"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile02"
                                                                                    aria-describedby="inputGroupFileAddon02"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onClick={e => e.target.value = null}
                                                                                    onChange={e => {
                                                                                        if (!isReadOnly) {
                                                                                            setMfileLoading(true)
                                                                                            handleUpload(e.target.files, 1)
                                                                                        }
                                                                                    }} />
                                                                            }
                                                                        </Col>
                                                                        <Col sm="12">
                                                                            {MfileLoading && (
                                                                                <span>
                                                                                    Loading...
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {!MfileLoading && cohort.mainFileName.length === 0 && (
                                                                                <span>
                                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.mainFileName.length > 0 && (
                                                                                <span>
                                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.mainFileName[0].filename} target="_blank">{cohort.mainFileName[0].filename}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() =>
                                                                                                    deleteFileFromList('mainFileName', cohort.mainFileName[0].filename, cohort.mainFileName[0].fileId, cohortID)
                                                                                                }>
                                                                                                x
                                                                                                            </span>
                                                                                                        )
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.mainFileName.length > 1 && !MfileLoading && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)
                                                                                            }}>
                                                                                            {cohort.mainFileName.length - 1} more
                                                                                                </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Data sharing policy</th>
                                                <td className="p-0">
                                                    <Table style={{ width: '100%', height: '100%', marginBottom: '0' }} bordered condensed className="table-valign-middle">
                                                        <tbody>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col xs="12">
                                                                            {

                                                                                !isReadOnly &&
                                                                                <Button
                                                                                    variant="primary"
                                                                                    bsPrefix
                                                                                    name='data_url'
                                                                                    id="data_url"
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={() => {
                                                                                        if (!isReadOnly) {
                                                                                            showUrlModal("Data Sharing URL", "data_url")
                                                                                        }
                                                                                    }}>Add URL</Button>

                                                                            }
                                                                        </Col>
                                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} lg={!isReadOnly ? "7" : "11"}>
                                                                            {cohort.data_url.length === 0 && (
                                                                                <span>
                                                                                    No URL(s) entered
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.data_url.length > 0 && (
                                                                                <span>
                                                                                    <a href={cohort.data_url[0]} target="_blank">{cohort.data_url[0]}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() => {
                                                                                                    const copy = [...cohort.data_url];
                                                                                                    copy.splice(0, 1)
                                                                                                    dispatch(allactions.cohortActions.data_url(copy))
                                                                                                }}>
                                                                                                x
                                                                                                </span>)
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.data_url.length > 1 && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showUrlListModal('Data Sharing Url', 'data_url')
                                                                                            }}>
                                                                                            {cohort.data_url.length - 1} more
                                                                                            </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col sm="12">
                                                                            {
                                                                                !isReadOnly &&
                                                                                <Form.Control
                                                                                    type="file"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile03"
                                                                                    aria-describedby="inputGroupFileAddon03"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onClick={e => e.target.value = null}
                                                                                    onChange={e => {
                                                                                        if (!isReadOnly) {
                                                                                            setDfileLoading(true)
                                                                                            handleUpload(e.target.files, 2)
                                                                                        }
                                                                                    }} />
                                                                            }
                                                                        </Col>
                                                                        <Col sm="12">
                                                                            {DfileLoading && (
                                                                                <span>
                                                                                    Loading...
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {!DfileLoading && cohort.dataFileName.length === 0 && (
                                                                                <span>
                                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.dataFileName.length > 0 && (
                                                                                <span>
                                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.dataFileName[0].filename} target="_blank">{cohort.dataFileName[0].filename}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() =>
                                                                                                    deleteFileFromList('dataFileName', cohort.dataFileName[0].filename, cohort.dataFileName[0].fileId, cohortID)
                                                                                                }>
                                                                                                x
                                                                                                                </span>
                                                                                                            )
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.dataFileName.length > 1 && !DfileLoading && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)
                                                                                            }}>
                                                                                            {cohort.dataFileName.length - 1} more
                                                                                                    </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Biospecimen sharing policy</th>
                                                <td className="p-0">
                                                    <Table style={{ width: '100%', height: '100%', marginBottom: '0' }} bordered condensed className="table-valign-middle">
                                                        <tbody>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col xs="12">
                                                                            {

                                                                                !isReadOnly &&
                                                                                <Button
                                                                                    variant="primary"
                                                                                    bsPrefix
                                                                                    name='specimen_url'
                                                                                    id="specimen_url"
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={() => {
                                                                                        if (!isReadOnly) {
                                                                                            showUrlModal("Biospecimen Sharing URL", "specimen_url")
                                                                                        }
                                                                                    }}>Add URL</Button>

                                                                            }
                                                                        </Col>
                                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} lg={!isReadOnly ? "7" : "11"}>
                                                                            {cohort.specimen_url.length === 0 && (
                                                                                <span>
                                                                                    No URL(s) entered
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.specimen_url.length > 0 && (
                                                                                <span>
                                                                                    <a href={cohort.specimen_url[0]} target="_blank">{cohort.specimen_url[0]}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() => {
                                                                                                    const copy = [...cohort.specimen_url];
                                                                                                    copy.splice(0, 1)
                                                                                                    dispatch(allactions.cohortActions.specimen_url(copy))
                                                                                                }}>
                                                                                                x
                                                                                                </span>)
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.specimen_url.length > 1 && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showUrlListModal('Biospecimen Sharing Url', 'specimen_url')
                                                                                            }}>
                                                                                            {cohort.specimen_url.length - 1} more
                                                                                            </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col sm="12">
                                                                            {
                                                                                !isReadOnly &&
                                                                                <Form.Control
                                                                                    type="file"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile04"
                                                                                    aria-describedby="inputGroupFileAddon04"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onClick={e => e.target.value = null}
                                                                                    onChange={e => {
                                                                                        if (!isReadOnly) {
                                                                                            setSfileLoading(true)
                                                                                            handleUpload(e.target.files, 3)
                                                                                        }
                                                                                    }} />
                                                                            }
                                                                        </Col>
                                                                        <Col sm="12">
                                                                            {SfileLoading && (
                                                                                <span>
                                                                                    Loading...
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {!SfileLoading && cohort.specimenFileName.length === 0 && (
                                                                                <span>
                                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.specimenFileName.length > 0 && (
                                                                                <span>
                                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.specimenFileName[0].filename} target="_blank">{cohort.specimenFileName[0].filename}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() =>
                                                                                                    deleteFileFromList('specimenFileName', cohort.specimenFileName[0].filename, cohort.specimenFileName[0].fileId, cohortID)
                                                                                                }>
                                                                                                x
                                                                                                                </span>
                                                                                                            )
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.specimenFileName.length > 1 && !SfileLoading && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)
                                                                                            }}>
                                                                                            {cohort.specimenFileName.length - 1} more
                                                                                                    </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Publication (authorship) policy</th>
                                                <td className="p-0">
                                                    <Table style={{ width: '100%', height: '100%', marginBottom: '0' }} bordered condensed className="table-valign-middle">
                                                        <tbody>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Web Url</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col xs="12">
                                                                            {

                                                                                !isReadOnly &&
                                                                                <Button
                                                                                    variant="primary"
                                                                                    bsPrefix
                                                                                    name='publication_url'
                                                                                    id="publication_url"
                                                                                    readOnly={isReadOnly}
                                                                                    onClick={() => {
                                                                                        if (!isReadOnly) {
                                                                                            showUrlModal("Publication Policy URL", "publication_url")
                                                                                        }
                                                                                    }}>Add URL</Button>

                                                                            }
                                                                        </Col>
                                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} lg={!isReadOnly ? "7" : "11"}>
                                                                            {cohort.publication_url.length === 0 && (
                                                                                <span>
                                                                                    No URL(s) entered
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.publication_url.length > 0 && (
                                                                                <span>
                                                                                    <a href={cohort.publication_url[0]} target="_blank">{cohort.publication_url[0]}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() => {
                                                                                                    const copy = [...cohort.publication_url];
                                                                                                    copy.splice(0, 1)
                                                                                                    dispatch(allactions.cohortActions.publication_url(copy))
                                                                                                }}>
                                                                                                x
                                                                                                </span>)
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.publication_url.length > 1 && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showUrlListModal('Publication Policy Url', 'publication_url')
                                                                                            }}>
                                                                                            {cohort.publication_url.length - 1} more
                                                                                            </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="align-middle" style={{ backgroundColor: '#01857b', color: 'white' }}>Attached</th>
                                                                <td>
                                                                    <Row className="w-100">
                                                                        <Col sm="12">
                                                                            {
                                                                                !isReadOnly &&
                                                                                <Form.Control
                                                                                    type="file"
                                                                                    name='cohortFile'
                                                                                    id="inputGroupFile05"
                                                                                    aria-describedby="inputGroupFileAddon05"
                                                                                    multiple readOnly={isReadOnly}
                                                                                    onClick={e => e.target.value = null}
                                                                                    onChange={e => {
                                                                                        if (!isReadOnly) {
                                                                                            setPfileLoading(true)
                                                                                            handleUpload(e.target.files, 4)
                                                                                        }
                                                                                    }} />
                                                                            }
                                                                        </Col>
                                                                        <Col sm="12">
                                                                            {PfileLoading && (
                                                                                <span>
                                                                                    Loading...
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {!PfileLoading && cohort.publicationFileName.length === 0 && (
                                                                                <span>
                                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.publicationFileName.length > 0 && (
                                                                                <span>
                                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.publicationFileName[0].filename} target="_blank">{cohort.publicationFileName[0].filename}</a>
                                                                                    {!isReadOnly &&
                                                                                        <>
                                                                                            {' '}(
                                                                                            <span class="closer"
                                                                                                onClick={() =>
                                                                                                    deleteFileFromList('publicationFileName', cohort.publicationFileName[0].filename, cohort.publicationFileName[0].fileId, cohortID)
                                                                                                }>
                                                                                                x
                                                                                                            </span>
                                                                                                        )
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            )
                                                                            }
                                                                            {cohort.publicationFileName.length > 1 && !PfileLoading && (
                                                                                <>
                                                                                    <span classNamne="mx-1">
                                                                                        {' '}and{' '}
                                                                                    </span>
                                                                                    <span>
                                                                                        <a href='#'
                                                                                            onClick={e => {
                                                                                                e.preventDefault();
                                                                                                showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)
                                                                                            }}>
                                                                                            {cohort.publicationFileName.length - 1} more
                                                                                                </a>
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                            }
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                {/* Only show for medium windows and larger */}
                                <div className="table-responsive d-none d-md-block">
                                    <Table bordered condensed className="table-valign-middle">
                                        <thead>
                                            <tr>
                                                <th className="text-center w-10">Document</th>
                                                <th className="text-center w-40">Website URL (preferred)</th>
                                                <th className="text-center w-50">Attached (if url not applicable)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="bg-light-grey">Questionnaires</td>

                                                <td style={{ verticalAlign: 'middle' }}>
                                                    <Row className="w-100">

                                                        <Col md={!isReadOnly ? "12" : "1"} xl={!isReadOnly ? "4" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Button
                                                                    variant="primary"
                                                                    bsPrefix
                                                                    name='questionnaire_url'
                                                                    id="questionnaire_url"
                                                                    readOnly={isReadOnly}
                                                                    style={{ whiteSpace: "nowrap" }}
                                                                    onClick={() => {
                                                                        if (!isReadOnly) {
                                                                            showUrlModal("Questionniare URL", "questionnaire_url")
                                                                        }
                                                                    }}>Add URL</Button>

                                                            }
                                                        </Col>
                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} xl={!isReadOnly ? "7" : "11"}>
                                                            {cohort.questionnaire_url.length === 0 && (
                                                                <span>
                                                                    No URL(s) entered
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.questionnaire_url.length > 0 && (
                                                                <div className="text-break">
                                                                    <a href={cohort.questionnaire_url[0]} target='_blank'>{cohort.questionnaire_url[0]}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() => {
                                                                                    const copy = [...cohort.questionnaire_url];
                                                                                    copy.splice(0, 1)
                                                                                    dispatch(allactions.cohortActions.questionnaire_url(copy))
                                                                                }}>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                            {cohort.questionnaire_url.length > 1 && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showUrlListModal('Questionnaire Url', 'questionnaire_url')
                                                                            }}>
                                                                            {cohort.questionnaire_url.length - 1} more
                                                                                    </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>

                                                    </Row>
                                                </td>

                                                <td >
                                                    <Row className="w-100">
                                                        <Col sm={!isReadOnly ? "3" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Form.Control
                                                                    type="file"
                                                                    name='cohortFile'
                                                                    id="inputGroupFile01"
                                                                    aria-describedby="inputGroupFileAddon01"
                                                                    multiple
                                                                    readOnly={isReadOnly}
                                                                    onClick={e => e.target.value = null}
                                                                    onChange={e => {
                                                                        if (!isReadOnly) {
                                                                            setQfileLoading(true)
                                                                            handleUpload(e.target.files, 0)
                                                                        }
                                                                    }} />
                                                            }
                                                        </Col>
                                                        <Col sm="9" className="pl-0">
                                                            {QfileLoading && (
                                                                <span>
                                                                    Loading...
                                                                </span>
                                                            )
                                                            }
                                                            {!QfileLoading && cohort.questionnaireFileName.length === 0 && (
                                                                <span>
                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.questionnaireFileName.length > 0 && (
                                                                <span>
                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.questionnaireFileName[0].filename} target="_blank">{cohort.questionnaireFileName[0].filename}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() =>
                                                                                    deleteFileFromList('questionnaireFileName', cohort.questionnaireFileName[0].filename, cohort.questionnaireFileName[0].fileId, cohortID)
                                                                                }>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.questionnaireFileName.length > 1 && !QfileLoading && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showFileList('Questionnaire Documents', 'questionnaireFileName', cohort.questionnaireFileName)
                                                                            }}>
                                                                            {cohort.questionnaireFileName.length - 1} more
                                                                                    </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="bg-light-grey">Main cohort protocol</td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col md={!isReadOnly ? "12" : "1"} xl={!isReadOnly ? "4" : "1"} className="pr-0">
                                                            {

                                                                !isReadOnly &&
                                                                <Button
                                                                    variant="primary"
                                                                    bsPrefix
                                                                    name='main_cohort_url'
                                                                    id="main_cohort_url"
                                                                    readOnly={isReadOnly}
                                                                    style={{ whiteSpace: "nowrap" }}
                                                                    onClick={() => {
                                                                        if (!isReadOnly) {
                                                                            showUrlModal("Main Cohort URL", "main_cohort_url")
                                                                        }
                                                                    }}>Add URL</Button>

                                                            }
                                                        </Col>
                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} xl={!isReadOnly ? "7" : "11"}>
                                                            {cohort.main_cohort_url.length === 0 && (
                                                                <span>
                                                                    No URL(s) entered
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.main_cohort_url.length > 0 && (
                                                                <div className="text-break">
                                                                    <a href={cohort.main_cohort_url[0]} target="_blank">{cohort.main_cohort_url[0]}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() => {
                                                                                    const copy = [...cohort.main_cohort_url];
                                                                                    copy.splice(0, 1)
                                                                                    dispatch(allactions.cohortActions.main_cohort_url(copy))
                                                                                }}>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                            {cohort.main_cohort_url.length > 1 && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showUrlListModal('Main Cohort Url', 'main_cohort_url')
                                                                            }}>
                                                                            {cohort.main_cohort_url.length - 1} more
                                                                            </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>

                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col sm={!isReadOnly ? "3" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Form.Control
                                                                    type="file"
                                                                    name='cohortFile'
                                                                    id="inputGroupFile02"
                                                                    aria-describedby="inputGroupFileAddon02"
                                                                    multiple readOnly={isReadOnly}
                                                                    onClick={e => e.target.value = null}
                                                                    onChange={e => {
                                                                        if (!isReadOnly) {
                                                                            setMfileLoading(true)
                                                                            handleUpload(e.target.files, 1)
                                                                        }
                                                                    }} />
                                                            }
                                                        </Col>
                                                        <Col sm="9" className="pl-0">
                                                            {MfileLoading && (
                                                                <span>
                                                                    Loading...
                                                                </span>
                                                            )
                                                            }
                                                            {!MfileLoading && cohort.mainFileName.length === 0 && (
                                                                <span>
                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.mainFileName.length > 0 && (
                                                                <span>
                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.mainFileName[0].filename} target="_blank">{cohort.mainFileName[0].filename}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() =>
                                                                                    deleteFileFromList('mainFileName', cohort.mainFileName[0].filename, cohort.mainFileName[0].fileId, cohortID)
                                                                                }>
                                                                                x
                                                                                            </span>
                                                                                        )
                                                                        </>
                                                                    }
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.mainFileName.length > 1 && !MfileLoading && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showFileList('Main Cohort Documents', 'mainFileName', cohort.mainFileName)
                                                                            }}>
                                                                            {cohort.mainFileName.length - 1} more
                                                                                </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="bg-light-grey">Data sharing policy</td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col md={!isReadOnly ? "12" : "1"} xl={!isReadOnly ? "4" : "1"} className="pr-0">
                                                            {

                                                                !isReadOnly &&
                                                                <Button
                                                                    variant="primary"
                                                                    bsPrefix
                                                                    name='data_url'
                                                                    id="data_url"
                                                                    readOnly={isReadOnly}
                                                                    style={{ whiteSpace: "nowrap" }}
                                                                    onClick={() => {
                                                                        if (!isReadOnly) {
                                                                            showUrlModal("Data Sharing URL", "data_url")
                                                                        }
                                                                    }}>Add URL</Button>

                                                            }
                                                        </Col>
                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} xl={!isReadOnly ? "7" : "11"}>
                                                            {cohort.data_url.length === 0 && (
                                                                <span>
                                                                    No URL(s) entered
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.data_url.length > 0 && (
                                                                <div className="text-break">
                                                                    <a href={cohort.data_url[0]} target="_blank">{cohort.data_url[0]}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() => {
                                                                                    const copy = [...cohort.data_url];
                                                                                    copy.splice(0, 1)
                                                                                    dispatch(allactions.cohortActions.data_url(copy))
                                                                                }}>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                            {cohort.data_url.length > 1 && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showUrlListModal('Data Sharing Url', 'data_url')
                                                                            }}>
                                                                            {cohort.data_url.length - 1} more
                                                                            </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col sm={!isReadOnly ? "3" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Form.Control
                                                                    type="file"
                                                                    name='cohortFile'
                                                                    id="inputGroupFile03"
                                                                    aria-describedby="inputGroupFileAddon03"
                                                                    multiple readOnly={isReadOnly}
                                                                    onClick={e => e.target.value = null}
                                                                    onChange={e => {
                                                                        if (!isReadOnly) {
                                                                            setDfileLoading(true)
                                                                            handleUpload(e.target.files, 2)
                                                                        }
                                                                    }} />
                                                            }
                                                        </Col>
                                                        <Col sm="9" className="pl-0">
                                                            {DfileLoading && (
                                                                <span>
                                                                    Loading...
                                                                </span>
                                                            )
                                                            }
                                                            {!DfileLoading && cohort.dataFileName.length === 0 && (
                                                                <span>
                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.dataFileName.length > 0 && (
                                                                <span>
                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.dataFileName[0].filename} target="_blank">{cohort.dataFileName[0].filename}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() =>
                                                                                    deleteFileFromList('dataFileName', cohort.dataFileName[0].filename, cohort.dataFileName[0].fileId, cohortID)
                                                                                }>
                                                                                x
                                                                                                </span>
                                                                                            )
                                                                        </>
                                                                    }
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.dataFileName.length > 1 && !DfileLoading && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showFileList('Data Sharing Documents', 'dataFileName', cohort.dataFileName)
                                                                            }}>
                                                                            {cohort.dataFileName.length - 1} more
                                                                                    </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="bg-light-grey">Biospecimen sharing policy</td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col md={!isReadOnly ? "12" : "1"} xl={!isReadOnly ? "4" : "1"} className="pr-0">
                                                            {

                                                                !isReadOnly &&
                                                                <Button
                                                                    variant="primary"
                                                                    bsPrefix
                                                                    name='specimen_url'
                                                                    id="specimen_url"
                                                                    readOnly={isReadOnly}
                                                                    style={{ whiteSpace: "nowrap" }}
                                                                    onClick={() => {
                                                                        if (!isReadOnly) {
                                                                            showUrlModal("Biospecimen Sharing URL", "specimen_url")
                                                                        }
                                                                    }}>Add URL</Button>

                                                            }
                                                        </Col>
                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} xl={!isReadOnly ? "7" : "11"}>
                                                            {cohort.specimen_url.length === 0 && (
                                                                <span>
                                                                    No URL(s) entered
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.specimen_url.length > 0 && (
                                                                <div className="text-break">
                                                                    <a href={cohort.specimen_url[0]} target="_blank">{cohort.specimen_url[0]}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() => {
                                                                                    const copy = [...cohort.specimen_url];
                                                                                    copy.splice(0, 1)
                                                                                    dispatch(allactions.cohortActions.specimen_url(copy))
                                                                                }}>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                            {cohort.specimen_url.length > 1 && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showUrlListModal('Biospecimen Sharing Url', 'specimen_url')
                                                                            }}>
                                                                            {cohort.specimen_url.length - 1} more
                                                                            </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col sm={!isReadOnly ? "3" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Form.Control
                                                                    type="file"
                                                                    name='cohortFile'
                                                                    id="inputGroupFile04"
                                                                    aria-describedby="inputGroupFileAddon04"
                                                                    multiple readOnly={isReadOnly}
                                                                    onClick={e => e.target.value = null}
                                                                    onChange={e => {
                                                                        if (!isReadOnly) {
                                                                            setSfileLoading(true)
                                                                            handleUpload(e.target.files, 3)
                                                                        }
                                                                    }} />
                                                            }
                                                        </Col>
                                                        <Col sm="9" className="pl-0">
                                                            {SfileLoading && (
                                                                <span>
                                                                    Loading...
                                                                </span>
                                                            )
                                                            }
                                                            {!SfileLoading && cohort.specimenFileName.length === 0 && (
                                                                <span>
                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.specimenFileName.length > 0 && (
                                                                <span>
                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.specimenFileName[0].filename} target="_blank">{cohort.specimenFileName[0].filename}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() =>
                                                                                    deleteFileFromList('specimenFileName', cohort.specimenFileName[0].filename, cohort.specimenFileName[0].fileId, cohortID)
                                                                                }>
                                                                                x
                                                                                                </span>
                                                                                            )
                                                                        </>
                                                                    }
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.specimenFileName.length > 1 && !SfileLoading && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showFileList('Biospecimen Sharing Documents', 'specimenFileName', cohort.specimenFileName)
                                                                            }}>
                                                                            {cohort.specimenFileName.length - 1} more
                                                                                    </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="bg-light-grey">Publication(authorship) policy</td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col md={!isReadOnly ? "12" : "1"} xl={!isReadOnly ? "4" : "1"} className="pr-0">
                                                            {

                                                                !isReadOnly &&
                                                                <Button
                                                                    variant="primary"
                                                                    bsPrefix
                                                                    name='publication_url'
                                                                    id="publication_url"
                                                                    readOnly={isReadOnly}
                                                                    style={{ whiteSpace: "nowrap" }}
                                                                    onClick={() => {
                                                                        if (!isReadOnly) {
                                                                            showUrlModal("Publication Policy URL", "publication_url")
                                                                        }
                                                                    }}>Add URL</Button>

                                                            }
                                                        </Col>
                                                        <Col style={{ lineHeight: '2em' }} md={!isReadOnly ? "12" : "11"} xl={!isReadOnly ? "7" : "11"}>
                                                            {cohort.publication_url.length === 0 && (
                                                                <span>
                                                                    No URL(s) entered
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.publication_url.length > 0 && (
                                                                <div className="text-break">
                                                                    <a href={cohort.publication_url[0]} target="_blank">{cohort.publication_url[0]}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() => {
                                                                                    const copy = [...cohort.publication_url];
                                                                                    copy.splice(0, 1)
                                                                                    dispatch(allactions.cohortActions.publication_url(copy))
                                                                                }}>
                                                                                x
                                                                                </span>)
                                                                        </>
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                            {cohort.publication_url.length > 1 && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showUrlListModal('Publication Policy Url', 'publication_url')
                                                                            }}>
                                                                            {cohort.publication_url.length - 1} more
                                                                            </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <Row className="w-100">
                                                        <Col sm={!isReadOnly ? "3" : "1"} className="pr-0">
                                                            {
                                                                !isReadOnly &&
                                                                <Form.Control
                                                                    type="file"
                                                                    name='cohortFile'
                                                                    id="inputGroupFile05"
                                                                    aria-describedby="inputGroupFileAddon05"
                                                                    multiple readOnly={isReadOnly}
                                                                    onClick={e => e.target.value = null}
                                                                    onChange={e => {
                                                                        if (!isReadOnly) {
                                                                            setPfileLoading(true)
                                                                            handleUpload(e.target.files, 4)
                                                                        }
                                                                    }} />
                                                            }
                                                        </Col>
                                                        <Col sm="9" className="pl-0">
                                                            {PfileLoading && (
                                                                <span>
                                                                    Loading...
                                                                </span>
                                                            )
                                                            }
                                                            {!PfileLoading && cohort.publicationFileName.length === 0 && (
                                                                <span>
                                                                    { isReadOnly ? 'No file(s) uploaded' : 'No file chosen'}
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.publicationFileName.length > 0 && (
                                                                <span>
                                                                    <a href={'../../../api/download/' + cohort.cohort_acronym + '/' + cohort.publicationFileName[0].filename} target="_blank">{cohort.publicationFileName[0].filename}</a>
                                                                    {!isReadOnly &&
                                                                        <>
                                                                            {' '}(
                                                                            <span class="closer"
                                                                                onClick={() =>
                                                                                    deleteFileFromList('publicationFileName', cohort.publicationFileName[0].filename, cohort.publicationFileName[0].fileId, cohortID)
                                                                                }>
                                                                                x
                                                                                            </span>
                                                                                        )
                                                                        </>
                                                                    }
                                                                </span>
                                                            )
                                                            }
                                                            {cohort.publicationFileName.length > 1 && !PfileLoading && (
                                                                <>
                                                                    <span classNamne="mx-1">
                                                                        {' '}and{' '}
                                                                    </span>
                                                                    <span>
                                                                        <a href='#'
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                showFileList('Publication Policy Documents', 'publicationFileName', cohort.publicationFileName)
                                                                            }}>
                                                                            {cohort.publicationFileName.length - 1} more
                                                                                </a>
                                                                    </span>
                                                                </>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Form.Group>

                    </CollapsiblePanel>

                </CollapsiblePanelContainer>
            </Form>

            <QuestionnaireFooter
                isAdmin={isReadOnly}
                handlePrevious={false}
                handleNext={_ => props.sectionPicker('B')}
                handleSave={handleSave}
                handleSaveContinue={handleSaveContinue}
                handleSubmitForReview={handleSubmitForReview}
                handleApprove={false}
                handleReject={false} />


            {
                // fileListShow && file_list(fileListTile, currentFileListName, currentFileList)
            }

        </Container>
    )
}

export default CohortForm