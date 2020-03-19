/*
 * Reducer actions related with UpdateUserProfile
 */

import firebase from 'react-native-firebase';
import * as types from './actionTypes';

export function userProfileInfo(data, userObj) {
    console.log("data to update---", data, userObj)
    return (dispatch, getState) => {
        dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST, payload: userObj })
        // return;
        firebase.auth().onAuthStateChanged(currentUser => {
            currentUser
                .updateProfile(data)
                .then(() => firebase.auth().currentUser)
                .then(user => {
                    console.log("09090909:", user)
                    let updatedUser = {
                        ...currentUser._user,
                        displayName: data.displayName,
                        photoURL: data.photoURL
                    }
                    dispatch({ type: types.USER_PROFILE_INFO, payload: updatedUser })
                }).catch(error => {
                    dispatch({ type: types.UPDATE_USER_PROFILE_FAILED, error: error, payload: userObj })
                });
        });
    }
}
