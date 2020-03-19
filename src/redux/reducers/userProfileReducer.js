/* Login Reducer
 * handles login states in the app
 */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    isLoginInitiated: false,
    email: '',
    password: '',
    user: {},
    loginError: '',
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_INFO:
            return {
                ...state,
                user: action.payload
            }
        // case actionTypes.UPDATE_USER_PROFILE_RESPONSE:
        //     return {
        //         ...state,
        //         updateUserProfile: false,
        //         isUserProfileUpdated: true,
        //         user: action.payload
        //     }
        // case actionTypes.UPDATE_USER_PROFILE_FAILED:
        //     return {
        //         ...state,
        //         updateUserProfile: false,
        //         isUserProfileUpdated: false,
        //         user: action.payload
        //     }
        default:
            return state;
    }
}

export default userProfileReducer;