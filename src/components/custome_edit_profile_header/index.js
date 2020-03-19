import React from "react";
import { View, Platform, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ActionCreators as actions } from '../../redux/actions';


class CustomEditProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handlePress = async (flag) => {
        console.log("flag:", flag, this.props);
        if (flag === 'cross') {
            this.props.navigationProps.dismiss();
        } else {
            console.log("check:", this.props);
            this.props.updateUserProfile(null, this.props.user);
        }
    }

    render() {
        return (
            <View
                style={[{
                    height: 50,
                    marginTop: Platform.OS == "ios" ? 20 : 0
                }]}
            >
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }]}>
                    {this.props.type === 'left' && <AntDesignIcon onPress={() => this.handlePress('cross')} style={[styles.headerIcons]} name={'close'} size={29} />}
                    {this.props.type === 'right' && <AntDesignIcon onPress={() => this.handlePress('check')} style={[styles.headerIcons]} color="blue" name={'check'} size={25} />}
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    regText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        // resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    headerIcons: {
        // width: 30,
        // height: 30,
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        marginVertical: 10
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});

const mapStateToProps = state => {
    return {
        user: state.loginReducer.user
        // isSideMenuOpen: state.sideMenuReducer.isSideMenuOpen
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateUserProfile: actions.updateUserProfile }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomEditProfileHeader);