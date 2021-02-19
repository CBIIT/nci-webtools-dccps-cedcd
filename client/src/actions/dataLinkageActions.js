import t from '../actionTypes'

const setHasLoaded = (v) => ({type: t.setDataLinkageLoaded, value: v})
const setHaveDataLink = (v) => ({type: t.setHaveDataLink, value: v})
const setHaveDataLinkSpecify = (v) => ({type: t.setHaveDataLinkSpecify, value: v})
const setHaveHarmonization = (v) => ({type: t.setHaveHarmonization, value: v})
const setHaveHarmonizationSpecify = (v) => ({type: t.setHaveHarmonizationSpecify, value: v})
const setHaveDeposited = (v) => ({type: t.setHaveDeposited, value: v})
const setdbGaP = (v) => ({type: t.setdbGaP, value: v})
const setbioLinCC = (v) => ({type: t.setbioLinCC, value: v})
const setOtherRepo = (v) => ({type: t.setOtherRepo, value: v})
const setDataOnline = (v) => ({type: t.setDataOnline, value: v})
const setDataOnlineWebsite = (v) => ({type: t.setDataOnlineWebsite, value: v})
const setDataOnlinePolicy = (v) => ({type: t.setDataOnlinePolicy, value: v})
const setDataOnlineURL = (v) => ({type: t.setDataOnlineURL, value: v})
const setCreatedRepo = (v) => ({type: t.setCreatedRepo, value: v})
const setCreatedRepoSpecify = (v) => ({type: t.setCreatedRepoSpecify, value: v})
const setSectionFStatus = (v) => ({type: t.setSectionFStatus, value: v})
const dataFileName = (v) => ({type: t.setUploadFileName, value: v})

export default{
    setHasLoaded,
    setHaveDataLink,
    setHaveDataLinkSpecify,
    setHaveHarmonization,
    setHaveHarmonizationSpecify,
    setHaveDeposited,
    setdbGaP,
    setbioLinCC,
    setOtherRepo,
    setDataOnline,
    setDataOnlineWebsite,
    setDataOnlinePolicy,
    setDataOnlineURL,
    setCreatedRepo,
    setCreatedRepoSpecify,
    setSectionFStatus,
    dataFileName
}