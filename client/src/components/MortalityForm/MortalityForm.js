import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import './MortalityForm.css';

const MortalityForm = ({ ...props }) => {
    const isReadOnly = props.isReadOnly || false

    const mortality = useSelector(state => state.mortalityReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
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

    const radioError = 'please choose one'

    const [errors, setErrors] = useState({
        mortalityYear: '',
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
                        let completion = result.data.completion[0].status

                        if (completion !== 'complete')
                            completion = 'incomplete'

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

                            dispatch(allactions.mortalityActions.setSectionEStatus(completion))
                            dispatch(allactions.sectionActions.setSectionStatus('E', completion))
                        })
                    }
                    else {
                        dispatch(allactions.mortalityActions.setSectionEStatus('incomplete'))
                        dispatch(allactions.sectionActions.setSectionStatus('E', 'incomplete'))
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

        copy.mortalityYear = validator.numberValidator(mortality.mortalityYear, true, false)
        if (mortality.otherDeath === 1) {
            if (mortality.otherDeathSpecify === null || !mortality.otherDeathSpecify)
                copy.otherDeathSpecify = 'please specify'
            else {
                if (mortality.otherDeathSpecify.length > 200)
                    copy.otherDeathSpecify = 'cannot exceed 200 characters'
                else
                    copy.otherDeathSpecify = ''
            }
        }
        else
            copy.otherDeathSpecify = '';

        if (!(mortality.haveDeathDate in [0, 1])) { copy.haveDeathDate = radioError } else { copy.haveDeathDate = '' }
        if (!(mortality.haveDeathCause in [0, 1])) { copy.haveDeathCause = radioError } else { copy.haveDeathCause = '' }
        if (mortality.haveDeathCause === 1) {

            if (mortality.icd9 === 0 && mortality.icd10 === 0 && mortality.notCoded === 0 && mortality.otherCode === 0)
                copy.coded = 'select at least one option'
            else
                copy.coded = ''

            if (mortality.otherCode === 1) {
                if (mortality.otherCodeSpecify === null || !mortality.otherCodeSpecify)
                    copy.otherCodeSpecify = 'please specify'
                else {
                    if (mortality.otherCodeSpecify.length > 200)
                        copy.otherCodeSpecify = 'cannot exceed 200 characters'
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
        copy.deathNumbers = validator.numberValidator(mortality.deathNumbers, true, false)

        setErrors(copy);

        return !Object.values(copy).some(x => (x !== undefined && x !== ''));
    }

    const saveMortality = (id = cohortId, proceed = false, complete) => {
        const copy = { ...mortality, sectionEStatus: complete }
        console.log(JSON.stringify(copy))
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
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId){
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                        }
                        if (result.data.status && result.data.status != cohortStatus){
                            dispatch(({type: 'SET_COHORT_STATUS', value: result.data.status})) 
                            dispatch(fetchCohort(result.data.duplicated_cohort_id)) /* if result.data.status present, duplicated_cohort_id is too */
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


    return <div className='p-3 px-5'>

        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />

        <CollapsiblePanel
            condition={activePanels.A}
            onClick={_ => toggleActivePanel('A')}
            panelTitle="Mortality">

            <div className='form-group col-sm-12'>
                <label htmlFor='mortalityYear' className='col-sm-12 question'>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
                <div className="col-sm-2">
                    <input name='mortalityYear' className='form-control' value={mortality.mortalityYear} readOnly={isReadOnly} onChange={e => dispatch(allactions.mortalityActions.setMortalityYear(e.target.value))} placeholder='yyyy' />
                </div>
                {errors.mortalityYear !== '' && <div className='col-md-3 error-input'>{errors.mortalityYear}</div>}
            </div>


            <div className='form-group col-md-12'>
                <label htmlFor='confirmDeath' className='col-md-12 question'>E.2 How did your cohort confirm death? (Select all that apply)</label>

                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='deathIndex' checked={mortality.deathIndex === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setDeathIndex((mortality.deathIndex + 1) % 2)) } }} />
                    </span>
                    <span>U.S. National Death Index (NDI) linkage</span>
                </div>
                <div className='col-md-8 zero-padding' >
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='deathCertificate' checked={mortality.deathCertificate === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setDeathCertificate((mortality.deathCertificate + 1) % 2)) } }}  />
                    </span>
                    <span>Death Certificates</span>
                </div>
                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='otherDeath' checked={mortality.otherDeath === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setOtherDeath((mortality.otherDeath + 1) % 2)); dispatch(allactions.mortalityActions.setOtherDeathSpecify('')) } }} />
                    </span>
                    <span>Other</span>
                </div>

                <div className="col-md-8 specify">
                    <input name='otherDeathSpecify' className='form-control' value={mortality.otherDeathSpecify} readOnly={isReadOnly} onChange={e => dispatch(allactions.mortalityActions.setOtherDeathSpecify(e.target.value))} disabled={mortality.otherDeath !== 1} placeholder='Max of 200 characters' />
                </div>
                {errors.otherDeathSpecify !== '' && <div className='col-md-3 specify error-input'>{errors.otherDeathSpecify}</div>}
            </div>


            <div className='form-group col-md-12'>
                <label htmlFor='haveDeathDate' className='col-md-12 question'>E.3 Do you have date of death for most subjects<span style={{ color: 'red' }}>*</span></label>

                <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                    <input type='radio' className='click-width' name='haveDeathDate' checked={mortality.haveDeathDate === 0} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setHaveDeathDate(0)) } }}  />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                    <input type='radio' className='click-width' name='haveDeathDate' checked={mortality.haveDeathDate === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setHaveDeathDate(1)) } }} />
                    <span>Yes</span>
                </span>
                {errors.haveDeathDate !== '' && <div className='col-md-3 error' style={{ color: 'red' }}>{errors.haveDeathDate}</div>}

            </div>

            <div className='col-md-12'>
                <label htmlFor='haveDeathCause' className='col-md-12 question'>E.4 Do you have cause of death for most subjects<span style={{ color: 'red' }}>*</span></label>

                <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                    <input type='radio' className='click-width' name='haveDeathCause' checked={mortality.haveDeathCause === 0} onClick={() => {
                        if (!isReadOnly) {
                            dispatch(allactions.mortalityActions.setHaveDeathCause(0));
                            dispatch(allactions.mortalityActions.setIcd9(0));
                            dispatch(allactions.mortalityActions.setIcd10(0));
                            dispatch(allactions.mortalityActions.setOtherCode(0));
                            dispatch(allactions.mortalityActions.setOtherCodeSpecify(''))
                        }
                    }} />
                    <span>No</span>
                </span>

                <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                    <input type='radio' className='click-width' name='haveDeathCause' checked={mortality.haveDeathCause === 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setHaveDeathCause(1)) } }}  />
                    <span>Yes</span>
                </span>
                {errors.haveDeathCause !== '' && <div className='col-md-3 error'>{errors.haveDeathCause}</div>}
            </div>

            <div className='form-group specify col-md-12'>
                <label className='col-md-12 question' style={{ fontWeight: 'normal' }}>If yes, what type of death code was used? (Select all that apply)</label>


                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='icd9' checked={mortality.icd9 === 1} disabled={mortality.haveDeathCause !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setIcd9((mortality.icd9 + 1) % 2)) } }}  />
                    </span>
                    <span>ICD-9</span>
                </div>
                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='icd10' checked={mortality.icd10 === 1} disabled={mortality.haveDeathCause !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setIcd10((mortality.icd10 + 1) % 2)) } }}  />
                    </span>
                    <span>ICD-10</span>
                </div>
                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding' >
                        <input type='checkbox' className='click-width' name='notCoded' checked={mortality.notCoded === 1} disabled={mortality.haveDeathCause !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setNotCoded((mortality.notCoded + 1) % 2)) } }}  />
                    </span>
                    <span>Not Coded</span>
                </div>
                <div className='col-md-8 zero-padding'>
                    <span className='col-md-1 checkbox-padding'>
                        <input type='checkbox' className='click-width' name='otherCode' checked={mortality.otherCode === 1} disabled={mortality.haveDeathCause !== 1} onClick={() => { if (!isReadOnly) { dispatch(allactions.mortalityActions.setOtherCode((mortality.otherCode + 1) % 2)); dispatch(allactions.mortalityActions.setOtherCodeSpecify('')) } }} />
                    </span>
                    <span>Other Code</span>
                </div>
                <div className='col-md-8 zero-padding' >
                    {errors.coded !== '' && <div className='col-md-4 error'>{errors.coded}</div>}
                </div>

                <div className='col-md-8 specify'>
                    <input name='otherCodeSpecify' className='form-control' disabled={mortality.otherCode !== 1} placeholder='Max of 200 characters' value={mortality.otherCodeSpecify} readOnly={isReadOnly} onChange={e => dispatch(allactions.mortalityActions.setOtherCodeSpecify(e.target.value))} />
                </div>
                {errors.otherCodeSpecify !== '' && <div className='col-md-3 error-input specify'>{errors.otherCodeSpecify}</div>}

            </div>


            <div className='form-group col-sm-12'>
                <label htmlFor='deathNumbers question' className='col-sm-12'>E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></label>

                <div className="col-sm-2">
                    <input name='deathNumbers' className='form-control' value={mortality.deathNumbers} readOnly={isReadOnly} onChange={e => dispatch(allactions.mortalityActions.setDeathNumbers(e.target.value))} />
                </div>
                {errors.deathNumbers !== '' && <div className='col-md-3 error-input'>{errors.deathNumbers}</div>}

            </div>
        </CollapsiblePanel>


        <div className='my-4' style={{ position: 'relative' }}>
            <span className='zero-padding col-md-6 col-xs-12' style={{ position: 'relative', float: 'left' }}>
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('D')} />
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('F')} />
            </span>
            {!isReadOnly ? <>
                <span className='zero-padding col-md-6 col-xs-12 ' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right' }}>
                    <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)} />
                    </span>
                    <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='zero-padding col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)} style={{ marginRight: '5px', marginBottom: '5px' }} />
                    </span>
                    <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='zero-padding col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span>
                </span>
            </> :
                <>
                    <span className='zero-padding col-md-6 col-xs-12' style={{ position: 'relative', paddingLeft: '0', paddingRight: '0' }}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Approve'
                            onClick={handleApprove} disabled={!['submitted', 'in review'].includes(props.status)} />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Reject'
                            onClick={handleReject} disabled={!['submitted', 'in review'].includes(props.status)} />

                    </span>
                </>}
        </div>


    </div>
}

export default MortalityForm;