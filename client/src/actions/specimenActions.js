import t from '../actionTypes'

const setSpecimenCount = (cellId, v) => ({
    type: t.setSpecimenCount,
    cell: cellId,
    value: v
})

export default {
    setSpecimenCount
}