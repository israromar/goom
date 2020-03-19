import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Textarea, Header, Right, Label, Form, Item, Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, RightThumbnail } from 'native-base';

import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators as actions } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import avatar from '../../assets/images/avatar7.png';

//https://i.picsum.photos/id/1039/6945/4635.jpg
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            photoURL: '',
            postUrl: '',
            description: '',
            caption: '',
            likes: 0,
            postDate: null,
        }
    }

    componentDidMount() {
        console.log("didmount:", this.props);
        const { likes, postDate, caption, postUrl } = this.props.navigation.state.params.postInfo;
        const { username, photoURL } = this.props.user;
        setTimeout(() => {
            this.setState({ username, photoURL, likes, postDate, caption, postUrl })
        }, 1000)

    }

    // componentDidUpdate(preProps, preState) {
    //     console.log("didupdate post: ", preProps, this.props)
    //     if (preProps.navigation.state.params !== this.props.navigation.state.params) {
    //         console.log("didupdatetwo: ", this.props.navigation)
    //     }
    // }
    render() {
        return (
            <Container>
                <Content >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={this.state.photoURL ? { uri: this.state.photoURL } : avatar} />
                                <Body>
                                    <Text>{this.state.username}</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.postUrl ? this.state.postUrl : 'https://i.picsum.photos/id/1037/5760/3840.jpg' }} style={{ height: 300, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>{this.state.likes ? this.state.likes : 0} Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                {/* <Content padder>
                    <Form>
                        <Textarea value={this.state.caption} rowSpan={3} bordered placeholder="Caption" onChangeText={(caption) => { this.setState({ caption }) }} />
                        <Button rounded block info style={{ marginTop: 50 }} onPress={() => this.getImage()}><Text>Select Picture</Text></Button>
                    </Form>
                    <Button rounded block info style={{ marginTop: 50 }} onPress={() => this.uploadUserPost(this.state.imagePickerResponse)}><Text>Upload Post</Text></Button>
                </Content> */}
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
    bindActionCreators({ updateUserProfile: actions.updateUserProfile, updateUserPosts: actions.updateUserPosts }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);