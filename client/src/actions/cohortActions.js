import t from '../actionTypes'
const setCohortName = (n) => ({
    type: t.setCohortName,
    name: n
})

const setAcronym = (n) => ({
    type: t.setAcronym,
    acronym: n
})

const setCompletionDate = (d) => ({
    type: t.setCompletionDate,
    completionDate: d
})

const setCompleterName = (n) => ({
    type: t.setCompleterName,
    completerName: n
})

const setCompleterPosition = (p) => ({
    type: t.setCompleterPosition,
    completerPosition: p
})

const setCompleterPhone = (tel) => ({
    type: t.setCompleterPhone,
    completerPhone: tel
})

const setCompleterEmail = (eml) => ({
    type: t.setCompleterEmail,
    completerEmail: eml
})

const setContacterRight = (v) => ({
    type: t.setContacterRight,
    isContacter: v
})

const setContacterName = (n) => ({
    type: t.setContacterName,
    contacterName: n
})

const setContacterPosition = (p) => ({
    type: t.setContacterPosition,
    contacterPosition: p
})

const setContacterPhone = (tel) => ({
    type: t.setContacterPhone,
    contacterPhone: tel
})

const setContacterEmail = (eml) => ({
    type: t.setContacterEmail,
    contacterEmail: eml
})

const setInvestigatorName = (idx, n) => ({
    type: t.setInvestigatorName,
    investigatorName: n,
    index: idx
})

const setInvestigatorInstitution = (idx, inst) => ({
    type: t.setInvestigatorInstitution,
    institute: inst,
    index: idx
})

const setInvestigatorEmail = (idx, eml) => ({
    type: t.setInvestigatorEmail,
    email: eml,
    index: idx
})

const addInvestigator = () => ({
    type: t.addInvestigator
})

const setSameAsSomeone = (v) => ({
    type: t.setSameAsSomeone,
    value: v
})

const setCollaboratorName = (n) => ({
    type: t.setCollaboratorName,
    collaboratorName: n
})

const setCollaboratorPosition = (p) => ({
    type: t.setCollaboratorPosition,
    collaboratorPosition: p
})

const setCollaboratorPhone = (tel) => ({
    type: t.setCollaboratorPhone,
    collaboratorPhone: tel
})

const setCollaboratorEmail = (eml) => ({
    type: t.setCollaboratorEmail,
    collaboratorEmail: eml
})

const setDescription = (des) => ({
    type: t.setDescription,
    description: des
})

const setHasAWebSite = (v) => ({
    type: t.setHasAWebSite,
    hasUrl: v
})

const setWebSite = (url) => ({
    type: t.setWebSite,
    url: url
})

const setEligibleGender = (gender) => ({
    type: t.setEligibleGender,
    eligibleGender: gender
})

const setHasCancerSite = () => ({
    type: t.setHasCancerSite,
})

const setCancerSites = (sites) => ({
    type: t.setCancerSites,
    value: sites
})

const setEligibilityCriteriaOther = (v) => ({
    type: t.setEligibilityCriteriaOther,
    value: v
})

const setEnrolledTotal = (v) => ({
    type: t.setEnrolledTotal,
    total: v
})

const setEnrollStartYear = (y) => ({
    type: t.setEnrollStartYear,
    year: y
})

const setEnrollEndYear = (y) => ({
    type: t.setEnrollEndYear,
    year: y
})

const setEnrollOnGoing = (v) => ({
    type: t.setEnrollOnGoing,
    isOnGoing: v
})

const setNumOfPlans = (np) => ({
    type: t.setNumOfPlans,
    numPlans: np
})

const setYearToComplete = (y) => ({
    type: t.setYearToComplete,
    year: y
})

const setBaseLineMinAge = (bma) => ({
    type: t.setBaseLineMinAge,
    minAge: bma
})

const setBaseLineMaxAge = (bma) => ({
    type: t.setBaseLineMaxAge,
    maxAge: bma
})

const setBaseLineMedianAge = (bma) => ({
    type: t.setBaseLineMedianAge,
    medianAge: bma
})

const setBaseLineMeanAge = (bma) => ({
    type: t.setBaseLineMeanAge,
    meanAge: bma
})

const setCurrentMinAge = (cma) => ({
    type: t.setCurrentMinAge,
    minAge: cma
})

const setCurrentMaxAge = (cma) => ({
    type: t.setCurrentMaxAge,
    maxAge: cma
})

