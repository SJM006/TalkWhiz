import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../constants/NavigationStrings';
import AuthStack from './AuthStack';
import AppStack from './AppStack';



const Stack = createStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={NavigationStrings.AUTHSTACK} component={AuthStack} />
                <Stack.Screen name={NavigationStrings.APPSTACK} component={AppStack} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default MainNavigation