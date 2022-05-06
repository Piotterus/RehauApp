import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';
import Icons from '../../icons/icons';

export default class HistoryOrderItem extends React.Component {

    render() {
        let order = this.props.data;
        let status = '';
        let number = order.title.replace('Zamówienie nr','')
        console.log(order.title);
        if (order.status.id === 'confirmed' || order.status.id === 'finished') {
            status = 'zaakceptowana';
        } else if (order.status.id === 'canceled' || order.status.id === 'cancelled') {
            status = 'odrzucona';
        } else {
            status = 'oczekujaca';
        }
        return(
            <View style={styles.historyCodeView}>
                <View style={{flex: 3}}>
                    <Text style={styles.historyListText}>{number}</Text>
                </View>
                <View style={{flex: 3}}>
                    <Text style={styles.historyListText}>{this.props.data.dateadd}</Text>
                </View>
                <View style={[styles.historyListText, {flex: 2, alignItems: 'center'}]}>
                    {status === 'zaakceptowana' &&
                    <Image source={Icons.fv.zaakceptowana} style={styles.fvImage} resizeMode="contain"/>
                    }
                    {status === 'oczekujaca' &&
                    <Image source={Icons.fv.oczekujaca} style={styles.fvImage} resizeMode="contain"/>
                    }
                    {status === 'odrzucona' &&
                    <Image source={Icons.fv.odrzucona} style={styles.fvImage} resizeMode="contain"/>
                    }
                </View>
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
        width: '100%',
        alignItems: 'center',
        height: 45,
    },
    historyListText: {
        fontSize: 12,
        textAlign: 'center'
    },
    fvImage: {
        height: 25,
        width: 25,
        alignSelf: 'center',
    }
});

