import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    Picker,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('Email is Not Correct');
            setData({ ...data, email: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, email: text });
            setValid(true);
            // console.log('Email is Correct');
        }
    };

    const [data, setData] = useState({
        username: '',
        nama_lengkap: '',
        telepon: '',
        alamat: '',
        desa: 'Desa Kebak'
    });

    const simpan = () => {
        if (
            data.username.length === 0 &&
            data.nama_lengkap.length === 0 &&
            data.tlepon.length === 0 &&
            data.alamat.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Maaf Semua Field Harus Di isi !',
            });
        } else if (data.username.length === 0) {
            showMessage({
                message: 'Maaf nis masih kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Maaf email masih kosong !',
            });
        }
        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Maaf nama telepon masih kosong !',
            });
        } else if (data.alamat.length === 0) {
            showMessage({
                message: 'Maaf nama kelas masih kosong !',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Maaf Password masih kosong !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'register.php', data)
                .then(res => {
                    console.warn(res.data);
                    let err = res.data.split('#');

                    // console.log(err[0]);
                    if (err[0] == 50) {
                        setTimeout(() => {
                            setLoading(false);
                            showMessage({
                                message: err[1],
                                type: 'danger',
                            });
                        }, 1200);
                    } else {
                        setTimeout(() => {
                            navigation.replace('Login');
                            showMessage({
                                message: 'Pendaftaran user berhasil',
                                type: 'success',
                            });
                        }, 1200);
                    }
                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                padding: 10,
                backgroundColor: colors.primary
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <MyGap jarak={10} />
                <MyInput

                    label="NIS"
                    iconname="card"
                    placeholder="masukan nis"
                    value={data.username}
                    onChangeText={value =>
                        setData({
                            ...data,
                            username: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput

                    label="Nama Lengkap"
                    placeholder="masukan nama lengkap"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput

                    label="Kelas"
                    placeholder="masukan kelas"
                    iconname="home"
                    value={data.alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            alamat: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput

                    label="Telepon"
                    iconname="call"
                    placeholder="masukan telepon"
                    keyboardType="number-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="masukan password"
                    label="Password"
                    iconname="key"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={20} />
                {!loading &&
                    <MyButton
                        warna={colors.secondary}
                        title="REGISTER"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
