import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class NewsItem extends React.Component {

    render() {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OneNews', {data: this.props.data})}
                style={styles.newsView}>
                <Image source={{uri:this.props.data.imagesmall}} style={styles.newsImage} resizeMode='contain'/>
                <Text style={styles.dateText}>{this.props.data.date} {this.props.data.category}</Text>
                <Text style={styles.titleText}>{this.props.data.title}</Text>
                <Text style={styles.textText}></Text>
                <View style={styles.dividerView}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    newsView :{
        width: '90%',
        alignSelf: 'center'
    },
    newsImage: {
        width: '100%',
        height: 150,
        alignSelf: 'center',
    },
    dateText: {
        color: '#37A48B',
        fontSize: 12,
    },
    titleText: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textText: {
        fontSize: 12,
    },
    dividerView: {
        width: '100%',
        borderColor: '#4e4e4e',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    }
});

