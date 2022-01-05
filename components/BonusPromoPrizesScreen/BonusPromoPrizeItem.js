import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoPrizeItem extends React.Component {

    render() {
        let tlo;
        let karta;
        let text;
        let code;
        if (this.props.prize === 'mediaExpert') {
            tlo = Images.mediaExpert.tlo;
            karta = Images.mediaExpert.karta;
            text = "Media Expert";
            code = "REHAU2021_097";
        } else if (this.props.prize === 'allegro') {
            tlo = Images.allegro.tlo;
            karta = Images.allegro.karta;
            text = "Allegro";
            code = "REHAU2021_098";
        } else if (this.props.prize === 'smyk') {
            tlo = Images.smyk.tlo;
            karta = Images.smyk.karta;
            text = "Smyk";
            code = "REHAU2021_101";
        } else if (this.props.prize === 'decathlon') {
            tlo = Images.decathlon.tlo;
            karta = Images.decathlon.karta;
            text = "Decathlon";
            code = "REHAU2021_100";
        } else if (this.props.prize === 'rossmann') {
            tlo = Images.rossmann.tlo;
            karta = Images.rossmann.karta;
            text = "Rossmann";
            code = "REHAU2021_099";
        }
        return(
            <TouchableOpacity style={styles.prizeView} onPress={() => this.props.setModalItemVisible(true, text, code)}>
                <ImageBackground
                    source={tlo}
                    resizeMode="cover"
                    style={styles.imageTlo}
                >
                    <Text style={styles.textTlo}>Voucher do {text}</Text>
                </ImageBackground>
                <Text style={styles.textAmount}>50 pln</Text>
                <Image source={karta} resizeMode="contain" style={styles.imageKarta}/>
            </TouchableOpacity>
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

