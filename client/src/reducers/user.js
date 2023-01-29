// note: state slices should be modular: ie, do not separate reducers, actions, action creators, etc by type
// instead, initialize each slice as a separate feature

export const initialState = {};

export const actions = {
    SET_USER: 'USER.SET_USER',
    UPDATE_USER: 'USER.UPDATE_USER',
    RESET_USER: 'USER.RESET_USER',
}

// action creators
export function setUser(value) {
    return {type: actions.SET_USER, value};
}

export function updateUser(value) {
    return {type: actions.UPDATE_USER, value};
}

export function resetUser() {
    return {type: actions.RESET_USER};
}

export function fetchUser() {
    return async function(dispatch) {
        try {
            const response = await fetch(`/api/user-session`)
            const value = await response.json();
            dispatch(setUser(value?.user));
        } catch(e) {
            console.log(e);
            dispatch(setUser({error: String(e)}));
        }
    }
}

export function updateUserSession() {
    return async function(dispatch) {
        try {
            const response = await fetch(`/api/update-session`)
            const value = await response.json();
            dispatch(setUser(value.user));
        } catch(e) {
            console.log(e);
            dispatch(setUser({error: String(e)}));
        }
    }
}

// root reducer
export default function reducer(state = initialState, action = {type: null}) {
    switch(action.type) {
        case actions.SET_USER:
            return {...action.value};
        case actions.UPDATE_USER:
            return {...state, ...action.value};
        case actions.RESET_USER:
            return {...initialState};
        default:
            return state;
    }
}

