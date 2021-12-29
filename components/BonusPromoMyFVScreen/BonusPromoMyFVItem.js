import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoMyFVItem extends React.Component {

    render() {

        return(
            <View style={styles.FVView}>
                <View style={styles.FVDataView}>
                    <Text style={styles.fvTitleText}>FV 123/456/2022</Text>
                    <Text style={styles.fvDateText}>RRRR-MM-DD GG:MM:SS</Text>
                </View>
                <Text style={styles.fvImage}>Plik</Text>
                <Text style={styles.fvImage}>Status</Text>
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
    fvImage: {
        flex: 1,
    },
    fvTitleText: {
        color: '#4E4E4E',
    },
    fvDateText: {
        color: '#4E4E4E',
        fontSize: 11
    }
});

