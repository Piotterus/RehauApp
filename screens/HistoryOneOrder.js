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
import HistoryOneOrderItem from '../components/HistoryScreen/HistoryOneOrderItem';

export default class HistoryOneOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            order: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            if (this.props.route.params?.data) {
                this.setState({
                    order: this.props.route.params.data,
                    isLoading: false
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

    createHistoryOrdersList() {
        let historyOrdersList = [];
        for (let i in this.state.order.positions) {
                historyOrdersList.push(
                    <HistoryOneOrderItem key={2*i} max={this.state.order.positions.length} lp={i} data={this.state.order.positions[i]}/>,
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
                    <HeaderImage image="History"/>
                    <View style={styles.historyCategoryView}>
                        <Text style={styles.historyHeaderText}>{this.state.order.title}</Text>
                        <View style={{borderWidth: 0.25, borderColor: '#DC0060', width: '95%', marginBottom: 15}}/>
                        <View style={styles.historyListView}>
                            <View style={styles.historyListRow}>
                                <Text style={[styles.historyListText, {flex: 1}]}>Lp.</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Nazwa</Text>
                                <Text style={[styles.historyListText, {flex: 3}]}>Ilość</Text>
                                <Text style={[styles.historyListText, {flex: 2}]}>Wartość</Text>
                            </View>
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
