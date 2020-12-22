import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../controls/modal/modal'

import './SpecimenForm.css'

const SpecimenForm = ({ ...props }) => {
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.specimenInfoErrorReducer)
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)
    const lookup = useSelector(state => state.lookupReducer)


    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [activePanel, setActivePanel] = useState('panelA')
    //const cohortId = window.location.pathname.split('/').pop();

    const getValidationResult = (value, requiredOrNot, type) => {
        switch (type) {
            case 'date':
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                console.log(value)
                return validator.yearValidator(value, requiredOrNot)
            default:
                return validator.stringValidator(value, requiredOrNot)
        }
    }

    const populateErrors = (value, requiredOrNot, valueType) => {

        const result = getValidationResult(value, requiredOrNot, valueType)
        console.log(result)
        if (result) {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(false))
        } else {
            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
        }
    }

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

    useEffect(() => {
        if (!specimen.specimenLoaded) {
            fetch(`/api/questionnaire/get_specimen/${cohortId}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    console.log(result.data)
                    let specimenCounts = result.data.counts
                    let specimenInfo = result.data.info
                    let specimenDetails = result.data.details
                    if (result && specimenCounts) {
                        batch(() => {
                            for (let k of Object.keys(specimenCounts)) {
                                if (specimenCounts[k]) dispatch(allactions.specimenActions.setSpecimenCount(k, specimenCounts[k].toString()))
                            }
                            for (let k of Object.keys(specimenInfo)) {
                                switch (specimenInfo[k].sub_category) {
                                    case 'bio_blood_baseline': // specimen_id 11
                                        dispatch(allactions.specimenActions.setBioBloodBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodBaseline(true))
                                        break
                                    case 'bio_blood_baseline_serum': // specimen_id 12
                                        dispatch(allactions.specimenActions.setBioBloodBaselineSerum(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(true))
                                        break
                                    case 'bio_blood_baseline_plasma': // specimen_id 13
                                        dispatch(allactions.specimenActions.setBioBloodBaselinePlasma(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodBaselinePlasma(true))
                                        break
                                    case 'bio_blood_baseline_buffy_coat': // specimen_id 14
                                        dispatch(allactions.specimenActions.setBioBloodBaselineBuffyCoat(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(true))
                                        break
                                    case 'bio_blood_baseline_other_derivative': // specimen_id 15
                                        dispatch(allactions.specimenActions.setBioBloodBaselineOtherDerivative(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(true))
                                        break
                                    case 'bio_blood_other_time': // specimen_id 16
                                        dispatch(allactions.specimenActions.setBioBloodOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true))
                                        break
                                    case 'bio_blood_other_time_serum': // specimen_id 17
                                        dispatch(allactions.specimenActions.setBioBloodOtherTimeSerum(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(true))
                                        break
                                    case 'bio_blood_other_time_plasma': // specimen_id 18
                                        dispatch(allactions.specimenActions.setBioBloodOtherTimePlasma(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(true))
                                        break
                                    case 'bio_blood_other_time_buffy_coat': // specimen_id 19
                                        dispatch(allactions.specimenActions.setBioBloodOtherTimeBuffyCoat(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(true))
                                        break
                                    case 'bio_blood_other_time_other_derivative': // specimen_id 20
                                        dispatch(allactions.specimenActions.setBioBloodOtherTimeOtherDerivative(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(true))
                                        break
                                    case 'bio_buccal_saliva_baseline': // specimen_id 21
                                        dispatch(allactions.specimenActions.setBioBuccalSalivaBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(true))
                                        break
                                    case 'bio_buccal_saliva_other_time': // specimen_id 22
                                        dispatch(allactions.specimenActions.setBioBuccalSalivaOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(true))
                                        break
                                    case 'bio_tissue_baseline': // specimen_id 23
                                        dispatch(allactions.specimenActions.setBioTissueBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioTissueBaseline(true))
                                        break
                                    case 'bio_tissue_other_time': // specimen_id 24
                                        dispatch(allactions.specimenActions.setBioTissueOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioTissueOtherTime(true))
                                        break
                                    case 'bio_urine_baseline': // specimen_id 25
                                        dispatch(allactions.specimenActions.setBioUrineBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioUrineBaseline(true))
                                        break
                                    case 'bio_urine_other_time': // specimen_id 26
                                        dispatch(allactions.specimenActions.setBioUrineOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioUrineOtherTime(true))
                                        break
                                    case 'bio_feces_baseline': // specimen_id 27
                                        dispatch(allactions.specimenActions.setBioFecesBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioFecesBaseline(true))
                                        break
                                    case 'bio_feces_other_time': // specimen_id 28
                                        dispatch(allactions.specimenActions.setBioFecesOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioFecesOtherTime(true))
                                        break
                                    case 'bio_other_baseline': // specimen_id 29
                                        dispatch(allactions.specimenActions.setBioOtherBaseline(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioOtherBaseline(true))
                                        break
                                    case 'bio_other_other_time': // specimen_id 30
                                        dispatch(allactions.specimenActions.setBioOtherOtherTime(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true))
                                        break
                                    case 'bio_repeated_sample_same_individual': // specimen_id 31
                                        dispatch(allactions.specimenActions.setBioRepeatedSampleSameIndividual(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true))
                                        break
                                    case 'bio_tumor_block_info': // specimen_id 32
                                        dispatch(allactions.specimenActions.setBioTumorBlockInfo(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true))
                                        break
                                    case 'bio_genotyping_data': // specimen_id 33
                                        dispatch(allactions.specimenActions.setBioGenotypingData(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioGenotypingData(true))
                                        break
                                    case 'bio_sequencing_data_exome': // specimen_id 34
                                        dispatch(allactions.specimenActions.setBioSequencingDataExome(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true))
                                        break
                                    case 'bio_sequencing_data_whole_genome': // specimen_id 35
                                        dispatch(allactions.specimenActions.setBioSequencingDataWholeGenome(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true))
                                        break
                                    case 'bio_epigenetic_or_metabolic_markers': // specimen_id 36
                                        dispatch(allactions.specimenActions.setBioEpigeneticOrMetabolicMarkers(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true))
                                        break
                                    case 'bio_other_omics_data': // specimen_id 37
                                        dispatch(allactions.specimenActions.setBioOtherOmicsData(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioOtherOmicsData(true))
                                        break
                                    case 'bio_transcriptomics_data': // specimen_id 38
                                        dispatch(allactions.specimenActions.setBioTranscriptomicsData(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true))
                                        break
                                    case 'bio_microbiome_data': // specimen_id 39
                                        dispatch(allactions.specimenActions.setBioMicrobiomeData(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true))
                                        break
                                    case 'bio_metabolomic_data': // specimen_id 40
                                        dispatch(allactions.specimenActions.setBioMetabolomicData(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
                                        if (specimenInfo[k].collected_yn == null || +specimenInfo[k].collected_yn === 0) {
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

                                            dispatch(allactions.specimenErrorActions.bioMetabolomicData(true))
                                            dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))
                                            dispatch(allactions.specimenErrorActions.bioMemberInStudy(true))

                                        }
                                        break
                                    case 'bio_meta_fasting_sample': // specimen_id 41
                                        dispatch(allactions.specimenActions.setBioMetaFastingSample(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true))
                                        break
                                    case 'bio_meta_outcomes_in_cancer_study': // specimen_id 42
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInCancerStudy(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(true))
                                        break
                                    case 'bio_meta_outcomes_in_cvd_study': // specimen_id 43
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInCvdStudy(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(true))
                                        break
                                    case 'bio_meta_outcomes_in_diabetes_study': // specimen_id 44
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInDiabetesStudy(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(true))
                                        break
                                    case 'bio_meta_outcomes_in_other_study': // specimen_id 45
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInOtherStudy(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(true))
                                        break
                                    case 'bio_member_of_metabolomics_studies': // specimen_id 46
                                        dispatch(allactions.specimenActions.setBioMemberOfMetabolomicsStudies(specimenInfo[k].collected_yn))
                                        dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true))
                                        break
                                    default:
                                        break

                                }

                            }

                            // details part
                            dispatch(allactions.specimenActions.setBioAnalyticalPlatform(specimenDetails.bio_analytical_platform))
                            dispatch(allactions.specimenActions.setBioLabsUsedForAnalysis(specimenDetails.bio_labs_used_for_analysis))
                            dispatch(allactions.specimenActions.setBioMemberInStudy(specimenDetails.bio_member_in_study))
                            dispatch(allactions.specimenActions.setBioMetaOutcomesInCancerStudy(specimenDetails.bio_meta_outcomes_other_study_specify))
                            dispatch(allactions.specimenActions.setBioNumberMetabolitesMeasured(specimenDetails.bio_number_metabolites_measured))
                            dispatch(allactions.specimenActions.setBioOtherBaselineSpecify(specimenDetails.bio_other_baseline_specify))
                            dispatch(allactions.specimenActions.setBioOtherOtherTimeSpecify(specimenDetails.bio_other_other_time_specify))
                            dispatch(allactions.specimenActions.setBioSeparationPlatform(specimenDetails.bio_separation_platform))
                            dispatch(allactions.specimenActions.setBioYearSamplesSent(specimenDetails.bio_year_samples_sent))

                            dispatch(allactions.specimenErrorActions.bioAnalyticalPlatform(true))
                            dispatch(allactions.specimenErrorActions.bioLabsUsedForAnalysis(true))
                            dispatch(allactions.specimenErrorActions.bioMemberInStudy(true))
                            dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(true))
                            dispatch(allactions.specimenErrorActions.bioNumberMetabolitesMeasured(true))
                            dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(true))
                            dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(true))
                            dispatch(allactions.specimenErrorActions.bioSeparationPlatform(true))
                            if (specimenDetails.bio_year_samples_sent && +specimenDetails.bio_year_samples_sent > 1900 && +specimenDetails.bio_year_samples_sent < 2100) dispatch(allactions.specimenErrorActions.bioYearSamplesSent(true))



                        })
                    }
                    dispatch(allactions.specimenActions.setSpecimenLoaded(true))

                })
                .catch((error) => {
                    console.log(error)
                })
        } // end if
    }, [])

    const saveSpecimen = (id = 79, errorsRemain = true, proceed = false) => {
        console.log(specimen)


        fetch(`/api/questionnaire/update_specimen/${id}`, {
            method: "POST",
            body: JSON.stringify(specimen),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {

                if (result.status === 200) {
                    if (!errorsRemain)
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'incomplete'))
                    }
                    if (result.data) {
                        if (result.data.duplicated_cohort_id && result.data.duplicated_cohort_id != cohortId)
                            dispatch(allactions.cohortIDAction.setCohortId(result.data.duplicated_cohort_id))
                        if (result.data.status)
                            dispatch(({ type: 'SET_COHORT_STATUS', value: result.data.status }))
                    }
                    if (!proceed) {
                        setSuccessMsg(true)
                    }
                    else
                        props.sectionPicker('G')
                } else {
                    setFailureMsg(true)
                }

                console.log(result)
            })
    }

    const handleSave = () => {
        setSaved(true)

        console.log(errors)
        let errorsRemain = refreshErrors()

        console.log(errorsRemain)

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


    return <div id='specimenInfoContainer' className='col-md-12'>

        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={confirmSaveStay} />

        <div className='specimenInfo col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <span>Specify the types of specimens you collected, whether the speimen was collected at baseline, and/or collected at other time points.</span>
            </div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Did you collect any of the following specimens? </div>
                <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.1 Blood  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioBloodBaseline' checked={specimen.bioBloodBaseline === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioBloodBaseline(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioBloodBaseline(e.target.checked))
                                    }} />{' '} Collected at baseline</span>

                                <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <span className='col-xs-12'><small>If collected, types of aliquots</small></span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodBaselineSerum' disabled={+specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineSerum === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodBaselineSerum(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(e.target.checked))
                                        }} />{' '}Serum</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodBaselinePlasma' disabled={+specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselinePlasma === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodBaselinePlasma(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselinePlasma(e.target.checked))
                                        }} />{' '}Plasma</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodBaselineBuffyCoat' disabled={+specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineBuffyCoat === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodBaselineBuffyCoat(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(e.target.checked))
                                        }} />{' '}Buffy Coat</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodBaselineOtherDerivative' disabled={+specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineOtherDerivative === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodBaselineOtherDerivative(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(e.target.checked))
                                        }} />{' '}Other blood derivative</span>
                                </div>
                            </div>

                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>

                                <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTime' checked={specimen.bioBloodOtherTime === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioBloodOtherTime(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioBloodOtherTime(e.target.checked))
                                    }} />{' '} Collected at other time points</span>

                                <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <span className='col-xs-12'><small>If collected, types of aliquots</small></span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodOtherTimeSerum' disabled={+specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeSerum === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodOtherTimeSerum(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(e.target.checked))
                                        }} />{' '}Serum</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodOtherTimePlasma' disabled={+specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimePlasma === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodOtherTimePlasma(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(e.target.checked))
                                        }} />{' '}Plasma</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodOtherTimeBuffyCoat' disabled={+specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeBuffyCoat === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodOtherTimeBuffyCoat(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(e.target.checked))
                                        }} />{' '}Buffy Coat</span>
                                    <span className='col-xs-12'><input type='checkbox' style={{ marginLeft: '10' }} name='bioBloodOtherTimeOtherDerivative' disabled={+specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeOtherDerivative === 1}
                                        onChange={(e) => {
                                            dispatch(allactions.specimenActions.setBioBloodOtherTimeOtherDerivative(+e.target.checked));
                                            dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(e.target.checked))
                                        }} />{' '}Other blood derivative</span>
                                </div>
                            </div>
                        </div>
                        {(errors.bioBloodBaseline && errors.bioBloodOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.2 Buccal/Saliva  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioBuccalSalivaBaseline' checked={specimen.bioBuccalSalivaBaseline === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioBuccalSalivaBaseline(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(e.target.checked))
                                    }} />{' '} Collected at baseline</span>
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }} > <span className='col-xs-12'><input type='checkbox' name='bioBuccalSalivaOtherTime' checked={specimen.bioBuccalSalivaOtherTime === 1}
                                onChange={(e) => {
                                    dispatch(allactions.specimenActions.setBioBuccalSalivaOtherTime(+e.target.checked));
                                    dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(e.target.checked))
                                }} />{' '} Collected at other time points</span>
                            </div>
                        </div>
                        {(errors.bioBuccalSalivaBaseline && errors.bioBuccalSalivaOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.3 Tissue (include tumor and/or normal){'  '}  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioTissueBaseline' checked={specimen.bioTissueBaseline === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioTissueBaseline(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioTissueBaseline(e.target.checked))
                                    }} />{' '} Collected at baseline</span>
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioTissueOtherTime' checked={specimen.bioTissueOtherTime === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioTissueOtherTime(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioTissueOtherTime(e.target.checked))
                                    }} />{' '} Collected at other time points</span>
                            </div>
                        </div>
                        {(errors.bioTissueBaseline && errors.bioTissueOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.4 Urine  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioUrineBaseline' checked={specimen.bioUrineBaseline === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioUrineBaseline(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioUrineBaseline(e.target.checked)) }} />{' '} Collected at baseline</span>
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioUrineOtherTime' checked={specimen.bioUrineOtherTime === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioUrineOtherTime(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioUrineOtherTime(e.target.checked)) }} />{' '} Collected at other time points</span>
                            </div>
                        </div>
                        {(errors.bioUrineBaseline && errors.bioUrineOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.5 Feces  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioFecesBaseline' checked={specimen.bioFecesBaseline === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioFecesBaseline(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioFecesBaseline(e.target.checked)) }} />{' '} Collected at baseline</span>
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioFecesOtherTime' checked={specimen.bioFecesOtherTime === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioFecesOtherTime(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioFecesOtherTime(e.target.checked)) }} />{' '} Collected at other time points</span>
                            </div>
                        </div>
                        {(errors.bioFecesBaseline && errors.bioFecesOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.6 Other(e.g. toenails)  <span style={{ color: 'red' }}>*</span><small>(Select all that apply)</small>   </label>

                        <div className='col-md-8 col-xs-12'>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioOtherBaseline' checked={specimen.bioOtherBaseline === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioOtherBaseline(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioOtherBaseline(e.target.checked)) }} />{' '} Collected at baseline</span>
                                <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <span className='col-xs-12'><small>If collected, please specify</small></span>
                                    <span className='col-xs-12' style={{ paddingTop: '0.5rem' }}>
                                        {specimen.bioOtherBaseline && errors.bioOtherBaselineSpecify && saved ? <Reminder message={'Missing required field'}>
                                            <textarea className="form-control resize-vertical" maxLength={200} name='bioOtherBaselineSpecify' disabled={+specimen.bioOtherBaseline !== 1}
                                                placeholder='Max of 200 characters' style={{ border: '1px solid red' }}
                                                value={specimen.bioOtherBaselineSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherBaselineSpecify(e.target.value))}
                                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(specimen.bioOtherBaselineSpecify))} />
                                        </Reminder> :
                                            <textarea className="form-control resize-vertical" maxLength={200} name='bioOtherBaselineSpecify' disabled={+specimen.bioOtherBaseline !== 1}
                                                placeholder='Max of 200 characters'
                                                value={specimen.bioOtherBaselineSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherBaselineSpecify(e.target.value))}
                                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherBaselineSpecify(specimen.bioOtherBaselineSpecify))} />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='col-md-6 col-xs-12' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-12'><input type='checkbox' name='bioOtherOtherTime' checked={specimen.bioOtherOtherTime === 1}
                                    onChange={(e) => { dispatch(allactions.specimenActions.setBioOtherOtherTime(+e.target.checked)); dispatch(allactions.specimenErrorActions.bioOtherOtherTime(e.target.checked)) }} />{' '} Collected at other time points</span>
                                <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <span className='col-xs-12'><small>If collected, please specify</small></span>
                                    <span className='col-xs-12' style={{ paddingTop: '0.5rem' }}>
                                        {specimen.bioOtherOtherTime && errors.bioOtherOtherTimeSpecify && saved ? <Reminder message={'Missing required field'}>
                                            <textarea className="form-control resize-vertical" maxLength={200} name='bioOtherOtherTimeSpecify' disabled={+specimen.bioOtherOtherTime !== 1}
                                                placeholder='Max of 200 characters' style={{ border: '1px solid red' }}
                                                value={specimen.bioOtherOtherTimeSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherOtherTimeSpecify(e.target.value))}
                                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(specimen.bioOtherOtherTimeSpecify))} />
                                        </Reminder> :
                                            <textarea className="form-control resize-vertical" maxLength={200} name='bioOtherBaselineSpecify' disabled={+specimen.bioOtherOtherTime !== 1}
                                                placeholder='Max of 200 characters'
                                                value={specimen.bioOtherOtherTimeSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherOtherTimeSpecify(e.target.value))}
                                                onBlur={() => dispatch(allactions.specimenErrorActions.bioOtherOtherTimeSpecify(specimen.bioOtherOtherTimeSpecify))} />
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        {(errors.bioOtherBaseline && errors.bioOtherOtherTime) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.7 Did you collect repeated samples over multiple timepoints for the same individuals?
                            <span style={{ color: 'red' }}>*</span></label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioRepeatedSampleSameIndividual(0)); dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true)) }} />{" "}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioRepeatedSampleSameIndividual(1)); dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioRepeatedSampleSameIndividual) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.8 If your cohort does not currently collect tumor blocks, do you have information on where the blocks are kept/stored?
                            <span style={{ color: 'red' }}>*</span></label>

                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioTumorBlockInfo(0)); dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioTumorBlockInfo(1)); dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioTumorBlockInfo) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Did you have ?</div>
                <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>


                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.9 Genotyping Data (SNP)
                          <span style={{ color: 'red' }}>*</span></label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioGenotypingData' checked={specimen.bioGenotypingData === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioGenotypingData(0)); dispatch(allactions.specimenErrorActions.bioGenotypingData(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span><input type='radio' style={{ marign: 'auto' }} name='bioGenotypingData' checked={specimen.bioGenotypingData === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioGenotypingData(1)); dispatch(allactions.specimenErrorActions.bioGenotypingData(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioGenotypingData) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.10  Sequencing Data – Exome
                            <span style={{ color: 'red' }}>*</span></label>

                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataExome(0)); dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataExome(1)); dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioSequencingDataExome) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>
                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.11  Sequencing Data – Whole Genome
                          <span style={{ color: 'red' }}>*</span> </label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataWholeGenome(0)); dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataWholeGenome(1)); dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioSequencingDataWholeGenome) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.12  Epigenetic Data (methylation, miRNA, histone chip-on-chip data)
                          <span style={{ color: 'red' }}>*</span></label>

                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioEpigeneticOrMetabolicMarkers(0)); dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioEpigeneticOrMetabolicMarkers(1)); dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioEpigeneticOrMetabolicMarkers) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.13  Transcriptomics Data
                          <span style={{ color: 'red' }}>*</span></label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioTranscriptomicsData(0)); dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioTranscriptomicsData(1)); dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioTranscriptomicsData) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.14 Microbiome Data (16S RNA, metagenomics)
                          <span style={{ color: 'red' }}>*</span></label>

                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMicrobiomeData(0)); dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span ><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMicrobiomeData(1)); dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioMicrobiomeData) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                </div></div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}> Metabolomic Data </div>
                <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>


                    <div className='specimenInfo my-3 col-md-12 col-xs-12'>
                        <label className="d-block control-label">
                            G.15 Metabolomic Data (from MS and/or NMR) <span style={{ color: 'red' }}>*</span><small>{'   '} If yes, please answer G15 a-i</small>
                        </label>

                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMetabolomicData(0)); dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMetabolomicData(1)); dispatch(allactions.specimenErrorActions.bioMetabolomicData(true)) }} />{' '}Yes</span>
                            </div>
                            {(errors.bioMetabolomicData) && saved && <span className='col-md-4 col-xs-12' style={{ color: 'red' }}>Missing required field</span>}
                        </div>
                    </div>

                    {/* G15 a */}
                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        <label className="d-block control-label">G.15a {'  '}Are the biospecimens collected fasting samples?</label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetaFastingSample' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaFastingSample === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMetaFastingSample(0)); dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetaFastingSample' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaFastingSample === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMetaFastingSample(1)); dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true)) }} />{' '}Yes</span>

                            </div>
                        </div>
                    </div>


                    {/* G15 b */}
                    <div className='specimenInfo col-md-12' >
                        <label className="d-block control-label">G.15b {'  '}What are the disease outcome(s) in your study?<small>(Select all that apply)</small></label>
                        <div className='col-md-12 col-xs-12'>
                            <div className='col-md-12 col-xs-12' style={{ paddingLeft: '0' }}>

                                <span className='col-xs-12' ><input type='checkbox' style={{ paddingLeft: '0' }} name='bioMetaOutcomesInCancerStudy'
                                    disabled={+specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCancerStudy === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInCancerStudy(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(true))
                                    }} />{' '}Cancer</span>
                                <span className='col-xs-12'  ><input type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInCvdStudy'
                                    disabled={+specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCvdStudy === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInCvdStudy(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(true))
                                    }} />{' '}CVD</span>
                                <span className='col-xs-12' ><input type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInDiabetesStudy'
                                    disabled={+specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInDiabetesStudy === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInDiabetesStudy(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(true))
                                    }} />{' '}Diabetes</span>
                                <span className='col-xs-12' ><input type='checkbox' style={{ marign: 'auto', paddingLeft: '0' }} name='bioMetaOutcomesInOtherStudy'
                                    disabled={+specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInOtherStudy === 1}
                                    onChange={(e) => {
                                        dispatch(allactions.specimenActions.setBioMetaOutcomesInOtherStudy(+e.target.checked));
                                        dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(true))
                                    }} />{' '}Other, please specify: </span>
                                <span className='col-xs-12' style={{ paddingTop: '0.5rem' }}>
                                    {+specimen.bioMetaOutcomesInOtherStudy === 1 && +specimen.bioMetabolomicData === 1 && errors.bioMetaOutcomesOtherStudySpecify && saved ?
                                        <Reminder message={'Missing required field'}>
                                            <textarea className="form-control resize-vertical" maxLength={200} name='bioMetaOutcomesOtherStudySpecify'
                                                disabled={+specimen.bioMetaOutcomesInOtherStudy !== 1 || +specimen.bioMetabolomicData !== 1}
                                                placeholder='Max of 200 characters' style={{ marign: 'auto', border: '1px solid red' }}
                                                value={specimen.bioMetaOutcomesOtherStudySpecify}
                                                onChange={(e) => dispatch(allactions.specimenActions.setBioMetaOutcomesOtherStudySpecify(e.target.value))}
                                                onBlur={() => dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(specimen.bioMetaOutcomesOtherStudySpecify))} />
                                        </Reminder> :
                                        <textarea className="form-control resize-vertical" maxLength={200} name='bioMetaOutcomesOtherStudySpecify'
                                            disabled={+specimen.bioMetaOutcomesInOtherStudy !== 1 || +specimen.bioMetabolomicData !== 1}
                                            placeholder='Max of 200 characters' style={{ marign: 'auto' }}
                                            value={specimen.bioMetaOutcomesOtherStudySpecify}
                                            onChange={(e) => dispatch(allactions.specimenActions.setBioMetaOutcomesOtherStudySpecify(e.target.value))}
                                            onBlur={() => dispatch(allactions.specimenErrorActions.bioMetaOutcomesOtherStudySpecify(specimen.bioMetaOutcomesOtherStudySpecify))} />
                                    }

                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 c */}

                        <label className="d-block control-label">G.15c {'  '}Are you a member of the Consortium of Metabolomics Studies (COMETS)?</label>

                        <div className='specimenInfo col-md-12' >
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 0}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMemberOfMetabolomicsStudies(0)); dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true)) }} />{' '}No</span>
                            </div>
                            <div className='col-md-2 col-xs-6' style={{ paddingLeft: '0' }}>
                                <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 1}
                                    onClick={() => { dispatch(allactions.specimenActions.setBioMemberOfMetabolomicsStudies(1)); dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true)) }} />{' '}Yes</span>
                            </div>
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 d */}
                        <label className="d-block control-label">G.15d {'  '}What is the number of participants with metabolomics data in your study?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-md-2 col-xs-5'>
                                <input maxLength='15' className='form-control' name='bioMemberInStudy' disabled={specimen.bioMetabolomicData !== 1} placeholder='number only' style={{ marign: 'auto' }}
                                    value={specimen.bioMemberInStudy} onChange={e => dispatch(allactions.specimenActions.setBioMemberInStudy(e.target.value))} />
                            </span>
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 e */}
                        <label className="d-block control-label">G.15e {'  '}Which laboratory or company was used for the analysis?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-xs-12'>
                                <textarea className="form-control resize-vertical" maxLength={200} name='bioLabsUsedForAnalysis' disabled={specimen.bioMetabolomicData !== 1} placeholder='Max of 200 characters' style={{ marign: 'auto' }}
                                    value={specimen.bioLabsUsedForAnalysis || ''}
                                    onChange={e => dispatch(allactions.specimenActions.setBioLabsUsedForAnalysis(e.target.value))} />
                            </span>
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 f */}

                        <label className="d-block control-label">G.15f {'  '}Which type(s) of analytical platform was used, (e.g., NMR, Orbitrap mass spectrometry, QTOF mass spectrometry)?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-xs-12'>
                                <textarea className="form-control resize-vertical" maxLength={200} name='bioAnalyticalPlatform' disabled={specimen.bioMetabolomicData !== 1} placeholder='Max of 200 characters' style={{ marign: 'auto' }}
                                    value={specimen.bioAnalyticalPlatform || ''}
                                    onChange={e => dispatch(allactions.specimenActions.setBioAnalyticalPlatform(e.target.value))} />
                            </span>
                        </div>
                    </div>
                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 g*/}

                        <label className="d-block control-label">G.15g {'  '}Which separation platform(s) was used (e.g., GC, HILIC, RPLC, Ion pairing LC)?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-xs-12'>
                                <textarea className="form-control resize-vertical" maxLength={200} name='bioSeparationPlatform' disabled={specimen.bioMetabolomicData !== 1} placeholder='Max of 200 characters' style={{ marign: 'auto' }}
                                    value={specimen.bioSeparationPlatform || ''}
                                    onChange={e => dispatch(allactions.specimenActions.setBioSeparationPlatform(e.target.value))} />
                            </span>
                        </div>
                    </div>

                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 h */}

                        <label className="d-block control-label">G.15h {'  '}How many metabolites were measured?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-md-2 col-xs-5'>
                                <input maxLength='15' className='form-control' name='bioNumberMetabolitesMeasured' disabled={specimen.bioMetabolomicData !== 1} placeholder='number only' style={{ marign: 'auto' }}
                                    value={specimen.bioNumberMetabolitesMeasured} onChange={e => dispatch(allactions.specimenActions.setBioNumberMetabolitesMeasured(e.target.value))} />
                            </span>
                        </div>
                    </div>
                    <div className='specimenInfo my-3 col-md-12 col-xs-12' >
                        {/* G15 i */}

                        <label className="d-block control-label"> G.15i {'  '} What year were samples analyzed?</label>
                        <div className='specimenInfo col-md-12' >
                            <span className='col-md-1 col-xs-3' style={{ paddingRight: '0' }}>
                                {
                                    (specimen.bioMetabolomicData === 1 && errors.bioYearSamplesSent) && saved ?
                                        <Reminder message={'invaliad year value'}>
                                            <input style={{ marign: 'auto', border: '1px solid red' }}
                                                className='form-control' name='bioYearSamplesSent' placeholder='yyyy' value={specimen.bioYearSamplesSent} disabled={specimen.bioMetabolomicData !== 1}
                                                onChange={e => dispatch(allactions.specimenActions.setBioYearSamplesSent(e.target.value))}
                                                onBlur={(e) => { populateErrors(e.target.value, true, 'year') }} />
                                        </Reminder>
                                        :
                                        <input style={{ marign: 'auto' }} className='form-control' maxLength='4'
                                            name='bioYearSamplesSent' placeholder='yyyy' value={specimen.bioYearSamplesSent} disabled={specimen.bioMetabolomicData !== 1}
                                            onChange={e => dispatch(allactions.specimenActions.setBioYearSamplesSent(e.target.value))}
                                            onBlur={(e) => { populateErrors(e.target.value, true, 'year') }} />
                                }
                            </span>
                        </div>
                    </div>

                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelF' ? '' : 'panelF')}>Biospecimen Counts</div>
                <div className={activePanel === 'panelF' ? 'panel-active' : 'panellet'}>
                    <div className="my-3">
                        <label className="d-block">G.16</label>
                        <div> <p style={{ fontSize: '16px' }}>Please complete this table with the number of individuals with biospecimens available
                        in your current inventory. If you do not have exact counts, please enter approximate counts.
                        (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.)
                </p></div>
                    </div>

                    <table className='table table-stripe table-responsive'>
                        <thead>
                            <tr>
                                <th className='col-sm-1 center' >ICD-9</th>
                                <th className='col-sm-1 center' > ICD-10</th>
                                <th className='col-sm-3 center' >Cancer Site/Type</th>
                                <th className='col-sm-1 center' >Serum and/or Plasma</th>
                                <th className='col-sm-1 center' >Buffy Coat and/or Lymphocytes</th>
                                <th className='col-sm-1 center' >Saliva and/or Buccal</th>
                                <th className='col-sm-1 center' >Urine</th>
                                <th className='col-sm-1 center' >Feces</th>
                                <th className='col-sm-1 center' >Tumor Tissue Fresh/Frozen</th>
                                <th className='col-sm-1 center' >Tumor Tissue FFPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lookup.cancer.map(c => {
                                const keyPrefix = `${cohortId}_${c.id}`;
                                const inputKeys = lookup.specimen.filter(k => { return k.id < 10; }).map((k) =>
                                    `${c.id}-${k.id}`);;


                                return <tr key={keyPrefix}>
                                    <td className={c.icd9 ? "bg-light" : "bg-grey"}>{c.icd9}</td>
                                    <td className={c.icd10 ? "bg-light" : "bg-grey"}>{c.icd10}</td>
                                    <td className="bg-light">{c.cancer}</td>

                                    {inputKeys.map((key, i) =>
                                        <td><input className='inputWriter center' name={key} value={specimen.counts[key]}
                                            onChange={e => dispatch(allactions.specimenActions.setSpecimenCount(key, e.target.value))} />
                                        </td>
                                    )}
                                </tr>
                            })}
                        </tbody>
                    </table>


                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0' }}>
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('F')} />
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' disabled />
                </span>
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                    <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)} />
                    </span>
                    <span className='col-xs-4' style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled style={{ marginRight: '5px', marginBottom: '5px' }} />
                    </span>
                    <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span>
                </span>
            </div>
        </div>
    </div >
}

export default SpecimenForm