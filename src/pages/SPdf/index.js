import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { colors, fonts, windowWidth } from '../../utils';


export default function SPdf({ route }) {

    return (
        <View style={styles.container}>
            <View style={{
                padding: 10,
                height: 50,
                backgroundColor: colors.primary
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    textAlign: 'center',
                    color: colors.white
                }}>{route.params.judul}</Text>
            </View>
            <Pdf
                trustAllCerts={false}
                source={{
                    uri: route.params.link
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})