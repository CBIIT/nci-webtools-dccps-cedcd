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

const updateMostRecentDate = (v) => ({
    type: t.updateMostRecentdate,
    dateString: v
})
export default {
    updateEnrollmentCounts,
    updateTotals,
    updateMostRecentDate
}