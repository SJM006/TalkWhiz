import { FlatList, Text, View, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { moderateScale } from 'react-native-size-matters';
import { getItem } from '../../../AsyncStorage';


const Dashboard = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const iteratedData = []
        const userId = await getItem('USERID');
        firestore()
            .collection('users')
            .where('userId', '!=', userId)
            .get()
            .then(res => {
                if (res.docs != []) {
                    res.docs.map((item) => {
                        iteratedData.push(item.data())
                    })
                    setUser(iteratedData)
                }
            });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: Dimensions.get('window').width, height: moderateScale(50), backgroundColor: 'red', marginTop: moderateScale(0), marginBottom: moderateScale(10) }}>
                <View >
                    <Text>ChatNest</Text>
                </View>
            </View>
            <FlatList data={user}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <View style={{
                                marginBottom: moderateScale(10), padding: moderateScale(10), borderWidth: moderateScale(1), borderRadius: moderateScale(10),
                                marginHorizontal: 10
                            }}>
                                <Text>{item.name}</Text>
                            </View>
                        </>
                    )
                }} />
        </SafeAreaView>
    )
};

export default Dashboard;
