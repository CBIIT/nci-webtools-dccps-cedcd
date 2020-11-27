import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'

const DataLinkageForm = ({ ...props }) => {

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='col-md-12'>
            <label htmlFor='haveDataLink' className='col-md-12'>F.1 Have you linked your cohort data to any other existing databases (e.g., Center for Medicare and Medicaid Services, State or Surveillance, Epidemiology and End Results (SEER) Cancer Registries)?<span style={{ color: 'red' }}>*</span></label>
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDataLink' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, specify:</span>
        </div>
        {/* Add specify input */}


        <div className='col-md-12'>
            <label htmlFor='haveHarmonization' className='col-md-12'>F.2 Have you participated in projects that required cross-cohort data harmonization?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveHarmonization' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-5'>If part of a consortium, please specify:</span>
        </div>
        {/* Add specify input */}

        <div className='col-md-12'>
            <label htmlFor='haveDeposited' className='col-md-12'>F.3 Have you deposited data in an NIH sponsored data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeposited' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, please select which repositories:</span>
        </div>

        <ul style={{ listStyle: 'none' }}>
            <li>
                <div className="col-md-12">
                    <div htmlFor="dbGaP" className='col-md-2'>dbGaP</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='dbGaP' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='dbGaP' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="BioLINCC" className='col-md-2'>BioLINCC</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='BioLINCC' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='BioLINCC' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="otherRepo" className='col-md-2'>Other</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherRepo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherRepo' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
        </ul>

        <div className='col-md-12'>
            <label htmlFor='dataOnline' className='col-md-12'>F.4 Is your procedure for requesting data displayed online?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='dataOnline' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, please specify:</span>
        </div>

        <ul style={{ listStyle: 'none' }}>
            <li>
                <input type='checkbox' name='dataOnlineWebsite' style={{ width: '30px' }} />
                <span>Website, please specify: </span>
                <span style={{ marginLeft: '10px' }}><input name='dataOnlineWebsite' className='inputUnderscore' style={{ width: '20rem' }}></input></span>
            </li>
            <li>
                <input type='checkbox' name='dataOnlinePolicy' style={{ width: '30px' }} />
                <span>Policy attached (PDF)</span>
            </li>
        </ul>

        <div className='col-md-12'>
            <label htmlFor='createdRepo' className='col-md-12'>F.5 Have you created your own data enclave or a public-facing data repository?<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                <input type='radio' name='createdRepo' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            
        </div>
        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, please specify location:</span>
        </div>
        {/* Add specify input */}
    </div >
}

export default DataLinkageForm;