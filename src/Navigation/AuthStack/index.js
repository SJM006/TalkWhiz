
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../../constants/NavigationStrings';
import { Login, SignUp } from '../../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.LOGIN} component={Login} />
            <Stack.Screen name={NavigationStrings.SIGNUP} component={SignUp} />
        </Stack.Navigator>
    );
}

export default AuthStack