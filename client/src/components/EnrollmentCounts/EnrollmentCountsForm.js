import React, { useState, useEffect } from 'react';
import Reminder from '../Tooltip/Tooltip';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import allactions from '../../actions';
//import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar';
import CenterModal from '../controls/modal/modal';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter'
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, format } from 'date-fns';
import './EnrollmentCounts.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const EnrollmentCountsForm = ({...props}) => {
    const enrollmentCount = useSelector(state => state.enrollmentCountsReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.enrollmentCountErrorReducer)
    const cohortID = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly
    //const [displayStyle, setDisplay] = useState('0')
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const [activePanel, setActivePanel] = useState('panelA');
    const history = useHistory();
    //const cohortId = +window.location.pathname.split('/').pop();
    //const [errors, setErrors] = useState({mostRecentDate: 'please provide a value'})
    function updateCells(cellid, amount){
        dispatch(setHasUnsavedChanges(true));
        //amount = String(Math.max(+amount, 0));
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
       // dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(cellid, currentAmountString))
       dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(cellid, amount))
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

    const sendEmail = (template, topic) => {

        fetch('/api/questionnaire/select_admin_info', {
            method: "POST",
            body: JSON.stringify({ id: cohortID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {

                    result.data.map((admin) => {
                        let reqBody = {
                            templateData: {
                                user: admin.first_name + ' ' + admin.last_name,
                                cohortName: admin.name,
                                cohortAcronym: admin.acronym,
                                website: window.location.origin,
                                publishDate: new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'
                            },
                            email: admin.email,
                            template: template,
                            topic: topic + admin.acronym
                        }

                        fetch('/api/cohort/sendUserEmail', {
                            method: "POST",
                            body: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => res.json())
                            .then(result => {
                                if (result && result.status === 200) {
                                    //let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                                    //clearTimeout(timedMessage)
                                }
                                else {
                                    //let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                                    //clearTimeout(timedMessage)
                                }
                            })
                    })
                }
            })
    }

    const resetCohortStatus = (cohortID, nextStatus) => {
        if(['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)){
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
              .then(result => {
                  if (result && result.status === 200){
                    dispatch(({type: 'SET_COHORT_STATUS', value: nextStatus}))

                    if(nextStatus === 'submitted')
                        sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ')
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
                    dispatch(setHasUnsavedChanges(false));
                    if(Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'complete'))
                    else{
                        dispatch(allactions.sectionActions.setSectionStatus('B', 'incomplete'))
                    }
                    if(result.data){
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortID){
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            history.push(window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id));
                            // window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                        }
                        if (result.data.status && result.data.status != cohortStatus){
                            dispatch(({type: 'SET_COHORT_STATUS', value: result.data.status})) 
                            dispatch(fetchCohort(result.data.duplicated_cohort_id)) /* if result.data.status present, duplicated_cohort_id is too */
                        }                   
                    }
                    console.log(proceed)
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
        enrollmentCount.sectionBStatus='incomplete'
        
        dispatch(allactions.enrollmentCountActions.setSectionBStatus('incomplete'));
        saveEnrollment(cohortID);setModalShow(false)
    }

    const confirmSaveContinue = () => {
        enrollmentCount.sectionBStatus='incomplete'
        dispatch(allactions.enrollmentCountActions.setSectionBStatus('incomplete'))
        saveEnrollment(cohortID, true);setModalShow(false)
    }

    const validateDateString = (value) => {
        if(!value)
            return 'Required Field'
        else{
            let year = value.split()[3]
            if(!/\d\d\d\d/.test(year))
                return 'Invalid date value'
        }
    }

    return (
        <Container fluid>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg}/>}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}

            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
            <Col md="12">
                <Form>
                    <CollapsiblePanelContainer>

                        {/* Enrollmemt Counts */}
                        <CollapsiblePanel
                            panelName='panelA'
                            activePanel={activePanel}
                            panelTitle='Enrollment Counts'
                            onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>

                            {/* B.1 Racial Categories */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="12">
                                    B.1 Racial Categories
                                </Form.Label>
                                <Col sm="12">
                                    <p>
                                        Record actual, not planned, recruitment counts.
                                    </p>
                                </Col>
                                <Col sm="12">
                                    <div className="table-responsive">
                                        <Table bordered condensed className="table-valign-middle">
                                            <thead>
                                                <tr>
                                                    <th rowSpan='3' style={{fontSize: '1.5rem', paddingRight: '0', width: '15%'}}>Racial Categories</th>
                                                    <th colSpan='9' style={{textAlign: 'center'}}>Ethnic Categories</th>
                                                    <th rowSpan='3' style={{width: '10%', textAlign: 'center'}}>Total</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan='3' style={{textAlign: 'center'}}>Not Hispanic or Latino</th>
                                                    <th colSpan='3' style={{textAlign: 'center'}}>Hispanic or Latino</th>
                                                    <th colSpan='3' style={{textAlign: 'center'}}>Unknown/Not Reported Ethnicity</th>
                                                </tr>
                                                <tr>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Male</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Unknown/Not Reported</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Male</th>
                                                    <th  style={{fontSize: '1.4rem', textAlign: 'center'}}>Unknown/Not Reported</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Male</th>
                                                    <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Unknown/Not Reported</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="bg-light-grey">American Indian / Alaska Native</td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='111'  value={enrollmentCount['111'] || 0} onChange={(e) => updateCells('111', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='112'  value={enrollmentCount['112'] || 0} onChange={(e) => updateCells('112', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='113'  value={enrollmentCount['113'] || 0} onChange={(e) => updateCells('113', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='121'  value={enrollmentCount['121'] || 0} onChange={(e) => updateCells('121', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='122'  value={enrollmentCount['122'] || 0} onChange={(e) => updateCells('122', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='123'  value={enrollmentCount['123'] || 0} onChange={(e) => updateCells('123', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='131'  value={enrollmentCount['131'] || 0} onChange={(e) => updateCells('131', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='132'  value={enrollmentCount['132'] || 0} onChange={(e) => updateCells('132', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type="number" type='number' className='input-number' name='133'  value={enrollmentCount['133'] || 0} onChange={(e) => updateCells('133', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control  readOnly type='number' className='input-number' name='141'  value={enrollmentCount['141'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">Asian</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='211'  value={enrollmentCount['211'] || 0} onChange={(e) => updateCells('211', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='212'  value={enrollmentCount['212'] || 0} onChange={(e) => updateCells('212', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='213'  value={enrollmentCount['213'] || 0} onChange={(e) => updateCells('213', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='221'  value={enrollmentCount['221'] || 0} onChange={(e) => updateCells('221', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='222'  value={enrollmentCount['222'] || 0} onChange={(e) => updateCells('222', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='223'  value={enrollmentCount['223'] || 0} onChange={(e) => updateCells('223', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='231'  value={enrollmentCount['231'] || 0} onChange={(e) => updateCells('231', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='232'  value={enrollmentCount['232'] || 0} onChange={(e) => updateCells('232', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='233'  value={enrollmentCount['233'] || 0} onChange={(e) => updateCells('233', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='241'  value={enrollmentCount['241'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td  className="bg-light-grey">Native Hawaiian or other Pacific Islander</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='311'  value={enrollmentCount['311'] || 0} onChange={(e) => updateCells('311', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='312'  value={enrollmentCount['312'] || 0} onChange={(e) => updateCells('312', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='313'  value={enrollmentCount['313'] || 0} onChange={(e) => updateCells('313', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='321'  value={enrollmentCount['321'] || 0} onChange={(e) => updateCells('321', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='322'  value={enrollmentCount['322'] || 0} onChange={(e) => updateCells('322', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='323'  value={enrollmentCount['323'] || 0} onChange={(e) => updateCells('323', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='331'  value={enrollmentCount['331'] || 0} onChange={(e) => updateCells('331', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='332'  value={enrollmentCount['332'] || 0} onChange={(e) => updateCells('332', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='333'  value={enrollmentCount['333'] || 0} onChange={(e) => updateCells('333', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='341'  value={enrollmentCount['341'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">Black or African American</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='411'  value={enrollmentCount['411'] || 0} onChange={(e) => updateCells('411', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='412'  value={enrollmentCount['412'] || 0} onChange={(e) => updateCells('412', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='413'  value={enrollmentCount['413'] || 0} onChange={(e) => updateCells('413', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='421'  value={enrollmentCount['421'] || 0} onChange={(e) => updateCells('421', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='422'  value={enrollmentCount['422'] || 0} onChange={(e) => updateCells('422', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='423'  value={enrollmentCount['423'] || 0} onChange={(e) => updateCells('423', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='431'  value={enrollmentCount['431'] || 0} onChange={(e) => updateCells('431', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='432'  value={enrollmentCount['432'] || 0} onChange={(e) => updateCells('432', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='433'  value={enrollmentCount['433'] || 0} onChange={(e) => updateCells('433', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='441'  value={enrollmentCount['441'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">White</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='511'  value={enrollmentCount['511'] || 0} onChange={(e) => updateCells('511', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='512'  value={enrollmentCount['512'] || 0} onChange={(e) => updateCells('512', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='513'  value={enrollmentCount['513'] || 0} onChange={(e) => updateCells('513', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='521'  value={enrollmentCount['521'] || 0} onChange={(e) => updateCells('521', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='522'  value={enrollmentCount['522'] || 0} onChange={(e) => updateCells('522', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='523'  value={enrollmentCount['523'] || 0} onChange={(e) => updateCells('523', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='531'  value={enrollmentCount['531'] || 0} onChange={(e) => updateCells('531', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='532'  value={enrollmentCount['532'] || 0} onChange={(e) => updateCells('532', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='533'  value={enrollmentCount['533'] || 0} onChange={(e) => updateCells('533', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='541'  value={enrollmentCount['541'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">More than one race</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='611'  value={enrollmentCount['611'] || 0} onChange={(e) => updateCells('611', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='612'  value={enrollmentCount['612'] || 0} onChange={(e) => updateCells('612', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='613'  value={enrollmentCount['613'] || 0} onChange={(e) => updateCells('613', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='621'  value={enrollmentCount['621'] || 0} onChange={(e) => updateCells('621', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='622'  value={enrollmentCount['622'] || 0} onChange={(e) => updateCells('622', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='623'  value={enrollmentCount['623'] || 0} onChange={(e) => updateCells('623', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='631'  value={enrollmentCount['631'] || 0} onChange={(e) => updateCells('631', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='632'  value={enrollmentCount['632'] || 0} onChange={(e) => updateCells('632', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='633'  value={enrollmentCount['633'] || 0} onChange={(e) => updateCells('633', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='641'  value={enrollmentCount['641'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">Unknown / Not Reported</td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='711'  value={enrollmentCount['711'] || 0} onChange={(e) => updateCells('711', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='712'  value={enrollmentCount['712'] || 0} onChange={(e) => updateCells('712', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='713'  value={enrollmentCount['713'] || 0} onChange={(e) => updateCells('713', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='721'  value={enrollmentCount['721'] || 0} onChange={(e) => updateCells('721', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='722'  value={enrollmentCount['722'] || 0} onChange={(e) => updateCells('722', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='723'  value={enrollmentCount['723'] || 0} onChange={(e) => updateCells('723', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='731'  value={enrollmentCount['731'] || 0} onChange={(e) => updateCells('731', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='732'  value={enrollmentCount['732'] || 0} onChange={(e) => updateCells('732', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0"><Form.Control type='number' className='input-number' name='733'  value={enrollmentCount['733'] || 0} onChange={(e) => updateCells('733', e.target.value)} readOnly={isReadOnly}/></td>
                                                    <td className="p-0 bg-light-grey"><Form.Control readOnly type='number' className='input-number' name='741'  value={enrollmentCount['741'] || 0} /></td>
                                                </tr>

                                                <tr>
                                                    <td className="bg-light-grey">Total</td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='811'  value={enrollmentCount['811'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='812'  value={enrollmentCount['812'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='813'  value={enrollmentCount['813'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='821'  value={enrollmentCount['821'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='822'  value={enrollmentCount['822'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='823'  value={enrollmentCount['823'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='831'  value={enrollmentCount['831'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='832'  value={enrollmentCount['832'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='833'  value={enrollmentCount['833'] || 0} /></td>
                                                    <td className="bg-light-grey p-0"><Form.Control readOnly type='number' className='input-number' name='841'  value={enrollmentCount['841'] || 0} /></td>
                                                </tr>                            
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Form.Group>

                            {/* B.2 Most Recent Date Enrollment */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="5">
                                    B.2 Most recent date enrollment counts were confirmed<span style={{color: 'red'}}>*</span>
                                </Form.Label>
                                <Col sm="3">
                                    {errors.mostRecentDate && saved ? 
                                        <Reminder message={errors.mostRecentDate}>
                                            <DatePicker className='form-control errorDate' 
                                                popperProps={{
                                                    positionFixed: true // fix overflow hidden
                                                }}
                                                placeholderText='MM/DD/YYYY' 
                                                selected={enrollmentCount.mostRecentDate ? 
                                                    new Date(enrollmentCount.mostRecentDate) : 
                                                    null
                                                }

                                                onChange={date => {
                                                    dispatch(setHasUnsavedChanges(true));
                                                    //dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date));
                                                    
                                                    if (!date) { 
                                                            dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(false, 'Required Field'))
                                                        } else { 
                                                            console.log(date.getFullYear().toString())
                                                            if(!/^\d\d\d\d$/.test(date.getFullYear().toString())){  
                                                                //dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(false, 'Invalid date'))
                                                            }
                                                            else{
                                                                dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(true))
                                                                dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date));
                                                            }
                                                        }
                                                    }}  
                                                />
                                        </Reminder> : 
                                        <DatePicker className='form-control' 
                                            popperProps={{
                                                positionFixed: true // fix overflow hidden
                                            }}
                                            placeholderText='MM/DD/YYYY' 
                                            //maxDate={new Date()}
                                            selected={enrollmentCount.mostRecentDate ? 
                                                new Date(enrollmentCount.mostRecentDate) : 
                                                null
                                            } 
            
                                           onChange={date => {
                                                dispatch(setHasUnsavedChanges(true));
                                                //dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date));
                                                
                                                if (!date) { 
                                                        dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(false, 'Required Field'))
                                                    } else { 
                                                        if(/^\d\d\d\d$/.test(date.getFullYear().toString())){  
                                                            dispatch(allactions.enrollmentCountErrorActions.mostRecentDate(true))
                                                            dispatch(allactions.enrollmentCountActions.updateMostRecentDate(date));
                                                        }
                                                    }
                                                }}                                              
                                            disabled={isReadOnly}/>
                                    }
                                </Col>
                            </Form.Group>

                        </CollapsiblePanel>
                    </CollapsiblePanelContainer>
                </Form>

                <QuestionnaireFooter
                    isAdmin={isReadOnly}
                    handlePrevious={_ => props.sectionPicker('A')}
                    handleNext={_ => props.sectionPicker('C')}
                    handleSave={handleSave}
                    handleSaveContinue={handleSaveContinue}
                    handleSubmitForReview={_ => resetCohortStatus(cohortID, 'submitted')}
                    handleApprove={false}
                    handleReject={false} />
                    
            </Col>
        </Container>
    )
}

export default EnrollmentCountsForm