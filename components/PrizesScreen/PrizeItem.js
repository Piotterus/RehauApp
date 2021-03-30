import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class PrizeItem extends React.Component {

    render() {
        return(
            <View style={styles.prizeCategoryView}>
                <Image source={{uri:this.props.data.imagemedium}} style={styles.prizeImage} resizeMode='contain'/>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.data.title} {this.props.data.symbol}</Text>
                <Text>{this.props.data.description}</Text>
                <TouchableOpacity onPress={() => this.props.sendNewOrder(this.props.data.symbol)} style={styles.prizeButton}>
                    <Text style={styles.prizeButtonText}>Zamów</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    prizeImage: {
        width: '100%',
        height: 300,
    },
    prizeButton: {
        backgroundColor: '#37a48b',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    prizeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

