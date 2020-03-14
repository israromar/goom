

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
import { Loader } from "../../components/loader";

import colors from '../../styles/colors';
import { EmailEnvelopeOne, PasswordKey } from '../../assets';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLogin } from '../../redux/actions/loginActions';
import { ActionCreators as actions } from '../../redux/actions';

class LoginView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            isLoginInitiated: false
        },
            GoogleSignin.configure();
    };

    componentDidMount = async () => {
        const { navigate } = this.props.navigation;
        console.log("await GoogleSignin.isSignedIn()", await GoogleSignin.isSignedIn());
        if (await GoogleSignin.isSignedIn()) {
            navigate('Home');
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { navigate } = this.props.navigation;

        if (prevProps.user !== this.props.user && Object.entries(this.props.user).length > 0 && this.props.user.constructor === Object) {
            navigate('Home');
        }

        if (prevState.userInfo !== this.state.userInfo) {
            if (this.state.userInfo) {
                navigate('Home');
            }
        }
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };

    handleLogin = () => {
        const { navigate } = this.props.navigation;
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => { navigate('Home') })
            .catch((error) => {
                Alert.alert("Email or password is incorrect!");
                console.log("Email or password is incorrect!", error)
            })
    };

    onClickListener = async (viewId) => {
        const { navigate } = this.props.navigation;
        if (viewId === 'login') {
            if (this.state.email && this.state.password) {
                // this.handleLogin();
                this.props.requestLogin(this.state.email, this.state.password);
            } else {
                Alert.alert("Enter email and password!");
            }
        } else if (viewId === 'signin_phone') {
            navigate('PhoneAuth');
        } else if (viewId === 'restore_password') {
            navigate('ResetPassword');
        } else {
            navigate('SignUp');
        }
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
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
                <Image style={styles.bgImage} source={{ uri: "https://i.picsum.photos/id/1057/6016/4016.jpg" }} />

                <Loader loading={this.state.loading} text="Loading..." />

                <View style={styles.inputContainer}>
                    <EmailEnvelopeOne style={styles.inputIcon} fill={colors.black} width={20} height={20} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <PasswordKey style={styles.inputIcon} fill={colors.black} width={20} height={20} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn}
                    disabled={this.state.isSigninInProgress} />

                <TouchableHighlight style={styles.buttonContainer}
                    onPress={() => this.onClickListener('signin_phone')}>
                    <Text style={styles.regText}>Sign in with Phone Number</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                    onPress={() => this.onClickListener('restore_password')}>
                    <Text style={styles.regText}>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text style={styles.regText}>Register</Text>
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

function mapStateToProps(state) {
    return {
        loginStatus: state.loginReducer.isLoggedIn,
        user: state.loginReducer.user,
        email: state.loginReducer.email,
        password: state.loginReducer.password,
        isLoginInitiated: state.loginReducer.isLoginInitiated
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ requestLogin: actions.requestLogin }, dispatch)
    // bindActionCreators({ requestLogin }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
