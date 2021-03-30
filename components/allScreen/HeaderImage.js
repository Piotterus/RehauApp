import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HeaderImage extends React.Component {

    render() {
        return(
            <View style={styles.headerView}>
                <Image source={require('../../images/PrizeCategoryHeader.png')} style={{width: '100%', height: 150}} resizeMode='cover'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

