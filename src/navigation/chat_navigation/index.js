import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomChatHeader from '../../components/custome_chat_header';
import Screens from '../../screens';

const ChatNavigator = createStackNavigator({
    ChatUsersList: {
        screen: Screens.ChatUserListScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Direct',
            headerShown: true,
            headerLeft: () => (<MaterialIcon onPress={() => navigation.dismiss(null)} style={[styles.headerIcons, { marginVertical: 20 }]} name={'arrow-back'} size={25} />)
        })
    },
    ChatView: {
        screen: Screens.ChatViewScreen,
        navigationOptions: {
            title: 'Chat',
            headerShown: true,
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
        // width: 30,
        // height: 30,
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    }
})

export default createAppContainer(ChatNavigator);