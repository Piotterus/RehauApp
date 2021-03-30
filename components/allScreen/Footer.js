import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, Linking} from 'react-native';

export default class Footer extends React.Component {

    render() {
        return(
            <TouchableOpacity
                style={styles.footerView}
                onPress={() => Linking.openURL('https://www.rehau.com/pl-pl') }
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../../icons/globe_icon.png')} style={{height: 20}} resizeMode='contain'/>
                    <Text style={{fontSize: 10}}>www.rehau.pl</Text>
                </View>
                <Image source={require('../../icons/arrow-right_icon.png')} style={{height: 20}} resizeMode='contain'/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    footerView: {
        backgroundColor: '#E1E1DE',
        height: 30,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
});

