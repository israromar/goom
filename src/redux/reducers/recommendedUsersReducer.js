/* Login Reducer
 * handles login states in the app
 */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fetching: false,
    recommendedUsers: {}
};

const recommendedUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECOMMENDED_USERS_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.RECOMMENDED_USERS_RESPONSE:
            return {
                ...state,
                fetching: false,
                recommendedUsers: action.payload
            }
        case actionTypes.RECOMMENDED_USERS_FAILED:
            return {
                ...state,
                fetching: false,
                recommendedUsers: {}
            }
        default:
            return state;
    }
}

export default recommendedUsersReducer;