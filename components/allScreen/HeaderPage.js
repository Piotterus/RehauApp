import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HeaderPage extends React.Component {

    render() {
        if (this.props.title === "Rejestracja kodu") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../icons/register_fv.png')} style={{height: 30, width: 30}}
                           resizeMode='contain'/>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
            )
        } else if (this.props.title === "Aktualności") {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../icons/news_icon.png')} style={{height: 30, width: 30}}
                           resizeMode='contain'/>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.headerView}>
                    <Image source={require('../../icons/register_fv.png')} style={{height: 30, width: 30}}
                           resizeMode='contain'/>
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#F1F1F1',
        height: 40,
        width: Dimensions.get("window").width, //for full screen
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerText: {
        color: '#4E4E4E',
        paddingLeft: 10,
    }
});

