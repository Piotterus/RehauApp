import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class Divider extends React.Component {

    render() {
        return(
            <View style={styles.divider}/>
        )
    }
}

const styles = StyleSheet.create({
    divider: {
        borderColor: '#DC0060',
        width: '100%',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center'
    },
});

