import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoProductItem extends React.Component {

    render() {
        let headerReGuard = 'RE.GUARD';
        let textReGuard = 'RE.GUARD wykorzystuje nowoczesną technologię do ochrony domu poprzez minimalizowanie skutków zalania. Wyróżniony za design system niezawodnie odcina dopływ wody, zanim dojdzie do poważniejszych szkód.';
        let headerReFine = 'RE.FINE';
        let textReFine = 'Woda pitna jest naszym najważniejszym produktem spożywczym. Jej czystość jest koniecznym warunkiem dla zdrowia oraz dobrego samopoczucia. Filtry RE.FINE opracowane przez ekspertów REHAU usuwają nawet najmniejsze obce cząsteczki z wody pitneji dbają o jej całkowitą czystość. W tym samym czasie chronią również całą instalację.';
        let headerText;
        let text;
        if (this.props.product === 'ReGuard') {
            headerText = headerReGuard;
            text = textReGuard;
        } else if (this.props.product === 'ReFine') {
            headerText = headerReFine;
            text = textReFine;
        }
        return(
            <View style={styles.productView}>
                <View style={styles.placeholder}/>
                <View style={styles.textView}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.textText}>{text}</Text>
                    <Text style={styles.moreText}>Więcej {'>'}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    productView: {
        width: '100%',
        marginBottom: 30,
    },
    placeholder: {
        height: 100,
        backgroundColor: '#DC0060',
        width: '100%'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    moreText: {
        color: '#DC0060',
        marginTop: 10,
    },
    textView: {
        paddingTop: 5,
        paddingLeft: 10,
    }
});

