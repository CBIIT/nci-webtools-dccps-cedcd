import t from "../actionTypes";

const setSpecimenCount = (cellId, v) => ({
  type: t.setSpecimenCount,
  cell: cellId,
  value: v,
});

const setSpecimenLoaded = (v) => ({ type: t.setSpecimenLoaded, value: v });
const bioBloodBaseline = (v) => ({ type: t.setBioBloodBaseline, value: v });
const bioBloodBaselineSerum = (v) => ({ type: t.setBioBloodBaselineSerum, value: v });
const bioBloodBaselinePlasma = (v) => ({ type: t.setBioBloodBaselinePlasma, value: v });
const bioBloodBaselineBuffyCoat = (v) => ({ type: t.setBioBloodBaselineBuffyCoat, value: v });
const bioBloodBaselineOtherDerivative = (v) => ({ type: t.setBioBloodBaselineOtherDerivative, value: v });
const bioBloodOtherTime = (v) => ({ type: t.setBioBloodOtherTime, value: v });
const bioBloodOtherTimeSerum = (v) => ({ type: t.setBioBloodOtherTimeSerum, value: v });
const bioBloodOtherTimePlasma = (v) => ({ type: t.setBioBloodOtherTimePlasma, value: v });
const bioBloodOtherTimeBuffyCoat = (v) => ({ type: t.setBioBloodOtherTimeBuffyCoat, value: v });
const bioBloodOtherTimeOtherDerivative = (v) => ({ type: t.setBioBloodOtherTimeOtherDerivative, value: v });
const bioBuccalSalivaBaseline = (v) => ({ type: t.setBioBuccalSalivaBaseline, value: v });
const bioBuccalSalivaOtherTime = (v) => ({ type: t.setBioBuccalSalivaOtherTime, value: v });
const bioTissueBaseline = (v) => ({ type: t.setBioTissueBaseline, value: v });
const bioTissueOtherTime = (v) => ({ type: t.setBioTissueOtherTime, value: v });
const bioUrineBaseline = (v) => ({ type: t.setBioUrineBaseline, value: v });
const bioUrineOtherTime = (v) => ({ type: t.setBioUrineOtherTime, value: v });
const bioFecesBaseline = (v) => ({ type: t.setBioFecesBaseline, value: v });
const bioFecesOtherTime = (v) => ({ type: t.setBioFecesOtherTime, value: v });
const bioOtherBaseline = (v) => ({ type: t.setBioOtherBaseline, value: v });
const bioOtherOtherTime = (v) => ({ type: t.setBioOtherOtherTime, value: v });
const bioRepeatedSampleSameIndividual = (v) => ({ type: t.setBioRepeatedSampleSameIndividual, value: v });
const bioTumorBlockInfo = (v) => ({ type: t.setBioTumorBlockInfo, value: v });
const bioGenotypingData = (v) => ({ type: t.setBioGenotypingData, value: v });
const bioSequencingDataExome = (v) => ({ type: t.setBioSequencingDataExome, value: v });
const bioSequencingDataWholeGenome = (v) => ({ type: t.setBioSequencingDataWholeGenome, value: v });
const bioEpigeneticOrMetabolicMarkers = (v) => ({ type: t.setBioEpigeneticOrMetabolicMarkers, value: v });
const bioOtherOmicsData = (v) => ({ type: t.setBioOtherOmicsData, value: v });
const bioTranscriptomicsData = (v) => ({ type: t.setBioTranscriptomicsData, value: v });
const bioMicrobiomeData = (v) => ({ type: t.setBioMicrobiomeData, value: v });
const bioMetabolomicData = (v) => ({ type: t.setBioMetabolomicData, value: v });
const bioMetaFastingSample = (v) => ({ type: t.setBioMetaFastingSample, value: v });
const bioMetaOutcomesInCancerStudy = (v) => ({ type: t.setBioMetaOutcomesInCancerStudy, value: v });
const bioMetaOutcomesInCvdStudy = (v) => ({ type: t.setBioMetaOutcomesInCvdStudy, value: v });
const bioMetaOutcomesInDiabetesStudy = (v) => ({ type: t.setBioMetaOutcomesInDiabetesStudy, value: v });
const bioMetaOutcomesInOtherStudy = (v) => ({ type: t.setBioMetaOutcomesInOtherStudy, value: v });
const bioMemberOfMetabolomicsStudies = (v) => ({ type: t.setBioMemberOfMetabolomicsStudies, value: v });
const bioOtherBaselineSpecify = (v) => ({ type: t.setBioOtherBaselineSpecify, value: v });
const bioOtherOtherTimeSpecify = (v) => ({ type: t.setBioOtherOtherTimeSpecify, value: v });
const bioMetaOutcomesOtherStudySpecify = (v) => ({ type: t.setBioMetaOutcomesOtherStudySpecify, value: v });
const bioMemberInStudy = (v) => ({ type: t.setBioMemberInStudy, value: v });
const bioLabsUsedForAnalysis = (v) => ({ type: t.setBioLabsUsedForAnalysis, value: v });
const bioAnalyticalPlatform = (v) => ({ type: t.setBioAnalyticalPlatform, value: v });
const bioSeparationPlatform = (v) => ({ type: t.setBioSeparationPlatform, value: v });
const bioNumberMetabolitesMeasured = (v) => ({ type: t.setBioNumberMetabolitesMeasured, value: v });
const bioYearSamplesSent = (v) => ({ type: t.setBioYearSamplesSent, value: v });
const setSectionGStatus = (v) => ({ type: t.setSectionGStatus, value: v });

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
  setSectionGStatus,
};
