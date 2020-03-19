/*
 * Reducer actions related with UpdateUserProfile
 */

import firebase from 'react-native-firebase';
import * as types from './actionTypes';

export function updateUserPosts(userObj) {
    console.log("updateUserPosts---", userObj)
    return (dispatch, getState) => {
        // dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST, payload: userObj })
        const { uid } = userObj;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("firebase==========", user)
                const { uid } = user._user;
                const userPostsRef = firebase.firestore().collection('users').doc(uid).collection('posts');
                console.log("userPostsRef", userPostsRef)

                userPostsRef.get().then((posts) => {
                    console.log("fetched updated found:", posts)

                    user = {
                        ...userObj,
                        posts: posts._docs
                    }

                    if (user !== null) {
                        dispatch({ type: types.USER_PROFILE_INFO, payload: user })
                    }
                }).catch((error) => {
                    console.log("error in fetcheing updated posts:", error);
                    dispatch({ type: types.USER_PROFILE_INFO, payload: userObj })
                })
            }
        })
    }
}
