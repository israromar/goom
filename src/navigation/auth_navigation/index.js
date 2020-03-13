import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Screens from '../../screens';

const AuthNavigator = createStackNavigator({
    SignIn: {
        screen: Screens.SignInScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    PhoneAuth: {
        screen: Screens.PhoneAuthScreen,
        navigationOptions: {
            title: 'Sign In with Phone Number',
            // headerShown: false,
        }
    },
    SignUp: {
        screen: Screens.SignUpScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    ResetPassword: {
        screen: Screens.ResetPasswordScreen,
        navigationOptions: {
            title: 'Reset Password',
            headerShown: false,
        }
    }
});

export default createAppContainer(AuthNavigator);