import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import NavigationStrings from '../../../constants/NavigationStrings';
import { Loader } from '../../../components';
import { setItem } from '../../../AsyncStorage';
import imagePaths from '../../../constants/imagePaths';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const userDetailCheck = () => {
        setLoaderVisible(true);
        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                setLoaderVisible(false);
                if (res.docs !== null) {
                    //console.log(res.docs[0].data());
                    if (password !== res.docs[0].data().password) {
                        setPasswordError('Incorrect Password');
                    } else {
                        goToNext(res.docs[0].data().userId);
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
            style={styles.main}>

            <View style={styles.headerContainer}>
                <Image
                    source={imagePaths.WHITE_APP_LOGO}
                    resizeMode="center"
                    style={styles.image}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 3 }}>
                <View>
                    <View style={styles.Container}>
                        <View style={styles.inputMain}>
                            <View>
                                <View style={styles.inputView}>
                                    <Ionicons
                                        name={'mail-outline'}
                                        size={scale(30)}
                                        color={'#AAAAAA'}
                                    />
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
                                <Text style={styles.errText}>{emailError ? emailError : null}</Text>
                            </View>

                            <View>
                                <View style={styles.inputView}>
                                    <Ionicons
                                        name={'key-outline'}
                                        size={scale(30)}
                                        color={'#AAAAAA'}
                                    />
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
                                <Text style={styles.errText}>{passwordError ? passwordError : null}</Text>
                                <View
                                    style={{
                                        marginLeft: scale(30),
                                        marginTop: verticalScale(8),
                                    }}>
                                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.buttonsView}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.loginView}
                                onPress={loginProcess}>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>

                            <View style={styles.registerView}>
                                <Text style={styles.registerText}>Don't have an account?</Text>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        navigation.navigate(NavigationStrings.SIGNUP);
                                    }}>
                                    <Text style={styles.registerNavButton}>REGISTER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Loader visible={loaderVisible} />
                </View>
            </KeyboardAvoidingView>

        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    main: {
        flex: scale(1),
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flex: scale(2),
        backgroundColor: '#ED820B',
        borderBottomLeftRadius: scale(24),
        borderBottomRightRadius: scale(24),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: verticalScale(150),
        width: scale(150),
    },
    Container: {
        bottom: verticalScale(50),
        backgroundColor: '#FFFFFF',
        marginHorizontal: scale(15),
        borderRadius: scale(30),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: scale(4),
            height: verticalScale(3),
        },
        shadowOpacity: scale(0.3),
        shadowRadius: scale(4.3),
        elevation: scale(13),
    },

    inputMain: {
        marginTop: verticalScale(50),
        gap: verticalScale(40),
        width: scale(280),
    },

    inputView: {
        flexDirection: 'row',
        gap: scale(20),
        paddingLeft: scale(30),
        paddingVertical: verticalScale(6),
        backgroundColor: '#EEEEEE',
        fontSize: scale(19),
        borderRadius: scale(150),
    },
    input: {
        padding: moderateScale(0),
        width: scale(250),
        color: '#000000',
    },
    forgotPassword: {
        color: '#999999',
        fontWeight: '800',
        fontStyle: 'italic',
    },
    buttonsView: {
        marginBottom: verticalScale(50),
        marginTop: verticalScale(50),
        gap: verticalScale(8),
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
        fontWeight: '500',
    },
    registerNavButton: {
        color: '#0000FFAA',
        fontWeight: '600',
    },
    errText: {
        color: '#FF0000',
        fontSize: scale(12),
        fontWeight: '500',
        marginTop: verticalScale(5),
        marginLeft: scale(15)
    }
});
