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

export default class BonusPromoPrizesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: false,
            prizes: '',
        }
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
                    <HeaderImage image="PrizeCategory"/>
                    <View style={styles.prizesCategoryView}>
                        <Text style={styles.prizesCategoryHeaderText}>Nagrody</Text>
                        <Divider/>
                        <ScrollView style={{width: '100%', height: '100%'}}>
                            <BonusPromoPrizePrzelew/>
                            <BonusPromoPrizeItem prize='mediaExpert'/>
                            <BonusPromoPrizeItem prize='allegro'/>
                            <BonusPromoPrizeItem prize='smyk'/>
                            <BonusPromoPrizeItem prize='decathlon'/>
                            <BonusPromoPrizeItem prize='rossmann'/>
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
        color: '#4E4E4E',
        fontSize: 16,
    },
});
