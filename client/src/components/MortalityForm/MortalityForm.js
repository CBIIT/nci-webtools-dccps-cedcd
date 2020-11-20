import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'

const MortalityForm = ({ ...props }) => {

    const mortality = useSelector(state => state.mortalityReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();

    const radioError = 'please choose one'

    const [errors, setErrors] = useState({
        mortalityYear: '',
        deathIndex: '',
        deathCertificate: '',
        otherDeath: '',
        otherDeathSpecify: '',
        haveDeathDate: '',
        haveDeathCause: '',
        icd9: '',
        icd10: '',
        notCoded: '',
        otherCode: '',
        otherCodeSpecify: '',
        deathNumbers: ''
    })

    const validateInput = () => {

        let copy = { ...errors }

        copy.mortalityYear = validator.numberValidator(mortality.mortalityYear, true, false)
        if (!(mortality.deathIndex in [0, 1])) { copy.deathIndex = radioError } else { copy.deathIndex = '' }
        if (!(mortality.deathCertificate in [0, 1])) { copy.deathCertificate = radioError } else { copy.deathCertificate = '' }
        if (!(mortality.otherDeath in [0, 1])) { copy.otherDeath = radioError } else { copy.otherDeath = '' }
        if (mortality.otherDeath === 1 && !mortality.otherDeathSpecify) { copy.otherDeathSpecify = 'please specify' } else { copy.otherDeathSpecify = '' }
        if (!(mortality.haveDeathDate in [0, 1])) { copy.haveDeathDate = radioError } else { copy.haveDeathDate = '' }
        if (!(mortality.haveDeathCause in [0, 1])) { copy.haveDeathCause = radioError } else { copy.haveDeathCause = '' }
        if (mortality.haveDeathCause === 1) {
            if (!(mortality.icd9 in [0, 1])) { copy.icd9 = radioError } else { copy.icd9 = '' }
            if (!(mortality.icd10 in [0, 1])) { copy.icd10 = radioError } else { copy.icd10 = '' }
            if (!(mortality.notCoded in [0, 1])) { copy.notCoded = radioError } else { copy.notCoded = '' }
            if (!(mortality.otherCode in [0, 1])) { copy.otherCode = radioError } else { copy.otherCode = '' }
            if (mortality.otherCode === 1 && !mortality.otherCodeSpecify) { copy.otherCodeSpecify = 'please specify' } else { copy.otherCodeSpecify = '' }
        }
        copy.deathNumbers = validator.numberValidator(mortality.deathNumbers, true, false)

        setErrors(copy);

        return !Object.values(copy).some(x => (x !== undefined && x !== ''));
    }

    const saveMortality = (id=79, proceed=false) => {
        console.log(JSON.stringify(mortality))
        fetch(`/api/questionnaire/update_mortality/${id}`,{
            method: "POST",
            body: JSON.stringify(mortality),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if(result.status === 200){
                    if(!proceed)
                        alert('Data was successfully saved')
                    else
                        props.sectionPicker('F')
                }else{
                    alert(result.message)
                }
            })
    }

    const handleSave = () => {

        if (validateInput()) {
            //Complete
            dispatch(allactions.mortalityActions.setSectionEStatus('complete'))
            saveMortality(79)
        }
        else {
            //Incomplete
            if (window.confirm('there are validation errors, are you sure you want to save?')) {
                dispatch(allactions.mortalityActions.setSectionEStatus('incomplete'))
                saveMortality(79)
            }
        }
    }

    const handleSaveContinue = () => {

    }

    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-md-12'>
            <label htmlFor='mortalityYear' className='col-md-12' style={{ lineHeight: '2em' }}>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-3">
                <input name='mortalityYear' className='form-control' value={mortality.mortalityYear} onChange={e => dispatch(allactions.mortalityActions.setMortalityYear(e.target.value))} placeholder='yyyy' />
            </div>
            {errors.mortalityYear !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.mortalityYear}</div>}
        </div>


        <div className='form-group col-md-12' style={{ marginTop: '10px' }}>
            <label htmlFor='confirmDeath' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)<span style={{ color: 'red' }}>*</span></label>
        </div>

        <ul style={{ listStyle: 'none' }}>
            <li>
                <div className="col-md-12">
                    <div htmlFor="deathIndex" className='col-md-4'>U.S. National Death Index (NDI) linkage</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathIndex' checked={mortality.deathIndex === 0} onClick={() => dispatch(allactions.mortalityActions.setDeathIndex(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathIndex' checked={mortality.deathIndex === 1} onClick={() => dispatch(allactions.mortalityActions.setDeathIndex(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                    {errors.deathIndex !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.deathIndex}</div>}
                </div>

            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="deathCertificate" className='col-md-4'>Death Certificates</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathCertificate' checked={mortality.deathCertificate === 0} onClick={() => dispatch(allactions.mortalityActions.setDeathCertificate(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='deathCertificate' checked={mortality.deathCertificate === 1} onClick={() => dispatch(allactions.mortalityActions.setDeathCertificate(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                    {errors.deathCertificate !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.deathCertificate}</div>}
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="otherDeath" className='col-md-4'>Other</div>

                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherDeath' checked={mortality.otherDeath === 0} onClick={() => { dispatch(allactions.mortalityActions.setOtherDeath(0)); dispatch(allactions.mortalityActions.setOtherDeathSpecify('')) }} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-4" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherDeath' checked={mortality.otherDeath === 1} onClick={() => dispatch(allactions.mortalityActions.setOtherDeath(1))} style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{ marginLeft: '10px' }}><input name='otherDeathSpecify' className='inputUnderscore' value={mortality.otherDeathSpecify} onChange={e => dispatch(allactions.mortalityActions.setOtherDeathSpecify(e.target.value))} style={{ width: '20rem' }}></input></span>
                    </span>
                    {errors.otherDeath !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.otherDeath}</div>}
                    {errors.otherDeathSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.otherDeathSpecify}</div>}
                </div>
            </li>
            <li>

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
            {errors.haveDeathDate !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDeathDate}</div>}
        </div>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='haveDeathCause' className='col-md-12'>E.4 Do you have cause of death for most subjects<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-9' >
            <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathCause' checked={mortality.haveDeathCause === 0} onClick={() => dispatch(allactions.mortalityActions.setHaveDeathCause(0))} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathCause' checked={mortality.haveDeathCause === 1} onClick={() => dispatch(allactions.mortalityActions.setHaveDeathCause(1))} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>
            {errors.haveDeathCause !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.haveDeathCause}</div>}
        </div>

        <div className='form-group col-md-12'>
            <span className='col-md-5'>If yes, what type of death code was used?</span>
        </div>

        <ul style={{ listStyle: 'none' }}>
            <li>
                <div className="col-md-12">
                    <div htmlFor="icd9" className='col-md-4'>ICD-9</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd9' checked={mortality.icd9 === 0} onClick={() => dispatch(allactions.mortalityActions.setIcd9(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd9' checked={mortality.icd9 === 1} onClick={() => dispatch(allactions.mortalityActions.setIcd9(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                    {errors.icd9 !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.icd9}</div>}
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="icd10" className='col-md-4'>ICD-10</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd10' checked={mortality.icd10 === 0} onClick={() => dispatch(allactions.mortalityActions.setIcd10(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='icd10' checked={mortality.icd10 === 1} onClick={() => dispatch(allactions.mortalityActions.setIcd10(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                    {errors.icd10 !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.icd10}</div>}
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="notCoded" className='col-md-4'>Not Coded</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='notCoded' checked={mortality.notCoded === 0} onClick={() => dispatch(allactions.mortalityActions.setNotCoded(0))} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='notCoded' checked={mortality.notCoded === 1} onClick={() => dispatch(allactions.mortalityActions.setNotCoded(1))} style={{ width: '30px' }} />
                        <span>Yes</span>
                    </span>
                    {errors.notCoded !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.notCoded}</div>}
                </div>
            </li>
            <li>
                <div className="col-md-12">
                    <div htmlFor="otherCode" className='col-md-4'>Other</div>

                    <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherCode' checked={mortality.otherCode === 0} onClick={() => { dispatch(allactions.mortalityActions.setOtherCode(0)); dispatch(allactions.mortalityActions.setOtherCodeSpecify('')) }} style={{ width: '30px' }} />
                        <span>No</span>
                    </span>

                    <span className="col-md-4" style={{ paddingRight: '0', marginRight: '0', whiteSpace: 'nowrap' }}>
                        <input type='radio' name='otherCode' checked={mortality.otherCode === 1} onClick={() => dispatch(allactions.mortalityActions.setOtherCode(1))} style={{ width: '30px' }} />
                        <span>Yes, specify</span>
                        <span style={{ marginLeft: '10px' }}><input name='otherCodeSpecify' className='inputUnderscore' value={mortality.otherCodeSpecify} onChange={e => dispatch(allactions.mortalityActions.setOtherCodeSpecify(e.target.value))} style={{ width: '20rem' }}></input></span>
                    </span>
                    {errors.otherCode !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.otherCode}</div>}
                    {errors.otherCodeSpecify !== '' && <div className='col-md-3' style={{ color: 'red' }}>{errors.otherCodeSpecify}</div>}
                </div>
            </li>
        </ul>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='deathNumbers' className='col-md-12'>E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></label>
            <div className="col-md-3">
                <input name='deathNumbers' className='form-control' value={mortality.deathNumbers} onChange={e => dispatch(allactions.mortalityActions.setDeathNumbers(e.target.value))} />
            </div>
            {errors.deathNumbers !== '' && <div className='col-md-3' style={{ color: 'red', lineHeight: '2em' }}>{errors.deathNumbers}</div>}
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