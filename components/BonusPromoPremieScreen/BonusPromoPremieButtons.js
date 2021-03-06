import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoPremieButtons extends React.Component {

    render() {

        return(
            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("BonusPromoRegisterFV")} style={styles.buttonView}><Text style={styles.buttonText}>Rejestruj fv</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("BonusPromoMyFV")} style={styles.buttonView}><Text style={styles.buttonText}>Moje faktury</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("BonusPromoMyBonuses")} style={styles.buttonView}><Text style={styles.buttonText}>Moje bonusy</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonsView: {
        flexDirection: 'row'
    },
    buttonView: {
        borderWidth: 1,
        borderColor: '#37A48B',
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        margin: 2,
    },
    buttonText: {
        color: '#4E4E4E',
        fontSize: 12,
    }
});

