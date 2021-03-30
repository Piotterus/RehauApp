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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends  React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: false,
        isSettingUp: true,
        token: '',
        firstName: '',
        lastName: '',
        rememberMe: false,
        appId: 15,
        fullName: '',
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

  login(token, fullName) {
    this.setState( {
      token: token,
      isLoggedIn: true,
      fullName: fullName,
    });
  }

  async logout() {
    await AsyncStorage.setItem('isLoggedIn','0');
    await AsyncStorage.setItem('token','');
    this.setState( {
      isLoggedIn: false,
    })
    console.log("logout")
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
                                      />}
                                  openByDefault={false}
                >
                  <>
                    <Drawer.Screen name="Home">
                      {props => <HomeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisterCode">
                      {props => <RegisterCodeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="RegisteredCode">
                      {props => <RegisteredCodeScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="MyAccount">
                      {props => <MyAccountScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                          fullName={this.state.fullName}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="History">
                      {props => <HistoryScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="News">
                      {props => <NewsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="OneNews">
                      {props => <OneNewsScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="PrizesCategory">
                      {props => <PrizesCategoryScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Prizes">
                      {props => <PrizesScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Contact">
                      {props => <ContactScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
                      />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Statute">
                      {props => <StatuteScreen
                          {...props}
                          token={this.state.token}
                          appId={this.state.appId}
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
