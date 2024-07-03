import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationStrings from '../constants/NavigationStrings';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useEffect, useState } from 'react';




const Stack = createStackNavigator();

const MainNavigation = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkLogin
    }, [])

    const checkLogin = async () => {

        const userId = await getItem('USERID');
        if (userId) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLogin ?
                    <Stack.Screen name={NavigationStrings.AUTHSTACK} component={AuthStack} /> :
                    <Stack.Screen name={NavigationStrings.APPSTACK} component={AppStack} />
                }
            </Stack.Navigator>
        </NavigationContainer >

    );
}

export default MainNavigation