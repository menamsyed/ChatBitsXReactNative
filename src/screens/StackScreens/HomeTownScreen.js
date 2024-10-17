import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBackButton from '../../components/ArrowBackButton';
import CustomTextInput from '../../components/CustomTextInput';
import PrimaryText from '../../components/Text/PrimaryText';
import { useNavigationHandler } from '../../routes/NavigationHandler';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import {
  getRegistrationProgress,
  saveRegistrationProcess
} from '../../utils/registrationUtils';

const NameScreen = () => {
  const [hometown, setHometown] = useState('');

  const navigation = useNavigationHandler();
   useEffect(()=>{
    getRegistrationProgress('Hometown').then(progressData => {
      if (progressData) {
        setHometown(progressData?.hometown || '');
      }
    });
   },[])
  const _handleNext = () => {
    if (hometown.trim() !== '') {
      saveRegistrationProcess('Hometown', {hometown});
    }
    navigation.navigateTo('Photos');
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={scale(30)}
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
            title={"Where's your home town?"}
            fontSize={scale(30)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <CustomTextInput
            placeholder={'Home Town, District, Village etc.'}
            autoFocus={true}
            value={hometown}
            onChangeText={text => setHometown(text)}
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
