import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import classNames from 'classnames'
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../controls/modal/modal'
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import * as fieldList from './specimenFieldList';

import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';

const SpecimenForm = ({ ...props }) => {

    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const dispatch = useDispatch()
    const errors = useSelector(state => state.specimenInfoErrorReducer)
    const isReadOnly = props.isReadOnly;
    const lookup = useSelector(state => state.lookupReducer)
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)

    const [activePanel, setActivePanel] = useState('panelA')
    const [failureMsg, setFailureMsg] = useState(false)
    const [message, setMessage] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [userEmails, setEmails] = useState('')
    //const cohortId = window.location.pathname.split('/').pop();

    const getValidationResult = (value, requiredOrNot, type) => {
        switch (type) {
            case 'date':
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            default:
                return validator.stringValidator(value, requiredOrNot)
        }
    }

    const populateErrors = (value, requiredOrNot, valueType) => {

        const result = getValidationResult(value, requiredOrNot, valueType)
        if (result) {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(false))
        } else {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
        }
    }

    const isNull = v => ['', undefined, null].includes(v)

    const refreshErrors = () => (errors.bioBloodBaseline && errors.bioBloodOtherTime) || /* G1 */
        (errors.bioBloodBaseline && (errors.bioBloodBaselineSerum || errors.bioBloodBaselinePlasma || errors.bioBloodBaselineBuffyCoat || errors.bioBloodBaselineOtherDerivative)) ||
        (errors.bioBloodOtherTime && (errors.bioBloodOtherTimeSerum || errors.bioBloodOtherTimePlasma || errors.bioBloodOtherTimeBuffyCoat || errors.bioBloodOtherTimeOtherDerivative)) ||
        (errors.bioBuccalSalivaBaseline && errors.bioBuccalSalivaOtherTime) || /* G2 */
        (errors.bioTissueBaseline && errors.bioTissueOtherTime) || /* G3 */
        (errors.bioUrineBaseline && errors.bioUrineOtherTime) || /* G4 */
        (errors.bioFecesBaseline && errors.bioFecesOtherTime) || /* G5 */
        (errors.bioOtherBaseline && errors.bioOtherOtherTime) || /* G6 */
        (+specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify) || /* G6 -specify */
        (+specimen.bioOtherOtherTime === 1 && errors.bioOtherOtherTimeSpecify) || /* G6 -specify */
        (errors.bioRepeatedSampleSameIndividua) || /* G7 */
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

    console.log(fieldList)

    useEffect(() => {
        if (!specimen.specimenLoaded) {
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
                                if (specimenCounts[k]) dispatch(allactions.specimenActions.setSpecimenCount(k, specimenCounts[k].toString()))
                            }
                            for (let k of Object.keys(specimenInfo)) {
                                if ([0, 1].includes(specimenInfo[k].collected_yn)) {
                                    switch (specimenInfo[k].sub_category) {
                                        case 'bio_blood_baseline': // specimen_id 11
                                            dispatch(allactions.specimenActions.bioBloodBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodBaseline(true))
                                            break
                                        case 'bio_blood_baseline_serum': // specimen_id 12
                                            dispatch(allactions.specimenActions.bioBloodBaselineSerum(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(true))
                                            break
                                        case 'bio_blood_baseline_plasma': // specimen_id 13
                                            dispatch(allactions.specimenActions.bioBloodBaselinePlasma(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselinePlasma(true))
                                            break
                                        case 'bio_blood_baseline_buffy_coat': // specimen_id 14
                                            dispatch(allactions.specimenActions.bioBloodBaselineBuffyCoat(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(true))
                                            break
                                        case 'bio_blood_baseline_other_derivative': // specimen_id 15
                                            dispatch(allactions.specimenActions.bioBloodBaselineOtherDerivative(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(true))
                                            break
                                        case 'bio_blood_other_time': // specimen_id 16
                                            dispatch(allactions.specimenActions.bioBloodOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true))
                                            break
                                        case 'bio_blood_other_time_serum': // specimen_id 17
                                            dispatch(allactions.specimenActions.bioBloodOtherTimeSerum(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(true))
                                            break
                                        case 'bio_blood_other_time_plasma': // specimen_id 18
                                            dispatch(allactions.specimenActions.bioBloodOtherTimePlasma(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(true))
                                            break
                                        case 'bio_blood_other_time_buffy_coat': // specimen_id 19
                                            dispatch(allactions.specimenActions.bioBloodOtherTimeBuffyCoat(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(true))
                                            break
                                        case 'bio_blood_other_time_other_derivative': // specimen_id 20
                                            dispatch(allactions.specimenActions.bioBloodOtherTimeOtherDerivative(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(true))
                                            break
                                        case 'bio_buccal_saliva_baseline': // specimen_id 21
                                            dispatch(allactions.specimenActions.bioBuccalSalivaBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(true))
                                            break
                                        case 'bio_buccal_saliva_other_time': // specimen_id 22
                                            dispatch(allactions.specimenActions.bioBuccalSalivaOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(true))
                                            break
                                        case 'bio_tissue_baseline': // specimen_id 23
                                            dispatch(allactions.specimenActions.bioTissueBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioTissueBaseline(true))
                                            break
                                        case 'bio_tissue_other_time': // specimen_id 24
                                            dispatch(allactions.specimenActions.bioTissueOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioTissueOtherTime(true))
                                            break
                                        case 'bio_urine_baseline': // specimen_id 25
                                            dispatch(allactions.specimenActions.bioUrineBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioUrineBaseline(true))
                                            break
                                        case 'bio_urine_other_time': // specimen_id 26
                                            dispatch(allactions.specimenActions.bioUrineOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioUrineOtherTime(true))
                                            break
                                        case 'bio_feces_baseline': // specimen_id 27
                                            dispatch(allactions.specimenActions.bioFecesBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioFecesBaseline(true))
                                            break
                                        case 'bio_feces_other_time': // specimen_id 28
                                            dispatch(allactions.specimenActions.bioFecesOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioFecesOtherTime(true))
                                            break
                                        case 'bio_other_baseline': // specimen_id 29
                                            dispatch(allactions.specimenActions.bioOtherBaseline(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioOtherBaseline(true))
                                            break
                                        case 'bio_other_other_time': // specimen_id 30
                                            dispatch(allactions.specimenActions.bioOtherOtherTime(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true))
                                            break
                                        case 'bio_repeated_sample_same_individual': // specimen_id 31
                                            dispatch(allactions.specimenActions.bioRepeatedSampleSameIndividual(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true))
                                            break
                                        case 'bio_tumor_block_info': // specimen_id 32
                                            dispatch(allactions.specimenActions.bioTumorBlockInfo(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true))
                                            break
                                        case 'bio_genotyping_data': // specimen_id 33
                                            dispatch(allactions.specimenActions.bioGenotypingData(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioGenotypingData(true))
                                            break
                                        case 'bio_sequencing_data_exome': // specimen_id 34
                                            dispatch(allactions.specimenActions.bioSequencingDataExome(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true))
                                            break
                                        case 'bio_sequencing_data_whole_genome': // specimen_id 35
                                            dispatch(allactions.specimenActions.bioSequencingDataWholeGenome(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true))
                                            break
                                        case 'bio_epigenetic_or_metabolic_markers': // specimen_id 36
                                            dispatch(allactions.specimenActions.bioEpigeneticOrMetabolicMarkers(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true))
                                            break
                                        case 'bio_other_omics_data': // specimen_id 37
                                            dispatch(allactions.specimenActions.bioOtherOmicsData(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioOtherOmicsData(true))
                                            break
                                        case 'bio_transcriptomics_data': // specimen_id 38
                                            dispatch(allactions.specimenActions.bioTranscriptomicsData(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true))
                                            break
                                        case 'bio_microbiome_data': // specimen_id 39
                                            dispatch(allactions.specimenActions.bioMicrobiomeData(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true))
                                            break
                                        case 'bio_metabolomic_data': // specimen_id 40
                                            dispatch(allactions.specimenActions.bioMetabolomicData(specimenInfo[k].collected_yn))
                                            dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
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
                                            dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
                                            break
                                        case 'bio_meta_outcomes_in_cancer_study': // specimen_id 42
                                            dispatch(allactions.specimenActions.bioMetaOutcomesInCancerStudy(specimenInfo[k].collected_yn))

                                            if (specimenInfo[k].collected_yn) {
                                                dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(true))
                                            }
                                            break
                                        case 'bio_meta_outcomes_in_cvd_study': // specimen_id 43
                                            dispatch(allactions.specimenActions.bioMetaOutcomesInCvdStudy(specimenInfo[k].collected_yn))
                                            if (specimenInfo[k].collected_yn) dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(true))
                                            break
                                        case 'bio_meta_outcomes_in_diabetes_study': // specimen_id 44
                                            dispatch(allactions.specimenActions.bioMetaOutcomesInDiabetesStudy(specimenInfo[k].collected_yn))
                                            if (specimenInfo[k].collected_yn) dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(true))
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
                                            dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
                                            break
                                        default:
                                            break

                                    }
                                } else if (specimenInfo[k].sub_category === 'bio_metabolomic_data') {
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
                            }
                            // details part
                            dispatch(allactions.specimenActions.bioAnalyticalPlatform(specimenDetails.bio_analytical_platform))
                            dispatch(allactions.specimenActions.bioLabsUsedForAnalysis(specimenDetails.bio_labs_used_for_analysis))
                            dispatch(allactions.specimenActions.bioMemberInStudy(specimenDetails.bio_member_in_study))
                            dispatch(allactions.specimenActions.bioNumberMetabolitesMeasured(specimenDetails.bio_number_metabolites_measured))
                            dispatch(allactions.specimenActions.bioOtherBaselineSpecify(specimenDetails.bio_other_baseline_specify))
                            dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(specimenDetails.bio_other_other_time_specify))
                            dispatch(allactions.specimenActions.bioSeparationPlatform(specimenDetails.bio_separation_platform))
                            dispatch(allactions.specimenActions.bioYearSamplesSent(specimenDetails.bio_year_samples_sent))

                            if (!isNull(specimenDetails.bio_analytical_platform)) dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(true))
                            if (!isNull(specimenDetails.bio_labs_used_for_analysis)) dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(true))
                            if (!isNull(specimenDetails.bio_member_in_study)) dispatch(allactions.specimenErrorActions.bioMemberInStudy(true))
                            if (!isNull(specimenDetails.bio_meta_outcomes_other_study_specify)) dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(true))
                            if (!isNull(specimenDetails.bio_number_metabolites_measured)) dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(true))
                            if (!isNull(specimenDetails.bio_other_baseline_specify)) dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(true))
                            if (!isNull(specimenDetails.bio_other_other_time_specify)) dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(true))
                            if (!isNull(specimenDetails.bio_separation_platform)) dispatch(allactions.specimenErrorActions.bioSeparationPlatform(true))
                            if (specimenDetails.bio_year_samples_sent && +specimenDetails.bio_year_samples_sent > 1900 && +specimenDetails.bio_year_samples_sent < 2100)
                                dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))

                        })
                    }
                    dispatch(allactions.specimenActions.setSpecimenLoaded(true))

                })
                .catch((error) => {
                    console.log(error)
                })

            console.log(specimen)
        } // end if
    }, [])

    const saveSpecimen = (id = 79, errorsRemain = true, proceed = false) => {

        const { errors, error, ...specimenBody } = specimen

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
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                            window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                        }
                        if (result.data.status && result.data.status != cohortStatus) {
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
                            dispatch(fetchCohort(result.data.duplicated_cohort_id)) /* if result.data.status present, duplicated_cohort_id is too */
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
        let errorsRemain = refreshErrors()

        if (!errorsRemain) {
            specimen.sectionGStatus = 'complete'
            dispatch(allactions.specimenActions.setSectionGStatus('complete'))
            saveSpecimen(cohortId, errorsRemain)
        } else {
            //setDisplay('block')
            setModalShow(true)
        }
    }

    const confirmSaveStay = () => {
        specimen.sectionGStatus = 'incomplete'
        dispatch(allactions.specimenActions.setSectionGStatus('incomplete'));
        saveSpecimen(cohortId);
        setModalShow(false)
    }

    const handleApprove = () => {
        resetReviewCohortStatus(cohortId, 'published')
    }

    const handleReject = () => {
        resetReviewCohortStatus(cohortId, 'returned')
    }

    const resetReviewCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        setMessage('Your changes were saved.')
                        setSuccessMsg(true)
                        sendEmail()
                    }
                    else {
                        setMessage('Your changes could not be saved.')
                        setFailureMsg(true)
                    }
                })
        }
    }

    const sendEmail = () => {
        let reqBody = {
            // firstname:'joe',
            //  lastname:'zhao',
            // organization:'NIH',
            //  phone:'',
            email: userEmails,
            topic: 'test',
            message: 'this is test on sending email'
        };
        fetch('/api/questionnaire/sendEmail', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {
                    setMessage('email was sent')
                    let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
                else {
                    setMessage('email failed to be sent')
                    let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
            })
    }

    const getQuestionEntry = (field) => {
        let item = field.items
        if (item && item.length === 2)
            return (
                < Form.Group as={Row} sm='12'  >

                    <Form.Label column sm='12'>
                        {field.title}
                    </Form.Label>

                    <Col className='mb-0 pl-0' sm='12'>
                        <Col sm='4'>
                            <span>Collected at baseline {item[0].required && <span style={{ color: 'red' }}>*</span>}</span>
                        </Col>
                        <Reminder message='Required Field' disabled={!(errors[item[0].field_id] && saved)}>
                            <Col sm='3' className='align-self-center'>
                                <Form.Check type="radio" xs='2'
                                    id={item[0].field_id + '_no'}
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name={item[0].field_id}>
                                    <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                        checked={specimen[item[0].field_id] === 0}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions[item[0].field_id](0));
                                                dispatch(allactions.specimenErrorActions[item[0].field_id](true))
                                            }
                                        }} />
                                    <Form.Check.Label
                                        style={errors[item[0].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}
                                    >
                                        No
                                        </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio" xs='2'
                                    id={item[0].field_id + '_yes'}
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name={item[0].field_id}>
                                    <Form.Check.Input bsPrefix type='radio' className='mr-2' checked={specimen[item[0].field_id] === 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions[item[0].field_id](1));
                                                dispatch(allactions.specimenErrorActions[item[0].field_id](true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors[item[0].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        Yes
                            </Form.Check.Label>
                                </Form.Check>
                            </Col>
                        </Reminder>
                    </Col>

                    <Col className='mb-0 pl-0' sm='12'>
                        <Col sm='4'>
                            Collected at other time points  {item[1].required && <span style={{ color: 'red' }}>*</span>}
                        </Col>
                        <Reminder message='Required Field' disabled={!(errors[item[1].field_id] && saved)}>
                            <Col sm='3' className='align-self-center' >
                                <Form.Check type="radio" xs='2'
                                    id={item[1].field_id + '_no'}
                                    inline
                                    style={{ fontWeight: 'normal ' }}
                                    name={item[1].field_id}>
                                    <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                        checked={specimen[item[1].field_id] === 0}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions[item[1].field_id](0));
                                                dispatch(allactions.specimenErrorActions[item[1].field_id](true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors[item[1].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        No
                                       </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio" xs='2'
                                    id={item[1].field_idy + '_yes'}
                                    inline
                                    style={{ fontWeight: 'normal ' }}
                                    name={item[1].field_id}>
                                    <Form.Check.Input bsPrefix type='radio' className='mr-2' checked={specimen[item[1].field_id] === 1}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions[item[1].field_id](1));
                                                dispatch(allactions.specimenErrorActions[item[1].field_id](true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors[item[1].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        Yes
                                       </Form.Check.Label>
                                </Form.Check>
                            </Col>
                        </Reminder>
                    </Col>
                </Form.Group>
            )
        else
            return (
                < Form.Group as={Row} sm='12'  >
                    <Form.Group as={Row} className="mb-0 pl-4">
                        <Form.Label column sm='12'>
                            <span> {field.title} </span> {item[0].required && <span style={{ color: 'red' }}>*</span>}
                        </Form.Label>
                    </Form.Group>
                    <Col className='align-self-center' sm='12'>
                        <Reminder message='Required Field' disabled={!(errors[item[0].field_id] && saved)}>
                            <Form.Check type="radio" xs='2'
                                id={item[0].field_id + '_no'}
                                inline
                                style={{ fontWeight: 'normal' }}
                                name={item[0].field_id}>
                                <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                    checked={specimen[item[0].field_id] === 0}
                                    readOnly={isReadOnly}
                                    onClick={() => {
                                        if (!isReadOnly) {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions[item[0].field_id](0));
                                            dispatch(allactions.specimenErrorActions[item[0].field_id](true))
                                        }
                                    }} />
                                <Form.Check.Label
                                    style={errors[item[0].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}
                                >
                                    No
                                </Form.Check.Label>
                            </Form.Check>
                            <Form.Check type="radio" xs='2'
                                id={item[0].field_id + '_yes'}
                                inline
                                style={{ fontWeight: 'normal' }}
                                name={item[0].field_id}>
                                <Form.Check.Input bsPrefix type='radio' className='mr-2' checked={specimen[item[0].field_id] === 1}
                                    readOnly={isReadOnly}
                                    onClick={() => {
                                        if (!isReadOnly) {
                                            dispatch(setHasUnsavedChanges(true));
                                            dispatch(allactions.specimenActions[item[0].field_id](1));
                                            dispatch(allactions.specimenErrorActions[item[0].field_id](true))
                                        }
                                    }} />
                                <Form.Check.Label style={errors[item[0].field_id] && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                    Yes
                            </Form.Check.Label>
                            </Form.Check>
                        </Reminder>
                    </Col>

                </Form.Group>
            )

    }


    const getPartContent = (partSelect = 'A') => {
        console.log(fieldList.specimenFieldList.filter(field => field.part === partSelect).map(field => console.log(field)))
        return fieldList.specimenFieldList.filter(field => field.part === partSelect).map(field => {
            if (field && field.title !== 'G.6 Other(e.g. toenails)') {//skip questions first

                return getQuestionEntry(field)

            } else if (field.title === 'G.6 Other(e.g. toenails)') {
                return <Form.Group as={Row} sm='12' >
                    <Form.Label as={Row} sm='12' className='pl-5' >
                        G.6 Other(e.g. toenails) (Select all that apply)
                    </Form.Label>

                    <Col className='mb-0 pl-0' sm="12" >
                        <Col sm='4'>
                            Collected at baseline   <span style={{ color: 'red' }}>*</span>
                        </Col>
                        <Reminder message='Required Field' disabled={!(errors.bioOtherBaseline && saved)}>
                            <Col sm='3' className='align-self-center' >
                                <Form.Check type='radio' xs='2' name='bioOtherBaseline' inline style={{ fontWeight: 'normal' }} id="bioOtherBaseline_no" >
                                    <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                        checked={specimen.bioOtherBaseline === 0} readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioOtherBaseline(0));
                                                dispatch(allactions.specimenActions.bioOtherBaselineSpecify(''));
                                                dispatch(allactions.specimenErrorActions.bioOtherBaseline(true))
                                            }
                                        }}
                                    />
                                    <Form.Check.Label style={errors.bioOtherBaseline && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                        : { fontWeight: 'normal' }}
                                    >
                                        No
                                </Form.Check.Label>
                                </Form.Check>

                                <Form.Check type='radio' xs='2' name='bioOtherBaseline' style={{ fontWeight: 'normal' }} inline id='bioOtherBaseline_yes' >
                                    <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                        checked={specimen.bioOtherBaseline === 1} readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioOtherBaseline(1));
                                                dispatch(allactions.specimenErrorActions.bioOtherBaseline(true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors.bioOtherBaseline && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                        : { fontWeight: 'normal' }}>
                                        Yes
                                </Form.Check.Label>
                                </Form.Check>
                            </Col>
                        </Reminder>
                    </Col>

                    <Form.Label column sm="12">If yes, please specify:</Form.Label>
                    <Col sm='12' className='align-self-center' >
                        <Reminder message='Required Field' disabled={!(specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify && saved)} >
                            <Form.Control as="textarea"
                                className="resize-vertical"
                                style={specimen.bioOtherBaseline === 1 && errors.bioOtherBaselineSpecify && saved && { border: '1px solid red' } || {}}
                                name='bioOtherBaselineSpecify'
                                value={specimen.bioOtherBaselineSpecify}
                                maxLength={200}
                                readOnly={isReadOnly}
                                placeholder='Max of 200 characters'
                                disabled={specimen.bioOtherBaseline !== 1}
                                onChange={e => { dispatch(setHasUnsavedChanges(true)); dispatch(allactions.specimenActions.bioOtherBaselineSpecify(e.target.value)) }}
                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(true))}
                            /> </Reminder>
                    </Col>

                    <Col sm="12" className="align-self-center"> <br></br></Col>

                    {/* G6 OtherTime Specify */}

                    <Col className='mb-0 pl-0' sm="12" >
                        <Col sm='4'>
                            Collected at other time points   <span style={{ color: 'red' }}>*</span>
                        </Col>
                        <Reminder message='Required Field' disabled={!(errors.bioOtherOtherTime && saved)}>
                            <Col sm='3' className='align-self-center' >

                                <Form.Check type='radio' xs='2' name='bioOtherOtherTime' inline style={{ fontWeight: 'normal' }} id="bioOtherOtherTime_no" >
                                    <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                        checked={specimen.bioOtherOtherTime === 0} readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioOtherOtherTime(0));
                                                dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(''));
                                                dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true))
                                            }
                                        }}
                                    />
                                    <Form.Check.Label style={errors.bioOtherOtherTime && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                        : { fontWeight: 'normal' }}
                                    >
                                        No
                                </Form.Check.Label>
                                </Form.Check>

                                <Form.Check type='radio' xs='2' name='bioOtherOtherTime' style={{ fontWeight: 'normal' }} inline id='bioOtherOtherTime_yes' >
                                    <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                        checked={specimen.bioOtherOtherTime === 1} readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioOtherOtherTime(1));
                                                dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors.bioOtherOtherTime && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                        : { fontWeight: 'normal' }}>
                                        Yes
                                </Form.Check.Label>
                                </Form.Check>
                            </Col>
                        </Reminder>
                    </Col>
                    <Form.Label column sm="12">If yes, please specify:</Form.Label>
                    <Col sm='12' className='align-self-center' >
                        <Reminder message='Required Field' disabled={!(specimen.bioOtherOtherTime === 1 && errors.bioOtherOtherTimeSpecify && saved)} >
                            <Form.Control as="textarea"
                                className="resize-vertical"
                                style={specimen.bioOtherOtherTime === 1 && errors.bioOtherOtherTimeSpecify && saved && { border: '1px solid red' } || {}}
                                name='bioOtherOtherTimeSpecify'
                                value={specimen.bioOtherOtherTimeSpecify}
                                maxLength={200}
                                readOnly={isReadOnly}
                                placeholder='Max of 200 characters'
                                disabled={specimen.bioOtherOtherTime !== 1}
                                onChange={e => { dispatch(setHasUnsavedChanges(true)); dispatch(allactions.specimenActions.bioOtherOtherTimeSpecify(e.target.value)) }}
                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(true))}
                            /> </Reminder>
                    </Col>
                </Form.Group>
            }
        })
    }


    return (
        <div id='specimenInfoContainer' className="p-3 px-5">

            {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
            <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={confirmSaveStay} />

            <Form>

                {/* START Specimen */}
                <CollapsiblePanel
                    condition={activePanel === 'panelA'}
                    onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
                    panelTitle="Specimen Collected">

                    <div>
                        Specify the types of specimens you collected, whether the speimen was collected at baseline, and/or collected at other time points.
                            </div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">
                            G.1 Blood  <span style={{ color: 'red' }}>*</span>
                            {(errors.bioBloodBaseline && errors.bioBloodOtherTime) && saved
                                && <span className='col-md-4 col-12' style={{ color: 'red' }}>
                                    Missing required field</span>}
                        </Form.Label>

                        <Col className='mb-0 pl-0' sm="12" >
                            <Col sm='4'>
                                Collected at baseline   <span style={{ color: 'red' }}>*</span>
                            </Col>
                            <Reminder message='Required Field' disabled={!(errors.bioBloodBaseline && saved)}>
                                <Col sm='3' className='align-self-center' >
                                    <Form.Check type='radio' xs='2' name='bioBloodBaseline' inline style={{ fontWeight: 'normal' }} id="bioBloodBaseline_no" >
                                        <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                            checked={specimen.bioBloodBaseline === 0} readOnly={isReadOnly}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaseline(0));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaseline(true))
                                                }
                                            }}
                                        />
                                        <Form.Check.Label style={errors.bioBloodBaseline && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                            : { fontWeight: 'normal' }}
                                        >
                                            No
                                </Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type='radio' xs='2' name='bioBloodBaseline' style={{ fontWeight: 'normal' }} inline id='bioBloodBaseline_yes' >
                                        <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                            checked={specimen.bioBloodBaseline === 1} readOnly={isReadOnly}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaseline(1));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaseline(true))
                                                }
                                            }} />
                                        <Form.Check.Label style={errors.bioBloodBaseline && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                            : { fontWeight: 'normal' }}>
                                            Yes
                                </Form.Check.Label>
                                    </Form.Check>
                                </Col>
                                <Col sm="12">
                                    <div sm='12'>If collected, types of aliquots (Select all that apply)</div>
                                    <div key="checkbox">
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodBaselineSerum"
                                            name="bioBloodBaselineSerum">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodBaselineSerum === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaselineSerum(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Serum </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodBaselinePlasma"
                                            name="bioBloodBaselinePlasma">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodBaselinePlasma === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaselinePlasma(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaselinePlasma(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Plasma</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodBaselineBuffyCoat"
                                            name="bioBloodBaselineBuffyCoat">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodBaselineBuffyCoat === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaselineBuffyCoat(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Buffy Coat</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodBaselineOtherDerivative"
                                            name="bioBloodBaselineOtherDerivative">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodBaselineOtherDerivative === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodBaselineOtherDerivative(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Other blood derivative</Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                </Col>
                            </Reminder>
                        </Col>
                        <Col><br></br></Col>

                        <Col className='mb-0 pl-0' sm="12" >
                            <Col sm='4'>
                                Collected at other time points   <span style={{ color: 'red' }}>*</span>
                            </Col>
                            <Reminder message='Required Field' disabled={!(errors.bioBloodOtherTime && saved)}>
                                <Col sm='3' className='align-self-center' >
                                    <Form.Check type='radio' xs='2' name='bioBloodOtherTime' inline style={{ fontWeight: 'normal' }} id="bioBloodOtherTime_no" >
                                        <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                            checked={specimen.bioBloodOtherTime === 0} readOnly={isReadOnly}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTime(0));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true))
                                                }
                                            }}
                                        />
                                        <Form.Check.Label style={errors.bioBloodOtherTime && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                            : { fontWeight: 'normal' }}> No</Form.Check.Label>
                                    </Form.Check>

                                    <Form.Check type='radio' xs='2' name='bioBloodOtherTime' style={{ fontWeight: 'normal' }} inline id='bioBloodOtherTime_yes' >
                                        <Form.Check.Input bsPrefix type='radio' className="mr-2"
                                            checked={specimen.bioBloodOtherTime === 1} readOnly={isReadOnly}
                                            onClick={() => {
                                                if (!isReadOnly) {
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTime(1));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true))
                                                }
                                            }} />
                                        <Form.Check.Label style={errors.bioBloodOtherTime && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' }
                                            : { fontWeight: 'normal' }}> Yes </Form.Check.Label>
                                    </Form.Check>
                                </Col>
                                <Col sm="12">
                                    <div sm='12'>If collected, types of aliquots (Select all that apply)</div>
                                    <div key="checkbox">
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodOtherTimeSerum"
                                            name="bioBloodOtherTimeSerum">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodOtherTimeSerum === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTimeSerum(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Serum </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodOtherTimePlasma"
                                            name="bioBloodOtherTimePlasma">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodOtherTimePlasma === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTimePlasma(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Plasma</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodOtherTimeBuffyCoat"
                                            name="bioBloodOtherTimeBuffyCoat">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodOtherTimeBuffyCoat === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTimeBuffyCoat(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Buffy Coat</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioBloodOtherTimeOtherDerivative"
                                            name="bioBloodOtherTimeOtherDerivative">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                checked={specimen.bioBloodOtherTimeOtherDerivative === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioBloodOtherTimeOtherDerivative(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Other blood derivative</Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                </Col>
                            </Reminder>
                        </Col>
                    </Form.Group>
                    {/* G.2 -G.8  */}
                    {getPartContent('A')}
                </CollapsiblePanel>
                {/* END Part A */}

                {/* START Part B */}
                <CollapsiblePanel
                    condition={activePanel === 'panelB'}
                    onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
                    panelTitle="Do you have ?">
                    {/* G.9-G.14 */}
                    {getPartContent('B')}
                </CollapsiblePanel>
                {/* END Part B */}

                {/* START Part C */}
                <CollapsiblePanel
                    condition={activePanel === 'panelC'}
                    onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}
                    panelTitle="Metabolomic Data">

                    < Form.Group as={Row} sm='12'  >
                        <Form.Label column sm='12'>
                            G.15 Metabolomic Data (from MS and/or NMR) <span style={{ color: 'red' }}>*</span>  If yes, please answer G15 a-i
                        </Form.Label>
                        <Col className='align-self-center' sm='12'>
                            <Reminder message='Required Field' disabled={!(errors.bioMetabolomicData && saved)}>
                                <Form.Check type="radio" xs='2'
                                    id="bioMetabolomicData_no"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMetabolomicData">
                                    <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                        checked={specimen.bioMetabolomicData === 0}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMetabolomicData(0));
                                                dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
                                            }
                                        }} />
                                    <Form.Check.Label
                                        style={errors.bioMetabolomicData && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}
                                    >No </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio" xs='2'
                                    id="bioMetabolomicData_yes"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMetabolomicData">
                                    <Form.Check.Input bsPrefix type='radio' className='mr-2'
                                        checked={specimen.bioMetabolomicData === 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMetabolomicData(1));
                                                dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors.bioMetabolomicData && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        Yes </Form.Check.Label>
                                </Form.Check>
                            </Reminder>
                        </Col>
                    </Form.Group>

                    {/* G15 a */}
                    < Form.Group as={Row} sm='12'  >

                        <Form.Label column sm='12'>
                            G.15a {'  '}Are the biospecimens collected fasting samples?<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col className='align-self-center' sm='12'>
                            <Reminder message='Required Field' disabled={!(errors.bioMetaFastingSample && saved)}>
                                <Form.Check type="radio" xs='2'
                                    id="bioMetaFastingSample_no"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMetaFastingSample">
                                    <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                        checked={specimen.bioMetaFastingSample === 0}
                                        disabled={+specimen.bioMetabolomicData !== 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMetaFastingSample(0));
                                                dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
                                            }
                                        }} />
                                    <Form.Check.Label
                                        style={errors.bioMetaFastingSample && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}
                                    >No  </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio" xs='2'
                                    id="bioMetaFastingSample_yes"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMetaFastingSample">
                                    <Form.Check.Input bsPrefix type='radio' className='mr-2' checked={specimen.bioMetaFastingSample === 1}
                                        disabled={+specimen.bioMetabolomicData !== 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {

                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMetaFastingSample(1));
                                                dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors.bioMetaFastingSample && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        Yes </Form.Check.Label>
                                </Form.Check>
                            </Reminder>
                        </Col>
                    </Form.Group>

                    {/* G15 b */}
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">
                            G.15b {'  '}What are the disease outcome(s) in your study? <span style={{ color: 'red' }}>*</span> (Select all that apply)
                           {(errors.bioBloodBaseline && errors.bioBloodOtherTime) && saved
                                && <span className='col-md-4 col-12' style={{ color: 'red' }}>
                                    Missing required field</span>}
                        </Form.Label>

                        <Col className='mb-0 pl-0' sm="12" >
                            <Reminder message='Required Field' disabled={!(errors.bioBloodBaseline && saved)}>
                                <Col sm="12">
                                    <div key="checkbox">
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioMetaOutcomesInCancerStudy"
                                            name="bioMetaOutcomesInCancerStudy">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly} checked={specimen.bioMetaOutcomesInCancerStudy === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioMetaOutcomesInCancerStudy(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Cancer </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioMetaOutcomesInCvdStudy"
                                            name="bioMetaOutcomesInCvdStudy">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly} checked={specimen.bioMetaOutcomesInCvdStudy === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioMetaOutcomesInCvdStudy(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>CVD</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioMetaOutcomesInDiabetesStudy"
                                            name="bioMetaOutcomesInDiabetesStudy">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly} checked={specimen.bioMetaOutcomesInDiabetesStudy === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioMetaOutcomesInDiabetesStudy(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}> Diabetes</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox"
                                            className="pl-0"
                                            id="bioMetaOutcomesInOtherStudy"
                                            name="bioMetaOutcomesInOtherStudy">
                                            <Form.Check.Input bsPrefix
                                                type="checkbox"
                                                className="mr-2"
                                                disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly} checked={specimen.bioMetaOutcomesInOtherStudy === 1}
                                                onChange={(e) => {
                                                    if (isReadOnly) return false;
                                                    dispatch(setHasUnsavedChanges(true));
                                                    dispatch(allactions.specimenActions.bioMetaOutcomesInOtherStudy(+e.target.checked));
                                                    dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(e.target.checked))
                                                }} />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>Other (please specify)</Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                </Col>
                            </Reminder>
                        </Col>
                        <Col sm='12' className='align-self-center' >
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetaOutcomesInOtherStudy === 1 && +specimen.bioMetabolomicData === 1 && errors.bioMetaOutcomesOtherStudySpecify && saved)} >
                                <Form.Control as="textarea"
                                    className="resize-vertical"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioMetaOutcomesOtherStudySpecify && saved && { border: '1px solid red' } || {}}
                                    name='bioMetaOutcomesOtherStudySpecify'
                                    className='form-control'
                                    value={specimen.bioMetaOutcomesOtherStudySpecify}
                                    maxLength={200}
                                    readOnly={isReadOnly}
                                    placeholder='Max of 200 characters'
                                    disabled={+specimen.bioMetaOutcomesInOtherStudy !== 1 || +specimen.bioMetabolomicData !== 1}
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
                            G.15c {'  '}Are you a member of the Consortium of Metabolomics Studies (COMETS)? <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col className='align-self-center' sm='12'>
                            <Reminder message='Required Field' disabled={!(errors.bioMemberOfMetabolomicsStudies && saved)}>
                                <Form.Check type="radio" xs='2'
                                    id="bioMemberOfMetabolomicsStudies_no"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMemberOfMetabolomicsStudies">
                                    <Form.Check.Input bsPrefix type="radio" className='mr-2'
                                        checked={specimen.bioMemberOfMetabolomicsStudies === 0}
                                        disabled={+specimen.bioMetabolomicData !== 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {
                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMemberOfMetabolomicsStudies(0));
                                                dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
                                            }
                                        }} />
                                    <Form.Check.Label
                                        style={errors.bioMemberOfMetabolomicsStudies && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}
                                    > No  </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio" xs='2'
                                    id="bioMemberOfMetabolomicsStudies_yes"
                                    inline
                                    style={{ fontWeight: 'normal' }}
                                    name="bioMemberOfMetabolomicsStudies">
                                    <Form.Check.Input bsPrefix type='radio' className='mr-2' checked={specimen.bioMemberOfMetabolomicsStudies === 1}
                                        disabled={+specimen.bioMetabolomicData !== 1}
                                        readOnly={isReadOnly}
                                        onClick={() => {
                                            if (!isReadOnly) {

                                                dispatch(setHasUnsavedChanges(true));
                                                dispatch(allactions.specimenActions.bioMemberOfMetabolomicsStudies(1));
                                                dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
                                            }
                                        }} />
                                    <Form.Check.Label style={errors.bioMemberOfMetabolomicsStudies && saved ? { fontWeight: 'normal', color: 'red', borderBottom: '1px solid red' } : { fontWeight: 'normal' }}>
                                        Yes </Form.Check.Label>
                                </Form.Check>
                            </Reminder>
                        </Col>
                    </Form.Group>

                    {/* G15 d */}
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">
                            G.15d {'  '}What is the number of participants with metabolomics data in your study?<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm="2">
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioMemberInStudy && saved)} >
                                <Form.Control type="text"
                                    className="resize-vertical"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioMemberInStudy && saved && { border: '1px solid red' } || {}}
                                    name='bioMemberInStudy'
                                    value={specimen.bioMemberInStudy}
                                    maxLength={15}
                                    readOnly={isReadOnly}
                                    placeholder='valid number'
                                    disabled={isReadOnly || +specimen.bioMetabolomicData !== 1}
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
                            G.15e {'  '}Which laboratory or company was used for the analysis? <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm="12">
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioLabsUsedForAnalysis && saved)} >
                                <Form.Control as="textarea"
                                    className="resize-vertical"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioLabsUsedForAnalysis && saved && { border: '1px solid red' } || {}}
                                    name='bioLabsUsedForAnalysis'
                                    value={specimen.bioLabsUsedForAnalysis}
                                    maxLength={200}
                                    readOnly={isReadOnly}
                                    placeholder='Max of 200 characters'
                                    disabled={isReadOnly || +specimen.bioMetabolomicData !== 1}
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
                            G.15f {'  '}Which type(s) of analytical platform was used, (e.g., NMR, Orbitrap mass spectrometry, QTOF mass spectrometry)?<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm="12">
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioAnalyticalPlatform && saved)} >
                                <Form.Control as="textarea"
                                    className="resize-vertical"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioAnalyticalPlatform && saved && { border: '1px solid red' } || {}}
                                    name='bioAnalyticalPlatform'
                                    value={specimen.bioAnalyticalPlatform}
                                    maxLength={200}
                                    readOnly={isReadOnly}
                                    placeholder='Max of 200 characters'
                                    disabled={isReadOnly || +specimen.bioMetabolomicData !== 1}
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
                            G.15g {'  '}Which separation platform(s) was used (e.g., GC, HILIC, RPLC, Ion pairing LC)?<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm="12">
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioSeparationPlatform && saved)} >
                                <Form.Control as="textarea"
                                    className="resize-vertical"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioSeparationPlatform && saved && { border: '1px solid red' } || {}}
                                    name='bioSeparationPlatform'
                                    value={specimen.bioSeparationPlatform}
                                    maxLength={200}
                                    readOnly={isReadOnly}
                                    placeholder='Max of 200 characters'
                                    disabled={isReadOnly || +specimen.bioMetabolomicData !== 1}
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
                            G.15h {'  '}How many metabolites were measured?<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm="2">
                            <Reminder message='Required Field' disabled={!(+specimen.bioMetabolomicData === 1 && errors.bioNumberMetabolitesMeasured && saved)} >
                                <Form.Control type="text"
                                    style={specimen.bioMetaOutcomesInOtherStudy === 1 && errors.bioNumberMetabolitesMeasured && saved && { border: '1px solid red' } || {}}
                                    name='bioNumberMetabolitesMeasured'
                                    value={specimen.bioNumberMetabolitesMeasured}
                                    maxLength={15}
                                    readOnly={isReadOnly}
                                    placeholder='valid number'
                                    disabled={isReadOnly || +specimen.bioMetabolomicData !== 1}
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
                            G.15i {'  '} What year were samples analyzed?  <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Col sm='2'  >
                            {errors.bioYearSamplesSent && specimen.bioMetabolomicData === 1 && saved ?
                                <Reminder message={errors.bioYearSamplesSent}>
                                    <Form.Control type="text"
                                        style={{ color: 'red', border: '1px solid red' }}
                                        name='bioYearSamplesSent'
                                        disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly}
                                        value={specimen.bioYearSamplesSent} readOnly={isReadOnly}
                                        onChange={e =>
                                            !isReadOnly && dispatch(allactions.specimenActions.bioYearSamplesSent(e.target.value))
                                        }
                                        placeholder='yyyy'
                                        onBlur={e =>
                                            populateErrors(e.target.value, true, 'year')
                                        } />
                                </Reminder> :
                                <Form.Control type="text"
                                    name='bioYearSamplesSent'
                                    value={specimen.bioYearSamplesSent}
                                    disabled={+specimen.bioMetabolomicData !== 1 || isReadOnly}
                                    onChange={e =>
                                        !isReadOnly && dispatch(allactions.specimenActions.bioYearSamplesSent(e.target.value))
                                    }
                                    placeholder='yyyy'
                                    onBlur={e =>
                                        populateErrors(e.target.value, true, 'year')
                                    }
                                    readOnly={isReadOnly} />
                            }
                        </Col>
                    </Form.Group>

                </CollapsiblePanel>
                {/* END Part C */}

                {/* START Part D */}
                <CollapsiblePanel
                    condition={activePanel === 'panelD'}
                    onClick={() => setActivePanel(activePanel === 'panelD' ? '' : 'panelD')}
                    panelTitle="Biospecimen Counts">
                    <div className="my-3">
                        <Form.Label> G.16</Form.Label>
                        <div> Please complete this table with the number of individuals with biospecimens available
                        in your current inventory. If you do not have exact counts, please enter approximate counts.
                        (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.)
                                </div>
                    </div>
                    <div className="table-responsive">
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
                                                    readOnly={isReadOnly} />
                                            </td>
                                        )}
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </div>

                </CollapsiblePanel>
                {/* End Part D */}

            </Form>

            {/* END Specimen Information Collapsible Question Sections */}
            <div style={{ position: 'relative' }} className="my-4">
                {/*<div style={{ position: 'relative', marginTop: '20px', marginBottom: '20px' }}>*/}
                <span className='col-md-6 col-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0' }}>
                    <input type='button' className='col-md-3 col-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('F')} />
                    <input type='button' className='col-md-3 col-6 btn btn-primary' value='Next' disabled />
                </span>
                {!isReadOnly ?
                    <span className='col-md-6 col-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                        <span onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-md-4 col-4 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)} />
                        </span>
                        <span style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-md-4 col-4 btn btn-primary' value='Save & Continue' disabled style={{ marginBottom: '5px' }} />
                        </span>
                        <span onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}>
                            <input type='button' className='col-md-4  col-4 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span>
                    </span>
                    :
                    <span className='col-md-6 col-xs-12' style={{ position: 'relative', paddingLeft: '0', paddingRight: '0' }}>
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Approve'
                            onClick={handleApprove} disabled={!['submitted', 'in review'].includes(cohortStatus)} />
                        <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{ float: 'right' }} value='Reject'
                            onClick={handleReject} disabled={!['submitted', 'in review'].includes(cohortStatus)} />

                    </span>
                }
            </div>
        </div >

    )
}

export default SpecimenForm