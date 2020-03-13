

import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Container, Thumbnail, Header, Content, Form, Item, Input, Label } from 'native-base';
import uuid from 'uuid';
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
            email: '',
            password: '',
            isLoginInitiated: false,
            isModalVisible: false,
            imagePickerResponse: null,
            image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'

        },
            GoogleSignin.configure();
    };

    componentDidMount = async () => {
        console.log("componentDidMount edit profile", firebase, this.props);
    };

    uploadPost = (post) => {
        const id = uuid.v4()
        const uploadData = {
            id: id,
            postPhoto: post.photo,
            postTitle: post.title
        }
        return firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .set(uploadData)
    }

    selectImage = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }

                firebase.auth().onAuthStateChanged(currentUser => {

                    console.log("currentUser:", currentUser._user);

                    const data = {
                        displayName: "Amir Khan",
                        displayImage: response.uri
                    };

                    this.props.updateUserProfile(data, currentUser._user);

                })
                this.setState({
                    image: source
                })
            }
        })
    }

    handleImageChange = () => {
        this.selectImage();
    }

    onSubmit = async () => {
        firebase.auth().onAuthStateChanged(currentUser => {
            const data = {
                displayName: "Amir asd",
                displayImage: "https://www.bootdey.com/img/Content/avatar/avatar1.png"
            };
            this.props.updateUserProfile(data, currentUser._user);
        })
    }



    uploadImage(response, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadPath = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.path
            let uploadBlob = null

            const imageRef = firebase.storage().ref('images').child('image_001.jpg')

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
                    console.log("url----", url, this.props.user)
                    resolve(url);
                    const data = {
                        displayName: 'name',
                        displayImageUrl: url
                    }
                    this.props.updateUserProfile(data, this.props.user);
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

                // this.uploadImage(response)
                //     .then(url => { alert('Image uploaded'); this.setState({ image_uri: url }) })
                //     .catch(error => console.log("error occured: ", error))
            }
        });
    }

    handleUploadImage = () => {
        this.uploadImage(this.state.imagePickerResponse)
            .then(url => { alert('Image uploaded'); this.setState({ image_uri: url }) })
            .catch(error => console.log("error occured: ", error))
    }

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        return (
            <Container>
                <Content>
                    <Thumbnail large source={this.state.image ? this.state.image : avatar} />
                    <TouchableOpacity onPress={() => this.getImage()}>
                        <Text>Change Proifle Photo</Text>
                    </TouchableOpacity>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button title="Upload Photo" onPress={() => this.handleUploadImage()} />
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    console.log("Update user profile: ", state);
    return {
        user: state.loginReducer.user,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUserProfile: actions.updateUserProfile }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
