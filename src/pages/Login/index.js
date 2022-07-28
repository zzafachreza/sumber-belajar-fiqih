import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      alert('username dan Passwoord tidak boleh kosong !');
    } else if (kirim.username == null) {
      alert('username tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);
      setTimeout(() => {
        axios
          .post(apiURL + 'login.php', kirim)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {

              alert(res.data.msg);

            } else {
              storeData('user', res.data);
              navigation.replace('Home');
            }
          });
      }, 1200);


    }




  }

  return (
    <ScrollView style={{ backgroundColor: colors.primary, padding: 10, flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>

        <Image source={require('../../assets/logo.png')} style={{
          width: 100,
          height: 120
        }} />
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
          color: colors.white
        }}>SUMBER BELAJAR FIQIH</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          textAlign: 'center',
          color: colors.white,
          marginBottom: 10,
        }}>
          KELAS X
        </Text>

      </View>
      <MyGap jarak={10} />
      <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
        <MyInput label="Username" onChangeText={val => setKirim({
          ...kirim,
          username: val
        })}


          iconname="person" placeholder="Masukan username" />
        <MyGap jarak={20} />
        <MyInput
          onChangeText={val => setKirim({
            ...kirim,
            password: val
          })}
          secureTextEntry={true}
          label="Password"
          iconname="key"
          placeholder="Masukan password"
        />
        <MyGap jarak={40} />
        {!loading && <MyButton
          onPress={masuk}
          colorText={colors.primary}
          iconColor={colors.primary}
          title="LOGIN SEKARANG"
          warna={colors.secondary}
          Icons="log-in-outline"
        />}
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
          marginTop: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}><Text style={{
          fontSize: windowWidth / 25,
          fontFamily: fonts.primary[400],
          textAlign: 'center',
          color: colors.white
        }}>Belum punya user ? silahkan daftar disini</Text></TouchableOpacity>
      </View>
      {
        loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>
      }
    </ScrollView >
  );
}

const styles = StyleSheet.create({});
