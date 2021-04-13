import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
import allactions from '../../actions';
import validator from '../../validators';
import Messenger from '../Snackbar/Snackbar';
import Reminder from '../Tooltip/Tooltip';
import CenterModal from '../controls/modal/modal';
import ReviewSubmitModal from '../controls/modal/modal';
import ReviewApproveModal from '../controls/modal/modal';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter';
import { fetchCohort } from '../../reducers/cohort';
import { postJSON } from '../../services/query';
import * as fieldList from './specimenFieldList';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import { reject } from 'lodash';

const SpecimenForm = ({ ...props }) => {

    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const dispatch = useDispatch()
    const errors = useSelector(state => state.specimenInfoErrorReducer)
    const isReadOnly = props.isReadOnly;
    const lookup = useSelector(state => state.lookupReducer)
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)
    const history = useHistory();
    const userSession = useSelector(state => state.user);

    const [activePanel, setActivePanel] = useState('panelA')
    const [failureMsg, setFailureMsg] = useState(false)
    const [message, setMessage] = useState({ show: false, type: null, content: null })
    const updateMessage = state => setMessage({ ...message, ...state });
    const [rejectionModal, setRejectionModal] = useState({ show: false, notes: '' });
    const updateRejectionModal = state => setRejectionModal({ ...rejectionModal, ...state });
    const [updateStatusDisabled, setUpdateStatusDisabled] = useState(false);
    const [modalShow, setModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [reviewApproveModalShow, setReviewApproveModalShow] = useState(false)
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [userEmails, setEmails] = useState('')
    const [g15yearErrMsg, setG15yearErrMsg] = useState('');
    const [g1to6Flag, setG1to6Flag] = useState(false)
    const [g1to6FlagList, setG1to6FlagList] = useState({
        bioBloodBaseline: 1, bioBloodOtherTime: 1, bioBuccalSalivaBaseline: 1, bioBuccalSalivaOtherTime: 1,
        bioTissueBaseline: 1, bioTissueOtherTime: 1, bioUrineBaseline: 1, bioUrineOtherTime: 1,
        bioFecesBaseline: 1, bioFecesOtherTime: 1, bioOtherBaseline: 1, bioOtherOtherTime: 1
    })  // g1to6Flag true will disable all following question, default false
    //const cohortId = window.location.pathname.split('/').pop();

    const sendEmail = (template, topic, status) => {

        if (status === 'published' || status === 'rejected') {
            fetch('/api/questionnaire/select_owners_from_id', {
                method: "POST",
                body: JSON.stringify({ id: cohortId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {

                    if (result && result.status === 200) {
                        result.data.map((owner) => {
                            let reqBody = {
                                templateData: {
                                    user: owner.first_name + ' ' + owner.last_name,
                                    cohortName: owner.name,
                                    cohortAcronym: owner.acronym,
                                    website: window.location.origin,
                                    publishDate: new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC',
                                    reviewComments: status === 'rejected' ? rejectionModal.notes : ''
                                },
                                email: owner.email,
                                template: template,
                                topic: topic + owner.acronym
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

        else if (status === 'submitted') {
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
    }

    const handleApprove = async () => {
        let success;

        try {
            success = await postJSON(`/api/questionnaire/approve/${cohortId}`);
        } catch (e) {
            console.log(e);
            success = false;
        } finally {
            setUpdateStatusDisabled(true);
            updateMessage({
                show: true,
                type: success ? 'success' : 'warning',
                content: success
                    ? `The cohort has been published.`
                    : `The cohort could not be published due to an internal error.`
            })
            dispatch(fetchCohort(cohortId));
            sendEmail('/templates/email-publish-template.html', 'CEDCD Cohort Review Approved - ', 'published');
            setReviewApproveModalShow(false);
        }
    }

    async function handleReject() {
        let success;

        try {
            success = await postJSON(`/api/questionnaire/reject/${cohortId}`, { notes: rejectionModal.notes });
        } catch (e) {
            console.log(e);
            success = false;
        } finally {
            // success && sendEmail('/templates/email-reject-template.html', 'CEDCD Cohort Rejected - ', 'rejected')
            setUpdateStatusDisabled(true);
            updateMessage({
                show: true,
                type: success ? 'success' : 'warning',
                content: success
                    ? `The questionnaire has been rejected.`
                    : `The questionnaire could not be rejected due to an internal error.`
            });

            updateRejectionModal({ show: false })
            dispatch(fetchCohort(cohortId));
            sendEmail('/templates/email-reject-template.html', 'CEDCD Cohort Review Rejected - ', 'rejected')
        }
    }

    const getValidationResult = (value, requiredOrNot, type) => {
        switch (type) {
            case 'date':
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot, false)
            default:
                return validator.stringValidator(value, requiredOrNot)
        }
    }

    const populateErrors = (value, requiredOrNot, valueType) => {

        const result = getValidationResult(value, requiredOrNot, valueType)
        if (result) {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(false))
            setG15yearErrMsg(result)
        } else {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
            setG15yearErrMsg('');
        }
    }

    const isNull = v => ['', undefined, null].includes(v)

    const refreshErrors = () => (errors.bioBloodBaseline && errors.bioBloodOtherTime) || /* G1 */
        (+specimen.bioBloodBaseline === 1 && (specimen.bioBloodBaselineSerum === 0 && specimen.bioBloodBaselinePlasma === 0
            && specimen.bioBloodBaselineBuffyCoat === 0 && specimen.bioBloodBaselineOtherDerivative === 0)) ||
        (specimen.bioBloodOtherTime === 1 && (specimen.bioBloodOtherTimeSerum === 0 && specimen.bioBloodOtherTimePlasma === 0
            && specimen.bioBloodOtherTimeBuffyCoat === 0 && specimen.bioBloodOtherTimeOtherDerivative === 0)) ||
        (errors.bioBuccalSalivaBaseline && errors.bioBuccalSalivaOtherTime) || /* G2 */
        (errors.bioTissueBaseline && errors.bioTissueOtherTime) || /* G3 */
        (errors.bioUrineBaseline && errors.bioUrineOtherTime) || /* G4 */
        (errors.bioFecesBaseline && errors.bioFecesOtherTime) || /* G5 */
        (errors.bioOtherBaseline && errors.bioOtherOtherTime) || /* G6 */
        (+specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify) || /* G6 -specify */
        (+specimen.bioOtherOtherTime === 1 && errors.bioOtherOtherTimeSpecify) || /* G6 -specify */
        (errors.bioRepeatedSampleSameIndividual) || /* G7 */
        (errors.bioTumorBlockInfo) || /* G8 */
        (errors.bioGenotypingData) || /* G9 */
        (errors.bioSequencingDataExome) || /* G10 */
        (errors.bioSequencingDataWholeGenome) || /* G11 */
        (errors.bioEpigeneticOrMetabolicMarkers) || /* G12 */
        (errors.bioTranscriptomicsData) || /* G13 */
        (errors.bioMicrobiomeData) || /* G14 */
        (errors.bioMetabolomicData) || /* G15 */
        (+specimen.bioMetabolomicData === 1 && errors.bioMetaFastingSample) || /* G15a */
        (+specimen.bioMetabolomicData === 1 && (errors.bioMetaOutcomesInCancerStudy && errors.bioMetaOutcomesInCvdStudy && errors.bioMetaOutcomesInDiabetesStudy && errors.bioMetaOutcomesInOtherStudy)) ||
        (+specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioMetaOutcomesOtherStudySpecify) || /* G15b */
        (+specimen.bioMetabolomicData === 1 && errors.bioMemberOfMetabolomicsStudies) || /* G15c */
        (+specimen.bioMetabolomicData === 1 && +specimen.bioMemberInStudy === 0) || /* G15d */
        (+specimen.bioMetabolomicData === 1 && errors.bioLabsUsedForAnalysis) || /* G15e */
        (+specimen.bioMetabolomicData === 1 && errors.bioAnalyticalPlatform) || /* G15f */
        (+specimen.bioMetabolomicData === 1 && errors.bioSeparationPlatform) || /* G15g */
        (+specimen.bioMetabolomicData === 1 && +specimen.bioNumberMetabolitesMeasured === 0) || /* G15h */
        (+specimen.bioMetabolomicData === 1 && errors.bioYearSamplesSent)


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
                            sendEmail('/templates/email-admin-review-template.html', 'CEDCD Cohort Submitted - ', nextStatus);
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

    //console.log(fieldList)

    useEffect(() => {

        fetch(`/api/questionnaire/get_specimen/${cohortId}`, {
            method: "POST"
        }).then(res => res.json())
            .then(result => {
                let specimenCounts = result.data.counts
                let specimenInfo = result.data.info
                let specimenDetails = result.data.details
                setEmails(result.data.emails)
                if (result && specimenCounts) {
                    batch(() => {
                        for (let k of Object.keys(specimenCounts)) {
                            if (specimenCounts[k]) {
                                let value = +specimenCounts[k] < 0 ? 0 : +specimenCounts[k]
                                dispatch(allactions.specimenActions.setSpecimenCount(k, value.toString()))
                            } else {
                                dispatch(allactions.specimenActions.setSpecimenCount(k, "0"))
                            }
                        }
                        let k_field_status = false
                        for (let k of Object.keys(specimenInfo)) {

                            k_field_status = [0, 1].includes(specimenInfo[k].collected_yn)

                            switch (specimenInfo[k].sub_category) {
                                case 'bio_blood_baseline': // specimen_id 11
                                    dispatch(allactions.specimenActions.bioBloodBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodBaseline(k_field_status))
                                    setG1to6FlagList((state) => ({ ...state, bioBloodBaseline: specimenInfo[k].collected_yn }))
                                    break
                                case 'bio_blood_baseline_serum': // specimen_id 12
                                    dispatch(allactions.specimenActions.bioBloodBaselineSerum(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(k_field_status))
                                    break
                                case 'bio_blood_baseline_plasma': // specimen_id 13
                                    dispatch(allactions.specimenActions.bioBloodBaselinePlasma(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodBaselinePlasma(k_field_status))
                                    break
                                case 'bio_blood_baseline_buffy_coat': // specimen_id 14
                                    dispatch(allactions.specimenActions.bioBloodBaselineBuffyCoat(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(k_field_status))
                                    break
                                case 'bio_blood_baseline_other_derivative': // specimen_id 15
                                    dispatch(allactions.specimenActions.bioBloodBaselineOtherDerivative(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(k_field_status))
                                    break
                                case 'bio_blood_other_time': // specimen_id 16
                                    dispatch(allactions.specimenActions.bioBloodOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioBloodOtherTime: +specimenInfo[k].collected_yn })
                                    break
                                case 'bio_blood_other_time_serum': // specimen_id 17
                                    dispatch(allactions.specimenActions.bioBloodOtherTimeSerum(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(k_field_status))
                                    break
                                case 'bio_blood_other_time_plasma': // specimen_id 18
                                    dispatch(allactions.specimenActions.bioBloodOtherTimePlasma(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(k_field_status))
                                    break
                                case 'bio_blood_other_time_buffy_coat': // specimen_id 19
                                    dispatch(allactions.specimenActions.bioBloodOtherTimeBuffyCoat(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(k_field_status))
                                    break
                                case 'bio_blood_other_time_other_derivative': // specimen_id 20
                                    dispatch(allactions.specimenActions.bioBloodOtherTimeOtherDerivative(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(k_field_status))
                                    break
                                case 'bio_buccal_saliva_baseline': // specimen_id 21
                                    dispatch(allactions.specimenActions.bioBuccalSalivaBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioBuccalSalivaBaseline: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_buccal_saliva_other_time': // specimen_id 22
                                    dispatch(allactions.specimenActions.bioBuccalSalivaOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioBuccalSalivaOtherTime: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_tissue_baseline': // specimen_id 23
                                    dispatch(allactions.specimenActions.bioTissueBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioTissueBaseline(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioTissueBaseline: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_tissue_other_time': // specimen_id 24
                                    dispatch(allactions.specimenActions.bioTissueOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioTissueOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioTissueOtherTime: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_urine_baseline': // specimen_id 25
                                    dispatch(allactions.specimenActions.bioUrineBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioUrineBaseline(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioUrineBaseline: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_urine_other_time': // specimen_id 26
                                    dispatch(allactions.specimenActions.bioUrineOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioUrineOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioUrineOtherTime: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_feces_baseline': // specimen_id 27
                                    dispatch(allactions.specimenActions.bioFecesBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioFecesBaseline(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioFecesBaseline: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_feces_other_time': // specimen_id 28
                                    dispatch(allactions.specimenActions.bioFecesOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioFecesOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioFecesOtherTime: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_other_baseline': // specimen_id 29
                                    dispatch(allactions.specimenActions.bioOtherBaseline(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioOtherBaseline(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioOtherBaseline: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_other_other_time': // specimen_id 30
                                    dispatch(allactions.specimenActions.bioOtherOtherTime(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioOtherOtherTime(k_field_status))
                                    setG1to6FlagList({ ...g1to6FlagList, bioOtherOtherTime: specimenInfo[k].collected_yn })
                                    break
                                case 'bio_repeated_sample_same_individual': // specimen_id 31
                                    dispatch(allactions.specimenActions.bioRepeatedSampleSameIndividual(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(k_field_status))
                                    break
                                case 'bio_tumor_block_info': // specimen_id 32
                                    dispatch(allactions.specimenActions.bioTumorBlockInfo(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(k_field_status))
                                    break
                                case 'bio_genotyping_data': // specimen_id 33
                                    dispatch(allactions.specimenActions.bioGenotypingData(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioGenotypingData(k_field_status))
                                    break
                                case 'bio_sequencing_data_exome': // specimen_id 34
                                    dispatch(allactions.specimenActions.bioSequencingDataExome(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioSequencingDataExome(k_field_status))
                                    break
                                case 'bio_sequencing_data_whole_genome': // specimen_id 35
                                    dispatch(allactions.specimenActions.bioSequencingDataWholeGenome(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(k_field_status))
                                    break
                                case 'bio_epigenetic_or_metabolic_markers': // specimen_id 36
                                    dispatch(allactions.specimenActions.bioEpigeneticOrMetabolicMarkers(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(k_field_status))
                                    break
                                case 'bio_other_omics_data': // specimen_id 37
                                    dispatch(allactions.specimenActions.bioOtherOmicsData(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioOtherOmicsData(k_field_status))
                                    break
                                case 'bio_transcriptomics_data': // specimen_id 38
                                    dispatch(allactions.specimenActions.bioTranscriptomicsData(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(k_field_status))
                                    break
                                case 'bio_microbiome_data': // specimen_id 39
                                    dispatch(allactions.specimenActions.bioMicrobiomeData(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioMicrobiomeData(k_field_status))
                                    break
                                case 'bio_metabolomic_data': // specimen_id 40
                                    dispatch(allactions.specimenActions.bioMetabolomicData(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioMetabolomicData(k_field_status))
                                    if (isNull(specimenInfo[k].collected_yn) || +specimenInfo[k].collected_yn === 0) {
                                        dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(true))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(true))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(true))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(true))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(true))
                                        dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
                                        dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(true))
                                        dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(true))
                                        dispatch(allactions.specimenErrorActions.bioSeparationPlatform(true))
                                        dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
                                        dispatch(allactions.specimenErrorActions.bioMemberInStudy(true))
                                    }
                                    break
                                case 'bio_meta_fasting_sample': // specimen_id 41
                                    dispatch(allactions.specimenActions.bioMetaFastingSample(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioMetaFastingSample(k_field_status))
                                    break
                                case 'bio_meta_outcomes_in_cancer_study': // specimen_id 42
                                    dispatch(allactions.specimenActions.bioMetaOutcomesInCancerStudy(specimenInfo[k].collected_yn))

                                    if (specimenInfo[k].collected_yn) {
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(k_field_status))
                                    }
                                    break
                                case 'bio_meta_outcomes_in_cvd_study': // specimen_id 43
                                    dispatch(allactions.specimenActions.bioMetaOutcomesInCvdStudy(specimenInfo[k].collected_yn))
                                    if (specimenInfo[k].collected_yn) dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(k_field_status))
                                    break
                                case 'bio_meta_outcomes_in_diabetes_study': // specimen_id 44
                                    dispatch(allactions.specimenActions.bioMetaOutcomesInDiabetesStudy(specimenInfo[k].collected_yn))
                                    if (specimenInfo[k].collected_yn) dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(k_field_status))
                                    break
                                case 'bio_meta_outcomes_in_other_study': // specimen_id 45
                                    dispatch(allactions.specimenActions.bioMetaOutcomesInOtherStudy(specimenInfo[k].collected_yn))
                                    if (isNull(specimenInfo[k].collected_yn) || +specimenInfo[k].collected_yn === 0) {
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(true))
                                    } else {
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(true))
                                    }
                                    break
                                case 'bio_member_of_metabolomics_studies': // specimen_id 46
                                    dispatch(allactions.specimenActions.bioMemberOfMetabolomicsStudies(specimenInfo[k].collected_yn))
                                    dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(k_field_status))
                                    break
                                default:
                                    break

                            }
                            if (specimenInfo[k].sub_category === 'bio_metabolomic_data') {
                                metabolomicFieldsUpdate(![0, 1].includes(specimenInfo[k].collected_yn))
                            }
                        }
                        // details part
                        dispatch(allactions.specimenActions.bioAnalyticalPlatform(specimenDetails.bio_analytical_platform || ''))
                        dispatch(allactions.specimenActions.bioLabsUsedForAnalysis(specimenDetails.bio_labs_used_for_analysis || ''))
                        dispatch(allactions.specimenActions.bioMemberInStudy(specimenDetails.bio_member_in_study || ''))
                        dispatch(allactions.specimenActions.bioNumberMetabolitesMeasured(specimenDetails.bio_number_metabolites_measured || ''))
                        dispatch(allactions.specimenActions.bioOtherBaselineSpecify(specimenDetails.bio_other_baseline_specify || ''))
                        dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(specimenDetails.bio_other_other_time_specify || ''))
                        dispatch(allactions.specimenActions.bioSeparationPlatform(specimenDetails.bio_separation_platform || ''))
                        dispatch(allactions.specimenActions.bioYearSamplesSent(specimenDetails.bio_year_samples_sent || ''))

                        dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(!isNull(specimenDetails.bio_analytical_platform)))
                        dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(!isNull(specimenDetails.bio_labs_used_for_analysis)))
                        dispatch(allactions.specimenErrorActions.bioMemberInStudy(!isNull(specimenDetails.bio_member_in_study)))
                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(!isNull(specimenDetails.bio_meta_outcomes_other_study_specify)))
                        dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(!isNull(specimenDetails.bio_number_metabolites_measured)))
                        dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(!isNull(specimenDetails.bio_other_baseline_specify)))
                        dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(!isNull(specimenDetails.bio_other_other_time_specify)))
                        dispatch(allactions.specimenErrorActions.bioSeparationPlatform(!isNull(specimenDetails.bio_separation_platform)))
                        if (specimenDetails.bio_year_samples_sent && +specimenDetails.bio_year_samples_sent > 1900 && +specimenDetails.bio_year_samples_sent < 2100) {
                            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
                        } else {
                            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(false))
                        }

                    })
                }
                dispatch(allactions.specimenActions.setSpecimenLoaded(true))
                updateSecG1to6Flag()

            })
            .catch((error) => {
                console.log(error)
            })

    }, [cohortId])

    const metabolomicFieldsUpdate = (status = false) => {
        batch(() => {
            dispatch(allactions.specimenErrorActions.bioMetaFastingSample(status))
            dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(status))
            dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(status))
            dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(status))
            dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(status))
            dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(status))
            dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(status))
            dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(status))
            dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(status))
            dispatch(allactions.specimenErrorActions.bioSeparationPlatform(status))
            dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(status))
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(status))
            dispatch(allactions.specimenErrorActions.bioMemberInStudy(status))
            if (!status) {
                dispatch(allactions.specimenActions.bioMetaFastingSample(null))
                dispatch(allactions.specimenActions.bioMemberOfMetabolomicsStudies(null))
            }
        })
    }

    const g7to15FieldsUpdate = () => {
        batch(() => {
            dispatch(allactions.specimenActions.bioRepeatedSampleSameIndividual(0))
            dispatch(allactions.specimenActions.bioTumorBlockInfo(0))
            dispatch(allactions.specimenActions.bioGenotypingData(0))
            dispatch(allactions.specimenActions.bioSequencingDataExome(0))
            dispatch(allactions.specimenActions.bioSequencingDataWholeGenome(0))
            dispatch(allactions.specimenActions.bioEpigeneticOrMetabolicMarkers(0))
            dispatch(allactions.specimenActions.bioTranscriptomicsData(0))
            dispatch(allactions.specimenActions.bioMicrobiomeData(0))
            dispatch(allactions.specimenActions.bioMetabolomicData(0))
            dispatch(allactions.specimenActions.bioMetaFastingSample(0))
            dispatch(allactions.specimenActions.bioMemberOfMetabolomicsStudies(0))

            dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true))
            dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true))
            dispatch(allactions.specimenErrorActions.bioGenotypingData(true))
            dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true))
            dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true))
            dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true))
            dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true))
            dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true))
            dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
            dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
            dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
        })
    }

    const saveSpecimen = (id = 79, errorsRemain = true, proceed = false) => {

        let userID = userSession.id
        let specimenBody = specimen
        specimenBody["userID"] = userID

        fetch(`/api/questionnaire/update_specimen/${id}`, {
            method: "POST",
            body: JSON.stringify(specimenBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {

                if (result.status === 200) {
                    dispatch(setHasUnsavedChanges(false));
                    if (!errorsRemain)
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'incomplete'))
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
                            // window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                        } else dispatch(fetchCohort(cohortId))
                        if (result.data.status && result.data.status != cohortStatus) {
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
                            //dispatch(fetchCohort(result.data.duplicated_cohort_id)) /* if result.data.status present, duplicated_cohort_id is too */
                        }
                    }
                    if (!proceed) {
                        setSuccessMsg(true)
                    }
                    else
                        props.sectionPicker('G')
                } else {
                    setFailureMsg(true)
                }
            })
    }

    const handleSave = () => {
        setSaved(true)

        let errorsRemain = true;

        if (g1to6Flag === true) {
            errorsRemain = false;
        } else {
            errorsRemain = refreshErrors();
        }

        if (!errorsRemain) {
            specimen.sectionGStatus = 'complete'
            dispatch(allactions.specimenActions.setSectionGStatus('complete'))
            saveSpecimen(cohortId, errorsRemain)
        } else {
            //setDisplay('block')
            setModalShow(true)
        }
    }

    const handleSubmitForReview = () => {
        setReviewModalShow(true);
    }

    const confirmSaveStay = () => {
        specimen.sectionGStatus = 'incomplete'
        dispatch(allactions.specimenActions.setSectionGStatus('incomplete'));
        saveSpecimen(cohortId);
        setModalShow(false)
    }

    const g1to6List = ["bioBloodBaseline", "bioBloodOtherTime", "bioBuccalSalivaBaseline", "bioBuccalSalivaOtherTime",
        "bioTissueBaseline", "bioTissueOtherTime", "bioUrineBaseline", "bioUrineOtherTime",
        "bioFecesBaseline", "bioFecesOtherTime", "bioOtherBaseline", "bioOtherOtherTime"];

    useEffect(() => {

        let tempStatus = (specimen.bioBloodBaseline === 0 && specimen.bioBloodOtherTime === 0 && specimen.bioBuccalSalivaBaseline === 0 && specimen.bioBuccalSalivaOtherTime === 0
            && specimen.bioTissueBaseline === 0 && specimen.bioTissueOtherTime === 0 && specimen.bioUrineBaseline === 0 && specimen.bioUrineOtherTime === 0 &&
            specimen.bioFecesBaseline === 0 && specimen.bioFecesOtherTime === 0 && specimen.bioOtherBaseline === 0 && specimen.bioOtherOtherTime === 0);

        setG1to6Flag(tempStatus);

        if (tempStatus === true) {
            console.log("line 688 G1-6 all Nos updates" + specimen.bioBloodBaseline + " G1 " + specimen.bioBloodOtherTime)
            g7to15FieldsUpdate()
        }

    }, [g1to6FlagList, g1to6Flag])

    function updateSecG1to6Flag(field, value) {
        setG1to6FlagList({ ...g1to6FlagList, [field]: value });
    }

    function RadioButtonInput({ field_id, disabled_id }) {
        {/* field_id: , type : type of button
            disabled_id: disable-condition
            onChange : 
        */}
        let key = field_id

        const options = [
            { label: 'No', value: 0 },
            { label: 'Yes', value: 1 },
        ];
        return (
            options.map(({ label, value }, i) =>
                <Form.Check
                    id={`${key}_${value}`}
                    key={`${key}_${value}`}
                    inline
                    type="radio"
                    name={key}
                    label={label}
                    disabled={g1to6List.includes(key) ? '' : g1to6Flag ? true : isNull(disabled_id) ? '' : +specimen[disabled_id] !== 1}
                    // disabled={!g1to6Flag}
                    checked={specimen[key] === value}
                    readOnly={isReadOnly}
                    onChange={e => {
                        if (!isReadOnly) {
                            dispatch(allactions.specimenActions[key](value));
                            dispatch(allactions.specimenErrorActions[key](true));
                            dispatch(setHasUnsavedChanges(true));
                            if (+value === 1 && key === 'bioMetabolomicData') metabolomicFieldsUpdate();
                            else if (+value === 0 && key === 'bioOtherBaseline') dispatch(allactions.specimenActions.bioOtherBaselineSpecify(''));
                            else if (+value === 0 && key === 'bioOtherOtherTime') dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(''));
                        }
                        if (g1to6List.includes(key)) {
                            updateSecG1to6Flag(key, value)
                        }
                    }}
                />
            )
        );
    }

    function CheckBoxInput({ field_id, label, disabled_id }) {
        {/* field_id: , type : type of button
            disabled_id: disable-condition
            onChange : 
        */}
        let key = field_id

        return (
            <Form.Check type="checkbox"
                className="pl-0"
                id={key}
                key={key}
                name={key} >
                <Form.Check.Input bsPrefix
                    type="checkbox"
                    className="mr-2"
                    key={key}
                    disabled={g1to6List.includes(key) ? '' : g1to6Flag ? true : isNull(disabled_id) ? '' : +specimen[disabled_id] !== 1}
                    checked={specimen[key] === 1}
                    readOnly={isReadOnly}
                    onChange={e => {
                        if (!isReadOnly) {
                            dispatch(allactions.specimenActions[key](+e.target.checked));
                            dispatch(allactions.specimenErrorActions[key](e.target.checked));
                            dispatch(setHasUnsavedChanges(true));
                        }
                    }}
                />
                <Form.Check.Label style={{ fontWeight: 'normal' }}>
                    {label}
                </Form.Check.Label>
            </Form.Check>

        );
    }

    function CheckBoxInputs({ optionList }) {
        return optionList.map((option, i) =>
            <CheckBoxInput  {...option} />
        )
    }


    const getQuestionEntry = (field) => {
        const title = {
            0: 'Collected at baseline',
            1: 'Collected at other time points',
        };
        let item = field.items
        if (item && item.length === 2)
            return (
                <Form.Group as={Row}  >
                    <Form.Label column sm='12'>
                        {field.title}
                    </Form.Label>
                    {[0, 1].map((v, idx) => <>
                        <Col className='mb-0 pl-0' sm='12'>
                            <Col sm='5'>
                                <label className="required-label">{item[v].field_id.includes("Baseline") ? title[0] : title[1]}</label>
                            </Col>
                            <Col sm='7' >
                                <RadioButtonInput {...item[v]}
                                />
                                {errors[item[v].field_id] && saved && <span className="text-danger ml-3">Required Field</span>}
                            </Col>
                        </Col>
                    </>
                    )}

                </Form.Group >
            )
        else
            return (
                <Form.Group as={Row}>
                    <Form.Label column sm='12' >
                        {field.title}<span style={{ color: 'red' }}>*</span>
                        {(errors[item[0].field_id] && saved) && !g1to6Flag && <span className="ml-3 text-danger font-weight-normal">Required Field</span>}
                    </Form.Label>

                    <Col sm='12' className='mb-0 pl-0' >
                        <Col sm='4'>
                            <RadioButtonInput {...item[0]} />
                        </Col>
                    </Col>
                </Form.Group>
            )

    }

    const getPartContent = (partSelect = 'A') => {

        return fieldList.specimenFieldList.filter(field => field.part === partSelect).map(field => {
            if (field.title !== 'G.6 Other(e.g. toenails)') {//skip questions first

                return getQuestionEntry(field)

            } else if (field.title === 'G.6 Other(e.g. toenails)') {
                let item = field.items
                return <Form.Group as={Row} sm='12' className="mb-0" >

                    <Form.Label column sm='12' >
                        G.6 Other (e.g. toenails)
                    </Form.Label>

                    <Col className='mb-0 pl-0' sm="12" >
                        <Col sm='5'>
                            Collected at baseline<span style={{ color: 'red' }}>*</span>
                        </Col>
                        <Col sm='3' className='align-self-center' >
                            <RadioButtonInput {...item[0]}
                            />
                            {errors.bioOtherBaseline && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                        </Col>
                    </Col>

                    <Col sm="12" className={classNames("form-group", "align-self-center", saved && +specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify && "has-error")}>
                        <Form.Label className="pl-0" column sm="12" style={{ fontWeight: 'normal' }}>If yes, please specify</Form.Label>
                        <Reminder message={"Required Field"} disabled={!(saved && +specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify)} addspan={true} placement="right">
                            <Form.Control type='text'
                                name='bioOtherBaselineSpecify'
                                className='form-control'
                                key="bioOtherBaselineSpecify"
                                value={specimen.bioOtherBaselineSpecify}
                                readOnly={isReadOnly}
                                placeholder='Max of 200 characters'
                                maxLength={200}
                                disabled={specimen.bioOtherBaseline !== 1}
                                onChange={e => {
                                    dispatch(setHasUnsavedChanges(true));
                                    dispatch(allactions.specimenActions.bioOtherBaselineSpecify(e.target.value));
                                    dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(e.target.value))
                                }}
                            />
                        </Reminder>

                    </Col>

                    {/* <Col sm="12" className="align-self-center"> <br></br></Col> */}

                    {/* G6 OtherTime Specify */}

                    <Col sm="12" className='mb-0 pl-0'>
                        <Col sm='5'>
                            Collected at other time points<span style={{ color: 'red' }}>*</span>
                        </Col>
                        <Col sm='3' className='align-self-center' >
                            <RadioButtonInput {...item[1]}
                            />
                            {errors.bioOtherOtherTime && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                        </Col>
                    </Col>

                    <Col sm="12" className={classNames("form-group", "align-self-center", saved && errors.bioOtherOtherTimeSpecify && specimen.bioOtherOtherTime === 1 && "has-error")}>
                        <Form.Label className="pl-0" column sm="12" style={{ fontWeight: 'normal' }}>If yes, please specify</Form.Label>
                        <Reminder message={"Required Field"} disabled={!(saved && +specimen.bioOtherOtherTime === 1 && errors.bioOtherOtherTimeSpecify)} addspan={true} placement="right">
                            <Form.Control type='text'
                                name='bioOtherOtherTimeSpecify'
                                key="bioOtherOtherTimeSpecify"
                                className='form-control'
                                value={specimen.bioOtherOtherTimeSpecify}
                                readOnly={isReadOnly}
                                placeholder='Max of 200 characters'
                                maxLength={200}
                                disabled={specimen.bioOtherOtherTime !== 1}
                                onChange={e => {
                                    dispatch(setHasUnsavedChanges(true));
                                    dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(e.target.value));
                                    dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(e.target.value))
                                }}
                            />
                        </Reminder>

                    </Col>
                </Form.Group>


            }
        })
    }


    return (
        <Container>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
            {message.show && <Messenger message={message.content} severity={message.type} open={true} changeMessage={_ => updateMessage({ show: false })} />}
            <CenterModal
                headerClassName="border-bottom-0"
                titleClassName="my-2"
                bodyClassName="py-0"
                footerClassName="border-top-0"
                show={rejectionModal.show}
                title={<label htmlFor="review-comments" className="my-0">Review Comments</label>}
                body={<div className="px-3">
                    <Form.Control
                        id="review-comments"
                        as="textarea"
                        rows="5"
                        value={rejectionModal.notes}
                        onChange={ev => updateRejectionModal({ notes: ev.target.value })}
                        placeholder="Max of 250 Characters"
                        className="resize-disabled"
                        maxLength={250}
                    />
                </div>}
                footer={<>
                    <Button className="col-lg-2 col-md-6" variant="secondary" onClick={_ => updateRejectionModal({ show: false })}>Cancel</Button>
                    <Button className="col-lg-2 col-md-6" variant="primary" disabled={!rejectionModal.notes} onClick={handleReject}>Save</Button>
                </>} />
            <ReviewSubmitModal show={reviewModalShow}
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

            <ReviewApproveModal show={reviewApproveModalShow}
                title={
                    <span>
                        Publish Cohort
                    </span>
                }
                body={
                    <span>
                        This submitted cohort will be published on the CEDCD public website
                        once you click on Publish. Are you sure you want to continue?
                    </span>
                }
                footer={
                    <div>
                        <Button
                            variant="secondary"
                            className="col-lg-2 col-md-6"
                            onClick={_ => setReviewApproveModalShow(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="col-lg-2 col-md-6"
                            onClick={_ => handleApprove()}>
                            Publish
                        </Button>
                    </div>
                }
            />

            {modalShow && <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={confirmSaveStay} />}
            <Form>
                <CollapsiblePanelContainer>

                    {/* Specimen Collected */}
                    <CollapsiblePanel
                        condition={activePanel === 'panelA'}
                        onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                        panelTitle="Biospecimens Collected">

                        <div>
                            <p>
                                Specify the types of specimens you collected, whether the specimen
                                was collected at baseline, and/or collected at other time points.
                                </p>
                        </div>

                        <Form.Group as={Row}>
                            <Form.Label column sm='12' >
                                G.1 Blood
                                </Form.Label>
                            <Col className='mb-0 pl-0' sm="12" >
                                <Col sm='5'>
                                    <label className="required-label">Collected at baseline</label>
                                </Col>
                                <Col sm='3' className='align-self-center' >
                                    <RadioButtonInput field_id='bioBloodBaseline'
                                    />
                                    {(errors.bioBloodBaseline) && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}

                                </Col>
                                <Col sm="12">
                                    <div sm='12'>If collected, types of aliquots (select all that apply)<span style={{ color: 'red' }}>*</span>
                                        {+specimen.bioBloodBaseline === 1 && (specimen.bioBloodBaselineSerum === 0
                                            && specimen.bioBloodBaselinePlasma === 0 && specimen.bioBloodBaselineBuffyCoat === 0 && specimen.bioBloodBaselineOtherDerivative === 0)
                                            && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>} </div>
                                    <CheckBoxInputs optionList={[
                                        { field_id: 'bioBloodBaselineSerum', label: 'Serum', disabled_id: 'bioBloodBaseline' },
                                        { field_id: 'bioBloodBaselinePlasma', label: 'Plasma', disabled_id: 'bioBloodBaseline' },
                                        { field_id: 'bioBloodBaselineBuffyCoat', label: 'Buffy Coat', disabled_id: 'bioBloodBaseline' },
                                        { field_id: 'bioBloodBaselineOtherDerivative', label: 'Other Blood Derivative', disabled_id: 'bioBloodBaseline' }
                                    ]}
                                    />

                                </Col>
                            </Col>
                            <Col><br></br></Col>

                            <Col className='mb-0 pl-0' sm="12" >
                                <Col sm='5'>
                                    <label className="required-label">Collected at other time points</label>
                                </Col>

                                <Col sm='3' className='align-self-center' >
                                    <RadioButtonInput field_id='bioBloodOtherTime'
                                    />
                                    {(errors.bioBloodOtherTime) && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                                </Col>
                                <Col sm="12">
                                    <div sm='12'>If collected, types of aliquots (select all that apply)<span style={{ color: 'red' }}>*</span>
                                        {+specimen.bioBloodOtherTime === 1 && (specimen.bioBloodOtherTimeSerum === 0 && specimen.bioBloodOtherTimePlasma === 0 && specimen.bioBloodOtherTimeBuffyCoat === 0 && specimen.bioBloodOtherTimeOtherDerivative === 0)
                                            && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>} </div>
                                    <CheckBoxInputs optionList={[
                                        { field_id: 'bioBloodOtherTimeSerum', label: 'Serum', disabled_id: 'bioBloodOtherTime' },
                                        { field_id: 'bioBloodOtherTimePlasma', label: 'Plasma', disabled_id: 'bioBloodOtherTime' },
                                        { field_id: 'bioBloodOtherTimeBuffyCoat', label: 'Buffy Coat', disabled_id: 'bioBloodOtherTime' },
                                        { field_id: 'bioBloodOtherTimeOtherDerivative', label: 'Other Blood Derivative', disabled_id: 'bioBloodOtherTime' }
                                    ]}
                                    />
                                </Col>
                            </Col>
                        </Form.Group>
                        {/* G.2 -G.8  */}
                        {getPartContent('A')}
                    </CollapsiblePanel>

                    {/* Do you have ...? */}
                    <CollapsiblePanel
                        condition={activePanel === 'panelB'}
                        onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                        panelTitle="Additional Data Collected">
                        <div>
                            <p>
                                Do you collect the following data?
                                </p>
                        </div>
                        {getPartContent('B')}
                    </CollapsiblePanel>

                    {/* Metabolomic Data */}
                    <CollapsiblePanel
                        condition={activePanel === 'panelC'}
                        onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                        panelTitle="Metabolomics Data">

                        < Form.Group as={Row} sm='12'  >
                            <Form.Label column sm='8'>
                                G.15 Metabolomic Data (from MS and/or NMR)<span style={{ color: 'red' }}>*</span>
                                {(errors.bioMetabolomicData && saved) && !g1to6Flag && <span className="ml-3 text-danger font-weight-normal">Required Field</span>}
                            </Form.Label>

                            <Col className='align-self-center' sm='12'>
                                <RadioButtonInput field_id='bioMetabolomicData'
                                />
                            </Col>
                            <Col className='mt-3' sm='12'>
                                <div>If yes, please answer questions G.15a - G.15i</div>
                            </Col>
                        </Form.Group>

                        {/* G15 a */}
                        < Form.Group as={Row} sm='12'  >

                            <Form.Label column sm='12'>
                                G.15a Are the biospecimens collected fasting samples?<span style={{ color: 'red' }}>*</span>
                                {(+specimen.bioMetabolomicData === 1 && errors.bioMetaFastingSample) && saved && !g1to6Flag && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                            </Form.Label>
                            <Col className='align-self-center' sm='12'>
                                <RadioButtonInput field_id='bioMetaFastingSample' disabled_id='bioMetabolomicData'
                                />
                            </Col>
                        </Form.Group>

                        {/* G15 b */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15b What are the disease outcome(s) in your study?<span style={{ color: 'red' }}>*</span>
                                <span className="font-weight-normal">{' '}(Select all that apply)</span>
                                {(+specimen.bioMetabolomicData === 1 && errors.bioMetaOutcomesInCancerStudy
                                    && errors.bioMetaOutcomesInCvdStudy && errors.bioMetaOutcomesInDiabetesStudy && errors.bioMetaOutcomesInOtherStudy)
                                    && saved && !g1to6Flag && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}

                            </Form.Label>

                            <Col className='mb-0 pl-0' sm="12" >
                                <Col sm="12">
                                    <CheckBoxInputs optionList={[
                                        { field_id: 'bioMetaOutcomesInCancerStudy', label: 'Cancer', disabled_id: 'bioMetabolomicData' },
                                        { field_id: 'bioMetaOutcomesInCvdStudy', label: 'CVD', disabled_id: 'bioMetabolomicData' },
                                        { field_id: 'bioMetaOutcomesInDiabetesStudy', label: 'Diabetes', disabled_id: 'bioMetabolomicData' },
                                        { field_id: 'bioMetaOutcomesInOtherStudy', label: 'Other, specify:', disabled_id: 'bioMetabolomicData' }
                                    ]}
                                    />
                                </Col>
                            </Col>
                            <Col sm='12' className='align-self-center' >
                                <Reminder message='Required Field'
                                    disabled={!(+specimen.bioMetaOutcomesInOtherStudy === 1 && +specimen.bioMetabolomicData === 1 && errors.bioMetaOutcomesOtherStudySpecify && saved)} addspan={true}>
                                    <Form.Control as="textarea"
                                        className="resize-vertical"
                                        style={+specimen.bioMetaOutcomesInOtherStudy === 1 && +specimen.bioMetabolomicData === 1 && errors.bioMetaOutcomesOtherStudySpecify && saved && { border: '1px solid red' } || {}}
                                        name='bioMetaOutcomesOtherStudySpecify'
                                        className='form-control'
                                        value={specimen.bioMetaOutcomesOtherStudySpecify}
                                        maxLength={200}
                                        readOnly={isReadOnly}
                                        placeholder='Max of 200 characters'
                                        disabled={+g1to6Flag === 1 || +specimen.bioMetaOutcomesInOtherStudy !== 1 || +specimen.bioMetabolomicData !== 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioMetaOutcomesOtherStudySpecify(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>

                        {/* G15 c */}
                        < Form.Group as={Row} >

                            <Form.Label column sm='12'>
                                G.15c Are you a member of the Consortium of Metabolomics Studies (COMETS)?<span style={{ color: 'red' }}>*</span>
                                {(+specimen.bioMetabolomicData === 1 && errors.bioMemberOfMetabolomicsStudies) && saved && <span className="text-danger ml-3 font-weight-normal">Required Field</span>}
                            </Form.Label>
                            <Col className='align-self-center' sm='12'>
                                <RadioButtonInput field_id='bioMemberOfMetabolomicsStudies' disabled_id='bioMetabolomicData'
                                />
                            </Col>
                        </Form.Group>

                        {/* G15 d */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15d What is the number of participants with metabolomics data in your study?<span style={{ color: 'red' }}>*</span>

                            </Form.Label>
                            <Col sm="2">
                                <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioMemberInStudy && saved)} addspan={true}>
                                    <Form.Control type="text"
                                        className="resize-vertical"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioMemberInStudy && saved && { border: '1px solid red' } || {}}
                                        name='bioMemberInStudy'
                                        value={specimen.bioMemberInStudy}
                                        maxLength={15}
                                        readOnly={isReadOnly}
                                        placeholder='Valid number'
                                        disabled={isReadOnly || +specimen.bioMetabolomicData !== 1 || +g1to6Flag === 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioMemberInStudy(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioMemberInStudy(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioMemberInStudy(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>

                        {/* G15 e */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15e Which laboratory or company was used for the analysis?<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Col sm="12">
                                <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioLabsUsedForAnalysis && saved)} addspan={true}>
                                    <Form.Control as="textarea"
                                        className="resize-vertical"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioLabsUsedForAnalysis && saved && { border: '1px solid red' } || {}}
                                        name='bioLabsUsedForAnalysis'
                                        value={specimen.bioLabsUsedForAnalysis}
                                        maxLength={200}
                                        readOnly={isReadOnly}
                                        placeholder='Max of 200 characters'
                                        disabled={isReadOnly || +specimen.bioMetabolomicData !== 1 || +g1to6Flag === 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioLabsUsedForAnalysis(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>

                        {/* G15 f */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15f Which type(s) of analytical platform was used, (e.g., NMR, Orbitrap mass spectrometry, QTOF mass spectrometry)?<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Col sm="12">
                                <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioAnalyticalPlatform && saved)} addspan={true}>
                                    <Form.Control as="textarea"
                                        className="resize-vertical"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioAnalyticalPlatform && saved && { border: '1px solid red' } || {}}
                                        name='bioAnalyticalPlatform'
                                        value={specimen.bioAnalyticalPlatform}
                                        maxLength={200}
                                        readOnly={isReadOnly}
                                        placeholder='Max of 200 characters'
                                        disabled={isReadOnly || +specimen.bioMetabolomicData !== 1 || +g1to6Flag === 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioAnalyticalPlatform(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>

                        {/* G15 g*/}

                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15g Which separation platform(s) was used (e.g., GC, HILIC, RPLC, Ion pairing LC)?<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Col sm="12">
                                <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioSeparationPlatform && saved)} addspan={true}>
                                    <Form.Control as="textarea"
                                        className="resize-vertical"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioSeparationPlatform && saved && { border: '1px solid red' } || {}}
                                        name='bioSeparationPlatform'
                                        value={specimen.bioSeparationPlatform}
                                        maxLength={200}
                                        readOnly={isReadOnly}
                                        placeholder='Max of 200 characters'
                                        disabled={isReadOnly || +specimen.bioMetabolomicData !== 1 || +g1to6Flag === 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioSeparationPlatform(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioSeparationPlatform(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioSeparationPlatform(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>


                        {/* G15 h */}

                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15h How many metabolites were measured?<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Col sm="2">
                                <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioNumberMetabolitesMeasured && saved)} addspan={true}>
                                    <Form.Control type="text"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioNumberMetabolitesMeasured && saved && { border: '1px solid red' } || {}}
                                        name='bioNumberMetabolitesMeasured'
                                        value={specimen.bioNumberMetabolitesMeasured}
                                        maxLength={15}
                                        readOnly={isReadOnly}
                                        placeholder='Valid number'
                                        disabled={isReadOnly || +specimen.bioMetabolomicData !== 1 || +g1to6Flag === 1}
                                        onChange={e => {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions.bioNumberMetabolitesMeasured(e.target.value));
                                            if (!isNull(e.target.value)) dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(true))
                                        }}
                                        onBlur={(e) => dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(!isNull(e.target.value)))}
                                    /> </Reminder>
                            </Col>
                        </Form.Group>

                        {/* G15 i */}
                        <Form.Group as={Row}>
                            <Form.Label column sm="12">
                                G.15i What year were samples analyzed?<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Col sm='2'  >
                                <Reminder message={g15yearErrMsg || 'Required Field'} disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioYearSamplesSent && saved)} addspan={true}>
                                    <Form.Control type="text"
                                        style={+specimen.bioMetabolomicData === 1 && errors.bioYearSamplesSent && saved && { border: '1px solid red' } || {}}
                                        name='bioYearSamplesSent'
                                        maxLength={4}
                                        disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly || +g1to6Flag === 1}
                                        value={specimen.bioYearSamplesSent} readOnly={isReadOnly}
                                        onChange={e => {
                                            !isReadOnly && dispatch(allactions.specimenActions.bioYearSamplesSent(e.target.value));
                                            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(!isNull(e.target.value)))
                                        }
                                        }
                                        placeholder='YYYY'
                                        onBlur={e =>
                                            populateErrors(e.target.value, true, 'year')
                                        } />
                                </Reminder>

                            </Col>
                        </Form.Group>

                    </CollapsiblePanel>

                    {/* Biospecimen Counts */}
                    <CollapsiblePanel
                        condition={activePanel === 'panelD'}
                        onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}
                        panelTitle="Biospecimens Counts">
                        <div className="my-3">
                            <Form.Label> G.16</Form.Label>
                            <div> Please complete this table with the number of individuals with biospecimens available
                            in your current inventory. If you do not have exact counts, please enter approximate counts.
                            (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.)
                                        </div>
                        </div>
                        <div className="table-responsive m-0">
                            <Table bordered condensed className="table-valign-middle">
                                <thead>
                                    <tr>
                                        <th className='col-sm-1 text-center'>ICD-9</th>
                                        <th className='col-sm-1 text-center'>ICD-10</th>
                                        <th className='col-sm-3 text-center'>Cancer Site/Type</th>
                                        <th className='col-sm-1 text-center'>Serum and/or Plasma</th>
                                        <th className='col-sm-1 text-center'>Buffy Coat and/or Lymphocytes</th>
                                        <th className='col-sm-1 text-center'>Saliva and/or Buccal</th>
                                        <th className='col-sm-1 text-center'>Urine</th>
                                        <th className='col-sm-1 text-center'>Feces</th>
                                        <th className='col-sm-1 text-center'>Tumor Tissue Fresh/Frozen</th>
                                        <th className='col-sm-1 text-center'>Tumor Tissue FFPE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lookup.cancer.map(c => {
                                        const keyPrefix = `${cohortId}_${c.id}`;
                                        const inputKeys = lookup.specimen.filter(k => { return k.id < 10; }).map((k) =>
                                            `${c.id}-${k.id}`);;


                                        return <tr key={keyPrefix}>
                                            <td className={classNames("text-nowrap", c.icd9 ? "bg-light-grey" : "bg-grey")}>{c.icd9}</td>
                                            <td className={classNames("text-nowrap", c.icd10 ? "bg-light-grey" : "bg-grey")}>{c.icd10}</td>
                                            <td className="text-nowrap bg-light-grey">{c.cancer}</td>

                                            {inputKeys.map((key, i) =>
                                                <td key={key} className="p-0">
                                                    <Form.Control
                                                        className="input-number"
                                                        name={key} value={specimen.counts[key] || 0}
                                                        type="number"
                                                        onChange={e => {
                                                            dispatch(allactions.specimenActions.setSpecimenCount(key, e.target.value));
                                                            dispatch(setHasUnsavedChanges(true));
                                                        }}
                                                        min="0"
                                                        disabled={+g1to6Flag === 1}
                                                        readOnly={isReadOnly} />
                                                </td>
                                            )}
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </div>

                    </CollapsiblePanel>
                </CollapsiblePanelContainer>

            </Form>

            <QuestionnaireFooter
                isAdmin={isReadOnly}
                handlePrevious={_ => props.sectionPicker('F')}
                handleNext={false}
                handleSave={handleSave}
                handleSaveContinue={false}
                handleSubmitForReview={handleSubmitForReview}
                handleApprove={updateStatusDisabled ? null : _ => setReviewApproveModalShow(true)}
                handleReject={updateStatusDisabled ? null : _ => updateRejectionModal({ show: true })} />

        </Container>

    )
}

export default SpecimenForm