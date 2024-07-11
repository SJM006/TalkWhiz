import { Image, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import imagePaths from '../../../constants/imagePaths'
import { ProfileNavs } from '../../../components'
import NavigationStrings from '../../../constants/NavigationStrings'
import { removeItem } from '../../../AsyncStorage'

const Profile = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF'
        }}>
            < View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFDAAF',
                width: Dimensions.get('window').width - 5,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,

            }}>

                <Image source={imagePaths.USER} style={{
                    height: 152,
                    width: 152,
                    borderColor: '#ED820E',
                    borderWidth: 8,
                    borderRadius: 152 / 2,
                }} />

            </View >
            <View style={{
                flex: 2,
                width: Dimensions.get('window').width,
                paddingTop: 50,
                paddingLeft: 50,
                gap: 20
            }}>
                <ProfileNavs
                    iconName={'pencil'}
                    text={'Personal Details'}
                    onPress={() => { navigation.navigate(NavigationStrings.PERSONALDEAILS) }} />
                <ProfileNavs
                    iconName={'account'}
                    text={'Account'}
                    onPress={() => { removeItem('ISLOGIN'); navigation.replace(NavigationStrings.AUTHSTACK) }} />
            </View>
        </View >
    )
}

export default Profile