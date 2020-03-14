/* Login Reducer
 * handles login states in the app
 */
// import createReducer from 'src/lib/createReducer';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    isLoginInitiated: false,
    email: '',
    password: '',
    user: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoginInitiated: true,
                email: action.email,
                password: action.password
            }
        case actionTypes.LOGIN_RESPONSE:
            return {
                ...state,
                isLoggedIn: true,
                isLoginInitiated: false,
                user: action.user
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: true,
                isLoginInitiated: false
            }
        case actionTypes.LOGOUT_REQUEST:
            return {
                isLoggedIn: false,
                isLoginInitiated: false,
                email: '',
                password: '',
                user: {}
            }
        case actionTypes.UPDATE_USER_PROFILE_INFO:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default loginReducer;

// export const loginReducer = createReducer(initialState, {
//     [actionTypes.LOGIN_REQUEST](state, action) {
//         return {
//             ...state,
//             username: action.username,
//             password: action.password
//         };
//     },
//     [actionTypes.LOGIN_LOADING_ENDED](state) {
//         return { ...state };
//     },
//     [actionTypes.LOGIN_RESPONSE](state) {
//         return {
//             ...state
//         };
//     },
//     [actionTypes.LOGIN_FAILED](state) {
//         return {
//             ...state,
//             isLoggedIn: false
//         };
//     }
// });
