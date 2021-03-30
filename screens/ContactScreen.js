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
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import PointsItem from '../components/MyAccountScreen/PointsItem';
import Divider from '../components/allScreen/Divider';

export default class ContactScreen extends React.Component {
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
                        <Text style={styles.contactHeaderText}>Kontakt</Text>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            <View>
                                <Text style={styles.contactHeaderItemText}>Biuro Obsługi Klienta</Text>
                                <Text style={styles.contactItemText}>MPL Verbum SA</Text>
                                <Text style={styles.contactItemText}>ul. Szelągowska 45 A</Text>
                                <Text style={styles.contactItemText}>61-626 Poznań</Text>
                                <Text style={styles.contactItemText}>Infolinia: 61 8250 785 (wew. 10)</Text>
                                <Text style={styles.contactItemText}>email: info@instalujkorzysci.pl</Text>
                            </View>
                            <View style={{marginTop: 50}}>
                                <Text style={styles.contactHeaderItemText}>REHAU Sp. z o.o.</Text>
                                <Text style={styles.contactItemText}>Baranowo, ul. Poznańska 1 A</Text>
                                <Text style={styles.contactItemText}>62-081 Przeźmierowo k. Poznania</Text>
                                <Text style={styles.contactItemText}>tel.: +48 61 84 98 400</Text>
                                <Text style={styles.contactItemText}>faks: +48 61 84 98 401</Text>
                            </View>
                            <TouchableOpacity
                                style={{marginTop: 50}}
                                onPress={() => Linking.openURL('https://www.instalujkorzysci.pl/program/lista-hurtowni-api') }
                            >
                                <Text style={styles.contactHeaderItemText}>Sprawdź gdzie kupisz produkty REHAU</Text>
                                <Image source={require('../images/contactMap.png')} style={styles.contactImageMap} resizeMode='contain'/>
                            </TouchableOpacity>
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
