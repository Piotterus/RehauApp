import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderPage from '../components/allScreen/HeaderPage';
import NewsItem from '../components/NewsScreen/NewsItem';
import PrizeCategoryItem from '../components/PrizesCategoryScreen/PrizeCategoryItem';
import HeaderImage from '../components/allScreen/HeaderImage';
import Divider from '../components/allScreen/Divider';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';
import BonusPromoPrizeItem from '../components/BonusPromoPrizesScreen/BonusPromoPrizeItem';
import BonusPromoPrizePrzelew from '../components/BonusPromoPrizesScreen/BonusPromoPrizePrzelew';
import BonusPromoModalPrzelew from '../components/BonusPromoPrizesScreen/BonusPromoModalPrzelew';
import BonusPromoModalPrize from '../components/BonusPromoPrizesScreen/BonusPromoModalPrize';

export default class BonusPromoPrizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            prizes: '',
            modalPrzelewVisible: false,
            modalItemVisible: false,
            item: '',
            code: '',
            cardNumber: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            let url = `https://api.verbum.com.pl/${this.props.appId}/${this.props.token}`;

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
                            cardNumber: responseJson?.user?.card?.number,
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

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    setModalPrzelewVisible = (visible) => {
        this.setState({ modalPrzelewVisible: visible });
        if (visible) {

        }
    };

    setModalItemVisible = (visible, item, code) => {
        this.setState({
            modalItemVisible: visible,
            item: {
                text: item,
                code: code,
            }
        });
    };

    sendOrder(code,quantity) {
        console.log('order');
        this.setState({
            isLoading: true,
        },() => this.setModalItemVisible(false,'',''));
        let url = `https://api.verbum.com.pl/${this.props.appId}/${this.props.token}/orderCart`;

        let body = {
            order: [
                {
                    symbol: code,
                    quantity: quantity
                }
            ]
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    error: responseJson.error
                }, () => {
                    this.setModalErrorVisible(true)
                    this.setModalItemVisible(false,'','');
                })
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
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <BonusPromoModalPrzelew visible={this.state.modalPrzelewVisible} navigation={this.props.navigation} cardNumber={this.state.cardNumber} setModalPrzelewVisible={this.setModalPrzelewVisible.bind(this)}/>
                <BonusPromoModalPrize visible={this.state.modalItemVisible} item={this.state.item} setModalItemVisible={this.setModalItemVisible.bind(this)} order={this.sendOrder.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="BonusPromo"/>
                    <View style={styles.prizesCategoryView}>
                        <Text style={styles.prizesCategoryHeaderText}>Nagrody</Text>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            <BonusPromoPrizePrzelew setModalPrzelewVisible={this.setModalPrzelewVisible.bind(this)} code="REHAU2021_096"/>
                            <BonusPromoPrizeItem setModalItemVisible={this.setModalItemVisible.bind(this)} prize='mediaExpert' code="REHAU2021_097"/>
                            <BonusPromoPrizeItem setModalItemVisible={this.setModalItemVisible.bind(this)} prize='allegro' code="REHAU2021_098"/>
                            <BonusPromoPrizeItem setModalItemVisible={this.setModalItemVisible.bind(this)} prize='smyk'  code="REHAU2021_101"/>
                            <BonusPromoPrizeItem setModalItemVisible={this.setModalItemVisible.bind(this)} prize='decathlon'  code="REHAU2021_100"/>
                            <BonusPromoPrizeItem setModalItemVisible={this.setModalItemVisible.bind(this)} prize='rossmann'  code="REHAU2021_099"/>
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
    prizesCategoryView: {
        marginTop: -30,
        width: '90%',
        justifyContent: 'center',
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
    prizesCategoryHeaderText: {
        color: '#DC0060',
        fontSize: 20,
        alignSelf: 'center'
    },
});
