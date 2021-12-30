import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Icons from '../../icons/icons';

export default class BonusPromoMyFVItem extends React.Component {

    render() {

        return(
            <View style={styles.FVView}>
                <View style={styles.FVDataView}>
                    <Text style={styles.fvTitleText}>FV 123/456/2022</Text>
                    <Text style={styles.fvDateText}>RRRR-MM-DD GG:MM:SS</Text>
                </View>
                <View style={styles.fvImageView}>
                    <Image source={Icons.fv.plik} style={styles.fvImage} resizeMode="contain"/>
                </View>
                <View style={styles.fvImageView}>
                    <Image source={Icons.fv.zaakceptowana} style={styles.fvImage} resizeMode="contain"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    FVView: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        height: 45,
    },
    FVDataView: {
        flex: 4,
    },
    fvImageView: {
        flex: 1,
        alignItems: 'center'
    },
    fvImage: {
        height: 25,
        width: 25,

    },
    fvTitleText: {
        color: '#4E4E4E',
    },
    fvDateText: {
        color: '#4E4E4E',
        fontSize: 11
    }
});

