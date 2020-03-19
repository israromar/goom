/* class combines all th existing reducers in the app
 */
import loginReducer from './loginReducer';
import sideMenuReducer from './sideMenuReducer';
import userPostsReducer from './userPostsReducer';
import userProfileReducer from './userProfileReducer';
import recommendedUsersReducer from './recommendedUsersReducer';
import updateUserProfileReducer from './updateUserProfileReducer';
// export default Object.assign(loginReducer, sideMenuReducer);

export const rootReducer = {
    loginReducer,
    sideMenuReducer,
    userPostsReducer,
    userProfileReducer,
    recommendedUsersReducer,
    updateUserProfileReducer
};