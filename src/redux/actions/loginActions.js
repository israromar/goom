/*
 * Reducer actions related with login
 */

import firebase from 'react-native-firebase';

import * as types from './actionTypes';

export function requestLogin(email, password) {
    return (dispatch, getState) => {
        dispatch({ type: types.LOGIN_REQUEST, email, password })
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                // navigate('Home')
                if (user !== null) {
                    dispatch({ type: types.LOGIN_RESPONSE, user: user.user._user })
                }
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
