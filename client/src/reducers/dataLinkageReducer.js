import t from "../actionTypes";
import InitialStates from "../states";
const actions = {};
actions[t.setDataLinkageLoaded] = (state, action) => ({ ...state, hasLoaded: action.value });
actions[t.setHaveDataLink] = (state, action) => ({ ...state, haveDataLink: action.value });
actions[t.setHaveDataLinkSpecify] = (state, action) => ({ ...state, haveDataLinkSpecify: action.value });
actions[t.setHaveHarmonization] = (state, action) => ({ ...state, haveHarmonization: action.value });
actions[t.setHaveHarmonizationSpecify] = (state, action) => ({ ...state, haveHarmonizationSpecify: action.value });
actions[t.setHaveDeposited] = (state, action) => ({ ...state, haveDeposited: action.value });
actions[t.setdbGaP] = (state, action) => ({ ...state, dbGaP: action.value });
actions[t.setbioLinCC] = (state, action) => ({ ...state, BioLINCC: action.value });
actions[t.setOtherRepo] = (state, action) => ({ ...state, otherRepo: action.value });
actions[t.setDataOnline] = (state, action) => ({ ...state, dataOnline: action.value });
actions[t.setDataOnlineWebsite] = (state, action) => ({ ...state, dataOnlineWebsite: action.value });
actions[t.setDataOnlinePolicy] = (state, action) => ({ ...state, dataOnlinePolicy: action.value });
actions[t.setDataOnlineURL] = (state, action) => ({ ...state, dataOnlineURL: action.value });
actions[t.setCreatedRepo] = (state, action) => ({ ...state, createdRepo: action.value });
actions[t.setCreatedRepoSpecify] = (state, action) => ({ ...state, createdRepoSpecify: action.value });
actions[t.setSectionFStatus] = (state, action) => ({ ...state, sectionFStatus: action.value });
actions[t.setUploadFileName] = (state, action) => ({ ...state, dataFileName: action.value });
const getResult = (feedState) => (feedAction) =>
  (actions[feedAction.type] && actions[feedAction.type](feedState, feedAction)) || feedState;
const dataLinkageReducer = (state = InitialStates.dataLinkage, action = {}) => getResult(state)(action);

export default dataLinkageReducer;
