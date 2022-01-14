import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity, TextInput,
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
            isLoading: false,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            postal: '',
            city: '',
            nip: '',
            workerCount: '',
            salesManager: '',
            check: false,
        }
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    updateValue(text, field) {
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

    setCheck(check) {
        this.setState({
            check: check,
        })
    }

    checkFields() {
        if (this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.phone !== "" &&
            this.state.email !== "" &&
            this.state.postal !== "" &&
            this.state.address !== "" &&
            this.state.city !== "" &&
            this.state.nip !== "" &&
            this.state.workerCount !== "" &&
            this.state.salesManager !== ""
        ) {
            return true;
        } else {
            return false;
        }
    }

    register() {
        if (this.checkFields()) {
            let url = `https://api.verbum.com.pl/user/register`;

            let agree1;
            if (this.state.check) {
                agree1 = 1;
            } else {
                agree1 = 0;
            }

            let body = {
                appId: this.props.appId,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                nip: this.state.nip,
                city: this.state.city,
                address: this.state.address,
                zipcode: this.state.postal,
                other1: this.state.workerCount,
                account: this.state.salesManager,
                regulations: {
                    1: agree1,
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
                    console.log(responseJson);
                    if (responseJson.error.code === 0) {
                        this.props.navigation.navigate('Login');
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
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="Register"/>
                    <View style={styles.myAccountView}>
                        <Text style={styles.myAccountHeaderText}>Przystąp do programu</Text>
                        <Divider/>
                        <ScrollView style={{width: '90%', height: '100%'}} contentContainerStyle={styles.registerForm}>
                            <Text style={styles.registerHeaderText}>Wypełnij poprawnie poniższy formualrz i dołącz do Instaluj Korzyści.</Text>
                            <Text style={styles.registerHeaderText}>Zapraszamy!</Text>
                            <RegisterItem text='Imię' updateValue={this.updateValue.bind(this)} value={this.state.firstname} fieldName='firstName' keyboardType='default'/>
                            <RegisterItem text='Nazwisko' updateValue={this.updateValue.bind(this)} value={this.state.lastname} fieldName='lastName' keyboardType='default'/>
                            <RegisterItem text='Telefon' updateValue={this.updateValue.bind(this)} value={this.state.phone} fieldName='phone' keyboardType='numeric'/>
                            <RegisterItem text='Adres e-mail' updateValue={this.updateValue.bind(this)} value={this.state.email} fieldName='email' keyboardType='email-address'/>
                            <RegisterItem text='Adres' updateValue={this.updateValue.bind(this)} value={this.state.address} fieldName='address' keyboardType='default'/>
                            <RegisterItem text='Kod pocztowy' updateValue={this.updateValue.bind(this)} value={this.state.postal} fieldName='postal' keyboardType='numeric'/>
                            <RegisterItem text='Miejscowość' updateValue={this.updateValue.bind(this)} value={this.state.city} fieldName='city' keyboardType='default'/>
                            <RegisterItem text='NIP' updateValue={this.updateValue.bind(this)} value={this.state.nip} fieldName='nip' keyboardType='numeric'/>
                            <RegisterItem text='Ilość pracowników' updateValue={this.updateValue.bind(this)} value={this.state.workerCount} fieldName='workerCount' keyboardType='default'/>
                            {/*<RegisterItem text='Menadżer sprzedaży' updateValue={this.updateValue.bind(this)} fieldName='salesManager'/>*/}
                            <RegisterItemSelect text='Menadżer sprzedaży' value={this.state.salesManager} updateValue={this.updateValue.bind(this)} fieldName='salesManager'/>
                            <CheckBox
                                title='Zapoznałam/łem się z Regulaminem Promocji "Promocja Rehau - Instaluj korzyści"'
                                checked={this.state.check}
                                onPress={() => this.setCheck(!this.state.check)}
                                containerStyle={styles.checkBoxView}
                                textStyle={styles.checkBoxText}
                            />
                            <Text style={styles.registerFooterText}>Rozumiem, że nie mam obowiązku podania moich danych osobowych a moje powyższe zgody są dobrowolne i nie muszę ich udzielać, przy czym w przypadku ich nieudzielenia bądź późniejszego wycofania, jak również przesłania wniosku o zmianę lub usunięcie moich danych, stracę możliwość uczestnictwa w Promocji.</Text>
                            <Text style={[styles.registerFooterText, {alignSelf: 'flex-start'}]}>Wszystkie pola są obowiązkowe!</Text>
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
            </View>
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
    },
    checkBoxText: {
        fontWeight: 'normal',
        fontSize: 12,
    },
    registerFooterText: {
        fontSize: 12,
        color: '#4E4E4E',
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
