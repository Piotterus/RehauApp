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

export default class PrizesCategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            prizes: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            let url = `https://api.verbum.com.pl/${this.props.appId}/${this.props.token}/prizes`;

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
                            prizes: responseJson.prizes,
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
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD" + url + " ERROR:" + error
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

    createPrizesCategoryList() {
        let prizesCategoryList = [];
        for (let i in this.state.prizes) {
            prizesCategoryList.push(
                <PrizeCategoryItem navigation={this.props.navigation} key={i} max={this.state.prizes.length} data={this.state.prizes[i]} />,
            );
        }
        return prizesCategoryList;
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
                    <View style={styles.prizesCategoryView}>
                        <Text style={styles.prizesCategoryHeaderText}>Nagrody</Text>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            {this.createPrizesCategoryList()}
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
        borderColor: '#000000BF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    prizesCategoryHeaderText: {
        color: '#4E4E4E',
        fontSize: 20,
    },
});
