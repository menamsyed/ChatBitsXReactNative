import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, StatusBar} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import SecondaryText from '../../components/Text/SecondaryText';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PrimaryText from '../../components/Text/PrimaryText';
import CustomTextInput from '../../components/CustomTextInput';
import ArrowBackButton from '../../components/ArrowBackButton';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import {
  getRegistrationProgress,
  saveRegistrationProcess,
} from '../../utils/registrationUtils';

const EmailScreen = () => {
  const navigation = useNavigationHandler();
  const [email, setEmail] = useState('');

  useEffect(() => {
    getRegistrationProgress('Email').then(progressData => {
      if (progressData) {
        setEmail(progressData?.email || '');
      }
    });
  }, []);
  const _handleNext = () => {
    if (email !== '') {
      saveRegistrationProcess('Email',{email})
    }
    navigation.navigateTo('Password');
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <Fontisto name="email" size={scale(25)} color={theme.black} />
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
            title={'Please provide a valid Email.'}
            fontSize={scale(26)}
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
            placeholder={'Enter your Email (required)'}
            autoFocus={true}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <SecondaryText
            title={'(Note) You will be asked to verify your Email*'}
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

export default EmailScreen;

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
