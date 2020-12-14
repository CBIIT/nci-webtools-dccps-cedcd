import React, { useState, useEffect } from 'react'
//import {useForm} from 'react-hook-form'
import { useSelector, useDispatch, batch } from 'react-redux'
import DatePicker from 'react-datepicker'
import allactions from '../../../actions'
import validator from '../../../validators'
const EnrollmentCountsForm = ({ ...props }) => {
    const enrollmentCount = useSelector(state => state.enrollmentCountsReducer)
    const dispatch = useDispatch()
    const [displayStyle, setDisplay] = useState('0')
    const [errors, setErrors] = useState({ mostRecentDate: 'please provide a value' })
    const cohortId = +window.location.pathname.split('/').pop();

    function updateCells(cellid, amount) {
        let [firstid, ...rest] = cellid
        let rowtotalid = firstid + '41'
        let coltotalid = 8 + rest.join('')
        let originalCellAmount = parseInt(enrollmentCount[cellid] * -1) || 0
        let originalRowTotal = parseInt(enrollmentCount[rowtotalid]) || 0
        let originalGrantTotal = parseInt(enrollmentCount['841']) || 0
        let originalColTotal = parseInt(enrollmentCount[coltotalid]) || 0
        let currentAmountString = amount
        let currentAmount = parseInt(amount) || 0
        let delta = currentAmount + originalCellAmount
        dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(cellid, currentAmountString))
        dispatch(allactions.enrollmentCountActions.updateTotals(rowtotalid, originalRowTotal + delta))
        dispatch(allactions.enrollmentCountActions.updateTotals(coltotalid, originalColTotal + delta))
        dispatch(allactions.enrollmentCountActions.updateTotals('841', originalGrantTotal + delta))
    }
    var dates = ''
    useEffect(() => {
        if (!enrollmentCount.hasLoaded) {
            fetch(`/api/questionnaire/enrollment_counts/${cohortId}`, {
                method: 'POST',
            }).then(res => res.json())
                .then(result => {
                    if (result.data.mostRecentDate.mostRecentDate) { let shadow = { ...errors }; delete shadow.mostRecentDate; setErrors(shadow) }
                    batch(() => {
                        for (let i = 0; i < result.data.details.length; i++)
                            dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(result.data.details[i].cellId, result.data.details[i].cellCount))
                        for (let i = 0; i < result.data.rowTotals.length; i++)
                            dispatch(allactions.enrollmentCountActions.updateTotals(result.data.rowTotals[i].rowId + '41', result.data.rowTotals[i].rowTotal))
                        for (let i = 0; i < result.data.colTotals.length; i++)
                            dispatch(allactions.enrollmentCountActions.updateTotals('8' + result.data.colTotals[i].colId, result.data.colTotals[i].colTotal))
                        dispatch(allactions.enrollmentCountActions.updateTotals('841', result.data.grandTotal.grandTotal))
                        dispatch(allactions.enrollmentCountActions.updateMostRecentDate(result.data.mostRecentDate.mostRecentDate))
                        dispatch(allactions.enrollmentCountActions.setHasLoaded(true))
                    })//end of batch
                })// end of then
        }
    }, [])

    /*
    useEffect(() => {
        if(enrollmentCount.mostRecentDate){
            alert(enrollmentCount.mostRecentDate)
            let shadow={...errors}; delete shadow.mostRecentDate; setErrors(shadow)
        }
    }, [])
    */
    const saveEnrollment = (id = cohortId, proceed = false) => {
        fetch(`/api/questionnaire/upsert_enrollment_counts/${id}`, {
            method: "POST",
            body: JSON.stringify(enrollmentCount),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    if (Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'incomplete'))
                    }
                    if (!proceed)
                        alert('Data was successfully saved')
                    else
                        props.sectionPicker('C')
                } else {
                    alert(result.message)
                }
            })
    }
    const handleSave = () => {
        if (Object.entries(errors).length === 0) {
            enrollmentCount.sectionBStatus = 'complete'
            dispatch(allactions.enrollmentCountActions.setSectionBStatus('complete'))
            saveEnrollment(cohortId)
        }
        else {
            setDisplay('1')
            if (window.confirm('there are validation errors, are you sure to save?')) {
                enrollmentCount.sectionBStatus = 'incomplete'
                dispatch(allactions.enrollmentCountActions.setSectionBStatus('incomplete'))
                saveEnrollment(cohortId)
            }
        }
    }

    const handleSaveContinue = () => {
        if (Object.entries(errors).length === 0 || window.confirm('there are validation errors, are you sure to save and proceed?')) {
            saveEnrollment(cohortId, true)
        }
    }


    return <div id='enrollmentCountContainer' className='col-md-12'>
        <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                Record actual, not planned, recruitment counts
                </div>
            <div>
                <form id='currentForm' style={{ boxSizing: 'border-box' }} readOnly >
                    <div style={{ marginTop: '10px' }}>
                        <span><label htmlFor='confirmDate'>B.1{' '}Racial Categories</label></span>
                    </div>
                    <table className='table-stripe table-responsive' readOnly>
                        <thead>
                            <tr>
                                <th rowSpan='3' style={{ fontSize: '1.5rem', paddingRight: '0', width: '15%' }}>Racial Categories</th>
                                <th colSpan='9' style={{ textAlign: 'center' }}>Ethnictiy Categories</th>
                                <th rowSpan='3' style={{ width: '10%', textAlign: 'center' }}>Total</th>
                            </tr>
                            <tr>
                                <th colSpan='3' style={{ textAlign: 'center' }}>Non Hispanic or Latino</th>
                                <th colSpan='3' style={{ textAlign: 'center' }}>Hispanic or Latino</th>
                                <th colSpan='3' style={{ textAlign: 'center' }}>Unknown/not reported ethnicity</th>
                            </tr>
                            <tr>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>Female</th>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>male</th>
                                <th style={{ fontSize: '1.4rem', paddingRight: '0' }}>unknown</th>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>Female</th>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>male</th>
                                <th style={{ fontSize: '1.4rem', paddingRight: '0' }}>unknown</th>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>Female</th>
                                <th style={{ fontSize: '1.4rem', textAlign: 'center' }}>male</th>
                                <th style={{ fontSize: '1.4rem', paddingRight: '0' }}>unknown</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white' }}>American Indian / Alaska Native</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='111' value={enrollmentCount['111']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='112' value={enrollmentCount['112']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='113' value={enrollmentCount['113']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='121' value={enrollmentCount['121']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='122' value={enrollmentCount['122']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='123' value={enrollmentCount['123']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='131' value={enrollmentCount['131']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='132' value={enrollmentCount['132']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='133' value={enrollmentCount['133']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='141' value={enrollmentCount['141']} /></td>
                            </tr>

                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px' }}>Asian</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='211' value={enrollmentCount['211']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='212' value={enrollmentCount['212']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='213' value={enrollmentCount['213']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='221' value={enrollmentCount['221']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='222' value={enrollmentCount['222']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='223' value={enrollmentCount['223']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='231' value={enrollmentCount['231']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='232' value={enrollmentCount['232']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='233' value={enrollmentCount['233']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='241' value={enrollmentCount['241']} /></td>
                            </tr>

                            <tr>
                                <th style={{ fontSize: '1.3rem', backgroundColor: '01857b', color: 'white' }}>Native Hawaiian or other pacific islander</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='311' value={enrollmentCount['311']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='312' value={enrollmentCount['312']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='313' value={enrollmentCount['313']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='321' value={enrollmentCount['321']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='322' value={enrollmentCount['322']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='323' value={enrollmentCount['323']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='331' value={enrollmentCount['331']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='332' value={enrollmentCount['332']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='333' value={enrollmentCount['333']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='341' value={enrollmentCount['341']} /></td>
                            </tr>

                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white' }}>Black or African American</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='411' value={enrollmentCount['411']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='412' value={enrollmentCount['412']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='413' value={enrollmentCount['413']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='421' value={enrollmentCount['421']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='422' value={enrollmentCount['422']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='423' value={enrollmentCount['423']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='431' value={enrollmentCount['431']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='432' value={enrollmentCount['432']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='433' value={enrollmentCount['433']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='441' value={enrollmentCount['441']} /></td>
                            </tr>

                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px' }}>white</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='511' value={enrollmentCount['511']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='512' value={enrollmentCount['512']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='513' value={enrollmentCount['513']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='521' value={enrollmentCount['521']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='522' value={enrollmentCount['522']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='523' value={enrollmentCount['523']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='531' value={enrollmentCount['531']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='532' value={enrollmentCount['532']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='533' value={enrollmentCount['533']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='541' value={enrollmentCount['541']} /></td>
                            </tr>

                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px' }}>More than one race</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='611' value={enrollmentCount['611']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='612' value={enrollmentCount['612']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='613' value={enrollmentCount['613']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='621' value={enrollmentCount['621']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='622' value={enrollmentCount['622']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='623' value={enrollmentCount['623']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='631' value={enrollmentCount['631']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='632' value={enrollmentCount['632']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='633' value={enrollmentCount['633']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='641' value={enrollmentCount['641']} /></td>
                            </tr>

                            <tr>
                                <th style={{ fontSize: '1.4rem', backgroundColor: '01857b', color: 'white' }}>Unknown or not reported</th>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='711' value={enrollmentCount['711']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='712' value={enrollmentCount['712']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='713' value={enrollmentCount['713']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='721' value={enrollmentCount['721']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='722' value={enrollmentCount['722']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='723' value={enrollmentCount['723']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='731' value={enrollmentCount['731']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='732' value={enrollmentCount['732']} /></td>
                                <td style={{ padding: '0' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='733' value={enrollmentCount['733']} /></td>

                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='741' value={enrollmentCount['741']} /></td>
                            </tr>

                            <tr>
                                <th style={{ backgroundColor: '01857b', color: 'white' }}>Total</th>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='811' value={enrollmentCount['811']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='812' value={enrollmentCount['812']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='813' value={enrollmentCount['813']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='821' value={enrollmentCount['821']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='822' value={enrollmentCount['822']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='823' value={enrollmentCount['823']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='831' value={enrollmentCount['831']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='832' value={enrollmentCount['832']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='833' value={enrollmentCount['833']} /></td>
                                <td style={{ padding: '0', backgroundColor: 'lightgray' }}><input className='inputWriter' style={{ fontSize: '1.2rem', textAlign: 'center' }} name='841' value={enrollmentCount['841']} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: '10px' }}>
                        <span><label htmlFor='mostRecentDate'>B.2{' '}Most recent date enrollment counts were confirmed&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                        <span>
                            <DatePicker className='form-control' selected={enrollmentCount.mostRecentDate ? new Date(enrollmentCount.mostRecentDate) : null} dateFormat='MM/dd/yyyy' readOnly />
                        </span>
                    </div>

                </form>
            </div>
            <div style={{ position: 'relative' }}>
                <span onClick={() => props.sectionPicker('A')} style={{ position: 'relative', float: 'left' }}>
                    <input type='button' className='btn btn-primary' value='<< Prev' />
                </span>
                <span onClick={() => props.sectionPicker('C')} style={{ position: 'relative', float: 'Right' }}>
                    <input type='button' className='btn btn-primary' value='Next >>' />
                </span>
            </div>
        </div>
    </div>
}

export default EnrollmentCountsForm