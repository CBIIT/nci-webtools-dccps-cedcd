import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'

const DataLinkageForm = ({ ...props }) => {

    const dataLinkage = useSelector(state => state.dataLinkageReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();
    const radioError = 'please choose one'
    const cohortId = +window.location.pathname.split('/').pop();


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

                })
        }
    }, [])



    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='col-md-12'>
            <label htmlFor='haveDataLink' className='col-md-12'>F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span></label>
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <label className='col-md-12'>If yes, please specify:</label>
            <div className='col-md-12'>
                <input name='haveDataLinkSpecify' className='form-control' disabled={dataLinkage.haveDataLink !== 1} placeholder='Specify data link (Max 500 characters)' value={dataLinkage.haveDataLinkSpecify} ></input>
            </div>
        </div>

        <div className='col-md-12'>
            <label htmlFor='haveHarmonization' className='col-md-12'>F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <label className='col-md-12'>If part of a consortium, please specify:</label>
            <div className='col-md-12'>
                <input name='haveHarmonizationSpecify' className='form-control' disabled={dataLinkage.haveHarmonization !== 1} value={dataLinkage.haveHarmonizationSpecify}
                    placeholder='Specify Consortum (Max 500 characters)'></input>
            </div>
        </div>

        <div className='col-md-12'>
            <label htmlFor='haveDeposited' className='col-md-12'>F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please select which repositories:</span>
            </div>

            <div className='col-md-12'>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='dbGaP' checked={dataLinkage.dbGaP === 1} disabled={dataLinkage.haveDeposited !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>dbGaP</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='BioLINCC' checked={dataLinkage.BioLINCC === 1} disabled={dataLinkage.haveDeposited !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>BioLINCC</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='otherRepo' checked={dataLinkage.otherRepo === 1} disabled={dataLinkage.haveDeposited !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>otherRepo</span>
                </div>
            </div>
        </div>

        <div className='col-md-12' style={{ marginTop: '1em' }}>
            <label htmlFor='dataOnline' className='col-md-12'>F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please specify:</span>
            </div>

            <div className='col-md-12'>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='dataOnlinePolicy' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlinePolicy === 1} style={{ width: '30px' }} />
                    </span>
                    <span>Policy attached (PDF)</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='dataOnlineWebsite' disabled={dataLinkage.dataOnline !== 1} checked={dataLinkage.dataOnlineWebsite === 1} style={{ width: '30px' }} />
                    </span>
                    <span>Website, please specify: </span>
                </div>

            </div>

            <div className='form-group col-md-12' style={{ marginTop: '1em' }}>
                <div className='col-md-8'>
                    <input name='dataOnlineURL' className='form-control' disabled={!dataLinkage.dataOnlineWebsite} value={dataLinkage.dataOnlineURL}
                        placeholder='Specify website url (Max 300 characters)'></input>
                </div>
            </div>
        </div>

        <div className='col-md-12'>
            <label htmlFor='createdRepo' className='col-md-12'>F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='col-md-12'>
            <label className='col-md-12'>If yes, please specify location:</label>
            <div className='col-md-8'>
                <input name='createdRepoSpecify' className='form-control' disabled={dataLinkage.createdRepo !== 1} value={dataLinkage.createdRepoSpecify}
                    placeholder='Specify enclave location (Max 300 characters)'></input>
            </div>
        </div>

        <div className='form-group col-md-12' style={{ margin: '1.5rem' }}>
            <span onClick={() => props.sectionPicker('E')} style={{ position: 'relative', float: 'left' }}>
                <input type='button' className='btn btn-primary' value='Go Back' />
            </span>
            <span onClick={() => props.sectionPicker('G')} style={{ position: 'relative', float: 'Right' }}>
                <input type='button' className='btn btn-primary' value='Next' />
            </span>
        </div>
    </div >
}

export default DataLinkageForm;