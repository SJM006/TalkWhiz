import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../constants/NavigationStrings';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useEffect, useState } from 'react';
import { getItem, removeItem } from '../AsyncStorage';




const Stack = createStackNavigator();

const MainNavigation = () => {
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        const isLogin = await getItem('ISLOGIN')
        setIsLogin(isLogin)
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                {/* {isLogin === null ? */}
                <Stack.Screen name={NavigationStrings.AUTHSTACK} component={AuthStack} />
                <Stack.Screen name={NavigationStrings.APPSTACK} component={AppStack} />
                {/* } */}
            </Stack.Navigator>
        </NavigationContainer >
    );
}

export default MainNavigation