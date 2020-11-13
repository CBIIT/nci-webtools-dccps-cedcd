import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Mortality from '../Details/Boxes/Mortality'
import allactions from '../../actions'

const MortalityForm = ({ ...props }) => {

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-md-12'>
            <label htmlFor='mortalityYear' className='col-md-4' style={{ lineHeight: '2em' }}>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <span className="col-md-3">
                <input name='mortalityYear' className='form-control' placeholder='yyyy' />
            </span>
        </div>
        <div className='form-group col-md-12' style={{ marginTop: '10px' }}>
            <label htmlFor='confirmDeath' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)<span style={{ color: 'red' }}>*</span></label>
        </div>

        <ul style={{listStyle:'none'}}>
            <li>
                <div className="col-md-9">
                    <div htmlFor="deathIndex" className='col-md-5'>U.S. National Death Index (NDI) linkage</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathIndexNo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathIndexYes' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="deathCertificate" className='col-md-5'>Death Certificates</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathCertifNo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathCertifYes' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="deathOther" className='col-md-5'>Other</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathOtherNo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='deathOtherYes' style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{marginLeft:'10px'}}><input className='inputUnderscore'></input></span>
                    </span>
                </div>
            </li>
        </ul>

        
    </div>
}

export default MortalityForm;