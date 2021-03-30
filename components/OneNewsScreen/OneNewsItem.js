import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';
import HTML from "react-native-render-html";

export default class OneNewsItem extends React.Component {

    render() {
        return(
            <View style={styles.newsView}>
                <Image source={{uri:this.props.data.imagemedium}} style={styles.newsImage} resizeMode='contain'/>
                <View style={styles.newsFrame}>
                    <Text style={styles.dateText}>{this.props.data.date} {this.props.data.category}</Text>
                    <Text style={styles.titleText}>{this.props.data.title}</Text>
                    <HTML style={styles.textText} source={{ html: this.props.data.fulltext}}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newsView: {
        alignItems: 'center'
    },
    newsImage: {
        width: '100%',
        height: 200,
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
    newsFrame: {
        width: '90%',
        borderColor: '#000000BF',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        marginTop: -40,
        backgroundColor: '#FFFFFF'
    }
});

