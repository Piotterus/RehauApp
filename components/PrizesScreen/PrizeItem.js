import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default class PrizeItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            symbol: ''
        }
    }

    componentDidMount() {

        this.listenerFocus = this.props.navigation.addListener('focus', () => {
            console.log('focus');
            console.log(this.props.data.variants == null ? this.props.data.symbol : this.props.data.variants[1].symbol);
                this.setState({
                    symbol: this.props.data.variants == null ? this.props.data.symbol : this.props.data.variants[1].symbol,
                    isLoading: false,
                })

        });
        this.setState({
            symbol: this.props.data.variants == null ? this.props.data.symbol : this.props.data.variants[1].symbol,
            isLoading: false,
        });
        this.listenerBlur = this.props.navigation.addListener('blur', () => {
            this.setState({
                symbol: '',
                isLoading: true,
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.symbol !== prevProps.data.symbol) {
            this.setState({
                symbol: this.props.data.variants == null ? this.props.data.symbol : this.props.data.variants[1].symbol,
                isLoading: false,
            })
        }
    }

    componentWillUnmount() {
        this.listenerFocus();
        this.listenerBlur();
    }

    createItemsList() {
        let itemsList = []
        for (let i in this.props.data?.variants) {
            itemsList.push({
                label: this.props.data?.variants[i].value,
                value: this.props.data?.variants[i].symbol
            })
        }
        return itemsList;
    }

    render() {
        console.log(this.props.data);
        return(
            <View style={styles.prizeCategoryView}>
                <Image source={{uri:this.props.data.imagemedium}} style={styles.prizeImage} resizeMode='contain'/>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.data.title}</Text>
                <Text>Punkty: <Text style={{fontWeight: 'bold'}}>{this.props.data.pricePoints}</Text></Text>
                {this.props.data.variants !== undefined &&
                <DropDownPicker
                    items={this.createItemsList()}
                    defaultValue={this.props.data?.variants[1].symbol}
                    containerStyle={{height: 40, width: 100}}
                    style={{backgroundColor: '#FFFFFF', zIndex: 1}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', zIndex: 1}}
                    onChangeItem={item => this.setState({
                        symbol: item.value
                    })}
                    placeholder=""
                    dropDownMaxHeight={500}
                />
                }
                <TouchableOpacity onPress={() => this.props.sendNewOrder(this.state.symbol)} style={styles.prizeButton}>
                    <Text style={styles.prizeButtonText}>Zamów</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    prizeImage: {
        width: '100%',
        height: 300,
        zIndex: -1,
    },
    prizeButton: {
        backgroundColor: '#37a48b',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    prizeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

