import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class PrizeCategoryItem extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Prizes', {data: this.props.data})} style={styles.prizeCategoryView}>
                <Image source={{uri:this.props.data.image}} style={styles.prizeCategoryImage} resizeMode='cover'/>
                <View style={styles.prizeCategoryViewText}>
                    <Text style={[styles.prizeCategoryText, {fontWeight: 'bold'}]}>{this.props.data.name}</Text>
                    <Text style={styles.prizeCategoryText}>pkt</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    prizeCategoryView: {
        flexDirection: 'row',
        padding: 5,
        //width: 200,
        //backgroundColor: 'blue',
        height: 100,
        marginBottom: 5,
    },
    prizeCategoryImage: {
        width: '80%',
        height: 90,
        //backgroundColor: 'red'
    },
    prizeCategoryViewText: {
        width: '20%',
        backgroundColor: '#37a48b',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 3,
        height: 90,
    },
    prizeCategoryText: {
        color: '#FFFFFF',
        fontSize: 36,
    }
});

