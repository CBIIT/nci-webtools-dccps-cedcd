import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'

const DataLinkageForm = ({ ...props }) => {

    const dataLinkage = useSelector(state => state.dataLinkageReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();

    const handleSave = () => {

    }

    const handleSaveContinue = () => {

    }

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='col-md-12'>
            <label htmlFor='haveDataLink' className='col-md-12'>F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span></label>
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 0} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDataLink(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' checked={dataLinkage.haveDataLink === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDataLink(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        {dataLinkage.haveDataLink === 1 && <div className='form-group col-md-12'>
            <label className='col-md-12'>If yes, please specify:</label>
            <div className='col-md-12'>
                <input name='haveDataLinkSpecify' className='form-control' placeholder='Specify data link (Max 500 characters)' value={dataLinkage.haveDataLinkSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setHaveDataLinkSpecify(e.target.value))}></input>
            </div>
        </div>}

        <div className='col-md-12'>
            <label htmlFor='haveHarmonization' className='col-md-12'>F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 0} onClick={() => dispatch(allactions.dataLinkageActions.setHaveHarmonization(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' checked={dataLinkage.haveHarmonization === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveHarmonization(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        {dataLinkage.haveHarmonization === 1 && <div className='form-group col-md-12'>
            <label className='col-md-12'>If part of a consortium, please specify:</label>
            <div className='col-md-12'>
                <input name='haveHarmonizationSpecify' className='form-control' value={dataLinkage.haveHarmonizationSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setHaveHarmonizationSpecify(e.target.value))} placeholder='Specify Consortum (Max 500 characters)'></input>
            </div>
        </div>}

        <div className='col-md-12'>
            <label htmlFor='haveDeposited' className='col-md-12'>F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 0} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDeposited(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' checked={dataLinkage.haveDeposited === 1} onClick={() => dispatch(allactions.dataLinkageActions.setHaveDeposited(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        {dataLinkage.haveDeposited === 1 && <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please select which repositories:</span>
            </div>

            <ul style={{ listStyle: 'none' }}>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="dbGaP" className='col-md-2'>dbGaP</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='dbGaP' checked={dataLinkage.dbGaP === 0} onClick={() => dispatch(allactions.dataLinkageActions.setdbGaP(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='dbGaP' checked={dataLinkage.dbGaP === 1} onClick={() => dispatch(allactions.dataLinkageActions.setdbGaP(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="BioLINCC" className='col-md-2'>BioLINCC</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='BioLINCC' checked={dataLinkage.BioLINCC === 0} onClick={() => dispatch(allactions.dataLinkageActions.setbioLinCC(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='BioLINCC' checked={dataLinkage.BioLINCC === 1} onClick={() => dispatch(allactions.dataLinkageActions.setbioLinCC(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                    </div>
                </li>
                <li>
                    <div className="col-md-12">
                        <div htmlFor="otherRepo" className='col-md-2'>Other</div>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='otherRepo' checked={dataLinkage.otherRepo === 0} onClick={() => dispatch(allactions.dataLinkageActions.setOtherRepo(0))} style={{ width: '30px' }} />
                            <span>No</span>
                        </span>

                        <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                            <input type='radio' name='otherRepo' checked={dataLinkage.otherRepo === 1} onClick={() => dispatch(allactions.dataLinkageActions.setOtherRepo(1))} style={{ width: '30px' }} />
                            <span>Yes</span>
                        </span>
                    </div>
                </li>
            </ul>
        </div>}

        <div className='col-md-12'>
            <label htmlFor='dataOnline' className='col-md-12'>F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 0} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnline(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' checked={dataLinkage.dataOnline === 1} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnline(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        {dataLinkage.dataOnline === 1 && <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, please specify:</span>
            </div>

            <ul style={{ listStyle: 'none' }}>
                <li>
                    <input type='checkbox' name='dataOnlinePolicy' checked={dataLinkage.dataOnlinePolicy} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnlinePolicy(!dataLinkage.dataOnlinePolicy))} style={{ width: '30px' }} />
                    <span>Policy attached (PDF)</span>
                </li>
                <li>
                    <input type='checkbox' name='dataOnlineWebsite' checked={dataLinkage.dataOnlineWebsite} onClick={() => dispatch(allactions.dataLinkageActions.setDataOnlineWebsite(!dataLinkage.dataOnlineWebsite))} style={{ width: '30px' }} />
                    <span>Website, please specify: </span>

                </li>
            </ul>

            {dataLinkage.dataOnlineWebsite && <div className='form-group col-md-12'>
                <div className='col-md-8'>
                    <input name='dataOnlineURL' className='form-control' value={dataLinkage.dataOnlineURL} onChange={e => dispatch(allactions.dataLinkageActions.setDataOnlineURL(e.target.value))} placeholder='Specify website url (Max 300 characters)'></input>
                </div>
            </div>}
        </div>}

        <div className='col-md-12'>
            <label htmlFor='createdRepo' className='col-md-12'>F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 0} onClick={() => dispatch(allactions.dataLinkageActions.setCreatedRepo(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' checked={dataLinkage.createdRepo === 1} onClick={() => dispatch(allactions.dataLinkageActions.setCreatedRepo(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        {dataLinkage.createdRepo === 1 && <div className='col-md-12'>
            <label className='col-md-12'>If yes, please specify location:</label>
            <div className='col-md-8'>
                <input name='createdRepoSpecify' className='form-control' value={dataLinkage.createdRepoSpecify} onChange={e => dispatch(allactions.dataLinkageActions.setCreatedRepoSpecify(e.target.value))} placeholder='Specify enclave location (Max 300 characters)'></input>
            </div>
        </div>}

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