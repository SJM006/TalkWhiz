import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../../../components';
import NavigationStrings from '../../../constants/NavigationStrings';
import { setItem } from '../../../AsyncStorage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);

    const loginUser = () => {
        setLoaderVisible(true);
        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                setLoaderVisible(false);
                if (res.docs !== null) {
                    //console.log(res.docs[0].data());
                    goToNext(
                        res.docs[0].data().name,
                        res.docs[0].data().email,
                        res.docs[0].data().userId,
                    );
                } else {
                    Alert.alert('User Not Found!');
                }
            })
            .catch(err => {
                setLoaderVisible(false);
                console.log(err);
                Alert.alert('User Not Found!');
            });
    };
    const goToNext = async (name, email, userId) => {
        await setItem('NAME', name);
        await setItem('EMAIL', email);
        await setItem('USERID', userId);
        navigation.replace(NavigationStrings.APPSTACK);
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginVertical: moderateScale(80),
                        marginHorizontal: moderateScale(20),
                        borderWidth: moderateScale(2),
                        borderRadius: moderateScale(10),
                        gap: moderateScale(70),
                    }}>
                    <Text
                        style={{
                            marginLeft: moderateScale(10),
                            fontSize: 45,
                            fontWeight: '400',
                            color: 'black',
                            alignSelf: 'flex-start',
                        }}>
                        Log In
                    </Text>

                    <View
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            gap: moderateScale(20),
                        }}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'black'}
                            value={email}
                            onChangeText={txt => {
                                setEmail(txt);
                            }}
                            style={{
                                fontSize: moderateScale(20),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: 10,
                            }}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'black'}
                            value={password}
                            onChangeText={txt => {
                                setPassword(txt);
                            }}
                            style={{
                                fontSize: moderateScale(20),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: 10,
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, gap: moderateScale(10) }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                loginUser();
                            }}
                            style={{
                                backgroundColor: 'royalblue',
                                paddingVertical: moderateScale(10),
                                paddingHorizontal: moderateScale(75),
                                borderRadius: moderateScale(10),
                            }}>
                            <Text style={{ color: 'white', fontSize: moderateScale(20) }}>
                                LOG IN
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                gap: moderateScale(10),
                                justifyContent: 'center',
                            }}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>or</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(NavigationStrings.SIGNUP);
                                }}>
                                <Text style={{ fontSize: 20, color: 'royalblue' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <Loader visible={loaderVisible} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
