import t from '../actionTypes'

const setHasLodaded = (v) => ({type: t.setMortalityLoaded, value: v})
const setMortalityYear = (v) => ({type: t.setMortalityYear, value: v})
const setDeathIndex = (v) => ({type: t.setDeathIndex, value: v})
const setDeathCertificate = (v) => ({type: t.setDeathCertificate, value: v})
const setDeathOther = (v) => ({type: t.setDeathOther, value: v})
const setHaveDeathDate = (v) => ({type: t.setHaveDeathDate, value: v})
const setIcd9 = (v) => ({type: t.setIcd9, value: v})
const setIcd10 = (v) => ({type: t.setIcd10, value: v})
const setNotCoded = (v) => ({type: t.setNotCoded, value: v})
const setOtherCode = (v) => ({type: t.setOtherCode, value: v})
const setDeathNumbers = (v) => ({type: t.setDeathNumbers, value: v})
const setSectionEStatus = (v) => ({type: t.setSectionEStatus, value: v})

export default{
    setHasLodaded,
    setMortalityYear,
    setDeathIndex,
    setDeathCertificate,
    setDeathOther,
    setHaveDeathDate,
    setIcd9,
    setIcd10,
    setNotCoded,
    setOtherCode,
    setDeathNumbers,
    setSectionEStatus
}