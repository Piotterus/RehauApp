import React from 'react';

import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import HeaderBurger from '../components/allScreen/HeaderBurger';
import Footer from '../components/allScreen/Footer';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{top: 'always', bottom: 0, right: 0, left: 0}}>
          <ImageBackground
            source={require('../images/tlo.psd.png')}
            resizeMode="cover"
            style={styles.imageBackground}>
            <HeaderBurger navigation={this.props.navigation} />
            <View style={styles.menuRow}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterCode')} style={styles.menuItem}>
                <Image
                  source={require('../icons/barcode_icon.png')}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>REJESTRUJ FAKTURĘ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAccount')} style={styles.menuItem}>
                <Image
                  source={require('../icons/man_icon.png')}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>MOJE KONTO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuRow}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryFV')} style={styles.menuItem}>
                <Image
                    source={require('../icons/time_icon.png')}
                    style={styles.menuImage}
                    resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>MOJA HISTORIA</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('News')} style={styles.menuItem}>
                <Image
                  source={require('../icons/news_icon.png')}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>AKTUALNOŚCI</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuRow}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PrizesCategory')} style={styles.menuItem}>
                <Image
                    source={require('../icons/present_icon.png')}
                    style={styles.menuImage}
                    resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>NAGRODY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={styles.menuItem}>
                <Image
                  source={require('../icons/contact_icon.png')}
                  style={styles.menuImage}
                  resizeMode="contain"
                />
                <View style={styles.menuSpacer} />
                <Text style={styles.menuText}>KONTAKT</Text>
              </TouchableOpacity>
            </View>
            <Footer />
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: Dimensions.get('window').width, //for full screen
    height: '100%',
  },
  imageBonusTlo: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  logo: {
    //height: 100,
    //width: 0.8 * Dimensions.get("window").width,
  },
  menuItem: {
    borderWidth: 0.25,
    borderColor: '#DC006067',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRow: {
    flex: 1,
    flexDirection: 'row',
  },
  menuImage: {
    height: '40%',
    width: '40%',
    marginBottom: 10,
  },
  menuText: {
    color: '#DC0060',
    fontSize: 11,
  },
  menuSpacer: {
    borderWidth: 0.8,
    borderColor: '#DC0060',
    width: '30%',
    marginBottom: 10,
  },
});
