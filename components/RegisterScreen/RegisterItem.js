import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native';

export default class RegisterItem extends React.Component {

    render() {
        let fieldName;
        let maxLength;
        let capitalize = 'sentences';
        switch (this.props.fieldName) {
            case 'firstName':
                fieldName = 'firstName';
                break;
            case 'lastName':
                fieldName = 'lastName';
                break;
            case 'phone':
                fieldName = 'phone';
                capitalize = 'none';
                maxLength = 11;
                break;
            case 'email':
                fieldName = 'email';
                capitalize = 'none';
                break;
            case 'firmName':
                fieldName = 'firmName';
                break;
            case 'address':
                fieldName = 'address';
                break;
            case 'postal':
                fieldName = 'postal';
                capitalize = 'none';
                maxLength = 6;
                break;
            case 'city':
                fieldName = 'city';
                break;
            case 'nip':
                fieldName = 'nip';
                capitalize = 'none';
                maxLength = 10;
                break;
            case 'workerCount':
                fieldName = 'workerCount';
                capitalize = 'none';
                break;
            case 'salesManager':
                fieldName = 'salesManager';
                break;
        }
        return (
            <View style={styles.textInputView}>
                <TextInput
                    //textAlign="center"
                    style={styles.textInput}
                    onChangeText={(text) => this.props.updateValue(text, fieldName)}
                    autoCapitalize={capitalize}
                    keyboardType={this.props.keyboardType}
                    maxLength={maxLength > 0 ? maxLength : null}
                    value={this.props.value}
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
        fontSize: 14,
        //textAlign: 'center'
    },
    placeHolderText: {
        color: '#4E4E4E88',
        fontSize: 15,
    },
    textInputView: {
        alignItems: 'center',
    }
});

