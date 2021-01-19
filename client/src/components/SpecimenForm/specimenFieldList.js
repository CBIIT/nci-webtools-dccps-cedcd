export const specimenFieldList = [
    /* { part, title, [field_id, actionType, required, type ] } */

    {
        part: 'A', title: 'G.2 Buccal/Saliva',
        items: [{ field_id: 'bioBuccalSalivaBaseline', action_type: '', required: true, type: 'radio' },
        { field_id: 'bioBuccalSalivaOtherTime', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.3 Tissue (include tumor and/or normal)',
        items: [{ field_id: 'bioTissueBaseline', required: true, type: 'radio' },
        { field_id: 'bioTissueOtherTime', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.4 Urine', items: [{ field_id: 'bioUrineBaseline', required: true, type: 'radio' },
        { field_id: 'bioUrineOtherTime', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.5 Feces', items: [{ field_id: 'bioFecesBaseline', required: true, type: 'radio' },
        { field_id: 'bioFecesOtherTime', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.6 Other(e.g. toenails)', items: [{ field_id: 'bioOtherBaseline', required: true, type: 'radio' },
        { field_id: 'bioOtherOtherTime', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.7 Did you collect repeated samples over multiple timepoints for the same individuals?',
        items: [{ field_id: 'bioRepeatedSampleSameIndividual', required: true, type: 'radio' }]
    },
    {
        part: 'A', title: 'G.8 If your cohort does not currently collect tumor blocks, do you have information on where the blocks are kept/stored?',
        items: [{ field_id: 'bioTumorBlockInfo', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.9 Genotyping Data (SNP)',
        items: [{ field_id: 'bioGenotypingData', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.10 Sequencing Data – Exome',
        items: [{ field_id: 'bioSequencingDataExome', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.11 Sequencing Data – Whole Genome', items: [{ field_id: 'bioSequencingDataWholeGenome', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.12 Epigenetic Data (methylation, miRNA, histone chip-on-chip data)',
        items: [{ field_id: 'bioEpigeneticOrMetabolicMarkers', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.13 Transcriptomics Data', items: [{ field_id: 'bioTranscriptomicsData', required: true, type: 'radio' }]
    },
    {
        part: 'B', title: 'G.14 Microbiome Data (16S RNA, metagenomics)', items: [{ field_id: 'bioMicrobiomeData', required: true, type: 'radio' }]
    }
];


export const specimenColList = [
    { col: 'bio_blood_baseline', field_id: 'bioBloodBaseline' },
    { col: 'bio_blood_baseline_serum', field_id: 'bioBloodBaselineSerum' },
    { col: 'bio_blood_baseline_plasma', field_id: 'bioBloodBaselinePlasma' },
    { col: 'bio_blood_baseline_buffy_coat', field_id: 'bioBloodBaselineBuffyCoat' },
    { col: 'bio_blood_baseline_other_derivative', field_id: 'bioBloodBaselineOtherDerivative' },
    { col: 'bio_blood_other_time', field_id: 'bioBloodOtherTime' },
    { col: 'bio_blood_other_time_serum', field_id: 'bioBloodOtherTimeSerum' },
    { col: 'bio_blood_other_time_plasma', field_id: 'bioBloodOtherTimePlasma' },
    { col: 'bio_blood_other_time_buffy_coat', field_id: 'bioBloodOtherTimeBuffyCoat' },
    { col: 'bio_blood_other_time_other_derivative', field_id: 'bioBloodOtherTimeOtherDerivative' },
    { col: 'bio_buccal_saliva_baseline', field_id: 'bioBuccalSalivaBaseline' },
    { col: 'bio_buccal_saliva_other_time', field_id: 'bioBuccalSalivaOtherTime' },
    { col: 'bio_tissue_baseline', field_id: 'bioTissueBaseline' },
    { col: 'bio_tissue_other_time', field_id: 'bioTissueOtherTime' },
    { col: 'bio_urine_baseline', field_id: 'bioUrineBaseline' },
    { col: 'bio_urine_other_time', field_id: 'bioUrineOtherTime' },
    { col: 'bio_feces_baseline', field_id: 'bioFecesBaseline' },
    { col: 'bio_feces_other_time', field_id: 'bioFecesOtherTime' },
    { col: 'bio_other_baseline', field_id: 'bioOtherBaseline' },
    { col: 'bio_other_other_time', field_id: 'bioOtherOtherTime' },
    { col: 'bio_repeated_sample_same_individual', field_id: 'bioRepeatedSampleSameIndividual' },
    { col: 'bio_tumor_block_info', field_id: 'bioTumorBlockInfo' },
    { col: 'bio_genotyping_data', field_id: 'bioGenotypingData' },
    { col: 'bio_sequencing_data_exome', field_id: 'bioSequencingDataExome' },
    { col: 'bio_sequencing_data_whole_genome', field_id: 'bioSequencingDataWholeGenome' },
    { col: 'bio_epigenetic_or_metabolic_markers', field_id: 'bioEpigeneticOrMetabolicMarkers' },
    { col: 'bio_other_omics_data', field_id: 'bioOtherOmicsData' },
    { col: 'bio_transcriptomics_data', field_id: 'bioTranscriptomicsData' },
    { col: 'bio_microbiome_data', field_id: 'bioMicrobiomeData' },
    { col: 'bio_metabolomic_data', field_id: 'bioMetabolomicData' },
    { col: 'bio_meta_fasting_sample', field_id: 'bioMetaFastingSample' },
    { col: 'bio_meta_outcomes_in_cancer_study', field_id: 'bioMetaOutcomesInCancerStudy' },
    { col: 'bio_meta_outcomes_in_cvd_study', field_id: 'bioMetaOutcomesInCvdStudy' },
    { col: 'bio_meta_outcomes_in_diabetes_study', field_id: 'bioMetaOutcomesInDiabetesStudy' },
    { col: 'bio_meta_outcomes_in_other_study', field_id: 'bioMetaOutcomesInOtherStudy' },
    { col: 'bio_member_of_metabolomics_studies', field_id: 'bioMemberOfMetabolomicsStudies' }
];