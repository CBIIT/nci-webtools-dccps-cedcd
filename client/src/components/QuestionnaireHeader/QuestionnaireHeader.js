import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Link,
    Prompt,
    useHistory
} from "react-router-dom";
import classNames from 'classnames';
import { parseISO } from 'date-fns';
import './QuestionnaireHeader.css'
import allactions from '../../actions'
import Modal from '../controls/modal/modal';
import Reminder from '../Tooltip/Tooltip'

const QuestionnaireHeader = ({ ...props }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sectionStatus = useSelector(state => state.sectionReducer)
    const hasUnsavedChanges = useSelector(state => state.unsavedChangesReducer);
    const cohort = useSelector(state => state.cohort);
    const userSession = useSelector(state => state.user);
    const {
        status,
        publish_time: publishTime,
        update_time: updateTime,
    } = useSelector(state => state.cohort);
    const publishDate = status != 'new' && publishTime ? parseISO(publishTime) : null;
    const updateDate = status != 'new' && updateTime ? parseISO(updateTime) : null;
    const latestReview = (cohort.cohort_activity_log || [])
        .sort((a, b) => new Date(b.create_time).getTime() - new Date(a.create_time).getTime())
        .filter(entry => /reject/i.test(entry.activity));
    const latestReviewComment = (latestReview && latestReview[0]) 
        ? latestReview[0].notes
        : null;

    const [reviewModal, setReviewModal] = useState({
        show: false,
    });

    /*const asTitleCase = str => String(str).split(/\W+/g).map(str =>
         str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
     );
 */
    const asTitleCase = str => String(str).split(' ').map(s => s[0].toLocaleUpperCase() + s.slice(1).toLocaleLowerCase()).join(' ')

    const isReadOnly = props.isReadOnly;

    const asDateString = date => date instanceof Date
        ? date.toLocaleDateString()
        : null;

    // todo: replace with property map 
    // eg: {incomplete: 'orange', complete: 'green'}[status] || 'grey'
    const pickColor = (status) => {
        switch (status) {
            case 'incomplete':
                return 'orange'
            case 'complete':
                return 'green'
            case 'new':
            default:
                return 'grey'
        }
    }

    const goBackManageCohort = () => {
        dispatch(allactions.cohortIDAction.setCohortId(0))
        history.push(`/admin/managecohort`);
    }

    // todo: replace state with :hover css selector
    //const regularStyle={flex: '1', width: '37px', height: '37px', border: '3px solid grey', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto'}
    //const activeStyle = {flex: '1', width: '37px', height: '37px', border: '3px solid #f0f', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto'}
    const activeStyle = { fontWeight: 'bold', color: 'blue', borderBottom: '2px solid blue', paddingRight: '0' }
    const specialHeader = { fontWeight: 'bold', color: 'blue', borderBottom: '2px solid blue', paddingLeft: '0', paddingRight: '0', marginLeft: '0', marginRight: '0' }
    const [ARing, setARing] = useState('')
    const [BRing, setBRing] = useState('')
    const [CRing, setCRing] = useState('')
    const [DRing, setDRing] = useState('')
    const [ERing, setERing] = useState('')
    const [FRing, setFRing] = useState('')
    const [GRing, setGRing] = useState('')

    // todo: map over each section to render selectors
    const sections = [
        { label: 'Basic Information', value: 'A' },
        { label: 'Enrollment Counts', value: 'B' },
        { label: 'Major Content', value: 'C' },
        { label: 'Cancer Information', value: 'D' },
        { label: 'Mortality', value: 'E' },
        { label: 'Data Linkage & Harmonization', value: 'F' },
        { label: 'Specimen', value: 'G' },
    ];


    return <>
        <div className="mb-4">
            <h1 className='pg-title'>{cohort.acronym} Questionnaire</h1>

            {!isReadOnly ? null : <div>
                <a className="back" href="/admin/managecohort" target="_self" onClick={goBackManageCohort}><i className="fas fa-chevron-left"></i>&nbsp;<span>Back to Manage Cohorts</span></a>
                <br></br><br></br>
            </div>

            }
            <Prompt
                when={hasUnsavedChanges}
                message={location => `You may have unsaved changes. Please confirm that you wish to navigate away from the current page.`}
            />

            <div >
                {userSession.role === 'SystemAdmin' && <>
                    Welcome to the Cohort Questionnaire! If this cohort is under Review (Cohort Status is "In Review"), you have to review each section in order by clicking on the Next button. After all sections have been reviewed, the Approve or Reject button will then be enabled on the last section. If you are just viewing the cohort data, you can go to any section to view by clicking on the Section Selector.
                </>}

                {userSession.role === 'CohortAdmin' && <>
                    Welcome back to your Cohort Questionnaire! If this is a new cohort, please make sure all the sections are completed before it can be submitted for review. Once submitted, this questionnaire will be locked for internal review therefore can’t be updated. You will receive an email when the review is finished to let you know if it is approved or rejected. The questionnaire will be open again for additional changes if needed.  Click this link to <Link className="text-decoration-underline" to="/cohort/questionnaire">select a cohort</Link> if you want to switch to another cohort.
                </>}
            </div>
        </div>

        <div className="container-fluid mb-4">
            <div className="border row py-4">
                <div className="col-md px-4">
                    <strong>Cohort Status: </strong>
                    <span className={classNames(
                        status === 'published' && 'text-success',
                        status === 'rejected' && 'text-danger',
                    )}>
                        {asTitleCase(status) || 'N/A'}
                    </span>
                    {status === 'rejected' && <button 
                        className="btn btn-link text-decoration-underline"
                        onClick={_ => setReviewModal({show: true})}>
                        Review Comments
                    </button>}
                    <Modal
                        show={reviewModal.show}
                        title={<span>Reviewing Comments</span>}
                        body={<span>{latestReviewComment || 'N/A'}</span>}
                        footer={<div>
                            <button 
                                className="btn btn-primary" 
                                onClick={_ => setReviewModal({show: false})}>
                                Close
                            </button>
                        </div>} />
                </div>
                <div className="col-md px-4">
                    <strong>Last Updated Date: </strong>
                    {asDateString(updateDate) || 'N/A'}
                </div>
                <div className="col-md px-4">
                    <strong>Last Published Date: </strong>
                    {asDateString(publishDate) || 'N/A'}
                </div>
            </div>
        </div>

        
        
        <div className="d-md-none">
           <Reminder message={asTitleCase(sectionStatus['A'])}>
            <div id='sectionA' onClick={() => ['in review'].includes(status) ? '' : props.handler('A')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['A']), margin: 'auto' }}>
                            <span style={props.activeSection === 'A' ? activeStyle : {}}>Basic Information</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setARing('blue')} onMouseMove={() => setARing('blue')} onMouseOut={() => setARing('')}>
                        <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: ARing ? `3px solid ${ARing}` : '3px solid ' + pickColor(sectionStatus['A']) }}>
                            <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['A']), margin: 'auto' }}>
                                <span style={props.activeSection === 'A' ? activeStyle : {}}>Basic Information</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            </Reminder>
            <div id='sectionB' onClick={() => ['in review'].includes(status) ? '' : props.handler('B')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['B']), margin: 'auto' }}>
                            <span style={props.activeSection === 'B' ? activeStyle : {}}>Enrollment Counts</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setBRing('blue')} onMouseMove={() => setBRing('blue')} onMouseOut={() => setBRing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: BRing ? `3px solid ${BRing}` : '3px solid ' + pickColor(sectionStatus['B']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['B']), margin: 'auto' }}>
                                <span style={props.activeSection === 'B' ? activeStyle : {}}>Enrollment Counts</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div id='sectionC' onClick={() => ['in review'].includes(status) ? '' : props.handler('C')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['C']), margin: 'auto' }}>
                            <span style={props.activeSection === 'C' ? activeStyle : {}}>Major Content</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setCRing('blue')} onMouseMove={() => setCRing('blue')} onMouseOut={() => setCRing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: CRing ? `3px solid ${CRing}` : '3px solid ' + pickColor(sectionStatus['C']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['C']), margin: 'auto' }}>
                                <span style={props.activeSection === 'C' ? activeStyle : {}}>Major Content</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div id='sectionD' onClick={() => ['in review'].includes(status) ? '' : props.handler('D')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['D']), margin: 'auto' }}>
                            <span style={props.activeSection === 'D' ? activeStyle : {}}>Cancer Information</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setDRing('blue')} onMouseMove={() => setDRing('blue')} onMouseOut={() => setDRing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: DRing ? `3px solid ${DRing}` : '3px solid ' + pickColor(sectionStatus['D']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['D']), margin: 'auto' }}>
                                <span style={props.activeSection === 'D' ? activeStyle : {}}>Cancer Information</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div id='sectionE' onClick={() => ['in review'].includes(status) ? '' : props.handler('E')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['E']), margin: 'auto' }}>
                            <span style={props.activeSection === 'E' ? activeStyle : {}}>Mortality</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setERing('blue')} onMouseMove={() => setERing('blue')} onMouseOut={() => setERing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: ERing ? `3px solid ${ERing}` : '3px solid ' + pickColor(sectionStatus['E']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['E']), margin: 'auto' }}>
                                <span style={props.activeSection === 'E' ? activeStyle : {}}>Mortality</span>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div id='sectionF' onClick={() => ['submitted', 'in review'].includes(status) ? '' : props.handler('F')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['F']), margin: 'auto' }}>
                            <span style={props.activeSection === 'F' ? activeStyle : {}}>Data Linkage & Harmonization</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setFRing('blue')} onMouseMove={() => setFRing('blue')} onMouseOut={() => setFRing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: FRing ? `3px solid ${FRing}` : '3px solid ' + pickColor(sectionStatus['F']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['F']), margin: 'auto' }}>
                                <span style={props.activeSection === 'F' ? activeStyle : {}}>Data Linkage & Harmonization</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div id='sectionF' onClick={() => ['submitted', 'in review'].includes(status) ? '' : props.handler('G')} style={{ marginBottom: '5px' }}>
                {['in review'].includes(status) ? <div>
                    <div style={{ color: 'white', height: '38px', borderRadius: '25px', display: 'flex', justifyContent: 'center', margin: 'auto', border: '3px solid green' }}>
                        <div style={{ width: '99%', paddingTop: '3px', height: '25px', borderRadius: '25px', paddingLeft: '15px', backgroundColor: pickColor(sectionStatus['G']), margin: 'auto' }}>
                            <span style={props.activeSection === 'G' ? activeStyle : {}}>Specimen</span>
                        </div>
                    </div>
                </div>
                    :
                    <div onMouseEnter={() => setGRing('blue')} onMouseMove={() => setGRing('blue')} onMouseOut={() => setGRing('')}>
                        <div style={{ color: 'white', height: '38px', display: 'flex', justifyContent: 'center', borderRadius: '25px', margin: 'auto', border: GRing ? `3px solid ${GRing}` : '3px solid ' + pickColor(sectionStatus['G']) }}>
                            <div style={{ width: '99%', height: '25px', borderRadius: '25px', paddingLeft: '15px', paddingTop: '3px', backgroundColor: pickColor(sectionStatus['G']), margin: 'auto' }}>
                                <span style={props.activeSection === 'G' ? activeStyle : {}}>Specimen</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

        <div className="d-none d-md-block">
            <div style={{ display: 'flex' }}>
                <Reminder message={asTitleCase(sectionStatus['A'])}>
                    <div id='sectionA' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('A')}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '1' }}></div>
                            {['in review'].includes(status) ? <div>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                                </div>
                            </div>
                                :
                                <div onMouseEnter={() => setARing('blue')} onMouseMove={() => setARing('blue')} onMouseOut={() => setARing('')}>
                                    <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: ARing ? `2px solid ${ARing}` : '2px solid ' + pickColor(sectionStatus['A']) }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['A']), margin: 'auto' }}></div>
                                    </div>
                                </div>
                            }
                            <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        </div>
                        <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'A' ? activeStyle : {}}>Basic Information</span></div>
                    </div>
                </Reminder> 
                <Reminder message={asTitleCase(sectionStatus['B'])}>
                    <div id='sectionB' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('B')}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                            {['in review'].includes(status) ? <div>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                                </div>
                            </div>
                                :
                                <div onMouseEnter={() => setBRing('blue')} onMouseMove={() => setBRing('blue')} onMouseOut={() => setBRing('')}>
                                    <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: BRing ? `2px solid ${BRing}` : '2px solid ' + pickColor(sectionStatus['B']) }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['B']), margin: 'auto' }}></div>
                                    </div>
                                </div>
                            }
                            <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        </div>
                        <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'B' ? activeStyle : {}}>Enrollment Counts</span></div>
                    </div>
                </Reminder>
                <Reminder message={asTitleCase(sectionStatus['C'])}>
                <div id='sectionC' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('C')}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        {['in review'].includes(status) ? <div>
                            <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                            </div>
                        </div>
                            :
                            <div onMouseEnter={() => setCRing('blue')} onMouseMove={() => setCRing('blue')} onMouseOut={() => setCRing('')}>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: CRing ? `2px solid ${CRing}` : '2px solid ' + pickColor(sectionStatus['C']) }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['C']), margin: 'auto' }}></div>
                                </div>
                            </div>
                        }
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                    </div>
                    <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'C' ? activeStyle : {}}>Major Content</span></div>
                </div>
                </Reminder>
                <Reminder message={asTitleCase(sectionStatus['D'])}>
                <div id='sectionD' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('D')}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        {['in review'].includes(status) ? <div>
                            <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                            </div>
                        </div>
                            :
                            <div onMouseEnter={() => setDRing('blue')} onMouseMove={() => setDRing('blue')} onMouseOut={() => setDRing('')}>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: DRing ? `2px solid ${DRing}` : '2px solid ' + pickColor(sectionStatus['D']) }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['D']), margin: 'auto' }}></div>
                                </div>
                            </div>
                        }
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                    </div>
                    <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'D' ? activeStyle : {}}>Cancer Information</span></div>
                </div>
                </Reminder>
                <Reminder message={asTitleCase(sectionStatus['E'])}>
                <div id='sectionE' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('E')}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        {['in review'].includes(status) ? <div>
                            <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                            </div>
                        </div>
                            :
                            <div onMouseEnter={() => setERing('blue')} onMouseMove={() => setERing('blue')} onMouseOut={() => setERing('')}>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: ERing ? `2px solid ${ERing}` : '2px solid ' + pickColor(sectionStatus['E']) }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['E']), margin: 'auto' }}></div>
                                </div>
                            </div>
                        }
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                    </div>
                    <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'E' ? activeStyle : {}}>Mortality</span></div>
                </div>
                </Reminder>
                 <Reminder message={asTitleCase(sectionStatus['F'])}>
                <div id='sectionF' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('F')}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        {['in review'].includes(status) ? <div>
                            <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                            </div>
                        </div>
                            :
                            <div onMouseEnter={() => setFRing('blue')} onMouseMove={() => setFRing('blue')} onMouseOut={() => setFRing('')}>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: FRing ? `2px solid ${FRing}` : '2px solid ' + pickColor(sectionStatus['F']) }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['F']), margin: 'auto' }}></div>
                                </div>
                            </div>
                        }
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                    </div>
                    <div style={{ marginTop: '5px', paddingLeft: '0', paddingRight: '0', width: '214px' }}><span style={props.activeSection === 'F' ? specialHeader : {}}>Data Linkage & Harmonization</span></div>
                </div>
                </Reminder>
                <Reminder message={asTitleCase(sectionStatus['G'])}>
                <div id='sectionG' style={{ flex: '1', textAlign: 'center' }} onClick={() => ['in review'].includes(status) ? '' : props.handler('G')}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1', height: '2px', border: '2px solid #9f3', margin: 'auto 0' }}></div>
                        {['in review'].includes(status) ? <div>
                            <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: '2px solid green' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green', margin: 'auto' }}></div>
                            </div>
                        </div>
                            :
                            <div onMouseEnter={() => setGRing('blue')} onMouseMove={() => setGRing('blue')} onMouseOut={() => setGRing('')}>
                                <div style={{ flex: '1', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', margin: 'auto', border: GRing ? `2px solid ${GRing}` : '2px solid ' + pickColor(sectionStatus['G']) }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: pickColor(sectionStatus['G']), margin: 'auto' }}></div>
                                </div>
                            </div>
                        }
                        <div style={{ flex: '1' }}></div>
                    </div>
                    <div style={{ marginTop: '5px' }}><span style={props.activeSection === 'G' ? activeStyle : {}}>Specimens</span></div>
                </div>
                </Reminder>
            </div>
        </div>
    </>
}

export default QuestionnaireHeader