import InitialStates from '../states'
import t from '../actionTypes'

const actions = {}
actions[t.setHasLoaded] = (state, action) => ({...state, hasLoaded: action.loaded})
actions[t.setSectionAStatus] = (state, action) => ({...state, sectionAStatus: action.value})
actions[t.setCohortName] = (state, action) => ({...state, cohort_name: action.name})
actions[t.setCohortId] = (state, action) => ({...state, cohort_id: action.id})
actions[t.setAcronym] = (state, action) => ({...state, cohort_acronym: action.acronym})
actions[t.setCompletionDate] = (state, action) => ({...state, completionDate: action.completionDate ? action.completionDate : ''})
actions[t.setCompleterName] = (state, action) => ({...state, completerName: action.completerName})
actions[t.setCompleterPosition] = (state, action) => ({...state, completerPosition: action.completerPosition})
actions[t.setCompleterPhone] = (state, action) => ({...state, completerPhone: /^[-()\s0-9]*$/.test(action.completerPhone.trim()) ? action.completerPhone : state.completerPhone})
actions[t.setCompleterEmail] = (state, action) => ({...state, completerEmail: action.completerEmail})
actions[t.setContacterRight] = (state, action) => ({...state, clarification_contact: action.isContacter})
actions[t.setContacterName] = (state, action) => ({...state, contacterName: action.contacterName})
actions[t.setContacterPosition] = (state, action) => ({...state, contacterPosition: action.contacterPosition})
actions[t.setContacterPhone] = (state, action) => ({...state, contacterPhone: /^[-()\s0-9]*$/.test(action.contacterPhone.trim()) ? action.contacterPhone : state.contacterPhone})
actions[t.setContacterEmail] = (state, action) => ({...state, contacterEmail: action.contacterEmail})
actions[t.setInvestigators] = (state, action) => ({...state, investigators: action.values})
actions[t.setCountryCode] = (state, action) => {
    let clone = {...state}
    if(/^\s*\+[0-9-]*\s*$/.test(action.value)){
        switch(action.personType){
            case 'completerCountry':
                clone.completerCountry = action.value
                return clone
            case 'contacterCountry': 
                clone.contacterCountry = action.value
                return clone
            default:
                clone.collaboratorCountry = action.value
                return clone 
        }
    }
}
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

