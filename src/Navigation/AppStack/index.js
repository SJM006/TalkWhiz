
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../../constants/NavigationStrings';
import { Dashboard } from '../../screens';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.DASHBOARD} component={Dashboard} />
        </Stack.Navigator>
    )
}

export default AppStack