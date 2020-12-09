import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import DatePicker from 'react-datepicker';
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../Modal/Modal'

import './SpecimenForm.css'

const SpecimenForm = ({ ...props }) => {
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)
    const errors = useSelector(state => state.specimenInfoErrorReducer)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [activePanel, setActivePanel] = useState('panelA')
    const cohortId = window.location.pathname.split('/').pop();

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


                        })
                    }
                    dispatch(allactions.specimenActions.setSpecimenLoaded(true))

                })
                .catch((error) => {
                    console.log(error)
                })
        } // end if
    }, [])

    const saveSpecimen = (id = 79, hasErrors, proceed = false) => {
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
                    if (Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'complete'))
                    else {
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'incomplete'))
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
        if (Object.entries(errors).length === 0) {
            specimen.sectionGStatus = 'complete'
            saveSpecimen(cohortId)
        } else {
            //setDisplay('block')
            specimen.sectionGStatus = 'incomplete'
            if (window.confirm('there are validation errors, are you sure to save?'))
                saveSpecimen(cohortId)
        }
    }


    return <div id='specimenInfoContainer' className='col-md-12'>

        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}

        <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <span>Specify the types of specimens you collected, whether the speimen was collected at baseline, and/or collected at other time points.</span>
            </div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Specimen Collected</div>
                <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>
                    <table className='table table-stripe table-responsive'>
                        <thead>
                            <tr>
                                <th className='col-xs-4'>Did you collect any of the following specimens</th>
                                <th className='col-xs-4' style={{ textAlign: 'center' }}>Collected at baseline</th>
                                <th className='col-xs-4' style={{ textAlign: 'center' }}>Collected at other time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>G.1 Blood</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaseline' checked={specimen.bioBloodBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaseline(0)); dispatch(allactions.specimenErrorActions.bioBloodBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaseline' checked={specimen.bioBloodBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaseline(1)); dispatch(allactions.specimenErrorActions.bioBloodBaseline(true)) }}
                                        />{' '}Yes</span>
                                    </div>
                                    <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <span className='col-sm-12'>If collected, types of aliquots</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineSerum' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineSerum === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaselineSerum(0)); dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(true)) }} />{' '}Serum</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselinePlasma' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselinePlasma === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaselinePlasma(0)); dispatch(allactions.specimenErrorActions.bioBloodBaselineSerum(true)) }} />{' '}Plasma</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineBuffyCoat' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineBuffyCoat === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaselineBuffyCoat(0)); dispatch(allactions.specimenErrorActions.bioBloodBaselineBuffyCoat(true)) }} />{' '}Buffy Coat</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineOtherDerivative' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineOtherDerivative === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodBaselineOtherDerivative(0)); dispatch(allactions.specimenErrorActions.bioBloodBaselineOtherDerivative(true)) }} />{' '}Other blood derivative</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodOtherTime' checked={specimen.bioBloodOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTime(0)); dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodOtherTime' checked={specimen.bioBloodOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTime(1)); dispatch(allactions.specimenErrorActions.bioBloodOtherTime(true)) }} />{' '}Yes</span>
                                    </div>
                                    <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <span className='col-xs-12'>If collected, types of aliquots</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeSerum' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeSerum === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTimeSerum(0)); dispatch(allactions.specimenErrorActions.bioBloodOtherTimeSerum(true)) }} />{' '}Serum</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimePlasma' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimePlasma === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTimePlasma(0)); dispatch(allactions.specimenErrorActions.bioBloodOtherTimePlasma(true)) }} />{' '}Plasma</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeBuffyCoat' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeBuffyCoat === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTimeBuffyCoat(0)); dispatch(allactions.specimenErrorActions.bioBloodOtherTimeBuffyCoat(true)) }} />{' '}Buffy Coat</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeOtherDerivative' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeOtherDerivative === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBloodOtherTimeOtherDerivative(0)); dispatch(allactions.specimenErrorActions.bioBloodOtherTimeOtherDerivative(true)) }} />{' '}Other blood derivative</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.2 Buccal/Saliva</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaBaseline' checked={specimen.bioBuccalSalivaBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBuccalSalivaBaseline(0)); dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaBaseline' checked={specimen.bioBuccalSalivaBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBuccalSalivaBaseline(1)); dispatch(allactions.specimenErrorActions.bioBuccalSalivaBaseline(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaOtherTime' checked={specimen.bioBuccalSalivaOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBuccalSalivaOtherTime(0)); dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaOtherTime' checked={specimen.bioBuccalSalivaOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioBuccalSalivaOtherTime(1)); dispatch(allactions.specimenErrorActions.bioBuccalSalivaOtherTime(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.3 Tissue (include tumor and/or normal</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueBaseline' checked={specimen.bioTissueBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTissueBaseline(0)); dispatch(allactions.specimenErrorActions.bioTissueBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueBaseline' checked={specimen.bioTissueBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTissueBaseline(1)); dispatch(allactions.specimenErrorActions.bioTissueBaseline(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueOtherTime' checked={specimen.bioTissueOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTissueOtherTime(0)); dispatch(allactions.specimenErrorActions.bioTissueOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaselineSerum' checked={specimen.bioTissueOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTissueOtherTime(1)); dispatch(allactions.specimenErrorActions.bioTissueOtherTime(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.4 Urine</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineBaseline' checked={specimen.bioUrineBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioUrineBaseline(0)); dispatch(allactions.specimenErrorActions.bioUrineBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineBaseline' checked={specimen.bioUrineBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioUrineBaseline(1)); dispatch(allactions.specimenErrorActions.bioUrineBaseline(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineOtherTime' checked={specimen.bioUrineOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioUrineOtherTime(0)); dispatch(allactions.specimenErrorActions.bioUrineOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineOtherTime' checked={specimen.bioUrineOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioUrineOtherTime(1)); dispatch(allactions.specimenErrorActions.bioUrineOtherTime(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.5 Feces</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesBaseline' checked={specimen.bioFecesBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioFecesBaseline(0)); dispatch(allactions.specimenErrorActions.bioFecesBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesBaseline' checked={specimen.bioFecesBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioFecesBaseline(1)); dispatch(allactions.specimenErrorActions.bioFecesBaseline(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesOtherTime' checked={specimen.bioFecesOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioFecesOtherTime(0)); dispatch(allactions.specimenErrorActions.bioFecesOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesOtherTime' checked={specimen.bioFecesOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioFecesOtherTime(1)); dispatch(allactions.specimenErrorActions.bioFecesOtherTime(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.6 Other(e.g. toenails)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherBaseline' checked={specimen.bioOtherBaseline === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioOtherBaseline(0)); dispatch(allactions.specimenErrorActions.bioOtherBaseline(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaselineSerum' checked={specimen.bioOtherBaseline === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioOtherBaseline(1)); dispatch(allactions.specimenErrorActions.bioOtherBaseline(true)) }} />{' '}Yes</span>
                                        <span className='col-xs-12'>If yes, please specify</span>
                                        <span className='col-xs-12'>
                                            <input className='form-control' disabled={specimen.bioOtherBaseline !== 1} placeholder='(Max 100 characters)'
                                                value={specimen.bioOtherBaselineSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherBaselineSpecify(e.target.value))} />
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherOtherTime' checked={specimen.bioOtherOtherTime === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioOtherOtherTime(0)); dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherOtherTime' checked={specimen.bioOtherOtherTime === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioOtherOtherTime(1)); dispatch(allactions.specimenErrorActions.bioOtherOtherTime(true)) }} />{' '}Yes</span>
                                        <span className='col-xs-12'>If yes, please specify</span>
                                        <span className='col-xs-12'>
                                            <input className='form-control' disabled={specimen.bioOtherOtherTime !== 1} placeholder='(Max 100 characters)'
                                                value={specimen.bioOtherOtherTimeSpecify} onChange={e => dispatch(allactions.specimenActions.setBioOtherOtherTimeSpecify(e.target.value))} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.7 Did you collect repeated samples over multiple timepoints for the same individuals?</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioRepeatedSampleSameIndividual(0)); dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioRepeatedSampleSameIndividual(1)); dispatch(allactions.specimenErrorActions.bioRepeatedSampleSameIndividual(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.8 If your cohort does not currently collect tumor blocks, do you have information on where the blocks are kept/stored?</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTumorBlockInfo(0)); dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTumorBlockInfo(1)); dispatch(allactions.specimenErrorActions.bioTumorBlockInfo(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ backgroundColor: '#01857b' }}>
                                <td colspan='3'>
                                    <span style={{ color: 'white' }}>Do you have:</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.9 Genotyping Data (SNP)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioGenotypingData' checked={specimen.bioGenotypingData === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioGenotypingData(0)); dispatch(allactions.specimenErrorActions.bioGenotypingData(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioGenotypingData' checked={specimen.bioGenotypingData === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioGenotypingData(1)); dispatch(allactions.specimenErrorActions.bioGenotypingData(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.10  Sequencing Data – Exome</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataExome(0)); dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataExome(1)); dispatch(allactions.specimenErrorActions.bioSequencingDataExome(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.11  Sequencing Data – Whole Genome</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataWholeGenome(0)); dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioSequencingDataWholeGenome(1)); dispatch(allactions.specimenErrorActions.bioSequencingDataWholeGenome(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.12  Epigenetic Data (methylation, miRNA, histone chip-on-chip data)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioEpigeneticOrMetabolicMarkers(0)); dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioEpigeneticOrMetabolicMarkers(1)); dispatch(allactions.specimenErrorActions.bioEpigeneticOrMetabolicMarkers(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.13  Transcriptomics Data</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTranscriptomicsData(0)); dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioTranscriptomicsData(1)); dispatch(allactions.specimenErrorActions.bioTranscriptomicsData(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.14 Microbiome Data (16S RNA, metagenomics)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMicrobiomeData(0)); dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMicrobiomeData(1)); dispatch(allactions.specimenErrorActions.bioMicrobiomeData(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.15 Metabolomic Data (from MS and/or NMR) <strong> {'   '} If yes, please answer G15 a-i </strong></td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMetabolomicData(0)); dispatch(allactions.specimenErrorActions.bioMetabolomicData(true)) }} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMetabolomicData(1)); dispatch(allactions.specimenErrorActions.bioMetabolomicData(true)) }} />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>

                            <tr >

                                <td colspan='3'>
                                    {/* G15 a */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15a {'  '}Are the biospecimens collected fasting samples?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMetaFastingSample' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaFastingSample === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMetaFastingSample(0)); dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true)) }} />{' '}No</span>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMetaFastingSample' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaFastingSample === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMetaFastingSample(1)); dispatch(allactions.specimenErrorActions.bioMetaFastingSample(true)) }} />{' '}Yes</span>

                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 b */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15b {'  '}What are the disease outcome(s) in your study?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInCancerStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCancerStudy === 1}
                                                onClick={() => { dispatch(allactions.specimenActions.setBioMetaOutcomesInCancerStudy((specimen.bioMetaOutcomesInCancerStudy + 1) % 2)); dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCancerStudy(true)) }} />{' '}Cancer</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInCvdStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCvdStudy === 1}
                                                onClick={() => { dispatch(allactions.specimenActions.setBioMetaOutcomesInCvdStudy((specimen.bioMetaOutcomesInCvdStudy + 1) % 2)); dispatch(allactions.specimenErrorActions.bioMetaOutcomesInCvdStudy(true)) }} />{' '}CVD</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInDiabetesStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInDiabetesStudy === 1}
                                                onClick={() => { dispatch(allactions.specimenActions.setBioMetaOutcomesInDiabetesStudy((specimen.bioMetaOutcomesInDiabetesStudy + 1) % 2)); dispatch(allactions.specimenErrorActions.bioMetaOutcomesInDiabetesStudy(true)) }} />{' '}Diabetes</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInOtherStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInOtherStudy === 1}
                                                onClick={() => { dispatch(allactions.specimenActions.setBioMetaOutcomesInOtherStudy((specimen.bioMetaOutcomesInOtherStudy + 1) % 2)); dispatch(allactions.specimenErrorActions.bioMetaOutcomesInOtherStudy(true)) }} />{' '}Other</span>
                                            <span className='col-xs-12'>
                                                <textarea className="form-control resize-vertical" maxlength={100} name='setBioMetaOutcomesOtherStudySpecify' disabled={specimen.bioMetaOutcomesInOtherStudy !== 1 || specimen.bioMetabolomicData !== 1} placeholder='(Max 100 characters)' style={{ marign: 'auto' }}
                                                    value={specimen.bioMetaOutcomesOtherStudySpecify || ''}
                                                    onChange={e => dispatch(allactions.specimenActions.setBioMetaOutcomesOtherStudySpecify(e.target.value))} />
                                            </span>
                                        </div>
                                    </div>


                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 c */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15c {'  '}Are you a member of the Consortium of Metabolomics Studies (COMETS)?</span>
                                    </div>
                                    <div className='col-md-12'>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 0}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMemberOfMetabolomicsStudies(0)); dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true)) }} />{' '}No</span>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 1}
                                            onClick={() => { dispatch(allactions.specimenActions.setBioMemberOfMetabolomicsStudies(1)); dispatch(allactions.specimenErrorActions.bioMemberOfMetabolomicsStudies(true)) }} />{' '}Yes</span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 d */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15d {'  '}What is the number of participants with metabolomics data in your study?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'>
                                            <input maxLength='20' className='form-control' name='bioMemberInStudy' disabled={specimen.bioMetabolomicData !== 1} placeholder='input the number of participants with metabolomics data ' style={{ marign: 'auto' }}
                                                value={specimen.bioMemberInStudy} onChange={e => dispatch(allactions.specimenActions.setBioMemberInStudy(e.target.value))} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 e */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15e {'  '}Which laboratory or company was used for the analysis?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-xs-12'>
                                            <textarea className="form-control resize-vertical" maxlength={200} name='bioLabsUsedForAnalysis' disabled={specimen.bioMetabolomicData !== 1} placeholder='(Max 200 characters)' style={{ marign: 'auto' }}
                                                value={specimen.bioLabsUsedForAnalysis || ''}
                                                onChange={e => dispatch(allactions.specimenActions.setBioLabsUsedForAnalysis(e.target.value))} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 f */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15f {'  '}Which type(s) of analytical platform was used, (e.g., NMR, Orbitrap mass spectrometry, QTOF mass spectrometry)?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-xs-12'>
                                            <textarea className="form-control resize-vertical" maxlength={200} name='bioAnalyticalPlatform' disabled={specimen.bioMetabolomicData !== 1} placeholder='(Max 200 characters)' style={{ marign: 'auto' }}
                                                value={specimen.bioAnalyticalPlatform || ''}
                                                onChange={e => dispatch(allactions.specimenActions.setBioAnalyticalPlatform(e.target.value))} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 g*/}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15g {'  '}Which separation platform(s) was used (e.g., GC, HILIC, RPLC, Ion pairing LC)?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-xs-12'>
                                            <textarea className="form-control resize-vertical" maxlength={200} name='bioSeparationPlatform' disabled={specimen.bioMetabolomicData !== 1} placeholder='(Max 200 characters)' style={{ marign: 'auto' }}
                                                value={specimen.bioSeparationPlatform || ''}
                                                onChange={e => dispatch(allactions.specimenActions.setBioSeparationPlatform(e.target.value))} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 h */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15h {'  '}How many metabolites were measured?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'>
                                            <input maxLength='200' className='form-control' name='bioNumberMetabolitesMeasured' disabled={specimen.bioMetabolomicData !== 1} placeholder='(input the measured metabolites number)' style={{ marign: 'auto' }}
                                                value={specimen.bioNumberMetabolitesMeasured} onChange={e => dispatch(allactions.specimenActions.setBioNumberMetabolitesMeasured(e.target.value))} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 i */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }} > G.15i {'  '} What year were samples analyzed?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-1' style={{ paddingRight: '0' }}>
                                            {
                                                errors.bioYearSamplesSent && saved ?
                                                    <Reminder message={errors.bioYearSamplesSent}>
                                                        <input style={{ marign: 'auto', border: '1px solid red' }}
                                                            className='form-control' name='bioYearSamplesSent' placeholder='yyyy' value={specimen.bioYearSamplesSent} disabled={specimen.bioMetabolomicData !== 1}
                                                            onChange={e => dispatch(allactions.specimenActions.setBioYearSamplesSent(e.target.value))}
                                                            onBlur={(e) => { populateErrors(e.target.value, true, 'year') }} />
                                                    </Reminder>
                                                    :
                                                    <input style={{ marign: 'auto' }} className='form-control'
                                                        name='bioYearSamplesSent' placeholder='yyyy' value={specimen.bioYearSamplesSent} disabled={specimen.bioMetabolomicData !== 1}
                                                        onChange={e => dispatch(allactions.specimenActions.setBioYearSamplesSent(e.target.value))}
                                                        onBlur={(e) => { populateErrors('bioYearSamplesSent', e.target.value, true, 'year') }} />
                                            }
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Biospecimen Counts</div>
                <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>
                    <div><label>G.16 </label></div>
                    <p style={{ fontSize: '16px' }}>Please complete this table with the number of individuals with biospecimens available in your current inventory. If you do not have exact counts, please enter approximate counts. (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.) </p>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td>No Cancer</td>
                                <td><input className='inputWriter center' name='29-1' value={specimen.counts['29-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-2' value={specimen.counts['29-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-3' value={specimen.counts['29-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-4' value={specimen.counts['29-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-5' value={specimen.counts['29-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-6' value={specimen.counts['29-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='29-7' value={specimen.counts['29-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('29-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>141-149</td>
                                <td>C00-C14</td>
                                <td>Oropharyngeal</td>
                                <td><input className='inputWriter center' name='2-1' value={specimen.counts['2-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-2' value={specimen.counts['2-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-3' value={specimen.counts['2-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-4' value={specimen.counts['2-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-5' value={specimen.counts['2-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-6' value={specimen.counts['2-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='2-7' value={specimen.counts['2-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('2-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>150</td>
                                <td>C15</td>
                                <td>Esophagus</td>
                                <td><input className='inputWriter center' name='3-1' value={specimen.counts['3-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-2' value={specimen.counts['3-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-3' value={specimen.counts['3-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-4' value={specimen.counts['3-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-5' value={specimen.counts['3-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-6' value={specimen.counts['3-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='3-7' value={specimen.counts['3-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('3-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>151</td>
                                <td>C16</td>
                                <td>Stomach</td>
                                <td><input className='inputWriter center' name='4-1' value={specimen.counts['4-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-2' value={specimen.counts['4-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-3' value={specimen.counts['4-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-4' value={specimen.counts['4-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-5' value={specimen.counts['4-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-6' value={specimen.counts['4-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='4-7' value={specimen.counts['4-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('4-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>152</td>
                                <td>C17</td>
                                <td>Small intestine</td>
                                <td><input className='inputWriter center' name='5-1' value={specimen.counts['5-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-2' value={specimen.counts['5-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-3' value={specimen.counts['5-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-4' value={specimen.counts['5-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-5' value={specimen.counts['5-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-6' value={specimen.counts['5-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='5-7' value={specimen.counts['5-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('5-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>153</td>
                                <td>C18</td>
                                <td>Colon</td>
                                <td><input className='inputWriter center' name='6-1' value={specimen.counts['6-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-2' value={specimen.counts['6-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-3' value={specimen.counts['6-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-4' value={specimen.counts['6-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-5' value={specimen.counts['6-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-6' value={specimen.counts['6-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='6-7' value={specimen.counts['6-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('6-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>154</td>
                                <td>C19-C21</td>
                                <td>Rectum and anus</td>
                                <td><input className='inputWriter center' name='7-1' value={specimen.counts['7-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-2' value={specimen.counts['7-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-3' value={specimen.counts['7-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-4' value={specimen.counts['7-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-5' value={specimen.counts['7-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-6' value={specimen.counts['7-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='7-7' value={specimen.counts['7-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('7-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>155</td>
                                <td>C22</td>
                                <td>Liver and intrahepatic bile ducts</td>
                                <td><input className='inputWriter center' name='8-1' value={specimen.counts['8-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-2' value={specimen.counts['8-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-3' value={specimen.counts['8-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-4' value={specimen.counts['8-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-5' value={specimen.counts['8-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-6' value={specimen.counts['8-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='8-7' value={specimen.counts['8-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('8-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>156</td>
                                <td>C23, C24</td>
                                <td>Gallbladder and extrahepatic bile ducts</td>
                                <td><input className='inputWriter center' name='9-1' value={specimen.counts['9-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-2' value={specimen.counts['9-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-3' value={specimen.counts['9-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-4' value={specimen.counts['9-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-5' value={specimen.counts['9-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-6' value={specimen.counts['9-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='9-7' value={specimen.counts['9-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('9-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>157</td>
                                <td>C25</td>
                                <td>Pancreas</td>
                                <td><input className='inputWriter center' name='10-1' value={specimen.counts['10-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-2' value={specimen.counts['10-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-3' value={specimen.counts['10-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-4' value={specimen.counts['10-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-5' value={specimen.counts['10-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-6' value={specimen.counts['10-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='10-7' value={specimen.counts['10-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('10-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>162</td>
                                <td>C34</td>
                                <td>Lung and bronchus</td>
                                <td><input className='inputWriter center' name='11-1' value={specimen.counts['11-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-2' value={specimen.counts['11-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-3' value={specimen.counts['11-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-4' value={specimen.counts['11-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-5' value={specimen.counts['11-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-6' value={specimen.counts['11-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='11-7' value={specimen.counts['11-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('11-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>170</td>
                                <td>C40, C41</td>
                                <td>Bone</td>
                                <td><input className='inputWriter center' name='12-1' value={specimen.counts['12-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-2' value={specimen.counts['12-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-3' value={specimen.counts['12-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-4' value={specimen.counts['12-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-5' value={specimen.counts['12-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-6' value={specimen.counts['12-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='12-7' value={specimen.counts['12-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('12-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>172</td>
                                <td>C43</td>
                                <td>Melanoma (excluding mucosal sites)</td>
                                <td><input className='inputWriter center' name='13-1' value={specimen.counts['13-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-2' value={specimen.counts['13-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-3' value={specimen.counts['13-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-4' value={specimen.counts['13-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-5' value={specimen.counts['13-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-6' value={specimen.counts['13-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='13-7' value={specimen.counts['13-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('13-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>174-175</td>
                                <td>C50</td>
                                <td>Invasive Breast Cancer</td>
                                <td><input className='inputWriter center' name='14-1' value={specimen.counts['14-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-2' value={specimen.counts['14-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-3' value={specimen.counts['14-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-4' value={specimen.counts['14-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-5' value={specimen.counts['14-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-6' value={specimen.counts['14-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='14-7' value={specimen.counts['14-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('14-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>233</td>
                                <td>D05.1</td>
                                <td>Ductal carcinoma in situ of breast </td>
                                <td><input className='inputWriter center' name='15-1' value={specimen.counts['15-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-2' value={specimen.counts['15-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-3' value={specimen.counts['15-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-4' value={specimen.counts['15-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-5' value={specimen.counts['15-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-6' value={specimen.counts['15-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='15-7' value={specimen.counts['15-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('15-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>180</td>
                                <td>C53</td>
                                <td>Cervix (Squamous cell carcinoma, Adenocarcinoma)</td>
                                <td><input className='inputWriter center' name='16-1' value={specimen.counts['16-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-2' value={specimen.counts['16-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-3' value={specimen.counts['16-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-4' value={specimen.counts['16-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-5' value={specimen.counts['16-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-6' value={specimen.counts['16-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='16-7' value={specimen.counts['16-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('16-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>233</td>
                                <td>D06.1</td>
                                <td>Cervical carcinoma in situ (CIN II/III, CIS, AIS)</td>
                                <td><input className='inputWriter center' name='17-1' value={specimen.counts['17-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-2' value={specimen.counts['17-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-3' value={specimen.counts['17-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-4' value={specimen.counts['17-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-5' value={specimen.counts['17-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-6' value={specimen.counts['17-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='17-7' value={specimen.counts['17-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('17-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>182</td>
                                <td>C54</td>
                                <td>Corpus, body of uterus</td>
                                <td><input className='inputWriter center' name='18-1' value={specimen.counts['18-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-2' value={specimen.counts['18-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-3' value={specimen.counts['18-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-4' value={specimen.counts['18-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-5' value={specimen.counts['18-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-6' value={specimen.counts['18-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='18-7' value={specimen.counts['18-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('18-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>183</td>
                                <td>C56</td>
                                <td>Ovary, fallopian tube, broad ligament</td>
                                <td><input className='inputWriter center' name='19-1' value={specimen.counts['19-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-2' value={specimen.counts['19-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-3' value={specimen.counts['19-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-4' value={specimen.counts['19-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-5' value={specimen.counts['19-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-6' value={specimen.counts['19-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='19-7' value={specimen.counts['19-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('19-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>185</td>
                                <td>C61</td>
                                <td>Prostate</td>
                                <td><input className='inputWriter center' name='20-1' value={specimen.counts['20-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-2' value={specimen.counts['20-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-3' value={specimen.counts['20-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-4' value={specimen.counts['20-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-5' value={specimen.counts['20-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-6' value={specimen.counts['20-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='20-7' value={specimen.counts['20-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('20-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>188</td>
                                <td>C67</td>
                                <td>Bladder</td>
                                <td><input className='inputWriter center' name='21-1' value={specimen.counts['21-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-2' value={specimen.counts['21-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-3' value={specimen.counts['21-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-4' value={specimen.counts['21-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-5' value={specimen.counts['21-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-6' value={specimen.counts['21-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='21-7' value={specimen.counts['21-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('21-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>189</td>
                                <td>C64-C66, C68</td>
                                <td>Kidney and other unspecified urinary organs </td>
                                <td><input className='inputWriter center' name='22-1' value={specimen.counts['22-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-2' value={specimen.counts['22-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-3' value={specimen.counts['22-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-4' value={specimen.counts['22-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-5' value={specimen.counts['22-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-6' value={specimen.counts['22-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='22-7' value={specimen.counts['22-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('22-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>191</td>
                                <td>C71</td>
                                <td>Brain</td>
                                <td><input className='inputWriter center' name='23-1' value={specimen.counts['23-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-2' value={specimen.counts['23-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-3' value={specimen.counts['23-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-4' value={specimen.counts['23-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-5' value={specimen.counts['23-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-6' value={specimen.counts['23-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='23-7' value={specimen.counts['23-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('23-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>193</td>
                                <td>C73</td>
                                <td>Thyroid</td>
                                <td><input className='inputWriter center' name='24-1' value={specimen.counts['24-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-2' value={specimen.counts['24-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-3' value={specimen.counts['24-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-4' value={specimen.counts['24-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-5' value={specimen.counts['24-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-6' value={specimen.counts['24-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='24-7' value={specimen.counts['24-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('24-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>201</td>
                                <td>C81</td>
                                <td>Hodgkin Lymphoma </td>
                                <td><input className='inputWriter center' name='25-1' value={specimen.counts['25-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-2' value={specimen.counts['25-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-3' value={specimen.counts['25-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-4' value={specimen.counts['25-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-5' value={specimen.counts['25-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-6' value={specimen.counts['25-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='25-7' value={specimen.counts['25-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('25-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>200, 202</td>
                                <td>C82-85</td>
                                <td>Non-Hodgkin Lymphoma</td>
                                <td><input className='inputWriter center' name='26-1' value={specimen.counts['26-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-2' value={specimen.counts['26-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-3' value={specimen.counts['26-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-4' value={specimen.counts['26-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-5' value={specimen.counts['26-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-6' value={specimen.counts['26-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='26-7' value={specimen.counts['26-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('26-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>203</td>
                                <td>C90</td>
                                <td>Myeloma</td>
                                <td><input className='inputWriter center' name='27-1' value={specimen.counts['27-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-2' value={specimen.counts['27-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-3' value={specimen.counts['27-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-4' value={specimen.counts['27-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-5' value={specimen.counts['27-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-6' value={specimen.counts['27-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='27-7' value={specimen.counts['27-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('27-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>204-208</td>
                                <td>C91-95</td>
                                <td>Leukemia</td>
                                <td><input className='inputWriter center' name='28-1' value={specimen.counts['28-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-2' value={specimen.counts['28-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-3' value={specimen.counts['28-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-4' value={specimen.counts['28-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-5' value={specimen.counts['28-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-6' value={specimen.counts['28-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='28-7' value={specimen.counts['28-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('28-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>All Other Cancers</td>
                                <td><input className='inputWriter center' name='1-1' value={specimen.counts['1-1']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-1', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-2' value={specimen.counts['1-2']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-2', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-3' value={specimen.counts['1-3']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-3', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-4' value={specimen.counts['1-4']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-4', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-5' value={specimen.counts['1-5']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-5', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-6' value={specimen.counts['1-6']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-6', e.target.value))} /></td>
                                <td><input className='inputWriter center' name='1-7' value={specimen.counts['1-7']} onChange={e => dispatch(allactions.specimenActions.setSpecimenCount('1-7', e.target.value))} /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div sytle={{ position: 'relative' }}>
                <span onClick={() => props.sectionPicker('F')} style={{ position: 'relative', float: 'left' }}>
                    <input type='button' className='btn btn-primary' value='Go Back' />
                </span>
                <span style={{ position: 'relative', float: 'right' }}>
                    <span onClick={handleSave}>
                        <input type='button' className='btn btn-primary' value='Save' />
                    </span>

                    {section.A === 'complete' && section.B === 'complete' && section.C === 'complete' && section.D === 'complete' && section.E === 'complete' && section.F === 'complete' && section.G === 'complete' ? <span><input type='button' className='btn btn-primary' value='Submit For Review' /></span> : ''}
                </span>

            </div>
        </div>
    </div>
}

export default SpecimenForm