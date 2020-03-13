import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';

const SignUp = (props) => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         email: '',
    //         password: '',
    //     }
    // }

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const insertUserDataToFireStore = (userId) => {
        const { navigate } = props.navigation;
        firebase.firestore().doc('users/' + userId).set({
            userId: userId,
            name: name,
            email: email
        }).then(user => {
            console.log("data entry callback---", user);
            navigate('Home');
        }).catch(error => {
            console.log("error:", error);
        })
    }
    
    const register = async () => {
        const { navigate } = props.navigation;
        setShowLoading(true);
        try {
            const doRegister = await firebase.auth().createUserWithEmailAndPassword(email, password);
            setShowLoading(false);
            if (doRegister.user) {
                // setUserId();
                insertUserDataToFireStore(doRegister.user._user.uid);
                // setName(name);
                // setEmail(email);
                // navigate('Home');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    const onClickListener = (viewId) => {
        const { navigate } = props.navigation;
        if (viewId === 'register') {
            if (name && email && password) {
                register();
            } else {
                Alert.alert("Missing value")
            }
        } else if (viewId === 'login') {
            navigate('SignIn');
        }
    }
    return (
        <View style={styles.container}>

            {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            <Image style={styles.bgImage} source={{ uri: "https://i.picsum.photos/id/1067/5760/3840.jpg" }} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Full name"
                    underlineColorAndroid='transparent'
                    onChangeText={setName} />
                <Image style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png' }} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={setEmail} />
                <Image style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/flat_round/40/000000/secured-letter.png' }} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={setPassword} />
                <Image style={styles.inputIcon}
                    source={{ uri: 'https://img.icons8.com/color/40/000000/password.png' }} />
            </View>

            <TouchableOpacity style={styles.btnByRegister} onPress={() => onClickListener('restore_password')}>
                <Text style={styles.textByRegister}>By registering on this App you confirm that you have read and
                        accept our policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => onClickListener('register')}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonContainer} onPress={() => onClickListener('login')}>
                <Text style={styles.btnText}>Have an account?</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUp;

const resizeMode = 'cover';

const styles = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    formContainer: {
        height: 400,
        padding: 20
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
        width: 200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnByRegister: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
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
    btnText: {
        color: "white",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    textByRegister: {
        color: "white",
        fontWeight: 'bold',
        textAlign: 'center',

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
});