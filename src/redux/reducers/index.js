/* class combines all th existing reducers in the app
 */
import loginReducer from './loginReducer';
import sideMenuReducer from './sideMenuReducer';
import updateUserProfileReducer from './updateUserProfileReducer';
// export default Object.assign(loginReducer, sideMenuReducer);

export const rootReducer = {
    sideMenuReducer,
    loginReducer,
    updateUserProfileReducer
};