import { Image, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import imagePaths from '../../../constants/imagePaths'

const Profile = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFDAAF',
                width: Dimensions.get('window').width - 5,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                shadowColor: "#000",
                shadowOpacity: .1,
                shadowRadius: 15,
                elevation: 24,

            }}>

                <Image source={imagePaths.USER} style={{
                    height: 152,
                    width: 152,
                    borderColor: '#ED820E',
                    borderWidth: 8,
                    borderRadius: 152 / 2,
                }} />

            </View>
            <View style={{
                flex: 2,
                width: Dimensions.get('window').width,

            }}>
            </View>
        </View >
    )
}

export default Profile