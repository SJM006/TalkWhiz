import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileNavs = ({ iconName, text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <View style={{ backgroundColor: '#ED7F0E', padding: 8, borderRadius: 25 }}>
                    <MaterialCommunityIcons name={iconName} size={20} color={'#FFFFFF'} />
                </View>
                <Text style={{ fontSize: 25 }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileNavs