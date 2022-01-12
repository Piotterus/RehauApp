import React from 'react'
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoProductItem extends React.Component {

    render() {
        let headerReGuard = 'RE.GUARD';
        let textReGuard = 'Poznaj RE.GUARD, inteligentny zawór odcinający, który wykrywa pęknięcia rur oraz nawet najdrobniejsze nieszczelności, by w ten sposób zapobiegać większym stratom. RE.GUARD to instalacja wodociągowa pod stałą kontrolą.';
        let headerReFine = 'RE.FINE';
        let textReFine = 'Najcenniejszy surowiec na Ziemi to nie złoto, platyna czy ropa naftowa. To woda, która jest nam niezbędna do życia. Dlatego przedstawiamy filtry RE.FINE, usuwające nawet najdrobniejsze cząsteczki obce z wody pitnej i chroniące całą instalację.';
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
                {this.props.product === "ReGuard" &&
                <Image style={styles.headerImage} source={require('../../images/RE_GUARD-baner_1.png')}
                       resizeMode="cover"/>
                }
                {this.props.product === "ReFine" &&
                <Image style={styles.headerImage} source={require('../../images/RE_FINE-baner_1.png')}
                       resizeMode="cover"/>
                }
                <View style={styles.textView}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.textText}>{text}</Text>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('BonusPromoOneProduct', {product: this.props.product})}><Text style={styles.moreText}>Więcej {'>'}</Text></TouchableWithoutFeedback>
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
    },
    headerImage: {
        width: '100%',
        height: 150,
        alignSelf: 'center'
    }
});

