import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import allactions from '../../actions';
import dataLinkageActions from '../../actions/dataLinkageActions';
import validator from '../../validators';
import Messenger from '../Snackbar/Snackbar';
import CenterModal from '../controls/modal/modal';
import ReviewModal from '../controls/modal/modal';
import Reminder from '../Tooltip/Tooltip';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const DataLinkageForm = ({ ...props }) => {

    const dataLinkage = useSelector(state => state.dataLinkageReducer)
    const section = useSelector(state => state.sectionReducer)
    const [MfileLoading, setMfileLoading] = useState(false)
    const dispatch = useDispatch();
    const radioError = 'please choose one'
    //const cohortId = +window.location.pathname.split('/').pop();
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const userSession = useSelector(state => state.user);
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [message, setMessage] = useState({ show: false, type: null, content: null })
    const updateMessage = state => setMessage({ ...message, ...state });
    const [modalShow, setModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [activePanels, setActivePanels] = useState({ A: true });
    const toggleActivePanel = name => setActivePanels({
        ...activePanels,
        [name]: !activePanels[name]
    })
    const [userEmails, setEmails] = useState('')
    // const [message, setMessage] = useState('')
    const history = useHistory();

    const isReadOnly = props.isReadOnly;

    const [errors, setErrors] = useState({
        haveDataLink: '',
        haveDataLinkSpecify: '',
        haveHarmonization: '',
        haveHarmonizationSpecify: '',
        haveDeposited: '',
        deposit: '',
        dataOnline: '',
        dataFileName: '',
        dataOnlineSelected: '',
        dataOnlineURL: '',
        createdRepo: '',
        createdRepoSpecify: '',
    })

    useEffect(() => {
        //if (!dataLinkage.hasLoaded) {

            fetch(`/api/questionnaire/dlh/${cohortId}`, {
                method: 'POST',
            }).then(res => res.json())
                .then(result => {
                    if (result.data.info[0] !== undefined) {
                        const data = result.data.info[0]
                        const files = result.data.files[0]
                        batch(() => {
                            //dispatch(allactions.dataLinkageActions.setHasLoaded(true))
                            dispatch(allactions.dataLinkageActions.setHaveDataLink(data.dlh_linked_to_existing_databases))
                            dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(data.dlh_linked_to_existing_databases_specify))
                            dispatch(allactions.dataLinkageActions.setHaveHarmonization(data.dlh_harmonization_projects))
                            dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(data.dlh_harmonization_projects_specify))
                            dispatch(allactions.dataLinkageActions.setHaveDeposited(data.dlh_nih_repository))
                            dispatch(allactions.dataLinkageActions.setdbGaP(data.dlh_nih_dbgap))
                            dispatch(allactions.dataLinkageActions.setbioLinCC(data.dlh_nih_biolincc))
                            dispatch(allactions.dataLinkageActions.setOtherRepo(data.dlh_nih_other))
                            dispatch(allactions.dataLinkageActions.setDataOnline(data.dlh_procedure_online))
                            dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(Number(data.dlh_procedure_attached)))
                            dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(Number(data.dlh_procedure_website)))
                            dispatch(allactions.dataLinkageActions.dataFileName(files || {fileId: 0, fileCategory: 5, filename: '', status: 0}))
                            if (data.dlh_procedure_url) { dispatch(allactions.dataLinkageActions.setDataOnlineURL(data.dlh_procedure_url)) } else { dispatch(allactions.dataLinkageActions.setDataOnlineURL('')) }
                            dispatch(allactions.dataLinkageActions.setCreatedRepo(data.dlh_procedure_enclave))
                            dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(data.dlh_enclave_location))
                        })
                    }
                })
        //}
    }, [cohortId])

    const handleUpload = (fileData) => {
        if (fileData) {
            const formData = new FormData();
            for (let i = 0; i < fileData.length; i++) {
                formData.append('cohortFile', fileData[i], fileData[i].name)
            }
            
            fetch(`/api/questionnaire/upload/${cohortId}/5`, {
                method: "POST",
                body: formData
            }).then(res => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setMfileLoading(false)
                    let fileList = {
                            fileId: 0,
                            fileCategory: 5,
                            filename: fileData[0].name,
                            status: 1
                        }                                     
                    dispatch(allactions.dataLinkageActions.dataFileName({...fileList}))
                    setErrors({...errors, dataFileName: ''})
                }
            })
            
        }
    }

    const deleteFileFromList = (fileListName, fileName, fileId, cohort_ID) => {
        dispatch(allactions.dataLinkageActions.dataFileName({...dataLinkage.dataFileName, status: 0}))
        setErrors({...errors, dataFileName: 'Required field'})
    }


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
                            sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ');
                        setReviewModalShow(false);
                        updateMessage({
                            show: true,
                            type: 'success',
                            content: `The cohort has been submitted.`
                        });
                    } else {
                        updateMessage({
                            show: true,
                            type: 'warning',
                            content: `The cohort could not be submitted due to an internal error.`
                        });
                    }
                })
        }
    }


    const validateInput = () => {

        let copy = { ...errors }

        //F.1
        if (!(dataLinkage.haveDataLink in [0, 1])) { copy.haveDataLink = radioError } else { copy.haveDataLink = '' }
        if (dataLinkage.haveDataLink === 1) {

            if (!dataLinkage.haveDataLinkSpecify)
                copy.haveDataLinkSpecify = 'Please specify'
            else {
                if (dataLinkage.haveDataLinkSpecify.length > 500)
                    copy.haveDataLinkSpecify = 'Cannot exceed 500 characters'
                else
                    copy.haveDataLinkSpecify = ''
            }
        }
        else
            copy.haveDataLinkSpecify = ''

        //F.2
        if (!(dataLinkage.haveHarmonization in [0, 1])) { copy.haveHarmonization = radioError } else { copy.haveHarmonization = '' }
        if (dataLinkage.haveHarmonization === 1) {

            if (!dataLinkage.haveHarmonizationSpecify)
                copy.haveHarmonizationSpecify = 'Please specify'
            else {
                if (dataLinkage.haveHarmonizationSpecify.length > 500)
                    copy.haveHarmonizationSpecify = 'Cannot exceed 500 characters'
                else
                    copy.haveHarmonizationSpecify = ''
            }
        }
        else
            copy.haveHarmonizationSpecify = ''

        //F.3
        if (!(dataLinkage.haveDeposited in [0, 1])) { copy.haveDeposited = radioError } else { copy.haveDeposited = '' }
        if (dataLinkage.haveDeposited === 1) {
            if (!dataLinkage.dbGaP && !dataLinkage.BioLINCC && !dataLinkage.otherRepo)
                copy.deposit = 'Select at least one option'
            else
                copy.deposit = ''
        }
        else
            copy.deposit = ''
        //F.4
        if (!(dataLinkage.dataOnline in [0, 1])) { copy.dataOnline = radioError } else { copy.dataOnline = '' }
        if (dataLinkage.dataOnline === 1) {
            if(dataLinkage.dataOnlineURL)
                copy.dataOnlineURL = ''
        }
        if (dataLinkage.dataOnline === 0 && (!dataLinkage.dataFileName || dataLinkage.dataFileName.status === 0))
            copy.dataFileName = 'Required field'
        else
            copy.dataFileName = ''
/*
            if (!dataLinkage.dataOnlinePolicy && !dataLinkage.dataOnlineWebsite) { copy.dataOnlineSelected = 'Select at least one option' } else { copy.dataOnlineSelected = '' }
            if (dataLinkage.dataOnlineWebsite) {

                if (dataLinkage.dataOnlineURL.length > 200)
                    copy.dataOnlineURL = 'Cannot exceed 200 characters'
                else {
                    copy.dataOnlineURL = ''
                }
            }
            else {
                copy.dataOnlineURL = ''
            }
        }
        else {
            copy.dataOnlineSelected = ''
            copy.dataOnlineURL = ''
        }
*/
        //F.5
        if (!(dataLinkage.createdRepo in [0, 1])) { copy.createdRepo = radioError } else { copy.createdRepo = '' }
        if (dataLinkage.createdRepo === 1) {

            if (!dataLinkage.createdRepoSpecify)
                copy.createdRepoSpecify = 'Please specify'
            else {
                if (dataLinkage.createdRepoSpecify.length > 200)
                    copy.createdRepoSpecify = 'Cannot exceed 200 characters'
                else
                    copy.createdRepoSpecify = ''
            }
        }
        else
            copy.createdRepoSpecify = ''

        setErrors(copy);
        return !Object.values(copy).some(x => (x !== undefined && x !== ''));
    }

    const saveDataLinkage = (id = cohortId, proceed = false, complete) => {
        let user_id = userSession.id
        const copy = { ...dataLinkage, sectionFStatus: complete, 'userID': user_id }

        fetch(`/api/questionnaire/update_dlh/${id}`, {
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
                    if (!proceed)
                        setSuccessMsg(true)
                    else
                        props.sectionPicker('G')
                } else {
                    setSuccessMsg(true)
                }
            })
    }


    const handleSave = () => {
        setSaved(true)

        if (validateInput()) {
            dispatch(allactions.dataLinkageActions.setSectionFStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('F', 'complete'))
            saveDataLinkage(cohortId, false, 'complete')
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)

        if (validateInput()) {
            dispatch(allactions.dataLinkageActions.setSectionFStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('F', 'complete'))
            saveDataLinkage(cohortId, true, 'complete')
        }
        else {
            setModalShow(true)
            setProceed(true)
        }
    }

    const handleSubmitForReview = () => {
        setReviewModalShow(true);
    }

    const confirmSaveStay = () => {
        dispatch(allactions.dataLinkageActions.setSectionFStatus('incomplete'))
        dispatch(allactions.sectionActions.setSectionStatus('F', 'incomplete'))
        saveDataLinkage(cohortId, false, 'incomplete')

        setModalShow(false)
    }

    const confirmSaveContinue = () => {

        dispatch(allactions.dataLinkageActions.setSectionFStatus('incomplete'))
        dispatch(allactions.sectionActions.setSectionStatus('F', 'incomplete'))
        saveDataLinkage(cohortId, true, 'incomplete')

        setModalShow(false)
    }




    return (
        <Container>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
            {message.show && <Messenger message={message.content} severity={message.type} open={true} changeMessage={_ => updateMessage({ show: false })} />}
            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
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
                            onClick={_ => resetCohortStatus(cohortId, 'submitted')}>
                            Submit
                        </Button>
                    </div>
                }
            />  
                <Form>
                    <CollapsiblePanelContainer>

                        {/*  */}
                        <CollapsiblePanel
                            condition={activePanels.A}
                            onClick={_ => toggleActivePanel('A')}
                            panelTitle="Data Linkage & Harmonization">

                            <Form as={Row}>
                                <Form.Label column sm="12">
                                    F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.haveDataLink && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>

                                <Col sm="12" className="align-self-center">
                                    {saved && errors.haveDataLink ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveDataLink'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    type="radio"
                                                    className="mr-2"
                                                    checked={dataLinkage.haveDataLink === 0}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveDataLink(0));
                                                            dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(''));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }}
                                                />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    No
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveDataLink'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                type="radio"
                                                className="mr-2"
                                                checked={dataLinkage.haveDataLink === 0}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveDataLink(0));
                                                        dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                No
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                    {saved && errors.haveDataLink ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveDataLink'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    className="mr-2"
                                                    checked={dataLinkage.haveDataLink === 1}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveDataLink(1));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }} />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Yes
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveDataLink'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                className="mr-2"
                                                checked={dataLinkage.haveDataLink === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveDataLink(1));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Yes
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                </Col>
                            </Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="12"><span style={{fontWeight:'normal'}}>If yes, please specify:</span></Form.Label>
                                <Col sm="12">
                                    {saved && errors.haveDataLinkSpecify ?
                                        <Reminder message={errors.haveDataLinkSpecify} disabled={!errors.haveDataLinkSpecify} placement="right">
                                            <Form.Control type='text'
                                                style={{ border: '1px solid red' }}
                                                name='haveDataLinkSpecify'
                                                className='form-control'
                                                value={dataLinkage.haveDataLinkSpecify}
                                                readOnly={isReadOnly}
                                                placeholder='Max of 500 characters'
                                                disabled={dataLinkage.haveDataLink !== 1}
                                                onChange={e => {
                                                    dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(e.target.value));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }}
                                            />
                                        </Reminder> :
                                        <Form.Control type='text'
                                            name='haveDataLinkSpecify'
                                            className='form-control'
                                            value={dataLinkage.haveDataLinkSpecify}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 500 characters'
                                            disabled={dataLinkage.haveDataLink !== 1}
                                            onChange={e => {
                                                dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                        />}
                                </Col>
                            </Form.Group>


                            <Form as={Row}>
                                <Form.Label column sm="12"
                                >F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.haveHarmonization && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>

                                <Col sm="12" className="align-self-center">
                                    {saved && errors.haveHarmonization ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveHarmonization'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    type="radio"
                                                    className="mr-2"
                                                    checked={dataLinkage.haveHarmonization === 0}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveHarmonization(0));
                                                            dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(''));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }}
                                                />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    No
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveHarmonization'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                type="radio"
                                                className="mr-2"
                                                checked={dataLinkage.haveHarmonization === 0}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveHarmonization(0));
                                                        dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                No
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                    {saved && errors.haveHarmonization ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveHarmonization'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    className="mr-2"
                                                    checked={dataLinkage.haveHarmonization === 1}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveHarmonization(1));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }} />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Yes
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveHarmonization'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                className="mr-2"
                                                checked={dataLinkage.haveHarmonization === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveHarmonization(1));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Yes
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                </Col>
                            </Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="12"><span style={{fontWeight: 'normal'}}>If yes, please specify:</span></Form.Label>
                                <Col sm="12">
                                    {saved && errors.haveHarmonizationSpecify ?
                                        <Reminder message={errors.haveHarmonizationSpecify} disabled={!errors.haveHarmonizationSpecify} placement="right">
                                            <Form.Control type='text'
                                                style={{ border: '1px solid red' }}
                                                name='haveHarmonizationSpecify'
                                                className='form-control'
                                                value={dataLinkage.haveHarmonizationSpecify}
                                                readOnly={isReadOnly}
                                                placeholder='Max of 500 characters'
                                                disabled={dataLinkage.haveHarmonization !== 1}
                                                onChange={e => {
                                                    dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(e.target.value));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }}
                                            />
                                        </Reminder> :
                                        <Form.Control type='text'
                                            name='haveHarmonizationSpecify'
                                            className='form-control'
                                            value={dataLinkage.haveHarmonizationSpecify}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 500 characters'
                                            disabled={dataLinkage.haveHarmonization !== 1}
                                            onChange={e => {
                                                dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                        />}
                                </Col>
                            </Form.Group>

                            <Form as={Row}>
                                <Form.Label column sm="12">
                                    F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.haveDeposited && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>
                                <Col sm="12" className="align-self-center">
                                    {saved && errors.haveDeposited ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveDeposited'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    type="radio"
                                                    className="mr-2"
                                                    checked={dataLinkage.haveDeposited === 0}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveDeposited(0));
                                                            dispatch(allactions.dataLinkageActions.setdbGaP(0))
                                                            dispatch(allactions.dataLinkageActions.setbioLinCC(0))
                                                            dispatch(allactions.dataLinkageActions.setOtherRepo(0));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }}
                                                />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    No
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveDeposited'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                type="radio"
                                                className="mr-2"
                                                checked={dataLinkage.haveDeposited === 0}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveDeposited(0));
                                                        dispatch(allactions.dataLinkageActions.setdbGaP(0))
                                                        dispatch(allactions.dataLinkageActions.setbioLinCC(0))
                                                        dispatch(allactions.dataLinkageActions.setOtherRepo(0));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                No
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                    {saved && errors.haveDeposited ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='haveDeposited'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    className="mr-2"
                                                    checked={dataLinkage.haveDeposited === 1}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setHaveDeposited(1));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }} />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Yes
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='haveDeposited'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                className="mr-2"
                                                checked={dataLinkage.haveDeposited === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setHaveDeposited(1));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Yes
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                </Col>
                            </Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm='12' style={{ fontWeight: 'normal' }}>
                                    If yes, please select which repositories (Select all that apply):
                                    {saved && errors.deposit && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>
                                <Col sm="12">
                                    <div key="checkbox">
                                        <Form.Check className="pl-0" name='dbGaP'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={dataLinkage.dbGaP === 1}
                                                disabled={dataLinkage.haveDeposited !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setdbGaP((dataLinkage.dbGaP + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                dbGaP
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='BioLINCC'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={dataLinkage.BioLINCC === 1}
                                                disabled={dataLinkage.haveDeposited !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setbioLinCC((dataLinkage.BioLINCC + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                BioLINCC
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check className="pl-0" name='otherRepo'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={dataLinkage.otherRepo === 1}
                                                disabled={dataLinkage.haveDeposited !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setOtherRepo((dataLinkage.otherRepo + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Other Repo
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form as={Row}>
                                <Form.Label column sm="12">
                                    F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.dataOnline && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>

                                <Col sm="12" className="align-self-center">
                                    {saved && errors.dataOnline ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='dataOnline'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    type="radio"
                                                    className="mr-2"
                                                    checked={dataLinkage.dataOnline === 0}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            let clone = {...errors}
                                                            dispatch(allactions.dataLinkageActions.setDataOnline(0));
                                                            dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(0));
                                                            dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(0));
                                                            dispatch(allactions.dataLinkageActions.setDataOnlineURL(''));
                                                            clone.dataOnlineURL= ''
                                                            clone.dataFileName = 'Required field'
                                                            setErrors(clone)
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }}
                                                />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    No
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='dataOnline'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                type="radio"
                                                className="mr-2"
                                                checked={dataLinkage.dataOnline === 0}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        let clone = {...errors}
                                                        dispatch(allactions.dataLinkageActions.setDataOnline(0));
                                                        //dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(0));
                                                        //dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(0));
                                                        dispatch(allactions.dataLinkageActions.setDataOnlineURL(''));
                                                        clone.dataOnlineURL= ''
                                                        clone.dataFileName = 'Required field'
                                                        setErrors(clone)
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                No
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                    <Reminder disabled = {!(saved && errors.dataOnline)}>
                                        <Form.Check type='radio'
                                            name='dataOnline'
                                            inline
                                            style={(saved && errors.dataOnline) ? { color: 'red' }: {}} >
                                            <Form.Check.Input
                                                type='radio'
                                                className="mr-2"
                                                checked={dataLinkage.dataOnline === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        let clone = {...errors}
                                                        dispatch(allactions.dataLinkageActions.setDataOnline(1));
                                                        dispatch(setHasUnsavedChanges(true));
                                                        clone.dataFileName = ''
                                                        if(!dataLinkage.dataOnlineURL)
                                                            clone.dataOnlineURL = 'Please specify'
                                                        if(dataLinkage.dataFileName && dataLinkage.dataFileName.status > 0)
                                                            dispatch(allactions.dataLinkageActions.dataFileName({...dataLinkage.dataFileName, status: 0}))
                                                        setErrors(clone)
                                                    }
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Yes
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Reminder>   
                                </Col>
                            </Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm='12' style={{ fontWeight: 'normal' }}>
                                    If yes, please specify website:
                                </Form.Label>
                                <Col sm="12">
     {/*                              {saved && errors.dataOnlineSelected && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>
                                <Col sm="12">
                                    <div key="checkbox" className="mb-3">
                                        <Form.Check className="pl-0" name='dataOnlinePolicy'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={dataLinkage.dataOnlinePolicy === 1}
                                                disabled={dataLinkage.dataOnline !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setDataOnlinePolicy((dataLinkage.dataOnlinePolicy + 1) % 2));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Policy attached (PDF)
                                            </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check className="pl-0" name='dataOnlineWebsite'>
                                            <Form.Check.Input bsPrefix
                                                type='checkbox'
                                                className="mr-2"
                                                checked={dataLinkage.dataOnlineWebsite === 1}
                                                disabled={dataLinkage.dataOnline !== 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setDataOnlineWebsite((dataLinkage.dataOnlineWebsite + 1) % 2))
                                                        dispatch(allactions.dataLinkageActions.setDataOnlineURL(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Website, please specify:
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </div>
*/}
                                    {/* {saved && errors.dataOnlineURL ? */}
                                        <Reminder message={errors.dataOnlineURL} disabled={!(errors.dataOnlineURL && saved)} placement="right">
                                            <Form.Control type='text'
                                                style={errors.dataOnlineURL && saved ? { border: '1px solid red' } : {}}
                                                name='dataOnlineURL'
                                                className='form-control'
                                                value={dataLinkage.dataOnlineURL}
                                                readOnly={isReadOnly}
                                                placeholder='Max of 200 characters'
                                                disabled={!dataLinkage.dataOnline}
                                                onChange={e => {
                                                    dispatch(allactions.dataLinkageActions.setDataOnlineURL(e.target.value));
                                                    dispatch(setHasUnsavedChanges(true));
                                                }}
                                            />
                                      </Reminder>      
                                       {/* <Form.Control type='text'
                                            name='dataOnlineURL'
                                            className='form-control'
                                            value={dataLinkage.dataOnlineURL}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 200 characters'
                                            disabled={!dataLinkage.dataOnlineWebsite}
                                            onChange={e => {
                                                dispatch(allactions.dataLinkageActions.setDataOnlineURL(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                        />} */}
                                </Col>
                                <Form.Label column sm='12' style={{ fontWeight: 'normal' }}>
                                    {console.log(errors.dataFileName)}
                                    If no, please attach data sharing (PDF): {saved && errors.dataFileName && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>
                                {/*<Col sm={!isReadOnly ? "3" : "1"} className="pr-0"> */}
                                <Col sm="12" className="pr-0">
                                    <Col sm="2" className="px-0">
                                    {
                                        !isReadOnly &&
                                        <Form.Control
                                            type="file"
                                            name='cohortFile'
                                            id="inputGroupFile02"
                                            aria-describedby="inputGroupFileAddon02"
                                            disabled={dataLinkage.dataOnline}
                                            style={{ height: '27px', width: '100%'}}
                                            onClick={e => e.target.value = null}
                                            onChange={e => {
                                                if (!isReadOnly) {
                                                    if(e.target.files[0].name.substr(-3) === 'pdf'){
                                                        setMfileLoading(true)
                                                        handleUpload(e.target.files, 5)
                                                    }
                                                }
                                            }} />
                                    }
                                    </Col>
                                    <Col sm="9" className="px-0">
                                    {MfileLoading && (
                                        <span>
                                            Loading...
                                        </span>
                                    )
                                    }
                                    {!MfileLoading && dataLinkage.dataFileName.status < 1 && (
                                            <span>
                                                {dataLinkage.dataOnline ? '' : 'No file chosen'}
                                            </span>
                                        )
                                    }

                                    {dataLinkage.dataFileName.status > 0 && (
                                        <span>
                                            <a href={'../../../api/download/' + dataLinkage.dataFileName.filename} download={dataLinkage.dataFileName.filename.split('.').pop() === 'pdf' ? false : true} target="_blank">{dataLinkage.dataFileName.filename}</a>
                                            {!isReadOnly && dataLinkage.dataFileName.filename &&
                                                <>
                                                    {' '}(
                                                    <span class="closer"
                                                        onClick={() =>
                                                            deleteFileFromList('mainFileName', dataLinkage.dataFileName.filename, dataLinkage.dataFileName.fileId)
                                                        }>x</span>
                                                    )
                                                </>
                                            }
                                        </span>
                                    )
                                    }
                                    </Col>
                                </Col>
                               {/* <Col sm="9" className="px-0">
                                    {MfileLoading && (
                                        <span>
                                            Loading...
                                        </span>
                                    )
                                    }
                                    {!MfileLoading && !dataLinkage.dataFileName.filename && (
                                        <span>
                                            No file chosen
                                        </span>
                                    )
                                    }
                                    {console.dir(dataLinkage.dataFileName)}
                                    {dataLinkage.dataFileName && (
                                        <span>
                                            <a href={'../../../api/download/' + dataLinkage.dataFileName.filename} download={dataLinkage.dataFileName.filename.split('.').pop() === 'pdf' ? false : true} target="_blank">{dataLinkage.dataFileName.filename}</a>
                                            {!isReadOnly && dataLinkage.dataFileName.filename &&
                                                <>
                                                    {' '}(
                                                    <span class="closer"
                                                        onClick={() =>
                                                            deleteFileFromList('mainFileName', dataLinkage.dataFileName.filename, dataLinkage.dataFileName.fileId)
                                                        }>x</span>
                                                    )
                                                </>
                                            }
                                        </span>
                                    )
                                    }
                                    {dataLinkage.dataFileName.length > 1 && !MfileLoading && (
                                        <>
                                            <span classNamne="mx-1">
                                                {' '}and{' '}
                                            </span>
                                            <span>
                                                <a href='#'
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        showFileList('Main Cohort Documents', 'mainFileName', dataLinkage.dataFileName)
                                                    }}>
                                                    {dataLinkage.dataFileName.length - 1} more
                                                        </a>
                                            </span>
                                        </>
                                    )
                                    } 
                                </Col>*/}
                            </Form.Group>

                            <Form as={Row}>
                                <Form.Label column sm="12">
                                    F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span>
                                    {saved && errors.createdRepo && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Form.Label>

                                <Col sm="12" className="align-self-center">
                                    {saved && errors.createdRepo ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='createdRepo'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    type="radio"
                                                    className="mr-2"
                                                    checked={dataLinkage.createdRepo === 0}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setCreatedRepo(0));
                                                            dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(''));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }}
                                                />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    No
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='createdRepo'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                type="radio"
                                                className="mr-2"
                                                checked={dataLinkage.createdRepo === 0}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setCreatedRepo(0));
                                                        dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(''));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                No
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                    {saved && errors.createdRepo ?
                                        <Reminder>
                                            <Form.Check type='radio'
                                                name='createdRepo'
                                                inline
                                                style={{ color: 'red' }} >
                                                <Form.Check.Input
                                                    type='radio'
                                                    className="mr-2"
                                                    checked={dataLinkage.createdRepo === 1}
                                                    onClick={() => {
                                                        if (!isReadOnly) {
                                                            dispatch(allactions.dataLinkageActions.setCreatedRepo(1));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }
                                                    }} />
                                                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                    Yes
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Reminder> :
                                        <Form.Check type='radio'
                                            name='createdRepo'
                                            inline>
                                            <Form.Check.Input
                                                type='radio'
                                                className="mr-2"
                                                checked={dataLinkage.createdRepo === 1}
                                                onClick={() => {
                                                    if (!isReadOnly) {
                                                        dispatch(allactions.dataLinkageActions.setCreatedRepo(1));
                                                        dispatch(setHasUnsavedChanges(true));
                                                    }
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Yes
                                            </Form.Check.Label>
                                        </Form.Check>
                                    }
                                </Col>
                            </Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="12"><span style={{fontWeight:'normal'}}>If yes, please specify:</span></Form.Label>
                                <Col sm="12">
                                    {saved && errors.createdRepoSpecify ?
                                        <Reminder message={errors.createdRepoSpecify} disabled={!errors.createdRepoSpecify} placement="right">
                                            <Form.Control type='text'
                                                style={{ border: '1px solid red' }}
                                                name='createdRepoSpecify'
                                                className='form-control'
                                                value={dataLinkage.createdRepoSpecify}
                                                readOnly={isReadOnly}
                                                placeholder='Max of 200 characters'
                                                disabled={dataLinkage.createdRepo !== 1}
                                                onChange={e => {
                                                    dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(e.target.value))
                                                    dispatch(setHasUnsavedChanges(true));
                                                }}
                                            />
                                        </Reminder> :
                                        <Form.Control type='text'
                                            name='createdRepoSpecify'
                                            className='form-control'
                                            value={dataLinkage.createdRepoSpecify}
                                            readOnly={isReadOnly}
                                            placeholder='Max of 500 characters'
                                            disabled={dataLinkage.createdRepo !== 1}
                                            onChange={e => {
                                                dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(e.target.value));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                        />}
                                </Col>
                            </Form.Group>
                        </CollapsiblePanel>
                    </CollapsiblePanelContainer>
                </Form>

                <QuestionnaireFooter
                    isAdmin={isReadOnly}
                    handlePrevious={_ => props.sectionPicker('E')}
                    handleNext={_ => props.sectionPicker('G')}
                    handleSave={handleSave}
                    handleSaveContinue={handleSaveContinue}
                    handleSubmitForReview={handleSubmitForReview} />

        </Container >
    )
}

export default DataLinkageForm;