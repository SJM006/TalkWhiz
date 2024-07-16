import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore';
import NavigationStrings from '../../../constants/NavigationStrings'
import { Loader } from '../../../components'
import { setItem } from '../../../AsyncStorage'
import imagePaths from '../../../constants/imagePaths';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [secureText, setSecureText] = useState(true);


    const userDetailCheck = () => {
        setLoaderVisible(true);
        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                const data = res.docs[0].data()
                setLoaderVisible(false);
                if (res.docs !== null) {
                    //console.log(res.docs[0].data());
                    if (password !== data.password) {
                        setPasswordError('Incorrect Password');
                    } else {
                        goToNext(data.userId);
                        setLoaderVisible(false);
                    }
                } else {
                    setEmailError('User Not Found!');
                }
            })
            .catch(err => {
                setLoaderVisible(false);
                console.log(err);
                setEmailError('User Not Found!');
            });

    };
    const goToNext = async userId => {
        await setItem('USERID', userId);
        navigation.replace(NavigationStrings.APPSTACK);
    };


    const validationProcess = () => {
        if (email === '') {
            setEmailError('Please enter the email');
        } else {
            setEmailError('');
        }

        if (password === '') {
            setPasswordError('Please enter the password');
        } else {
            setPasswordError('');
        }

        if (email !== '' && password !== '') {
            return true;
        }
    };

    const loginProcess = () => {
        if (validationProcess() === true) {
            userDetailCheck();
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main} >

            <View style={styles.headerContainer}>
                <Image
                    source={imagePaths.WHITE_APP_LOGO}
                    resizeMode='center'
                    style={styles.image} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 3 }} >
                <View >

                    <View style={styles.Container}>
                        <View style={styles.inputMain}>
                            <View>
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
                                {emailError ? <Text style={styles.errText}>{emailError}</Text> : null}
                            </View>

                            <View>
                                <View style={styles.inputView}>
                                    <Ionicons name={'key-outline'} size={scale(28)} color={'#AAAAAA'} />
                                    <TextInput
                                        placeholder={'Enter your Password'}
                                        style={[styles.input, { width: scale(160) }]}
                                        placeholderTextColor={'#999999'}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        autoCapitalize={false}
                                        autoComplete={'none'}
                                        autoFocus={false}
                                        autoCorrect={false}
                                        secureTextEntry={secureText}
                                    />
                                    <TouchableOpacity activeOpacity={.9} onPress={() => { setSecureText(!secureText) }}>
                                        <Ionicons
                                            name={secureText ? 'eye-off-outline' : 'eye-outline'}
                                            size={scale(20)}
                                            color={'#AAAAAA'}
                                            style={{ marginLeft: scale(25) }} />
                                    </TouchableOpacity>

                                </View>
                                {passwordError ? <Text style={styles.errText}>{passwordError}</Text> : null}
                                {/* <Text style={styles.forgotPassword}>Forgot Password?</Text> */}
                            </View>
                        </View>

                        <View style={styles.buttonsView}>
                            <TouchableOpacity
                                activeOpacity={.9}
                                style={styles.loginView}
                                onPress={loginProcess}
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

                </View >
            </KeyboardAvoidingView>

        </KeyboardAvoidingView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        flex: scale(1),
        backgroundColor: '#FFFFFF'
    },
    headerContainer: {
        flex: scale(2),
        backgroundColor: '#ED820B',
        borderBottomLeftRadius: scale(24),
        borderBottomRightRadius: scale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: verticalScale(150),
        width: scale(150),
    },
    Container: {
        bottom: scale(50),
        backgroundColor: '#FFFFFF',
        marginHorizontal: scale(15),
        borderRadius: scale(30),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: scale(4),
            height: verticalScale(3),
        },
        shadowOpacity: scale(0.30),
        shadowRadius: scale(4.30),
        elevation: scale(13),
    },

    inputMain: {
        marginTop: verticalScale(50),
        gap: verticalScale(40),
        width: scale(295),
    },

    inputView: {
        flexDirection: 'row',
        paddingLeft: scale(25),
        paddingVertical: verticalScale(6),
        backgroundColor: '#EEEEEE',
        fontSize: scale(19),
        borderRadius: scale(150),
        alignItems: 'center'
    },
    input: {
        padding: moderateScale(0),
        width: scale(250),
        color: '#000000',
        marginLeft: scale(15)
    },
    forgotPassword: {
        marginLeft: scale(30),
        marginTop: verticalScale(8),
        color: '#999999',
        fontWeight: '800',
        fontStyle: 'italic',
    },
    buttonsView: {
        marginBottom: verticalScale(50),
        marginTop: verticalScale(50),
        gap: verticalScale(8)

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
    },
    errText: {
        color: '#FF0000',
        fontSize: scale(11),
        fontWeight: '500',
        marginLeft: scale(15),
        marginTop: scale(8)
    }
})