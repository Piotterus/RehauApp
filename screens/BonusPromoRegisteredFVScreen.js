import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import PointsItem from '../components/MyAccountScreen/PointsItem';
import Divider from '../components/allScreen/Divider';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class BonusPromoRegisteredFVScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: false,
            data: '',
        }
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    setGreetingsImage() {
        return <Image
            source={require('../icons/registered_code.png')}
            style={styles.registeredCodeImage}
            resizeMode="contain"
        />
    }

    setGreetingsHeaderText() {
        return <Text style={styles.registeredCodeGreetingsHeaderText}>Dziękujemy,</Text>
    }

    setGreetingsText() {
        return <Text style={styles.registeredCodeGreetingsText}>Twoja faktura została zarejestrowana!</Text>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <View style={styles.headerView}>
                        <Text style={styles.registeredCodeHeaderText}>Zarejestuj FV</Text>
                    </View>
                    <View style={styles.mainView}>
                        {this.setGreetingsImage()}
                        {this.setGreetingsHeaderText()}
                        {this.setGreetingsText()}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('BonusPromoMenu')}
                            style={styles.registeredCodeButton}
                        >
                            <Text style={styles.registeredCodeButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                    {this.state.isLoading &&
                    <Activity/>
                    }
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    registeredCodeView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AAAAAABF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    registeredCodeHeaderText: {
        color: '#4E4E4E',
        fontSize: 14,
    },
    registeredCodeImage: {
        height: 100,
        width: 100,
    },
    registeredCodeGreetingsHeaderText: {
        color: '#4E4E4E',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 20,
    },
    registeredCodeGreetingsText: {
        color: '#4E4E4E',
        fontSize: 16,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
        marginTop: 20,
    },
    registeredCodeButton: {
        position: 'absolute',
        backgroundColor: '#37A48B',
        width: '75%',
        borderRadius: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 60,
    },
    registeredCodeButtonText: {
        color: '#EBEBEB',
        fontWeight: 'bold',
        fontSize: 20,
    },
    registeredCodeGreetingsHeaderTextWrong: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    headerView: {
        height: 50,
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        justifyContent: 'center',
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,
        backgroundColor: '#FFFFFF'
    }
});
