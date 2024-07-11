import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore';
import NavigationStrings from '../../../constants/NavigationStrings'
import { Loader } from '../../../components'
import { setItem } from '../../../AsyncStorage'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                    goToNext(res.docs[0].data().userId);
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
    const goToNext = async (userId) => {
        await setItem('USERID', userId);
        navigation.replace(NavigationStrings.APPSTACK);
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>


            <View style={styles.headerContainer}>
            </View>
            <KeyboardAvoidingView >
                <View style={styles.Container}>
                    <View style={styles.inputMain}>
                        <View style={styles.inputView}>
                            <Ionicons name={'mail-outline'} size={scale(30)} color={'#AAAAAA'} />
                            <TextInput
                                placeholder={'Enter your Email'}
                                style={styles.input}
                                placeholderTextColor={'#999999'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                autoCapitalize={false}
                                autoComplete={'false'}
                                autoFocus={false}
                                autoCorrect={false}
                            />
                        </View>

                        <View>
                            <View style={styles.inputView}>
                                <Ionicons name={'key-outline'} size={scale(30)} color={'#AAAAAA'} />
                                <TextInput
                                    placeholder={'Enter your Password'}
                                    style={styles.input}
                                    placeholderTextColor={'#999999'}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    autoCapitalize={false}
                                    autoComplete={'none'}
                                    autoFocus={false}
                                    autoCorrect={false}
                                />
                            </View>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity
                            activeOpacity={.9}
                            style={styles.loginView}
                            onPress={loginUser}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.registerView}>
                            <Text style={styles.registerText}>Don't have an account?</Text>
                            <TouchableOpacity
                                activeOpacity={.9}
                                onPress={() => {
                                    navigation.navigate(NavigationStrings.SIGNUP)
                                }}>

                                <Text style={styles.registerNavButton}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Loader visible={loaderVisible} />

            </KeyboardAvoidingView >
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    headerContainer: {
        flex: scale(1),
        backgroundColor: '#ED820B',
        borderBottomLeftRadius: scale(24),
        borderBottomRightRadius: scale(24),
    },

    Container: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: scale(20),
        borderRadius: scale(30),
        bottom: scale(60),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: scale(4),
            height: verticalScale(5),
        },
        shadowOpacity: scale(0.30),
        shadowRadius: scale(4.30),
        elevation: scale(13),
    },

    inputMain: {
        marginTop: verticalScale(70),
        width: scale(280),
        gap: verticalScale(30)
    },

    inputView: {
        flexDirection: 'row',
        gap: scale(20),
        paddingLeft: scale(30),
        paddingVertical: verticalScale(10),
        backgroundColor: '#EEEEEE',
        fontSize: scale(19),
        borderRadius: scale(150)
    },
    input: {
        padding: moderateScale(0),
        width: scale(250),
        color: '#000000'
    },
    forgotPassword: {
        marginLeft: scale(30),
        marginTop: verticalScale(10),
        color: '#999999',
        fontWeight: '800',
        fontStyle: 'italic',
    },
    loginView: {
        backgroundColor: '#ED820B',
        paddingHorizontal: scale(65),
        paddingVertical: verticalScale(12),
        alignItems: 'center',
        borderRadius: scale(30),
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: scale(20),
        fontWeight: '700',
    },
    buttonsView: {
        marginBottom: verticalScale(50),
        marginTop: verticalScale(50),
        gap: verticalScale(10)

    },
    registerView: {
        flexDirection: 'row',
        gap: scale(5),
    },
    registerText: {
        fontWeight: '500'
    },
    registerNavButton: {
        color: '#0000FFAA',
        fontWeight: '600'
    }
})