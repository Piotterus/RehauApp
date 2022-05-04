import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Dimensions, Linking} from 'react-native';

export default class CustomDrawer extends React.Component {

    render() {
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <SafeAreaView>
                    <View style={styles.mainDrawer}>
                        <View style={styles.drawerHeader}>
                            <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                                <Image source={require('../../icons/arrow-left_icon.png')} style={{height: 30, width: 30}} resizeMode='contain'/>
                            </TouchableOpacity>
                            <Image source={require('../../images/LogoHeaderBack2.png')} style={{height: 40, width: 150}} resizeMode='contain'/>
                        </View>
                        <View style={styles.drawerLine}/>
                        <TouchableOpacity onPress={() => Linking.openURL(`${this.props.baseUrl}/files/regulamin.pdf`)} style={styles.drawerItem}>
                            <Text style={styles.drawerText}>Regulamin</Text>
                        </TouchableOpacity>
                        <View style={styles.drawerLine}/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('News')} style={styles.drawerItem}>
                            <Text style={styles.drawerText}>Aktualności</Text>
                        </TouchableOpacity>
                        <View style={styles.drawerLine}/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={styles.drawerItem}>
                            <Text style={styles.drawerText}>Kontakt</Text>
                        </TouchableOpacity>
                        <View style={styles.drawerLine}/>
                        <TouchableOpacity onPress={() => {this.props.logout(); this.props.navigation.closeDrawer()}} style={styles.drawerItem}>
                            <Text style={styles.drawerText}>Wyloguj</Text>
                        </TouchableOpacity>
                        <View style={styles.drawerLine}/>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    mainDrawer: {
        height: '100%',
        backgroundColor: '#EBEBEB',
        paddingLeft: 20,
        paddingRight: 20,
    },
    drawerLine: {
        borderWidth: 0.5,
        borderColor: '#4E4E4E',
    },
    drawerItem: {
        height: 50,
        justifyContent: 'center',
    },
    drawerText: {
        color: '#4E4E4E',
        fontSize: 18
    },
    logo: {
        marginTop: 10,
        width: '30%',
        height: 50,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    }
});
