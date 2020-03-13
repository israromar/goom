import React from "react";
import { View, Platform, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import IconWithBadge from '../IconWithBadge';
import { ActionCreators as actions } from '../../redux/actions';
import { requestLogin } from '../../redux/actions/loginActions';
import { toggleSideMenu } from '../../redux/actions/sideMenuActions';
const MenuIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={1} />;
};

class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleDrawer = () => {
        //Props to open/close the drawer
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            }
        }, () => {
            this.props.toggleSideMenu(this.state.isOpen);
            // this.props.requestLogin("israr", "israr123");
        })
    };
    componentDidMount() {
        // console.log("CustomHeader Component Mounted----", this.props);
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
                    {this.props.type === 'left' && <Text style={[styles.headerText, { marginLeft: 10 }]}>israromar</Text>}
                    {this.props.type === 'left' && <SimpleIcon style={[styles.headerIcons, { marginVertical: 20 }]} name={'arrow-down'} size={10} />}
                    {/* {this.props.type === 'right' && false && <SimpleIcon style={[styles.headerIcons, { marginHorizontal: 15 }]} name={'menu'} size={28} />} */}
                    {this.props.type === 'right' &&
                        <TouchableOpacity onPress={() => this.toggleDrawer()}>
                            <MenuIconWithBadge name={'menu'} color={'black'} size={28} />
                        </TouchableOpacity >
                    }
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
        // isSideMenuOpen: state.sideMenuReducer.isSideMenuOpen
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSideMenu: actions.toggleSideMenu }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);