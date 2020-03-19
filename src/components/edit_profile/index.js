

import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Container, Button, Thumbnail, Header, Body, Title, Left, Right, Content, Form, Item, Icon, Input, Label } from 'native-base';
// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';

import {
    GoogleSignin,
} from '@react-native-community/google-signin';
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators as actions } from '../../redux/actions';
import avatar from '../../assets/images/avatar7.png';
import RNFetchBlob from 'react-native-fetch-blob'

var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.getImage = this.getImage.bind(this)
        this.state = {
            name: '',
            displayName: '',
            photoURL: '',
            username: '',
            website: '',
            bio: '',
            isLoginInitiated: false,
            loading: false,
            image: null,
            isModalVisible: false,
            imagePickerResponse: null,
            image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'

        },
            GoogleSignin.configure();
    };

    componentDidMount = async () => {
        if (this.props.user) {
            const { displayName, username, uid, bio, website } = this.props.user;
            const source = { uri: this.props.user.photoURL }
            this.setState({
                photoURL: source,
                displayName, username, uid, bio, website
            })
        }
    };

    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps:", props, state)
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("didupdateditprofile:", this.props)
        const { navigate } = this.props.navigation;
        if (prevProps.user !== this.props.user) {
            console.log("updatePoriflepic", this.props.user);
            const source = { uri: this.props.user.photoURL }
            this.setState({ photoURL: source });

            navigate('Profile');
        }

        // if (prevProps.isUpdateUserProfile !== this.props.isUpdateUserProfile) {
        //     const data = {
        //         displayName,
        //         username,
        //         website,
        //         bio
        //     } = this.state
        //     this.props.updateUserProfile(data, this.props.user);
        // }
    }

    uploadPost = post => {
        const id = uuidv4();
        const uploadData = {
            id: id,
            postPhoto: post.photo,
            postTitle: 'my post',
            postUrl: post.postUrl,
            caption: post.fileName
        }
        return firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .set(uploadData).then((resp) => {
                alert('post uploaded success');

                console.log("post:", resp)
            }).catch((error) => {
                console.log("error---", error)
            })
    }

    uploadUserPost(response, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadPath = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.path
            let uploadBlob = null
            const { uid } = this.props.user;
            const { fileName } = response;
            // return;
            // const imageRef = firebase.storage().ref('profile_pictures').child('image_001.jpg')
            const imageRef = firebase.storage().ref('user_posts').child(uid).child(fileName)

            fs.readFile(uploadPath, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.putFile(uploadPath)
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    console.log("urluploadPost----", url);
                    let post = {
                        photo: response.uri,
                        postUrl: url,
                        fileName: response.fileName,
                        path: response.path
                    }

                    this.uploadPost(post);
                    // resolve(url);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    uploadImage(response, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadPath = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.path
            let uploadBlob = null
            const { uid } = this.props.user;
            const { fileName } = response;
            // return;
            // const imageRef = firebase.storage().ref('profile_pictures').child('image_001.jpg')
            const imageRef = firebase.storage().ref('profile_pictures').child(uid).child(fileName)
            fs.readFile(uploadPath, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.putFile(uploadPath)
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    console.log("url----", url)
                    resolve(url);
                })
                .catch((error) => {
                    console.log("here inerror", error)
                    reject(error)
                })
        })
    }

    getImage() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = { uri: response.uri };
                this.setState({ imagePickerResponse: response, image: source });

                if (true) {
                    this.uploadImage(response)
                        .then(url => {
                            alert('Image uploaded');
                            this.setState({ image_uri: url })
                            const data = {
                                displayName: this.props.user.name,
                                photoURL: url
                            };
                            this.props.updateUserProfile('profile_image', data, this.props.user);
                        }).catch(error => console.log("error occured: ", error))
                } else {
                    this.uploadUserPost(response)
                        .then(url => {
                            this.setState({ image_uri: url })
                            const data = {
                                displayName: this.props.user.name,
                                displayImageUrl: url
                            };
                            this.props.updateUserProfile(data, this.props.user);
                        }).catch(error => console.log("error occured: ", error))
                }
            }
        });
    }

    updateUserInfo = () => {
        this.props.updateUserProfile('profile_info', this.state, this.props.user);
    }

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container>
                <Content>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 15
                    }}>
                        <Thumbnail large source={this.state.photoURL.uri ? this.state.photoURL : avatar} />
                        <TouchableOpacity style={{ marginTop: 10, color: 'blue' }} onPress={() => this.getImage()}>
                            <Text style={{ color: 'blue' }}>Change Profile Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ marginBottom: 5 }}>Name</Label>
                            <Input value={this.state.displayName} onChangeText={(displayName) => this.setState({ displayName })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input value={this.state.username} onChangeText={(username) => this.setState({ username })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Website</Label>
                            <Input value={this.state.website} onChangeText={(website) => this.setState({ website })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Bio</Label>
                            <Input value={this.state.bio} onChangeText={(bio) => this.setState({ bio })} />
                        </Item>
                    </Form>
                    <Button rounded block info style={{ marginTop: 50 }} onPress={() => this.updateUserInfo()}><Text style={{ color: 'white' }}>Update</Text></Button>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userProfileReducer.user,
        isUpdateUserProfile: state.updateUserProfileReducer.updateUserProfile
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUserProfile: actions.updateUserProfile }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
