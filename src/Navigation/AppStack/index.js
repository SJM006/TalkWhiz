import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../../constants/NavigationStrings';
import { Dashboard, PersonalDetails, Profile } from '../../screens';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.PROFILE} component={Profile} />
            <Stack.Screen name={NavigationStrings.PERSONALDEAILS} component={PersonalDetails} />
            <Stack.Screen name={NavigationStrings.DASHBOARD} component={Dashboard} />
        </Stack.Navigator>
    )
}

export default AppStack