actions[t.addInvestigator] = (state) => ({...state, investigators: state.investigators.length < 6 ? [...state.investigators, {personId: 0, name:'', institution: '', email: ''}]: state.investigators})
actions[t.removeInvestigator] = (state, action) => ({...state, investigators: state.investigators.filter((r, idx) => idx != action.value)})
actions[t.setSameAsSomeone] = (state, action) => ({...state, sameAsSomeone: action.value})
actions[t.setCollaboratorName] = (state, action) => ({...state, collaboratorName: action.collaboratorName})
actions[t.setCollaboratorPosition] = (state, action) => ({...state, collaboratorPosition: action.collaboratorPosition})
actions[t.setCollaboratorPhone] = (state, action) => ({...state, collaboratorPhone: /^[-()\s0-9]*$/.test(action.collaboratorPhone.trim()) ? action.collaboratorPhone : state.collaboratorPhone})
actions[t.setCollaboratorEmail] = (state, action) => ({...state, collaboratorEmail: action.collaboratorEmail})
actions[t.setDescription] = (state, action) => ({...state, cohort_description: action.description})
//actions[t.setHasAWebSite] = (state, action) => ({...state, hasAWebSite: action.hasUrl})
actions[t.setWebSite] = (state, action) => ({...state, cohort_web_site: action.url})
actions[t.setEligibleGender] = (state, action) => ({...state, eligible_gender_id: action.eligibleGender})
actions[t.setHasCancerSite] = (state, action) => ({...state, eligible_disease: action.value})
actions[t.setCancerSites] = (state, action) => ({...state, eligible_disease_cancer_specify: action.value})
actions[t.setEligibilityCriteriaOther] = (state, action) => ({...state, eligible_disease_other_specify: action.value})
actions[t.setEnrolledTotal] = (state, action) => ({...state, enrollment_total: action.total})
actions[t.setEnrollStartYear] = (state, action) => ({...state, enrollment_year_start: action.year})
actions[t.setEnrollEndYear] = (state, action) => ({...state, enrollment_year_end: action.year})
actions[t.setRequireNone] = (state) => ({...state, requireNone: !state.requireNone})
actions[t.setEnrollOnGoing] = (state, action) => ({...state, enrollment_ongoing: action.isOnGoing})
actions[t.setNumOfPlans] = (state, action) => ({...state, enrollment_target: action.numPlans})  
actions[t.setYearToComplete] = (state, action) => ({...state, enrollment_year_complete: action.year})
actions[t.setBaseLineMinAge] = (state, action) => ({...state, enrollment_age_min: action.minAge})
actions[t.setBaseLineMaxAge] = (state, action) => ({...state, enrollment_age_max: action.maxAge})
actions[t.setBaseLineMedianAge] = (state, action) => ({...state, enrollment_age_median: action.medianAge})
actions[t.setBaseLineMeanAge] = (state, action) => ({...state, enrollment_age_mean: action.meanAge})
actions[t.setCurrentMinAge] = (state, action) => ({...state, current_age_min: action.minAge})
actions[t.setCurrentMaxAge] = (state, action) => ({...state, current_age_max: action.maxAge})
actions[t.setCurrentMedianAge] = (state, action) => ({...state, current_age_median: action.medianAge})
actions[t.setCurrentMeanAge] = (state, action) => ({...state, current_age_mean: action.meanAge})
actions[t.setQuestionnarieFrequency] = (state, action) => ({...state, time_interval: action.frequency})
actions[t.setMostRecentYear] = (state, action) => ({...state, most_recent_year: action.year})
actions[t.setCollectedInPerson] = (state, action) => ({...state, data_collected_in_person: action.value})
actions[t.setCollectedPhone] = (state, action) => ({...state, data_collected_phone: action.value})
actions[t.setCollectedPaper] = (state, action) => ({...state, data_collected_paper: action.value})
actions[t.setCollectedWeb] = (state, action) => ({...state, data_collected_web: action.value})
actions[t.setCollectedOther] = (state, action) => ({...state, data_collected_other: action.value})
actions[t.setOtherMeans] = (state, action) => ({...state, data_collected_other_specify: action.otherMeans})
actions[t.setRequireNone] = (state, action) => ({...state,requireNone: action.value, requireCollab: action.value == 1 ? 0 : state.requireCollab, requireIrb: action.value == 1 ? 0 : state.requireIrb, requireData: action.value == 1 ? 0 : state.requireData, restrictGenoInfo: action.value == 1 ? 0 : state.restrictGenoInfo, restrictOtherDb: action.value == 1 ? 0 : state.restrictOtherDb, restrictCommercial: action.value == 1 ? 0 : state.restrictCommercial, restrictOther: action.value == 1 ? 0 : state.restrictOther, restrictions_other_specify: action.value === 1 ? '' : state.restrictions_other_specify})
actions[t.setRequireCollab] = (state, action) => ({...state, requireCollab:  action.value, requireNone: action.value ?  0 : state.requireNone})
actions[t.setRequireIrb] = (state, action) => ({...state, requireIrb:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRequireData] = (state, action) => ({...state, requireData:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRestrictGenoInfo] = (state, action) => ({...state, restrictGenoInfo:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRestrictOtherDb] = (state, action) => ({...state, restrictOtherDb:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRestrictCommercial] = (state, action) => ({...state, restrictCommercial:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRestrictOther] = (state, action) => ({...state, restrictOther:  action.value, requireNone:  action.value ?  0 : state.requireNone})
actions[t.setRestrictOtherSpecify] = (state, action) => ({...state, restrictions_other_specify: action.details})
actions[t.setStrategyRoutine] = (state, action) => ({...state, strategy_routine: action.value})
actions[t.setStrategyMailing] = (state, action) => ({...state, strategy_mailing: action.value})
actions[t.setStrategyAggregateStudy] = (state, action) => ({...state, strategy_aggregate_study: action.value})
actions[t.setStrategyIndividualStudy] = (state, action) => ({...state, strategy_individual_study: action.value})
actions[t.setStrategyInvitation] = (state, action) => ({...state, strategy_invitation: action.value})
actions[t.setStrategyOther] = (state, action) => ({...state, strategy_other: action.value})
actions[t.setStrategyOtherSepcify] = (state, action) => ({...state, strategy_other_specify: action.details})
actions[t.setQuestionnaireFile] = (state, action) => ({...state, questionnaireFile: action.value})
actions[t.setMainCohortFile] = (state, action) => ({...state, mainCohortFile: action.value})

actions[t.setDataFile] = (state, action) => ({...state, dataFile: action.value})
actions[t.setSpecimenFile] = (state, action) => ({...state, specimenFile: action.value})
actions[t.setPublicationFile] = (state, action) => ({...state, publicationFile: action.value})

actions[t.setQuestionnaireFileName] = (state, action) => ({...state, questionnaireFileName: action.value})
actions[t.setMainFileName] = (state, action) => ({...state, mainFileName: action.value})
actions[t.setDataFileName] = (state, action) => ({...state, dataFileName: action.value})
actions[t.setSpecimenFileName] = (state, action) => ({...state, specimenFileName: action.value})
actions[t.setPublicationFileName] = (state, action) => ({...state, publicationFileName: action.value})
/*
actions[t.setMainFileName] = (state, action) => ({...state, mainFileName: action.value})
actions[t.setDataFileName] = (state, action) => ({...state, dataFileName: action.value})
actions[t.setSpecimenFileName] = (state, action) => ({...state, specimenFileName: action.value})
actions[t.setPublicationFileName] = (state, action) => ({...state, publicationFileName: action.value})
*/
actions[t.setQuestionnaireUrl] = (state, action) => ({...state, questionnaire_url: action.url === 'null' ? '' : action.url})
actions[t.setMainCohortUrl] = (state, action) => ({...state, main_cohort_url: action.url === 'null' ? '' : action.url})
actions[t.setDataUrl] = (state, action) => ({...state, data_url: action.url === 'null' ? '' : action.url})
actions[t.setSpecimenUrl] = (state, action) => ({...state, specimen_url: action.url === 'null' ? '' : action.url})
actions[t.setPublicationUrl] = (state, action) => ({...state, publication_url: action.url === 'null' ? '' : action.url})

const getResult = feedState => feedAction => (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState
const cohortReducer = (state=InitialStates.cohort, action={}) => getResult(state)(action)
    
export default cohortReducer