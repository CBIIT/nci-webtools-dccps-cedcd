import InitialStates from '../states'
import t from '../actionTypes'

const actions = {}
actions[t.setHasLoaded] = (state, action) => ({...state, hasLoaded: action.loaded})
actions[t.setCohortName] = (state, action) => ({...state, name: action.name})
actions[t.setCohortId] = (state, action) => ({...state, cohortId: action.id})
actions[t.setAcronym] = (state, action) => ({...state, acronym: action.acronym})
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
actions[t.setInvestigators] = (state, action) => ({...state, investigators: action.values})
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
actions[t.setCollectedInPerson] = (state, action) => ({...state, collectedInPerson: action.value})
actions[t.setCollectedPhone] = (state, action) => ({...state, collectedPhone: action.value})
actions[t.setCollectedPaper] = (state, action) => ({...state, collectedPaper: action.value})
actions[t.setCollectedWeb] = (state, action) => ({...state, collectedWeb: action.value})
actions[t.setCollectedOther] = (state, action) => ({...state, collectedOther: action.value, collectedOtherSpecify: state.collectedOther === 1 ? state.collectedOtherSpecify : ''})
actions[t.setOtherMeans] = (state, action) => ({...state, collectedOtherSpecify: action.otherMeans})
actions[t.setRequireNone] = (state, action) => ({...state,requireNone: action.value, requireCollab: action.value == 1 ? 0 : state.requireCollab, requireIrb: action.value == 1 ? 0 : state.requireIrb, requireData: action.value == 1 ? 0 : state.requireData, restrictGenoInfo: action.value == 1 ? 0 : state.restrictGenoInfo, restrictOtherDb: action.value == 1 ? 0 : state.restrictOtherDb, restrictCommercial: action.value == 1 ? 0 : state.restrictCommercial, restrictOther: action.value == 1 ? 0 : state.restrictOther, restrictOtherSpecify: action.value === 1 ? '' : state.restrictOtherSpecify})
actions[t.setRequireCollab] = (state, action) => ({...state, requireCollab:  action.value, requireNone: 0})
actions[t.setRequireIrb] = (state, action) => ({...state, requireIrb:  action.value, requireNone: 0})
actions[t.setRequireData] = (state, action) => ({...state, requireData:  action.value, requireNone: 0})
actions[t.setRestrictGenoInfo] = (state, action) => ({...state, restrictGenoInfo:  action.value, requireNone: 0})
actions[t.setRestrictOtherDb] = (state, action) => ({...state, restrictOtherDb:  action.value, requireNone: 0})
actions[t.setRestrictCommercial] = (state, action) => ({...state, restrictCommercial:  action.value, requireNone: 0})
actions[t.setRestrictOther] = (state, action) => ({...state, restrictOther:  action.value, requireNone: 0})
actions[t.setRestrictOtherSpecify] = (state, action) => ({...state, restrictOtherSpecify: action.details})
actions[t.setStrategyRoutine] = (state, action) => ({...state, strategyRoutine: action.value})
actions[t.setStrategyMailing] = (state, action) => ({...state, strategyMailing: action.value})
actions[t.setStrategyAggregateStudy] = (state, action) => ({...state, strategyAggregateStudy: action.value})
actions[t.setStrategyIndividualStudy] = (state, action) => ({...state, strategyIndividualStudy: action.value})
actions[t.setStrategyInvitation] = (state, action) => ({...state, strategyInvitation: action.value})
actions[t.setStrategyOther] = (state, action) => ({...state, strategyOther: action.value})
actions[t.setStrategyOtherSepcify] = (state, action) => ({...state, strategyOtherSpecify: action.details})
actions[t.setQuestionnaireFile] = (state, action) => ({...state, questionnaireFile: action.value})
actions[t.setMainCohortFile] = (state, action) => ({...state, mainCohortFile: action.value})

actions[t.setDataFile] = (state, action) => ({...state, dataFile: action.value})
actions[t.setSpecimenFile] = (state, action) => ({...state, specimenFile: action.value})
actions[t.setPublicationFile] = (state, action) => ({...state, publicationFile: action.value})

actions[t.setQuestionnaireUrl] = (state, action) => ({...state, questionnaireUrl: action.url})
actions[t.setMainCohortUrl] = (state, action) => ({...state, mainCohortUrl: action.url})
actions[t.setDataUrl] = (state, action) => ({...state, dataUrl: action.url})
actions[t.setSpecimenUrl] = (state, action) => ({...state, specimenUrl: action.url})
actions[t.setPublicationUrl] = (state, action) => ({...state, publicationUrl: action.url})

const getResult = feedState => feedAction => (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const cohortReducer = (state=InitialStates.cohort, action={}) => getResult(state)(action)
    
export default cohortReducer