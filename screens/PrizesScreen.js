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
import PrizeItem from '../components/PrizesScreen/PrizeItem';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class PrizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            loading: true,
            prizes: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            if (this.props.route.params?.data) {
                this.setState({
                    prizes: this.props.route.params.data,
                    isLoading: false,
                })
            }

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

    sendNewOrder(code) {
        console.log(code);
        let body = {
            code: code,
        };
        let url = `http://api.verbum.com.pl/${this.props.appId}/${this.props.token}/order`;

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
                if (responseJson.orderedProducts.error.code === 0) {

                } else {
                    this.setState({
                        error: responseJson.orderedProducts.error
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
    }

    createPrizesList() {
        let prizesList = [];
        for (let i in this.state.prizes.catalog) {
            prizesList.push(
                <PrizeItem key={i} max={this.state.prizes.catalog.length} data={this.state.prizes.catalog[i]} sendNewOrder={this.sendNewOrder.bind(this)}/>,
            );
        }
        return prizesList;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <View style={styles.prizesView}>
                        <Text style={styles.prizesHeaderText}>Nagrody</Text>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            {this.createPrizesList()}
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
    prizesView: {
        marginTop: 30,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000000BF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    prizesHeaderText: {
        color: '#4E4E4E',
        fontSize: 20,
    },
});
