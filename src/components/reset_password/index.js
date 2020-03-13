import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import firebase from 'react-native-firebase'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
// import {firebase} from 'react-native-firebase';

import colors from '../../styles/colors';
import { EmailEnvelopeOne, PasswordKey } from '../../assets';

export default class ResetPassword extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        },
            GoogleSignin.configure();
    }

    componentDidMount() {
        console.log("UserInfocomponentDidMount---");

        getCurrentUserInfo = async () => {
            try {
                const userInfo = await GoogleSignin.signInSilently();
                console.log("UserInfoResp---", userInfo);
                this.setState({ userInfo });
            } catch (error) {
                console.log("UserInfoError---", error);

                if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                    // user has not signed in yet
                } else {
                    // some other error
                }
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { navigate } = this.props.navigation;
        if (prevState.userInfo !== this.state.userInfo) {
            console.log("this.state.userInfo", this.state.userInfo);
            if (this.state.userInfo) {
                navigate('Home');
            }
        }
    }

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };

    forgotPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                alert('Please check your email.')
            }).catch(function (e) {
                console.log("error", e)
            })
    }

    onClickListener = async (viewId) => {
        const { navigate } = this.props.navigation;
        if (viewId === 'reset_password') {
            if (this.state.email) {
                this.forgotPassword(this.state.email);
            } else {
                Alert.alert('Enter email address!')
            }
        } else if (viewId === 'login') {
            console.log("firebase instance---:", firebase.auth().signInWith);
            firebase.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => navigate('Home'))
                .catch(error => console.log(error))
        } else if (viewId === 'signin_phone') {
            console.log("here--", viewId);
            navigate('PhoneAuth');
        } else {
            navigate('SignUp');
        }
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log("GoogleSignin UserInfo--", userInfo);
            this.setState({ userInfo });
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

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.bgImage} source={{ uri: "https://i.picsum.photos/id/1018/3914/2935.jpg" }} />

                <TouchableHighlight>
                    <Text style={styles.regText}>Forgot Password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}>
                    <Text style={styles.regText}>Enter Your Email address</Text>
                </TouchableHighlight>

                <View style={styles.inputContainer}>
                    <EmailEnvelopeOne style={styles.inputIcon} fill={colors.black} width={20} height={20} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onClickListener('reset_password')}>
                    <Text style={styles.loginText}>Send Email</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const resizeMode = 'cover';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    regText: {
        color: 'white',
        fontSize: 18
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});