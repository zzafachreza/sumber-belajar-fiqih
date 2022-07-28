import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function STentang() {

    const [data, setData] = useState({});
    const [loading, setLoaing] = useState(true);
    const [gallery, setGallery] = useState([]);
    useEffect(() => {

        axios.post(apiURL + 'api_company.php').then(res => {
            console.log(res.data);
            setData(res.data);

            axios.post(apiURL + 'api_gallery.php').then(res2 => {
                console.log(res2.data);
                setGallery(res2.data);
                setLoaing(false);

            })
        })

    }, [])

    const MYListData = ({ title, person }) => {
        return (
            <View style={{
                marginVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                padding: 5,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.8,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                }}>
                    {title}
                </Text>
                <Text style={{
                    flex: 0.1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                }}>
                    :
                </Text>
                <Text style={{
                    flex: 1.2,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 30,
                }}>{person}</Text>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.secondary,
            padding: 10,
            paddingBottom: 10,
        }}>

            {loading && <ActivityIndicator size="large" color={colors.primary} />}
            {!loading && <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/logo.png')} style={{
                            width: 80, height: 80
                        }} />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 20,
                        }}>SMK IT TEKNOLOGI AL-FATH</Text>
                    </View>
                </View>

                <MYListData title='Akreditasi' person={data.akreditasi} />
                <MYListData title='Alamat sekolah' person={data.alamat_sekolah} />
                <MYListData title='Kepala sekolah' person={data.kepala_sekolah} />
                <MYListData title='Guru' person={data.guru} />
                <MYListData title='Siswa' person={data.siswa} />
                <MYListData title='Siswi' person={data.siswi} />
                <MYListData title='Rombongan belajar' person={data.rombongan_belajar} />
                <MYListData title='Kurikulum' person={data.kurikulum} />
                <MYListData title='Penyelenggara' person={data.penyelenggara} />
                <MYListData title='Manajemen' person={data.manajemen} />
                <MYListData title='Semester data' person={data.semester_data} />
                <MYListData title='Akses internet' person={data.akses_internet} />
                <MYListData title='Sumber listrik' person={data.sumber_listrik} />
                <MYListData title='Daya listrik' person={data.daya_listrik} />
                <MYListData title='Luas tanah' person={data.luas_tanah} />
                <MYListData title='Ruang kelas' person={data.ruang_kelas} />
                <MYListData title='Laboratorium' person={data.laboratorium} />
                <MYListData title='Perpustakaan' person={data.perpustakaan} />
                <MYListData title='Sanitasi siswa' person={data.sanitasi_siswa} />

                <View style={{
                    height: 50,
                    marginVertical: 10,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.white
                    }}>Galeri Foto</Text>
                </View>

                {gallery.map(i => {
                    return (
                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Image source={{
                                uri: i.link
                            }} style={{
                                width: windowWidth,
                                height: 200,
                            }} />
                        </View>
                    )
                })}

            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({})