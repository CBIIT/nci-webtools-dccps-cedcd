import React, {useState, useEffect} from 'react'
import Reminder from '../Tooltip/Tooltip'
import {useSelector, useDispatch, batch} from 'react-redux'
import DatePicker from 'react-datepicker'
import allactions from '../../actions'
//import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'

import 'react-datepicker/dist/react-datepicker.css'
import './EnrollmentCounts.css'
const EnrollmentCountsForm = ({...props}) => {
    const enrollmentCount = useSelector(state => state.enrollmentCountsReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.enrollmentCountErrorReducer)
    const cohortID = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const dispatch = useDispatch()
    //const [displayStyle, setDisplay] = useState('0')
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    //const cohortId = +window.location.pathname.split('/').pop();
    //const [errors, setErrors] = useState({mostRecentDate: 'please provide a value'})
    function updateCells(cellid, amount){
        let [firstid, ...rest] = cellid
        let rowtotalid = firstid+'41'
        let coltotalid = 8+rest.join('')
        let originalCellAmount = parseInt(enrollmentCount[cellid] * -1) || 0
        let originalRowTotal = parseInt(enrollmentCount[rowtotalid]) || 0
        let originalGrantTotal = parseInt(enrollmentCount['841']) || 0
        let originalColTotal = parseInt(enrollmentCount[coltotalid]) || 0
        let currentAmountString = amount
        let currentAmount = parseInt(amount) || 0
        let delta = currentAmount + originalCellAmount
        dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(cellid, currentAmountString))
        dispatch(allactions.enrollmentCountActions.updateTotals(rowtotalid, originalRowTotal+delta))
        dispatch(allactions.enrollmentCountActions.updateTotals(coltotalid, originalColTotal+delta))
        dispatch(allactions.enrollmentCountActions.updateTotals('841', originalGrantTotal+delta))
    }
    //var dates = ''
    useEffect(() => {
        if(!enrollmentCount.hasLoaded){
            fetch(`/api/questionnaire/enrollment_counts/${cohortID}`, {
                method: 'POST',
            }).then(res => res.json())
              .then(result => {               
                batch(()=> {
                    if(result.data.mostRecentDate.mostRecentDate) dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(true))
                    for(let i = 0; i < result.data.details.length; i++)
                        dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(result.data.details[i].cellId, result.data.details[i].cellCount))
                    for(let i = 0; i < result.data.rowTotals.length; i++)
                        dispatch(allactions.enrollmentCountActions.updateTotals(result.data.rowTotals[i].rowId+'41', result.data.rowTotals[i].rowTotal))
                    for(let i = 0; i < result.data.colTotals.length; i++)
                        dispatch(allactions.enrollmentCountActions.updateTotals('8'+result.data.colTotals[i].colId, result.data.colTotals[i].colTotal))
                    dispatch(allactions.enrollmentCountActions.updateTotals('841', result.data.grandTotal.grandTotal))
                    dispatch(allactions.enrollmentCountActions.updateMostRecentDate(result.data.mostRecentDate.mostRecentDate))
                    dispatch(allactions.enrollmentCountActions.setHasLoaded(true))
                })//end of batch
            })// end of then
        }
    }, [])

    const resetCohortStatus = (cohortID, nextStatus) => {
        if(['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)){
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
              .then(result => {
                  if (result && result.status === 200){
                    dispatch(({type: 'SET_COHORT_STATUS', value: nextStatus}))
                  }
              })
        }
    }

    const saveEnrollment = (id=cohortID, proceed=false) => {
        fetch(`/api/questionnaire/upsert_enrollment_counts/${id}`,{
            method: "POST",
            body: JSON.stringify(enrollmentCount),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if(result.status === 200){
                    if(Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'complete'))
                    else{
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'incomplete'))
                    }
                    if(result.data){
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortID)
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                        if (result.data.status)
                            dispatch(({type: 'SET_COHORT_STATUS', value: result.data.status}))                    
                    }
                    if(!proceed)
                        setSuccessMsg(true) 
                    else
                        props.sectionPicker('C')
                }else{
                    setSuccessMsg(true) 
                }
            })
    }
    const handleSave = () => {
        setSaved(true)
        if(Object.entries(errors).length === 0){
            enrollmentCount.sectionBStatus='complete'
            dispatch(allactions.enrollmentCountActions.setSectionBStatus('complete'))
            saveEnrollment(cohortID)  
        }
        else{
            //setDisplay('1')
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)
        if(Object.entries(errors).length === 0){
            enrollmentCount.sectionBStatus='complete'
            dispatch(allactions.enrollmentCountActions.setSectionBStatus('complete'))
            saveEnrollment(cohortID, true)
        }
        else{
            setModalShow(true)
            setProceed(true)
            }
    }

    const confirmSaveStay = () => {
        console.dir('before dispatch'+enrollmentCount)
        enrollmentCount.sectionBStatus='incomplete'
        
        dispatch(allactions.enrollmentCountActions.setSectionBStatus('incomplete'));
        console.dir('after dispatch'+enrollmentCount)
        saveEnrollment(cohortID);setModalShow(false)
    }

    const confirmSaveContinue = () => {
        enrollmentCount.sectionBStatus='incomplete'
        dispatch(allactions.enrollmentCountActions.setSectionBStatus('incomplete'))
        saveEnrollment(cohortID, true);setModalShow(false)
    }

    return <div id='enrollmentCountContainer' className='col-md-12'>
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg}/>}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
            <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>            
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    Record actual, not planned, recruitment counts
                </div>
            <div>
                <form  style={{boxSizing: 'border-box', overflowX: window.innerWidth <= 1000 ? 'scroll' : ''}}>
                    <div style={{marginBottom: '10px'}}>
                        <span><label htmlFor='confirmDate'>B.1{' '}Racial Categories</label></span>
                    </div>
                    <div className="table-responsive">
                        <table className='table-striped'>
                            <thead>
                                <tr>
                                    <th rowSpan='3' style={{fontSize: '1.5rem', paddingRight: '0', width: '15%'}}>Racial Categories</th>
                                    <th colSpan='9' style={{textAlign: 'center'}}>Ethnictiy Categories</th>
                                    <th rowSpan='3' style={{width: '10%', textAlign: 'center'}}>Total</th>
                                </tr>
                                <tr>
                                    <th colSpan='3' style={{textAlign: 'center'}}>Non Hispanic or Latino</th>
                                    <th colSpan='3' style={{textAlign: 'center'}}>Hispanic or Latino</th>
                                    <th colSpan='3' style={{textAlign: 'center'}}>Unknown/not reported ethnicity</th>
                                </tr>
                                <tr>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                    <th style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                    <th  style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                    <th style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white'}}>American Indian / Alaska Native</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='111'  value={enrollmentCount['111']} onChange={(e) => updateCells('111', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='112'  value={enrollmentCount['112']} onChange={(e) => updateCells('112', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='113'  value={enrollmentCount['113']} onChange={(e) => updateCells('113', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='121'  value={enrollmentCount['121']} onChange={(e) => updateCells('121', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='122'  value={enrollmentCount['122']} onChange={(e) => updateCells('122', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='123'  value={enrollmentCount['123']} onChange={(e) => updateCells('123', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='131'  value={enrollmentCount['131']} onChange={(e) => updateCells('131', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='132'  value={enrollmentCount['132']} onChange={(e) => updateCells('132', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='133'  value={enrollmentCount['133']} onChange={(e) => updateCells('133', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='141'  value={enrollmentCount['141']} /></td>
                                </tr>

                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>Asian</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='211'  value={enrollmentCount['211']} onChange={(e) => updateCells('211', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='212'  value={enrollmentCount['212']} onChange={(e) => updateCells('212', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='213'  value={enrollmentCount['213']} onChange={(e) => updateCells('213', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='221'  value={enrollmentCount['221']} onChange={(e) => updateCells('221', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='222'  value={enrollmentCount['222']} onChange={(e) => updateCells('222', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='223'  value={enrollmentCount['223']} onChange={(e) => updateCells('223', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='231'  value={enrollmentCount['231']} onChange={(e) => updateCells('231', e.target.value)}/></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='232'  value={enrollmentCount['232']} onChange={(e) => updateCells('232', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='233'  value={enrollmentCount['233']} onChange={(e) => updateCells('233', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='241'  value={enrollmentCount['241']} /></td>
                                </tr>

                                <tr>
                                    <th style={{fontSize: '1.3rem', backgroundColor: '01857b', color: 'white'}}>Native Hawaiian or other pacific islander</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='311'  value={enrollmentCount['311']} onChange={(e) => updateCells('311', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='312'  value={enrollmentCount['312']} onChange={(e) => updateCells('312', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='313'  value={enrollmentCount['313']} onChange={(e) => updateCells('313', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='321'  value={enrollmentCount['321']} onChange={(e) => updateCells('321', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='322'  value={enrollmentCount['322']} onChange={(e) => updateCells('322', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='323'  value={enrollmentCount['323']} onChange={(e) => updateCells('323', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='331'  value={enrollmentCount['331']} onChange={(e) => updateCells('331', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='332'  value={enrollmentCount['332']} onChange={(e) => updateCells('332', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='333'  value={enrollmentCount['333']} onChange={(e) => updateCells('333', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='341'  value={enrollmentCount['341']} /></td>
                                </tr>

                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white'}}>Black or African American</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='411'  value={enrollmentCount['411']} onChange={(e) => updateCells('411', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='412'  value={enrollmentCount['412']} onChange={(e) => updateCells('412', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='413'  value={enrollmentCount['413']} onChange={(e) => updateCells('413', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='421'  value={enrollmentCount['421']} onChange={(e) => updateCells('421', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='422'  value={enrollmentCount['422']} onChange={(e) => updateCells('422', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='423'  value={enrollmentCount['423']} onChange={(e) => updateCells('423', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='431'  value={enrollmentCount['431']} onChange={(e) => updateCells('431', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='432'  value={enrollmentCount['432']} onChange={(e) => updateCells('432', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='433'  value={enrollmentCount['433']} onChange={(e) => updateCells('433', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='441'  value={enrollmentCount['441']} /></td>
                                </tr>

                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>white</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='511'  value={enrollmentCount['511']} onChange={(e) => updateCells('511', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='512'  value={enrollmentCount['512']} onChange={(e) => updateCells('512', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='513'  value={enrollmentCount['513']} onChange={(e) => updateCells('513', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='521'  value={enrollmentCount['521']} onChange={(e) => updateCells('521', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='522'  value={enrollmentCount['522']} onChange={(e) => updateCells('522', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='523'  value={enrollmentCount['523']} onChange={(e) => updateCells('523', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='531'  value={enrollmentCount['531']} onChange={(e) => updateCells('531', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='532'  value={enrollmentCount['532']} onChange={(e) => updateCells('532', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='533'  value={enrollmentCount['533']} onChange={(e) => updateCells('533', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='541'  value={enrollmentCount['541']} /></td>
                                </tr>

                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>More than one race</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='611'  value={enrollmentCount['611']} onChange={(e) => updateCells('611', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='612'  value={enrollmentCount['612']} onChange={(e) => updateCells('612', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='613'  value={enrollmentCount['613']} onChange={(e) => updateCells('613', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='621'  value={enrollmentCount['621']} onChange={(e) => updateCells('621', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='622'  value={enrollmentCount['622']} onChange={(e) => updateCells('622', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='623'  value={enrollmentCount['623']} onChange={(e) => updateCells('623', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='631'  value={enrollmentCount['631']} onChange={(e) => updateCells('631', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='632'  value={enrollmentCount['632']} onChange={(e) => updateCells('632', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='633'  value={enrollmentCount['633']} onChange={(e) => updateCells('633', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='641'  value={enrollmentCount['641']} /></td>
                                </tr>

                                <tr>
                                    <th style={{fontSize: '1.4rem', backgroundColor: '01857b', color: 'white'}}>Unknown or not reported</th>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='711'  value={enrollmentCount['711']} onChange={(e) => updateCells('711', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='712'  value={enrollmentCount['712']} onChange={(e) => updateCells('712', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='713'  value={enrollmentCount['713']} onChange={(e) => updateCells('713', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='721'  value={enrollmentCount['721']} onChange={(e) => updateCells('721', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='722'  value={enrollmentCount['722']} onChange={(e) => updateCells('722', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='723'  value={enrollmentCount['723']} onChange={(e) => updateCells('723', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='731'  value={enrollmentCount['731']} onChange={(e) => updateCells('731', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='732'  value={enrollmentCount['732']} onChange={(e) => updateCells('732', e.target.value)} /></td>
                                    <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='733'  value={enrollmentCount['733']} onChange={(e) => updateCells('733', e.target.value)} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='741'  value={enrollmentCount['741']} /></td>
                                </tr>

                                <tr>
                                    <th style={{backgroundColor: '01857b', color: 'white'}}>Total</th>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='811'  value={enrollmentCount['811']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='812'  value={enrollmentCount['812']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='813'  value={enrollmentCount['813']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='821'  value={enrollmentCount['821']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='822'  value={enrollmentCount['822']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='823'  value={enrollmentCount['823']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='831'  value={enrollmentCount['831']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='832'  value={enrollmentCount['832']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='833'  value={enrollmentCount['833']} /></td>
                                    <td style={{padding: '0', backgroundColor: 'lightgray'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='841'  value={enrollmentCount['841']} /></td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>
                    {/*<div style={{marginTop: '10px'}}>
                        <span><label htmlFor='mostRecentDate'>B.2{' '}Most recent date enrollment counts were confirmed&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                        <span>
                            {errors.mostRecentDate ? <Reminder message={errors.mostRecentDate}><DatePicker className='form-control errorDate' selected={enrollmentCount.mostRecentDate ? new Date(enrollmentCount.mostRecentDate) : null}  placeholderText='MM/DD/YYYY's onChange={date => {dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date)); if(!date){setErrors({...errors, mostRecentDate: 'please provide a value'})}else{let shadow = {...errors}; if(shadow.mostRecentDate) delete shadow.mostRecentDate; setErrors(shadow) }}} /></Reminder> : <DatePicker className='form-control' selected={enrollmentCount.mostRecentDate ? new Date(enrollmentCount.mostRecentDate) : null}  placeholderText='MM/DD/YYYY' dateFormat='MM/dd/yyyy' onChange={date => {dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date)); if(!date){setErrors({...errors, mostRecentDate: 'please provide a value'})}else{let shadow = {...errors}; if(shadow.mostRecentDate) delete shadow.mostRecentDate; setErrors(shadow) }}} />}
                        </span>
                    </div>
*/}
                    <div className='form-group col-md-12' style={{paddingLeft: '0', marginTop: '10px'}}>
                        <div className='col-md-12' style={{paddingLeft: '0'}}>
                            <label className='col-md-5' style={{paddingLeft: '0', marginRight: '0', lineHeight: '2em'}}>B.2{' '}Most recent date enrollment counts were confirmed<span style={{color: 'red'}}>*</span></label>
                            <span className='col-md-4' style={{marginLeft: '0', paddingLeft:'0', paddingRight: '0'}}>
                                {errors.mostRecentDate && saved ? <Reminder message={errors.mostRecentDate}><span className='col-md-12' style={{padding: '0'}}><DatePicker className='form-control errorDate' placeholderText='MM/DD/YYYY' selected={enrollmentCount.mostRecentDate ? new Date(enrollmentCount.mostRecentDate) : null} onChange={date => {dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date)); if(!date){dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(false, 'please provide a value'))}else{ dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(true))
                                }}} /></span></Reminder> : <span className='col-md-12' style={{padding: '0'}}><DatePicker className='form-control' placeholderText='MM/DD/YYYY' selected={enrollmentCount.mostRecentDate ? new Date(enrollmentCount.mostRecentDate) : null} onChange={date => {dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date)); if(!date){dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(false, 'please provide a value'))}else{ dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(true))}}} /></span>}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div style={{ position: 'relative' }}>
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0'}}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('A')}  />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('C')} />
                </span>
                <span  className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                    <span className='col-xs-4' onClick={handleSave} style={{margin: '0', padding: '0'}}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)}/>
                    </span>
                    <span className='col-xs-4' onClick={handleSaveContinue}  style={{margin: '0', padding: '0'}}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)} style={{marginRight: '5px', marginBottom: '5px'}}/>
                    </span>
                    <span className='col-xs-4' onClick={() => resetCohortStatus(cohortID, 'submitted')}  style={{margin: '0', padding: '0'}}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled = {['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span> 
                </span>
            </div>  
            </div>
    </div>
}

export default EnrollmentCountsForm