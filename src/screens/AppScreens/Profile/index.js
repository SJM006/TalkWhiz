import { Image, Text, View, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import imagePaths from '../../../constants/imagePaths'
import { ProfileNavs } from '../../../components'
import NavigationStrings from '../../../constants/NavigationStrings'
import { getItem, removeItem } from '../../../AsyncStorage'
import firestore from '@react-native-firebase/firestore';

const Profile = ({ navigation }) => {
    const fetchData = async () => {
        const userId = await getItem('USERID')
        firestore()
            .collection('users')
            .where('userId', '==', userId)
            .get()
            .then(res => {
                console.log(res.docs[0]);
            })
    }
    fetchData()


    return (
        <View style={styles.main}>
            <View style={styles.headerContainer}>

                <Image source={imagePaths.USER} style={{
                    height: 152,
                    width: 152,
                    borderColor: '#ED820E',
                    borderWidth: 8,
                    borderRadius: 152 / 2,
                }} />

            </View >

            <View style={styles.navContainer}>
                <ProfileNavs
                    iconName={'pencil'}
                    text={'Personal Details'}
                    onPress={() => { navigation.navigate(NavigationStrings.PERSONALDEAILS) }} />
                <ProfileNavs
                    iconName={'account'}
                    text={'Account'}
                    onPress={() => { removeItem('USERID'); navigation.replace(NavigationStrings.AUTHSTACK) }} />
            </View>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    main: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFDAAF',
        width: Dimensions.get('window').width - 5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    navContainer: {
        flex: 2,
        width: Dimensions.get('window').width,
        paddingTop: 50,
        paddingLeft: 50,
        gap: 20
    }
})