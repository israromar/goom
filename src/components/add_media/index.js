import React, { Component } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Textarea, Header, Label, Form, Item, Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, RightThumbnail } from 'native-base';

import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators as actions } from '../../redux/actions';
import avatar from '../../assets/images/avatar7.png';
import RNFetchBlob from 'react-native-fetch-blob'
import { v4 as uuidv4 } from 'uuid';
import { Value } from 'react-native-reanimated';

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
//https://i.picsum.photos/id/1039/6945/4635.jpg
class AddMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            description: '',
            caption: '',
            imagePickerResponse: null,
            showLoading: false
        }
    }

    uploadPost = post => {
        const { navigate } = this.props.navigation;
        console.log("myuserobj:", this.props);
        const { uid } = this.props.user;
        const userPostsRef = firebase.firestore().collection('users').doc(uid).collection('posts');
        console.log("post:", post)
        const id = uuidv4();
        const date = new Date();
        const uploadData = {
            postDate: new Date(),
            postPhoto: post.photo,
            // postTitle: post.fileName,
            postUrl: post.postUrl,
            likes: 587,
            caption: this.state.caption ? this.state.caption : 'no caption'
        }

        return userPostsRef
            .doc()
            .set(uploadData).then((resp) => {
                alert('post uploaded success');
                this.setState({
                    image: '',
                    description: '',
                    caption: '',
                    imagePickerResponse: null
                }, () => {
                    this.props.updateUserPosts(this.props.user);
                    this.setState({ showLoading: false })
                    navigate('Home');
                })
            }).catch((error) => {
                console.log("error---", error)
            })
    }

    uploadUserPost(response, mime = 'application/octet-stream') {
        this.setState({ showLoading: true })
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
                const source = { uri: response.uri };
                this.setState({ imagePickerResponse: response, image: response.uri });

                // this.uploadUserPost(response)
                //     .then(url => {
                //         this.setState({ image_uri: url })
                //         const data = {
                //             displayName: this.props.user.name,
                //             displayImageUrl: url
                //         };
                //         // this.props.updateUserProfile(data, this.props.user);
                //     }).catch(error => console.log("error occured: ", error))
            }
        });
    }

    uploadPostToFB = () => {
        this.uploadUserPost(this.state.imagePickerResponse)
            .then(url => {
                this.setState({ image_uri: url })
                const data = {
                    displayName: this.props.user.name,
                    displayImageUrl: url
                };
                // this.props.updateUserProfile(data, this.props.user);
            }).catch(error => console.log("error occured: ", error))
    }

    render() {
        return (
            <Container>
                {this.state.showLoading &&
                    <View style={styles.activity}>
                        <View style={{
                            display: 'flex', alignItems: 'center', borderRadius: 10, position: 'absolute', zIndex: 1,
                            justifyContent: 'center', width: 250, height: 150, backgroundColor: 'grey', opacity: 0.9
                        }}>
                            <ActivityIndicator Text="loading" size="large" color="white" />
                            <Text style={{ color: 'white', marginTop: 15 }}>Uploading...</Text>
                        </View>
                    </View>
                }
                <Content >
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.image ? this.state.image : 'https://i.picsum.photos/id/1037/5760/3840.jpg' }} style={{ height: 300, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
                </Content>
                <Content padder>
                    <Form>
                        <Textarea value={this.state.caption} rowSpan={3} bordered placeholder="Caption" onChangeText={(caption) => { this.setState({ caption }) }} />
                        <Button rounded block info style={{ marginTop: 50 }} onPress={() => this.getImage()}><Text>Select Picture</Text></Button>
                    </Form>
                    <Button rounded block info style={{ marginTop: 50 }} onPress={() => this.uploadUserPost(this.state.imagePickerResponse)}><Text>Upload Post</Text></Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps(state) {
    return {
        user: state.userProfileReducer.user,
        isUpdateUserProfile: state.updateUserProfileReducer.updateUserProfile
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUserProfile: actions.updateUserProfile, updateUserPosts: actions.updateUserPosts }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMedia);