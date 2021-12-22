import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native';

export default class RegisterItem extends React.Component {

    render() {
        let fieldName;
        switch (this.props.fieldName) {
            case 'firstName':
                fieldName = 'firstName';
                break;
            case 'lastName':
                fieldName = 'lastName';
                break;
            case 'phone':
                fieldName = 'phone';
                break;
            case 'email':
                fieldName = 'email';
                break;
            case 'address':
                fieldName = 'address';
                break;
            case 'postal':
                fieldName = 'postal';
                break;
            case 'city':
                fieldName = 'city';
                break;
            case 'nip':
                fieldName = 'nip';
                break;
            case 'workerCount':
                fieldName = 'workerCount';
                break;
            case 'salesManager':
                fieldName = 'salesManager';
                break;
        }
        return (
            <View style={styles.textInputView}>
                <TextInput
                    textAlign="center"
                    style={styles.textInput}
                    onChangeText={(text) => this.props.updateValue(text, fieldName)}
                    autoCapitalize="none"
                />
                <Text style={styles.placeHolderText}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomColor: '#4E4E4E88',
        borderBottomWidth: 1,
        //width: 200,
        width: Dimensions.get('window').width * 0.7,
        height: 40,
        color: '#4E4E4E',
        fontSize: 14
    },
    placeHolderText: {
        color: '#4E4E4E88',
        fontSize: 15,
    },
    textInputView: {
        alignItems: 'center',
    }
});

