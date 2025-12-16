import t from "../actionTypes";

const bioBloodBaseline = (disabled) => ({ type: t.bioBloodBaseline, toDisable: disabled });
const bioBloodBaselineSerum = (disabled) => ({ type: t.bioBloodBaselineSerum, toDisable: disabled });
const bioBloodBaselinePlasma = (disabled) => ({ type: t.bioBloodBaselinePlasma, toDisable: disabled });
const bioBloodBaselineBuffyCoat = (disabled) => ({ type: t.bioBloodBaselineBuffyCoat, toDisable: disabled });
const bioBloodBaselineOtherDerivative = (disabled) => ({
  type: t.bioBloodBaselineOtherDerivative,
  toDisable: disabled,
});
const bioBloodOtherTime = (disabled) => ({ type: t.bioBloodOtherTime, toDisable: disabled });
const bioBloodOtherTimeSerum = (disabled) => ({ type: t.bioBloodOtherTimeSerum, toDisable: disabled });
const bioBloodOtherTimePlasma = (disabled) => ({ type: t.bioBloodOtherTimePlasma, toDisable: disabled });
const bioBloodOtherTimeBuffyCoat = (disabled) => ({ type: t.bioBloodOtherTimeBuffyCoat, toDisable: disabled });
const bioBloodOtherTimeOtherDerivative = (disabled) => ({
  type: t.bioBloodOtherTimeOtherDerivative,
  toDisable: disabled,
});
const bioBuccalSalivaBaseline = (disabled) => ({ type: t.bioBuccalSalivaBaseline, toDisable: disabled });
const bioBuccalSalivaOtherTime = (disabled) => ({ type: t.bioBuccalSalivaOtherTime, toDisable: disabled });
const bioTissueBaseline = (disabled) => ({ type: t.bioTissueBaseline, toDisable: disabled });
const bioTissueOtherTime = (disabled) => ({ type: t.bioTissueOtherTime, toDisable: disabled });
const bioUrineBaseline = (disabled) => ({ type: t.bioUrineBaseline, toDisable: disabled });
const bioUrineOtherTime = (disabled) => ({ type: t.bioUrineOtherTime, toDisable: disabled });
const bioFecesBaseline = (disabled) => ({ type: t.bioFecesBaseline, toDisable: disabled });
const bioFecesOtherTime = (disabled) => ({ type: t.bioFecesOtherTime, toDisable: disabled });
const bioOtherBaseline = (disabled) => ({ type: t.bioOtherBaseline, toDisable: disabled });
const bioOtherOtherTime = (disabled) => ({ type: t.bioOtherOtherTime, toDisable: disabled });
const bioRepeatedSampleSameIndividual = (disabled) => ({
  type: t.bioRepeatedSampleSameIndividual,
  toDisable: disabled,
});
const bioTumorBlockInfo = (disabled) => ({ type: t.bioTumorBlockInfo, toDisable: disabled });
const bioGenotypingData = (disabled) => ({ type: t.bioGenotypingData, toDisable: disabled });
const bioSequencingDataExome = (disabled) => ({ type: t.bioSequencingDataExome, toDisable: disabled });
const bioSequencingDataWholeGenome = (disabled) => ({ type: t.bioSequencingDataWholeGenome, toDisable: disabled });
const bioEpigeneticOrMetabolicMarkers = (disabled) => ({
  type: t.bioEpigeneticOrMetabolicMarkers,
  toDisable: disabled,
});
const bioOtherOmicsData = (disabled) => ({ type: t.bioOtherOmicsData, toDisable: disabled });
const bioTranscriptomicsData = (disabled) => ({ type: t.bioTranscriptomicsData, toDisable: disabled });
const bioMicrobiomeData = (disabled) => ({ type: t.bioMicrobiomeData, toDisable: disabled });
const bioMetabolomicData = (disabled) => ({ type: t.bioMetabolomicData, toDisable: disabled });
const bioMetaFastingSample = (disabled) => ({ type: t.bioMetaFastingSample, toDisable: disabled });
const bioMetaOutcomesInCancerStudy = (disabled) => ({ type: t.bioMetaOutcomesInCancerStudy, toDisable: disabled });
const bioMetaOutcomesInCvdStudy = (disabled) => ({ type: t.bioMetaOutcomesInCvdStudy, toDisable: disabled });
const bioMetaOutcomesInDiabetesStudy = (disabled) => ({ type: t.bioMetaOutcomesInDiabetesStudy, toDisable: disabled });
const bioMetaOutcomesInOtherStudy = (disabled) => ({ type: t.bioMetaOutcomesInOtherStudy, toDisable: disabled });
const bioMemberOfMetabolomicsStudies = (disabled) => ({ type: t.bioMemberOfMetabolomicsStudies, toDisable: disabled });
const bioOtherBaselineSpecify = (disabled) => ({ type: t.bioOtherBaselineSpecify, toDisable: disabled });
const bioOtherOtherTimeSpecify = (disabled) => ({ type: t.bioOtherOtherTimeSpecify, toDisable: disabled });
const bioMetaOutcomesOtherStudySpecify = (disabled) => ({
  type: t.bioMetaOutcomesOtherStudySpecify,
  toDisable: disabled,
});
const bioMemberInStudy = (disabled) => ({ type: t.bioMemberInStudy, toDisable: disabled });
const bioLabsUsedForAnalysis = (disabled) => ({ type: t.bioLabsUsedForAnalysis, toDisable: disabled });
const bioAnalyticalPlatform = (disabled) => ({ type: t.bioAnalyticalPlatform, toDisable: disabled });
const bioSeparationPlatform = (disabled) => ({ type: t.bioSeparationPlatform, toDisable: disabled });
const bioNumberMetabolitesMeasured = (disabled) => ({ type: t.bioNumberMetabolitesMeasured, toDisable: disabled });
const bioYearSamplesSent = (disabled) => ({ type: t.bioYearSamplesSent, toDisable: disabled });

export default {
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
};
