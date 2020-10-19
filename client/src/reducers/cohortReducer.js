import InitialStates from '../states'
import t from '../actionTypes'

const actions = {}
actions[t.setCohortName] = (state, action) => ({...state, name: action.name})
actions[t.setAcronym] = (state, action) => ({...state, acronym: action.acronym})
actions[t.setUrl] = (state, action) => ({...state, url: action.url})
actions[t.setCompletionDate] = (state, action) => ({...state, completionDate: action.completionDate})
actions[t.setCompleterName] = (state, action) => ({...state, completerName: action.completerName})
actions[t.setCompleterPosition] = (state, action) => ({...state, completerPosition: action.completerPosition})
actions[t.setCompleterPhone] = (state, action) => ({...state, completerPhone: action.completerPhone})
actions[t.setCompleterEmail] = (state, action) => ({...state, completerEmail: action.completerEmail})
actions[t.setContacterRight] = (state, action) => ({...state, contacterRight: action.isContacter})
actions[t.setContacterName] = (state, action) => ({...state, contacterName: action.contacterName})
actions[t.setContacterPosition] = (state, action) => ({...state, contacterPosition: action.contacterPosition})
actions[t.setContacterPhone] = (state, action) => ({...state, contacterPhone: action.contacterPhone})
actions[t.setContacterEmail] = (state, action) => ({...state, contacterEmail: action.contacterEmail})

actions[t.setInvestigatorName] = (state, action) => {
    let clone = {...state}
    clone.investigators[action.index].name = action.investigatorName
    return clone
}

actions[t.setInvestigatorInstitution] = (state, action) => {
    let clone = {...state}
    clone.investigators[action.index].institution = action.institute
    return clone
}

actions[t.setInvestigatorEmail] = (state, action) => {
    let clone = {...state}
    clone.investigators[action.index].email = action.email
    return clone
}

