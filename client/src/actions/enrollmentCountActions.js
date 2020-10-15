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
export default {
    updateEnrollmentCounts,
    updateTotals
}