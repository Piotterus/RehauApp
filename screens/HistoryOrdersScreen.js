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
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import HistoryStrip from '../components/HistoryScreen/HistoryStrip';
import HistoryCodeItem from '../components/HistoryScreen/HistoryCodeItem';
import HistoryOrderItem from '../components/HistoryScreen/HistoryOrderItem';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class HistoryOrdersScreen extends React.Component {
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

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    createHistoryOrdersList() {
        let historyOrdersList = [];
        for (let i in this.state.orders) {
                historyOrdersList.push(
                    <HistoryOrderItem key={2*i} max={this.state.orders.length} lp={i} data={this.state.orders[i]} navigation={this.props.navigation}/>,
                );
                historyOrdersList.push(
                    <View key={2*i+1} style={{borderWidth: 0.5, borderColor: '#4E4E4E', width: '100%'}}/>,
                );
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
                    <HeaderImage image="PrizeCategory"/>
                    <View style={styles.historyCategoryView}>
                        <Text style={styles.historyHeaderText}>Moja historia</Text>
                        <HistoryStrip text="Moje zamówienia"/>
                        <View style={styles.historyListView}>
                            <View style={styles.historyListRow}>
                                <Text style={[styles.historyListText, {flex: 1}]}>Lp.</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Data złożenia</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Status</Text>
                                <Text style={[styles.historyListText, {flex: 2, marginLeft: 3, marginRight: 3}]}/>
                            </View>
                            <View style={{borderWidth: 1, borderColor: '#4E4E4E', width: '100%'}}/>
                            {this.createHistoryOrdersList()}
                        </View>
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
    historyCategoryView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AAAAAABF',
        alignItems: 'center',
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
        paddingRight: 5
    },
    historyListText: {
        fontWeight: 'bold',
    },
    historyListRow: {
        flexDirection: 'row',
    }
});
