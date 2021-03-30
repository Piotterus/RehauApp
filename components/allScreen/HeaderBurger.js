import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';

export default class HeaderBurger extends React.Component {

    render() {
        return(
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}
                                  style={{marginLeft: 20, marginBottom: 9}}>
                    <View style={{borderTopWidth: 1, borderTopColor: '#4E4E4E', width: 25, marginBottom: 9}}/>
                    <View style={{borderTopWidth: 1, borderTopColor: '#4E4E4E', width: 35, marginBottom: 9}}/>
                    <View style={{borderTopWidth: 1, borderTopColor: '#4E4E4E', width: 25, marginBottom: 9}}/>
                </TouchableOpacity>
                <Image source={require('../../images/rsz_1rsz_rehau_logo_new_svg-01.png')} resizeMode="contain" style={styles.logo}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: "#E5E5E5",
        height: 150,
        width: Dimensions.get("window").width, //for full screen
        flexDirection: 'row',
        paddingTop: 20,
    },
    logo: {
        marginTop: 10,
        width: Dimensions.get('window').width * 0.7,
    }
});

