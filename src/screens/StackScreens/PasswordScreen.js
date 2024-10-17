import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, StatusBar} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import SecondaryText from '../../components/Text/SecondaryText';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PrimaryText from '../../components/Text/PrimaryText';
import CustomTextInput from '../../components/CustomTextInput';
import ArrowBackButton from '../../components/ArrowBackButton';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import {
  getRegistrationProgress,
  saveRegistrationProcess,
} from '../../utils/registrationUtils';

const PasswordScreen = () => {
  const navigation = useNavigationHandler();
  const [password, setPassword] = useState('');

  useEffect(() => {
    getRegistrationProgress('Password').then(progressData => {
      if (progressData) {
        setPassword(progressData?.password || '');
      }
    });
  }, []);
  const _handleNext = () => {
    if (password.trim() !== '') {
      saveRegistrationProcess('Password', {password});
    }
    navigation.navigateTo('Birth');
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <AntDesign name="lock" size={scale(25)} color={theme.black} />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
                }}
              />
            </View>
          </View>
          <PrimaryText
            title={'Please Choose a password'}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <SecondaryText
            title={'Email verification helps us keep the account secure'}
            fontSize={scale(14)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{textAlign: 'start'}}
          />
          <CustomTextInput
            secureTextEntry={true}
            placeholder={'Enter your Password (required)'}
            autoFocus={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <SecondaryText
            title={'(Note) Your details will be safe with us.'}
            fontSize={scale(10)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{textAlign: 'start'}}
          />
          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.white,
    flex: 1,
  },
  Container: {
    flex: 1,
    padding: scale(20),
    paddingVertical: verticalScale(20),
  },
  iconMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: verticalScale(30),
  },
  iconView: {
    padding: scale(6),
    borderRadius: scale(25),
    borderWidth: scale(1.5),
    borderColor: theme.black,
  },
  imageContainer: {},
  image: {
    height: verticalScale(50),
    width: scale(50),
  },
});
