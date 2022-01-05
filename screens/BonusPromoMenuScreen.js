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

export default class BonusPromoMenuScreen extends React.Component {
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
                    <HeaderImage image="BonusPromo"/>
                    <View style={styles.contactView}>
                        <Text style={styles.contactHeaderText}>WŁĄCZ SOBIE BONUS</Text>
                        <Divider/>
                        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%', height: '100%'}}>
                            <BonusPromoMenu backgroundColor='red' text='Zarejestruj FV' navigation={this.props.navigation} navigateTo='BonusPromoRegisterFV'/>
                            <BonusPromoMenu text='O promocji' navigation={this.props.navigation} navigateTo='BonusPromoAbout'/>
                            <BonusPromoMenu text='Nagrody' navigation={this.props.navigation} navigateTo='BonusPromoPrizes'/>
                            <BonusPromoMenu text='Moje premie' navigation={this.props.navigation} navigateTo='BonusPromoPremie'/>
                            <BonusPromoMenu text='O produktach' navigation={this.props.navigation} navigateTo='BonusPromoProducts'/>
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
        color: '#DC0060',
        fontSize: 20,
        alignSelf: 'center'
    },
    contactHeaderItemText: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15,
    },
    contactItemText: {
        color: '#4E4E4E',
        fontSize: 12,
    },
    contactImageMap: {
        width: '70%',
        height: 200,
    }
});
