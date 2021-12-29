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
import BonusPromoMenu from '../components/BonusPromoMenuScreen/BonusPromoMenu';
import BonusPromoPremieButtons from '../components/BonusPromoPremieScreen/BonusPromoPremieButtons';
import BonusPromoPremieText from '../components/BonusPromoPremieScreen/BonusPromoPremieText';
import PrizeCategoryItem from '../components/PrizesCategoryScreen/PrizeCategoryItem';
import BonusPromoMyFVItem from '../components/BonusPromoMyFVScreen/BonusPromoMyFVItem';
import BonusPromoMyFVHeader from '../components/BonusPromoMyFVScreen/BonusPromoMyFVHeader';

export default class BonusPromoMyFVScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    createFVList() {
        let fvs = [1,2,3,4,5,6,7,8,9,10];
        let fvList = [];
        for (let i in fvs) {
            fvList.push(
                <BonusPromoMyFVItem navigation={this.props.navigation} key={i}/>,
            );
        }
        return fvList;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="Contact"/>
                    <View style={styles.contactView}>
                        <Text style={styles.contactHeaderText}>Moje faktury</Text>
                        <Divider/>
                        <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={{width: '100%', height: '100%'}}>
                            <BonusPromoMyFVHeader/>
                            {this.createFVList()}
                        </ScrollView>
                    </View>
                    <Footer />
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
        color: '#4E4E4E',
        fontSize: 20,
        alignSelf: 'center'
    },

});
