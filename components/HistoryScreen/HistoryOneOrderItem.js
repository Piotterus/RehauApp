import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HistoryOneOrderItem extends React.Component {

    render() {
        return(
            <View style={styles.historyCodeView}>
                <Text style={[styles.historyListText, {flex: 1}]}>{this.props.lp}</Text>
                <Text style={[styles.historyListText, {flex: 6}]}>{this.props.data.name}</Text>
                <Text style={[styles.historyListText, {flex: 2}]}>{this.props.data.quantity}</Text>
                <Text style={[styles.historyListText, {flex: 2}]}>{this.props.data.pricepoints}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    historyCodeView: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center'
    },
    historyListText: {
        fontSize: 12,
    }
});

