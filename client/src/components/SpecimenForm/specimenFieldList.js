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