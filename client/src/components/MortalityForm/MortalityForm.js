import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Reminder from '../Tooltip/Tooltip'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import { fetchCohort } from '../../reducers/cohort';
import './MortalityForm.css';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter';

const MortalityForm = ({ ...props }) => {
    const isReadOnly = props.isReadOnly || false

    const mortality = useSelector(state => state.mortalityReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const userSession = useSelector(state => state.user);
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [userEmails, setEmails] = useState('')
    const [message, setMessage] = useState('')
    const [activePanels, setActivePanels] = useState({ A: true });
    const toggleActivePanel = name => setActivePanels({
        ...activePanels,
        [name]: !activePanels[name]
    })
    const history = useHistory();

    const radioError = 'Please choose one'

    const [errors, setErrors] = useState({
        mortalityYear: '',
        deathConfirm: '',
        deathIndex: '',
        deathCertificate: '',
        otherDeath: '',
        otherDeathSpecify: '',
        haveDeathDate: '',
        haveDeathCause: '',
        coded: '',
        icd9: '',
        icd10: '',
        notCoded: '',
        otherCode: '',
        otherCodeSpecify: '',
        deathNumbers: ''
    })
    //const cohortId = +window.location.pathname.split('/').pop();

    useEffect(() => {
        if (!mortality.hasLoaded) {
            fetch(`/api/questionnaire/mortality/${cohortId}`, {
                method: 'POST',
            }).then(res => res.json())
                .then(result => {
                    setEmails(result.data.emails)
                    if (result.data.info[0] !== undefined) {
                        const data = result.data.info[0]
                        console.log(data)

                        batch(() => {
                            dispatch(allactions.mortalityActions.setHasLoaded(true))
                            dispatch(allactions.mortalityActions.setMortalityYear(data.mort_year_mortality_followup))
                            dispatch(allactions.mortalityActions.setDeathIndex(data.mort_death_confirmed_by_ndi_linkage))
                            dispatch(allactions.mortalityActions.setDeathCertificate(data.mort_death_confirmed_by_death_certificate))
                            dispatch(allactions.mortalityActions.setOtherDeath(data.mort_death_confirmed_by_other))
                            dispatch(allactions.mortalityActions.setOtherDeathSpecify(data.mort_death_confirmed_by_other_specify))
                            dispatch(allactions.mortalityActions.setHaveDeathDate(data.mort_have_date_of_death))
                            dispatch(allactions.mortalityActions.setHaveDeathCause(data.mort_have_cause_of_death))
                            dispatch(allactions.mortalityActions.setIcd9(data.mort_death_code_used_icd9))
                            dispatch(allactions.mortalityActions.setIcd10(data.mort_death_code_used_icd10))
                            dispatch(allactions.mortalityActions.setNotCoded(data.mort_death_not_coded))
                            dispatch(allactions.mortalityActions.setOtherCode(data.mort_death_code_used_other))
                            dispatch(allactions.mortalityActions.setOtherCodeSpecify(data.mort_death_code_used_other_specify))
                            dispatch(allactions.mortalityActions.setDeathNumbers(data.mort_number_of_deaths))
                        })
                    }
                })
        }
    }, [])

    const sendEmail = (template, topic) => {

        fetch('/api/questionnaire/select_admin_info', {
            method: "POST",
            body: JSON.stringify({ id: cohortId }),
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
                            sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ')
                    }
                })
        }
    }

    const validateInput = () => {

        let copy = { ...errors }

        copy.mortalityYear = validator.numberValidator(mortality.mortalityYear, true, false)

        if (!copy.mortalityYear && mortality.mortalityYear.toString().length !== 4)
            copy.mortalityYear = 'Please enter a 4 digit year'

        if (!mortality.deathIndex && !mortality.deathCertificate && !mortality.otherDeath) {
            copy.deathConfirm = 'Required Field'
        }
        else {
            copy.deathConfirm = '';

            if (mortality.otherDeath === 1) {
                if (mortality.otherDeathSpecify === null || !mortality.otherDeathSpecify)
                    copy.otherDeathSpecify = 'Please specify'
                else {
                    if (mortality.otherDeathSpecify.length > 200)
                        copy.otherDeathSpecify = 'Cannot exceed 200 characters'
                    else
                        copy.otherDeathSpecify = ''
                }
            }
            else
                copy.otherDeathSpecify = '';
        }

        if (!(mortality.haveDeathDate in [0, 1])) { copy.haveDeathDate = radioError } else { copy.haveDeathDate = '' }
        if (!(mortality.haveDeathCause in [0, 1])) { copy.haveDeathCause = radioError } else { copy.haveDeathCause = '' }
        if (mortality.haveDeathCause === 1) {

            if (!mortality.icd9 && !mortality.icd10 && !mortality.notCoded && !mortality.otherCode)
                copy.coded = 'Select at least one option'
            else
                copy.coded = ''

            if (mortality.otherCode === 1) {
                if (mortality.otherCodeSpecify === null || !mortality.otherCodeSpecify)
                    copy.otherCodeSpecify = 'Please specify'
                else {
                    if (mortality.otherCodeSpecify.length > 200)
                        copy.otherCodeSpecify = 'Cannot exceed 200 characters'
                    else
                        copy.otherCodeSpecify = ''
                }
            }
            else
                copy.otherCodeSpecify = '';
        }
        else {
            copy.coded = '';
            copy.otherCodeSpecify = '';
        }

        if (mortality.deathNumbers === 0 || mortality.deathNumbers === '0')
            copy.deathNumbers = ''
        else
            copy.deathNumbers = validator.numberValidator(mortality.deathNumbers, true, false)


        setErrors(copy);

        return !Object.values(copy).some(x => (x !== undefined && x !== ''));
    }

    const saveMortality = (id = cohortId, proceed = false, complete) => {

        let user_id = userSession.id
        const copy = { ...mortality, sectionEStatus: complete, 'userID': user_id }

        // console.log(JSON.stringify(copy))
        fetch(`/api/questionnaire/update_mortality/${id}`, {
            method: "POST",
            body: JSON.stringify(copy),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    dispatch(setHasUnsavedChanges(false));
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId) {
                            dispatch(fetchCohort(result.data.duplicated_cohort_id))
                            // if cohort_id changed, refresh section status
                            let secStatusList = result.data.sectionStatusList
                            if (secStatusList && secStatusList.length > 0) secStatusList.map((item, idx) => {
                                dispatch(allactions.sectionActions.setSectionStatus(item.page_code, item.status))
                            })
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            history.push(window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id));
                            // window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                        }else dispatch(fetchCohort(cohortId))
                        if (result.data.status && result.data.status != cohortStatus) {
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
                            //dispatch(fetchCohort(result.data.duplicated_cohort_id)) /* if result.data.status present, duplicated_cohort_id is too */
                        }
                    }
                    if (!proceed) {
                        setSuccessMsg(true)
                    }
                    else
                        props.sectionPicker('F')
                } else {
                    setSuccessMsg(true)
                }
            })
    }


    const handleSave = () => {
        setSaved(true)
        if (validateInput()) {
            dispatch(allactions.mortalityActions.setSectionEStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('E', 'complete'))
            saveMortality(cohortId, false, 'complete')
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)
        if (validateInput()) {
            dispatch(allactions.mortalityActions.setSectionEStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('E', 'complete'))
            saveMortality(cohortId, true, 'complete')
        }
        else {
            setModalShow(true)
            setProceed(true)
        }
    }

    const confirmSaveStay = () => {

        dispatch(allactions.mortalityActions.setSectionEStatus('incomplete'))
        dispatch(allactions.sectionActions.setSectionStatus('E', 'incomplete'))
        saveMortality(cohortId, false, 'incomplete')

        setModalShow(false)
    }

    const confirmSaveContinue = () => {

        dispatch(allactions.mortalityActions.setSectionEStatus('incomplete'))
        dispatch(allactions.sectionActions.setSectionStatus('E', 'incomplete'))
        saveMortality(cohortId, true, 'incomplete')

        setModalShow(false)
    }

    return (
        <Container>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
                <Form>
                    <CollapsiblePanelContainer>
                        <CollapsiblePanel
                            condition={activePanels.A}
                            onClick={_ => toggleActivePanel('A')}
                            panelTitle="Mortality">

                            <Form.Group as={Row} className={saved && errors.mortalityYear && `has-error`}>
                                <Form.Label column sm="12">E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Col sm="2">
                                    <Reminder message={errors.mortalityYear} disabled={!(saved && errors.mortalityYear)} placement="right">
                                        <Form.Control
                                            className='no-spinner'
                                            name='mortalityYear'
                                            type="number"
                                            min="1900"
                                            value={mortality.mortalityYear}
                                            readOnly={isReadOnly}
                                            onChange={e => { dispatch(allactions.mortalityActions.setMortalityYear(e.target.value)); dispatch(setHasUnsavedChanges(true)); }}
                                            placeholder='YYYY'
                                        />
                                    </Reminder>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={saved && errors.otherDeathSpecify && 'has-error'}>
                                <Form.Label column sm="12">E.2 How did your cohort confirm death?<span style={{ color: 'red' }}>*</span><span style={{ fontWeight: 'normal'}}> (Select all that apply)</span>
                                    {saved && errors.deathConfirm && <span className="font-weight-normal text-danger ml-3">Required Field</span>}
                                </Form.Label>
                                <Col sm="12">
                                    <div key="checkbox">
                                        <Form.Check className="pl-0" name='deathIndex'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.deathIndex === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setDeathIndex((mortality.deathIndex + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />

                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                U.S. National Death Index (NDI) linkage
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='deathCertificate'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.deathCertificate === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setDeathCertificate((mortality.deathCertificate + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />

                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Death Certificates
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='otherDeath'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.otherDeath === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setOtherDeath((mortality.otherDeath + 1) % 2));
                                                        dispatch(allactions.mortalityActions.setOtherDeathSpecify(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />

                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Other
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </div>

                                    <Reminder message={errors.otherDeathSpecify} disabled={!(saved && errors.otherDeathSpecify)} placement="right">
                                        <Form.Control type='text'
                                            name='otherDeathSpecify'
                                            className='form-control'
                                            value={mortality.otherDeathSpecify}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 200 characters'
                                            onChange={e => {
                                                dispatch(allactions.mortalityActions.setOtherDeathSpecify(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                            disabled={mortality.otherDeath !== 1}
                                        />
                                    </Reminder>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="12">
                                    E.3 Do you have date of death for most subjects<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.haveDeathDate && <span className="font-weight-normal text-danger ml-3">Required Field</span>}
                                </Form.Label>
                                <Col sm="6" className="align-self-center">
                                    <Form.Check type='radio'
                                        name='haveDeathDate'
                                        inline>
                                        <Form.Check.Input
                                            type='radio'
                                            type="radio"
                                            className="mr-2"
                                            checked={mortality.haveDeathDate === 0}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(allactions.mortalityActions.setHaveDeathDate(0));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }
                                            }}
                                        />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            No
                                        </Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type='radio'
                                        name='haveDeathDate'
                                        inline>
                                        <Form.Check.Input
                                            type='radio'
                                            className="mr-2"
                                            checked={mortality.haveDeathDate === 1}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(allactions.mortalityActions.setHaveDeathDate(1));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }
                                            }} />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Yes
                                        </Form.Check.Label>
                                    </Form.Check>

                                </Col>
                            </Form.Group>

                            <Form as={Row}>

                                <Form.Label column sm="12">
                                    E.4 Do you have cause of death for most subjects<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.haveDeathCause && <span className="font-weight-normal text-danger ml-3">Required Field</span>}
                                </Form.Label>
                                <Col sm="6" className="align-self-center">
                                    <Form.Check type='radio'
                                        name='haveDeathCause'
                                        inline>
                                        <Form.Check.Input
                                            type='radio'
                                            type="radio"
                                            className="mr-2"
                                            checked={mortality.haveDeathCause === 0}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(allactions.mortalityActions.setHaveDeathCause(0));
                                                    dispatch(allactions.mortalityActions.setIcd9(0));
                                                    dispatch(allactions.mortalityActions.setIcd10(0));
                                                    dispatch(allactions.mortalityActions.setOtherCode(0));
                                                    dispatch(allactions.mortalityActions.setOtherCodeSpecify(''))
                                                    dispatch(setHasUnsavedChanges(true));
                                                }
                                            }}
                                        />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            No
                                    </Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type='radio'
                                        name='haveDeathCause'
                                        inline>
                                        <Form.Check.Input
                                            type='radio'
                                            type="radio"
                                            className="mr-2"
                                            checked={mortality.haveDeathCause === 1}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(allactions.mortalityActions.setHaveDeathCause(1));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }
                                            }}
                                        />
                                        <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                            Yes
                                        </Form.Check.Label>
                                    </Form.Check>

                                </Col>
                            </Form>

                            <Form.Group as={Row} className={saved && errors.otherCodeSpecify && 'has-error'}>
                                <Form.Label column sm='12' style={{ fontWeight: 'normal' }}>
                                    If yes, what type of death code was used? (Select all that apply)
                                    {saved && errors.coded && <span className="font-weight-normal text-danger ml-3">Required Field</span>}
                                </Form.Label>
                                <Col sm="12">
                                    <div key="checkbox">
                                        <Form.Check className="pl-0" name='icd9'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.icd9 === 1}
                                                disabled={mortality.haveDeathCause !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setIcd9((mortality.icd9 + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                ICD-9
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='icd10'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.icd10 === 1}
                                                disabled={mortality.haveDeathCause !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setIcd10((mortality.icd10 + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                ICD-10
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='notCoded'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.notCoded === 1}
                                                disabled={mortality.haveDeathCause !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setNotCoded((mortality.notCoded + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Not Coded
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='otherCode'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={mortality.otherCode === 1}
                                                disabled={mortality.haveDeathCause !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.mortalityActions.setOtherCode((mortality.otherCode + 1) % 2));
                                                        dispatch(allactions.mortalityActions.setOtherCodeSpecify(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Other Code
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                    <Reminder message={errors.otherCodeSpecify} disabled={!(saved && errors.otherCodeSpecify)} placement="right">
                                        <Form.Control type='text'
                                            name='otherCodeSpecify'
                                            className='form-control'
                                            value={mortality.otherCodeSpecify}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 200 characters'
                                            onChange={e => {
                                                dispatch(allactions.mortalityActions.setOtherCodeSpecify(e.target.value))
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                            disabled={mortality.otherCode !== 1}
                                        />
                                    </Reminder>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className={saved && errors.deathNumbers && 'has-error'}>
                                <Form.Label column sm="12">E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></Form.Label>

                                <Col sm="2">
                                    <Reminder message={errors.deathNumbers} disabled={!(saved && errors.deathNumbers)} placement="right">
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            name='deathNumbers'
                                            value={mortality.deathNumbers}
                                            readOnly={isReadOnly}
                                            onChange={e => {
                                                dispatch(allactions.mortalityActions.setDeathNumbers(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                        />
                                    </Reminder>
                                </Col>
                            </Form.Group>
                        </CollapsiblePanel>
                    </CollapsiblePanelContainer>
                </Form>

                <QuestionnaireFooter
                    isAdmin={isReadOnly}
                    handlePrevious={_ => props.sectionPicker('D')}
                    handleNext={_ => props.sectionPicker('F')}
                    handleSave={handleSave}
                    handleSaveContinue={handleSaveContinue}
                    handleSubmitForReview={_ => resetCohortStatus(cohortId, 'submitted')} />
        </Container>
    )
}

export default MortalityForm;