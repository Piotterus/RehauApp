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

export default class BonusPromoOneProduct extends React.Component {

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
                    <View style={styles.productRowView}>
                        <View style={styles.productTextView}>
                            <Text style={styles.productText}>RE.FINE Pure</Text>
                            <Text style={styles.productText}>-półautomatyczny filtr z funkcją samoczynnego czyszczenia</Text>
                            <Text style={styles.productText}>-płukanie oraz czyszczenie szczotek w trakcie pracy</Text>
                            <Text style={styles.productText}>-bardzo duży przepływ</Text>
                            <Text style={styles.productText}>-kompaktowy i trwały</Text>
                            <Text style={styles.productText}>-ręczny wskaźnik wartości miesięcznych w celu przypomnienia o konserwacji</Text>
                            <Text style={styles.productText}>-dostępny w wersjach: ¾“, 1“ oraz 1 ¼“</Text>
                        </View>
                        <Image style={styles.productImage} source={require('../../images/ReFinePure.png')} resizeMode="contain"/>
                    </View>
                    <View style={styles.productRowView}>
                        <View style={styles.productTextView}>
                            <Text style={styles.productText}>RE.FINE Pro / Pro R</Text>
                            <Text style={styles.productText}>-półautomatyczny filtr z funkcją płukania wstecznego</Text>
                            <Text style={styles.productText}>-płukanie oraz czyszczenie szczotek w trakcie pracy</Text>
                            <Text style={styles.productText}>-bardzo duży przepływ</Text>
                            <Text style={styles.productText}>-ekonomiczny oraz wydajny</Text>
                            <Text style={styles.productText}>-ręczny wskaźnik wartości miesięcznych w celu przypomnienia o konserwacji</Text>
                            <Text style={styles.productText}>-dostępny w wersjach: ¾“, 1“ oraz 1 ¼“</Text>
                            <Text style={styles.productText}>-wersja Pro R zawiera wbudowany reduktor ciśnienia</Text>
                        </View>
                        <Image style={styles.productImage} source={require('../../images/ReFinePro.png')} resizeMode="contain"/>
                    </View>
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
    productRowView: {
        flexDirection: 'row'
    },
    productTextView: {
        backgroundColor: '#37A58C',
        flex: 3,
        padding: 5,
        marginTop: 15,
        marginBottom: 10
    },
    productText: {
        color: '#FFFFFF',
        fontSize: 12,
        paddingBottom: 5
    },
    productImage: {
        flex: 2,
        height: 200,
        alignSelf: 'center'
    }
});

