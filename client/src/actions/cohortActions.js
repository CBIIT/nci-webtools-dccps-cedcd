import t from '../actionTypes'

const setHasLoaded = (v) => ({
    type: t.setHasLoaded,
    loaded: v
})

const setSectionAStatus = (v) => ({
    type: t.setSectionAStatus,
    value: v
})

const country_code = (personTypeName, v) => ({
    type: t.setCountryCode,
    personType: personTypeName,
    value: v
})

const cohort_id = (v) => ({
    type: t.setCohortId,
    id: v
})

const cohort_name = (n) => ({
    type: t.setCohortName,
    name: n
})

const cohort_acronym = (n) => ({
    type: t.setAcronym,
    acronym: n
})

const completionDate = (d) => ({
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

const removeInvestigator = (idx) => ({
    type: t.removeInvestigator,
    value: idx
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

const eligible_disease = (v) => ({
    type: t.setHasCancerSite,
    value: v
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

const data_collected_in_person = (v) => ({
    type: t.setCollectedInPerson,
    value: v
})

const data_collected_phone = (v) => ({
    type: t.setCollectedPhone,
    value: v
})

const data_collected_paper = (v) => ({
    type: t.setCollectedPaper,
    value: v
})

const data_collected_web = (v) => ({
    type: t.setCollectedWeb,
    value: v
})

const data_collected_other = (v) => ({
    type: t.setCollectedOther,
    value: v
})

const data_collected_other_specify = (v) => ({
    type: t.setOtherMeans,
    otherMeans: v
})

const requireNone = (v) => ({type: t.setRequireNone, value: v})

const requireCollab = (v) => ({type: t.setRequireCollab, value: v})

const requireIrb = (v) => ({type: t.setRequireIrb, value: v})

const requireData = (v) => ({type: t.setRequireData, value: v})

const restrictGenoInfo = (v) => ({type: t.setRestrictGenoInfo, value: v})

const restrictOtherDb = (v) => ({type: t.setRestrictOtherDb, value: v})

const restrictCommercial = (v) => ({type: t.setRestrictCommercial, value: v})

const restrictOther = (v) => ({type: t.setRestrictOther, value: v})

const restrictions_other_specify = (d) => ({type: t.setRestrictOtherSpecify, details: d})

const strategy_routine = (v) => ({type: t.setStrategyRoutine, value: v})

const strategy_mailing = (v) => ({type: t.setStrategyMailing, value: v})

const strategy_aggregate_study = (v) => ({type: t.setStrategyAggregateStudy, value: v})

const strategy_individual_study = (v) => ({type: t.setStrategyIndividualStudy, value: v})

const strategy_committees = (v) => ({type: t.setStrategyCommittees, value: v})

const strategy_invitation = (v) => ({type: t.setStrategyInvitation, value: v})

const strategy_participant_input = (v) => ({type: t.setStrategyParticipant, value: v})

const strategy_other = (v) => ({type: t.setStrategyOther, value: v})

const strategy_other_specify = (d) => ({type: t.setStrategyOtherSepcify, details: d})

const questionnaire_file_attached = (v) => ({type: t.setQuestionnaireFile, value: v})

const main_cohort_file_attached = (v) => ({type: t.setMainCohortFile, value: v})

const data_file_attached = (v)=> ({type: t.setDataFile, value: v})

const specimen_file_attached = (v) => ({type: t.setSpecimenFile, value: v})

const publication_file_attached = (v) => ({type: t.setPublicationFile, value: v})

const questionnaire_file = (v) => ({type: t.setQuestionnaireFileName, value: v})

const main_file = (v) => ({type: t.setMainFileName, value: v})

const specimen_file = (v) => ({type: t.setSpecimenFileName, value: v})

const publication_file = (v) => ({type: t.setPublicationFileName, value: v})

const data_file = (v) => ({type: t.setDataFileName, value: v})

const questionnaireFileName = (v) => ({type: t.setQuestionnaireFileName, value: v})

const mainFileName = (v) => ({type: t.setMainFileName, value: v})

const dataFileName = (v) => ({type: t.setDataFileName, value: v})

const specimenFileName = (v) => ({type: t.setSpecimenFileName, value: v})

const publicationFileName = (v) => ({type: t.setPublicationFileName, value: v})

const questionnaire_url = (v) => ({type: t.setQuestionnaireUrl, url: v})

const main_cohort_url = (v) => ({type: t.setMainCohortUrl, url: v})

const data_url = (v) => ({type: t.setDataUrl, url: v})

const specimen_url = (v) => ({type: t.setSpecimenUrl, url: v})

const publication_url = (v) => ({type: t.setPublicationUrl, url: v})
export default {
    setHasLoaded,
    setSectionAStatus,
    country_code,
    cohort_id,
    cohort_name,
    cohort_acronym,
    completionDate,
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
    removeInvestigator,
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
    strategy_committees,
    strategy_invitation,
    strategy_participant_input, 
    strategy_other,
    strategy_other_specify,
    questionnaire_file_attached,
    main_cohort_file_attached,
    data_file_attached,
    specimen_file_attached,
    publication_file_attached,
    questionnaire_file,
    main_file,
    data_file,
    specimen_file,
    publication_file,
    questionnaireFileName,
    mainFileName,
    dataFileName,
    specimenFileName,
    publicationFileName,
    questionnaire_url,
    main_cohort_url,
    data_url,
    specimen_url,
    publication_url
}