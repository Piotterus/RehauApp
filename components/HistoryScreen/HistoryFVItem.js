import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, ImageBackground, Text, Linking} from 'react-native';
import Icons from '../../icons/icons';

export default class HistoryFVItem extends React.Component {

    render() {
        let invoice = this.props.invoice;
        let status = '';
        if (invoice.status.id === '1') {
            status = 'zaakceptowana';
        } else if (invoice.status.id === '3') {
            status = 'odrzucona';
        } else {
            status = 'oczekujaca';
        }
        return(
            <View style={styles.FVView}>
                <View style={styles.FVDataView}>
                    <Text style={styles.fvTitleText}>{invoice.title}</Text>
                    <Text style={styles.fvDateText}>{invoice.dateadd}</Text>
                </View>
                <View style={styles.fvImageView}>
                    {/*<TouchableOpacity onPress={() => Linking.openURL(invoice.files[1].urlOriginal)}>
                        <Image source={Icons.fv.plik} style={styles.fvImage} resizeMode="contain"/>
                    </TouchableOpacity>*/}
                </View>
                <View style={styles.fvImageView}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    FVView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
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

