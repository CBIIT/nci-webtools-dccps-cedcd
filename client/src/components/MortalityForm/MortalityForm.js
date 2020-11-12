import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Mortality from '../Details/Boxes/Mortality'
import allactions from '../../actions'

const MortalityForm = ({ ...props }) => {

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-md-12'>
            <label htmlFor='mortalityYear' className='col-md-5'>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <span className="col-md-3">
                <input name='mortalityYear' className='form-control' placeholder='yyyy' />
            </span>
        </div>
        <div className='form-group col-md-12' style={{marginTop:'10px'}}>
            <label htmlFor='mortalityYear' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-4">
                
            </div>
        </div>

    </div>
}

export default MortalityForm;