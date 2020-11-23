import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'

const MortalityForm = ({ ...props }) => {

    const mortality = useSelector(state => state.mortalityReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();

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
                <input name='mortalityYear' className='form-control' value={mortality.mortalityYear} onChange={e => dispatch(allactions.mortalityActions.setMortalityYear(e.target.value))} placeholder='yyyy' />
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
                        <input type='radio' name='deathIndex' checked={mortality.deathIndex === 0} onClick={() => dispatch(allactions.mortalityActions.setDeathIndex(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathIndex' checked={mortality.deathIndex === 1} onClick={() => dispatch(allactions.mortalityActions.setDeathIndex(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>

            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="deathCertificate" className='col-md-5'>Death Certificates</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathCertificate' checked={mortality.deathCertificate === 0} onClick={() => dispatch(allactions.mortalityActions.setDeathCertificate(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathCertificate' checked={mortality.deathCertificate === 1} onClick={() => dispatch(allactions.mortalityActions.setDeathCertificate(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="otherDeath" className='col-md-5'>Other</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherDeath' checked={mortality.otherDeath === 0} onClick={() => dispatch(allactions.mortalityActions.setOtherDeath(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherDeath' checked={mortality.otherDeath === 1} onClick={() => dispatch(allactions.mortalityActions.setOtherDeath(1))} style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{ marginLeft: '10px' }}><input name='otherDeathSpecify' className='inputUnderscore' value={mortality.otherDeathSpecify} onChange={e => dispatch(allactions.mortalityActions.setOtherDeathSpecify(e.target.value))} style={{ width: '20rem' }}></input></span>
                    </span>
                </div>
            </li>
        </ul>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='haveDeathDate' className='col-md-12'>E.3 Do you have date of death for most subjects<span style={{ color: 'red' }}>*</span></label>
        </div>


        <div className='form-group col-md-9' >
            <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathDate' checked={mortality.haveDeathDate === 0} onClick={() => dispatch(allactions.mortalityActions.setHaveDeathDate(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathDate' checked={mortality.haveDeathDate === 1} onClick={() => dispatch(allactions.mortalityActions.setHaveDeathDate(1))} style={{ width: '30px' }} />
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
                        <input type='radio' name='icd9' checked={mortality.icd9 === 0} onClick={() => dispatch(allactions.mortalityActions.setIcd9(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd9' checked={mortality.icd9 === 1} onClick={() => dispatch(allactions.mortalityActions.setIcd9(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="icd10" className='col-md-5'>ICD-10</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd10' checked={mortality.icd10 === 0} onClick={() => dispatch(allactions.mortalityActions.setIcd10(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd10' checked={mortality.icd10 === 1} onClick={() => dispatch(allactions.mortalityActions.setIcd10(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="notCoded" className='col-md-5'>Not Coded</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='notCoded' checked={mortality.notCoded === 0} onClick={() => dispatch(allactions.mortalityActions.setNotCoded(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='notCoded' checked={mortality.notCoded === 1} onClick={() => dispatch(allactions.mortalityActions.setNotCoded(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="col-md-9">
                    <div htmlFor="otherCode" className='col-md-5'>Other</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherCode' checked={mortality.otherCode === 0} onClick={() => dispatch(allactions.mortalityActions.setOtherCode(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherCode' checked={mortality.otherCode === 1} onClick={() => dispatch(allactions.mortalityActions.setOtherCode(1))} style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{ marginLeft: '10px' }}><input name='otherCodeSpecify' className='inputUnderscore' value={mortality.otherCodeSpecify} onChange={e => dispatch(allactions.mortalityActions.setOtherCodeSpecify(e.target.value))} style={{ width: '20rem' }}></input></span>
                    </span>
                </div>
            </li>
        </ul>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='deathNumbers' className='col-md-12'>E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-3">
                <input name='deathNumbers' className='form-control' value={mortality.deathNumbers} onChange={e => dispatch(allactions.mortalityActions.setDeathNumbers(e.target.value))} />
            </div>
        </div>
        <div className='form-group col-md-12' style={{ margin: '1.5rem' }}>
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