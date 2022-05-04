import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';

export default class HeaderBack extends React.Component {

    render() {
        return(
            <View style={styles.headerView}>
                <TouchableOpacity style={{padding: 10}} onPress={() => this.props.navigation.goBack()}>
                    <Image source={require('../../icons/arrow-left_icon.png')} style={{height: 20, width: 20}} resizeMode='contain'/>
                </TouchableOpacity>
                <Image source={require('../../images/LogoHeaderBack2.png')} style={{height: 40, width: 130}} resizeMode='contain'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: "#E5E5E5",
        height: 50,
        width: Dimensions.get("window").width, //for full screen
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 10,
        alignItems: 'center'
    },
});

