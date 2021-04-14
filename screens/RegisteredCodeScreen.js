import React from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderImage from '../components/allScreen/HeaderImage';
import PointsItem from '../components/MyAccountScreen/PointsItem';
import Divider from '../components/allScreen/Divider';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class RegisteredCodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            isLoading: true,
            data: '',
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

            if (this.props.route.params?.data) {
                this.setState({
                    data: this.props.route.params.data,
                }, () => this.setState({isLoading: false}))
            }
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                isLoading: true,
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

    setGreetingsImage() {
        if (this.state.isLoading) {
            return null
        }
        if (this.state.data.data.code === 0) {
            return <Image
                source={require('../icons/registered_code.png')}
                style={styles.registeredCodeImage}
                resizeMode="contain"
            />
        } else {
            return <Image
                source={require('../icons/code_not_registered.png')}
                style={styles.registeredCodeImage}
                resizeMode="contain"
            />
        }
    }

    setGreetingsHeaderText() {
        if (this.state.isLoading) {
            return <Text style={styles.registeredCodeGreetingsHeaderText}/>
        }
        if (this.state.data.data.code === 0) {
            return <Text style={styles.registeredCodeGreetingsHeaderText}>Gratulacje</Text>
        } else {
            return <Text style={styles.registeredCodeGreetingsHeaderTextWrong}>Skontaktuj się z infolinią Programu 61 8250 785</Text>
        }
    }

    setGreetingsText() {
        if (this.state.isLoading) {
            return <Text style={styles.registeredCodeGreetingsText}/>
        }
        if (this.state.data.data.code === 0) {
            return <Text style={styles.registeredCodeGreetingsText}>Kod numer <Text style={{fontWeight: 'bold'}}>{this.state.data.coupon.code}</Text> został zaakceptowany!</Text>
        } else {
            return <Text style={styles.registeredCodeGreetingsText}>Kod został odrzucony!</Text>
        }
    }

    render() {
        console.log(this.state.isLoading);
        return (
            <View style={{flex: 1}}>
                <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
                <SafeAreaView
                    style={{flex: 1}}
                    forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                    <HeaderBack navigation={this.props.navigation} />
                    <HeaderImage image="RegisteredCode"/>
                    <View style={styles.registeredCodeView}>
                        <Text style={styles.registeredCodeHeaderText}>Rejestracja kodu</Text>
                        <Divider/>
                        {this.setGreetingsImage()}
                        {this.setGreetingsHeaderText()}
                        {this.setGreetingsText()}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                            style={styles.registeredCodeButton}
                        >
                            <Text style={styles.registeredCodeButtonText}>OK</Text>
                        </TouchableOpacity>
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
    registeredCodeView: {
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
    registeredCodeHeaderText: {
        color: '#4E4E4E',
        fontSize: 20,
    },
    registeredCodeImage: {
        height: 100,
        width: 100,
    },
    registeredCodeGreetingsHeaderText: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 20,
    },
    registeredCodeGreetingsText: {
        color: '#4E4E4E',
        fontSize: 18,
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    registeredCodeButton: {
        backgroundColor: '#37A48B',
        width: '90%',
        borderRadius: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    registeredCodeButtonText: {
        color: '#EBEBEB',
        fontWeight: 'bold',
        fontSize: 20,
    },
    registeredCodeGreetingsHeaderTextWrong: {
        color: '#DC0060',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        paddingLeft: '10%',
        paddingRight: '10%',
    }
});
