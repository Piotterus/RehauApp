import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';

export default class PointsItem extends React.Component {

    render() {
        if (this.props.name !== "") {
            return (
                <View style={styles.pointsView}>
                    <Text style={{color: '#DC0060', fontWeight: 'bold', fontSize: 14}}>{this.props.name}</Text>
                    <Text style={{color: '#37A48B', fontWeight: 'bold', fontSize: 16}}>{this.props.points} pkt</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.pointsView}>
                    <Text style={{color: '#DC0060', fontWeight: 'bold', fontSize: 14}}/>
                    <Text style={{color: '#37A48B', fontWeight: 'bold', fontSize: 16}}/>
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
    }
});