const setCurrentMedianAge = (cma) => ({
    type: t.setCurrentMedianAge,
    medianAge: cma
})

const setCurrentMeanAge = (cma) => ({
    type: t.setCurrentMeanAge,
    meanAge: cma
})

const setQuestionnaireFrequency = (ti) => ({
    type: t.setQuestionnarieFrequency,
    frequency: ti
})

const setMostRecentYear = (y) => ({
    type: t.setMostRecentYear,
    year: y
})

const setCollectedInPerson = () => ({
    type: t.setCollectedInPerson
})

const setCollectedPhone = () => ({
    type: t.setCollectedPhone
})

const setCollectedPaper = () => ({
    type: t.setCollectedPaper
})

const setCollectedWeb = () => ({
    type: t.setCollectedWeb
})

const setCollectedOther = () => ({
    type: t.setCollectedOther
})

const setOtherMeans = (v) => ({
    type: t.setOtherMeans,
    otherMeans: v
})

const setRequireNone = () => ({type: t.setRequireNone})

const setRequireCollab = () => ({type: t.setRequireCollab})

const setRequireIrb = () => ({type: t.setRequireIrb})

const setRequireData = () => ({type: t.setRequireData})

const setRestrictGenoInfo = () => ({type: t.setRestrictGenoInfo})

const setRestrictOtherDb = () => ({type: t.setRestrictOtherDb})

const setRestrictCommercial = () => ({type: t.setRestrictCommercial})

const setRestrictOther = () => ({type: t.setRestrictOther})

const setRestrictOtherSpecify = (d) => ({type: t.setRestrictOtherSpecify, details: d})

const setStrategyRoutine = () => ({type: t.setStrategyRoutine})

const setStrategyMailing = () => ({type: t.setStrategyMailing})

const setStrategyAggregateStudy = () => ({type: t.setStrategyAggregateStudy})

const setStrategyIndividualStudy = () => ({type: t.setStrategyIndividualStudy})

const setStrategyInvitation = () => ({type: t.setStrategyInvitation})

const setStrategyOther = () => ({type: t.setStrategyOther})

const setStrategyOtherSepcify = (d) => ({type: t.setStrategyOtherSepcify, details: d})

const setQuestionnaireFile = () => ({type: t.setQuestionnaireFile})

const setMainCohortFile = () => ({type: t.setMainCohortFile})
export default {
    setCohortName,
    setAcronym,
    setCompletionDate,
    setCompleterName,
    setCompleterPosition,
    setCompleterEmail,
    setCompleterPhone,
    setContacterRight,
    setContacterName,
    setContacterPosition,
    setContacterPhone,
    setContacterEmail,
    setInvestigatorName,
    setInvestigatorInstitution,
    setInvestigatorEmail,
    addInvestigator,
    setSameAsSomeone,
    setCollaboratorName,
    setCollaboratorPosition,
    setCollaboratorPhone,
    setCollaboratorEmail,
    setDescription,
    setHasAWebSite,
    setWebSite,
    setEligibleGender,
    setHasCancerSite,
    setCancerSites,
    setEligibilityCriteriaOther,
    setEnrolledTotal,
    setEnrollStartYear,
    setEnrollEndYear,
    setEnrollOnGoing,
    setNumOfPlans,
    setYearToComplete,
    setBaseLineMinAge,
    setBaseLineMaxAge,
    setBaseLineMedianAge,
    setBaseLineMeanAge,
    setCurrentMinAge,
    setCurrentMaxAge,
    setCurrentMedianAge,
    setCurrentMeanAge,
    setQuestionnaireFrequency,
    setMostRecentYear,
    setCollectedInPerson,
    setCollectedPhone,
    setCollectedPaper,
    setCollectedWeb,
    setCollectedOther,
    setOtherMeans,
    setRequireNone,
    setRequireCollab,
    setRequireIrb,
    setRequireData,
    setRestrictGenoInfo,
    setRestrictOtherDb,
    setRestrictCommercial,
    setRestrictOther,
    setRestrictOtherSpecify,
    setStrategyRoutine,
    setStrategyMailing, 
    setStrategyAggregateStudy,
    setStrategyIndividualStudy,
    setStrategyInvitation, 
    setStrategyOther,
    setStrategyOtherSepcify,
    setQuestionnaireFile,
    setMainCohortFile
}