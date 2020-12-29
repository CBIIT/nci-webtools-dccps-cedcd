import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { $CombinedState } from 'redux'
import allactions from '../../actions'
import dataLinkageActions from '../../actions/dataLinkageActions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import './DataLinkageForm.css';

const DataLinkageForm = ({ ...props }) => {

    const dataLinkage = useSelector(state => state.dataLinkageReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();
    const radioError = 'please choose one'
    //const cohortId = +window.location.pathname.split('/').pop();
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const isReadOnly = props.isReadOnly
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [activePanels, setActivePanels] = useState({ A: true });
    const toggleActivePanel = name => setActivePanels({
        ...activePanels,
        [name]: !activePanels[name]
    })
    const [userEmails, setEmails] = useState('')
    const [message, setMessage] = useState('')

    const isReadOnly = props.isReadOnly;

    const [errors, setErrors] = useState({
        haveDataLink: '',
        haveDataLinkSpecify: '',
        haveHarmonization: '',
        haveHarmonizationSpecify: '',
        haveDeposited: '',
        deposit: '',
        dataOnline: '',
        dataOnlineSelected: '',
        dataOnlineURL: '',
        createdRepo: '',
        createdRepoSpecify: '',
    })

    useEffect(() => {
        if (!dataLinkage.hasLoaded) {

            fetch(`/api/questionnaire/dlh/${cohortId}`, {
                method: 'POST',
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result.data.info[0] !== undefined) {
                        const data = result.data.info[0]
                        let completion = result.data.completion[0].status

                        if (completion !== 'complete')
                            completion = 'incomplete'

                        batch(() => {
                            dispatch(allactions.dataLinkageActions.setHasLoaded(true))
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
                            if (data.dlh_procedure_url) { dispatch(allactions.dataLinkageActions.setDataOnlineURL(data.dlh_procedure_url)) } else { dispatch(allactions.dataLinkageActions.setDataOnlineURL('')) }
                            dispatch(allactions.dataLinkageActions.setCreatedRepo(data.dlh_procedure_enclave))
                            dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(data.dlh_enclave_location))

                            dispatch(allactions.dataLinkageActions.setSectionFStatus(completion))
                            dispatch(allactions.sectionActions.setSectionStatus('F', completion))
                        })
                    }
                    else {
                        dispatch(allactions.dataLinkageActions.setSectionFStatus('incomplete'))
                        dispatch(allactions.sectionActions.setSectionStatus('F', 'incomplete'))
                    }
                })
        }
    }, [])

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


    const validateInput = () => {

        let copy = { ...errors }

        //F.1
        if (!(dataLinkage.haveDataLink in [0, 1])) { copy.haveDataLink = radioError } else { copy.haveDataLink = '' }
        if (dataLinkage.haveDataLink === 1) {

            if (!dataLinkage.haveDataLinkSpecify)
                copy.haveDataLinkSpecify = 'please specify'
            else {
                if (dataLinkage.haveDataLinkSpecify.length > 500)
                    copy.haveDataLinkSpecify = 'cannot exceed 500 characters'
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
                copy.haveHarmonizationSpecify = 'please specify'
            else {
                if (dataLinkage.haveHarmonizationSpecify.length > 500)
                    copy.haveHarmonizationSpecify = 'cannot exceed 500 characters'
                else
                    copy.haveHarmonizationSpecify = ''
            }
        }
        else
            copy.haveHarmonizationSpecify = ''

        //F.3
        if (!(dataLinkage.haveDeposited in [0, 1])) { copy.haveDeposited = radioError } else { copy.haveDeposited = '' }
        if (dataLinkage.haveDeposited === 1) {
            if (dataLinkage.dbGaP === 0 && dataLinkage.BioLINCC === 0 && dataLinkage.otherRepo === 0)
                copy.deposit = 'select at least one option'
            else
                copy.deposit = ''
        }
        else
            copy.deposit = ''

        console.log(dataLinkage)
        //F.4
        if (!(dataLinkage.dataOnline in [0, 1])) { copy.dataOnline = radioError } else { copy.dataOnline = '' }
        if (dataLinkage.dataOnline === 1) {
            if (dataLinkage.dataOnlinePolicy === 0 && dataLinkage.dataOnlineWebsite === 0) { copy.dataOnlineSelected = 'select at least one option' } else { copy.dataOnlineSelected = '' }
            if (dataLinkage.dataOnlineWebsite) {

                if (dataLinkage.dataOnlineURL.length > 200)
                    copy.dataOnlineURL = 'cannot exceed 200 characters'
                else {
                    copy.dataOnlineURL = validator.urlValidator(dataLinkage.dataOnlineURL, true)
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

        //F.5
        if (!(dataLinkage.createdRepo in [0, 1])) { copy.createdRepo = radioError } else { copy.createdRepo = '' }
        if (dataLinkage.createdRepo === 1) {

            if (!dataLinkage.createdRepoSpecify)
                copy.createdRepoSpecify = 'please specify'
            else {
                if (dataLinkage.createdRepoSpecify.length > 200)
                    copy.createdRepoSpecify = 'cannot exceed 200 characters'
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

        const copy = { ...dataLinkage, sectionFStatus: complete }

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
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId)
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                        if (result.data.status)
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
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

    const handleApprove = () => {
        resetReviewCohortStatus(cohortId, 'published')
    }

    const handleReject = () => {
        resetReviewCohortStatus(cohortId, 'returned')
    }

    const resetReviewCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        setMessage('update was successful')
                        setSuccessMsg(true)
                        sendEmail()
                    }
                    else {
                        setMessage('update failed')
                        setFailureMsg(true)
                    }
                })
        }
    }

    const sendEmail = () => {
        let reqBody = {
            email: userEmails,
            topic: 'test',
            message: 'this is test on sending email'
        };
        fetch('/api/questionnaire/sendEmail', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {
                    setMessage('email was sent')
                    let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
                else {
                    setMessage('email failed to be sent')
                    let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
            })
    }


    return <div className="p-3 px-5">
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />

        <CollapsiblePanel
            condition={activePanels.A}
            onClick={_ => toggleActivePanel('A')}
            panelTitle="Data Linkage & Harmonization">
            <div className='col-md-12'>
                <label htmlFor='haveDataLink' className='col-md-12'>F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span></label>
            </div>
            <div className='form-group col-md-12'>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 0} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setHaveDataLink(0)); dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify('')) } }} style={{ width: '30px' }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setHaveDataLink(1)) } }} style={{ width: '30px' }} />
                    <span>Yes</span>
                </span>
                {errors.haveDataLink !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDataLink}</div>}
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-12'>If yes, please specify:</span>
                <div className='col-md-12'>
                    <input name='haveDataLinkSpecify' className='form-control' disabled={dataLinkage.haveDataLink !== 1} placeholder='Max of 500 characters' value={dataLinkage.haveDataLinkSpecify} readOnly={isReadOnly} onChange={e => dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(e.target.value))}></input>
                </div>
                {errors.haveDataLinkSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDataLinkSpecify}</div>}
            </div>

            <div className='col-md-12'>
                <label htmlFor='haveHarmonization' className='col-md-12'>F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span></label>
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 0} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setHaveHarmonization(0)); dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify('')) } }} style={{ width: '30px' }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setHaveHarmonization(1)) } }} style={{ width: '30px' }} />
                    <span>Yes</span>
                </span>
                {errors.haveHarmonization !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveHarmonization}</div>}
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-12'>If yes, please specify:</span>
                <div className='col-md-12'>
                    <input name='haveHarmonizationSpecify' className='form-control' disabled={dataLinkage.haveHarmonization !== 1} value={dataLinkage.haveHarmonizationSpecify} readOnly={isReadOnly} onChange={e => dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(e.target.value))} placeholder='Max of 500 characters'></input>
                </div>
                {errors.haveHarmonizationSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveHarmonizationSpecify}</div>}
            </div>

            <div className='col-md-12'>
                <label htmlFor='haveDeposited' className='col-md-12'>F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span></label>
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 0} onClick={() => {
                        if (!isReadOnly) {
                            dispatch(allactions.dataLinkageActions.setHaveDeposited(0));
                            dispatch(allactions.dataLinkageActions.setdbGaP(0))
                            dispatch(allactions.dataLinkageActions.setbioLinCC(0))
                            dispatch(allactions.dataLinkageActions.setOtherRepo(0))
                        }
                    }} style={{ width: '30px' }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setHaveDeposited(1)) } }} style={{ width: '30px' }} />
                    <span>Yes</span>
                </span>
                {errors.haveDeposited !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDeposited}</div>}
            </div>

            <div>
                <div className='form-group col-md-12'>
                    <span className='col-md-5'>If yes, please select which repositories (Select all that apply):</span>
                </div>

                <div className='col-md-12'>
                    <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                            <input type='checkbox' name='dbGaP' checked={dataLinkage.dbGaP === 1} disabled={dataLinkage.haveDeposited !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setdbGaP((dataLinkage.dbGaP + 1) % 2)) } }} style={{ width: '30px' }} />
                        </span>
                        <span>dbGaP</span>
                    </div>
                    <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                            <input type='checkbox' name='BioLINCC' checked={dataLinkage.BioLINCC === 1} disabled={dataLinkage.haveDeposited !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setbioLinCC((dataLinkage.BioLINCC + 1) % 2)) } }} style={{ width: '30px' }} />
                        </span>
                        <span>BioLINCC</span>
                    </div>
                    <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                            <input type='checkbox' name='otherRepo' checked={dataLinkage.otherRepo === 1} disabled={dataLinkage.haveDeposited !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setOtherRepo((dataLinkage.otherRepo + 1) % 2)) } }} style={{ width: '30px' }} />
                        </span>
                        <span>otherRepo</span>
                    </div>
                    {errors.deposit !== '' && <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <div className='col-md-4' style={{ color: 'red' }}>{errors.deposit}</div>
                    </div>}
                </div>
            </div>

            <div className='col-md-12' style={{ marginTop: '1em' }}>
                <label htmlFor='dataOnline' className='col-md-12'>F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span></label>
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 0} onClick={() => {
                        if (!isReadOnly) {
                            dispatch(allactions.dataLinkageActions.setDataOnline(0));
                            dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(0));
                            dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(0));
                            dispatch(allactions.dataLinkageActions.setDataOnlineURL(''));
                        }
                    }} style={{ width: '30px' }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setDataOnline(1)) } }} style={{ width: '30px' }} />
                    <span>Yes</span>
                </span>
                {errors.dataOnline !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.dataOnline}</div>}
            </div>

            <div>
                <div className='form-group col-md-12'>
                    <span className='col-md-5'>If yes, please specify (Select all that apply):</span>
                </div>

                <div className='col-md-12'>
                    <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                            <input type='checkbox' name='dataOnlinePolicy' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlinePolicy === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setDataOnlinePolicy((dataLinkage.dataOnlinePolicy + 1) % 2)) } }} style={{ width: '30px' }} />
                        </span>
                        <span>Policy attached (PDF)</span>
                    </div>
                    <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                            <input type='checkbox' name='dataOnlineWebsite' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlineWebsite === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setDataOnlineWebsite((dataLinkage.dataOnlineWebsite + 1) % 2)) } }} style={{ width: '30px' }} />
                        </span>
                        <span>Website, please specify: </span>
                    </div>
                    {errors.dataOnlineSelected !== '' && <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                        <div className='col-md-4' style={{ color: 'red' }}>{errors.dataOnlineSelected}</div>
                    </div>}
                </div>

                <div className='form-group col-md-12' style={{ marginTop: '1em' }}>
                    <div className='col-md-8'>
                        <input name='dataOnlineURL' className='form-control' disabled={!dataLinkage.dataOnlineWebsite} value={dataLinkage.dataOnlineURL} readOnly={isReadOnly} onChange={e => dispatch(allactions.dataLinkageActions.setDataOnlineURL(e.target.value))} placeholder='Max of 200 characters'></input>
                    </div>
                    {errors.dataOnlineURL !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.dataOnlineURL}</div>}
                </div>
            </div>

            <div className='col-md-12'>
                <label htmlFor='createdRepo' className='col-md-12'>F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span></label>
            </div>

            <div className='form-group col-md-12'>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 0} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setCreatedRepo(0)); dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify('')) } }} style={{ width: '30px' }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                    <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.dataLinkageActions.setCreatedRepo(1)) } }} style={{ width: '30px' }} />
                    <span>Yes</span>
                </span>
                {errors.createdRepo !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.createdRepo}</div>}
            </div>

            <div className='col-md-12'>
                <span className='col-md-12'>If yes, please specify:</span>
                <div className='col-md-8'>
                    <input name='createdRepoSpecify' className='form-group form-control' disabled={dataLinkage.createdRepo !== 1} value={dataLinkage.createdRepoSpecify} readOnly={isReadOnly} onChange={e => dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(e.target.value))} placeholder='Max of 200 characters'></input>
                </div>
                {errors.createdRepoSpecify !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.createdRepoSpecify}</div>}
            </div>
        </CollapsiblePanel>

        <div className='my-4' style={{ position: 'relative' }}>
            <span className='zero-padding col-md-6 col-xs-12' style={{ position: 'relative', float: 'left' }}>
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('E')} />
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('G')} />
            </span>
            {!isReadOnly ? <>
                <span className='zero-padding col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right' }}>
                    <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)} />
                    </span>
                    <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='zero-padding col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)} style={{ marginRight: '5px', marginBottom: '5px' }} />
                    </span>
                    <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='zero-padding col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span>
                </span>
            </> : <>
                    <span className='zero-padding col-md-6 col-xs-12' style={{ position: 'relative', paddingLeft: '0', paddingRight: '0' }}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Approve'
                            onClick={handleApprove} disabled={!['submitted', 'in review'].includes(props.status)} />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Reject'
                            onClick={handleReject} disabled={!['submitted', 'in review'].includes(props.status)} />

                    </span>
                </> }
        </div>
    </div >
}

export default DataLinkageForm;