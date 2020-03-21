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
import { DataTableIcon, TagPostIcon } from '../../assets/images';

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        activeTabIndex: 0,
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
        console.log("this.state.data", this.state)
        const imageUrl = this.state.photoURL;
        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'none' }}>
                        <View style={{ paddingTop: 5, backgroundColor: 'none' }}>
                            <Thumbnail style={styles.profileImage} large source={this.state.photoURL.uri ? this.state.photoURL : avatar} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'none' }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.data && this.state.data.length}</Text>
                                <Text style={{ fontSize: 13, fontWeight: 'simple' }}>Posts</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>12</Text>
                                <Text style={{ fontSize: 13, fontWeight: 'simple' }}>Followers</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>203</Text>
                                <Text style={{ fontSize: 13, fontWeight: 'simple' }}>Following</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'none', marginVertical: 10 }}>
                        <Text>{this.state.displayName}</Text>
                        <Text>{this.state.bio}</Text>
                        <Text>{this.state.website}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    alignItems: 'center',
                }} onPress={this.handleEditProfile} >
                    <View
                        style={{
                            borderWidth: 0.5,
                            height: 29,
                            borderRadius: 5,
                            width: "95%",
                            marginLeft: 0,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: 'none',
                            borderColor: 'grey',
                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: 'simple' }}>Edit Profile</Text>
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

    onChangeTab = (index) => {
        console.log("tab changed", index)
        this.setState({ activeTabIndex: index })
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loaded} text="Loading..." />
                {this.renderHeader()}
                <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 1 }} hasTabs onChangeTab={({ i }) => this.onChangeTab(i)} scrollWithoutAnimation>
                    <Tab activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: 'red' }}
                        heading={<TabHeading style={{ backgroundColor: '#fff' }}>
                            <DataTableIcon fill={this.state.activeTabIndex === 0 ? '#000000' : 'grey'} style={{ marginTop: 10, strokeWidth: 3, stroke: this.state.activeTabIndex === 0 ? '#000000' : 'grey' }} width={45} height={45} />
                            {/* <Icon type="FontAwesome" name="table" style={{ color: this.state.activeTabIndex === 0 ? 'black' : 'grey' }} /> */}

                        </TabHeading>}>
                        <Posts {...this.props} data={this.state.data && this.state.data} renderItem={this.renderItem} />
                    </Tab>
                    <Tab heading={
                        <TabHeading style={{ backgroundColor: '#fff' }}>
                            <TagPostIcon fill={this.state.activeTabIndex === 1 ? '#000000' : 'grey'} style={{ marginTop: 10, strokeWidth: 3, stroke: this.state.activeTabIndex === 1 ? '#000000' : 'grey' }} width={45} height={50} />
                            {/* <Icon type="MaterialIcons" name="perm-contact-calendar" style={{ color: this.state.activeTabIndex === 1 ? 'black' : 'grey' }} /> */}
                        </TabHeading>}>
                        <Tagged />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -10
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