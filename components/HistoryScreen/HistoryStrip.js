import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HistoryStrip extends React.Component {

    render() {
        return(
            <View style={styles.historyStripView}>
                <Text style={styles.historyStripText}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    historyStripView: {
        backgroundColor: '#DC0060',
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyStripText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});

