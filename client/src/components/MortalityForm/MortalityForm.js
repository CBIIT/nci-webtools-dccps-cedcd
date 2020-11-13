import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Mortality from '../Details/Boxes/Mortality'
import allactions from '../../actions'

const MortalityForm = ({ ...props }) => {

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-md-12'>
            <label htmlFor='mortalityYear' className='col-md-4' style={{lineHeight: '2em'}}>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <span className="col-md-3">
                <input name='mortalityYear' className='form-control' placeholder='yyyy' />
            </span>
        </div>
        <div className='form-group col-md-12' style={{ marginTop: '10px' }}>
            <label htmlFor='confirmDeath' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className="form-group col-md-12">
            <div htmlFor="deathIndex" className='col-md-4'>U.S. National Death Index (NDI) linkage</div>
            <span className='col-md-1' style={{paddingRight: '0', marginRight: '0'}}>
                <input type='checkbox' name='deathIndexNo' style={{width:'40px'}}/>
                <span>No</span>
            </span>
            
            <span className="col-md-2">

            </span>
        </div>


    </div>
}

export default MortalityForm;