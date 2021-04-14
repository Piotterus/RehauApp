import React from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';

export default class MessageModal extends React.Component {

    render() {
        let errorTitle = '';
        let errorMessage = '';
        errorTitle=this.props.message.code;
        errorMessage=this.props.message.message;
        if (this.props.message.code === 0) {
            return (
                <Modal isVisible={this.props.visible}>
                    <TouchableWithoutFeedback onPress={() => this.props.setModalMessageVisible(false)}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.modalView, styles.modalOK]}>
                                <Text style={{color: '#0E395A', fontSize: 16, fontWeight: 'bold'}}>Zamówienie</Text>
                                <Text style={{color: '#0E395A', fontSize: 12}}>produkt został zamówiony</Text>
                                <Text style={{color: '#0E395A', fontSize: 14}}>{errorMessage}</Text>
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
                                    <TouchableOpacity style={{alignSelf: 'stretch'}}
                                                      onPress={() => this.props.setModalMessageVisible(false)}>
                                        <Text style={{color: '#DC0060', alignSelf: 'center', paddingTop: 10}}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        } else {
            return (
                <Modal isVisible={this.props.visible}>
                    <TouchableWithoutFeedback onPress={() => this.props.setModalMessageVisible(false)}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.modalView, styles.modalError]}>
                                <Text style={{color: '#0E395A', fontSize: 16, fontWeight: 'bold'}}>Zamówienie błędne</Text>
                                <Text style={{color: '#0E395A', fontSize: 12}}>nie można zamówić produktu</Text>
                                <Text style={{color: '#0E395A', fontSize: 14, paddingRight: 10, paddingLeft: 10}}>{errorMessage}</Text>
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
                                    <TouchableOpacity style={{alignSelf: 'stretch'}}
                                                      onPress={() => this.props.setModalMessageVisible(false)}>
                                        <Text style={{color: '#DC0060', alignSelf: 'center', paddingTop: 10}}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )
        }
    }
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: '#FFFFFF',
        height: 140,
        width: '80%',
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalOK: {
        borderColor: '#22FF22',
        borderWidth: 2,
    },
    modalError: {
        borderColor: '#FF2222',
        borderWidth: 2,
    }
});
