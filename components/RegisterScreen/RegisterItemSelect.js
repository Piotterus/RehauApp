import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, TextInput, Platform} from 'react-native';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector'

export default class RegisterItemSelect extends React.Component {

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

        const data = [];
        for (let i in this.props.items) {
            data.push({
                key: this.props.items[i].id,
                label: this.props.items[i].name,
            })
        }

        let textValue = "";
        for (let i in data) {
            if (data[i].key === this.props.value) {
                textValue = data[i].label;
            }
        }
        return (
            <View style={styles.textInputView}>
                <ModalSelector
                    data={data}
                    initValue="wybierz"
                    //supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    cancelText="Anuluj"
                    onChange={(option)=>{ this.props.updateValue(option.key, fieldName)}}>

                    <TextInput
                        style={styles.textInput}
                        editable={false}
                        placeholder="wybierz"
                        value={textValue} />

                </ModalSelector>
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
        textAlign: 'center'
    },
    placeHolderText: {
        color: '#4E4E4E88',
        fontSize: 15,
    },
    textInputView: {
        alignItems: 'center',
    }
});

