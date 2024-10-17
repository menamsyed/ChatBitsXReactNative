import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import SecondaryText from '../../components/Text/SecondaryText';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryText from '../../components/Text/PrimaryText';
import CustomTextInput from '../../components/CustomTextInput';
import ArrowBackButton from '../../components/ArrowBackButton';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import {
  getRegistrationProgress,
  saveRegistrationProcess,
} from '../../utils/registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigationHandler();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData?.firstName || '');
        setLastName(progressData?.lastName || '');
      }
    });
  }, []);

  const _handleNext = () => {
    if (firstName.trim() && lastName.trim() !== '') {
      saveRegistrationProcess('Name', {firstName, lastName});
    }
    navigation.navigateTo('Email');
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <SecondaryText
            title={'NO BACKGROUND CHECKS ARE CONDUCTED'}
            fontSize={scale(12)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{textAlign: 'center', marginTop: verticalScale(20)}}
          />

          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={scale(25)}
                color={theme.black}
              />
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
            title={"What's your name?"}
            fontSize={scale(30)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <CustomTextInput
            placeholder={'First Name (required)'}
            autoFocus={true}
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <CustomTextInput
            placeholder={'Last Name (optional)'}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <SecondaryText
            title={'Last name is optional.'}
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

export default NameScreen;

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
