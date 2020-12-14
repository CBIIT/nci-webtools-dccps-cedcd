import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'
import validator from '../../../validators'

const MortalityForm = ({ ...props }) => {

    const mortality = useSelector(state => state.mortalityReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch();

    const cohortId = +window.location.pathname.split('/').pop();

    useEffect(() => {
        if (!mortality.hasLoaded) {
            fetch(`/api/questionnaire/mortality/${cohortId}`, {
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
                            dispatch(allactions.mortalityActions.setHasLoaded(true))
                            dispatch(allactions.mortalityActions.setMortalityYear(data.mort_year_mortality_followup))
                            dispatch(allactions.mortalityActions.setDeathIndex(data.mort_death_confirmed_by_ndi_linkage))
                            dispatch(allactions.mortalityActions.setDeathCertificate(data.mort_death_confirmed_by_death_certificate))
                            dispatch(allactions.mortalityActions.setOtherDeath(data.mort_death_confirmed_by_other))
                            dispatch(allactions.mortalityActions.setOtherDeathSpecify(data.mort_death_confirmed_by_other_specify))
                            dispatch(allactions.mortalityActions.setHaveDeathDate(data.mort_have_date_of_death))
                            dispatch(allactions.mortalityActions.setHaveDeathCause(data.mort_have_cause_of_death))
                            dispatch(allactions.mortalityActions.setIcd9(data.mort_death_code_used_icd9))
                            dispatch(allactions.mortalityActions.setIcd10(data.mort_death_code_used_icd10))
                            dispatch(allactions.mortalityActions.setNotCoded(data.mort_death_not_coded))
                            dispatch(allactions.mortalityActions.setOtherCode(data.mort_death_code_used_other))
                            dispatch(allactions.mortalityActions.setOtherCodeSpecify(data.mort_death_code_used_other_specify))
                            dispatch(allactions.mortalityActions.setDeathNumbers(data.mort_number_of_deaths))

                            dispatch(allactions.mortalityActions.setSectionEStatus(completion))
                            dispatch(allactions.sectionActions.setSectionStatus('E', completion))
                        })
                    }
                    else {
                        dispatch(allactions.mortalityActions.setSectionEStatus('incomplete'))
                        dispatch(allactions.sectionActions.setSectionStatus('E', 'incomplete'))
                    }
                })
        }
    }, [])


    const saveMortality = (id = cohortId, proceed = false, complete) => {
        const copy = { ...mortality, sectionEStatus: complete }
        console.log(JSON.stringify(copy))
        fetch(`/api/questionnaire/update_mortality/${id}`, {
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
                        props.sectionPicker('F')
                } else {
                    alert(result.message)
                }
            })
    }



    return <div className='col-md-12' style={{ marginTop: '20px', paddingLeft: '0px' }}>

        <div className='form-group col-sm-12'>
            <label htmlFor='mortalityYear' className='col-sm-12' style={{ lineHeight: '2em' }}>E.1 Most recent year of mortality follow up<span style={{ color: 'red' }}>*</span></label>
            <div className="col-sm-2">
                <input name='mortalityYear' className='form-control' value={mortality.mortalityYear} placeholder='yyyy' />
            </div>
        </div>


        <div className='form-group col-md-12' style={{ marginTop: '10px' }}>
            <label htmlFor='confirmDeath' className='col-md-5'>E.2 How did your cohort confirm death? (select all that apply)</label>
        </div>

        <div className='col-md-12'>
            <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                    <input type='checkbox' name='deathIndex' checked={mortality.deathIndex === 1} style={{ width: '30px' }} />
                </span>
                <span>U.S. National Death Index (NDI) linkage</span>
            </div>
            <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                    <input type='checkbox' name='deathCertificate' checked={mortality.deathCertificate === 1} style={{ width: '30px' }} />
                </span>
                <span>Death Certificates</span>
            </div>
            <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                    <input type='checkbox' name='otherDeath' checked={mortality.otherDeath === 1} style={{ width: '30px' }} />
                </span>
                <span>Other</span>
            </div>
        </div>

        <div className="col-sm-12 form-group" style={{ marginTop: '1em' }}>
            <div className='col-sm-7'>
                <input name='otherDeathSpecify' className='form-control' value={mortality.otherDeathSpecify} disabled={mortality.otherDeath !== 1} placeholder='Specify confirmation of death (Max 200 characters)' />
            </div>
        </div>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='haveDeathDate' className='col-md-12'>E.3 Do you have date of death for most subjects<span style={{ color: 'red' }}>*</span></label>
        </div>


        <div className='form-group col-md-9' >
            <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathDate' checked={mortality.haveDeathDate === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathDate' checked={mortality.haveDeathDate === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        <div className='form-group col-md-12' style={{ marginTop: '10px', marginBottom: '0px' }}>
            <label htmlFor='haveDeathCause' className='col-md-12'>E.4 Do you have cause of death for most subjects<span style={{ color: 'red' }}>*</span></label>
        </div>

        <div className='form-group col-md-9' >
            <span className='col-md-1' style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathCause' checked={mortality.haveDeathCause === 0} style={{ width: '30px' }} />
                <span>No</span>
            </span>

            <span className="col-md-1" style={{ whiteSpace: 'nowrap' }}>
                <input type='radio' name='haveDeathCause' checked={mortality.haveDeathCause === 1} style={{ width: '30px' }} />
                <span>Yes</span>
            </span>

        </div>

        <div>
            <div className='form-group col-md-12'>
                <span className='col-md-5'>If yes, what type of death code was used?</span>
            </div>


            <div className='col-md-12'>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='icd9' checked={mortality.icd9 === 1} disabled={mortality.haveDeathCause !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>ICD-9</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='icd10' checked={mortality.icd10 === 1} disabled={mortality.haveDeathCause !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>ICD-10</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='notCoded' checked={mortality.notCoded === 1} disabled={mortality.haveDeathCause !== 1} style={{ width: '30px' }} />
                    </span>
                    <span>Not Coded</span>
                </div>
                <div className='col-md-8' style={{ padding: '0', margin: '0' }}>
                    <span className='col-md-1' style={{ paddingRight: '0', marginRight: '0', width: '50px' }}>
                        <input type='checkbox' name='otherCode' checked={mortality.otherCode === 1} disabled={mortality.haveDeathCause !== 1} onClick={() => { dispatch(allactions.mortalityActions.setOtherCode((mortality.otherCode + 1) % 2)); dispatch(allactions.mortalityActions.setOtherCodeSpecify('')) }} style={{ width: '30px' }} />
                    </span>
                    <span>Other Code</span>
                </div>


            </div>

            <div className="col-sm-12 form-group" style={{ marginTop: '1em' }}>
                <div className='col-sm-7'>
                    <input name='otherCodeSpecify' className='form-control' disabled={mortality.otherCode !== 1} placeholder='Specify death code (Max 200 characters)' value={mortality.otherCodeSpecify} onChange={e => dispatch(allactions.mortalityActions.setOtherCodeSpecify(e.target.value))} />
                </div>
            </div>
        </div>

        <div className='col-sm-12'>
            <label htmlFor='deathNumbers' className='col-sm-12'>E.5 What is the number of deaths in your cohort as of most recent mortality follow-up?<span style={{ color: 'red' }}>*</span></label>
        </div>
        <div className='form-group col-sm-12' style={{ marginTop: '10px', marginBottom: '0px' }}>

            <div className="col-sm-2">
                <input name='deathNumbers' className='form-control' value={mortality.deathNumbers} />
            </div>
        </div>
        <div className='col-sm-12' style={{ marginTop: '10px', marginBottom: '20px' }}>

        </div>

        <div style={{ position: 'relative' }}>
            <span onClick={() => props.sectionPicker('D')} style={{ position: 'relative', float: 'left' }}>
                <input type='button' className='btn btn-primary' value='<< Prev' />
            </span>
            <span onClick={() => props.sectionPicker('F')} style={{ position: 'relative', float: 'Right' }}>
                <input type='button' className='btn btn-primary' value='Next >>' />
            </span>
        </div>
    </div>
}

export default MortalityForm;