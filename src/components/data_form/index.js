import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    Picker,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
var RNFS = require('react-native-fs');

const DataForm = (props) => {

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [userRecords, setUserRecords] = useState([]);

    useEffect(() => { _storeData(); }, [userRecords])

    const _storeData = async () => {
        console.log("data--", userRecords);
        const getData = JSON.parse(await _retrieveData());
        console.log("getData: ", (getData));

        if (userRecords.length > 0) {
            if (getData === null) {
                console.log("here--");
                try {
                    await AsyncStorage.setItem('USER_RECORDS', JSON.stringify(userRecords));
                } catch (error) {
                    // Error saving data
                    console.log("error storing value:", error);
                }
            } else {
                console.log("here2222", getData, userRecords);
                const farray = getData.concat(userRecords);
                console.log("farray:", farray);
                try {
                    await AsyncStorage.setItem('USER_RECORDS', JSON.stringify(farray));
                } catch (error) {
                    // Error saving data
                    console.log("error storing value:", error);
                }
            }
        }
    };

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('USER_RECORDS');
            if (value !== null) {
                console.log("value from async: ", JSON.parse(value));

                // We have data!!
                return value;
            } else {
                console.log("else value", value);
                return null;
            }
        } catch (error) {
            // Error retrieving data
            console.log(" Error retrieving data", error);
        }
    };

    const _writeFile = () => {
        console.log("RNFS: ", RNFS);
        var path = RNFS.DocumentDirectoryPath + '/test.txt';

        // write the file
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const onClickListener = async (viewId) => {
        const { navigate } = props.navigation;
        if (viewId === 'add') {
            if (name && email && password && language) {
                await setUserRecords([{
                    name: name,
                    email: email,
                    password: password,
                    language: language
                }])
            } else {
                Alert.alert("Missing value")
            }
        } else if (viewId === 'records') {
            _retrieveData();
        } else if (viewId === 'clear_async') {
            AsyncStorage.removeItem('USER_RECORDS');
        } else if (viewId === 'write_file') {
            _writeFile();
        }
    }
    return (
        <View style={styles.container}>

            {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            {/* <Image style={styles.bgImage} source={{ uri: "https://i.picsum.photos/id/1067/5760/3840.jpg" }} /> */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Full name"
                    underlineColorAndroid='transparent'
                    onChangeText={setName} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={setEmail} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={setPassword} />
            </View>

            <Picker
                selectedValue={language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => { setLanguage(itemValue) }
                    // setLanguage({ itemValue })
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => onClickListener('add')}>
                <Text style={styles.loginText}>Add Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => onClickListener('records')}>
                <Text style={styles.loginText}>Display Stored Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => onClickListener('clear_async')}>
                <Text style={styles.loginText}>Clear Asyc Storage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => onClickListener('write_file')}>
                <Text style={styles.loginText}>Download File</Text>
            </TouchableOpacity>


        </View>
    );
}

export default DataForm;

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