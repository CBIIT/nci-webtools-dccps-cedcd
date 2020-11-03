import t from '../actionTypes'

const setHasLoaded = (v) => ({
    type: t.setHasLoaded,
    loaded: v
})

const cohort_name = (n) => ({
    type: t.setCohortName,
    name: n
})

const cohort_acronym = (n) => ({
    type: t.setAcronym,
    acronym: n
})

const setCompletionDate = (d) => ({
    type: t.setCompletionDate,
    completionDate: d
})

const completerName = (n) => ({
    type: t.setCompleterName,
    completerName: n
})

const completerPosition = (p) => ({
    type: t.setCompleterPosition,
    completerPosition: p
})

const completerPhone = (tel) => ({
    type: t.setCompleterPhone,
    completerPhone: tel
})

const completerEmail = (eml) => ({
    type: t.setCompleterEmail,
    completerEmail: eml
})

const clarification_contact = (v) => ({
    type: t.setContacterRight,
    isContacter: v
})

const contacterName = (n) => ({
    type: t.setContacterName,
    contacterName: n
})

const contacterPosition = (p) => ({
    type: t.setContacterPosition,
    contacterPosition: p
})

const contacterPhone = (tel) => ({
    type: t.setContacterPhone,
    contacterPhone: tel
})

const contacterEmail = (eml) => ({
    type: t.setContacterEmail,
    contacterEmail: eml
})

const setInvestigators = (invs) => ({
    type: t.setInvestigators,
    values: invs
})

const investigatorName = (idx, n) => ({
    type: t.setInvestigatorName,
    investigatorName: n,
    index: idx
})

const investigatorInstitution = (idx, inst) => ({
    type: t.setInvestigatorInstitution,
    institute: inst,
    index: idx
})

const investigatorEmail = (idx, eml) => ({
    type: t.setInvestigatorEmail,
    email: eml,
    index: idx
})

const addInvestigator = () => ({
    type: t.addInvestigator
})

const sameAsSomeone = (v) => ({
    type: t.setSameAsSomeone,
    value: v
})

const collaboratorName = (n) => ({
    type: t.setCollaboratorName,
    collaboratorName: n
})

const collaboratorPosition = (p) => ({
    type: t.setCollaboratorPosition,
    collaboratorPosition: p
})

const collaboratorPhone = (tel) => ({
    type: t.setCollaboratorPhone,
    collaboratorPhone: tel
})

const collaboratorEmail = (eml) => ({
    type: t.setCollaboratorEmail,
    collaboratorEmail: eml
})

const cohort_description = (des) => ({
    type: t.setDescription,
    description: des
})

const setHasAWebSite = (v) => ({
    type: t.setHasAWebSite,
    hasUrl: v
})

const cohort_web_site = (url) => ({
    type: t.setWebSite,
    url: url
})

const eligible_gender_id = (gender) => ({
    type: t.setEligibleGender,
    eligibleGender: gender
})

const eligible_disease = () => ({
    type: t.setHasCancerSite,
})

const eligible_disease_cancer_specify = (sites) => ({
    type: t.setCancerSites,
    value: sites
})

const eligible_disease_other_specify = (v) => ({
    type: t.setEligibilityCriteriaOther,
    value: v
})

const enrollment_total = (v) => ({
    type: t.setEnrolledTotal,
    total: v
})

const enrollment_year_start = (y) => ({
    type: t.setEnrollStartYear,
    year: y
})

const enrollment_year_end = (y) => ({
    type: t.setEnrollEndYear,
    year: y
})

const enrollment_ongoing = (v) => ({
    type: t.setEnrollOnGoing,
    isOnGoing: v
})

const enrollment_target = (np) => ({
    type: t.setNumOfPlans,
    numPlans: np
})

const enrollment_year_complete = (y) => ({
    type: t.setYearToComplete,
    year: y
})

const enrollment_age_min = (bma) => ({
    type: t.setBaseLineMinAge,
    minAge: bma
})

const enrollment_age_max = (bma) => ({
    type: t.setBaseLineMaxAge,
    maxAge: bma
})

const enrollment_age_median = (bma) => ({
    type: t.setBaseLineMedianAge,
    medianAge: bma
})

const enrollment_age_mean = (bma) => ({
    type: t.setBaseLineMeanAge,
    meanAge: bma
})

const current_age_min = (cma) => ({
    type: t.setCurrentMinAge,
    minAge: cma
})

const current_age_max = (cma) => ({
    type: t.setCurrentMaxAge,
    maxAge: cma
})

const current_age_median = (cma) => ({
    type: t.setCurrentMedianAge,
    medianAge: cma
})

