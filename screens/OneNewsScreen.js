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
import OneNewsItem from '../components/OneNewsScreen/OneNewsItem';

export default class OneNewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            modalErrorVisible: false,
            loading: true,
            news: '',
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {

            if (this.props.route.params?.data) {
                this.setState({
                    news: this.props.route.params.data,
                })
            }
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                isLoading: true,
                news: '',
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

    render() {
    return (
        <View style={{flex: 1}}>
            <SafeAreaView
                style={{flex: 1}}
                forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
                <HeaderBack navigation={this.props.navigation} />
                <HeaderPage title="Aktualnosci" />
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <OneNewsItem data={this.state?.news} />
                </ScrollView>
                <Footer />
            </SafeAreaView>
        </View>
    );
    }
    }

const styles = StyleSheet.create({});
