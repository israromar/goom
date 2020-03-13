/*
 * Reducer actions related with side menu
 */
import * as types from './actionTypes';

export function toggleSideMenu(flag) {
    console.log(" sidemenu action:", flag);
    return {
        type: types.TOGGLE_SIDE_MENU,
        flag
    };
}