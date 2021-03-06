import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HistoryCodeItem extends React.Component {

    render() {
        return(
            <View style={styles.historyCodeView}>
                <Text style={[styles.historyListText, {flex: 1}]}>{this.props.lp}</Text>
                <Text style={[styles.historyListText, {flex: 3}]}>{this.props.data.title}</Text>
                <View style={{justifyContent: 'center', flex: 3,}}>
                    <Text style={[styles.historyListText, {alignSelf: 'flex-end'}]}>{this.props.data.active} PKT</Text>
                </View>
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

