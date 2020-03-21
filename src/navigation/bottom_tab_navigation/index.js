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
import {
    HomeIcon,
    SearchIcon,
    SearchIconOne,
    SearchIconFilledOne,
    AddIcon,
    HeartIcon,
    HeartIconOne,
    HeartIconFilled,
    HeartIconFilledOne,
    UserIcon,
} from '../../assets/images';

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
        screen: Screens.AddMediaScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const NotificationStack = createStackNavigator({
    NotificationScreen: {
        screen: Screens.NotificationsScreen
    }
});

const PostStack = createStackNavigator({
    PostScreen: {
        screen: Screens.PostScreen
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
    },
    Posts: {
        screen: Screens.PostScreen
    },

}, { initialRouteName: 'ProfileScreen' })


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
                    return <HomeIcon style={{ strokeWidth: 3.5, stroke: "#000000" }} fill={focused ? 'black' : 'transparent'} width={45} height={45} />
                } else if (routeName === 'Search') {
                    iconName = 'search'
                    return focused ? <SearchIconFilledOne style={{ strokeWidth: 0, stroke: "#000000" }} width={31} height={31} />
                        : <SearchIconOne style={{ strokeWidth: 0, stroke: "#000000" }} width={31} height={31} />
                } else if (routeName === 'AddMedia') {
                    iconName = 'plus-square'
                    return <AddIcon style={{ strokeWidth: 3.5, stroke: "#000000" }} fill={focused ? 'black' : 'transparent'} width={40} height={40} />
                } else if (routeName === 'Notifications') {
                    iconName = 'heart'
                    return focused ? <HeartIconFilledOne style={{ strokeWidth: 1, stroke: "#000000" }} width={30} height={30} />
                        : <HeartIconOne style={{ strokeWidth: 4, stroke: "#000000" }} width={30} height={30} />

                } else if (routeName === 'Profile') {
                    iconName = 'user'
                    return <UserIcon style={{ strokeWidth: 3, stroke: "#000000" }} fill={focused ? 'black' : 'transparent'} width={45} height={45} />
                }
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={28} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            tabStyle: { margin: 0, padding: 0, height: 60 },
            // style: { backgroundColor: 'white', height: 50, padding: 0, margin: 0 },
        }
    }
)

const newBottomNav = createStackNavigator({
    bottomNav: {
        screen: BottomTabNavigation
    },
    posts: {
        screen: PostStack,
        navigationOptions: {

        }
    }
})

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