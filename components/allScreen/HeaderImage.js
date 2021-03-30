import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HeaderImage extends React.Component {

    render() {
        console.log(this.props.image)
        if (this.props.image === "RegisteredCode") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/RegisteredCode.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        } else if (this.props.image === "History") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/History.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        } else if (this.props.image === "Contact") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/Contact.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        } else if (this.props.image === "PrizeCategory") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/PrizeCategoryHeader.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        } else if (this.props.image === "MyAccount") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/MyAccount.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        } else {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../images/PrizeCategoryHeader.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({

});

