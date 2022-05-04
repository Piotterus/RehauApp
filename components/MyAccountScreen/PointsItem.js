import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class PointsItem extends React.Component {

    render() {
        if (this.props.name !== "") {
            return (
                <View style={styles.pointsView}>
                    <Text style={styles.pointsText}>{this.props.name}</Text>
                    <Text style={styles.pointsValue}>{this.props.points} {this.props.pointsType}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.pointsView}>
                    <Text style={styles.pointsText}/>
                    <Text style={styles.pointsValue}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    pointsView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderColor: '#4E4E4E',
        borderBottomWidth: 1,
        marginTop: 30,
    },
    pointsText: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 3
    },
    pointsValue: {
        color: '#37A48B',
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'
    }
});

