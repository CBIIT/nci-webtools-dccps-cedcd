import t from '../actionTypes'

const completionDate = (toRemove, v) => ({type: t.completionDate, value: v, remove: toRemove})
const clarification_contact = (toRemove, v) => ({type: t.clarification_contact, value: v, remove: toRemove})
const cohort_web_site = (toRemove, v) => ({type: t.cohort_web_site, value: v, remove: toRemove})
const completerName = (toRemove, v) => ({type: t.completerName, value: v, remove: toRemove})
const completerPosition = (toRemove, v) => ({type: t.completerPosition, value: v, remove: toRemove})
const completerPhone = (toRemove, v) => ({type: t.completerPhone, value: v, remove: toRemove})
const completerEmail = (toRemove, v) => ({type: t.completerEmail, value: v, remove: toRemove})
const contacterName = (toRemove, v) => ({type: t.contacterName, value: v, remove: toRemove})
const contacterPosition = (toRemove, v) => ({ type: t.contacterPosition, value: v, remove: toRemove})
const contacterPhone = (toRemove, v) => ({type: t.contacterPhone, value: v, remove: toRemove})
const contacterEmail = (toRemove, v) => ({ type: t.contacterEmail, value: v, remove: toRemove})
const collaboratorName = (toRemove, v) => ({ type: t.collaboratorName, value: v, remove: toRemove})
const collaboratorPosition = (toRemove, v) => ({ type: t.collaboratorPosition, value: v, remove: toRemove})
const collaboratorPhone = (toRemove, v) => ({type: t.collaboratorPhone, value: v, remove: toRemove})
const collaboratorEmail = (toRemove, v) => ({ type: t.collaboratorEmail, value: v, remove: toRemove})
const investigatorName = (idx, toRemove, v) => ({type: t.investigatorName, index: idx, value: v, remove: toRemove})
const investigatorInstitution = (idx, toRemove, v) => ({type: t.investigatorInsitution, index: idx, value: v, remove: toRemove})
const investigatorEmail = (idx, toRemove, v) => ({type: t.investigatorEmail, index: idx, value: v, remove: toRemove})
const eligible_gender_id = (toRemove, v) => ({ type: t.eligible_gender_id, value: v, remove: toRemove})
const enrollment_ongoing = (toRemove, v) => ({ type: t.enrollment_ongoing, value: v, remove: toRemove})
const enrollment_total = (toRemove, v) => ({ type: t.enrollment_total, value: v, remove: toRemove})
const enrollment_year_start = (toRemove, v) => ({ type: t.enrollment_year_start, value: v, remove: toRemove})
const enrollment_year_end = (toRemove, v) => ({ type: t.enrollment_year_end, value: v, remove: toRemove})
const enrollment_target = (toRemove, v) => ({ type: t.enrollment_target, value: v, remove: toRemove})
const enrollment_year_complete = (toRemove, v) => ({ type: t.enrollment_year_complete, value: v, remove: toRemove})
const enrollment_age_min = (toRemove, v) => ({ type: t.enrollment_age_min, value: v, remove: toRemove})
const enrollment_age_max = (toRemove, v) => ({ type: t.enrollment_age_max, value: v, remove: toRemove})
const enrollment_age_mean  = (toRemove, v) => ({ type: t.enrollment_age_mean , value: v, remove: toRemove})
const enrollment_age_median = (toRemove, v) => ({ type: t.enrollment_age_median, value: v, remove: toRemove})
const current_age_min = (toRemove, v) => ({ type: t.current_age_min, value: v, remove: toRemove})
const current_age_max = (toRemove, v) => ({ type: t.current_age_max, value: v, remove: toRemove})
const current_age_mean = (toRemove, v) => ({ type: t.current_age_mean, value: v, remove: toRemove})
const current_age_median = (toRemove, v) => ({ type: t.current_age_median, value: v, remove: toRemove})
const time_interval = (toRemove, v) => ({ type: t.time_interval, value: v, remove: toRemove})
const most_recent_year = (toRemove, v) => ({ type: t.most_recent_year, value: v, remove: toRemove})
const dataCollection = (toRemove, v) => ({ type: t.dataCollection, value: v, remove: toRemove})
const requirements = (toRemove, v) => ({ type: t.requirements, value: v, remove: toRemove})
const strategy = (toRemove, v) => ({ type: t.strategy, value: v, remove: toRemove})
const data_collected_other_specify = (toRemove, v) => ({ type: t.data_collected_other_specify, value: v, remove: toRemove})
const restrictions_other_specify = (toRemove, v) => ({ type: t.restrictions_other_specify, value: v, remove: toRemove})
const strategy_other_specify = (toRemove, v) => ({ type: t.strategy_other_specify, value: v, remove: toRemove})
const questionnaire = (toRemove, v) => ({ type: t.questionnaire, value: v, remove: toRemove})
const main = (toRemove, v) => ({ type: t.main, value: v, remove: toRemove})
const data = (toRemove, v) => ({ type: t.data, value: v, remove: toRemove})
const specimen = (toRemove, v) => ({ type: t.specimen, value: v, remove: toRemove})
const publication = (toRemove, v) => ({ type: t.publication, value: v, remove: toRemove})

export default {
    completionDate,
    cohort_web_site,
    clarification_contact,
    completerName,
    completerPosition,
    completerPhone,
    completerEmail,
    contacterName,
    contacterPosition,
    contacterPhone,
    contacterEmail,
    collaboratorName,
    collaboratorPosition,
    collaboratorPhone,
    collaboratorEmail,
    investigatorName,
    investigatorInstitution,
    investigatorEmail,
    eligible_gender_id,
    enrollment_ongoing,
    enrollment_total,
    enrollment_year_start,
    enrollment_year_end,
    enrollment_target,
    enrollment_year_complete,
    enrollment_age_min,
    enrollment_age_max,
    enrollment_age_mean ,
    enrollment_age_median,
    current_age_min,
    current_age_max,
    current_age_mean,
    current_age_median,
    time_interval,
    most_recent_year,
    dataCollection,
    requirements,
    strategy,
    data_collected_other_specify,
    restrictions_other_specify,
    strategy_other_specify,
    questionnaire,
    main,
    data,
    specimen,
    publication,
}