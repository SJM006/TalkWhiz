import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import NavigationStrings from '../../../constants/NavigationStrings';
import { setItem } from '../../../AsyncStorage';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const registerUser = () => {
        const userId = uuid.v4();
        firestore()
            .collection('users')
            .doc(userId)
            .set({ name: name, email: email, password: password, userId: userId })
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
                setItem('ISLOGIN', true);
                navigation.navigate(NavigationStrings.APPSTACK);

                // setName('');
                // setEmail('');
                // setPassword('');
                // setConfirmPass('');
            })


    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginVertical: moderateScale(75),
                        marginHorizontal: moderateScale(20),
                        borderWidth: moderateScale(2),
                        borderRadius: moderateScale(10),
                        gap: moderateScale(70),
                    }}>
                    <Text
                        style={{
                            margin: moderateScale(10),
                            fontSize: 45,
                            fontWeight: '400',
                            color: 'black',
                            alignSelf: 'flex-start',
                        }}>
                        Sign Up
                    </Text>

                    <View
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            gap: moderateScale(15),
                        }}>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={'black'}
                            value={name}
                            onChangeText={txt => {
                                setName(txt);
                            }}
                            style={{
                                fontSize: moderateScale(18),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: moderateScale(5),
                            }}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'black'}
                            value={email}
                            onChangeText={txt => {
                                setEmail(txt);
                            }}
                            style={{
                                fontSize: moderateScale(18),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: moderateScale(5),
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
                                fontSize: moderateScale(18),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: moderateScale(5),
                            }}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={'black'}
                            value={confirmPass}
                            onChangeText={txt => {
                                setConfirmPass(txt);
                            }}
                            style={{
                                fontSize: moderateScale(18),
                                paddingLeft: moderateScale(10),
                                borderBottomRightRadius: moderateScale(5),
                                borderRightWidth: moderateScale(1),
                                width: moderateScale(280),
                                borderBottomWidth: moderateScale(1),
                                paddingVertical: moderateScale(5),
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, gap: moderateScale(5) }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                registerUser();
                            }}
                            style={{
                                backgroundColor: 'royalblue',
                                paddingVertical: moderateScale(10),
                                paddingHorizontal: moderateScale(75),
                                borderRadius: moderateScale(10),
                            }}>
                            <Text style={{ color: 'white', fontSize: moderateScale(20) }}>
                                REGISTER
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
                                    navigation.goBack();
                                }}>
                                <Text style={{ fontSize: 20, color: 'royalblue' }}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;