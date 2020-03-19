import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    Button,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import { Container, Thumbnail, Header, Content, Form, Item, Input, Label, Tab, Tabs, TabHeading, Icon, } from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';
import { Loader } from "../../components/loader";
import Posts from './posts';
import Tagged from './tagged';
import { ActionCreators as actions } from '../../redux/actions/index';
// import { requestLogin } from '../../redux/actions/loginActions';
const { width, height } = Dimensions.get("window");
const accessToken = "3037519972.1677ed0.52a14a1505524e469810bbd082331214";
import avatar from '../../assets/images/avatar7.png';

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        displayName: '',
        username: '',
        bio: '',
        website: '',
        loaded: false,
        data: null,
        photoURL: null,
        phoneNumber: null,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/goomapp-918e3.appspot.com/o/profile_pictures%2FNHaArgt7KcMkCGOQGXeKaBAcJoE3%2FIMG_20200314_011831.jpg?alt=media&token=1edf45c6-6656-4660-8b56-9335d90165e7",
        email: "saim@gmail.com",
        isAnonymous: false,
        emailVerified: false,
        providerId: "firebase",
        uid: "NHaArgt7KcMkCGOQGXeKaBAcJoE3",
        userid: "NHaArgt7KcMkCGOQGXeKaBAcJoE3",
        name: "saim",
    };

    componentDidMount = async () => {
        // this.fetchFeed();
        console.log("didmount profile:", this.props);
        if (this.props.user) {
            const { displayName, username, uid, bio, website } = this.props.user;
            const source = { uri: this.props.user.photoURL }
            this.setState({
                photoURL: source,
                displayName, username, uid, bio, website
            })

            let { posts } = this.props.user;
            let postArr = [];
            if (posts) {
                posts.map((post) => {
                    postArr.push(post._data)
                })
                this.setState({ data: postArr })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("profildidupdate:", this.props.user)

        if (prevProps.isSideMenuOpen !== this.props.isSideMenuOpen) {
            this.props.toggleSideMenu();
        }
        if (prevProps.user !== this.props.user) {
            console.log("indidupdateafter post:", this.props.user)
            const { displayName, username, uid, bio, website } = this.props.user;
            const source = { uri: this.props.user.photoURL }

            let { posts } = this.props.user;
            let postArr = [];
            if (posts) {
                posts.map((post) => {
                    postArr.push(post._data)
                })
            }
            this.setState({
                photoURL: source,
                displayName, username, uid, bio, website,
                data: postArr
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
            photoURL: img
        });
        this.renderHeader();
    }

    handleEditProfile = () => {
        const { navigate } = this.props.navigation;
        navigate('EditProfile');
    }

    renderHeader = () => {
        console.log("this.state", this.state)
        const imageUrl = this.state.photoURL;
        return (
            <View>
                <View style={{ padding: 20, flexDirection: "row" }}>
                    <View style={[styles.profileImage], { backgroundColor: 'none' }}>
                        <Thumbnail style={styles.profileImage} large source={this.state.photoURL.uri ? this.state.photoURL : avatar} />
                        <Text>{this.state.displayName}</Text>
                        <Text>{this.state.bio}</Text>
                        <Text>{this.state.website}</Text>
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
                                <Text>329</Text>
                                <Text>followers</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text>593</Text>
                                <Text>following</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={this.handleEditProfile} >
                    <View
                        style={{
                            borderWidth: 1,
                            height: 30,
                            borderRadius: 10,
                            width: "100%",
                            marginLeft: 0,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: 'none'
                        }}
                    >
                        <Text>Edit Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    handleNavigation = (postInfo) => {
        this.props.navigation.navigate('Posts', { postInfo })
    }

    renderItem = (postInfo, index) => {
        const imageUri = postInfo.postUrl;
        console.log("postInfo", postInfo.postUrl)
        // return;
        return (
            <View style={styles.gridImgContainer}>
                {/* <Thumbnail style={styles.profileImage} large source={this.state.photoURL ? { uri: imageUri } : avatar} /> */}
                <TouchableHighlight onPress={() => this.handleNavigation(postInfo)}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={{ uri: imageUri }}
                    />
                </TouchableHighlight>
            </View>
        );
    };
    onChangeTab = () => {
        console.log("tab changed")
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loaded} text="Loading..." />
                {this.renderHeader()}
                {/* <Tabs hasTabs tabBarUnderlineStyle={{ borderBottomWidth: 0 }} onChangeTab={() => this.onChangeTab()} scrollWithoutAnimation>
                    <Tab heading="Popular" tabStyle={{ backgroundColor: 'yellow' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'normal' }} heading={<TabHeading><Icon type="FontAwesome" name="table" /></TabHeading>}>
                        <Posts />
                    </Tab>
                    <Tab initialPage heading={<TabHeading><Icon type="MaterialIcons" name="perm-contact-calendar" /></TabHeading>}>
                        <Tagged />
                    </Tab>
                </Tabs> */}
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
    }
});

const mapStateToProps = state => {
    return {
        isSideMenuOpen: state.sideMenuReducer.isSideMenuOpen,
        user: state.userProfileReducer.user
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ requestLogout: actions.requestLogout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);