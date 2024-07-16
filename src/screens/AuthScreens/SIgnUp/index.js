import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import NavigationStrings from '../../../constants/NavigationStrings';
import { setItem } from '../../../AsyncStorage';
import imagePaths from '../../../constants/imagePaths';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };

    const handleSubmit = () => {
        if (name.length === 0) {
            setNameError('*Field is required');
        } else {
            setNameError('');
        }

        if (email.length === 0) {
            setEmailError('*Field is required');
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email');
        } else {
            setEmailError('');
        }

        if (password.length === 0) {
            setPasswordError('*Field is required');
        } else if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lower case and a special character')
        } else {
            setPasswordError('');
        }

        if (confirmPass.length === 0) {
            setConfirmPassError('*Field is required');
        } else if (password !== confirmPass) {
            setConfirmPassError('Password and Confirm Password does not match');
        } else {
            setConfirmPassError('');
        }

        if (nameError === emailError === passwordError === confirmPassError === '') {
            return true
        }
    };

    const addUserInfo = () => {
        const userId = uuid.v4()
        firestore()
            .collection('users')
            .doc(userId)
            .set({
                name: name,
                email: email,
                password: password,
                userId: userId
            })
            .then(() => {
                console.log('user created');
            })
            .catch(err => {
                console.log('Error while creating user', err);
            })



        firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(res => {
                // console.log(res.docs[0].data());
                setItem('USERID', res.docs[0].data().userId);
                navigation.navigate(NavigationStrings.APPSTACK);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPass('');
            }).catch(err => { console.log(err) })

    }

    const registerUser = () => {
        if (handleSubmit() === true) {
            addUserInfo()
        }
    };

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
                                    <AntDesign name={'user'} size={scale(30)} color={'#AAAAAA'} />
                                    <TextInput
                                        placeholder={'Name'}
                                        style={styles.input}
                                        placeholderTextColor={'#999999'}
                                        value={name}
                                        onChangeText={text => setName(text)}
                                        autoCapitalize={false}
                                        autoComplete={'false'}
                                        autoFocus={false}
                                        autoCorrect={false}
                                    />
                                </View>
                                {nameError ? <Text style={styles.errText}>{nameError}</Text> : null}
                            </View>

                            <View>
                                <View style={styles.inputView}>
                                    <Ionicons name={'mail-outline'} size={scale(30)} color={'#AAAAAA'} />
                                    <TextInput
                                        placeholder={'Email'}
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
                                        placeholder={'Password'}
                                        style={styles.input}
                                        placeholderTextColor={'#999999'}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        autoCapitalize={false}
                                        autoComplete={'none'}
                                        autoFocus={false}
                                        autoCorrect={false}
                                        contextMenuHidden={true}
                                    />

                                </View>
                                {passwordError ? <Text style={styles.errText}>{passwordError}</Text> : null}
                            </View>

                            <View>
                                <View style={styles.inputView}>
                                    <MaterialCommunityIcons name={'shield-key-outline'} size={scale(28)} color={'#AAAAAA'} />
                                    <TextInput
                                        placeholder={'Confirm Password'}
                                        placeholderTextColor={'#999999'}
                                        style={styles.input}
                                        value={confirmPass}
                                        onChangeText={text => setConfirmPass(text)}
                                        autoCapitalize={false}
                                        autoComplete={'none'}
                                        autoFocus={false}
                                        autoCorrect={false}
                                        contextMenuHidden={true}
                                    />

                                </View>
                                {confirmPassError ? <Text style={styles.errText}>{confirmPassError}</Text> : null}
                            </View>
                        </View>

                        <View style={styles.buttonsView}>
                            <TouchableOpacity
                                activeOpacity={.9}
                                style={styles.registerView}
                                onPress={registerUser}
                            >
                                <Text style={styles.registerText}>Register</Text>
                            </TouchableOpacity>

                            <View style={styles.loginView}>
                                <Text style={styles.loginText}>Already have an account?</Text>
                                <TouchableOpacity
                                    activeOpacity={.9}
                                    onPress={() => {
                                        navigation.goBack()
                                    }}>

                                    <Text style={styles.loginNavButton}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View >
            </KeyboardAvoidingView>

        </KeyboardAvoidingView >
    )
};

export default SignUp;

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
        marginBottom: verticalScale(50)
    },
    Container: {
        bottom: scale(120),
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
        marginTop: verticalScale(25),
        gap: verticalScale(10),
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
        width: scale(220),
        height: verticalScale(25),
        color: '#000000',
        marginLeft: scale(15)
    },
    buttonsView: {
        marginBottom: verticalScale(50),
        marginTop: verticalScale(50),
        gap: verticalScale(8)

    },
    registerView: {
        backgroundColor: '#ED820B',
        paddingHorizontal: scale(65),
        paddingVertical: verticalScale(12),
        alignItems: 'center',
        borderRadius: scale(30),
    },
    registerText: {
        color: '#FFFFFF',
        fontSize: scale(20),
        fontWeight: '700',
    },

    loginView: {
        flexDirection: 'row',
        gap: scale(5),
        justifyContent: 'center'
    },
    loginText: {
        fontWeight: '500'
    },
    loginNavButton: {
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