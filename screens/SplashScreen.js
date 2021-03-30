import React from 'react'

import {Image, StyleSheet, Dimensions, View, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#0A3251'}}>
                <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 0, right: 0, left: 0 }}>
                    <Image source={require('../images/rsz_splash_rehau.png')} style={styles.imageBackground}/>
                    <View style={styles.headerView}>
                        <Image source={require('../images/rsz_1rsz_rehau_logo_new_svg-01.png')} style={styles.logo}/>
                    </View>
                    <View style={styles.footerView}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../icons/globe_icon.png')} style={{height: 20}} resizeMode='contain'/>
                            <Text style={{fontSize: 10}}>www.rehau.pl</Text>
                        </View>
                        <Image source={require('../icons/arrow-right_icon.png')} style={{height: 20}} resizeMode='contain'/>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: Dimensions.get("window").width, //for full screen
    },
    headerView: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#FFFFFF',
        height: 150,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#E1E1DE',
        height: 30,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    logo: {
        //height: 100,
        //width: 0.8 * Dimensions.get("window").width,

    }
});
