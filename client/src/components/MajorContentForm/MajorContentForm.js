import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import allactions from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Reminder from '../Tooltip/Tooltip'
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MajorContentForm = ({ ...props }) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.majorContentErrorReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const cohortId = useSelector(state => state.cohortIDReducer)
    const dispatch = useDispatch()
    const isReadOnly = props.isReadOnly || false
    const [activePanel, setActivePanel] = useState('panelA')
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const history = useHistory();
    
    //const cohortId = +window.location.pathname.split('/').pop();

    const subtitles = [
            'hasLoded', 'C.1 Socio-economic Status', '', 'C.2 Education Level', '', 'C.3 Marital Status', '', 'C.4 Language/Country of Origin', '',
            'C.5 Employment Status', '', 'C.6 Health Insurance Status', '', 'C.7 Anthropometry(e.g., weight, height, waist circumference)',
            '', 'C.8 Dietary Intake', '', 'C.9 Dietary Supplement Use', '', 'C.10 Complementary and Alternative Medicine', '', 'C.11 Prescription Medication Use(not related to cancer treatment', '', 'C.12 Non-prescription Medication Use(not related to cancer treatment', '', 'C.13 Alcohol Consumption', '', 'C.14 Cigarette Smoking', '',
            // remove to keep it sync with the object, 'C.15 Use of Tobacco Products Other than Cigarettes', '',
            'Cigars',  'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other', '', 'Cigars',  'Pipes', 'Chewing tobacco', 'E-Cigarettes', 'Other', '',
            'C.16 Physical Activity', '', 'C.17 Sleep Habits', '', 'C.18 Reproductive History', '', 'C.19 Self_Reported Health', '', 'C.20 Quality of Life', '', 'C.21 Social Support', '', 'C.22 Cognitive Function', '', 'C.23 Depression', '', 'C.24 Other Psychosocial Variables', '', 'C.25 Fatigue', '', 'C.26 Family History of Cancer', '', 'C.27 Family History of Cancer with Pedigrees', '', 'C.28 Physical function meassures(e.g. grip strength, gait speed, etc.)', '', 'C.29 Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)', '', 'C.30 Residential history Information (zip code, GIS) over time?', '',
            //removed to snyc with majorContent index 'C.31 Other Medical Conditions', '',
            'a. Diabetes', '', 'b. Stroke', '', 'c. COPD and/or Emphysema', '', 'd. Cardiovascular Disease', '', 'e. Osteoporosis', '', 'f. Mental Health', '',
            'g. Cognitive Decline', ''
            ]
    useEffect(() => {
        //let id = 118
        //window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', `/cohort/questionnaire/${id}`)
        if (!majorContent.hasLoaded) {
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
                        dispatch(allactions.majorContentActions.noncigarBaseLineSpecify(content[18].other_specify_baseline))
                        dispatch(allactions.majorContentActions.noncigarFollowUpSpecify(content[18].other_specify_followup))
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
                        //dispatch(allactions.majorContentActions.physicalMeasureBaseLine(content[30].baseline))
                        //dispatch(allactions.majorContentActions.physicalMeasureFollowUp(content[30].followup))

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
                        dispatch(allactions.majorContentActions.cancerOtherSpecify(cancerInfo.cancerOtherSpecify))
                        //dispatch(allactions.majorContentActions.setHasLoaded(true))

                        if ([0,1].includes(content[0].baseline)) {  dispatch(allactions.majorContentErrorActions.seStatusBaseLine(true)) }
                        if ([0,1].includes(content[0].followup)) {  dispatch(allactions.majorContentErrorActions.seStatusFollowUp(true)) }
                        if ([0,1].includes(content[1].baseline)) {  dispatch(allactions.majorContentErrorActions.educationBaseLine(true)) }
                        if ([0,1].includes(content[1].followup)) {  dispatch(allactions.majorContentErrorActions.educationFollowUp(true)) }
                        if ([0,1].includes(content[2].baseline)) {  dispatch(allactions.majorContentErrorActions.maritalStatusBaseLine(true)) }
                        if ([0,1].includes(content[2].followup)) {  dispatch(allactions.majorContentErrorActions.maritalStatusFollowUp(true)) }
                        if ([0,1].includes(content[3].baseline)) {  dispatch(allactions.majorContentErrorActions.originBaseLine(true)) }
                        if ([0,1].includes(content[3].followup)) {  dispatch(allactions.majorContentErrorActions.originFollowUp(true)) }
                        if ([0,1].includes(content[4].baseline)) {  dispatch(allactions.majorContentErrorActions.empStatusBaseLine(true)) }
                        if ([0,1].includes(content[4].followup)) {  dispatch(allactions.majorContentErrorActions.empStatusFollowUp(true)) }
                        if ([0,1].includes(content[5].baseline)) {  dispatch(allactions.majorContentErrorActions.insuranceStatusBaseLine(true)) }
                        if ([0,1].includes(content[5].followup)) {  dispatch(allactions.majorContentErrorActions.insuranceStatusFollowUp(true)) }
                        if ([0,1].includes(content[6].baseline)) {  dispatch(allactions.majorContentErrorActions.anthropometryBaseLine(true)) }
                        if ([0,1].includes(content[6].followup)) {  dispatch(allactions.majorContentErrorActions.anthropometryFollowUp(true)) }
                        if ([0,1].includes(content[7].baseline)) {  dispatch(allactions.majorContentErrorActions.dietaryBaseLine(true)) }
                        if ([0,1].includes(content[7].followup)) {  dispatch(allactions.majorContentErrorActions.dietaryFollowUp(true)) }
                        if ([0,1].includes(content[8].baseline)) {  dispatch(allactions.majorContentErrorActions.supplementBaseLine(true)) }
                        if ([0,1].includes(content[8].followup)) {  dispatch(allactions.majorContentErrorActions.supplementFollowUp(true)) }
                        if ([0,1].includes(content[9].baseline)) {  dispatch(allactions.majorContentErrorActions.medicineBaseLine(true)) }
                        if ([0,1].includes(content[9].followup)) {  dispatch(allactions.majorContentErrorActions.medicineFollowUp(true)) }
                        if ([0,1].includes(content[10].baseline)) {  dispatch(allactions.majorContentErrorActions.prescriptionBaseLine(true)) }
                        if ([0,1].includes(content[10].followup)) {  dispatch(allactions.majorContentErrorActions.prescriptionFollowUp(true)) }
                        if ([0,1].includes(content[11].baseline)) {  dispatch(allactions.majorContentErrorActions.nonprescriptionBaseLine(true)) }
                        if ([0,1].includes(content[11].followup)) {  dispatch(allactions.majorContentErrorActions.nonprescriptionFollowUp(true)) }
                        if ([0,1].includes(content[12].baseline)) {  dispatch(allactions.majorContentErrorActions.alcoholBaseLine(true)) }
                        if ([0,1].includes(content[12].followup)) {  dispatch(allactions.majorContentErrorActions.alcoholFollowUp(true)) }
                        if ([0,1].includes(content[13].baseline)) {  dispatch(allactions.majorContentErrorActions.cigaretteBaseLine(true)) }
                        if ([0,1].includes(content[13].followup)) {  dispatch(allactions.majorContentErrorActions.cigaretteFollowUp(true)) }
                        if (content[14].baseline == 1) {  dispatch(allactions.majorContentErrorActions.cigarBaseLine(true)) }
                        if (content[15].baseline == 1) {  dispatch(allactions.majorContentErrorActions.pipeBaseLine(true)) }
                        if (content[16].baseline == 1) {  dispatch(allactions.majorContentErrorActions.tobaccoBaseLine(true)) }
                        if (content[17].baseline == 1) {  dispatch(allactions.majorContentErrorActions.ecigarBaseLine(true)) }
                        if (content[18].baseline == 1) {  dispatch(allactions.majorContentErrorActions.noncigarOtherBaseLine(true)) }

                        if (content[14].followup == 1) {  dispatch(allactions.majorContentErrorActions.cigarFollowUp(true)) }
                        if (content[15].followup == 1) {  dispatch(allactions.majorContentErrorActions.pipeFollowUp(true)) }
                        if (content[16].followup == 1) {  dispatch(allactions.majorContentErrorActions.tobaccoFollowUp(true)) }
                        if (content[17].followup == 1) {  dispatch(allactions.majorContentErrorActions.ecigarFollowUp(true)) }
                        if (content[18].followup == 1) {  dispatch(allactions.majorContentErrorActions.noncigarOtherFollowUp(true)) }
                        if (content[18].baseline == 0 || content[18].other_specify_baseline) { dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(true)) }


                        if (content[18].followup == 0 || content[18].other_specify_followup) { dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(true)) }
                        if ([0,1].includes(content[19].baseline)) {  dispatch(allactions.majorContentErrorActions.physicalBaseLine(true)) }
                        if ([0,1].includes(content[19].followup)) {  dispatch(allactions.majorContentErrorActions.physicalFollowUp(true)) }
                        if ([0,1].includes(content[20].baseline)) {  dispatch(allactions.majorContentErrorActions.sleepBaseLine(true)) }
                        if ([0,1].includes(content[20].followup)) {  dispatch(allactions.majorContentErrorActions.sleepFollowUp(true)) }
                        if ([0,1].includes(content[21].baseline)) {  dispatch(allactions.majorContentErrorActions.reproduceBaseLine(true)) }
                        if ([0,1].includes(content[21].followup)) {  dispatch(allactions.majorContentErrorActions.reproduceFollowUp(true)) }
                        if ([0,1].includes(content[22].baseline)) {  dispatch(allactions.majorContentErrorActions.reportedHealthBaseLine(true)) }
                        if ([0,1].includes(content[22].followup)) {  dispatch(allactions.majorContentErrorActions.reportedHealthFollowUp(true)) }
                        if ([0,1].includes(content[23].baseline)) {  dispatch(allactions.majorContentErrorActions.lifeBaseLine(true)) }
                        if ([0,1].includes(content[23].followup)) {  dispatch(allactions.majorContentErrorActions.lifeFollowUp(true)) }
                        if ([0,1].includes(content[24].baseline)) {  dispatch(allactions.majorContentErrorActions.socialSupportBaseLine(true)) }
                        if ([0,1].includes(content[24].followup)) {  dispatch(allactions.majorContentErrorActions.socialSupportFollowUp(true)) }
                        if ([0,1].includes(content[25].baseline)) {  dispatch(allactions.majorContentErrorActions.cognitionBaseLine(true)) }
                        if ([0,1].includes(content[25].followup)) {  dispatch(allactions.majorContentErrorActions.cognitionFollowUp(true)) }
                        if ([0,1].includes(content[26].baseline)) {  dispatch(allactions.majorContentErrorActions.depressionBaseLine(true)) }
                        if ([0,1].includes(content[26].followup)) {  dispatch(allactions.majorContentErrorActions.depressionFollowUp(true)) }
                        if ([0,1].includes(content[27].baseline)) {  dispatch(allactions.majorContentErrorActions.psychosocialBaseLine(true)) }
                        if ([0,1].includes(content[27].followup)) {  dispatch(allactions.majorContentErrorActions.psychosocialFollowUp(true)) }
                        if ([0,1].includes(content[28].baseline)) {  dispatch(allactions.majorContentErrorActions.fatigueBaseLine(true)) }
                        if ([0,1].includes(content[28].followup)) {  dispatch(allactions.majorContentErrorActions.fatigueFollowUp(true)) }
                        if ([0,1].includes(content[29].baseline)) {  dispatch(allactions.majorContentErrorActions.cancerHistoryBaseLine(true)) }
                        if ([0,1].includes(content[29].followup)) {  dispatch(allactions.majorContentErrorActions.cancerHistoryFollowUp(true)) }
                        if ([0,1].includes(content[30].baseline)) {  dispatch(allactions.majorContentErrorActions.cancerPedigreeBaseLine(true)) }
                        if ([0,1].includes(content[30].followup)) {  dispatch(allactions.majorContentErrorActions.cancerPedigreeFollowUp(true)) }

                        if ([0,1].includes(content[31].baseline)) {  dispatch(allactions.majorContentErrorActions.exposureBaseLine(true)) }
                        if ([0,1].includes(content[31].followup)) {  dispatch(allactions.majorContentErrorActions.exposureFollowUp(true)) }
                        if ([0,1].includes(content[32].baseline)) {  dispatch(allactions.majorContentErrorActions.residenceBaseLine(true)) }
                        if ([0,1].includes(content[32].followup)) {  dispatch(allactions.majorContentErrorActions.residenceFollowUp(true)) }
                        if ([0,1].includes(content[33].baseline)) {  dispatch(allactions.majorContentErrorActions.diabetesBaseLine(true)) }
                        if ([0,1].includes(content[33].followup)) {  dispatch(allactions.majorContentErrorActions.diabetesFollowUp(true)) }
                        if ([0,1].includes(content[34].baseline)) {  dispatch(allactions.majorContentErrorActions.strokeBaseLine(true)) }
                        if ([0,1].includes(content[34].followup)) {  dispatch(allactions.majorContentErrorActions.strokeFollowUp(true)) }
                        if ([0,1].includes(content[35].baseline)) {  dispatch(allactions.majorContentErrorActions.copdBaseLine(true)) }
                        if ([0,1].includes(content[35].followup)) {  dispatch(allactions.majorContentErrorActions.copdFollowUp(true)) }
                        if ([0,1].includes(content[36].baseline)) {  dispatch(allactions.majorContentErrorActions.cardiovascularBaseLine(true)) }
                        if ([0,1].includes(content[36].followup)) {  dispatch(allactions.majorContentErrorActions.cardiovascularFollowUp(true)) }
                        if ([0,1].includes(content[37].baseline)) {  dispatch(allactions.majorContentErrorActions.osteoporosisBaseLine(true)) }
                        if ([0,1].includes(content[37].followup)) {  dispatch(allactions.majorContentErrorActions.osteoporosisFollowUp(true)) }
                        if ([0,1].includes(content[38].baseline)) {  dispatch(allactions.majorContentErrorActions.mentalBaseLine(true)) }
                        if ([0,1].includes(content[38].followup)) {  dispatch(allactions.majorContentErrorActions.mentalFollowUp(true)) }
                        if ([0,1].includes(content[39].baseline)) {  dispatch(allactions.majorContentErrorActions.cognitiveDeclineBaseLine(true)) }
                        if ([0,1].includes(content[39].followup)) {  dispatch(allactions.majorContentErrorActions.cognitiveDeclineFollowUp(true)) }
                        if (content[40]) {
                            if ([0,1].includes(content[40].baseline)) {  dispatch(allactions.majorContentErrorActions.physicalMeasureBaseLine(true)) }
                            if ([0,1].includes(content[40].followup)) {  dispatch(allactions.majorContentErrorActions.physicalMeasureFollowUp(true)) }
                        }

                        if (cancerInfo.cancerToxicity == 1) {  dispatch(allactions.majorContentErrorActions.cancerToxicity(true)) }
                        if (cancerInfo.cancerLateEffects == 1) { dispatch(allactions.majorContentErrorActions.cancerLateEffects(true)) }
                        if (cancerInfo.cancerSymptom == 1) {  dispatch(allactions.majorContentErrorActions.cancerSymptom(true)) }
                        if (cancerInfo.cancerOther == 1) { dispatch(allactions.majorContentErrorActions.cancerOther(true)) }

                        //if(cancerInfo.cancerToxicity || cancerInfo.cancerSymptom || cancerInfo.cancerLateEffects || cancerInfo.cancerOther)
                        //{dispatch(allactions.majorContentErrorActions.cancerToxicity = false; shadow.cancerLateEffects = false; shadow.cancerSymptom = false; shadow.cancerOther = false; changed=true;}
                        if (!cancerInfo.cancerOther || cancerInfo.cancerOtherSpecify) {
                            dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(true))
                        }

                        dispatch(allactions.majorContentActions.setHasLoaded(true))
                    })

                })//end of then
        }//end of if
    }, [])


    //const refreshErrors = () => (errors.seStatusBaseLine && errors.seStatusFollowUp) || (errors.educationBaseLine && errors.educationFollowUp) || (errors.maritalStatusBaseLine && errors.maritalStatusFollowUp) || (errors.originBaseLine && errors.originFollowUp) || (errors.empStatusBaseLine && errors.empStatusFollowUp) || (errors.insuranceStatusBaseLine && errors.insuranceStatusFollowUp) || (errors.anthropometryBaseLine && errors.anthropometryFollowUp) || (errors.dietaryBaseLine && errors.dietaryFollowUp) || (errors.supplementBaseLine && errors.supplementFollowUp) || (errors.medicineBaseLine && errors.medicineFollowUp) || (errors.prescriptionBaseLine && errors.prescriptionFollowUp) || (errors.nonprescriptionBaseLine && errors.nonprescriptionFollowUp) || (errors.alcoholBaseLine && errors.alcoholFollowUp) || (errors.cigaretteBaseLine && errors.cigaretteFollowUp) || (errors.cigarBaseLine && errors.cigarFollowUp && errors.pipeBaseLine && errors.pipeFollowUp && errors.tobaccoBaseLine && errors.tobaccoFollowUp && errors.ecigarBaseLine && errors.ecigarFollowUp && errors.noncigarOtherBaseLine && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.physicalBaseLine && errors.physicalFollowUp) || (errors.sleepBaseLine && errors.sleepFollowUp) || (errors.reproduceBaseLine && errors.reproduceFollowUp) || (errors.reportedHealthBaseLine && errors.reportedHealthFollowUp) || (errors.lifeBaseLine && errors.lifeFollowUp) || (errors.socialSupportBaseLine && errors.socialSupportFollowUp) || (errors.cognitionBaseLine & errors.cognitionFollowUp) || (errors.depressionBaseLine && errors.depressionFollowUp) || (errors.psychosocialBaseLine && errors.psychosocialFollowUp) || (errors.fatigueBaseLine && errors.fatigueFollowUp) || (errors.cancerHistoryBaseLine && errors.cancerHistoryFollowUp) || (errors.cancerPedigreeBaseLine && errors.cancerPedigreeFollowUp) || (errors.physicalMeasureBaseLine && errors.physicalMeasureFollowUp) || (errors.exposureBaseLine && errors.exposureFollowUp) || (errors.residenceBaseLine && errors.residenceFollowUp) || (errors.diabetesBaseLine && errors.diabetesFollowUp) || (errors.strokeBaseLine && errors.strokeFollowUp) || (errors.copdBaseLine && errors.copdFollowUp) || (errors.cardiovascularBaseLine && errors.cardiovascularFollowUp) || (errors.osteoporosisBaseLine && errors.osteoporosisFollowUp) || (errors.mentalBaseLine && errors.mentalFollowUp) || (errors.cognitiveDeclineBaseLine && errors.cognitiveDeclineFollowUp) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify) 

    const refreshErrors = () => {
        for(let k of Object.keys(errors)){
            if(!['cancerOther', 'cancerToxicity', 'cancerSymptom', 'cancerLateEffects', 'cancerOtherSpecify', 'cigarBaseLine', 'cigarFollowUp', 'pipeBaseLine', 'pipeFollowUp', 'tobaccoBaseLine', 'noncigarBaseLineSpecify', 'tobaccoFollowUp', 'ecigarBaseLine', 'ecigarFollowUp', 'noncigarOtherBaseLine', 'noncigarOtherFollowUp', 'noncigarFollowUpSpecify'].includes(k) && errors[k]) {
                return true
            }
        }
        return false
    }

    const resetCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: nextStatus }))
                    }
                })
        }
    }

    const saveMajorContent = (id, errorsRemain = true, proceed = false) => {
        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContent),
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
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId)
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            history.push(window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id));
                        if(result.data.status && result.data.status != cohortStatus){
                            dispatch(({type: 'SET_COHORT_STATUS', value: result.data.status}))
                            dispatch(fetchCohort(result.data.duplicated_cohort_id))
                        }
                    }
                    if (!proceed)
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
        if(!errorsRemain) errorsRemain |= (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) || (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify)
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
        
        if(!errorsRemain) errorsRemain |= (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) || (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) || (!errors.noncigarOtherBaseLine && errors.noncigarBaseLineSpecify) || (!errors.noncigarOtherFollowUp && errors.noncigarFollowUpSpecify) || (errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) || (!errors.cancerOther && errors.cancerOtherSpecify)
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
            {label: 'No', value: 0},
            {label: 'Yes', value: 1},
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
                    {options.map(({label, value}, i) => 
                        <Form.Check
                            id={`${key}_${value}`}
                            inline
                            type="radio"
                            name={key}
                            checked={majorContent[key] === value}
                            readOnly={isReadOnly}
                            label={label}
                            onChange={e => {
                                if(!isReadOnly) { 
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
                    className="ml-4"
                    id={keys[idx]}
                    name={keys[idx]}
                    readOnly={isReadOnly}
                    checked={majorContent[keys[idx]] === 1}
                    label={item}
                    onChange={(e) => { 
                        if(!isReadOnly) {
                            dispatch(setHasUnsavedChanges(true));
                            dispatch(allactions.majorContentActions[keys[idx]](+e.target.checked));
                            dispatch(allactions.majorContentErrorActions[keys[idx]](e.target.checked));
                            if(keys[idx] === 'cancerOther')
                                dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))
                            else if(keys[idx] === 'noncigarOtherBaseLine')
                                dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))
                            else if (keys[idx] === 'noncigarOtherFollowUp')
                                dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))
                        }
                    }} 
                />
        )}</div>;
    }

    const getFirstContent = () => {
        return Object.keys(majorContent).slice(0, 71).map((key, idx)=> {
            if(idx <= 28 || idx > 40) {//skip questions first
                if(key.includes('BaseLine')){
                    return getQuestionEntry('BaseLine', key, idx)
                }
                else if(key.includes('FollowUp')){
                    return getQuestionEntry('FollowUp', key, idx)
                }
            }else if (idx === 29){
                return <Form.Group as={Row} sm='12' className='mb-0' style={{marginTop: '10px'}} >                  
                    <Form.Label as={Row} sm='12' className='pl-5' style={{marginBottom: '8px'}}>
                        C.15 Use of tobacco products other than cigarettes<span style={{ color: 'red' }}>*</span> <small style={{paddingRight: '0'}}>(Select all that apply)</small>
                    </Form.Label>
                    <Col sm='12'>
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
                <Col sm='12' column className='pl-4' style={{marginBottom: '8px'}}>
                    <Reminder message='Required Field' disabled={!(majorContent.noncigarOtherBaseLine === 1 && errors.noncigarBaseLineSpecify && saved)}>
                        <input 
                            placeholder='Max of 200 characters' 
                            maxLength='200' name='noncigarBaseLineSpecify' 
                            style={majorContent.noncigarOtherBaseLine === 1 && errors.noncigarBaseLineSpecify && saved && { border: '1px solid red' } || {}} className='form-control text-capitalize'
                            value={majorContent.noncigarBaseLineSpecify} 
                            onChange={e => { dispatch(allactions.majorContentActions.noncigarBaseLineSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }} 
                            onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarBaseLineSpecify(majorContent.noncigarBaseLineSpecify))} disabled={!majorContent.noncigarOtherBaseLine || isReadOnly} />
                    </Reminder>
                </Col>
                <Col sm='12'>
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
                <Col sm='12' column className='pl-4' style={{marginBottom: '8px'}}>
                    <Reminder message='Required Field' disabled={!(majorContent.noncigarOtherFollowUp === 1 && errors.noncigarFollowUpSpecify && saved)}>
                        <input 
                            placeholder='Max of 200 characters' 
                            maxLength='200' name='noncigarFollowUpSpecify' 
                            style={majorContent.noncigarOtherFollowUp === 1 && errors.noncigarFollowUpSpecify && saved && { border: '1px solid red' } || {}} className='form-control text-capitalize'
                            value={majorContent.noncigarFollowUpSpecify} 
                            onChange={e => { dispatch(allactions.majorContentActions.noncigarFollowUpSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }} 
                            onBlur={() => dispatch(allactions.majorContentErrorActions.noncigarFollowUpSpecify(majorContent.noncigarFollowUpSpecify))} disabled={!majorContent.noncigarOtherFollowUp || isReadOnly} />
                    </Reminder>
                </Col>
                </Form.Group>
            }
    })}

    const getSecondContent = () => {
        return Object.keys(majorContent).slice(71).map((key, idx)=>{
            if(key.includes('BaseLine'))
                return getQuestionEntry('BaseLine', key, idx+71)
            else if (key.includes('FollowUp'))
                return getQuestionEntry('FollowUp', key, idx+71)
        })
    }

    const getThirdContent = () => {
        return <Form.Group className='mb-0' style={{marginTop: '10px'}} >                  
                    <Form.Label style={{marginBottom: '8px'}}>
                        C.32 Do you have information on the following cancer related conditions?<span style={{ color: 'red' }}>*</span> <small style={{paddingRight: '0'}}>(Select all that apply)</small>

                        {(errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther) && saved && 
                            <span className="font-weight-normal text-danger ml-3">Required Field</span>}
                    </Form.Label>    
                    <div style={{marginLeft: '-3rem'}}>{
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
                            className='form-control text-capitalize'
                            value={majorContent.cancerOtherSpecify} 
                            onChange={e => { dispatch(allactions.majorContentActions.cancerOtherSpecify(e.target.value)); dispatch(setHasUnsavedChanges(true)); }} 
                            onBlur={() => dispatch(allactions.majorContentErrorActions.cancerOtherSpecify(majorContent.cancerOtherSpecify))} disabled={!majorContent.cancerOther || isReadOnly} />
                    </Reminder>
               
            </Form.Group>          
    }

    return <div className="p-3 px-5">
        {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
        
        <Form>
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
                    C.31 Other Medical Conditions
                </Form.Label>
                {getSecondContent()}      
            </CollapsiblePanel>
            <CollapsiblePanel
                        condition={activePanel === 'panelC'}
                        onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                        panelTitle="Cancer Related Conditions">
                {getThirdContent()}
            </CollapsiblePanel>
        </Form> 

        <QuestionnaireFooter
            isAdmin={isReadOnly}
            handlePrevious={_ => props.sectionPicker('B')}
            handleNext={_ => props.sectionPicker('D')}
            handleSave={handleSave}
            handleSaveContinue={handleSaveContinue}
            handleSubmitForReview={_ => resetCohortStatus(cohortId, 'submitted')}
            handleApprove={false}
            handleReject={false} />

        </div>
}

export default MajorContentForm