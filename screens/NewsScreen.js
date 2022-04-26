import React from 'react';

import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';
import HeaderBack from '../components/allScreen/HeaderBack';
import HeaderPage from '../components/allScreen/HeaderPage';
import NewsItem from '../components/NewsScreen/NewsItem';
import ErrorModal from '../components/allScreen/ErrorModal';
import Activity from '../components/allScreen/Activity';

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      modalErrorVisible: false,
      isLoading: true,
      news: '',
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

      let url = `${this.props.apiUrl}/newsList?${queryString}`;

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
                news: responseJson.article,
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
                message: "WYSTĄPIŁ NIESPODZIEWANY BŁĄD ERROR:" + error
              }
            }, () => this.setModalErrorVisible(true));
          });
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

  createNewsList() {
    let newsList = [];
    for (let i in this.state.news) {
      newsList.push(
        <NewsItem
            key={i}
            navigation={this.props.navigation}
            max={this.state.news.length}
            data={this.state.news[i]} />,
      );
    }
    return newsList;
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <ErrorModal visible={this.state.modalErrorVisible} error={this.state.error} setModalErrorVisible={this.setModalErrorVisible.bind(this)}/>
          <SafeAreaView
            style={{flex: 1}}
            forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
            <HeaderBack navigation={this.props.navigation} />
            <HeaderPage title="Aktualności" />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {this.createNewsList()}
            </ScrollView>
            <Footer />
            {this.state.isLoading &&
            <Activity/>
            }
          </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({});
