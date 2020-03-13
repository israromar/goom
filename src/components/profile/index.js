import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    Button
} from "react-native";
import { Container, Thumbnail, Header, Content, Form, Item, Input, Label } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';
import { Loader } from "../../components/loader";
import { ActionCreators as actions } from '../../redux/actions/index';
// import { requestLogin } from '../../redux/actions/loginActions';
const { width, height } = Dimensions.get("window");
const accessToken = "3037519972.1677ed0.52a14a1505524e469810bbd082331214";
import avatar from '../../assets/images/avatar7.png';

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        // this.state={

        // }
    }
    state = {
        loaded: false,
        data: null,
        profileImg: null,
        displayName: ''
    };

    componentDidMount() {
        // this.fetchFeed();
        if (this.props.user) {
            console.log("profileImg-000000000000000000: ", this.props.user);

            const source = { uri: this.props.user.photoURL }
            console.log("profileImg-source:", source)
            this.setState({
                profileImg: source,
                displayName: this.props.displayName
            })
        }
    }

    isSignedInWithGmail = async () => {
        const flag = await GoogleSignin.isSignedIn();
        return flag;
        // this.setState({ isLoginScreenPresented: !isSignedIn });
    };


    handleSignout = async () => {
        const { navigate } = this.props.navigation;
        if (await GoogleSignin.isSignedIn()) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut().then(() => {
                    this.props.requestLogout();
                    navigate('Auth');
                });
                // this.setState({ user: null }); // Remember to remove the user from your app's state as well
            } catch (error) {
                console.error(error);
            }
        } else {
            firebase.auth().signOut().then(() => {
                this.props.requestLogout();
                navigate('Auth');
            }).catch(error => {
                console.log("error", error);
                // navigate('Auth');
            })
        }
    }

    signOut = async () => {
        const { navigate } = this.props.navigation;
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut().then(resp => {
                navigate('Auth');
            });
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    async fetchFeed() {
        const response = await fetch(
            `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`
        );

        const posts = await response.json();
        const img = posts.data[0].user.profile_picture;
        await this.setState({
            loaded: false,
            data: posts.data,
            profileImg: img
        });
        this.renderHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isSideMenuOpen !== this.props.isSideMenuOpen) {
            this.props.toggleSideMenu();
        }
        if (prevProps.user !== this.props.user) {
            const source = { uri: this.props.user.photoURL }
            this.setState({
                profileImg: source,
                displayName: this.props.displayName
            })
        }
    }

    handleEditProfile = () => {
        const { navigate } = this.props.navigation;
        navigate('EditProfile');
    }

    renderHeader = () => {
        console.log("this.state.profileImg", this.state.profileImg);
        const imageUrl = this.state.profileImg;
        return (
            <View style={{ padding: 20, flexDirection: "row" }}>
                <View style={styles.profileImage}>
                    {/* <Image
                        resizeMode="cover"
                        style={styles.profileImage}
                        source={imageUrl}
                    /> */}
                    <Thumbnail style={styles.profileImage} large source={this.state.profileImg ? this.state.profileImg : avatar} />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5
                    }}
                >
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text>39</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text>339</Text>
                            <Text>followers</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text>393</Text>
                            <Text>following</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            width: "100%",
                            marginLeft: 1,
                            alignItems: "center"
                        }}
                    >
                        {/* <CustomProfileHeader type="right" {...this.props} /> */}
                        {/* <Text>Edit Profile</Text> */}
                        {/* <Text>Sign Out</Text> */}
                        <Button title="Edit Profile" color="grey" onPress={this.handleEditProfile} />
                    </View>
                </View>
            </View>
        );
    };

    renderItem = (postInfo, index) => {
        const imageUri = postInfo.images.standard_resolution.url;

        return (
            <View style={styles.gridImgContainer}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: imageUri }}
                />
            </View>
        );
    };

    render() {
        console.log("user-------", this.props)
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loaded} text="Loading..." />
                {this.renderHeader()}
                <FlatList
                    numColumns={3}
                    data={this.state.data}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    gridImgContainer: {
        padding: 1,
        backgroundColor: "#CCC"
    },
    profileImage: {
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: width * 0.5,
        borderWidth: 1,
        marginRight: 10
    },
    image: {
        height: width * 0.33,
        width: width * 0.33,
        // width: width * 0.2,
        // height: width * 0.2,
        // borderRadius: width * 0.5,
        // borderWidth: 1,
        // marginRight: 10
    }
});

const mapStateToProps = state => {
    return {
        isSideMenuOpen: state.sideMenuReducer.isSideMenuOpen,
        user: state.loginReducer.user
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ requestLogout: actions.requestLogout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);