/*
 * Reducer actions related with UpdateUserProfile
 */

import firebase from 'react-native-firebase';
import * as types from './actionTypes';

export function recommendedUsers() {
    return (dispatch, getState) => {
        dispatch({ type: types.RECOMMENDED_USERS_REQUEST, payload: {} })
        // const { uid } = userObj;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("firebase==========", user)
                const { uid } = user._user;
                const usersRef = firebase.firestore().collection('users');
                const userRef = firebase.firestore()
                console.log("usersRef", usersRef)

                usersRef.get().then((users) => {
                    console.log("fetched updated found:", users)

                    if (user !== null) {
                        dispatch({ type: types.RECOMMENDED_USERS_RESPONSE, payload: users })
                    }

                }).catch((error) => {
                    console.log("error in fetcheing updated posts:", error);
                    dispatch({ type: types.RECOMMENDED_USERS_FAILED, payload: {} })
                })
            }
        })
    }
}
