import t from '../actionTypes'

const setSpecimenCounts = (countsObj) => ({
    type: t.setSpecimenCounts,
    value: countsObj
})

export default {setSpecimenCounts}