import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback, Linking,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import PointsItem from '../components/MyAccountScreen/PointsItem';
import Divider from '../components/allScreen/Divider';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';
import RegisterItem from '../components/RegisterScreen/RegisterItem';
import RegisterItemSelect from '../components/RegisterScreen/RegisterItemSelect';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            firmName: '',
            address: '',
            postal: '',
            city: '',
            nip: '',
            workerCount: '',
            salesManager: '',
            agree1: false,
            agree2: false,
            agree3: false,
            distributorsList: '',
        }
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
            const queryString = this.objToQueryString({
                session: this.props.token,
            });

            let url = `${this.props.apiUrl}/distributorsList?${queryString}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    responseJson = responseJson.data;
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        this.setState({
                            distributorsList: responseJson.distributor,
                        }, () => this.setState({isLoading: false}))
                    } else {
                        this.props.navigation.navigate('Login', {data: responseJson.error});
                        /*this.setState({
                            isLoading: false,
                            error: responseJson.error
                        }, () => this.setModalErrorVisible(true))*/
                    }
                })
                .catch((error) => {
                    let errorCode = {
                        code: "BŁĄD",
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD ERROR"
                    };
                    this.props.navigation.navigate('Login', {data: errorCode});
                    /*this.setState({
                        isLoading: false,
                        error: {
                            code: "BŁĄD",
                            message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD ERROR:" + error
                        }
                    }, () => this.setModalErrorVisible(true));*/
                });
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                isLoading: false,
                image: '',
            })
        });
    }

    componentWillUnmount() {
        this.listenerFocus();
        this.listenerBlur();
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    updateValue(text, field) {
        console.log(text);
        console.log(field);
        if (field === 'firstName') {
            this.setState({
                firstName: text,
            });
        } else if (field === 'lastName') {
            this.setState({
                lastName: text,
            });
        } else if (field === 'phone') {
            this.setState({
                phone: text,
            });
        } else if (field === 'email') {
            this.setState({
                email: text,
            });
        } else if (field === 'firmName') {
            this.setState({
                firmName: text,
            });
        } else if (field === 'address') {
            this.setState({
                address: text,
            });
        } else if (field === 'postal') {
            let nowString = this.state.postal;
            let newString = text;

            if (newString.length === 2 && newString.length > nowString.length) {
                text += '-';
            }
            this.setState({
                postal: text,
            });
        } else if (field === 'city') {
            this.setState({
                city: text,
            });
        } else if (field === 'nip') {
            this.setState({
                nip: text,
            });
        } else if (field === 'workerCount') {
            this.setState({
                workerCount: text,
            });
        } else if (field === 'salesManager') {
            this.setState({
                salesManager: text,
            });
        }
    }

    setCheck(number, check) {
        if (number === 'agree1') {
            this.setState({
                agree1: check,
            })
        } else if (number === 'agree2') {
            this.setState({
                agree2: check,
            })
        } else if (number === 'agree3') {
            this.setState({
                agree3: check,
            })
        }
    }

    checkFields() {
        if (this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.phone !== "" &&
            this.state.email !== "" &&
            this.state.firmName !== "" &&
            this.state.postal !== "" &&
            this.state.address !== "" &&
            this.state.city !== "" &&
            this.state.nip !== "" &&
            this.state.workerCount !== "" &&
            this.state.salesManager !== "" &&
            this.state.agree1
        ) {
            return true;
        } else {
            return false;
        }
    }

    populateFields() {
        if (__DEV__) {
            this.setState({
                firstName: 'Piotr',
                lastName: 'Katański',
                phone: '737998243',
                email: 'piotter94@poczta.onet.pl',
                firmName: 'MPL Verbum',
                postal: '61-626',
                address: 'Szelągowska 45A',
                city: 'Poznań',
                nip: '7781226405',
                workerCount: '3',
                salesManager: '900',
                agree1: true,
                agree2: true,
                agree3: true,
            })
        }
    }

    async register() {
        await this.populateFields();
        if (this.checkFields()) {

            let url = `${this.props.apiUrl}/userRegister`;

            let agree1;
            let agree2;
            let agree3;
            if (this.state.agree1) {
                agree1 = 1;
            } else {
                agree1 = 0;
            }
            if (this.state.agree2) {
                agree2 = 1;
            } else {
                agree2 = 0;
            }
            if (this.state.agree3) {
                agree3 = 1;
            } else {
                agree3 = 0;
            }

            let body = {
                user_firstname: this.state.firstName,
                user_lastname: this.state.lastName,
                user_email: this.state.email,
                user_name: this.state.firmName,
                user_phone: this.state.phone,
                user_nip: this.state.nip,
                user_address_city: this.state.city,
                user_address_street: this.state.address,
                user_address_zipcode: this.state.postal,
                user_other1: this.state.workerCount,
                user_account: this.state.salesManager,
                regulations: {
                    1: agree1,
                    3: agree2,
                    4: agree3,
                }
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
                    responseJson = responseJson.data;
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        this.props.navigation.navigate('Login', {data: responseJson.data});
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
        } else {
            this.setState({
                isLoading: false,
                error: {
                    code: "BŁĄD",
                    message: "Proszę wypełnij wszystkie pola:"
                }
            }, () => this.setModalErrorVisible(true));
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="Register"/>
                    <View style={styles.myAccountView}>
                        <ScrollView style={{width: '90%', height: '100%'}} contentContainerStyle={styles.registerForm}>
                            <Text style={styles.myAccountHeaderText}>Przystąp do programu</Text>
                            <Divider/>
                            <Text style={styles.registerHeaderText}>Wypełnij poprawnie poniższy formualrz i dołącz do Instaluj Korzyści.</Text>
                            <Text style={styles.registerHeaderText}>Zapraszamy!</Text>
                            <RegisterItem text='Imię' updateValue={this.updateValue.bind(this)} value={this.state.firstName} fieldName='firstName' keyboardType='default'/>
                            <RegisterItem text='Nazwisko' updateValue={this.updateValue.bind(this)} value={this.state.lastName} fieldName='lastName' keyboardType='default'/>
                            <RegisterItem text='Telefon' updateValue={this.updateValue.bind(this)} value={this.state.phone} fieldName='phone' keyboardType='numeric'/>
                            <RegisterItem text='Adres e-mail' updateValue={this.updateValue.bind(this)} value={this.state.email} fieldName='email' keyboardType='email-address'/>
                            <RegisterItem text='Nazwa firmy' updateValue={this.updateValue.bind(this)} value={this.state.firmName} fieldName='firmName' keyboardType='email-address'/>
                            <RegisterItem text='Adres' updateValue={this.updateValue.bind(this)} value={this.state.address} fieldName='address' keyboardType='default'/>
                            <RegisterItem text='Kod pocztowy' updateValue={this.updateValue.bind(this)} value={this.state.postal} fieldName='postal' keyboardType='numeric'/>
                            <RegisterItem text='Miejscowość' updateValue={this.updateValue.bind(this)} value={this.state.city} fieldName='city' keyboardType='default'/>
                            <RegisterItem text='NIP' updateValue={this.updateValue.bind(this)} value={this.state.nip} fieldName='nip' keyboardType='numeric'/>
                            <RegisterItem text='Ilość pracowników' updateValue={this.updateValue.bind(this)} value={this.state.workerCount} fieldName='workerCount' keyboardType='numeric'/>
                            {/*<RegisterItem text='Menadżer sprzedaży' updateValue={this.updateValue.bind(this)} fieldName='salesManager'/>*/}
                            <RegisterItemSelect text='Menadżer sprzedaży' value={this.state.salesManager} updateValue={this.updateValue.bind(this)} fieldName='salesManager' items={this.state.distributorsList}/>
                            <CheckBox
                                title='Zapoznałam/łem się z&nbsp;Regulaminem Promocji „Promocja Rehau&nbsp;–&nbsp;Instaluj korzyści”, który dostępny jest na www.instalujkorzysci.pl, i&nbsp;go akceptuję.'
                                checked={this.state.agree1}
                                onPress={() => this.setCheck('agree1',!this.state.agree1)}
                                containerStyle={styles.checkBoxView}
                                textStyle={styles.checkBoxText}
                            />
                            <TouchableWithoutFeedback onPress={() => Linking.openURL(`${this.props.baseUrl}/files/regulamin.pdf`)} style={styles.registerFooterText}>
                                <Text style={styles.registerFooterText}>REGULAMIN</Text>
                            </TouchableWithoutFeedback>
                            <CheckBox
                                title='Wyrażam zgodę na przekazywanie treści marketingowych za pośrednictwem moich urządzeń telekomunikacyjnych, w&nbsp;szczególności takich jak laptop, telefon czy smartfon, zgodnie z&nbsp;art. 172 ust. 1 ustawy z&nbsp;dnia 16 lipca 2004 r. Prawo telekomunikacyjne.'
                                checked={this.state.agree2}
                                onPress={() => this.setCheck('agree2',!this.state.agree2)}
                                containerStyle={styles.checkBoxView}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Wyrażam zgodę na otrzymywanie informacji handlowej od REHAU sp. z&nbsp;o.o., zgodnie z&nbsp;art. 10 ustawy z&nbsp;dnia 18 lipca 2002 r. o&nbsp;świadczeniu usług drogą elektroniczną.'
                                checked={this.state.agree3}
                                onPress={() => this.setCheck('agree3',!this.state.agree3)}
                                containerStyle={styles.checkBoxView}
                                textStyle={styles.checkBoxText}
                            />
                            <Text style={styles.registerFooterText}>Klauzula informacyjna:</Text>
                            <Text style={styles.registerFooterText}>Warunkiem ważności udzielonej zgody jest zaznaczenie obu powyższych zgód. Rozumiem, że nie mam obowiązku podania moich danych osobowych a moje powyższe zgody są dobrowolne i nie muszę ich udzielać, przy czym w przypadku ich nieudzielenia bądź późniejszego wycofania, jak również przesłania wniosku o zmianę lub usunięcie moich danych, stracę możliwość otrzymywania treści marketingowych (w tym newsletterów i ofert) z REHAU.</Text>
                            {/*<Text style={styles.registerFooterText}>Rozumiem, że nie mam obowiązku podania moich danych osobowych a moje powyższe zgody są dobrowolne i nie muszę ich udzielać, przy czym w przypadku ich nieudzielenia bądź późniejszego wycofania, jak również przesłania wniosku o zmianę lub usunięcie moich danych, stracę możliwość uczestnictwa w Promocji.</Text>
                            <Text style={[styles.registerFooterText, {alignSelf: 'flex-start'}]}>Wszystkie pola są obowiązkowe!</Text>*/}
                            <TouchableOpacity onPress={() => this.register()} style={styles.registerButton}>
                                <Text style={styles.registerText}>Zapisz się</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <Footer />
                    {this.state.isLoading &&
                    <Activity/>
                    }
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    myAccountView: {
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#AAAAAABF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginBottom: 20
    },
    myAccountHeaderText: {
        color: '#4E4E4E',
        fontSize: 16,
        alignSelf: 'center'
    },
    myAccountWelcomeView: {
        marginTop: 30,
    },
    myAccountButton: {
        backgroundColor: '#37A48B',
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        borderRadius: 25,
        shadowColor: '#000000', //'#00000080',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 5,
        marginTop: 30,
    },
    myAccountButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerForm: {
        alignItems: 'center',
    },
    registerHeaderText: {
        textAlign: 'center',
        color: '#4E4E4E',
        fontSize: 15,
    },
    checkBoxView: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        flex: 1,
    },
    checkBoxText: {
        fontWeight: 'normal',
        fontSize: 12,
        //width: '90%',
        paddingRight: 20,
        textAlign: 'justify'
    },
    registerFooterText: {
        fontSize: 12,
        color: '#4E4E4E',
        flex: 1,
    },
    registerButton: {
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
        marginTop: 20,
    },
    registerText: {
        color: '#EBEBEB',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
