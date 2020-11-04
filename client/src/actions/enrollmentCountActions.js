import t from '../actionTypes'
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
export default {
    updateEnrollmentCounts,
    updateTotals,
    updateMostRecentDate,
    setHasLoaded
}