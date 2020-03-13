/* Login Reducer
 * handles login states in the app
 */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isUserProfileUpdated: false,
    user: {}
};

const updateUserProfileReducer = (state = initialState, action) => {
    // console.log("loginReducer:", action);
    switch (action.type) {
        case actionTypes.UPDATE_USER_PROFILE_REQUEST:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.UPDATE_USER_PROFILE_RESPONSE:
            return {
                ...state,
                isUserProfileUpdated: true,
                user: action.payload
            }
        case actionTypes.UPDATE_USER_PROFILE_FAILED:
            return {
                ...state,
                isUserProfileUpdated: false,
                user: action.payload
            }
        default:
            return state;
    }
}

export default updateUserProfileReducer;