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
        const data = [
            {key: 900, label: "Artur Jakonis"},
            {key: 901, label: "Ireneusz Mojsiewicz"},
            {key: 902, label: "Krzysztof Twardy"},
            {key: 903, label: "Mariusz Kuleta"},
            {key: 904, label: "Michał Kot"},
            {key: 905, label: "Paweł Kowal"},
            {key: 906, label: "Piotr Bawolski"},
        ];
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
                {/*Platform.OS === 'android' &&
                <Picker
                    style={styles.textInput}
                    selectedValue={this.props.value}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.updateValue(itemValue, fieldName)
                    }>
                    <Picker.Item label="wybierz" value=""/>
                    <Picker.Item label="Artur Jakonis" value="900"/>
                    <Picker.Item label="Ireneusz Mojsiewicz" value="901"/>
                    <Picker.Item label="Krzysztof Twardy" value="902"/>
                    <Picker.Item label="Mariusz Kuleta" value="903"/>
                    <Picker.Item label="Michał Kot" value="904"/>
                    <Picker.Item label="Paweł Kowal" value="905"/>
                    <Picker.Item label="Piotr Bawolski" value="906"/>
                </Picker>
                */}
                {/*Platform.OS === 'ios' &&
                <PickerIOS
                    style={styles.textInput}
                    selectedValue={this.props.value}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.updateValue(itemValue, fieldName)
                    }>
                    <PickerIOS.Item label="wybierz" value=""/>
                    <PickerIOS.Item label="Artur Jakonis" value="900"/>
                    <PickerIOS.Item label="Ireneusz Mojsiewicz" value="901"/>
                    <PickerIOS.Item label="Krzysztof Twardy" value="902"/>
                    <PickerIOS.Item label="Mariusz Kuleta" value="903"/>
                    <PickerIOS.Item label="Michał Kot" value="904"/>
                    <PickerIOS.Item label="Paweł Kowal" value="905"/>
                    <PickerIOS.Item label="Piotr Bawolski" value="906"/>
                </PickerIOS>
                */}
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

