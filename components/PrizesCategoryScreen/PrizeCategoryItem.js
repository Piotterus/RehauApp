import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class PrizeCategoryItem extends React.Component {

    render() {
        //console.log(this.props.name);
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Prizes', {data: this.props.data, name: this.props.name})} style={styles.prizeCategoryView}>
                <Image source={{uri:this.props.data?.image}} style={styles.prizeCategoryImage} resizeMode='cover'/>
                <View style={styles.prizeCategoryViewText}>
                    <Text style={[styles.prizeCategoryText, {fontWeight: 'bold'}]}>{this.props.data.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    prizeCategoryView: {
        padding: 5,
        //width: 200,
        //backgroundColor: 'blue',
        height: 140,
        marginBottom: 5,
    },
    prizeCategoryImage: {

        height: '80%',
        //backgroundColor: 'red'
    },
    prizeCategoryViewText: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DC0060',
        paddingBottom: 5,
        height: '20%',
        //backgroundColor: 'red'
    },
    prizeCategoryText: {
        color: '#DC0060',
        fontSize: 16,

    }
});

