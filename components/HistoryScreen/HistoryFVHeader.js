import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class HistoryFVHeader extends React.Component {

    render() {

        return(
            <View style={styles.FVView}>
                <View style={styles.FVDataView}>
                    <Text style={[styles.textSmall, styles.textBold]}>Numer FV</Text>
                    <Text style={styles.textSmall}>Data dodania</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.textSmall]}>Plik</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={[styles.textSmall]}>Status</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    FVView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#4E4E4E',
        paddingBottom: 5,
    },
    FVDataView: {
        flex: 4,
    },
    textView: {
        flex: 1,
        alignItems: 'center'
    },
    textSmall: {
        fontSize: 12,
        color: '#4E4E4E'
    },
    textBold: {
        fontWeight: 'bold'
    }
});

