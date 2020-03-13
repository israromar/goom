import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import Menu from '../../screens/profile/menu';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Screens from '../../screens';
import CustomHomeHeader from '../../components/custome_home_header';
import CustomProfileHeader from '../../components/custome_profile_header';

const HomeStack = createStackNavigator({
    HomeScreen: {
        screen: Screens.HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerShown: true,
            header: () => <CustomHomeHeader navigation={navigation} />,
        })
    }
});

const SearchStack = createStackNavigator({
    SearchScreen: {
        screen: Screens.MapScreen,
        navigationOptions: {
            title: 'Search',
            headerShown: true
        }
    }
});

SearchStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    // if (navigation.state.index > 0) {
    //     tabBarVisible = false;
    // }
    return {
        tabBarVisible,
    };
};

const AddMediaStack = createStackNavigator({
    AddMediaScreen: {
        screen: Screens.AddMediaScreen
    }
});

const NotificationStack = createStackNavigator({
    NotificationScreen: {
        screen: Screens.NotificationsScreen
    }
});

const ProfileStack = createStackNavigator({
    ProfileScreen: {
        screen: Screens.ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerShown: true,
            headerLeft: () => <CustomProfileHeader type={'left'} />,
            headerRight: () => <CustomProfileHeader type={'right'} navigationProps={navigation} />
        })
    }
});

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = FeatherIcons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // We want to add badges to home tab icon
        // IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
    }
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack
        },
        Search: {
            screen: SearchStack
        },
        AddMedia: {
            screen: AddMediaStack
        },
        Notifications: {
            screen: NotificationStack
        },
        Profile: {
            screen: ProfileStack
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = FeatherIcons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home'
                } else if (routeName === 'Search') {
                    iconName = 'search'
                } else if (routeName === 'AddMedia') {
                    iconName = 'plus-square'
                } else if (routeName === 'Notifications') {
                    iconName = 'heart'
                } else if (routeName === 'Profile') {
                    // iconName = focused ? 'ios-list-box' : 'ios-list';
                    iconName = 'user'
                }
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={28} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        }
    }
)

const App = createAppContainer(BottomTabNavigation);
export default App;

// export default BottomTabNavigation;
// export default class BottomNav extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isOpen: false
//         }
//         this.toggleSideMenu = this.toggleSideMenu.bind(this)
//     }

//     toggleSideMenu() {
//         this.setState({
//             isOpen: !this.state.isOpen
//         })
//     }

//     render() {
//         console.log("sidemenu0909:", this.props)
//         return (
//             <App />
//         )
//     }
// }