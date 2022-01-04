import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Icons from '../../icons/icons';

export default class BonusPromoBonusItem extends React.Component {

    render() {
        let order = this.props.order;
        let status = '';
        if (order.status.id === '1') {
            status = 'zaakceptowana';
        } else if (order.status.id === '3') {
            status = 'odrzucona';
        } else {
            status = 'oczekujaca';
        }
        return(
            <View style={styles.FVView}>
                <View style={styles.FVDataView}>
                    <Text style={styles.fvTitleText}>{order.title}</Text>
                    <Text style={styles.fvDateText}>{order.dateadd}</Text>
                </View>
                <View style={styles.fvImageView}>
                    {status === 'zaakceptowana' &&
                    <Image source={Icons.order.zaakceptowane} style={styles.fvImage} resizeMode="contain"/>
                    }
                    {status === 'oczekujaca' &&
                    <Image source={Icons.order.oczekujace} style={styles.fvImage} resizeMode="contain"/>
                    }
                    {status === 'odrzucona' &&
                    <Image source={Icons.order.odrzucone} style={styles.fvImage} resizeMode="contain"/>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    FVView: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        height: 45,
    },
    FVDataView: {
        flex: 4,
    },
    fvImageView: {
        flex: 1,
        alignItems: 'center'
    },
    fvImage: {
        height: 25,
        width: 25,

    },
    fvTitleText: {
        color: '#4E4E4E',
    },
    fvDateText: {
        color: '#4E4E4E',
        fontSize: 11
    }
});

