import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  useEffect(() => {

    const unsubscribe = getData('user').then(res => {
      if (!res) {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {
        console.log('sudah login logon');
        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      }
    });
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingBottom: 20,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth / 10,
      }}>
        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: 250,
              height: 250,
              marginBottom: 10,
            }
          }
        />
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 18,
          color: colors.secondary
        }}>SUMBER BELAJAR FIQIH</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          textAlign: 'center',
          color: colors.secondary,
          marginBottom: '15%',
        }}>
          KELAS X
        </Text>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
      <Text style={{
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 20,
        textAlign: 'center',
        color: colors.white
      }}>
        SMK IT Teknologi Al-Fath
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
