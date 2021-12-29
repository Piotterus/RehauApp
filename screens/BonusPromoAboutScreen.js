import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
    TouchableWithoutFeedback
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import PointsItem from '../components/MyAccountScreen/PointsItem';
import Divider from '../components/allScreen/Divider';
import BonusPromoMenu from '../components/BonusPromoMenuScreen/BonusPromoMenu';

export default class BonusPromoAboutScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="Contact"/>
                    <View style={styles.contactView}>
                        <Text style={styles.contactHeaderText}>O promocji</Text>
                        <Divider/>
                        <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{width: '100%', height: '100%'}}>
                            <Text style={[styles.textPromo, styles.textBold, styles.textColorRed]}>WŁĄCZ SOBIE BONUS</Text>
                            <Text style={[styles.textPromo, styles.textBold]}>Wybierając produkty REHAU, podejmujesz dobrą decyzję. Ale czy wiesz, że tylko kilka kroków dzieli Cię od tego, by zyskać nie tylko wysoką jakość i innowacyjne urządzenie?</Text>
                            <Text style={[styles.textPromo, styles.textBold, styles.textColorRed, styles.textPromoBig]}>50 zł premii czeka na Ciebie!</Text>
                            <BonusPromoMenu backgroundColor='red' text='Zarejestruj FV' navigation={this.props.navigation} navigateTo='BonusPromoMenu'/>
                            <Text style={[styles.textPromo, styles.textBold]}>Zasady:</Text>
                            <Text style={[styles.textPromo]}>- Kup zawór RE.FINE lub RE.GUARD w terminie od 10.01.2021 do 31.12.2022 r.</Text>
                            <Text style={[styles.textPromo]}>- Zarejestruj fakturę za zakup produktu</Text>
                            <Text style={[styles.textPromo, styles.textMarginBottom]}>- Wybierz swój bonus!</Text>
                            <Text style={[styles.textPromo, styles.textBold, styles.textColorBlue]}>Uwaga</Text>
                            <Text style={[styles.textPromo, styles.textMarginBottom]}>Akcję kierujemy tylko do zarejestrowanych uczestników programu Instaluj Korzyści. Chcesz się cieszyć bonusem? Załóż konto, zajmie Ci to tylko kilka chwil i zapewni wiele możliwości do zysku!</Text>
                            <Text style={[styles.textPromo, styles.textBold]}>Bonus:</Text>
                            <Text style={[styles.textPromo]}>Ty kupiłeś, Ty wybierasz – zobacz jakie nagrody na Ciebie czekają:</Text>
                        </ScrollView>
                    </View>
                    <Footer />
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contactView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000BF',
        padding: 10,
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: 20
    },
    contactHeaderText: {
        color: '#4E4E4E',
        fontSize: 20,
        alignSelf: 'center'
    },
    textPromo: {
        fontSize: 14,
    },
    textBold: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textColorRed: {
        color: '#DC0060',
    },
    textPromoBig: {
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    textColorBlue: {
        color: '#37A48B'
    },
    textMarginBottom: {
        marginBottom: 20,
    }
});
