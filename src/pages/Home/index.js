import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { Icon } from 'react-native-elements'
import { getData, storeData } from '../../utils/localStorage';

export default function Home({ navigation }) {

  const DataMenu = ({ img, judul, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: colors.primary,
        elevation: 3,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
      }}>
        <Image source={img} style={{
          width: 70,
          height: 70,
          resizeMode: "contain"
        }} />
        <Text style={{
          marginTop: 10,
          fontFamily: fonts.secondary[600],
          color: colors.white,
          textAlign: 'center',
          fontSize: 16
        }}>{judul}</Text>
      </TouchableOpacity>
    )
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);

    })
  }, []);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.secondary
    }}>
      <View style={{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          height: 80,
        }}>
          <Text style={styles.txt}>Selamt datang,{user.nama_lengkap}</Text>
          <Text style={styles.txtLogo}>SUMBER BELAJAR FIQIH</Text>
          <Text style={styles.txt}>KELAS X</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
        }}>
          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{

            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" name="log-out-outline" color={colors.primary} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              left: 3,
              color: colors.primary
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>


      </View>
      <View style={{
        flex: 3,
        backgroundColor: colors.secondary,
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -100,
        }}>
          <Image source={require('../../assets/slide.png')} style={{
            width: '90%',
            height: 200,
            borderRadius: 20,
          }} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 5,
        }}>
          <DataMenu onPress={() => navigation.navigate('STentang')} judul="Profile Sekolah" img={require('../../assets/A1.png')} />
          <DataMenu onPress={() => navigation.navigate('SSilabus')} judul="Silabus" img={require('../../assets/A2.png')} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
          <DataMenu onPress={() => navigation.navigate('SMateri')} judul="Materi" img={require('../../assets/A3.png')} />
          <DataMenu onPress={() => navigation.navigate('SLatihan')} judul="Latihan Soal" img={require('../../assets/A4.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    color: colors.white,
  }
  , txt2: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 20,
    marginBottom: 20,
    color: colors.primary,
  },
  txtLogo: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 20,
    marginBottom: 5,
    color: colors.white,
  }, txtLogo2: {
    fontFamily: fonts.secondary[400],
    fontSize: 18,
    color: colors.primary,
  }

})