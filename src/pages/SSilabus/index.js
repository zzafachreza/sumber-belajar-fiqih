import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage';
import YoutubePlayer from "react-native-youtube-iframe";


export default function ({ navigation, route }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('SPdf', {
                    judul: item.judul,
                    link: item.link
                })
            }} style={{
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
                paddingVertical: 20,
                borderWidth: 1,
            }}>
                <Text style={{
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    textAlign: 'center'
                }}>{item.judul}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        axios.post(apiURL + 'api_silabus.php').then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        })
    }, []);

    return (
        <View style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.secondary
        }}>
            {loading && <ActivityIndicator size="large" color={colors.primary} />}
            {!loading && <FlatList data={data} renderItem={__renderItem} />}
        </View>

    )
}

const styles = StyleSheet.create({})