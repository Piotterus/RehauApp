import React from 'react';

import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './screens/SplashScreen';
import createDrawerNavigator from '@react-navigation/drawer/src/navigators/createDrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import OneNewsScreen from './screens/OneNewsScreen';
import PrizesCategoryScreen from './screens/PrizesCategoryScreen';
import HistoryScreen from './screens/HistoryScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import ContactScreen from './screens/ContactScreen';
import PrizesScreen from './screens/PrizesScreen';
import CustomDrawer from './components/allScreen/CustomDrawer';
import OneNewsItem from './components/OneNewsScreen/OneNewsItem';
import RegisterCodeScreen from './screens/RegisterCodeScreen';
import RegisteredCodeScreen from './screens/RegisteredCodeScreen';
import StatuteScreen from './screens/StatuteScreen';
import UserUpdateScreen from './screens/UserUpdateScreen';
import HistoryPointsScreen from './screens/HistoryPointsScreen';
import HistoryOrdersScreen from './screens/HistoryOrdersScreen';
import HistoryOneOrder from './screens/HistoryOneOrder';
import RegisterScreen from './screens/RegisterScreen';
import BonusPromoMenuScreen from './screens/BonusPromoMenuScreen';
import BonusPromoAboutScreen from './screens/BonusPromoAboutScreen';
import BonusPromoPrizesScreen from './screens/BonusPromoPrizesScreen';
import BonusPromoPremieScreen from './screens/BonusPromoPremieScreen';
import BonusPromoMyFVScreen from './screens/BonusPromoMyFVScreen';
import BonusPromoProductsScreen from './screens/BonusPromoProductsScreen';
import BonusPromoOneProductScreen from './screens/BonusPromoOneProductScreen';
import BonusPromoRegisterFVScreen from './screens/BonusPromoRegisterFVScreen';
import BonusPromoRegisteredFVScreen from './screens/BonusPromoRegisteredFVScreen';
import BonusPromoMyBonusesScreen from './screens/BonusPromoMyBonusesScreen';
import HistoryFVScreen from './screens/HistoryFVScreen';
import RegisterFVScreen from './screens/RegisterFVScreen';
import RegisteredFVScreen from './screens/RegisteredFVScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends  React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSettingUp: true,
      isUpdateNow: false,
      token: '',
      firstName: '',
      lastName: '',
      rememberMe: false,
      appId: 99,
      fullName: '',
      apiUrl: 'https://2022.instalujkorzysci.pl/apiverbum/apiVerbum',
      baseUrl: 'https://2022.instalujkorzysci.pl',
    }
  }

  componentDidMount() {
    setTimeout(this.setup.bind(this), 500);
  }

  componentWillUnmount() {

  }

  updateFooter(knowledgeCount,testCount) {
    this.setState({
      knowledgeCount: knowledgeCount,
      testCount: testCount,
    })
  }

  updateDrawer(firstname, lastname) {
    this.setState({
      firstName: firstname,
      lastName: lastname,
    })
  }

  updateWeek(week) {
    this.setState({
      week: week,
    })
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

  setup() {
    this.setState({
      isSettingUp: false,
    })
  }

  /*setup = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const token = await AsyncStorage.getItem('token');
    if (isLoggedIn !== '1') {
      this.setState({
        isSettingUp: false
      })
    } else {
      this.setState({
        isSettingUp: false,
        isLoggedIn: true,
        token: token
      })
    }
  };*/

  login(token, fullName, update) {
    this.setState({
      isUpdateNow: update,
      token: token,
      isLoggedIn: true,
      fullName: fullName,
    })
  }

  update() {
    this.setState({
      isUpdateNow: false,
    })
  }

  async logout() {
    await AsyncStorage.setItem('isLoggedIn','0');
    await AsyncStorage.setItem('token','');
    this.setState( {
      isLoggedIn: false,
    });
  }

  rememberMe(value) {
    this.setState({
      rememberMe: value
    })
  }

  render() {
    if (this.state.isSettingUp) {
      return (
          <SafeAreaProvider>
            <SplashScreen/>
          </SafeAreaProvider>
      )
    }
    if (this.state.isUpdateNow) {
      return (
          <SafeAreaProvider>
            <UserUpdateScreen
                token={this.state.token}
                appId={this.state.appId}
                update={this.update.bind(this)}
            />
          </SafeAreaProvider>
      )
    }
    return (
        <SafeAreaProvider>
          <NavigationContainer>
            {this.state.isLoggedIn ? (
                <Drawer.Navigator initialRouteName="Home"
                                  screenOptions={{
                                    headerShown: false,
                                    headerTransparent: true,
                                  }}
                                  drawerContent={(props) => <CustomDrawer
                                      logout={this.logout.bind(this)} {...props}
                                      baseUrl={this.state.baseUrl}
                                      />}
                                  openByDefault={false}
                >
                  <>
                    <Drawer.Screen name="Home">
                      {props => <HomeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisterCode">
                      {props => <RegisterCodeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisteredCode">
                      {props => <RegisteredCodeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisterFV">
                      {props => <RegisterFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisteredFV">
                      {props => <RegisteredFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="MyAccount">
                      {props => <MyAccountScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          fullName={this.state.fullName}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="History">
                      {props => <HistoryScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="HistoryFV">
                      {props => <HistoryFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="News">
                      {props => <NewsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="OneNews">
                      {props => <OneNewsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="PrizesCategory">
                      {props => <PrizesCategoryScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Prizes">
                      {props => <PrizesScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Contact">
                      {props => <ContactScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Statute">
                      {props => <StatuteScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="HistoryPoints">
                      {props => <HistoryPointsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="HistoryOrders">
                      {props => <HistoryOrdersScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="HistoryOneOrder">
                      {props => <HistoryOneOrder
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoMenu">
                      {props => <BonusPromoMenuScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoAbout">
                      {props => <BonusPromoAboutScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoPrizes">
                      {props => <BonusPromoPrizesScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoPremie">
                      {props => <BonusPromoPremieScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoMyFV">
                      {props => <BonusPromoMyFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoProducts">
                      {props => <BonusPromoProductsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoOneProduct">
                      {props => <BonusPromoOneProductScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoRegisterFV">
                      {props => <BonusPromoRegisterFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoRegisteredFV">
                      {props => <BonusPromoRegisteredFVScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="BonusPromoMyBonuses">
                      {props => <BonusPromoMyBonusesScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Drawer.Screen>
                  </>
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Login"
                                 screenOptions={{
                                   headerShown: false,
                                   headerTransparent: true,
                                 }}
                >
                  <>
                    <Stack.Screen name="Login"
                                  options={{
                                    title: 'Login',
                                    headerStyle: {
                                      backgroundColor: 'transparent',
                                    },
                                    gestureEnabled: false,
                                  }}
                    >
                      {props => <LoginScreen
                          {...props}
                          login={this.login.bind(this)}
                          appId={this.state.appId}
                          rememberMe={this.rememberMe.bind(this)}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Stack.Screen>
                    <Stack.Screen name="Register"
                                options={{
                                    title: 'Register',
                                    headerStyle: {
                                        backgroundColor: 'transparent',
                                    },
                                    gestureEnabled: false,
                                }}
                    >
                      {props => <RegisterScreen
                          {...props}
                          appId={this.state.appId}
                          apiUrl={this.state.apiUrl}
                      />}
                    </Stack.Screen>
                  </>
                </Stack.Navigator>
            )}
          </NavigationContainer>
        </SafeAreaProvider>
    )
  }
}
