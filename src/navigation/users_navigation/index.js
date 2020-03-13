import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Screens from '../../screens';

const UsersNavigator = createStackNavigator({
    EditProfile: {
        screen: Screens.EditProfileScreen
    },
    UsersList: {
        screen: Screens.UsersListScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Recommended users',
            headerShown: true,
            headerLeft: () => (<MaterialIcon onPress={() => navigation.dismiss(null)} style={[styles.headerIcons, { marginVertical: 20 }]} name={'arrow-back'} size={25} />),
        })
    },
    UserProfile: {
        screen: Screens.UserProfileScreen,
        navigationOptions: {
            title: 'Profile',
            // headerShown: false,
        }
    }
});

const styles = StyleSheet.create({
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcons: {
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    }
})

export default createAppContainer(UsersNavigator);