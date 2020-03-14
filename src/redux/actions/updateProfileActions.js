/*
 * Reducer actions related with UpdateUserProfile
 */

import firebase from 'react-native-firebase';
import * as types from './actionTypes';

export function updateUserProfile(data, userObj) {
    return (dispatch, getState) => {
        dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST, payload: userObj })
        firebase.auth().onAuthStateChanged(currentUser => {
            currentUser
                .updateProfile(data)
                .then(() => firebase.auth().currentUser)
                .then(user => {
                    let updatedUser = {
                        ...currentUser._user,
                        displayName: data.displayName,
                        photoURL: data.displayImageUrl
                    }
                    dispatch({ type: types.UPDATE_USER_PROFILE_INFO, payload: updatedUser })
                }).catch(error => {
                    dispatch({ type: types.UPDATE_USER_PROFILE_FAILED, error: error, payload: userObj })
                });
        });
    }
}
