import React from 'react'

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback, Platform,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'
import RegisterItemSelect from '../components/RegisterScreen/RegisterItemSelect';
import UpdateItemSelect from '../components/UserUpdateScreen/UpdateItemSelect';

Icon.loadFont();

export default class UserUpdateScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: false,
            uid: '',
            firstname: '',
            lastname: '',
            company: '',
            phone: '',
            email: '',
            nip: '',
            address: '',
            postal: '',
            city: '',
            workerCount: '',
            salesManager: '',
            regulations: '',
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

        const queryString = this.objToQueryString({
            session: this.props.token,
        });

        let url = `${this.props.apiUrl}/userData?${queryString}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.data;
                //console.log(responseJson);
                if (responseJson.error.code === 0) {
                    this.setState({
                        uid: responseJson.user.uid,
                        firstname: responseJson.user.firstname,
                        lastname: responseJson.user.lastname,
                        company: responseJson.user.name,
                        email: responseJson.user.email,
                        phone: responseJson.user.phone,
                        city: responseJson.user.address_city,
                        address: responseJson.user.address_street,
                        postal: responseJson.user.address_zipcode,
                        nip: responseJson.user.nip,
                        workerCount: responseJson.user.other1,
                        salesManager: responseJson.user.account.id
                    }, () => this.setState({isLoading: false}))
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
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                    }
                }, () => this.setModalErrorVisible(true));
            });


        url = `${this.props.apiUrl}/distributorsList?${queryString}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.data;
                //console.log(responseJson);
                if (responseJson.error.code === 0) {
                    this.setState({
                        distributorsList: responseJson.distributor,
                    }, () => this.setState({isLoading: false}))
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
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                    }
                }, () => this.setModalErrorVisible(true));
            });

        url = `${this.props.apiUrl}/regulations?${queryString}`;

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
                        agree1: responseJson.regulations.items[1] === '1',
                        agree2: responseJson.regulations.items[3] === '1',
                        agree3: responseJson.regulations.items[4] === '1'
                    }, () => this.setState({isLoading: false}))
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
                        message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD"
                    }
                }, () => this.setModalErrorVisible(true));
            });
    }

    updateValue(text, field) {
        if (field === 'firstname') {
            this.setState({
                firstname: text,
            });
        } else if (field === 'lastname') {
            this.setState({
                lastname: text,
            });
        } else if (field === 'email') {
            this.setState({
                email: text,
            });
        } else if (field === 'phone') {
            this.setState({
                phone: text,
            });
        } else if (field === 'company') {
            this.setState({
                company: text,
            });
        } else if (field === 'nip') {
            this.setState({
                nip: text,
            });
        } else if (field === 'address') {
            this.setState({
                address: text,
            });
        } else if (field === 'postal') {
            this.setState({
                postal: text,
            });
        } else if (field === 'city') {
            this.setState({
                city: text,
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

    checkFields() {
        if (this.state.firstname !== "" &&
            this.state.lastname !== "" &&
            this.state.phone !== "" &&
            this.state.email !== "" &&
            this.state.company !== "" &&
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

    sendUpdate() {
        if (this.checkFields()) {

            const queryString = this.objToQueryString({
                session: this.props.token,
                uid: this.state.uid,
            });

            let url = `${this.props.apiUrl}/userUpdate?${queryString}`;
console.log(url);
            let agree1;
            if (this.state.agree1) {
                agree1 = 1;
            } else {
                agree1 = 0;
            }
            let agree2;
            if (this.state.agree2) {
                agree2 = 1;
            } else {
                agree2 = 0;
            }
            let agree3;
            if (this.state.agree3) {
                agree3 = 1;
            } else {
                agree3 = 0;
            }

            let body = {
                user_firstname: this.state.firstname,
                user_lastname: this.state.lastname,
                user_email: this.state.email,
                user_name: this.state.company,
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
                        this.props.update();
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

    setModalErrorVisible = (visible) => {
        this.setState({ modalErrorVisible: visible });
    };

    render () {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1, backgroundColor: '#0A3251'}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 0, right: 0, left: 0 }}>
                    <Image
                        source={require('../images/rehau_splash_2022.jpg')}
                        style={styles.imageBackground}
                    />
                    <View style={styles.middleView}>
                        <View style={{marginTop: 200}}>
                            <ScrollView contentContainerStyle={{alignItems: 'flex-start', flexGrow: 1}} style={styles.scrollView}>
                                <Text style={styles.scrollViewHeaderText}>Uzupełnij dane</Text>
                                <Text style={styles.textLabel}>Imię<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Imię"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'firstname')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.firstname}
                                />
                                <Text style={styles.textLabel}>Nazwisko<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Nazwisko"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'lastname')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.lastname}
                                />
                                <Text style={styles.textLabel}>Email<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'email')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.email}
                                />
                                <Text style={styles.textLabel}>Telefon<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Telefon"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'phone')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.phone}
                                />
                                <Text style={styles.textLabel}>Firma<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Firma"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'company')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.company}
                                />
                                <Text style={styles.textLabel}>NIP<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="NIP"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'nip')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.nip}
                                />
                                <Text style={styles.textLabel}>Adres<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Adres"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'address')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.address}
                                />
                                <Text style={styles.textLabel}>Kod pocztowy<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Kod pocztowy"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'postal')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.postal}
                                />
                                <Text style={styles.textLabel}>Miejscowość<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Miejscowość"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'city')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.city}
                                />
                                <Text style={styles.textLabel}>Ilość pracowników<Text style={styles.textRequired}>*</Text></Text>
                                <TextInput
                                    placeholder="Ilość pracowników"
                                    placeholderTextColor="#4E4E4E88"
                                    textAlign="left"
                                    style={styles.textInput}
                                    onChangeText={(text) => this.updateValue(text, 'workerCount')}
                                    autoCapitalize="none"
                                    defaultValue={this.state.workerCount}
                                />
                                <UpdateItemSelect text='Menadżer sprzedaży' value={this.state.salesManager} updateValue={this.updateValue.bind(this)} fieldName='salesManager' items={this.state.distributorsList}/>
                                <Text style={styles.textConsent}>Przed przystąpieniem do Programu "Instaluj Korzyści", należy wyrazić zgody.</Text>
                                <View style={styles.consentRow}>
                                    <CheckBox
                                        checked={this.state.agree1}
                                        onPress={() => this.setState({agree1: !this.state.agree1})}
                                    />
                                    <Text style={styles.textConsent}>Zapoznałam/łem się z Regulaminem Promocji „Promocja Rehau – Instaluj korzyści”, który dostępny jest na www.instalujkorzysci.pl, i go akceptuję.<Text style={styles.textRequired}>*</Text>)</Text>
                                </View>
                                <View style={styles.consentRow}>
                                    <CheckBox
                                        checked={this.state.agree2}
                                        onPress={() => this.setState({agree2: !this.state.agree2})}
                                    />
                                    <Text style={styles.textConsent}>Wyrażam zgodę na przekazywanie treści marketingowych za pośrednictwem moich urządzeń telekomunikacyjnych, w szczególności takich jak laptop, telefon czy smartfon, zgodnie z art. 172 ust. 1 ustawy z dnia 16 lipca 2004 r. Prawo telekomunikacyjne.</Text>
                                </View>
                                <View style={styles.consentRow}>
                                    <CheckBox
                                        checked={this.state.agree3}
                                        onPress={() => this.setState({agree3: !this.state.agree3})}
                                    />
                                    <Text style={styles.textConsent}>Wyrażam zgodę na otrzymywanie informacji handlowej od REHAU sp. z o.o., zgodnie z art. 10 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</Text>
                                </View>
                                <Text style={styles.textConsent}>Klauzula informacyjna:</Text>
                                <Text style={styles.textConsent}>Warunkiem ważności udzielonej zgody jest zaznaczenie obu powyższych zgód. Rozumiem, że nie mam obowiązku podania moich danych osobowych a moje powyższe zgody są dobrowolne i nie muszę ich udzielać, przy czym w przypadku ich nieudzielenia bądź późniejszego wycofania, jak również przesłania wniosku o zmianę lub usunięcie moich danych, stracę możliwość otrzymywania treści marketingowych (w tym newsletterów i ofert) z REHAU.</Text>
                                <TouchableOpacity onPress={() => this.sendUpdate()} style={styles.consentButton}>
                                    <Text style={styles.consentText}>Zapisz</Text>
                                </TouchableOpacity>
                            </ScrollView>
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
        width: Dimensions.get("window").width, //for full screen
    },
    headerView: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#FFFFFF',
        height: 150,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#E1E1DE',
        height: 30,
        width: Dimensions.get("window").width,
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
        paddingLeft: 20,
        paddingRight: 20,
    },
    scrollView: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginBottom: 40,
    },
    scrollViewHeaderText: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 10,
    },
    textInput: {
        borderBottomColor: '#4E4E4E',
        borderBottomWidth: 1,
        //width: 200,
        width: '90%',
        height: 40,
        color: '#4E4E4E',
        fontSize: 14,
        alignSelf: 'center',
        marginBottom: 20,
    },
    textLabel: {
        color: '#4E4E4E',
        fontSize: 10,
        width: '90%',
        alignSelf: 'center'
    },
    textRequired: {
        color: '#DC0060'
    },
    textConsent: {
        color: '#4E4E4E',
        fontSize: 12,
        width: '90%',
        alignSelf: 'center',
        flex: 1,
    },
    consentRow: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    consentButton: {
        backgroundColor: '#37A48B',
        width: '85%',
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
        marginBottom: 20,
        marginTop: 30,
        alignSelf: 'center'
    },
    consentText: {
        color: '#EBEBEB',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
