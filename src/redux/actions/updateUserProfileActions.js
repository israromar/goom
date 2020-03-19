/*
 * Reducer actions related with UpdateUserProfile
 */

import firebase from 'react-native-firebase';
import * as types from './actionTypes';

export function updateUserProfile(flag, data, userObj) {
    console.log("updateUserProfile data to update---", flag, data, userObj)
    return (dispatch, getState) => {
        dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST, payload: userObj })

        if (flag === 'profile_info') {
            let docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
            let updatedUserObj = {
                ...userObj,
                displayName: data.displayName,
                name: data.displayName,
                username: data.username,
                website: data.website,
                bio: data.bio
            };

            let updateDisplayName = {
                displayName: data.displayName
            }

            firebase.auth().onAuthStateChanged(currentUser => {
                currentUser
                    .updateProfile(updateDisplayName)
                    .then(() => firebase.auth().currentUser)
                    .then(user => {
                        console.log("userInfo:", user)
                        docRef.get().then(async (thisDoc) => {
                            if (thisDoc.exists) {
                                //user is already there, write only last login
                                console.log("thisDoc.exists", user, thisDoc)
                                // o.lastLoginDate = Date.now();
                                docRef.update(updatedUserObj);
                                // dispatch({ type: types.USER_PROFILE_INFO, payload: updatedUserObj })
                            }
                        })
                        dispatch({ type: types.USER_PROFILE_INFO, payload: updatedUserObj })
                    }).catch(error => {
                        dispatch({ type: types.UPDATE_USER_PROFILE_FAILED, error: error, payload: userObj })
                    });
            });
        } else {

            console.log("here in photo---")
            firebase.auth().onAuthStateChanged(currentUser => {
                currentUser
                    .updateProfile(data)
                    .then(() => firebase.auth().currentUser)
                    .then(user => {
                        let updatedUser = {
                            ...userObj,
                            photoURL: data.photoURL
                        }
                        dispatch({ type: types.USER_PROFILE_INFO, payload: updatedUser })
                    }).catch(error => {
                        dispatch({ type: types.UPDATE_USER_PROFILE_FAILED, error: error, payload: userObj })
                    });
            });
        }
    }
}
