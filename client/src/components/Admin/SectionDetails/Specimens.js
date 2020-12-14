import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../../actions'
import validator from '../../../validators'
import Messenger from '../../Snackbar/Snackbar'
import Reminder from '../../Tooltip/Tooltip'


import './SpecimenForm.css'

const SpecimenForm = ({ ...props }) => {
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)

    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [activePanel, setActivePanel] = useState('panelA')
    const cohortId = window.location.pathname.split('/').pop();



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



    return <div id='specimenInfoContainer' className='col-md-12'>
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
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaseline' checked={specimen.bioBloodBaseline === 0} />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaseline' checked={specimen.bioBloodBaseline === 1}

                                        />{' '}Yes</span>
                                    </div>
                                    <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <span className='col-sm-12'>If collected, types of aliquots</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineSerum' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineSerum === 1}
                                        />{' '}Serum</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselinePlasma' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselinePlasma === 1}
                                        />{' '}Plasma</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineBuffyCoat' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineBuffyCoat === 1}
                                        />{' '}Buffy Coat</span>
                                        <span className='col-sm-12'><input type='checkbox' name='bioBloodBaselineOtherDerivative' disabled={specimen.bioBloodBaseline !== 1} checked={specimen.bioBloodBaselineOtherDerivative === 1}
                                        />{' '}Other blood derivative</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodOtherTime' checked={specimen.bioBloodOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodOtherTime' checked={specimen.bioBloodOtherTime === 1}
                                        />{' '}Yes</span>
                                    </div>
                                    <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <span className='col-xs-12'>If collected, types of aliquots</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeSerum' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeSerum === 1}
                                        />{' '}Serum</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimePlasma' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimePlasma === 1}
                                        />{' '}Plasma</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeBuffyCoat' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeBuffyCoat === 1}
                                        />{' '}Buffy Coat</span>
                                        <span className='col-xs-12'><input type='checkbox' name='bioBloodOtherTimeOtherDerivative' disabled={specimen.bioBloodOtherTime !== 1} checked={specimen.bioBloodOtherTimeOtherDerivative === 1}
                                        />{' '}Other blood derivative</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.2 Buccal/Saliva</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaBaseline' checked={specimen.bioBuccalSalivaBaseline === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaBaseline' checked={specimen.bioBuccalSalivaBaseline === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaOtherTime' checked={specimen.bioBuccalSalivaOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBuccalSalivaOtherTime' checked={specimen.bioBuccalSalivaOtherTime === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.3 Tissue (include tumor and/or normal</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueBaseline' checked={specimen.bioTissueBaseline === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueBaseline' checked={specimen.bioTissueBaseline === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTissueOtherTime' checked={specimen.bioTissueOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaselineSerum' checked={specimen.bioTissueOtherTime === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.4 Urine</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineBaseline' checked={specimen.bioUrineBaseline === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineBaseline' checked={specimen.bioUrineBaseline === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineOtherTime' checked={specimen.bioUrineOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioUrineOtherTime' checked={specimen.bioUrineOtherTime === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.5 Feces</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesBaseline' checked={specimen.bioFecesBaseline === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesBaseline' checked={specimen.bioFecesBaseline === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesOtherTime' checked={specimen.bioFecesOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioFecesOtherTime' checked={specimen.bioFecesOtherTime === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>G.6 Other(e.g. toenails)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherBaseline' checked={specimen.bioOtherBaseline === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioBloodBaselineSerum' checked={specimen.bioOtherBaseline === 1}
                                        />{' '}Yes</span>
                                        <span className='col-xs-12'>If yes, please specify</span>
                                        <span className='col-xs-12'>
                                            <textarea className="form-control resize-vertical" maxlength={100} name='bioOtherBaselineSpecify' disabled={specimen.bioOtherBaseline !== 1} placeholder='(Max 100 characters)'
                                                value={specimen.bioOtherBaselineSpecify} />
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherOtherTime' checked={specimen.bioOtherOtherTime === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioOtherOtherTime' checked={specimen.bioOtherOtherTime === 1}
                                        />{' '}Yes</span>
                                        <span className='col-xs-12'>If yes, please specify</span>
                                        <span className='col-xs-12'>
                                            <textarea className="form-control resize-vertical" maxlength={100} name='bioOtherOtherTimeSpecify' disabled={specimen.bioOtherOtherTime !== 1} placeholder='(Max 100 characters)'
                                                value={specimen.bioOtherOtherTimeSpecify} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.7 Did you collect repeated samples over multiple timepoints for the same individuals?</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={specimen.bioRepeatedSampleSameIndividual === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.8 If your cohort does not currently collect tumor blocks, do you have information on where the blocks are kept/stored?</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTumorBlockInfo' checked={specimen.bioTumorBlockInfo === 1}
                                        />{' '}Yes</span>
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
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioGenotypingData' checked={specimen.bioGenotypingData === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.10  Sequencing Data – Exome</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataExome' checked={specimen.bioSequencingDataExome === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.11  Sequencing Data – Whole Genome</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioSequencingDataWholeGenome' checked={specimen.bioSequencingDataWholeGenome === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.12  Epigenetic Data (methylation, miRNA, histone chip-on-chip data)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioEpigeneticOrMetabolicMarkers' checked={specimen.bioEpigeneticOrMetabolicMarkers === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.13  Transcriptomics Data</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioTranscriptomicsData' checked={specimen.bioTranscriptomicsData === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.14 Microbiome Data (16S RNA, metagenomics)</td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMicrobiomeData' checked={specimen.bioMicrobiomeData === 1}
                                        />{' '}Yes</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>G.15 Metabolomic Data (from MS and/or NMR) <strong> {'   '} If yes, please answer G15 a-i </strong></td>
                                <td>
                                    <div className='col-xs-12'>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 0}
                                        />{' '}No</span>
                                        <span className='col-xs-6'><input type='radio' style={{ marign: 'auto' }} name='bioMetabolomicData' checked={specimen.bioMetabolomicData === 1}
                                        />{' '}Yes</span>
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
                                        />{' '}No</span>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMetaFastingSample' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaFastingSample === 1}
                                        />{' '}Yes</span>

                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 b */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15b {'  '}What are the disease outcome(s) in your study?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <div className='col-xs-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInCancerStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCancerStudy === 1}
                                            />{' '}Cancer</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInCvdStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInCvdStudy === 1}
                                            />{' '}CVD</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInDiabetesStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInDiabetesStudy === 1}
                                            />{' '}Diabetes</span>
                                            <span className='col-xs-12'><input className='col-xs-1' type='checkbox' style={{ marign: 'auto' }} name='bioMetaOutcomesInOtherStudy' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMetaOutcomesInOtherStudy === 1}
                                            />{' '}Other</span>
                                            <span className='col-xs-12'>
                                                <textarea className="form-control resize-vertical" maxlength={100} name='setBioMetaOutcomesOtherStudySpecify' disabled={specimen.bioMetaOutcomesInOtherStudy !== 1 || specimen.bioMetabolomicData !== 1} placeholder='(Max 100 characters)' style={{ marign: 'auto' }}
                                                    value={specimen.bioMetaOutcomesOtherStudySpecify || ''} />
                                            </span>
                                        </div>
                                    </div>


                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 c */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15c {'  '}Are you a member of the Consortium of Metabolomics Studies (COMETS)?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 0}
                                        />{' '}No</span>
                                        <span className='col-md-2'><input type='radio' style={{ marign: 'auto' }} name='bioMemberOfMetabolomicsStudies' disabled={specimen.bioMetabolomicData !== 1} checked={specimen.bioMemberOfMetabolomicsStudies === 1}
                                        />{' '}Yes</span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 d */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15d {'  '}What is the number of participants with metabolomics data in your study?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'>
                                            <input maxLength='20' className='form-control' name='bioMemberInStudy' disabled={specimen.bioMetabolomicData !== 1} placeholder='(input a number)' style={{ marign: 'auto' }}
                                                value={specimen.bioMemberInStudy} />
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
                                                value={specimen.bioLabsUsedForAnalysis || ''} />
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
                                                value={specimen.bioAnalyticalPlatform || ''} />
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
                                                value={specimen.bioSeparationPlatform || ''} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 h */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }}> G.15h {'  '}How many metabolites were measured?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-2'>
                                            <input maxLength='200' className='form-control' name='bioNumberMetabolitesMeasured' disabled={specimen.bioMetabolomicData !== 1} placeholder='(input a number)' style={{ marign: 'auto' }}
                                                value={specimen.bioNumberMetabolitesMeasured} />
                                        </span>
                                    </div>

                                    <div className='col-md-12' style={{ marginBottom: '8px' }}> </div>
                                    {/* G15 i */}
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-12' style={{ paddingLeft: '0' }} > G.15i {'  '} What year were samples analyzed?</span>
                                    </div>
                                    <div className='col-md-12' style={{ marginBottom: '8px' }}>
                                        <span className='col-md-1' style={{ paddingRight: '0' }}>

                                            <input style={{ marign: 'auto' }} className='form-control'
                                                name='bioYearSamplesSent' placeholder='yyyy' value={specimen.bioYearSamplesSent} disabled={specimen.bioMetabolomicData !== 1} />

                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Biospecimen Counts</div>
                <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{ padding: '0' }}>
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
                                <td><input className='inputWriter center' name='29-1' value={specimen.counts['29-1']} /></td>
                                <td><input className='inputWriter center' name='29-2' value={specimen.counts['29-2']} /></td>
                                <td><input className='inputWriter center' name='29-3' value={specimen.counts['29-3']} /></td>
                                <td><input className='inputWriter center' name='29-4' value={specimen.counts['29-4']} /></td>
                                <td><input className='inputWriter center' name='29-5' value={specimen.counts['29-5']} /></td>
                                <td><input className='inputWriter center' name='29-6' value={specimen.counts['29-6']} /></td>
                                <td><input className='inputWriter center' name='29-7' value={specimen.counts['29-7']} /></td>
                            </tr>
                            <tr>
                                <td>141-149</td>
                                <td>C00-C14</td>
                                <td>Oropharyngeal</td>
                                <td><input className='inputWriter center' name='2-1' value={specimen.counts['2-1']} /></td>
                                <td><input className='inputWriter center' name='2-2' value={specimen.counts['2-2']} /></td>
                                <td><input className='inputWriter center' name='2-3' value={specimen.counts['2-3']} /></td>
                                <td><input className='inputWriter center' name='2-4' value={specimen.counts['2-4']} /></td>
                                <td><input className='inputWriter center' name='2-5' value={specimen.counts['2-5']} /></td>
                                <td><input className='inputWriter center' name='2-6' value={specimen.counts['2-6']} /></td>
                                <td><input className='inputWriter center' name='2-7' value={specimen.counts['2-7']} /></td>
                            </tr>
                            <tr>
                                <td>150</td>
                                <td>C15</td>
                                <td>Esophagus</td>
                                <td><input className='inputWriter center' name='3-1' value={specimen.counts['3-1']} /></td>
                                <td><input className='inputWriter center' name='3-2' value={specimen.counts['3-2']} /></td>
                                <td><input className='inputWriter center' name='3-3' value={specimen.counts['3-3']} /></td>
                                <td><input className='inputWriter center' name='3-4' value={specimen.counts['3-4']} /></td>
                                <td><input className='inputWriter center' name='3-5' value={specimen.counts['3-5']} /></td>
                                <td><input className='inputWriter center' name='3-6' value={specimen.counts['3-6']} /></td>
                                <td><input className='inputWriter center' name='3-7' value={specimen.counts['3-7']} /></td>
                            </tr>
                            <tr>
                                <td>151</td>
                                <td>C16</td>
                                <td>Stomach</td>
                                <td><input className='inputWriter center' name='4-1' value={specimen.counts['4-1']} /></td>
                                <td><input className='inputWriter center' name='4-2' value={specimen.counts['4-2']} /></td>
                                <td><input className='inputWriter center' name='4-3' value={specimen.counts['4-3']} /></td>
                                <td><input className='inputWriter center' name='4-4' value={specimen.counts['4-4']} /></td>
                                <td><input className='inputWriter center' name='4-5' value={specimen.counts['4-5']} /></td>
                                <td><input className='inputWriter center' name='4-6' value={specimen.counts['4-6']} /></td>
                                <td><input className='inputWriter center' name='4-7' value={specimen.counts['4-7']} /></td>
                            </tr>
                            <tr>
                                <td>152</td>
                                <td>C17</td>
                                <td>Small intestine</td>
                                <td><input className='inputWriter center' name='5-1' value={specimen.counts['5-1']} /></td>
                                <td><input className='inputWriter center' name='5-2' value={specimen.counts['5-2']} /></td>
                                <td><input className='inputWriter center' name='5-3' value={specimen.counts['5-3']} /></td>
                                <td><input className='inputWriter center' name='5-4' value={specimen.counts['5-4']} /></td>
                                <td><input className='inputWriter center' name='5-5' value={specimen.counts['5-5']} /></td>
                                <td><input className='inputWriter center' name='5-6' value={specimen.counts['5-6']} /></td>
                                <td><input className='inputWriter center' name='5-7' value={specimen.counts['5-7']} /></td>
                            </tr>
                            <tr>
                                <td>153</td>
                                <td>C18</td>
                                <td>Colon</td>
                                <td><input className='inputWriter center' name='6-1' value={specimen.counts['6-1']} /></td>
                                <td><input className='inputWriter center' name='6-2' value={specimen.counts['6-2']} /></td>
                                <td><input className='inputWriter center' name='6-3' value={specimen.counts['6-3']} /></td>
                                <td><input className='inputWriter center' name='6-4' value={specimen.counts['6-4']} /></td>
                                <td><input className='inputWriter center' name='6-5' value={specimen.counts['6-5']} /></td>
                                <td><input className='inputWriter center' name='6-6' value={specimen.counts['6-6']} /></td>
                                <td><input className='inputWriter center' name='6-7' value={specimen.counts['6-7']} /></td>
                            </tr>
                            <tr>
                                <td>154</td>
                                <td>C19-C21</td>
                                <td>Rectum and anus</td>
                                <td><input className='inputWriter center' name='7-1' value={specimen.counts['7-1']} /></td>
                                <td><input className='inputWriter center' name='7-2' value={specimen.counts['7-2']} /></td>
                                <td><input className='inputWriter center' name='7-3' value={specimen.counts['7-3']} /></td>
                                <td><input className='inputWriter center' name='7-4' value={specimen.counts['7-4']} /></td>
                                <td><input className='inputWriter center' name='7-5' value={specimen.counts['7-5']} /></td>
                                <td><input className='inputWriter center' name='7-6' value={specimen.counts['7-6']} /></td>
                                <td><input className='inputWriter center' name='7-7' value={specimen.counts['7-7']} /></td>
                            </tr>
                            <tr>
                                <td>155</td>
                                <td>C22</td>
                                <td>Liver and intrahepatic bile ducts</td>
                                <td><input className='inputWriter center' name='8-1' value={specimen.counts['8-1']} /></td>
                                <td><input className='inputWriter center' name='8-2' value={specimen.counts['8-2']} /></td>
                                <td><input className='inputWriter center' name='8-3' value={specimen.counts['8-3']} /></td>
                                <td><input className='inputWriter center' name='8-4' value={specimen.counts['8-4']} /></td>
                                <td><input className='inputWriter center' name='8-5' value={specimen.counts['8-5']} /></td>
                                <td><input className='inputWriter center' name='8-6' value={specimen.counts['8-6']} /></td>
                                <td><input className='inputWriter center' name='8-7' value={specimen.counts['8-7']} /></td>
                            </tr>
                            <tr>
                                <td>156</td>
                                <td>C23, C24</td>
                                <td>Gallbladder and extrahepatic bile ducts</td>
                                <td><input className='inputWriter center' name='9-1' value={specimen.counts['9-1']} /></td>
                                <td><input className='inputWriter center' name='9-2' value={specimen.counts['9-2']} /></td>
                                <td><input className='inputWriter center' name='9-3' value={specimen.counts['9-3']} /></td>
                                <td><input className='inputWriter center' name='9-4' value={specimen.counts['9-4']} /></td>
                                <td><input className='inputWriter center' name='9-5' value={specimen.counts['9-5']} /></td>
                                <td><input className='inputWriter center' name='9-6' value={specimen.counts['9-6']} /></td>
                                <td><input className='inputWriter center' name='9-7' value={specimen.counts['9-7']} /></td>
                            </tr>
                            <tr>
                                <td>157</td>
                                <td>C25</td>
                                <td>Pancreas</td>
                                <td><input className='inputWriter center' name='10-1' value={specimen.counts['10-1']} /></td>
                                <td><input className='inputWriter center' name='10-2' value={specimen.counts['10-2']} /></td>
                                <td><input className='inputWriter center' name='10-3' value={specimen.counts['10-3']} /></td>
                                <td><input className='inputWriter center' name='10-4' value={specimen.counts['10-4']} /></td>
                                <td><input className='inputWriter center' name='10-5' value={specimen.counts['10-5']} /></td>
                                <td><input className='inputWriter center' name='10-6' value={specimen.counts['10-6']} /></td>
                                <td><input className='inputWriter center' name='10-7' value={specimen.counts['10-7']} /></td>
                            </tr>
                            <tr>
                                <td>162</td>
                                <td>C34</td>
                                <td>Lung and bronchus</td>
                                <td><input className='inputWriter center' name='11-1' value={specimen.counts['11-1']} /></td>
                                <td><input className='inputWriter center' name='11-2' value={specimen.counts['11-2']} /></td>
                                <td><input className='inputWriter center' name='11-3' value={specimen.counts['11-3']} /></td>
                                <td><input className='inputWriter center' name='11-4' value={specimen.counts['11-4']} /></td>
                                <td><input className='inputWriter center' name='11-5' value={specimen.counts['11-5']} /></td>
                                <td><input className='inputWriter center' name='11-6' value={specimen.counts['11-6']} /></td>
                                <td><input className='inputWriter center' name='11-7' value={specimen.counts['11-7']} /></td>
                            </tr>
                            <tr>
                                <td>170</td>
                                <td>C40, C41</td>
                                <td>Bone</td>
                                <td><input className='inputWriter center' name='12-1' value={specimen.counts['12-1']} /></td>
                                <td><input className='inputWriter center' name='12-2' value={specimen.counts['12-2']} /></td>
                                <td><input className='inputWriter center' name='12-3' value={specimen.counts['12-3']} /></td>
                                <td><input className='inputWriter center' name='12-4' value={specimen.counts['12-4']} /></td>
                                <td><input className='inputWriter center' name='12-5' value={specimen.counts['12-5']} /></td>
                                <td><input className='inputWriter center' name='12-6' value={specimen.counts['12-6']} /></td>
                                <td><input className='inputWriter center' name='12-7' value={specimen.counts['12-7']} /></td>
                            </tr>
                            <tr>
                                <td>172</td>
                                <td>C43</td>
                                <td>Melanoma (excluding mucosal sites)</td>
                                <td><input className='inputWriter center' name='13-1' value={specimen.counts['13-1']} /></td>
                                <td><input className='inputWriter center' name='13-2' value={specimen.counts['13-2']} /></td>
                                <td><input className='inputWriter center' name='13-3' value={specimen.counts['13-3']} /></td>
                                <td><input className='inputWriter center' name='13-4' value={specimen.counts['13-4']} /></td>
                                <td><input className='inputWriter center' name='13-5' value={specimen.counts['13-5']} /></td>
                                <td><input className='inputWriter center' name='13-6' value={specimen.counts['13-6']} /></td>
                                <td><input className='inputWriter center' name='13-7' value={specimen.counts['13-7']} /></td>
                            </tr>
                            <tr>
                                <td>174-175</td>
                                <td>C50</td>
                                <td>Invasive Breast Cancer</td>
                                <td><input className='inputWriter center' name='14-1' value={specimen.counts['14-1']} /></td>
                                <td><input className='inputWriter center' name='14-2' value={specimen.counts['14-2']} /></td>
                                <td><input className='inputWriter center' name='14-3' value={specimen.counts['14-3']} /></td>
                                <td><input className='inputWriter center' name='14-4' value={specimen.counts['14-4']} /></td>
                                <td><input className='inputWriter center' name='14-5' value={specimen.counts['14-5']} /></td>
                                <td><input className='inputWriter center' name='14-6' value={specimen.counts['14-6']} /></td>
                                <td><input className='inputWriter center' name='14-7' value={specimen.counts['14-7']} /></td>
                            </tr>
                            <tr>
                                <td>233</td>
                                <td>D05.1</td>
                                <td>Ductal carcinoma in situ of breast </td>
                                <td><input className='inputWriter center' name='15-1' value={specimen.counts['15-1']} /></td>
                                <td><input className='inputWriter center' name='15-2' value={specimen.counts['15-2']} /></td>
                                <td><input className='inputWriter center' name='15-3' value={specimen.counts['15-3']} /></td>
                                <td><input className='inputWriter center' name='15-4' value={specimen.counts['15-4']} /></td>
                                <td><input className='inputWriter center' name='15-5' value={specimen.counts['15-5']} /></td>
                                <td><input className='inputWriter center' name='15-6' value={specimen.counts['15-6']} /></td>
                                <td><input className='inputWriter center' name='15-7' value={specimen.counts['15-7']} /></td>
                            </tr>
                            <tr>
                                <td>180</td>
                                <td>C53</td>
                                <td>Cervix (Squamous cell carcinoma, Adenocarcinoma)</td>
                                <td><input className='inputWriter center' name='16-1' value={specimen.counts['16-1']} /></td>
                                <td><input className='inputWriter center' name='16-2' value={specimen.counts['16-2']} /></td>
                                <td><input className='inputWriter center' name='16-3' value={specimen.counts['16-3']} /></td>
                                <td><input className='inputWriter center' name='16-4' value={specimen.counts['16-4']} /></td>
                                <td><input className='inputWriter center' name='16-5' value={specimen.counts['16-5']} /></td>
                                <td><input className='inputWriter center' name='16-6' value={specimen.counts['16-6']} /></td>
                                <td><input className='inputWriter center' name='16-7' value={specimen.counts['16-7']} /></td>
                            </tr>
                            <tr>
                                <td>233</td>
                                <td>D06.1</td>
                                <td>Cervical carcinoma in situ (CIN II/III, CIS, AIS)</td>
                                <td><input className='inputWriter center' name='17-1' value={specimen.counts['17-1']} /></td>
                                <td><input className='inputWriter center' name='17-2' value={specimen.counts['17-2']} /></td>
                                <td><input className='inputWriter center' name='17-3' value={specimen.counts['17-3']} /></td>
                                <td><input className='inputWriter center' name='17-4' value={specimen.counts['17-4']} /></td>
                                <td><input className='inputWriter center' name='17-5' value={specimen.counts['17-5']} /></td>
                                <td><input className='inputWriter center' name='17-6' value={specimen.counts['17-6']} /></td>
                                <td><input className='inputWriter center' name='17-7' value={specimen.counts['17-7']} /></td>
                            </tr>
                            <tr>
                                <td>182</td>
                                <td>C54</td>
                                <td>Corpus, body of uterus</td>
                                <td><input className='inputWriter center' name='18-1' value={specimen.counts['18-1']} /></td>
                                <td><input className='inputWriter center' name='18-2' value={specimen.counts['18-2']} /></td>
                                <td><input className='inputWriter center' name='18-3' value={specimen.counts['18-3']} /></td>
                                <td><input className='inputWriter center' name='18-4' value={specimen.counts['18-4']} /></td>
                                <td><input className='inputWriter center' name='18-5' value={specimen.counts['18-5']} /></td>
                                <td><input className='inputWriter center' name='18-6' value={specimen.counts['18-6']} /></td>
                                <td><input className='inputWriter center' name='18-7' value={specimen.counts['18-7']} /></td>
                            </tr>
                            <tr>
                                <td>183</td>
                                <td>C56</td>
                                <td>Ovary, fallopian tube, broad ligament</td>
                                <td><input className='inputWriter center' name='19-1' value={specimen.counts['19-1']} /></td>
                                <td><input className='inputWriter center' name='19-2' value={specimen.counts['19-2']} /></td>
                                <td><input className='inputWriter center' name='19-3' value={specimen.counts['19-3']} /></td>
                                <td><input className='inputWriter center' name='19-4' value={specimen.counts['19-4']} /></td>
                                <td><input className='inputWriter center' name='19-5' value={specimen.counts['19-5']} /></td>
                                <td><input className='inputWriter center' name='19-6' value={specimen.counts['19-6']} /></td>
                                <td><input className='inputWriter center' name='19-7' value={specimen.counts['19-7']} /></td>
                            </tr>
                            <tr>
                                <td>185</td>
                                <td>C61</td>
                                <td>Prostate</td>
                                <td><input className='inputWriter center' name='20-1' value={specimen.counts['20-1']} /></td>
                                <td><input className='inputWriter center' name='20-2' value={specimen.counts['20-2']} /></td>
                                <td><input className='inputWriter center' name='20-3' value={specimen.counts['20-3']} /></td>
                                <td><input className='inputWriter center' name='20-4' value={specimen.counts['20-4']} /></td>
                                <td><input className='inputWriter center' name='20-5' value={specimen.counts['20-5']} /></td>
                                <td><input className='inputWriter center' name='20-6' value={specimen.counts['20-6']} /></td>
                                <td><input className='inputWriter center' name='20-7' value={specimen.counts['20-7']} /></td>
                            </tr>
                            <tr>
                                <td>188</td>
                                <td>C67</td>
                                <td>Bladder</td>
                                <td><input className='inputWriter center' name='21-1' value={specimen.counts['21-1']} /></td>
                                <td><input className='inputWriter center' name='21-2' value={specimen.counts['21-2']} /></td>
                                <td><input className='inputWriter center' name='21-3' value={specimen.counts['21-3']} /></td>
                                <td><input className='inputWriter center' name='21-4' value={specimen.counts['21-4']} /></td>
                                <td><input className='inputWriter center' name='21-5' value={specimen.counts['21-5']} /></td>
                                <td><input className='inputWriter center' name='21-6' value={specimen.counts['21-6']} /></td>
                                <td><input className='inputWriter center' name='21-7' value={specimen.counts['21-7']} /></td>
                            </tr>
                            <tr>
                                <td>189</td>
                                <td>C64-C66, C68</td>
                                <td>Kidney and other unspecified urinary organs </td>
                                <td><input className='inputWriter center' name='22-1' value={specimen.counts['22-1']} /></td>
                                <td><input className='inputWriter center' name='22-2' value={specimen.counts['22-2']} /></td>
                                <td><input className='inputWriter center' name='22-3' value={specimen.counts['22-3']} /></td>
                                <td><input className='inputWriter center' name='22-4' value={specimen.counts['22-4']} /></td>
                                <td><input className='inputWriter center' name='22-5' value={specimen.counts['22-5']} /></td>
                                <td><input className='inputWriter center' name='22-6' value={specimen.counts['22-6']} /></td>
                                <td><input className='inputWriter center' name='22-7' value={specimen.counts['22-7']} /></td>
                            </tr>
                            <tr>
                                <td>191</td>
                                <td>C71</td>
                                <td>Brain</td>
                                <td><input className='inputWriter center' name='23-1' value={specimen.counts['23-1']} /></td>
                                <td><input className='inputWriter center' name='23-2' value={specimen.counts['23-2']} /></td>
                                <td><input className='inputWriter center' name='23-3' value={specimen.counts['23-3']} /></td>
                                <td><input className='inputWriter center' name='23-4' value={specimen.counts['23-4']} /></td>
                                <td><input className='inputWriter center' name='23-5' value={specimen.counts['23-5']} /></td>
                                <td><input className='inputWriter center' name='23-6' value={specimen.counts['23-6']} /></td>
                                <td><input className='inputWriter center' name='23-7' value={specimen.counts['23-7']} /></td>
                            </tr>
                            <tr>
                                <td>193</td>
                                <td>C73</td>
                                <td>Thyroid</td>
                                <td><input className='inputWriter center' name='24-1' value={specimen.counts['24-1']} /></td>
                                <td><input className='inputWriter center' name='24-2' value={specimen.counts['24-2']} /></td>
                                <td><input className='inputWriter center' name='24-3' value={specimen.counts['24-3']} /></td>
                                <td><input className='inputWriter center' name='24-4' value={specimen.counts['24-4']} /></td>
                                <td><input className='inputWriter center' name='24-5' value={specimen.counts['24-5']} /></td>
                                <td><input className='inputWriter center' name='24-6' value={specimen.counts['24-6']} /></td>
                                <td><input className='inputWriter center' name='24-7' value={specimen.counts['24-7']} /></td>
                            </tr>
                            <tr>
                                <td>201</td>
                                <td>C81</td>
                                <td>Hodgkin Lymphoma </td>
                                <td><input className='inputWriter center' name='25-1' value={specimen.counts['25-1']} /></td>
                                <td><input className='inputWriter center' name='25-2' value={specimen.counts['25-2']} /></td>
                                <td><input className='inputWriter center' name='25-3' value={specimen.counts['25-3']} /></td>
                                <td><input className='inputWriter center' name='25-4' value={specimen.counts['25-4']} /></td>
                                <td><input className='inputWriter center' name='25-5' value={specimen.counts['25-5']} /></td>
                                <td><input className='inputWriter center' name='25-6' value={specimen.counts['25-6']} /></td>
                                <td><input className='inputWriter center' name='25-7' value={specimen.counts['25-7']} /></td>
                            </tr>
                            <tr>
                                <td>200, 202</td>
                                <td>C82-85</td>
                                <td>Non-Hodgkin Lymphoma</td>
                                <td><input className='inputWriter center' name='26-1' value={specimen.counts['26-1']} /></td>
                                <td><input className='inputWriter center' name='26-2' value={specimen.counts['26-2']} /></td>
                                <td><input className='inputWriter center' name='26-3' value={specimen.counts['26-3']} /></td>
                                <td><input className='inputWriter center' name='26-4' value={specimen.counts['26-4']} /></td>
                                <td><input className='inputWriter center' name='26-5' value={specimen.counts['26-5']} /></td>
                                <td><input className='inputWriter center' name='26-6' value={specimen.counts['26-6']} /></td>
                                <td><input className='inputWriter center' name='26-7' value={specimen.counts['26-7']} /></td>
                            </tr>
                            <tr>
                                <td>203</td>
                                <td>C90</td>
                                <td>Myeloma</td>
                                <td><input className='inputWriter center' name='27-1' value={specimen.counts['27-1']} /></td>
                                <td><input className='inputWriter center' name='27-2' value={specimen.counts['27-2']} /></td>
                                <td><input className='inputWriter center' name='27-3' value={specimen.counts['27-3']} /></td>
                                <td><input className='inputWriter center' name='27-4' value={specimen.counts['27-4']} /></td>
                                <td><input className='inputWriter center' name='27-5' value={specimen.counts['27-5']} /></td>
                                <td><input className='inputWriter center' name='27-6' value={specimen.counts['27-6']} /></td>
                                <td><input className='inputWriter center' name='27-7' value={specimen.counts['27-7']} /></td>
                            </tr>
                            <tr>
                                <td>204-208</td>
                                <td>C91-95</td>
                                <td>Leukemia</td>
                                <td><input className='inputWriter center' name='28-1' value={specimen.counts['28-1']} /></td>
                                <td><input className='inputWriter center' name='28-2' value={specimen.counts['28-2']} /></td>
                                <td><input className='inputWriter center' name='28-3' value={specimen.counts['28-3']} /></td>
                                <td><input className='inputWriter center' name='28-4' value={specimen.counts['28-4']} /></td>
                                <td><input className='inputWriter center' name='28-5' value={specimen.counts['28-5']} /></td>
                                <td><input className='inputWriter center' name='28-6' value={specimen.counts['28-6']} /></td>
                                <td><input className='inputWriter center' name='28-7' value={specimen.counts['28-7']} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>All Other Cancers</td>
                                <td><input className='inputWriter center' name='1-1' value={specimen.counts['1-1']} /></td>
                                <td><input className='inputWriter center' name='1-2' value={specimen.counts['1-2']} /></td>
                                <td><input className='inputWriter center' name='1-3' value={specimen.counts['1-3']} /></td>
                                <td><input className='inputWriter center' name='1-4' value={specimen.counts['1-4']} /></td>
                                <td><input className='inputWriter center' name='1-5' value={specimen.counts['1-5']} /></td>
                                <td><input className='inputWriter center' name='1-6' value={specimen.counts['1-6']} /></td>
                                <td><input className='inputWriter center' name='1-7' value={specimen.counts['1-7']} /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div sytle={{ position: 'relative' }}>
                <span onClick={() => props.sectionPicker('F')} style={{ position: 'relative', float: 'left' }}>
                    <input type='button' className='btn btn-primary' value='<< Prev' />
                </span>


            </div>
        </div>
    </div>
}

export default SpecimenForm