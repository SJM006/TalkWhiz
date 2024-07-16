import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileNavs = ({ iconName, text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8}>
            <View style={styles.container}>
                <View style={styles.iconView}>
                    <MaterialCommunityIcons name={iconName} size={20} color={'#FFFFFF'} />
                </View>
                <Text style={{ fontSize: 25 }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileNavs
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    iconView: {
        backgroundColor: '#ED7F0E',
        padding: 8,
        borderRadius: 25
    }
})