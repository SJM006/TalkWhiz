
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../../constants/NavigationStrings';
import { Dashboard } from '../../screens';
import { Profile } from '../../screens/AppScreens';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.PROFILE} component={Profile} />
            <Stack.Screen name={NavigationStrings.DASHBOARD} component={Dashboard} />
        </Stack.Navigator>
    )
}

export default AppStack