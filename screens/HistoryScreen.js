import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderPage from '../components/allScreen/HeaderPage';
import NewsItem from '../components/NewsScreen/NewsItem';
import PrizeCategoryItem from '../components/PrizesCategoryScreen/PrizeCategoryItem';
import HeaderImage from '../components/allScreen/HeaderImage';
import HistoryStrip from '../components/HistoryScreen/HistoryStrip';
import HistoryCodeItem from '../components/HistoryScreen/HistoryCodeItem';
import HistoryOrderItem from '../components/HistoryScreen/HistoryOrderItem';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';
import HistoryFVHeader from '../components/HistoryScreen/HistoryFVHeader';
import HistoryFVItem from '../components/HistoryScreen/HistoryFVItem';
import HistoryFVItem2 from '../components/HistoryFVScreen/HistoryFVItem2';
import HistoryOrdersHeader from '../components/HistoryScreen/HistoryOrdersHeader';

export default class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            orders: '',
            invoicesList: '',
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

            let url = `${this.props.apiUrl}/invoicesList?${queryString}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log('FV calosc');
                    console.log(responseJson);
                    responseJson = responseJson.data;
                    console.log('FV odebrane');
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        console.log('FV bez błędu');
                        console.log(responseJson.error);
                        if (responseJson.invoice !== undefined) {
                            console.log('FV są');
                            console.log(responseJson.invoice);
                            this.setState({
                                invoicesList: responseJson?.invoice,
                            }, () => this.setState({isLoading: false}))
                        } else {
                            console.log('FV nie ma');
                            this.setState({
                                invoicesList: '',
                            }, () => this.setState({isLoading: false}))
                        }
                    } else {
                        console.log('FV z błędem');
                        console.log(responseJson.error);
                        this.setState({
                            isLoading: false,
                            error: responseJson.error
                        }, () => this.setModalErrorVisible(true))
                    }
                })
                .catch((error) => {
                    console.log('FV odebrane z bledem');
                    console.log(error);
                    this.setState({
                        isLoading: false,
                        error: {
                            code: "BŁĄD",
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD Faktury"
                        }
                    }, () => this.setModalErrorVisible(true));
                });

            url = `${this.props.apiUrl}/ordersList?${queryString}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log('Zamówienia calosc');
                    console.log(responseJson);
                    responseJson = responseJson.data;
                    console.log('Zamówienia odebrane');
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        console.log('Zamówienia bez błędu');
                        console.log(responseJson.error);
                        if (responseJson.orders !== undefined) {
                            console.log('Zamówienia są');
                            console.log(responseJson.orders);
                            this.setState({
                                orders: responseJson?.orders,
                            }, () => this.setState({isLoading: false}))
                        } else {
                            this.setState({
                                orders: '',
                            }, () => this.setState({isLoading: false}))
                        }
                    } else {
                        console.log('Zamówienia z błędem');
                        console.log(responseJson.error);
                        this.setState({
                            isLoading: false,
                            error: responseJson.error
                        }, () => this.setModalErrorVisible(true))
                    }
                })
                .catch((error) => {
                    console.log('Zamówienia odebrane z bledem');
                    console.log(error);
                    this.setState({
                        isLoading: false,
                        error: {
                            code: "BŁĄD",
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD Zamowienia"
                        }
                    }, () => this.setModalErrorVisible(true));
                });
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                isLoading: true,
                orders: '',
                invoicesList: '',
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

    createHistoryFVList() {
        let historyFVList = [];
        for (let i in this.state.invoicesList) {
            if (i < 3) {
                historyFVList.push(
                    <HistoryFVItem key={2*i} navigation={this.props.navigation} invoice={this.state.invoicesList[i]}/>,
                );
                historyFVList.push(
                    <View key={2*i+1} style={{borderWidth: 0.5, borderColor: '#4E4E4E', width: '100%'}}/>,
                );
            }
        }
        return historyFVList;
    }

    createHistoryOrdersList() {
        let historyOrdersList = [];
        for (let i in this.state.orders) {
            if (i < 3) {
                historyOrdersList.push(
                    <HistoryOrderItem key={2*i} lp={i} data={this.state.orders[i]} navigation={this.props.navigation}/>,
                );
                historyOrdersList.push(
                    <View key={2*i+1} style={{borderWidth: 0.5, borderColor: '#4E4E4E', width: '100%'}}/>,
                );
            }
        }
        return historyOrdersList;
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="History"/>
                    <ScrollView style={styles.historyCategoryView} contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={styles.historyHeaderText}>Moja historia</Text>
                        <HistoryStrip text="Moje zarejestrowane faktury"/>
                        <View style={styles.historyListView}>
                            {/*<View style={styles.historyListRow}>
                                <Text style={[styles.historyListText, {flex: 1}]}>Numer FV</Text>
                                <Text style={[styles.historyListText, {flex: 2}]}>Plik</Text>
                                <View style={{flex: 2}}>
                                    <Text style={[styles.historyListText, {alignSelf: 'flex-end'}]}>Status</Text>
                                </View>
                            </View>*/}
                            <HistoryFVHeader/>
                            {/*<View style={{borderWidth: 1, borderColor: '#4E4E4E', width: '100%'}}/>*/}
                            {this.createHistoryFVList()}
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("HistoryFV")} style={styles.historyButton}>
                            <Text style={styles.historyButtonText}>WIĘCEJ</Text>
                        </TouchableOpacity>
                        <HistoryStrip text="Moje zamówienia"/>
                        <View style={styles.historyListView}>
                            {/*<View style={styles.historyListRow}>
                                <Text style={[styles.historyListText, {flex: 1}]}>Lp.</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Data złożenia</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Status</Text>
                                <Text style={[styles.historyListText, {flex: 2, marginLeft: 3, marginRight: 3}]}/>
                            </View>
                            <View style={{borderWidth: 1, borderColor: '#4E4E4E', width: '100%'}}/>*/}
                            <HistoryOrdersHeader/>
                            {this.createHistoryOrdersList()}
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("HistoryOrders")} style={styles.historyButton}>
                            <Text style={styles.historyButtonText}>WIĘCEJ</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
    historyCategoryView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AAAAAABF',
        //alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    historyHeaderText: {
        color: '#4E4E4E',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    historyButton: {
        backgroundColor: '#37A48B',
        width: '70%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    historyButtonText: {
        color: '#EBEBEB',
        fontSize: 14,
        fontWeight: 'bold'
    },
    historyListView: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    historyListText: {
        fontWeight: 'bold',
    },
    historyListRow: {
        flexDirection: 'row',
    }
});
