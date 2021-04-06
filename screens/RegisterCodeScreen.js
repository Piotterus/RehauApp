import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image, ScrollView,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import ErrorModal from '../components/allScreen/ErrorModal';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderPage from '../components/allScreen/HeaderPage';
import Footer from '../components/allScreen/Footer';
import Activity from '../components/allScreen/Activity';

export default class RegisterCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.handleTorch = this.handleTorch.bind(this);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: false,
            torchOn: false,
            barCode: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {
            this.setState({
                barCode: '',
            })

        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                barCode: '',
            })
        });
    }

    componentWillUnmount() {
        this.listenerFocus();
        this.listenerBlur();
    }

    onBarCodeRead = (e) => {
        if (this.state.barCode === '') {
            //Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
            this.setState({
                barCode: e.data,
            }, () => this.sendNewCode(this.state.barCode))
        }
    };

    handleTorch(value) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });}
    }

    sendNewCode(code) {
        console.log(code);
        let body = {
            code: code,
        };
        let url = `https://api.verbum.com.pl/${this.props.appId}/${this.props.token}/register/code`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.regItem.error.code === 0) {
                    this.props.navigation.navigate('RegisteredCode', {
                        data: responseJson.regItem
                    })
                } else {
                    this.props.navigation.navigate('RegisteredCode', {
                        data: responseJson.regItem
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: {
                        code: "BŁĄD",
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                    }
                }, () => this.setModalErrorVisible(true));
            });
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    render() {
        console.log(this.state.barCode);
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderPage title="Rejestracja kodu" />
                    <View style={styles.container}>
                        <RNCamera
                            style={styles.preview}
                            flashMode={this.state.torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                            onBarCodeRead={this.onBarCodeRead}
                            ref={cam => this.camera = cam}
                            captureAudio={false}
                            /*aspect={RNCamera.Constants.Aspect.fill}*/
                        >
                        </RNCamera>
                        <View style={styles.bottomOverlay}>
                            <TouchableOpacity onPress={() => this.handleTorch(this.state.torchOn)}>
                                <Image style={styles.cameraIcon} source={require('../icons/add.png')} />
                                {/*<Image style={{height: 30, width: 30}} source={require('../icons/X-icon.png')}/>*/}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Footer />
                    {this.state.isLoading &&
                    <Activity/>
                    }
                </SafeAreaView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    },bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"},});
