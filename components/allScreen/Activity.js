import React from 'react'
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';

export default class Activity extends React.Component {

    render() {

        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='#0A3251'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A3A3A3',
        opacity: 0.25
    }
});
