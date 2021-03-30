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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      isFocusedName: false,
      isFocusedAge: false,
      error: '',
      modalErrorVisible: false,
      rememberEnabled: false,
    }
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  login(login,password) {

    if (login === "") {
        login = "rehau11157"
    }
    if (password === "") {
        password = "p6TKm3"
    }

    const queryString = this.objToQueryString({
      key: this.props.keyApp,
    });
    let body = {
      appId: this.props.appId,
      login: login,
      password: password,
    };

    let url = `https://api.verbum.com.pl/authentication?${queryString}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(async responseJson => {
          if (responseJson.error.code === 0) {
            if (this.state.rememberEnabled) {
              await AsyncStorage.setItem('isLoggedIn', '1');
              await AsyncStorage.setItem('token', responseJson.token);
            }
            this.props.login(responseJson.token, responseJson.fullname)
          } else {
            this.setState({
              error: responseJson.error,
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
    if (field === 'login') {
      this.setState({
        login: text,
      });
    } else if (field === 'password') {
      this.setState({
        password: text,
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
            source={require('../images/rsz_splash_rehau.png')}
            style={styles.imageBackground}
          />
          <View style={styles.middleView}>
            <View style={{marginTop: 200}}>
              <Text style={styles.headerText}>Witaj.</Text>
              <Text style={styles.headerText2}>
                Zaloguj się do aplikacji za pomocą otrzymanych danych
              </Text>
              <View style={styles.loginView}>
                <View>
                  <TextInput
                    placeholder="Login"
                    placeholderTextColor="#4E4E4E88"
                    textAlign="left"
                    style={styles.textInput}
                    onChangeText={(text) => this.updateValue(text, 'login')}
                    autoCapitalize="none"
                  />
                  <TextInput
                    placeholder="Hasło"
                    placeholderTextColor="#4E4E4E88"
                    textAlign="left"
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(text) => this.updateValue(text, 'password')}
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity onPress={() => this.login(this.state.login, this.state.password)} style={styles.loginButton}>
                  <Text style={styles.loginText}>Zaloguj się</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.headerView}>
            <Image
              source={require('../images/rsz_1rsz_rehau_logo_new_svg-01.png')}
              style={styles.logo}
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
    //width: 0.8 * Dimensions.get("window").width,
  },
  headerText: {
    color: '#DC0060',
    fontSize: 40,
  },
  headerText2: {
    color: '#DC0060',
    fontSize: 20,
  },
  loginView: {
    backgroundColor: '#EBEBEB',
    height: 300,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomColor: '#4E4E4E',
    borderBottomWidth: 1,
    //width: 200,
    width: Dimensions.get('window').width * 0.7,
    height: 40,
    color: '#4E4E4E',
  },
  loginButton: {
    backgroundColor: '#37A48B',
    width: '80%',
    alignItems: 'center',
    height: 50,
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
});
