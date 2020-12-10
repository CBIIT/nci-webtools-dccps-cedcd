import t from '../actionTypes'

const setSpecimenCount = (cellId, v) => ({
    type: t.setSpecimenCount,
    cell: cellId,
    value: v
})

const setSpecimenLoaded = (v) => ({ type: t.setSpecimenLoaded, value: v })
const setBioBloodBaseline = (v) => ({ type: t.setBioBloodBaseline, value: v })
const setBioBloodBaselineSerum = (v) => ({ type: t.setBioBloodBaselineSerum, value: v })
const setBioBloodBaselinePlasma = (v) => ({ type: t.setBioBloodBaselinePlasma, value: v })
const setBioBloodBaselineBuffyCoat = (v) => ({ type: t.setBioBloodBaselineBuffyCoat, value: v })
const setBioBloodBaselineOtherDerivative = (v) => ({ type: t.setBioBloodBaselineOtherDerivative, value: v })
const setBioBloodOtherTime = (v) => ({ type: t.setBioBloodOtherTime, value: v })
const setBioBloodOtherTimeSerum = (v) => ({ type: t.setBioBloodOtherTimeSerum, value: v })
const setBioBloodOtherTimePlasma = (v) => ({ type: t.setBioBloodOtherTimePlasma, value: v })
const setBioBloodOtherTimeBuffyCoat = (v) => ({ type: t.setBioBloodOtherTimeBuffyCoat, value: v })
const setBioBloodOtherTimeOtherDerivative = (v) => ({ type: t.setBioBloodOtherTimeOtherDerivative, value: v })
const setBioBuccalSalivaBaseline = (v) => ({ type: t.setBioBuccalSalivaBaseline, value: v })
const setBioBuccalSalivaOtherTime = (v) => ({ type: t.setBioBuccalSalivaOtherTime, value: v })
const setBioTissueBaseline = (v) => ({ type: t.setBioTissueBaseline, value: v })
const setBioTissueOtherTime = (v) => ({ type: t.setBioTissueOtherTime, value: v })
const setBioUrineBaseline = (v) => ({ type: t.setBioUrineBaseline, value: v })
const setBioUrineOtherTime = (v) => ({ type: t.setBioUrineOtherTime, value: v })
const setBioFecesBaseline = (v) => ({ type: t.setBioFecesBaseline, value: v })
const setBioFecesOtherTime = (v) => ({ type: t.setBioFecesOtherTime, value: v })
const setBioOtherBaseline = (v) => ({ type: t.setBioOtherBaseline, value: v })
const setBioOtherOtherTime = (v) => ({ type: t.setBioOtherOtherTime, value: v })
const setBioRepeatedSampleSameIndividual = (v) => ({ type: t.setBioRepeatedSampleSameIndividual, value: v })
const setBioTumorBlockInfo = (v) => ({ type: t.setBioTumorBlockInfo, value: v })
const setBioGenotypingData = (v) => ({ type: t.setBioGenotypingData, value: v })
const setBioSequencingDataExome = (v) => ({ type: t.setBioSequencingDataExome, value: v })
const setBioSequencingDataWholeGenome = (v) => ({ type: t.setBioSequencingDataWholeGenome, value: v })
const setBioEpigeneticOrMetabolicMarkers = (v) => ({ type: t.setBioEpigeneticOrMetabolicMarkers, value: v })
const setBioOtherOmicsData = (v) => ({ type: t.setBioOtherOmicsData, value: v })
const setBioTranscriptomicsData = (v) => ({ type: t.setBioTranscriptomicsData, value: v })
const setBioMicrobiomeData = (v) => ({ type: t.setBioMicrobiomeData, value: v })
const setBioMetabolomicData = (v) => ({ type: t.setBioMetabolomicData, value: v })
const setBioMetaFastingSample = (v) => ({ type: t.setBioMetaFastingSample, value: v })
const setBioMetaOutcomesInCancerStudy = (v) => ({ type: t.setBioMetaOutcomesInCancerStudy, value: v })
const setBioMetaOutcomesInCvdStudy = (v) => ({ type: t.setBioMetaOutcomesInCvdStudy, value: v })
const setBioMetaOutcomesInDiabetesStudy = (v) => ({ type: t.setBioMetaOutcomesInDiabetesStudy, value: v })
const setBioMetaOutcomesInOtherStudy = (v) => ({ type: t.setBioMetaOutcomesInOtherStudy, value: v })
const setBioMemberOfMetabolomicsStudies = (v) => ({ type: t.setBioMemberOfMetabolomicsStudies, value: v })
const setBioOtherBaselineSpecify = (v) => ({ type: t.setBioOtherBaselineSpecify, value: v })
const setBioOtherOtherTimeSpecify = (v) => ({ type: t.setBioOtherOtherTimeSpecify, value: v })
const setBioMetaOutcomesOtherStudySpecify = (v) => ({ type: t.setBioMetaOutcomesOtherStudySpecify, value: v })
const setBioMemberInStudy = (v) => ({ type: t.setBioMemberInStudy, value: v })
const setBioLabsUsedForAnalysis = (v) => ({ type: t.setBioLabsUsedForAnalysis, value: v })
const setBioAnalyticalPlatform = (v) => ({ type: t.setBioAnalyticalPlatform, value: v })
const setBioSeparationPlatform = (v) => ({ type: t.setBioSeparationPlatform, value: v })
const setBioNumberMetabolitesMeasured = (v) => ({ type: t.setBioNumberMetabolitesMeasured, value: v })
const setBioYearSamplesSent = (v) => ({ type: t.setBioYearSamplesSent, value: v })


export default {
    setSpecimenLoaded,
    setSpecimenCount,
    setBioBloodBaseline,
    setBioBloodBaselineSerum,
    setBioBloodBaselinePlasma,
    setBioBloodBaselineBuffyCoat,
    setBioBloodBaselineOtherDerivative,
    setBioBloodOtherTime,
    setBioBloodOtherTimeSerum,
    setBioBloodOtherTimePlasma,
    setBioBloodOtherTimeBuffyCoat,
    setBioBloodOtherTimeOtherDerivative,
    setBioBuccalSalivaBaseline,
    setBioBuccalSalivaOtherTime,
    setBioTissueBaseline,
    setBioTissueOtherTime,
    setBioUrineBaseline,
    setBioUrineOtherTime,
    setBioFecesBaseline,
    setBioFecesOtherTime,
    setBioOtherBaseline,
    setBioOtherOtherTime,
    setBioRepeatedSampleSameIndividual,
    setBioTumorBlockInfo,
    setBioGenotypingData,
    setBioSequencingDataExome,
    setBioSequencingDataWholeGenome,
    setBioEpigeneticOrMetabolicMarkers,
    setBioOtherOmicsData,
    setBioTranscriptomicsData,
    setBioMicrobiomeData,
    setBioMetabolomicData,
    setBioMetaFastingSample,
    setBioMetaOutcomesInCancerStudy,
    setBioMetaOutcomesInCvdStudy,
    setBioMetaOutcomesInDiabetesStudy,
    setBioMetaOutcomesInOtherStudy,
    setBioMemberOfMetabolomicsStudies,
    setBioOtherBaselineSpecify,
    setBioOtherOtherTimeSpecify,
    setBioMetaOutcomesOtherStudySpecify,
    setBioMemberInStudy,
    setBioLabsUsedForAnalysis,
    setBioAnalyticalPlatform,
    setBioSeparationPlatform,
    setBioNumberMetabolitesMeasured,
    setBioYearSamplesSent
}