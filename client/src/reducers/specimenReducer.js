import t from '../actionTypes'
import InitialStates from '../states'

const actions = {}
actions[t.setSpecimenCount] = (state, action) => {
    let shallow = { ...state }
    if (/^\d*$/.test(action.value.trim())) {
        shallow.counts[action.cell] = action.value
        return shallow
    }
}

actions[t.setSpecimenLoaded] = (state, action) => ({ ...state, specimenLoaded: action.value })
actions[t.setBioBloodBaseline] = (state, action) => ({
    ...state, bioBloodBaseline: action.value,
    bioBloodBaselineSerum: action.value ? state.bioBloodBaselineSerum || 0 : 0,
    bioBloodBaselinePlasma: action.value ? state.bioBloodBaselinePlasma || 0 : 0,
    bioBloodBaselineBuffyCoat: action.value ? state.bioBloodBaselineBuffyCoat || 0 : 0,
    bioBloodBaselineOtherDerivative: action.value ? state.bioBloodBaselineOtherDerivative || 0 : 0
})
actions[t.setBioBloodBaselineSerum] = (state, action) => ({ ...state, bioBloodBaselineSerum: action.value })
actions[t.setBioBloodBaselinePlasma] = (state, action) => ({ ...state, bioBloodBaselinePlasma: action.value })
actions[t.setBioBloodBaselineBuffyCoat] = (state, action) => ({ ...state, bioBloodBaselineBuffyCoat: action.value })
actions[t.setBioBloodBaselineOtherDerivative] = (state, action) => ({ ...state, bioBloodBaselineOtherDerivative: action.value })
actions[t.setBioBloodOtherTime] = (state, action) => ({
    ...state, bioBloodOtherTime: action.value,
    bioBloodOtherTimeSerum: action.value ? state.bioBloodOtherTimeSerum || 0 : 0,
    bioBloodOtherTimePlasma: action.value ? state.bioBloodOtherTimePlasma || 0 : 0,
    bioBloodOtherTimeBuffyCoat: action.value ? state.bioBloodOtherTimeBuffyCoat || 0 : 0,
    bioBloodOtherTimeOtherDerivative: action.value ? state.bioBloodOtherTimeOtherDerivative || 0 : 0
})
actions[t.setBioBloodOtherTimeSerum] = (state, action) => ({ ...state, bioBloodOtherTimeSerum: action.value })
actions[t.setBioBloodOtherTimePlasma] = (state, action) => ({ ...state, bioBloodOtherTimePlasma: action.value })
actions[t.setBioBloodOtherTimeBuffyCoat] = (state, action) => ({ ...state, bioBloodOtherTimeBuffyCoat: action.value })
actions[t.setBioBloodOtherTimeOtherDerivative] = (state, action) => ({ ...state, bioBloodOtherTimeOtherDerivative: action.value })
actions[t.setBioBuccalSalivaBaseline] = (state, action) => ({ ...state, bioBuccalSalivaBaseline: action.value })
actions[t.setBioBuccalSalivaOtherTime] = (state, action) => ({ ...state, bioBuccalSalivaOtherTime: action.value })
actions[t.setBioTissueBaseline] = (state, action) => ({ ...state, bioTissueBaseline: action.value })
actions[t.setBioTissueOtherTime] = (state, action) => ({ ...state, bioTissueOtherTime: action.value })
actions[t.setBioUrineBaseline] = (state, action) => ({ ...state, bioUrineBaseline: action.value })
actions[t.setBioUrineOtherTime] = (state, action) => ({ ...state, bioUrineOtherTime: action.value })
actions[t.setBioFecesBaseline] = (state, action) => ({ ...state, bioFecesBaseline: action.value })
actions[t.setBioFecesOtherTime] = (state, action) => ({ ...state, bioFecesOtherTime: action.value })
actions[t.setBioOtherBaseline] = (state, action) => ({
    ...state, bioOtherBaseline: action.value,
    bioOtherBaselineSpecify: action.value ? state.bioOtherBaselineSpecify || '' : ''
})
actions[t.setBioOtherOtherTime] = (state, action) => ({
    ...state, bioOtherOtherTime: action.value,
    bioOtherOtherTimeSpecify: action.value ? state.bioOtherOtherTimeSpecify || '' : ''
})
actions[t.setBioRepeatedSampleSameIndividual] = (state, action) => ({ ...state, bioRepeatedSampleSameIndividual: action.value })
actions[t.setBioTumorBlockInfo] = (state, action) => ({ ...state, bioTumorBlockInfo: action.value })
actions[t.setBioGenotypingData] = (state, action) => ({ ...state, bioGenotypingData: action.value })
actions[t.setBioSequencingDataExome] = (state, action) => ({ ...state, bioSequencingDataExome: action.value })
actions[t.setBioSequencingDataWholeGenome] = (state, action) => ({ ...state, bioSequencingDataWholeGenome: action.value })
actions[t.setBioEpigeneticOrMetabolicMarkers] = (state, action) => ({ ...state, bioEpigeneticOrMetabolicMarkers: action.value })
actions[t.setBioOtherOmicsData] = (state, action) => ({ ...state, bioOtherOmicsData: action.value })
actions[t.setBioTranscriptomicsData] = (state, action) => ({ ...state, bioTranscriptomicsData: action.value })
actions[t.setBioMicrobiomeData] = (state, action) => ({ ...state, bioMicrobiomeData: action.value })
actions[t.setBioMetabolomicData] = (state, action) => ({
    ...state, bioMetabolomicData: action.value,
    bioMetaOutcomesInCancerStudy: action.value ? state.bioMetaOutcomesInCancerStudy || 0 : 0,
    bioMetaOutcomesInCvdStudy: action.value ? state.bioMetaOutcomesInCvdStudy || 0 : 0,
    bioMetaOutcomesInDiabetesStudy: action.value ? state.bioMetaOutcomesInDiabetesStudy || 0 : 0,
    bioMetaOutcomesInOtherStudy: action.value ? state.bioMetaOutcomesInOtherStudy || 0 : 0,
    bioMetaOutcomesOtherStudySpecify: action.value ? state.bioMetaOutcomesOtherStudySpecify || '' : '',
    bioMemberInStudy: action.value ? state.bioMemberInStudy || '' : '',
    bioLabsUsedForAnalysis: action.value ? state.bioLabsUsedForAnalysis || '' : '',
    bioAnalyticalPlatform: action.value ? state.bioAnalyticalPlatform || '' : '',
    bioSeparationPlatform: action.value ? state.bioSeparationPlatform || '' : '',
    bioNumberMetabolitesMeasured: action.value ? state.bioNumberMetabolitesMeasured || '' : '',
    bioYearSamplesSent: action.value ? state.bioYearSamplesSent || '' : ''

})
actions[t.setBioMetaFastingSample] = (state, action) => ({ ...state, bioMetaFastingSample: action.value })
actions[t.setBioMetaOutcomesInCancerStudy] = (state, action) => ({ ...state, bioMetaOutcomesInCancerStudy: action.value })
actions[t.setBioMetaOutcomesInCvdStudy] = (state, action) => ({ ...state, bioMetaOutcomesInCvdStudy: action.value })
actions[t.setBioMetaOutcomesInDiabetesStudy] = (state, action) => ({ ...state, bioMetaOutcomesInDiabetesStudy: action.value })
actions[t.setBioMetaOutcomesInOtherStudy] = (state, action) => ({
    ...state, bioMetaOutcomesInOtherStudy: action.value,
    bioMetaOutcomesOtherStudySpecify: action.value ? state.bioMetaOutcomesOtherStudySpecify || '' : ''
})
actions[t.setBioMemberOfMetabolomicsStudies] = (state, action) => ({ ...state, bioMemberOfMetabolomicsStudies: action.value })
actions[t.setBioOtherBaselineSpecify] = (state, action) => ({ ...state, bioOtherBaselineSpecify: action.value })
actions[t.setBioOtherOtherTimeSpecify] = (state, action) => ({ ...state, bioOtherOtherTimeSpecify: action.value })
actions[t.setBioMetaOutcomesOtherStudySpecify] = (state, action) => ({ ...state, bioMetaOutcomesOtherStudySpecify: action.value })

actions[t.setBioMemberInStudy] = (state, action) => {
    if ((/^\d*$/.test(action.value))) return { ...state, bioMemberInStudy: action.value }
}

actions[t.setBioLabsUsedForAnalysis] = (state, action) => ({ ...state, bioLabsUsedForAnalysis: action.value })
actions[t.setBioAnalyticalPlatform] = (state, action) => ({ ...state, bioAnalyticalPlatform: action.value })
actions[t.setBioSeparationPlatform] = (state, action) => ({ ...state, bioSeparationPlatform: action.value })
actions[t.setBioNumberMetabolitesMeasured] = (state, action) => {
    if ((/^\d*$/.test(action.value))) return { ...state, bioNumberMetabolitesMeasured: action.value }
}
actions[t.setBioYearSamplesSent] = (state, action) => {
    if ((/^\d*$/.test(action.value))) {
        if (action.value.length <= 4 || action.value) {
            return { ...state, bioYearSamplesSent: action.value }
        }
    }
}

actions[t.setSectionGStatus] = (state, action) => ({ ...state, sectionGStatus: action.value })

const getResult = feedState => feedAction =>
    (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const specimenReducer = (state = InitialStates.specimen, action = {}) => getResult(state)(action)

export default specimenReducer