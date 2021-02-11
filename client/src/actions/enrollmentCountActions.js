import t from '../actionTypes'
const renewEnrollmentCounts = (v) => ({
    type: t.renewEnrollmentCounts,
    value: v
})

const updateEnrollmentCounts = (cellid, amount) => ({
    type: t.updateEnrollmentCount,
    cell: cellid,
    value: amount
})

const updateTotals = (cellid, amount) => ({
    type: t.updateTotals,
    cell: cellid,
    value: amount,
    
})

const setHasLoaded = (v) => ({
    type: t.enrollmentCountLoaded,
    value: v
})

const updateMostRecentDate = (v) => ({
    type: t.updateMostRecentDate,
    dateString: v
})

const setSectionBStatus = (v) => ({
    type: t.setSectionBStatus,
    value: v
})
export default {
    renewEnrollmentCounts,
    updateEnrollmentCounts,
    updateTotals,
    updateMostRecentDate,
    setHasLoaded,
    setSectionBStatus
}