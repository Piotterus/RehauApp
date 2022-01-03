import React from 'react'
import {StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

export default class BonusPromoModalPrzelew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 50,
            bankAccount: '',
            error: '',
            modalErrorVisible: false,
            isLoading: false,
        }
    }

    updateValue(text, field) {
        if (field === 'bankAccount') {
            let nowString = this.state.bankAccount;
            let newString = text;
            nowString = nowString.replace(/\s/g,'');
            newString = newString.replace(/\s/g,'');

            if (newString.length <= 26) {
                if (newString.length % 4 === 2 && newString.length > nowString.length && newString.length < 26) {
                    text += ' ';
                }
                this.setState({
                    bankAccount: text,
                });
            }
        }
    }

    addValue() {
        this.setState({
            value: this.state.value + 50
        })
    }

    subtractValue() {
        if (this.state.value > 50) {
            this.setState({
                value: this.state.value - 50
            })
        }
    }

    render() {
        return (
            <Modal isVisible={this.props.visible}>
                <TouchableWithoutFeedback onPress={() => this.props.setModalPrzelewVisible(false)}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#FFFFFF', height: 300, width: '95%', padding: 5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10}}>
                            <Text style={{color: '#0E395A', fontSize: 14}}>Przelew</Text>
                            <View style={styles.setPrzelewView}>
                                <Icon onPress={() => this.subtractValue()} name="minus-circle" size={40} color="#cd390d"/>
                                <Text style={styles.textValue}>{this.state.value}</Text>
                                <Icon onPress={() => this.addValue()} name="plus-circle" size={40} color="#3a7917"/>
                            </View>
                            <TextInput
                                placeholder="Nr konta"
                                onChangeText={(text) => this.updateValue(text, 'bankAccount')}
                                keyboardType = 'numeric'
                                value={this.state.bankAccount}
                                style={styles.bankAccountText}
                            />
                            <View style={{width: '100%', alignItems: 'center', alignSelf: 'center'}}>
                                <View
                                    style={{
                                        height: 1,
                                        borderBottomColor: '#000000',
                                        borderBottomWidth: 1,
                                        width: '90%',
                                        backgroundColor: 'blue'
                                    }}
                                />
                                <TouchableOpacity style={{alignSelf: 'stretch'}} onPress={() => this.props.setModalPrzelewVisible(false)}>
                                    <Text style={{color: '#2592E6', alignSelf: 'center', paddingTop: 10}}>ZAMÓW</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    setPrzelewView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        justifyContent: 'space-around'
    },
    textValue: {
        fontSize: 20
    },
    bankAccountText: {
        fontSize: 16,
    }
});
