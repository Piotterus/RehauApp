import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoPrizePrzelew extends React.Component {

    render() {
        let tlo;
        let karta;
        let text;
        tlo = Images.przelew.tlo;
        karta = Images.przelew.karta;
        text = "Przelew na konto";
        return(
            <TouchableOpacity style={styles.prizeView} onPress={() => this.props.setModalPrzelewVisible(true)}>
                <ImageBackground
                    source={tlo}
                    resizeMode="contain"
                    style={styles.imageTlo}
                >
                    <Text style={styles.textTlo}>{text}</Text>
                    <Text style={styles.textAmount}>wartość: 50 pln</Text>
                </ImageBackground>

                <Image source={karta} resizeMode="contain" style={styles.imageKarta}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    prizeView: {
        //height: 100,
        marginBottom: 50,
    },
    imageTlo: {
        height: 120,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingTop: 40,
    },
    textTlo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    textAmount: {
        fontSize: 12,
        color: '#FFFFFF',
    },
    imageKarta: {
        position: 'absolute',
        height: '100%',
        width: '65%',
        bottom: -30,
        right: -15,
        //backgroundColor: 'red'
    }
});

