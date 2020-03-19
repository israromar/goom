import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Footer, Title, Content, Button, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators as actions } from '../../redux/actions/index';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSignout = async () => {
        // this.props.requestLogout();
        // navigate('Auth');
        const { navigate } = this.props.navigation;
        if (await GoogleSignin.isSignedIn()) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut().then(async () => {
                    await this.props.requestLogout();
                    navigate('Auth');
                });
                // this.setState({ user: null }); // Remember to remove the user from your app's state as well
            } catch (error) {
                console.error(error);
            }
        } else {
            firebase.auth().signOut().then(async () => {
                await this.props.requestLogout();
                navigate('Auth');
            }).catch(error => {
                console.log("error", error);
                Alert.alert('Something went wrong while logging out.');
                // navigate('Auth');
            })
        }
    }

    render() {
        return (
            <Container style={{ borderLeftWidth: 0.5, borderLeftColor: 'black' }}>
                <Header style={{ backgroundColor: "white" }} noRight>
                    <Left style={{ marginLeft: -100 }}>
                        <Title style={{ color: 'black' }}>israromar</Title>
                    </Left>
                </Header>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon type="MaterialCommunityIcons" active name="restore-clock" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Archive</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="MaterialCommunityIcons" name="progress-clock" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Your Activity</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="EvilIcons" active name="tag" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Nametag</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="MaterialIcons" active name="bookmark" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Saved</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="FontAwesome" active name="list-ul" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Close Friends</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="Ionicons" active name="md-person-add" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Discover People</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon type="Entypo" active name="facebook-with-circle" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Open Facebook</Text>
                        </Body>
                    </ListItem>
                </Content>
                <Footer style={{ backgroundColor: "white" }} noRight>
                    <Left>
                        <Button transparent>
                            <Icon style={{ color: 'black' }} name="settings" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', marginLeft: -80 }}>Settings</Title>
                    </Body>
                </Footer>
                <Footer style={{ backgroundColor: "white" }} noRight>
                    <Left>
                        <Button onPress={() => this.handleSignout()} transparent>
                            <Icon type="AntDesign" style={{ color: 'black' }} name="logout" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', marginLeft: -80 }}>Log out</Title>
                    </Body>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSideMenuOpen: state.sideMenuReducer.isSideMenuOpen
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ requestLogout: actions.requestLogout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
