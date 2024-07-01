import {
    ActivityIndicator,
    Dimensions,
    Modal,
    View,
} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';

const Loader = ({ visible }) => {
    return (
        <Modal visible={visible} transparent>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,.2)',
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                }}>
                <ActivityIndicator
                    size={'large'}
                    color={'#FFFFFF'}
                    style={{

                        padding: moderateScale(5),
                        borderRadius: moderateScale(76 / 2),
                    }}
                />
            </View>
        </Modal>
    );
};

export default Loader;
