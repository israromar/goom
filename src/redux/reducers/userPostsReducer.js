/* Login Reducer
 * handles login states in the app
 */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    postsUpdated: false,
    user: {}
};

const userPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_POSTS:
            return {
                ...state,
                postsUpdated: true,
                user: action.payload
            }
        case actionTypes.UPDATE_USER_POSTS_FAILED:
            return {
                ...state,
                postsUpdated: false,
                user: action.payload
            }
        default:
            return state;
    }
}

export default userPostsReducer;