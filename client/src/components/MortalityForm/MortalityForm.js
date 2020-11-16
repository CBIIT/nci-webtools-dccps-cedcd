import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Mortality from '../Details/Boxes/Mortality'
import allactions from '../../actions'

const MortalityForm = ({ ...props }) => {

    const handleSave = () => {
        /* if(Object.entries(errors).length === 0)
             saveEnrollment(79)
         else{
             //setDisplay('block')
             if(window.confirm('there are validation errors, are you sure to save?'))
                 saveEnrollment(79)
         }*/
    }

    const handleSaveContinue = () => {
        /*
        if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
            saveEnrollment(79, true)}
            */
    }

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-md-12'>
            <label htmlFor='mortalityYear' className='col-md-12' style={{ lineHeight: '2em' }}>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-3">
                <input name='mortalityYear' className='form-control' placeholder='yyyy' />
            </div>
        </div>
        <div className='form-group col-md-12' style={{ marginTop: '10px' }}>
            <label htmlFor='confirmDeath' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)<span style={{ color: 'red' }}>*</span></label>
        </div>

        <ul style={{ listStyle: 'none' }}>
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
                        <span style={{ marginLeft: '10px' }}><input className='inputUnderscore' style={{ width: '20rem' }}></input></span>
                    </span>
                </div>
            </li>
        </ul>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='haveDeathDate' className='col-md-12'>E.3 Do you have date of death for most subjects<span style={{ color: 'red' }}>*</span></label>
        </div>


        <div className='form-group col-md-9' >
            <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                <input type='checkbox' name='haveDeathDateNo' style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                <input type='checkbox' name='haveDeathDateYes' style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, what type of death code was used?</span>
        </div>

        <ul style={{ listStyle: 'none' }}>
            <li>
                <div className="col-md-9">
                    <div htmlFor="icd9" className='col-md-5'>ICD-9</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='icd9No' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='icd9Yes' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="icd10" className='col-md-5'>ICD-10</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='icd10No' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='icd10Yes' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="notCoded" className='col-md-5'>Not Coded</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='notCodedNo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='notCodedYes' style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="otherCode" className='col-md-5'>Other</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='otherCodeNo' style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='checkbox' name='otherCodeYes' style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{ marginLeft: '10px' }}><input className='inputUnderscore' style={{ width: '20rem' }}></input></span>
                    </span>
                </div>
            </li>
        </ul>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='deathNumbers' className='col-md-12'>E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-3">
                <input name='deathNumbers' className='form-control' />
            </div>
        </div>

        <div className='form-group col-md-12' style={{margin: '1.5rem'}}>
            <span onClick={() => props.sectionPicker('D')} style={{ position: 'relative', float: 'left' }}>
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
    </div>
}

export default MortalityForm;