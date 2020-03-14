/*
 * Reducer actions related with login
 */

import * as types from './actionTypes';
import firebase from 'react-native-firebase';

export function requestLogin(email, password) {
    return (dispatch, getState) => {
        dispatch({ type: types.LOGIN_REQUEST, email, password })
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (data) => {

                let { _user } = data.user
                console.log("userInfo: ", _user);
                const { uid } = _user;

                const userInfoRef = firebase.firestore().collection('users').doc(uid);
                // const imageRef = firebase.storage().ref('profile_pictures').child(uid).child();

                // firebase.firestore()
                //     .collection('profile_pictures').child(uid)
                //     .get()
                //     .then(function (querySnapshot) {
                //         let posts = querySnapshot.docs.map(doc => doc.data())
                //         console.log("posts", posts)
                //         return posts
                //     })
                //     .catch(function (error) {
                //         console.log('Error getting documents: ', error)
                //     })

                // const url = await imageRef.getDownloadUrl();
                // console.log("imageRef:", firebase.storage().ref());
                // return;
                // imageRef.get().then((image) => {
                //     console.log("image: ", image);

                // }).catch((error) => {
                //     console.log("error here:", error)
                // })
                // return;

                userInfoRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log("document!", doc);
                        const { _data } = doc;
                        let user = {
                            ..._user,
                            userid: _data.userId,
                            name: _data.name,
                            username: _data.username,
                            website: _data.website,
                            bio: _data.bio,
                        }

                        if (user !== null) {
                            dispatch({ type: types.LOGIN_RESPONSE, user: user })
                        }
                    } else {
                        console.log("No such user exists!");
                        dispatch({ type: types.LOGIN_FAILED, error: error })
                    }
                })
                // navigate('Home')
            })
            .catch((error) => {
                dispatch({ type: types.LOGIN_FAILED, error: error })
                // Alert.alert("Email or password is incorrect!");
                console.log("Email or password is incorrect!", error)
            })
    }
    // return {
    //     type: types.LOGIN_REQUEST,
    //     email,
    //     password
    // };
}

export function requestLogout() {
    return (dispatch, getState) => {
        dispatch({ type: types.LOGOUT_REQUEST })
    }
}


export function loginFailed() {
    return {
        type: types.LOGIN_FAILED
    };
}

export function onLoginResponse(response) {
    return {
        type: types.LOGIN_RESPONSE,
        response
    };
}

export function enableLoader() {
    return {
        type: types.LOGIN_ENABLE_LOADER
    };
}

export function disableLoader() {
    return {
        type: types.LOGIN_DISABLE_LOADER
    };
}
