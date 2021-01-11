import t from '../actionTypes'

const setSpecimenCount = (cellId, v) => ({
    type: t.setSpecimenCount,
    cell: cellId,
    value: v
})

const setSpecimenLoaded = (v) => ({ type: t.setSpecimenLoaded, value: v })
const bioBloodBaseline = (v) => ({ type: t.bioBloodBaseline, value: v })
const bioBloodBaselineSerum = (v) => ({ type: t.bioBloodBaselineSerum, value: v })
const bioBloodBaselinePlasma = (v) => ({ type: t.bioBloodBaselinePlasma, value: v })
const bioBloodBaselineBuffyCoat = (v) => ({ type: t.bioBloodBaselineBuffyCoat, value: v })
const bioBloodBaselineOtherDerivative = (v) => ({ type: t.bioBloodBaselineOtherDerivative, value: v })
const bioBloodOtherTime = (v) => ({ type: t.bioBloodOtherTime, value: v })
const bioBloodOtherTimeSerum = (v) => ({ type: t.bioBloodOtherTimeSerum, value: v })
const bioBloodOtherTimePlasma = (v) => ({ type: t.bioBloodOtherTimePlasma, value: v })
const bioBloodOtherTimeBuffyCoat = (v) => ({ type: t.bioBloodOtherTimeBuffyCoat, value: v })
const bioBloodOtherTimeOtherDerivative = (v) => ({ type: t.bioBloodOtherTimeOtherDerivative, value: v })
const bioBuccalSalivaBaseline = (v) => ({ type: t.bioBuccalSalivaBaseline, value: v })
const bioBuccalSalivaOtherTime = (v) => ({ type: t.bioBuccalSalivaOtherTime, value: v })
const bioTissueBaseline = (v) => ({ type: t.bioTissueBaseline, value: v })
const bioTissueOtherTime = (v) => ({ type: t.bioTissueOtherTime, value: v })
const bioUrineBaseline = (v) => ({ type: t.bioUrineBaseline, value: v })
const bioUrineOtherTime = (v) => ({ type: t.bioUrineOtherTime, value: v })
const bioFecesBaseline = (v) => ({ type: t.bioFecesBaseline, value: v })
const bioFecesOtherTime = (v) => ({ type: t.bioFecesOtherTime, value: v })
const bioOtherBaseline = (v) => ({ type: t.bioOtherBaseline, value: v })
const bioOtherOtherTime = (v) => ({ type: t.bioOtherOtherTime, value: v })
const bioRepeatedSampleSameIndividual = (v) => ({ type: t.bioRepeatedSampleSameIndividual, value: v })
const bioTumorBlockInfo = (v) => ({ type: t.bioTumorBlockInfo, value: v })
const bioGenotypingData = (v) => ({ type: t.bioGenotypingData, value: v })
const bioSequencingDataExome = (v) => ({ type: t.bioSequencingDataExome, value: v })
const bioSequencingDataWholeGenome = (v) => ({ type: t.bioSequencingDataWholeGenome, value: v })
const bioEpigeneticOrMetabolicMarkers = (v) => ({ type: t.bioEpigeneticOrMetabolicMarkers, value: v })
const bioOtherOmicsData = (v) => ({ type: t.bioOtherOmicsData, value: v })
const bioTranscriptomicsData = (v) => ({ type: t.bioTranscriptomicsData, value: v })
const bioMicrobiomeData = (v) => ({ type: t.bioMicrobiomeData, value: v })
const bioMetabolomicData = (v) => ({ type: t.bioMetabolomicData, value: v })
const bioMetaFastingSample = (v) => ({ type: t.bioMetaFastingSample, value: v })
const bioMetaOutcomesInCancerStudy = (v) => ({ type: t.bioMetaOutcomesInCancerStudy, value: v })
const bioMetaOutcomesInCvdStudy = (v) => ({ type: t.bioMetaOutcomesInCvdStudy, value: v })
const bioMetaOutcomesInDiabetesStudy = (v) => ({ type: t.bioMetaOutcomesInDiabetesStudy, value: v })
const bioMetaOutcomesInOtherStudy = (v) => ({ type: t.bioMetaOutcomesInOtherStudy, value: v })
const bioMemberOfMetabolomicsStudies = (v) => ({ type: t.bioMemberOfMetabolomicsStudies, value: v })
const bioOtherBaselineSpecify = (v) => ({ type: t.bioOtherBaselineSpecify, value: v })
const bioOtherOtherTimeSpecify = (v) => ({ type: t.bioOtherOtherTimeSpecify, value: v })
const bioMetaOutcomesOtherStudySpecify = (v) => ({ type: t.bioMetaOutcomesOtherStudySpecify, value: v })
const bioMemberInStudy = (v) => ({ type: t.bioMemberInStudy, value: v })
const bioLabsUsedForAnalysis = (v) => ({ type: t.bioLabsUsedForAnalysis, value: v })
const bioAnalyticalPlatform = (v) => ({ type: t.bioAnalyticalPlatform, value: v })
const bioSeparationPlatform = (v) => ({ type: t.bioSeparationPlatform, value: v })
const bioNumberMetabolitesMeasured = (v) => ({ type: t.bioNumberMetabolitesMeasured, value: v })
const bioYearSamplesSent = (v) => ({ type: t.bioYearSamplesSent, value: v })
const setSectionGStatus = (v) => ({ type: t.setSectionGStatus, value: v })


export default {
    setSpecimenLoaded,
    setSpecimenCount,
    bioBloodBaseline,
    bioBloodBaselineSerum,
    bioBloodBaselinePlasma,
    bioBloodBaselineBuffyCoat,
    bioBloodBaselineOtherDerivative,
    bioBloodOtherTime,
    bioBloodOtherTimeSerum,
    bioBloodOtherTimePlasma,
    bioBloodOtherTimeBuffyCoat,
    bioBloodOtherTimeOtherDerivative,
    bioBuccalSalivaBaseline,
    bioBuccalSalivaOtherTime,
    bioTissueBaseline,
    bioTissueOtherTime,
    bioUrineBaseline,
    bioUrineOtherTime,
    bioFecesBaseline,
    bioFecesOtherTime,
    bioOtherBaseline,
    bioOtherOtherTime,
    bioRepeatedSampleSameIndividual,
    bioTumorBlockInfo,
    bioGenotypingData,
    bioSequencingDataExome,
    bioSequencingDataWholeGenome,
    bioEpigeneticOrMetabolicMarkers,
    bioOtherOmicsData,
    bioTranscriptomicsData,
    bioMicrobiomeData,
    bioMetabolomicData,
    bioMetaFastingSample,
    bioMetaOutcomesInCancerStudy,
    bioMetaOutcomesInCvdStudy,
    bioMetaOutcomesInDiabetesStudy,
    bioMetaOutcomesInOtherStudy,
    bioMemberOfMetabolomicsStudies,
    bioOtherBaselineSpecify,
    bioOtherOtherTimeSpecify,
    bioMetaOutcomesOtherStudySpecify,
    bioMemberInStudy,
    bioLabsUsedForAnalysis,
    bioAnalyticalPlatform,
    bioSeparationPlatform,
    bioNumberMetabolitesMeasured,
    bioYearSamplesSent,
    setSectionGStatus
}