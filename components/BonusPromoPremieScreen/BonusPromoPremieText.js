import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoPremieText extends React.Component {

    render() {

        return(
            <View style={styles.premiaView}>
                <Text style={styles.premiaText}>{this.props.text}</Text>
                <Text style={styles.amountText}>{this.props.amount} pln</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    premiaView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
    },
    amountText: {
        color: '#DC0060',
        fontSize: 18,
        fontWeight: 'bold',
    },
    premiaText: {
        color: '#4E4E4E',
    }
});

