import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class PasswordRemindScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            modalErrorVisible: false,
            isLoading: false,
        }
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    remind(phone) {

        this.setState({
            isLoading: true,
        });

        if (phone === '') {
            phone = '698049158';//'test';
        }

        let body = {
            form: phone,
            phone: phone,
        };

        let url = `${this.props.apiUrl}/passwordReminder`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(async responseJson => {
                responseJson = responseJson.data;
                console.log(responseJson);
                if (responseJson.error.code === 0) {
                    this.props.navigation.navigate('Login', {data: responseJson.data})
                    /*this.setState({
                        error: responseJson.data,
                        isLoading: false,
                    }, () => this.setModalErrorVisible(true))*/
                } else {
                    this.setState({
                        error: responseJson.error,
                        isLoading: false,
                    }, () => this.setModalErrorVisible(true))
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: {
                        code: "B????D",
                        message: "WYST??PI?? NIESPODZIEWANY B????D"
                    }
                }, () => this.setModalErrorVisible(true));
            });
        this.setState({
            isLoading: true,
        });
    }

    register() {

    }

    updateValue(text, field) {
        if (field === 'phone') {
            this.setState({
                phone: text,
            });
        }
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1, backgroundColor: '#0A3251'}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <Image
                        source={require('../images/rehau_splash_2022.jpg')}
                        style={styles.imageBackground}
                    />
                    <View style={styles.middleView}>
                        <View style={{marginTop: 200}}>
                            <Text style={styles.headerText}>Witaj.</Text>
                            <Text style={styles.headerText2}>
                                Zaloguj si?? do aplikacji za pomoc?? otrzymanych danych
                            </Text>
                            <View style={styles.loginView}>
                                <View>
                                    <TextInput
                                        placeholder="Telefon"
                                        placeholderTextColor="#4E4E4E88"
                                        textAlign="left"
                                        style={styles.textInput}
                                        onChangeText={(text) => this.updateValue(text, 'phone')}
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.remind(this.state.phone)} style={styles.loginButton}>
                                    <Text style={styles.loginText}>Przypomnij has??o</Text>
                                </TouchableOpacity>
                                <View style={styles.noAccountView}>
                                    <Text style={styles.noAccountText}/>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.registerButton}>
                                    <Text style={styles.registerText}>Wr???? do logowania</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerView}>
                        <Image
                            source={require('../images/rsz_1rsz_rehau_logo_new_svg-01.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.footerView}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={require('../icons/globe_icon.png')}
                                style={{height: 20}}
                                resizeMode="contain"
                            />
                            <Text style={{fontSize: 10}}>www.rehau.pl</Text>
                        </View>
                        <Image
                            source={require('../icons/arrow-right_icon.png')}
                            style={{height: 20}}
                            resizeMode="contain"
                        />
                    </View>
                    {this.state.isLoading &&
                    <Activity/>
                    }
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: Dimensions.get('window').width, //for full screen
    },
    headerView: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#FFFFFF',
        height: 150,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#E1E1DE',
        height: 30,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    middleView: {
        position: 'absolute',
        backgroundColor: '#1D1D1B80',
        top: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        paddingLeft: 30,
        paddingRight: 30,
    },
    logo: {
        //height: 100,
        width: 0.75 * Dimensions.get("window").width,
    },
    headerText: {
        color: '#DC0060',
        fontSize: 30,
    },
    headerText2: {
        color: '#DC0060',
        fontSize: 16,
    },
    loginView: {
        backgroundColor: '#EBEBEB',
        height: 300,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    textInput: {
        borderBottomColor: '#4E4E4E',
        borderBottomWidth: 1,
        //width: 200,
        width: Dimensions.get('window').width * 0.7,
        height: 40,
        color: '#4E4E4E',
        fontSize: 14
    },
    loginButton: {
        backgroundColor: '#37A48B',
        width: '85%',
        alignItems: 'center',
        height: 45,
        justifyContent: 'center',
        borderRadius: 25,
        shadowColor: '#000000', //'#00000080',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        marginBottom: 20,
    },
    loginText: {
        color: '#EBEBEB',
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#EBEBEB',
        width: '85%',
        alignItems: 'center',
        height: 45,
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 20,
        borderColor: '#37A48B',
        borderWidth: 1,
    },
    registerText: {
        color: '#4E4E4E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    remindView : {
        width: Dimensions.get('window').width * 0.7,
    },
    remindText: {
        textDecorationLine: 'underline',
        color: '#4E4E4E',
        fontSize: 12,
    },
    noAccountView: {
        width: Dimensions.get('window').width * 0.7,
    },
    noAccountText: {
        color: '#4E4E4E',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
