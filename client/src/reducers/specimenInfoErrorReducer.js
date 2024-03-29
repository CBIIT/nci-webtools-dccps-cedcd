import t from "../actionTypes";
import InitialStates from "../states";

const actions = {};

actions[t.bioBloodBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodBaseline) cloned.bioBloodBaseline = false;
  } else {
    cloned.bioBloodBaseline = true;
  }
  return cloned;
};
actions[t.bioBloodBaselineSerum] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodBaselineSerum) cloned.bioBloodBaselineSerum = false;
  } else {
    cloned.bioBloodBaselineSerum = true;
  }
  return cloned;
};
actions[t.bioBloodBaselinePlasma] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodBaselinePlasma) cloned.bioBloodBaselinePlasma = false;
  } else {
    cloned.bioBloodBaselinePlasma = true;
  }
  return cloned;
};
actions[t.bioBloodBaselineBuffyCoat] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodBaselineBuffyCoat) cloned.bioBloodBaselineBuffyCoat = false;
  } else {
    cloned.bioBloodBaselineBuffyCoat = true;
  }
  return cloned;
};
actions[t.bioBloodBaselineOtherDerivative] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodBaselineOtherDerivative) cloned.bioBloodBaselineOtherDerivative = false;
  } else {
    cloned.bioBloodBaselineOtherDerivative = true;
  }
  return cloned;
};
actions[t.bioBloodOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodOtherTime) cloned.bioBloodOtherTime = false;
  } else {
    cloned.bioBloodOtherTime = true;
  }
  return cloned;
};
actions[t.bioBloodOtherTimeSerum] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodOtherTimeSerum) cloned.bioBloodOtherTimeSerum = false;
  } else {
    cloned.bioBloodOtherTimeSerum = true;
  }
  return cloned;
};
actions[t.bioBloodOtherTimePlasma] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodOtherTimePlasma) cloned.bioBloodOtherTimePlasma = false;
  } else {
    cloned.bioBloodOtherTimePlasma = true;
  }
  return cloned;
};
actions[t.bioBloodOtherTimeBuffyCoat] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodOtherTimeBuffyCoat) cloned.bioBloodOtherTimeBuffyCoat = false;
  } else {
    cloned.bioBloodOtherTimeBuffyCoat = true;
  }
  return cloned;
};
actions[t.bioBloodOtherTimeOtherDerivative] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBloodOtherTimeOtherDerivative) cloned.bioBloodOtherTimeOtherDerivative = false;
  } else {
    cloned.bioBloodOtherTimeOtherDerivative = true;
  }
  return cloned;
};
actions[t.bioBuccalSalivaBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBuccalSalivaBaseline) cloned.bioBuccalSalivaBaseline = false;
  } else {
    cloned.bioBuccalSalivaBaseline = true;
  }
  return cloned;
};
actions[t.bioBuccalSalivaOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioBuccalSalivaOtherTime) cloned.bioBuccalSalivaOtherTime = false;
  } else {
    cloned.bioBuccalSalivaOtherTime = true;
  }
  return cloned;
};
actions[t.bioTissueBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioTissueBaseline) cloned.bioTissueBaseline = false;
  } else {
    cloned.bioTissueBaseline = true;
  }
  return cloned;
};
actions[t.bioTissueOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioTissueOtherTime) cloned.bioTissueOtherTime = false;
  } else {
    cloned.bioTissueOtherTime = true;
  }
  return cloned;
};
actions[t.bioUrineBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioUrineBaseline) cloned.bioUrineBaseline = false;
  } else {
    cloned.bioUrineBaseline = true;
  }
  return cloned;
};
actions[t.bioUrineOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioUrineOtherTime) cloned.bioUrineOtherTime = false;
  } else {
    cloned.bioUrineOtherTime = true;
  }
  return cloned;
};
actions[t.bioFecesBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioFecesBaseline) cloned.bioFecesBaseline = false;
  } else {
    cloned.bioFecesBaseline = true;
  }
  return cloned;
};
actions[t.bioFecesOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioFecesOtherTime) cloned.bioFecesOtherTime = false;
  } else {
    cloned.bioFecesOtherTime = true;
  }
  return cloned;
};
actions[t.bioOtherBaseline] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioOtherBaseline) cloned.bioOtherBaseline = false;
  } else {
    cloned.bioOtherBaseline = true;
  }
  return cloned;
};
actions[t.bioOtherOtherTime] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioOtherOtherTime) cloned.bioOtherOtherTime = false;
  } else {
    cloned.bioOtherOtherTime = true;
  }
  return cloned;
};
actions[t.bioRepeatedSampleSameIndividual] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioRepeatedSampleSameIndividual) cloned.bioRepeatedSampleSameIndividual = false;
  } else {
    cloned.bioRepeatedSampleSameIndividual = true;
  }
  return cloned;
};
actions[t.bioTumorBlockInfo] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioTumorBlockInfo) cloned.bioTumorBlockInfo = false;
  } else {
    cloned.bioTumorBlockInfo = true;
  }
  return cloned;
};
actions[t.bioGenotypingData] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioGenotypingData) cloned.bioGenotypingData = false;
  } else {
    cloned.bioGenotypingData = true;
  }
  return cloned;
};
actions[t.bioSequencingDataExome] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioSequencingDataExome) cloned.bioSequencingDataExome = false;
  } else {
    cloned.bioSequencingDataExome = true;
  }
  return cloned;
};
actions[t.bioSequencingDataWholeGenome] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioSequencingDataWholeGenome) cloned.bioSequencingDataWholeGenome = false;
  } else {
    cloned.bioSequencingDataWholeGenome = true;
  }
  return cloned;
};
actions[t.bioEpigeneticOrMetabolicMarkers] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioEpigeneticOrMetabolicMarkers) cloned.bioEpigeneticOrMetabolicMarkers = false;
  } else {
    cloned.bioEpigeneticOrMetabolicMarkers = true;
  }
  return cloned;
};
actions[t.bioOtherOmicsData] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioOtherOmicsData) cloned.bioOtherOmicsData = false;
  } else {
    cloned.bioOtherOmicsData = true;
  }
  return cloned;
};
actions[t.bioTranscriptomicsData] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioTranscriptomicsData) cloned.bioTranscriptomicsData = false;
  } else {
    cloned.bioTranscriptomicsData = true;
  }
  return cloned;
};
actions[t.bioMicrobiomeData] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMicrobiomeData) cloned.bioMicrobiomeData = false;
  } else {
    cloned.bioMicrobiomeData = true;
  }
  return cloned;
};
actions[t.bioMetabolomicData] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetabolomicData) cloned.bioMetabolomicData = false;
  } else {
    cloned.bioMetabolomicData = true;
  }
  return cloned;
};
actions[t.bioMetaFastingSample] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaFastingSample) cloned.bioMetaFastingSample = false;
  } else {
    cloned.bioMetaFastingSample = true;
  }
  return cloned;
};
actions[t.bioMetaOutcomesInCancerStudy] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaOutcomesInCancerStudy) cloned.bioMetaOutcomesInCancerStudy = false;
  } else {
    cloned.bioMetaOutcomesInCancerStudy = true;
  }
  return cloned;
};
actions[t.bioMetaOutcomesInCvdStudy] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaOutcomesInCvdStudy) cloned.bioMetaOutcomesInCvdStudy = false;
  } else {
    cloned.bioMetaOutcomesInCvdStudy = true;
  }
  return cloned;
};
actions[t.bioMetaOutcomesInDiabetesStudy] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaOutcomesInDiabetesStudy) cloned.bioMetaOutcomesInDiabetesStudy = false;
  } else {
    cloned.bioMetaOutcomesInDiabetesStudy = true;
  }
  return cloned;
};
actions[t.bioMetaOutcomesInOtherStudy] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaOutcomesInOtherStudy) cloned.bioMetaOutcomesInOtherStudy = false;
  } else {
    cloned.bioMetaOutcomesInOtherStudy = true;
  }
  return cloned;
};
actions[t.bioMemberOfMetabolomicsStudies] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMemberOfMetabolomicsStudies) cloned.bioMemberOfMetabolomicsStudies = false;
  } else {
    cloned.bioMemberOfMetabolomicsStudies = true;
  }
  return cloned;
};
actions[t.bioOtherBaselineSpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioOtherBaselineSpecify) cloned.bioOtherBaselineSpecify = false;
  } else {
    cloned.bioOtherBaselineSpecify = true;
  }
  return cloned;
};
actions[t.bioOtherOtherTimeSpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioOtherOtherTimeSpecify) cloned.bioOtherOtherTimeSpecify = false;
  } else {
    cloned.bioOtherOtherTimeSpecify = true;
  }
  return cloned;
};
actions[t.bioMetaOutcomesOtherStudySpecify] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMetaOutcomesOtherStudySpecify) cloned.bioMetaOutcomesOtherStudySpecify = false;
  } else {
    cloned.bioMetaOutcomesOtherStudySpecify = true;
  }
  return cloned;
};
actions[t.bioMemberInStudy] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioMemberInStudy) cloned.bioMemberInStudy = false;
  } else {
    cloned.bioMemberInStudy = true;
  }
  return cloned;
};
actions[t.bioLabsUsedForAnalysis] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioLabsUsedForAnalysis) cloned.bioLabsUsedForAnalysis = false;
  } else {
    cloned.bioLabsUsedForAnalysis = true;
  }
  return cloned;
};
actions[t.bioAnalyticalPlatform] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioAnalyticalPlatform) cloned.bioAnalyticalPlatform = false;
  } else {
    cloned.bioAnalyticalPlatform = true;
  }
  return cloned;
};
actions[t.bioSeparationPlatform] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioSeparationPlatform) cloned.bioSeparationPlatform = false;
  } else {
    cloned.bioSeparationPlatform = true;
  }
  return cloned;
};
actions[t.bioNumberMetabolitesMeasured] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioNumberMetabolitesMeasured) cloned.bioNumberMetabolitesMeasured = false;
  } else {
    cloned.bioNumberMetabolitesMeasured = true;
  }
  return cloned;
};
actions[t.bioYearSamplesSent] = (state, action) => {
  let cloned = { ...state };
  if (action.toDisable) {
    if (cloned.bioYearSamplesSent) cloned.bioYearSamplesSent = false;
  } else {
    cloned.bioYearSamplesSent = true;
  }
  return cloned;
};

const getResult = (feedState) => (feedAction) =>
  (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState;
const specimenInfoErrorReducer = (state = InitialStates.specimenError, action = {}) => getResult(state)(action);

export default specimenInfoErrorReducer;
