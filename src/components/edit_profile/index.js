

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
            loading: false,
            image: null,
            name: '',
            username: '',
            website: '',
            bio: '',
            isLoginInitiated: false,
            isModalVisible: false,
            imagePickerResponse: null,
            image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'

        },
            GoogleSignin.configure();
    };

    componentDidMount = async () => {
        console.log("componentDidMount edit profile", firebase, this.props);
        if (this.props.user) {
            const source = { uri: this.props.user.photoURL };
            this.setState({ image: source })
        }
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("editprofile did update: ", prevProps, this.props);
    }

    selectImage = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri };
                firebase.auth().onAuthStateChanged(currentUser => {
                    const data = {
                        displayName: "Amir Khan",
                        displayImage: response.uri
                    };
                    this.props.updateUserProfile(data, currentUser._user);
                });
                this.setState({
                    image: source
                })
            }
        })
    };

    handleImageChange = () => {
        this.selectImage();
    };

    onSubmit = async () => {
        firebase.auth().onAuthStateChanged(currentUser => {
            const data = {
                displayName: "Amir asd",
                displayImage: "https://www.bootdey.com/img/Content/avatar/avatar1.png"
            };
            this.props.updateUserProfile(data, currentUser._user);
        })
    };


    uploadPost = post => {
        // const id = uuidv4();
        const uploadData = {
            id: '1b671a64-40d5-491e-99b0-da01ff1f33499',
            postPhoto: post.photo,
            postTitle: 'my post',
            postUrl: post.postUrl,
            caption: post.fileName
        }
        return firebase
            .firestore()
            .collection('posts')
            .doc(uploadData.id)
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
                    reject(error)
                })
        })
    }

    getImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

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
                // let source = { uri: response.uri };
                // this.setState({image_uri: response.uri})

                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

                const source = { uri: response.uri };
                this.setState({ imagePickerResponse: response, image: source });

                if (false) {
                    this.uploadImage(response)
                        .then(url => {
                            alert('Image uploaded');
                            this.setState({ image_uri: url })
                            const data = {
                                displayName: this.props.user.name,
                                displayImageUrl: url
                            };
                            this.props.updateUserProfile(data, this.props.user);
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
                        <Thumbnail large source={this.state.image ? this.state.image : avatar} />
                        <TouchableOpacity style={{ marginTop: 10, color: 'blue' }} onPress={() => this.getImage()}>
                            <Text style={{ color: 'blue' }}>Change Profile Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ marginBottom: 5 }}>Name</Label>
                            <Input onChangeText={(name) => this.setState({ name })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(username) => this.setState({ username })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Website</Label>
                            <Input onChangeText={(website) => this.setState({ website })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Bio</Label>
                            <Input onChangeText={(bio) => this.setState({ bio })} />
                        </Item>
                    </Form>
                    {/* <Button title="Upload Photo" onPress={() => this.handleUploadImage()} /> */}
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    console.log("updateduser: ", state.loginReducer.user);
    return {
        user: state.loginReducer.user,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUserProfile: actions.updateUserProfile }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
