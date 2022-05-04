import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class HistoryOrderItem extends React.Component {

    render() {
        return(
            <View style={styles.historyCodeView}>
                <Text style={[styles.historyListText, {flex: 2}]}>50525</Text>
                <Text style={[styles.historyListText, {flex: 3}]}>{this.props.data.dateadd}</Text>
                <Text style={[styles.historyListText, {flex: 3}]}>{this.props.data.status.name}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("HistoryOneOrder", {data: this.props.data}) } style={{flex: 2, backgroundColor: '#9B9B9B', borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 3}}>
                    <Text style={{color: '#FFFFFF'}}>INFO</Text>
                </TouchableOpacity>
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
        textAlign: 'center'
    }
});

