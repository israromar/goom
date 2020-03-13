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
            routes: [
                {
                    name: "Home",
                    icon: "ios-home"
                },
                {
                    name: "Profile",
                    icon: "ios-contact"
                },
                {
                    name: "Settings",
                    icon: "ios-settings"
                },
            ]
        }
    }

    Home = ({ navigation }) => (
        <View style={styles.container}>
            <Header name="Home" openDrawer={navigation.openDrawer} />
            <Image source={require("./assets/banner.png")} style={{ width: "80%", height: "30%" }} resizeMode="contain" />
            <Text style={{ padding: 20 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
          </Text>
            <Text style={{ padding: 20 }}>
                In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
          </Text>
        </View>
    )

    Item({ item, navigate }) {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
                <Ionicons name={item.icon} size={32} />
                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <EmailEnvelopeOne style={styles.profileImg} />
                {/* <Image source={require("./assets/profile.jpg")} style={styles.profileImg} /> */}
                <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>Janna Doe</Text>
                <Text style={{ color: "gray", marginBottom: 10 }}>janna@doe.com</Text>
                <View style={styles.sidebarDivider}></View>

                <FlatList
                    style={{ width: "100%", marginLeft: 30 }}
                    data={this.state.routes}
                    renderItem={({ item }) => <this.Item item={item} navigate={this.props.navigation.navigate} />}
                    keyExtractor={item => item.name}
                />
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
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20
    },
    sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    },
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
        marginLeft: 20
    },
});