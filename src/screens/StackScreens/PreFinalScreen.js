import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import PrimaryText from '../../components/Text/PrimaryText';
import SecondaryText from '../../components/Text/SecondaryText';
import {scale, verticalScale} from 'react-native-size-matters';
import appFonts from '../../utils/fontLibrary';
import theme from '../../themes/theme';
import LottieView from 'lottie-react-native';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import {AuthContext} from '../../../AuthContext';
import {getRegistrationProgress} from '../../utils/registrationUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PreFinalScreen = () => {
  const navigation = useNavigationHandler();
  const [userData, setUserData] = useState('');
  const {token, setToken} = useContext(AuthContext);
  useEffect(() => {
    getAllUserData();
  }, []);

  const registerUser = async () => {
    try {
      const response = await axios
        .post('http://localhost:4000/register', userData)
        .then(response => {
          console.log(response);
          const token = response?.data?.token;
          AsyncStorage.getItem('token',token);
          setToken(token);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const getAllUserData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Birth',
        'Location',
        'Gender',
        'Type',
        'Dating',
        'LookingFor',
        'Hometown',
        'Photos',
      ];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };
  const _handleNext = () => {
    navigation.navigateTo('');
  };
  console.log(userData, 'userData....');
  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.textContainer}>
            <PrimaryText
              title={'All set to register!'}
              fontSize={scale(30)}
              fontFamily={appFonts.quickSand_bold}
              color={theme.black}
            />
            <SecondaryText
              title={'Setting up your profile...'}
              fontSize={scale(18)}
              fontFamily={appFonts.quickSand_bold}
              color={theme.black}
            />
          </View>
          <View style={styles.lottieView}>
            <LottieView
              source={require('../../../assets/love.json')}
              style={styles.Lottie}
              autoPlay
              loop={true}
              speed={0.7}
            />
          </View>
        </View>
        <Pressable style={styles.pressView} onPress={registerUser}>
          <SecondaryText
            title={'Finish Registering'}
            fontSize={scale(14)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.white}
            customStyle={{textAlign: 'center'}}
          />
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  Container: {
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(20),
  },
  textContainer: {},
  lottieView: {},
  Lottie: {
    height: verticalScale(300),
    width: scale(300),
    alignSelf: 'center',
  },
  pressView: {
    marginTop: 'auto',
    padding: scale(12),
    backgroundColor: theme.secondary,
    width: '100%',
    marginBottom: verticalScale(20),
  },
});
