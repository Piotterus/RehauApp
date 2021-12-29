import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoPrizeItem extends React.Component {

    render() {
        let tlo;
        let karta;
        let text;
        if (this.props.prize === 'mediaExpert') {
            tlo = Images.mediaExpert.tlo;
            karta = Images.mediaExpert.karta;
            text = "Media Expert";
        } else if (this.props.prize === 'allegro') {
            tlo = Images.allegro.tlo;
            karta = Images.allegro.karta;
            text = "Allegro";
        } else if (this.props.prize === 'smyk') {
            tlo = Images.smyk.tlo;
            karta = Images.smyk.karta;
            text = "Smyk";
        } else if (this.props.prize === 'decathlon') {
            tlo = Images.decathlon.tlo;
            karta = Images.decathlon.karta;
            text = "Decathlon";
        } else if (this.props.prize === 'rossmann') {
            tlo = Images.rossmann.tlo;
            karta = Images.rossmann.karta;
            text = "Rossmann";
        }
        return(
            <View style={styles.prizeView}>
                <ImageBackground
                    source={tlo}
                    resizeMode="contain"
                    style={styles.imageTlo}
                >
                    <Text style={styles.textTlo}>Voucher do {text}</Text>
                </ImageBackground>
                <Text style={styles.textAmount}>50 pln</Text>
                <Image source={karta} resizeMode="contain" style={styles.imageKarta}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    prizeView: {
        //height: 100,
        marginBottom: 20,
    },
    imageTlo: {
        height: 60,
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    textTlo: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    textAmount: {
        fontSize: 12,
        paddingLeft: 10,
    },
    imageKarta: {
        position: 'absolute',
        height: '100%',
        width: '45%',
        top: 0,
        right: -10,
        //backgroundColor: 'red'
    }
});

