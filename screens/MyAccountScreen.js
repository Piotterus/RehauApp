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

export default class MyAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            pointsActive: '',
            pointsUsed: '',
            pointsForUse: '',
            value: '',
            isLoading: true,
            info: '',
        }
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            const queryString = this.objToQueryString({
                session: this.props.token,
            });

            let url = `${this.props.apiUrl}/points?${queryString}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    responseJson = responseJson.data;
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        this.setState({
                            pointsActive: responseJson.points.active,
                            pointsUsed: responseJson.points.used,
                            pointsForUse: responseJson.points.foruse,
                            value: responseJson.value.active,
                            info: responseJson.value.info,
                        }, () => this.setState({isLoading: false}))
                    } else {
                        this.setState({
                            isLoading: false,
                            error: responseJson.error
                        }, () => this.setModalErrorVisible(true))
                    }
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false,
                        error: {
                            code: "BŁĄD",
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                        }
                    }, () => this.setModalErrorVisible(true));
                });
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                isLoading: true,
            })
        });
    }

    componentWillUnmount() {
        this.listenerFocus();
        this.listenerBlur();
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="MyAccount"/>
                    <View style={styles.myAccountView}>
                        <Text style={styles.myAccountHeaderText}>Moje konto</Text>
                        <Divider/>
                        <View style={styles.myAccountWelcomeView}>
                            <Text style={{color: '#4E4E4E', fontSize: 14, fontWeight: 'bold'}}>Witaj</Text>
                            <Text style={{color: '#4E4E4E', fontSize: 16, fontWeight: 'bold'}}>{this.props.fullName}</Text>
                        </View>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            {this.state.info !== '' && this.state.info?.id !== 0 &&
                                <Text style={styles.myAccountExtraText}>{this.state.info.message}</Text>
                            }
                            <PointsItem name="Łączna wartość produktów REHAU na zarejestrowanych fakturach:" points={this.state.value} pointsType="pln"/>
                            <PointsItem name="Przyznane punkty (5000 PLN = 1 PKT):" points={this.state.pointsActive} pointsType="pkt"/>
                            <PointsItem name="Wykorzystane punkty:" points={this.state.pointsUsed} pointsType="pkt"/>
                            <PointsItem name="Pozostało do wykorzystania:" points={this.state.pointsForUse} pointsType="pkt"/>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('History')} style={styles.myAccountButton}>
                                <Text style={styles.myAccountButtonText}>Moja historia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PrizesCategory')} style={styles.myAccountButton}>
                                <Text style={styles.myAccountButtonText}>Nagrody</Text>
                            </TouchableOpacity>
                        </ScrollView>
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
    myAccountView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AAAAAABF',
        padding: 10,
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: 20
    },
    myAccountHeaderText: {
        color: '#4E4E4E',
        fontSize: 16,
        alignSelf: 'center'
    },
    myAccountWelcomeView: {
        marginTop: 30,
    },
    myAccountButton: {
        backgroundColor: '#37A48B',
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        borderRadius: 25,
        shadowColor: '#000000', //'#00000080',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        marginTop: 30,
    },
    myAccountButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    myAccountExtraText: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 12,
    }
});
