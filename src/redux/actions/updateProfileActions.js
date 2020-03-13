/*
 * Reducer actions related with login
 */

import firebase from 'react-native-firebase';

import * as types from './actionTypes';

export function updateUserProfile(data, userObj) {
    console.log("loginin action:", (data), userObj);

    return (dispatch, getState) => {
        dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST, payload: userObj })

        firebase.auth().onAuthStateChanged(currentUser => {
            // const data = {
            //     displayName: displayName,
            //     photoURL: displayImage
            // };
            currentUser
                .updateProfile(data)
                .then(() => firebase.auth().currentUser)
                .then(user => {

                    console.log("user profile updated successfully", user);

                    let updatedUser = {
                        ...currentUser._user,
                        displayName: data.displayName,
                        photoURL: data.displayImageUrl
                    }
                    dispatch({ type: types.UPDATE_USER_PROFILE_INFO, payload: updatedUser })
                }).catch(error => {
                    console.log('error updating user profile', error)
                    dispatch({ type: types.UPDATE_USER_PROFILE_FAILED, error: error, payload: userObj })
                });
        });
    }
}
