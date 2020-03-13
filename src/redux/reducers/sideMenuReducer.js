/* Login Reducer
 * handles login states in the app
 */
// import createReducer from 'src/lib/createReducer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isSideMenuOpen: false
};

const sideMenuReducer = (state = initialState, action) => {
    // console.log("sidemenu reducer:", action);
    switch (action.type) {
        case actionTypes.TOGGLE_SIDE_MENU:
            return {
                ...state,
                isSideMenuOpen: action.flag
            }
        default:
            return state;
    }
}

export default sideMenuReducer;

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
