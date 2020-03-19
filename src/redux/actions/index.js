// creating action creators
import * as loginActions from './loginActions';
import * as sideMenuActions from './sideMenuActions';
import * as userPostsActions from './userPostsAction';
import * as recommendedUsersAction from './recommendedUsersAction';
import * as updateUserProfileActions from './updateUserProfileActions';
export const ActionCreators = Object.assign(
    {},
    loginActions,
    sideMenuActions,
    userPostsActions,
    recommendedUsersAction,
    updateUserProfileActions
);
