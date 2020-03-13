import React, { Component } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    TextInput
} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Feather';
// import styles from './styles';

class PhoneAuthComponent extends Component {
    state = {
        phone: '',
        confirmResult: null,
        verificationCode: '',
        userId: ''
    }

    validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(this.state.phone)
    }

    changePhoneNumber = () => {

    }

    handleSendCode = () => {
        // Request to send OTP
        if (this.validatePhoneNumber()) {
            console.log("phone---", this.state);
            firebase
                .auth()
                .signInWithPhoneNumber(this.state.phone)
                .then(confirmResult => {
                    console.log("handleSendCode---", confirmResult);
                    this.setState({ confirmResult })
                })
                .catch(error => {
                    alert(error.message)

                    console.log(error)
                })
        } else {
            alert('Invalid Phone Number')
        }
    }

    handleVerifyCode = () => {
        // Request for OTP verification
        console.log("handleVerifyCode----", this.state);
        const { navigate } = this.props.navigation;
        const { confirmResult, verificationCode } = this.state
        if (verificationCode.length == 6) {
            confirmResult
                .confirm(verificationCode)
                .then(user => {
                    this.setState({ userId: user.uid })
                    navigate('Home');
                    alert(`Verified! ${user.uid}`)
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }

    renderConfirmationCodeView = () => {
        return (
            <View style={styles.verificationView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Verification code'
                    placeholderTextColor='#eee'
                    value={this.state.verificationCode}
                    keyboardType='numeric'
                    onChangeText={verificationCode => {
                        this.setState({ verificationCode })
                    }}
                    maxLength={6}
                />
                <TouchableOpacity
                    style={[styles.themeButton, { marginTop: 20 }]}
                    onPress={this.handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //https://i.picsum.photos/id/160/3200/2119.jpg
    //https://i.picsum.photos/id/180/2400/1600.jpg
    //https://i.picsum.photos/id/201/5184/3456.jpg
    
    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#333' }]}>
                <Image style={styles.bgImage} source={{ uri: "https://i.picsum.photos/id/160/3200/2119.jpg" }} />
                <View style={styles.page}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Phone Number with country code'
                        placeholderTextColor='#eee'
                        keyboardType='phone-pad'
                        value={this.state.phone}
                        onChangeText={phone => {
                            this.setState({ phone })
                        }}
                        maxLength={15}
                        editable={this.state.confirmResult ? false : true}
                    />

                    <TouchableOpacity
                        style={[styles.themeButton, { marginTop: 20 }]}
                        onPress={
                            this.state.confirmResult
                                ? this.changePhoneNumber
                                : this.handleSendCode
                        }>
                        <Text style={styles.themeButtonTitle}>
                            {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
                        </Text>
                    </TouchableOpacity>

                    {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
                </View>
            </SafeAreaView>
        )
    }
}

const resizeMode = 'cover';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa'
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        marginTop: 20,
        width: '90%',
        height: 40,
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        color: '#fff',
        fontSize: 16
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    themeButton: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#888',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 5
    },
    themeButtonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    verificationView: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50
    }
})
export default PhoneAuthComponent;