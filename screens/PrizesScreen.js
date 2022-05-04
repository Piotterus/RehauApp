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
import Divider from '../components/allScreen/Divider';
import PrizeItem from '../components/PrizesScreen/PrizeItem';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import PrizesMessageModal from '../components/PrizesScreen/PrizesMessageModal';

export default class PrizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            modalMessageVisible: false,
            modalMessage: '',
            modalType: '',
            isLoading: true,
            prizes: '',
            name: '',
            country: 'uk',
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

            if (this.props.route.params?.data) {
                this.setState({
                    prizes: this.props.route.params.data,
                    name: this.props.route.params.name,
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

    setModalMessageVisible = (visible) => {
        this.setState({ modalMessageVisible: visible });
    };

    sendNewOrder(code) {
        this.setState({
            isLoading: true,
        });
        console.log(code);
        let body = {
            order: [
                {
                    symbol: code,
                    quantity: 1,
                }
            ]
        };
        console.log(body);
        if (code === "") {
            this.setState({
                isLoading: false,
                error: {
                    code: "BŁĄD",
                    message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                }
            }, () => this.setModalErrorVisible(true));
            return;
        }
        const queryString = this.objToQueryString({
            session: this.props.token,
        });
        let url = `${this.props.apiUrl}/orderAdd2?${queryString}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.data;
                console.log(responseJson);
                if (responseJson.error.code === 0) {
                    this.setState({
                        modalMessage: responseJson.data,
                        modalType: 'success'
                    }, () => this.setModalMessageVisible(true))
                } else {
                    this.setState({
                        modalMessage: responseJson.error,
                        modalType: 'error'
                    }, () => this.setModalMessageVisible(true))
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
        this.setState({
            isLoading: false,
        });
    }

    createPrizesList() {
        let prizesList = [];
        for (let i in this.state?.prizes?.catalog) {
            prizesList.push(
                <PrizeItem
                    key={i}
                    max={this.state.prizes.catalog.length}
                    data={this.state.prizes.catalog[i]}
                    sendNewOrder={this.sendNewOrder.bind(this)}
                    navigation={this.props.navigation}
                />,
            );
        }
        return prizesList;
    }

    createItemsList() {
        let itemsList = []
        for (let i in this.state?.prizes) {
            itemsList.push({
                label: this.state.prizes[i].name + " pkt",
                value: this.state.prizes[i].name
            })
        }
        return itemsList;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <PrizesMessageModal visible={this.state.modalMessageVisible} message={this.state.modalMessage} type={this.state.modalType} setModalMessageVisible={this.setModalMessageVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <View style={styles.prizesView}>
                        <View style={styles.prizesHeaderView}>
                            <Text style={styles.prizesHeaderText}>{this.state.name}</Text>
                            {/*<DropDownPicker
                                items={this.createItemsList()}
                                defaultValue={this.state.name}
                                containerStyle={{height: 40, width: 100}}
                                style={{backgroundColor: '#FFFFFF', zIndex: 1}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa', zIndex: 1}}
                                onChangeItem={item => this.setState({
                                    name: item.value
                                })}
                                placeholder=""
                                dropDownMaxHeight={500}
                            />*/}
                        </View>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%', zIndex: -1}}>
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
        borderColor: '#AAAAAABF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    prizesHeaderText: {
        color: '#4E4E4E',
        fontSize: 16,
    },
    prizesHeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',

    }
});
