import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native';

export default class BonusPromoMenu extends React.Component {

    render() {
        if (this.props.backgroundColor === 'red') {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigateTo)} style={[styles.menuItem, styles.menuItemRed]}>
                    <Text style={[styles.menuText, styles.menuTextWhite]}>{this.props.text}</Text>
                    {/*<Image source={}/>*/}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigateTo)} style={[styles.menuItem, styles.menuItemWhite]}>
                    <Text style={[styles.menuText, styles.menuTextRed]}>{this.props.text}</Text>
                    {/*<Image source={}/>*/}
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    menuItem: {
        width: '95%',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 20,
    },
    menuItemRed: {
        backgroundColor: '#DC0060',
    },
    menuItemWhite: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    menuText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    menuTextWhite: {
        color: '#FFFFFF',
    },
    menuTextRed: {
        color: '#DC0060'
    }
});

