/*
 * Reducer actions related with login
 */

import * as types from './actionTypes';
import firebase from 'react-native-firebase';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export function requestLogin(email, password, signInFlag) {
    return async (dispatch, getState) => {
        dispatch({ type: types.LOGIN_REQUEST, email, password });

        if (signInFlag === 'email') {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (data) => {
                    let { _user } = data.user
                    console.log("userInfo data: ", data);
                    const { uid } = _user;
                    const userInfoRef = firebase.firestore().collection('users').doc(uid);
                    const userPostsRef = firebase.firestore().collection('users').doc(uid).collection('posts');
                    // return;
                    userInfoRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log("user found:", doc);
                            const { _data } = doc;

                            let user = {
                                ..._user,
                                userid: _data.userId,
                                name: _data.name,
                                username: _data.username,
                                website: _data.website,
                                bio: _data.bio,
                            }
                            userPostsRef.get().then((posts) => {
                                console.log("posts found:", posts)

                                user = {
                                    ..._user,
                                    userid: _data.userId,
                                    name: _data.name,
                                    username: _data.username,
                                    website: _data.website,
                                    bio: _data.bio,
                                    posts: posts._docs
                                }

                                if (user !== null) {
                                    dispatch({ type: types.USER_PROFILE_INFO, payload: user })
                                }
                            }).catch((error) => {
                                console.log("error in posts:", error);
                                dispatch({ type: types.USER_PROFILE_INFO, payload: user })
                            })
                        } else {
                            console.log("No such user exists!");
                            dispatch({ type: types.LOGIN_FAILED, payload: error })
                        }
                    })
                    // navigate('Home')
                })
                .catch((error) => {
                    dispatch({ type: types.LOGIN_FAILED, payload: error })
                    // Alert.alert("Email or password is incorrect!");
                    console.log("Email or password is incorrect!", error)
                })
        } else {
            const user = await signInWithGmail();
            console.log("gmailuserObjhere: ", user)
        }
    }
}

const signInWithGmail = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
        console.log("myUser:", user)
        return user;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
    }
};

export function requestLogout() {
    return (dispatch, getState) => {
        dispatch({ type: types.LOGOUT_REQUEST })
        let user = {
            isLoggedIn: false,
            isLoginInitiated: false,
            email: '',
            password: '',
            user: {},
            isUserProfileUpdated: false
        }
        dispatch({ type: types.USER_PROFILE_INFO, payload: user })
        dispatch({ type: types.UPDATE_USER_PROFILE_RESPONSE, payload: user })
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
