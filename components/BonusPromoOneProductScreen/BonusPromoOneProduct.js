import React from 'react'
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import Images from '../../images/images';

export default class BonusPromoOneProduct extends React.Component {

    render() {
        let headerReGuard = 'RE.GUARD';
        let textReGuard = 'RE.GUARD wykorzystuje nowoczesną technologię do ochrony domu poprzez minimalizowanie skutków zalania. Wyróżniony za design system niezawodnie odcina dopływ wody, zanim dojdzie do poważniejszych szkód.';
        let headerReFine = 'RE.FINE';
        let textReFine = 'Najcenniejszy surowiec na Ziemi to nie złoto, platyna czy ropa naftowa. To woda, która jest nam niezbędna do życia. Dlatego przedstawiamy filtry RE.FINE, usuwające nawet najdrobniejsze cząsteczki obce z wody pitnej i chroniące całą instalację. Filtry RE.FINE to ergonomiczne oraz kompaktowe rozwiązanie, opracowane przez ekspertów REHAU. Oprócz usuwania cząstek zawiesiny, piasku czy drobin rdzy, zapobiegają inkrustacji, uszkodzeniom rur oraz korozji. Dzięki temu trwałość bojlera, armatury czy instalacji rurowych może się znacząco wydłużyć.';
        let headerText;
        let text;
        if (this.props.product === 'ReGuard') {
            headerText = headerReGuard;
            text = textReGuard;
            return(
                <View style={styles.productView}>
                    <Image style={styles.headerImage} source={require('../../images/RE_GUARD-baner_1.png')} resizeMode="cover"/>
                    <View style={styles.textView}>
                        <Text style={styles.headerText}>{headerText}</Text>
                        <Text style={styles.textText}>{text}</Text>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>RE.GUARD to zawór posiadający wiele zalet:</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>SZYBKA I PROSTA INSTALACJA</Text>
                            <Text style={styles.textText}>Instaluje się go tak szybko jak wodomierz, a kompaktowa budowa sprawia, że znakomicie nadaje się do modernizacji obiektów.</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>SPRAWDZONE BEZPIECZEŃSTWO</Text>
                            <Text style={styles.textText}>Innowacyjna ultradźwiękowa metoda pomiaru z protokołem Z-Wave i bateriami zasilania awaryjnego zapewnia maksymalną ochronę Twoim klientom.</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>WSZYSTKO POD KONTROLĄ</Text>
                            <Text style={styles.textText}>Aplikacja RE.GUARD pozwala sterować instalacją wodociągową z każdego miejsca i przesyła powiadomienia o nieprawidłowościach bezpośrednio na smartfona.</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>DLA WSZYSTKICH</Text>
                            <Text style={styles.textText}>RE.GUARD pasuje do wszystkich domów jednorodzinnych i bliźniaków, nowych, remontowanych i modernizowanych. Kompaktowa budowa umożliwia montaż w trudno dostępnych miejscach.</Text>
                        </View>
                        <View style={styles.productRowView}>
                            <View style={styles.productTextView}>
                                <Text style={styles.productText}>KORZYŚCI DLA CIEBIE</Text>
                                <Text style={styles.productText}>-szybka i łatwa instalacja</Text>
                                <Text style={styles.productText}>-kompaktowa budowa</Text>
                                <Text style={styles.productText}>-do budynków nowych, remontowanych i modernizowanych</Text>
                                <Text style={styles.productText}>-minimalne nakłady na konserwację dzięki technologii ultradźwiękowej</Text>
                                <Text style={styles.productText}>-zwiększenie obrotów dzięki umowom serwisowym</Text>
                            </View>
                            <Image style={styles.productImage} source={require('../../images/RE_GUARD.png')} resizeMode="contain"/>
                        </View>
                        <View style={styles.productRowView}>
                            <View style={styles.productTextView}>
                                <Text style={styles.productText}>KORZYŚCI DLA TWOICH KLIENTÓW</Text>
                                <Text style={styles.productText}>-bezpieczeństwo 24/7, również pod nieobecność</Text>
                                <Text style={styles.productText}>-elektrozawór działający nawet bez łączności z Internetem</Text>
                                <Text style={styles.productText}>-aplikacja dająca pełną kontrolę</Text>
                                <Text style={styles.productText}>-niższe składki ubezpieczeniowe</Text>
                                <Text style={styles.productText}>-eliminacja większych szkód, a tym samym problemów z ubezpieczeniem i przeciągającymi się remontami</Text>
                                <Text style={styles.productText}>-zapobieganie stratom wskutek wilgoci i pleśni</Text>
                                <Text style={styles.productText}>-również do modernizacji instalacji</Text>
                            </View>
                            <Image style={styles.productImage} source={require('../../images/RE_GUARD.png')} resizeMode="contain"/>
                        </View>
                    </View>
                </View>
            )
        } else if (this.props.product === 'ReFine') {
            headerText = headerReFine;
            text = textReFine;
            return(
                <View style={styles.productView}>
                    <Image style={styles.headerImage} source={require('../../images/RE_FINE-baner_1.png')} resizeMode="cover"/>
                    <View style={styles.textView}>
                        <Text style={styles.headerText}>{headerText}</Text>
                        <Text style={styles.textText}>{text}</Text>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>DLACZEGO WARTO WYBRAĆ RE.FINE?</Text>
                            <Text style={styles.textText}>-to filtry łatwe do zaadaptowania poprzez prefabrykowane połączenie kołnierzowe.</Text>
                            <Text style={styles.textText}>-można je szybko oraz łatwo zamontować.</Text>
                            <Text style={styles.textText}>-są komfortowe podczas prac serwisowych.</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>W SYSTEMIE LEPIEJ</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>REHAU posiada w swojej ofercie kompletne rozwiązania:</Text>
                            <Text style={styles.textText}>-system wody pitnej RAUTITAN.</Text>
                            <Text style={styles.textText}>-bezołowiowe złączki RAUTITAN PX i RX+.</Text>
                            <Text style={styles.textText}>-inteligentny zawór RE.GUARD</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.textText}>Razem stanowią doskonale sterowany system wody pitnej.</Text>
                        </View>
                        <View style={styles.productRowView}>
                            <View style={styles.productTextView}>
                                <Text style={styles.productText}>RE.FINE Pure</Text>
                                <Text style={styles.productText}>-półautomatyczny filtr z funkcją samoczynnego czyszczenia</Text>
                                <Text style={styles.productText}>-płukanie oraz czyszczenie szczotek w trakcie pracy</Text>
                                <Text style={styles.productText}>-bardzo duży przepływ</Text>
                                <Text style={styles.productText}>-kompaktowy i trwały</Text>
                                <Text style={styles.productText}>-ręczny wskaźnik wartości miesięcznych w celu przypomnienia o konserwacji</Text>
                                <Text style={styles.productText}>-dostępny w wersjach: ¾“, 1“ oraz 1 ¼“</Text>
                            </View>
                            <Image style={styles.productImage} source={require('../../images/ReFinePure.png')} resizeMode="contain"/>
                        </View>
                        <View style={styles.productRowView}>
                            <View style={styles.productTextView}>
                                <Text style={styles.productText}>RE.FINE Pro / Pro R</Text>
                                <Text style={styles.productText}>-półautomatyczny filtr z funkcją płukania wstecznego</Text>
                                <Text style={styles.productText}>-płukanie oraz czyszczenie szczotek w trakcie pracy</Text>
                                <Text style={styles.productText}>-bardzo duży przepływ</Text>
                                <Text style={styles.productText}>-ekonomiczny oraz wydajny</Text>
                                <Text style={styles.productText}>-ręczny wskaźnik wartości miesięcznych w celu przypomnienia o konserwacji</Text>
                                <Text style={styles.productText}>-dostępny w wersjach: ¾“, 1“ oraz 1 ¼“</Text>
                                <Text style={styles.productText}>-wersja Pro R zawiera wbudowany reduktor ciśnienia</Text>
                            </View>
                            <Image style={styles.productImage} source={require('../../images/ReFinePro.png')} resizeMode="contain"/>
                        </View>
                    </View>
                </View>
            )
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    productView: {
        width: '100%',
        marginBottom: 30,
    },
    placeholder: {
        height: 100,
        backgroundColor: '#DC0060',
        width: '100%'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    moreText: {
        color: '#DC0060',
        marginTop: 10,
    },
    textView: {
        paddingTop: 5,
        paddingLeft: 10,
    },
    productRowView: {
        flexDirection: 'row'
    },
    productTextView: {
        backgroundColor: '#37A58C',
        flex: 3,
        padding: 5,
        marginTop: 15,
        marginBottom: 10
    },
    productText: {
        color: '#FFFFFF',
        fontSize: 12,
        paddingBottom: 5
    },
    productImage: {
        flex: 2,
        height: 200,
        alignSelf: 'center'
    },
    headerImage: {
        width: '100%',
        height: 150,
        alignSelf: 'center'
    }
});

