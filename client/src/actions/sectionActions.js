import t from '../actionTypes'
const setSectionStatus = (key, value) => ({
    type: t.setSectionStatus,
    sectionKey: key,
    status: value
})

export default {
    setSectionStatus
}