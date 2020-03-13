// creating action creators
import * as loginActions from './loginActions';
import * as sideMenuActions from './sideMenuActions';
import * as updateUserProfileActions from './updateProfileActions';
export const ActionCreators = Object.assign(
    {},
    loginActions,
    sideMenuActions,
    updateUserProfileActions
);
