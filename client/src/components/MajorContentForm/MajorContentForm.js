import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import allactions from '../../actions';
import Messenger from '../Snackbar/Snackbar';
import CenterModal from '../controls/modal/modal';
import ReviewModal from '../controls/modal/modal';
import Reminder from '../Tooltip/Tooltip';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const MajorContentForm = ({ ...props }) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.majorContentErrorReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const cohortId = useSelector(state => state.cohortIDReducer)
    const userSession = useSelector(state => state.user);
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly || false
    const [activePanel, setActivePanel] = useState('panelA')
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [message, setMessage] = useState({ show: false, type: null, content: null })
    const updateMessage = state => setMessage({ ...message, ...state });
    const [modalShow, setModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const history = useHistory();

    //const cohortId = +window.location.pathname.split('/').pop();

    const subtitles = [
        'hasLoded', 'C.1 Socio-economic Status', '', 'C.2 Education Level', '', 'C.3 Marital Status', '', 'C.4 Language/Country of Origin', '',
        'C.5 Employment Status', '', 'C.6 Health Insurance Status', '', 'C.7 Anthropometry (e.g., weight, height, waist circumference)',
        '', 'C.8 Dietary Intake', '', 'C.9 Dietary Supplement Use', '', 'C.10 Complementary and Alternative Medicine', '', 'C.11 Prescription Medication Use (not related to cancer treatment)', '', 'C.12 Non-prescription Medication Use (not related to cancer treatment)', '', 'C.13 Alcohol Consumption', '', 'C.14 Cigarette Smoking', '',
        // remove to keep it sync with the object, 'C.15 Use of Tobacco Products Other than Cigarettes', '',
        'Cigars', 'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other', '', 'Cigars', 'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other', '',
        'C.16 Physical Activity', '', 'C.17 Sleep Habits', '', 'C.18 Reproductive History', '', 'C.19 Self_Reported Health', '', 'C.20 Quality of Life', '', 'C.21 Social Support', '', 'C.22 Cognitive Function', '', 'C.23 Depression', '', 'C.24 Other Psychosocial Variables', '', 'C.25 Fatigue', '', 'C.26 Family History of Cancer', '', 'C.27 Family History of Cancer with Pedigrees', '', 'C.28 Physical function meassures (e.g. grip strength, gait speed, etc.)', '', 'C.29 Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)', '', 'C.30 Residential history Information (zip code, GIS) over time?', '',
        //removed to snyc with majorContent index 'C.31 Other Medical Conditions', '',
        'a. Diabetes', '', 'b. Stroke', '', 'c. COPD and/or Emphysema', '', 'd. Cardiovascular Disease', '', 'e. Osteoporosis', '', 'f. Mental Health', '',
        'g. Cognitive Decline', ''
    ]

    const loadErrorPart = (keylist, content, start=0) => keylist.map((key, idx) => {
        if(start != 14){
            dispatch(allactions.majorContentErrorActions[key+'BaseLine']([0,1].includes(content[start+idx].baseline)))
            dispatch(allactions.majorContentErrorActions[key+'FollowUp']([0,1].includes(content[start+idx].followup)))
        }else{
            dispatch(allactions.majorContentErrorActions[key+'BaseLine'](content[start+idx].baseline === 1))
            dispatch(allactions.majorContentErrorActions[key+'FollowUp'](content[start+idx].followup === 1))
        }
    }) 
    useEffect(() => {
        //let id = 118
        //window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', `/cohort/questionnaire/${id}`)
        //if (!majorContent.hasLoaded) {
            fetch(`/api/questionnaire/major_content/${cohortId}`, {
                method: 'POST'
            }).then(res => res.json())
                .then(result => {

                    let content = result.data.counts
                    let cancerInfo = result.data.cancerInfo

                    batch(() => {
                        dispatch(allactions.majorContentActions.seStatusBaseLine(content[0].baseline))
                        dispatch(allactions.majorContentActions.seStatusFollowUp(content[0].followup))
                        dispatch(allactions.majorContentActions.educationBaseLine(content[1].baseline))
                        dispatch(allactions.majorContentActions.educationFollowUp(content[1].followup))
                        dispatch(allactions.majorContentActions.maritalStatusBaseLine(content[2].baseline))
                        dispatch(allactions.majorContentActions.maritalStatusFollowUp(content[2].followup))
                        dispatch(allactions.majorContentActions.originBaseLine(content[3].baseline))
                        dispatch(allactions.majorContentActions.originFollowUp(content[3].followup))
                        dispatch(allactions.majorContentActions.empStatusBaseLine(content[4].baseline))
                        dispatch(allactions.majorContentActions.empStatusFollowUp(content[4].followup))
                        dispatch(allactions.majorContentActions.insuranceStatusBaseLine(content[5].baseline))
                        dispatch(allactions.majorContentActions.insuranceStatusFollowUp(content[5].followup))
                        dispatch(allactions.majorContentActions.anthropometryBaseLine(content[6].baseline))
                        dispatch(allactions.majorContentActions.anthropometryFollowUp(content[6].followup))
                        dispatch(allactions.majorContentActions.dietaryBaseLine(content[7].baseline))
                        dispatch(allactions.majorContentActions.dietaryFollowUp(content[7].followup))
                        dispatch(allactions.majorContentActions.supplementBaseLine(content[8].baseline))
                        dispatch(allactions.majorContentActions.supplementFollowUp(content[8].followup))
                        dispatch(allactions.majorContentActions.medicineBaseLine(content[9].baseline))
                        dispatch(allactions.majorContentActions.medicineFollowUp(content[9].followup))
                        dispatch(allactions.majorContentActions.prescriptionBaseLine(content[10].baseline))
                        dispatch(allactions.majorContentActions.prescriptionFollowUp(content[10].followup))
                        dispatch(allactions.majorContentActions.nonprescriptionBaseLine(content[11].baseline))
                        dispatch(allactions.majorContentActions.nonprescriptionFollowUp(content[11].followup))
                        dispatch(allactions.majorContentActions.alcoholBaseLine(content[12].baseline))
                        dispatch(allactions.majorContentActions.alcoholFollowUp(content[12].followup))
                        dispatch(allactions.majorContentActions.cigaretteBaseLine(content[13].baseline))
                        dispatch(allactions.majorContentActions.cigaretteFollowUp(content[13].followup))
                        dispatch(allactions.majorContentActions.cigarBaseLine(content[14].baseline))
                        dispatch(allactions.majorContentActions.cigarFollowUp(content[14].followup))
                        dispatch(allactions.majorContentActions.pipeBaseLine(content[15].baseline))
                        dispatch(allactions.majorContentActions.pipeFollowUp(content[15].followup))
                        dispatch(allactions.majorContentActions.tobaccoBaseLine(content[16].baseline))
                        dispatch(allactions.majorContentActions.tobaccoFollowUp(content[16].followup))
                        dispatch(allactions.majorContentActions.ecigarBaseLine(content[17].baseline))
                        dispatch(allactions.majorContentActions.ecigarFollowUp(content[17].followup))
                        dispatch(allactions.majorContentActions.noncigarOtherBaseLine(content[18].baseline))
                        dispatch(allactions.majorContentActions.noncigarOtherFollowUp(content[18].followup))
                        dispatch(allactions.majorContentActions.noncigarBaseLineSpecify(content[18].other_specify_baseline || ''))
                        dispatch(allactions.majorContentActions.noncigarFollowUpSpecify(content[18].other_specify_followup || ''))
                        dispatch(allactions.majorContentActions.physicalBaseLine(content[19].baseline))
                        dispatch(allactions.majorContentActions.physicalFollowUp(content[19].followup))

                        dispatch(allactions.majorContentActions.sleepBaseLine(content[20].baseline))
                        dispatch(allactions.majorContentActions.sleepFollowUp(content[20].followup))
                        dispatch(allactions.majorContentActions.reproduceBaseLine(content[21].baseline))
                        dispatch(allactions.majorContentActions.reproduceFollowUp(content[21].followup))
                        dispatch(allactions.majorContentActions.reportedHealthBaseLine(content[22].baseline))
                        dispatch(allactions.majorContentActions.reportedHealthFollowUp(content[22].followup))
                        dispatch(allactions.majorContentActions.lifeBaseLine(content[23].baseline))
                        dispatch(allactions.majorContentActions.lifeFollowUp(content[23].followup))
                        dispatch(allactions.majorContentActions.socialSupportBaseLine(content[24].baseline))
                        dispatch(allactions.majorContentActions.socialSupportFollowUp(content[24].followup))
                        dispatch(allactions.majorContentActions.cognitionBaseLine(content[25].baseline))
                        dispatch(allactions.majorContentActions.cognitionFollowUp(content[25].followup))
                        dispatch(allactions.majorContentActions.depressionBaseLine(content[26].baseline))
                        dispatch(allactions.majorContentActions.depressionFollowUp(content[26].followup))
                        dispatch(allactions.majorContentActions.psychosocialBaseLine(content[27].baseline))
                        dispatch(allactions.majorContentActions.psychosocialFollowUp(content[27].followup))
                        dispatch(allactions.majorContentActions.fatigueBaseLine(content[28].baseline))
                        dispatch(allactions.majorContentActions.fatigueFollowUp(content[28].followup))
                        dispatch(allactions.majorContentActions.cancerHistoryBaseLine(content[29].baseline))
                        dispatch(allactions.majorContentActions.cancerHistoryFollowUp(content[29].followup))
                        dispatch(allactions.majorContentActions.cancerPedigreeBaseLine(content[30].baseline))
                        dispatch(allactions.majorContentActions.cancerPedigreeFollowUp(content[30].followup))

                        dispatch(allactions.majorContentActions.exposureBaseLine(content[31].baseline))
                        dispatch(allactions.majorContentActions.exposureFollowUp(content[31].followup))
                        dispatch(allactions.majorContentActions.residenceBaseLine(content[32].baseline))
                        dispatch(allactions.majorContentActions.residenceFollowUp(content[32].followup))
                        dispatch(allactions.majorContentActions.diabetesBaseLine(content[33].baseline))
                        dispatch(allactions.majorContentActions.diabetesFollowUp(content[33].followup))
                        dispatch(allactions.majorContentActions.strokeBaseLine(content[34].baseline))
                        dispatch(allactions.majorContentActions.strokeFollowUp(content[34].followup))
                        dispatch(allactions.majorContentActions.copdBaseLine(content[35].baseline))
                        dispatch(allactions.majorContentActions.copdFollowUp(content[35].followup))
                        dispatch(allactions.majorContentActions.cardiovascularBaseLine(content[36].baseline))
                        dispatch(allactions.majorContentActions.cardiovascularFollowUp(content[36].followup))
                        dispatch(allactions.majorContentActions.osteoporosisBaseLine(content[37].baseline))
                        dispatch(allactions.majorContentActions.osteoporosisFollowUp(content[37].followup))
                        dispatch(allactions.majorContentActions.mentalBaseLine(content[38].baseline))
                        dispatch(allactions.majorContentActions.mentalFollowUp(content[38].followup))
                        dispatch(allactions.majorContentActions.cognitiveDeclineBaseLine(content[39].baseline))
                        dispatch(allactions.majorContentActions.cognitiveDeclineFollowUp(content[39].followup))
                        if (content[40]) {
                            dispatch(allactions.majorContentActions.physicalMeasureBaseLine(content[40].baseline))
                            dispatch(allactions.majorContentActions.physicalMeasureFollowUp(content[40].followup))
                        }
                        dispatch(allactions.majorContentActions.cancerToxicity(cancerInfo.cancerToxicity))
                        dispatch(allactions.majorContentActions.cancerLateEffects(cancerInfo.cancerLateEffects))
                        dispatch(allactions.majorContentActions.cancerSymptom(cancerInfo.cancerSymptom))
                        dispatch(allactions.majorContentActions.cancerOther(cancerInfo.cancerOther))
                        dispatch(allactions.majorContentActions.cancerOtherSpecify(cancerInfo.cancerOtherSpecify || ''))
                        loadErrorPart(['seStatus', 'education', 'maritalStatus', 'origin', 'empStatus', 'insuranceStatus', 'anthropometry', 'dietary', 'supplement', 'medicine', 'prescription', 'nonprescription', 'alcohol', 'cigarette'], content)
                        
                       loadErrorPart(['cigar', 'pipe', 'tobacco', 'ecigar', 'noncigarOther'], content, 14)
                
                         loadErrorPart(['physical', 'sleep', 'reproduce', 'reportedHealth', 'life', 'socialSupport', 'cognition', 'depression', 'psychosocial', 'fatigue', 'cancerHistory', 'cancerPedigree', 'exposure','residence', 'diabetes', 'stroke', 'copd', 'cardiovascular', 'osteoporosis', 'mental',
                         'cognitiveDecline'], content, 19)
                         dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(content[18].baseline == 0 || content[18].other_specify_baseline))
                         dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(content[18].followup == 0 || content[18].other_specify_followup))
                       
                        if (content[40]) {
                            dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine([0, 1].includes(content[40].baseline))) 
                            dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp([0, 1].includes(content[40].followup))) 
                        }
                        dispatch(allactions.majorContentErrorActions.cancerToxicity(cancerInfo.cancerToxicity == 1)) 
                        dispatch(allactions.majorContentErrorActions.cancerLateEffects(cancerInfo.cancerLateEffects == 1)) 
                        dispatch(allactions.majorContentErrorActions.cancerSymptom(cancerInfo.cancerSymptom == 1)) 
                        dispatch(allactions.majorContentErrorActions.cancerOther(cancerInfo.cancerOther == 1))                         
                        dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(!cancerInfo.cancerOther || cancerInfo.cancerOtherSpecify))
                    })

                })//end of then
        //}//end of if
    }, [cohortId])


    //const refreshErrors = () => (errors.seStatusBaseLine && errors.seStatusFollowUp) || (errors.educationBaseLine && errors.educationFollowUp) || (errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) || (errors.originBaseLine && errors.originFollowUp) || (errors.empStatusBaseLine && errors.empStatusFollowUp) || (errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) || (errors.anthropometryBaseLine && errors.anthropometryFollowUp) || (errors.dietaryBaseLine && errors.dietaryFollowUp) || (errors.supplementBaseLine && errors.supplementFollowUp) || (errors.medicineBaseLine && errors.medicineFollowUp) || (errors.prescriptionBaseLine && errors.prescriptionFollowUp) || (errors.nonprescriptionBaseLine && errors.nonprescriptionFollowUp) || (errors.alcoholBaseLine && errors.alcoholFollowUp) || (errors.cigaretteBaseLine && errors.cigaretteFollowUp) || (errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.physicalBaseLine && errors.physicalFollowUp) || (errors.sleepBaseLine && errors.sleepFollowUp) || (errors.reproduceBaseLine && errors.reproduceFollowUp) || (errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) || (errors.lifeBaseLine && errors.lifeFollowUp) || (errors.socialSupportBaseLine && errors.socialSupportFollowUp) || (errors.cognitionBaseLine & errors.cognitionFollowUp) || (errors.depressionBaseLine && errors.depressionFollowUp) || (errors.psychosocialBaseLine && errors.psychosocialFollowUp) || (errors.fatigueBaseLine && errors.fatigueFollowUp) || (errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) || (errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) || (errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) || (errors.exposureBaseLine && errors.exposureFollowUp) || (errors.residenceBaseLine && errors.residenceFollowUp) || (errors.diabetesBaseLine && errors.diabetesFollowUp) || (errors.strokeBaseLine && errors.strokeFollowUp) || (errors.copdBaseLine && errors.copdFollowUp) || (errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) || (errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) || (errors.mentalBaseLine && errors.mentalFollowUp) || (errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify) 

    const refreshErrors = () => {
        for (let k of Object.keys(errors)) {
            if (!['cancerOther', 'cancerToxicity', 'cancerSymptom', 'cancerLateEffects', 'cancerOtherSpecify', 'cigarBaseLine', 'cigarFollowUp', 'pipeBaseLine', 'pipeFollowUp', 'tobaccoBaseLine', 'noncigarBaseLineSpecify', 'tobaccoFollowUp', 'ecigarBaseLine', 'ecigarFollowUp', 'noncigarOtherBaseLine', 'noncigarOtherFollowUp', 'noncigarFollowUpSpecify'].includes(k) && errors[k]) {
                return true
            }
        }
        return false
    }

    const sendEmail = (template, topic) => {

        fetch('/api/questionnaire/select_admin_info', {
            method: "POST",
            body: JSON.stringify({ id: cohortId }),
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
        let userId = userSession.id

        if (['new', 'draft', 'published', 'submitted', 'rejected', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}/${userId}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: nextStatus }))
                        dispatch(fetchCohort(cohortID))
                        if (nextStatus === 'submitted')
                            sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ');
                        setReviewModalShow(false);
                        updateMessage({
                            show: true,
                            type: 'success',
                            content: `The cohort has been submitted.`
                        });
                    } else {
                        updateMessage({
                            show: true,
                            type: 'warning',
                            content: `The cohort could not be submitted due to an internal error.`
                        });
                    }
                })
        }
    }

    const saveMajorContent = (id, errorsRemain = true, goNext = proceed || false) => {
        let userID = userSession.id

        let majorContentBody = majorContent
        majorContentBody["userID"] = userID

        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContentBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    dispatch(setHasUnsavedChanges(false));
                    if (!errorsRemain)
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('C', 'incomplete'))
                    }
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId) {
                            dispatch(fetchCohort(result.data.duplicated_cohort_id))
                            // if cohort_id changed, refresh section status
                            let secStatusList = result.data.sectionStatusList
                            if (secStatusList && secStatusList.length > 0) secStatusList.map((item, idx) => {
                                dispatch(allactions.sectionActions.setSectionStatus(item.page_code, item.status))
                            })
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            history.push(window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id));
                        }else{
                            dispatch(fetchCohort(cohortId))
                        }
                        if (result.data.status && result.data.status != cohortStatus) {
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
                            
                        }
                    }
                    if (!goNext)
                        setSuccessMsg(true)
                    else
                        props.sectionPicker('D')
                } else {
                    setFailureMsg(true)
                }

            })
    }


    const handleSave = () => {
        setSaved(true)
        let errorsRemain = refreshErrors()
        //console.log('errorRemainsSoFar: '+errorsRemain)
        if (!errorsRemain) errorsRemain |= (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) || (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify)
        //console.dir(errors)
        if (!errorsRemain) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, errorsRemain)
        }
        else {
            setModalShow(true)
            setProceed(false)
        }
    }

    const handleSaveContinue = () => {
        setSaved(true)
        let errorsRemain = refreshErrors()

        if (!errorsRemain) errorsRemain |= (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) || (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify)
        if (!errorsRemain) {
            majorContent.sectionCStatus = 'complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(cohortId, errorsRemain, true)
        }
        else {
            setModalShow(true)
            setProceed(true)
        }
    }

    const handleSubmitForReview = () => {
        setReviewModalShow(true);
    }

    const confirmSaveStay = () => {
        majorContent.sectionCStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'));
        saveMajorContent(cohortId); setModalShow(false)
    }

    const confirmSaveContinue = () => {
        majorContent.sectionCStatus = 'incomplete'
        dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
        saveMajorContent(cohortId, true, true); setModalShow(false)
    }

    const getQuestionEntry = (questionType, key, idx) => {
        const showQuestionLabel = questionType === 'BaseLine';
        const title = {
            BaseLine: 'Collected at Baseline',
            FollowUp: 'Collected at Follow-Up',
        }[questionType];

        const options = [
            { label: 'No', value: 0 },
            { label: 'Yes', value: 1 },
        ];

        return (
            <Row>
                {showQuestionLabel && <Col sm="12">
                    <Form.Label className="mt-3">
                        {subtitles[idx]}
                    </Form.Label>
                </Col>}
                <Col sm="4">
                    <label className="required-label">{title}</label>
                </Col>
                <Col sm="8">
                    {options.map(({ label, value }, i) =>
                        <Form.Check
                            id={`${key}_${value}`}
                            inline
                            type="radio"
                            name={key}
                            checked={majorContent[key] === value}
                            readOnly={isReadOnly}
                            label={label}
                            onChange={e => {
                                if (!isReadOnly) {
                                    dispatch(allactions.majorContentActions[key](value));
                                    dispatch(allactions.majorContentErrorActions[key](true));
                                    dispatch(setHasUnsavedChanges(true));
                                }
                            }}

                        />
                    )}
                    {errors[key] && saved && <span className="text-danger ml-3">Required Field</span>}
                </Col>
            </Row>
        );
    }

    const getMultiSelectList = (questions = [], keys = []) => {
        return <div className="ml-4">
            {questions.map((item, idx) =>
                <Form.Check
                    type="checkbox"
                    className={keys[idx].includes('cancer') ? "ml-4" : "ml-4 pl-0"}
                    id={keys[idx]}
                    name={keys[idx]}
                    readOnly={isReadOnly}
                    checked={majorContent[keys[idx]] === 1}
                    label={item}
                    onChange={(e) => {
                        if (!isReadOnly) {
                            dispatch(setHasUnsavedChanges(true));
                            dispatch(allactions.majorContentActions[keys[idx]](+e.target.checked));
                            dispatch(allactions.majorContentErrorActions[keys[idx]](e.target.checked));
                            if (keys[idx] === 'cancerOther')
                                dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))
                            else if (keys[idx] === 'noncigarOtherBaseLine')
                                dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))
                            else if (keys[idx] === 'noncigarOtherFollowUp')
                                dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))
                        }
                    }}
                />
            )}</div>;
    }

    const getFirstContent = () => {
        return Object.keys(majorContent).slice(0, 71).map((key, idx) => {
            if (idx <= 28 || idx > 40) {//skip questions first
                if (key.includes('BaseLine')) {
                    return getQuestionEntry('BaseLine', key, idx)
                }
                else if (key.includes('FollowUp')) {
                    return getQuestionEntry('FollowUp', key, idx)
                }
            } else if (idx === 29) {
                return <Form.Group as={Row} sm='12' className='mb-0' style={{ marginTop: '10px' }} >
                    <Form.Label as={Row} sm='12' className='pl-5' style={{ marginBottom: '8px' }}>
                        C.15 Use of tobacco products other than cigarettes<span style={{ color: 'red' }}>*</span> <span className="font-weight-normal ml-1">{' '}(Select all that apply)</span>
                    </Form.Label>
                    <Col sm='12' className='mb-1'>
                        <span>If data was collected at baseline, please specify all tobacco products that apply</span>
                        {(errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) && saved &&
                            <span className="text-danger ml-3">Required Field</span>}
                    </Col>

                    {
                        getMultiSelectList(
                            ['Cigars', 'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other'],
                            ['cigarBaseLine', 'pipeBaseLine', 'tobaccoBaseLine', 'ecigarBaseLine', 'noncigarOtherBaseLine']
                        )
                    }
                    <Col sm='12' column className='pl-4' style={{ marginBottom: '8px' }}>
                        <Reminder message='Required Field' disabled={!(majorContent.noncigarOtherBaseLine === 1 && errors.noncigarBaseLineSpecify && saved)}>
                            <input
                                placeholder='Max of 200 characters'
                                maxLength='200' name='noncigarBaseLineSpecify'
                                style={majorContent.noncigarOtherBaseLine === 1 && errors.noncigarBaseLineSpecify && saved && { border: '1px solid red' } || {}} className='form-control'
                                value={majorContent.noncigarBaseLineSpecify}
                                onChange={e => { dispatch(allactions.majorContentActions.noncigarBaseLineSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }}
                                onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))} disabled={!majorContent.noncigarOtherBaseLine || isReadOnly} />
                        </Reminder>
                    </Col>
                    <Col sm='12' className='mb-1'>
                        <span>If data was collected during follow-up, please specify all tobacco products that apply</span>
                        {(errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) && saved &&
                            <span className="text-danger ml-3">Required Field</span>}
                    </Col>
                    {
                        getMultiSelectList(
                            ['Cigars', 'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other'],
                            ['cigarFollowUp', 'pipeFollowUp', 'tobaccoFollowUp', 'ecigarFollowUp', 'noncigarOtherFollowUp']
                        )
                    }
                    <Col sm='12' column className='pl-4' style={{ marginBottom: '8px' }}>
                        <Reminder message='Required Field' disabled={!(majorContent.noncigarOtherFollowUp === 1 && errors.noncigarFollowUpSpecify && saved)}>
                            <input
                                placeholder='Max of 200 characters'
                                maxLength='200' name='noncigarFollowUpSpecify'
                                style={majorContent.noncigarOtherFollowUp === 1 && errors.noncigarFollowUpSpecify && saved && { border: '1px solid red' } || {}} className='form-control'
                                value={majorContent.noncigarFollowUpSpecify}
                                onChange={e => { dispatch(allactions.majorContentActions.noncigarFollowUpSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }}
                                onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))} disabled={!majorContent.noncigarOtherFollowUp || isReadOnly} />
                        </Reminder>
                    </Col>
                </Form.Group>
            }
        })
    }

    const getSecondContent = () => {
        return Object.keys(majorContent).slice(71).map((key, idx) => {
            if (key.includes('BaseLine'))
                return getQuestionEntry('BaseLine', key, idx + 71)
            else if (key.includes('FollowUp'))
                return getQuestionEntry('FollowUp', key, idx + 71)
        })
    }

    const getThirdContent = () => {
        return <Form.Group className='mb-0' style={{ marginTop: '10px' }} >
            <Form.Label style={{ marginBottom: '8px' }}>
                C.32 Do you have information on the following cancer related conditions?<span style={{ color: 'red' }}>*</span> <span className="font-weight-normal">{' '}(Select all that apply)</span>

                {(errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) && saved &&
                    <span className="font-weight-normal text-danger ml-3">Required Field</span>}
            </Form.Label>
            <div style={{ marginLeft: '-3rem' }} className="mb-3">{
                getMultiSelectList(
                    [
                        'Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)',
                        'Late effects of treatment (e.g., cardiotoxicity, lymphedema)',
                        'Symptom management (e.g., fatigue, pain, sexual dysfunction)',
                        'Other'
                    ],
                    ['cancerToxicity', 'cancerLateEffects', 'cancerSymptom', 'cancerOther']
                )
            }</div>

            <Reminder message='Required Field' disabled={!(majorContent.cancerOther === 1 && errors.cancerOtherSpecify && saved)}>
                <input
                    placeholder='Max of 200 characters'
                    maxLength='200' name='cancerOtherSpecify'
                    style={(majorContent.cancerOther === 1 && errors.cancerOtherSpecify && saved) && { border: '1px solid red' } || {}}
                    className='form-control'
                    value={majorContent.cancerOtherSpecify}
                    onChange={e => { dispatch(allactions.majorContentActions.cancerOtherSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }}
                    onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther || isReadOnly} />
            </Reminder>

        </Form.Group>
    }

    return (
        <Container>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
            {message.show && <Messenger message={message.content} severity={message.type} open={true} changeMessage={_ => updateMessage({ show: false })} />}
            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
            <ReviewModal show={reviewModalShow}
                title={
                    <span>
                        Submit for Review
                    </span>
                }
                body={
                    <span>
                        This cohort questionnaire will be locked against further modifications 
                        once you submit it for review. Are you sure you want to continue?                  
                    </span>
                }
                footer={
                    <div>
                        <Button 
                            variant="secondary" 
                            className="col-lg-2 col-md-6" 
                            onClick={_ => setReviewModalShow(false)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            className="col-lg-2 col-md-6" 
                            onClick={_ => resetCohortStatus(cohortId, 'submitted')}>
                            Submit
                        </Button>
                    </div>
                }
            />    
                <Form>
                    <CollapsiblePanelContainer>
                        <CollapsiblePanel
                            condition={activePanel === 'panelA'}
                            onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                            panelTitle="Major Content Domains">
                            <Form.Group as={Row} className="mb-1">
                                <Form.Label column sm="12">
                                    Please specify whether you collected data within these major content domains. Baseline refers to data collected at or near enrollment into the cohort
                                </Form.Label>
                            </Form.Group>
                            {getFirstContent()}
                        </CollapsiblePanel>
                        <CollapsiblePanel
                            condition={activePanel === 'panelB'}
                            onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                            panelTitle="Other Medical Conditions">
                            <Form.Label as={Row} sm='12' className='pl-4' >
                                C.31 Do you have information on the following medical conditions?
                            </Form.Label>
                            {getSecondContent()}
                        </CollapsiblePanel>
                        <CollapsiblePanel
                            condition={activePanel === 'panelC'}
                            onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                            panelTitle="Cancer Related Conditions">
                            {getThirdContent()}
                        </CollapsiblePanel>
                    </CollapsiblePanelContainer>
                </Form>

                <QuestionnaireFooter
                    isAdmin={isReadOnly}
                    handlePrevious={_ => props.sectionPicker('B')}
                    handleNext={_ => props.sectionPicker('D')}
                    handleSave={handleSave}
                    handleSaveContinue={handleSaveContinue}
                    handleSubmitForReview={handleSubmitForReview}
                    handleApprove={false}
                    handleReject={false} />

        </Container>
    )
}

export default MajorContentForm