const current_age_mean = (cma) => ({
    type: t.setCurrentMeanAge,
    meanAge: cma
})

const time_interval = (ti) => ({
    type: t.setQuestionnarieFrequency,
    frequency: ti
})

const most_recent_year = (y) => ({
    type: t.setMostRecentYear,
    year: y
})

const data_collected_in_person = () => ({
    type: t.setCollectedInPerson
})

const data_collected_phone = () => ({
    type: t.setCollectedPhone
})

const data_collected_paper = () => ({
    type: t.setCollectedPaper
})

const data_collected_web = () => ({
    type: t.setCollectedWeb
})

const data_collected_other = () => ({
    type: t.setCollectedOther
})

const data_collected_other_specify = (v) => ({
    type: t.setOtherMeans,
    otherMeans: v
})

const requireNone = () => ({type: t.setRequireNone})

const requireCollab = () => ({type: t.setRequireCollab})

const requireIrb = () => ({type: t.setRequireIrb})

const requireData = () => ({type: t.setRequireData})

const restrictGenoInfo = () => ({type: t.setRestrictGenoInfo})

const restrictOtherDb = () => ({type: t.setRestrictOtherDb})

const restrictCommercial = () => ({type: t.setRestrictCommercial})

const restrictOther = () => ({type: t.setRestrictOther})

const restrictions_other_specify = (d) => ({type: t.setRestrictOtherSpecify, details: d})

const strategy_routine = () => ({type: t.setStrategyRoutine})

const strategy_mailing = () => ({type: t.setStrategyMailing})

const strategy_aggregate_study = () => ({type: t.setStrategyAggregateStudy})

const strategy_individual_study = () => ({type: t.setStrategyIndividualStudy})

const strategy_invitation = () => ({type: t.setStrategyInvitation})

const strategy_other = () => ({type: t.setStrategyOther})

const strategy_other_sepcify = (d) => ({type: t.setStrategyOtherSepcify, details: d})

const questionnaire_file_attached = () => ({type: t.setQuestionnaireFile})

const main_cohort_file_attached = () => ({type: t.setMainCohortFile})

const data_file_attached = ()=> ({type: t.setDataFie})

const specimen_file_attached = () => ({type: t.setSpecimenFile})

const publication_file_attached = () => ({type: t.setPublicationFile})

const questionnaireUrl = (v) => ({type: t.setQuestionnaireUrl, url: v})

const mainCohortUrl = (v) => ({type: t.setMainCohortUrl, url: v})

const dataUrl = (v) => ({type: t.setDataUrl, url: v})

const specimenUrl = (v) => ({type: t.setSpecimenUrl, url: v})

const publicationUrl = (v) => ({type: t.setPublicationUrl, url: v})
export default {
    setHasLoaded,
    cohort_name,
    cohort_acronym,
    setCompletionDate,
    completerName,
    completerPosition,
    completerEmail,
    completerPhone,
    clarification_contact,
    contacterName,
    contacterPosition,
    contacterPhone,
    contacterEmail,
    setInvestigators,
    investigatorName,
    investigatorInstitution,
    investigatorEmail,
    addInvestigator,
    sameAsSomeone,
    collaboratorName,
    collaboratorPosition,
    collaboratorPhone,
    collaboratorEmail,
    cohort_description,
    setHasAWebSite,
    cohort_web_site,
    eligible_gender_id,
    eligible_disease,
    eligible_disease_cancer_specify,
    eligible_disease_other_specify,
    enrollment_total,
    enrollment_year_start,
    enrollment_year_end,
    enrollment_ongoing,
    enrollment_target,
    enrollment_year_complete,
    enrollment_age_min,
    enrollment_age_max,
    enrollment_age_median,
    enrollment_age_mean,
    current_age_min,
    current_age_max,
    current_age_median,
    current_age_mean,
    time_interval,
    most_recent_year,
    data_collected_in_person,
    data_collected_phone,
    data_collected_paper,
    data_collected_web,
    data_collected_other,
    data_collected_other_specify,
    requireNone,
    requireCollab,
    requireIrb,
    requireData,
    restrictGenoInfo,
    restrictOtherDb,
    restrictCommercial,
    restrictOther,
    restrictions_other_specify,
    strategy_routine,
    strategy_mailing, 
    strategy_aggregate_study,
    strategy_individual_study,
    strategy_invitation, 
    strategy_other,
    strategy_other_sepcify,
    questionnaire_file_attached,
    main_cohort_file_attached,
    data_file_attached,
    specimen_file_attached,
    publication_file_attached,
    questionnaireUrl,
    mainCohortUrl,
    dataUrl,
    specimenUrl,
    publicationUrl
}