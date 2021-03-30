import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HistoryCodeItem extends React.Component {

    render() {
        return(
            <View style={styles.historyCodeView}>
                <Text style={[styles.historyListText, {flex: 1}]}>{this.props.data.lp}</Text>
                <Text style={[styles.historyListText, {flex: 2}]}>{this.props.data.code}</Text>
                <View style={{justifyContent: 'center', flex: 2,}}>
                    <Text style={[styles.historyListText, {alignSelf: 'flex-end'}]}>{this.props.data.points} PKT</Text>
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

    }
});

