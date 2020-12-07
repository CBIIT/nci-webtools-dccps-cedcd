import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import dataLinkageActions from '../../actions/dataLinkageActions'
import validator from '../../validators'

const DataLinkageForm = ({ ...props }) => {

    const dataLinkage = useSelector(state => state.dataLinkageReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();
    const radioError = 'please choose one'
    const cohortId = +window.location.pathname.split('/').pop();


    const [errors, setErrors] = useState({
        haveDataLink: '',
        haveDataLinkSpecify: '',
        haveHarmonization: '',
        haveHarmonizationSpecify: '',
        haveDeposited: '',
        dbGaP: '',
        BioLINCC: '',
        otherRepo: '',
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
                            if(data.dlh_procedure_url) { dispatch(allactions.dataLinkageActions.setDataOnlineURL(data.dlh_procedure_url)) } else { dispatch(allactions.dataLinkageActions.setDataOnlineURL('')) }
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
            if (!(dataLinkage.dbGaP in [0, 1])) { copy.dbGaP = radioError } else { copy.dbGaP = '' }
            if (!(dataLinkage.BioLINCC in [0, 1])) { copy.BioLINCC = radioError } else { copy.BioLINCC = '' }
            if (!(dataLinkage.otherRepo in [0, 1])) { copy.otherRepo = radioError } else { copy.otherRepo = '' }
        }
        else {
            copy.dbGaP = ''
            copy.BioLINCC = ''
            copy.otherRepo = ''
        }
        console.log(dataLinkage)
        //F.4
        if (!(dataLinkage.dataOnline in [0, 1])) { copy.dataOnline = radioError } else { copy.dataOnline = '' }
        if (dataLinkage.dataOnline === 1) {
            if (dataLinkage.dataOnlinePolicy === 0 && dataLinkage.dataOnlineWebsite === 0) { copy.dataOnlineSelected = 'please select at least one option' } else { copy.dataOnlineSelected = '' }
            if (dataLinkage.dataOnlineWebsite) {

                if (dataLinkage.dataOnlineURL.length > 300)
                    copy.dataOnlineURL = 'cannot exceed 300 characters'
                else {
                    copy.dataOnlineURL = validator.urlValidator(dataLinkage.dataOnlineURL, true)
                }
            }
            else{
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
                if (dataLinkage.createdRepoSpecify.length > 500)
                    copy.createdRepoSpecify = 'cannot exceed 500 characters'
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
                    if (!proceed)
                        alert('Data was successfully saved')
                    else
                        props.sectionPicker('G')
                } else {
                    alert(result.message)
                }
            })
    }

    const handleSave = () => {

        if (validateInput()) {
            dispatch(allactions.dataLinkageActions.setSectionFStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('F', 'complete'))
            saveDataLinkage(cohortId, false, 'complete')
        }
        else {
            if (window.confirm('there are validation errors, are you sure you want to save?')) {
                dispatch(allactions.dataLinkageActions.setSectionFStatus('incomplete'))
                dispatch(allactions.sectionActions.setSectionStatus('F', 'incomplete'))
                saveDataLinkage(cohortId, false, 'incomplete')
            }
        }
    }

    const handleSaveContinue = () => {
        if (validateInput()) {
            dispatch(allactions.dataLinkageActions.setSectionFStatus('complete'))
            dispatch(allactions.sectionActions.setSectionStatus('F', 'complete'))
            saveDataLinkage(cohortId, true, 'complete')
        }
        else {
            if (window.confirm('there are validation errors, are you sure you want to save?')) {
                dispatch(allactions.dataLinkageActions.setSectionFStatus('incomplete'))
                dispatch(allactions.sectionActions.setSectionStatus('F', 'incomplete'))
                saveDataLinkage(cohortId, true, 'incomplete')
            }
        }
    }

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='col-md-12'>
            <label htmlFor='haveDataLink' className='col-md-12'>F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span></label>
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 0} onClick={() => { dispatch(allactions.dataLinkageActions.setHaveDataLink(0)); dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify('')) }} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDataLink(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.haveDataLink !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDataLink}</div>}
        </div>

        <div className='form-group col-md-12'>
            <label className='col-md-12'>If yes, please specify:</label>
            <div className='col-md-12'>
                <input name='haveDataLinkSpecify' className='form-control' disabled={dataLinkage.haveDataLink !== 1} placeholder='Specify data link (Max 500 characters)' value={dataLinkage.haveDataLinkSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(e.target.value))}></input>
            </div>
            {errors.haveDataLinkSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDataLinkSpecify}</div>}
        </div>

        <div className='col-md-12'>
            <label htmlFor='haveHarmonization' className='col-md-12'>F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 0} onClick={() => { dispatch(allactions.dataLinkageActions.setHaveHarmonization(0)); dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify('')) }} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveHarmonization(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.haveHarmonization !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveHarmonization}</div>}
        </div>

        <div className='form-group col-md-12'>
            <label className='col-md-12'>If part of a consortium, please specify:</label>
            <div className='col-md-12'>
                <input name='haveHarmonizationSpecify' className='form-control' disabled={dataLinkage.haveHarmonization !== 1} value={dataLinkage.haveHarmonizationSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(e.target.value))} placeholder='Specify Consortum (Max 500 characters)'></input>
            </div>
            {errors.haveHarmonizationSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveHarmonizationSpecify}</div>}
        </div>

        <div className='col-md-12'>
            <label htmlFor='haveDeposited' className='col-md-12'>F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 0} onClick={() => {
                    dispatch(allactions.dataLinkageActions.setHaveDeposited(0));
                    dispatch(allactions.dataLinkageActions.setdbGaP(null))
                    dispatch(allactions.dataLinkageActions.setbioLinCC(null))
                    dispatch(allactions.dataLinkageActions.setOtherRepo(null))
                }} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDeposited(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.haveDeposited !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDeposited}</div>}
        </div>

        <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please select which repositories:</span>
            </div>

            <ul style={{ listStyle: 'none', padding: '0' }}>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="dbGaP" className='col-md-2'>dbGaP</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='dbGaP' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.dbGaP === 0} onClick={() => dispatch(allactions.dataLinkageActions.setdbGaP(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='dbGaP' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.dbGaP === 1} onClick={() => dispatch(allactions.dataLinkageActions.setdbGaP(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                        {errors.dbGaP !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.dbGaP}</div>}
                    </div>

                </li>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="BioLINCC" className='col-md-2'>BioLINCC</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='BioLINCC' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.BioLINCC === 0} onClick={() => dispatch(allactions.dataLinkageActions.setbioLinCC(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='BioLINCC' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.BioLINCC === 1} onClick={() => dispatch(allactions.dataLinkageActions.setbioLinCC(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                        {errors.BioLINCC !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.BioLINCC}</div>}
                    </div>
                </li>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="otherRepo" className='col-md-2'>Other</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='otherRepo' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.otherRepo === 0} onClick={() => dispatch(allactions.dataLinkageActions.setOtherRepo(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='otherRepo' disabled={dataLinkage.haveDeposited !== 1} checked={dataLinkage.otherRepo === 1} onClick={() => dispatch(allactions.dataLinkageActions.setOtherRepo(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                        {errors.otherRepo !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.otherRepo}</div>}
                    </div>
                </li>
            </ul>
        </div>

        <div className='col-md-12' style={{ marginTop: '1em' }}>
            <label htmlFor='dataOnline' className='col-md-12'>F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 0} onClick={() => {
                    dispatch(allactions.dataLinkageActions.setDataOnline(0));
                    dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(0));
                    dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(0));
                    dispatch(allactions.dataLinkageActions.setDataOnlineURL(''));
                }} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 1} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnline(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.dataOnline !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.dataOnline}</div>}
        </div>

        <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please specify:</span>
            </div>

            <ul style={{ listStyle: 'none' }}>
                <li>
                    <input type='checkbox' name='dataOnlinePolicy' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlinePolicy === 1} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnlinePolicy((dataLinkage.dataOnlinePolicy + 1) % 2))} style={{ width: '30px' }} />
                    <span>Policy attached (PDF)</span>
                </li>
                <li>
                    <input type='checkbox' name='dataOnlineWebsite' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlineWebsite === 1} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnlineWebsite((dataLinkage.dataOnlineWebsite + 1) % 2))} style={{ width: '30px' }} />
                    <span>Website, please specify: </span>
                </li>
                {errors.dataOnlineSelected !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.dataOnlineSelected}</div>}
            </ul>


            <div className='form-group col-md-12'>
                <div className='col-md-8'>
                    <input name='dataOnlineURL' className='form-control' disabled={!dataLinkage.dataOnlineWebsite} value={dataLinkage.dataOnlineURL} onChange={e => dispatch(allactions.dataLinkageActions.setDataOnlineURL(e.target.value))} placeholder='Specify website url (Max 300 characters)'></input>
                </div>
                {errors.dataOnlineURL !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.dataOnlineURL}</div>}
            </div>
        </div>

        <div className='col-md-12'>
            <label htmlFor='createdRepo' className='col-md-12'>F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 0} onClick={() => {dispatch(allactions.dataLinkageActions.setCreatedRepo(0)); dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(''))}} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 1} onClick={() => dispatch(allactions.dataLinkageActions.setCreatedRepo(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.createdRepo !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.createdRepo}</div>}
        </div>

        <div className='col-md-12'>
            <label className='col-md-12'>If yes, please specify location:</label>
            <div className='col-md-8'>
                <input name='createdRepoSpecify' className='form-control' disabled={dataLinkage.createdRepo !== 1} value={dataLinkage.createdRepoSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(e.target.value))} placeholder='Specify enclave location (Max 300 characters)'></input>
            </div>
            {errors.createdRepoSpecify !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.createdRepoSpecify}</div>}
        </div>

        <div className='form-group col-md-12' style={{ margin: '1.5rem' }}>
            <span onClick={() => props.sectionPicker('E')} style={{ position: 'relative', float: 'left' }}>
                <input type='button' className='btn btn-primary' value='Go Back' />
            </span>
            <span style={{ position: 'relative', float: 'right' }}>
                <span onClick={handleSave}>
                    <input type='button' className='btn btn-primary' value='Save' />
                </span>
                <span onClick={handleSaveContinue}>
                    <input type='button' className='btn btn-primary' value='Save & Continue' />
                </span>
            </span>
        </div>
    </div >
}

export default DataLinkageForm;