actions[t.addInvestigator] = (state) => ({...state, investigators: [...state.investigators, {name:'', institution: '', email: ''}]})
actions[t.setSameAsSomeone] = (state, action) => ({...state, sameAsSomeone: action.value})
actions[t.setCollaboratorName] = (state, action) => ({...state, collaboratorName: action.collaboratorName})
actions[t.setCollaboratorPosition] = (state, action) => ({...state, collaboratorPosition: action.collaboratorPosition})
actions[t.setCollaboratorPhone] = (state, action) => ({...state, collaboratorPhone: action.collaboratorPhone})
actions[t.setCollaboratorEmail] = (state, action) => ({...state, collaboratorEmail: action.collaboratorEmail})
actions[t.setDescription] = (state, action) => ({...state, description: action.description})
actions[t.setHasAWebSite] = (state, action) => ({...state, hasAWebSite: action.hasUrl})
actions[t.setWebSite] = (state, action) => ({...state, webSite: action.url})
actions[t.setEligibleGender] = (state, action) => ({...state, eligibleGender: action.eligibleGender})
actions[t.setHasCancerSite] = (state) => ({...state, hasCancerSite: !state.hasCancerSite})
actions[t.setCancerSites] = (state, action) => ({...state, cancerSites: action.value})
actions[t.setEligibilityCriteriaOther] = (state, action) => ({...state, eligibilityCriteriaOther: action.value})
actions[t.setEnrolledTotal] = (state, action) => ({...state, enrolledTotal: action.total})
actions[t.setEnrollStartYear] = (state, action) => ({...state, enrollStartYear: action.year})
actions[t.setEnrollEndYear] = (state, action) => ({...state, enrollEndYear: action.year})
actions[t.setRequireNone] = (state) => ({...state, requireNone: !state.requireNone})
actions[t.setEnrollOnGoing] = (state, action) => ({...state, enrollOnGoing: action.isOnGoing})
actions[t.setNumOfPlans] = (state, action) => ({...state, numOfPlans: action.numPlans})  
actions[t.setYearToComplete] = (state, action) => ({...state, yearToComplete: action.year})
actions[t.setBaseLineMinAge] = (state, action) => ({...state, baseLineMinAge: action.minAge})
actions[t.setBaseLineMaxAge] = (state, action) => ({...state, baseLineMaxAge: action.maxAge})
actions[t.setBaseLineMedianAge] = (state, action) => ({...state, baseLineMedianAge: action.medianAge})
actions[t.setBaseLineMeanAge] = (state, action) => ({...state, baseLineMeanAge: action.meanAge})
actions[t.setCurrentMinAge] = (state, action) => ({...state, currentMinAge: action.minAge})
actions[t.setCurrentMaxAge] = (state, action) => ({...state, currentMaxAge: action.maxAge})
actions[t.setCurrentMedianAge] = (state, action) => ({...state, currentMedianAge: action.medianAge})
actions[t.setCurrentMeanAge] = (state, action) => ({...state, currentMeanAge: action.meanAge})
actions[t.setQuestionnarieFrequency] = (state, action) => ({...state, timeInterval: action.frequency})
actions[t.setMostRecentYear] = (state, action) => ({...state, mostRecentYear: action.year})
actions[t.setCollectedInPerson] = (state) => ({...state, collectedInPerson: !state.collectedInPerson})
actions[t.setCollectedPhone] = (state) => ({...state, collectedPhone: !state.collectedPhone})
actions[t.setCollectedPaper] = (state) => ({...state, collectedPaper: !state.collectedPaper})
actions[t.setCollectedWeb] = (state) => ({...state, collectedWeb: !state.collectedWeb})
actions[t.setCollectedOther] = (state) => ({...state, collectedOther: !state.collectedOther, collectedOtherSpecify: state.collectedOther ? state.collectedOtherSpecify : ''})
actions[t.setOtherMeans] = (state, action) => ({...state, collectedOtherSpecify: action.otherMeans})
actions[t.setRequireNone] = (state) => ({...state,requireNone: !state.requireNone,requireCollab: false, requireIrb: false, requireData: false, restrictGenoInfo: false, restrictOtherDb: false, restrictCommercial: false, restrictOther: false, restrictOtherSpecify: ''})
actions[t.setRequireCollab] = (state) => ({...state, requireCollab: !state.requireCollab, requireNone: false})
actions[t.setRequireIrb] = (state) => ({...state, requireIrb: !state.requireIrb, requireNone: false})
actions[t.setRequireData] = (state) => ({...state, requireData: !state.requireData, requireNone: false})
actions[t.setRestrictGenoInfo] = (state) => ({...state, restrictGenoInfo: !state.restrictGenoInfo, requireNone: false})
actions[t.setRestrictOtherDb] = (state) => ({...state, restrictOtherDb: !state.restrictOtherDb, requireNone: false})
actions[t.setRestrictCommercial] = (state) => ({...state, restrictCommercial: !state.restrictCommercial, requireNone: false})
actions[t.setRestrictOther] = (state) => ({...state, restrictOther: !state.restrictOther, requireNone: false})
actions[t.setRestrictOtherSpecify] = (state, action) => ({...state, restrictOtherSpecify: action.details})
actions[t.setStrategyRoutine] = (state) => ({...state, strategyRoutine: !state.strategyRoutine})
actions[t.setStrategyMailing] = (state) => ({...state, strategyMailing: !state.strategyMailing})
actions[t.setStrategyAggregateStudy] = (state) => ({...state, strategyAggregateStudy: !state.strategyAggregateStudy})
actions[t.setStrategyIndividualStudy] = (state) => ({...state, strategyIndividualStudy: !state.strategyIndividualStudy})
actions[t.setStrategyInvitation] = (state) => ({...state, strategyInvitation: !state.strategyInvitation})
actions[t.setStrategyOther] = (state) => ({...state, strategyOther: !state.strategyOther})
actions[t.setStrategyOtherSepcify] = (state, action) => ({...state, strategyOtherSpecify: action.details})
actions[t.setQuestionnaireFile] = (state) => ({...state, questionnaireFile: !state.questionnaireFile})
actions[t.setMainCohortFile] = (state) => ({...state, mainCohortFile: !state.mainCohortFile})
const getResult = feedState => feedAction => (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const cohortReducer = (state=InitialStates.cohort, action={}) => getResult(state)(action)
    
export default cohortReducer