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
import Activity from '../components/allScreen/Activity';
import BonusPromoBonusHeader from '../components/BonusPromoMyBonusesScreen/BonusPromoBonusHeader';
import BonusPromoBonusItem from '../components/BonusPromoMyBonusesScreen/BonusPromoBonusItem';

export default class BonusPromoMyBonusesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            loading: true,
            orders: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            let url = `https://api.verbum.com.pl/${this.props.appId}/${this.props.token}/history/orders`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(url);
                    console.log(responseJson.orders.orders[1].status);
                    if (responseJson.error.code === 0) {
                        if (responseJson.orders !== undefined) {
                            this.setState({
                                orders: responseJson?.orders?.orders,
                            }, () => this.setState({isLoading: false}))
                        } else {
                            this.setState({
                                orders: '',
                            }, () => this.setState({isLoading: false}))
                        }
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
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD ERROR:" + error
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

    createOrdersList() {
        let orderList = [];
        console.log(this.state.orders);
        for (let i in this.state.orders) {
            orderList.push(
                <BonusPromoBonusItem navigation={this.props.navigation} key={i} order={this.state.orders[i]}/>,
            );
        }
        return orderList;
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
                        <Text style={styles.contactHeaderText}>Moje faktury</Text>
                        <Divider/>
                        <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{width: '100%', height: '100%'}}>
                            <BonusPromoBonusHeader/>
                            {this.createOrdersList()}
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

});
