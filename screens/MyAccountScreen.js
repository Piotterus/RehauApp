import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator
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
            loading: true,
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

            let url = `http://api.verbum.com.pl/${this.props.appId}/${this.props.token}/points`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error.code === 0) {
                        this.setState({
                            pointsActive: responseJson.points.active,
                            pointsUsed: responseJson.points.used,
                            pointsForUse: responseJson.points.foruse,
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
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD" + url
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
                            <Text style={{color: '#4E4E4E', fontSize: 16, fontWeight: 'bold'}}>Witaj</Text>
                            <Text style={{color: '#4E4E4E', fontSize: 20, fontWeight: 'bold'}}>{this.props.fullName}</Text>
                        </View>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            <PointsItem name="Punkty zebrane" points={this.state.pointsActive}/>
                            <PointsItem name="Punkty wykorzystane" points={this.state.pointsUsed}/>
                            <PointsItem name="Pozostało na koncie" points={this.state.pointsForUse}/>
                            <PointsItem name="" points=""/>
                            <PointsItem name="" points=""/>
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
        borderColor: '#000000BF',
        padding: 10,
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: 20
    },
    myAccountHeaderText: {
        color: '#4E4E4E',
        fontSize: 20,
        alignSelf: 'center'
    },
    myAccountWelcomeView: {
        marginTop: 30,
    }
});
