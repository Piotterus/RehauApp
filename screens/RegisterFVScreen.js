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

export default class RegisterFVScreen extends Component {
    constructor(props) {
        super(props);
        this.handleTorch = this.handleTorch.bind(this);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: false,
            torchOn: false,
        };
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {

        });
    }

    componentWillUnmount() {
        this.listenerFocus();
        this.listenerBlur();
    }

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

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.75, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.setState({
                isLoading: true,
            });
            this.sendImage(data)

        }
    };

    sendImage(data) {
        console.log("sended");
        console.log(data.uri);

        const queryString = this.objToQueryString({
            session: this.props.token,
        });

        let url = `${this.props.apiUrl}/invoiceAdd?${queryString}`;

        let body = {
            file_data: data.base64,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.data
                console.log(responseJson);
                if (responseJson.error.code === 0) {
                    this.setState({
                        isLoading: false,
                    }, () => this.props.navigation.navigate('RegisteredFV'));
                } else {
                    this.setState({
                        isLoading: false,
                        error: responseJson.error
                    }, () => this.setModalErrorVisible(true))
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: {
                        code: "BŁĄD",
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD ERROR:" + error
                    }
                }, () => this.setModalErrorVisible(true));
            });

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderPage title="Rejestracja FV" />
                    <View style={styles.container}>
                        {this.state.isLoading === false &&
                        <RNCamera
                            style={styles.preview}
                            flashMode={this.state.torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                            ref={cam => this.camera = cam}
                            captureAudio={false}
                            /*aspect={RNCamera.Constants.Aspect.fill}*/
                        >
                        </RNCamera>
                        }
                        {this.state.isLoading === false &&
                        <View style={styles.bottomOverlay}>
                            <TouchableOpacity onPress={() => this.handleTorch(this.state.torchOn)}>
                                <Image style={styles.cameraIcon} source={require('../icons/add.png')}/>
                                {/*<Image style={{height: 30, width: 30}} source={require('../icons/X-icon.png')}/>*/}
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.isLoading === false &&
                        <View style={{position: 'absolute', left: 0, right: 0, bottom: 40, alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)}>
                                <View style={styles.whiteCircle}>
                                    <View style={styles.redCircle}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.isLoading === true &&
                        <View style={{position: 'absolute', left: 0, right: 0, top: '35%', alignItems: 'center'}}>
                            <Text style={{color: '#4E4E4E'}}>Proszę czekać...</Text>
                        </View>
                        }
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
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    whiteCircle: {
        backgroundColor: '#FFFFFF25',
        height: 66,
        width: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redCircle: {
        backgroundColor: '#D50000',
        height: 54,
        width: 54,
        borderRadius: 27,

    },
    snapButtonView: {
        position: "absolute",
        bottom: 40,

    }
});
