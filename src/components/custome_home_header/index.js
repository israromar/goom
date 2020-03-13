import React from "react";
import { View, Platform, Text, StyleSheet, TouchableOpacity } from "react-native";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import IconWithBadge from '../../components/IconWithBadge';

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={4} />;
};

const CustomHeader = props => {
    const _handlePress = (flag) => {
        const { navigate } = props.navigation;
        navigate(flag);
    }
    
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
                <SimpleIcon onPress={() => { _handlePress('Camera') }} style={styles.headerIcons} name={'camera'} size={28} />
                <Text style={styles.headerText}>Instagram</Text>
                {/* {false && <SimpleIcon style={[styles.headerIcons, { marginHorizontal: 10 }]} name={'paper-plane'} size={28} />} */}
                <TouchableOpacity onPress={() => { _handlePress('Chat') }}>
                    <HomeIconWithBadge name={'paper-plane'} color={'black'} size={28} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
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
export default CustomHeader;