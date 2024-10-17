import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ArrowBackButton from '../../components/ArrowBackButton';
import PrimaryText from '../../components/Text/PrimaryText';
import SecondaryText from '../../components/Text/SecondaryText';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import {
  getRegistrationProgress,
  saveRegistrationProcess,
} from '../../utils/registrationUtils';

const TypesScreen = () => {
  const navigation = useNavigationHandler();
  const [gender, setGender] = useState('');
  const [visible, setVisible] = useState(false);

  const genders = [
    {id: 1, label: 'Straight', value: 'straight'},
    {id: 2, label: 'Prefer not to say', value: 'none'},
  ];
  useEffect(() => {
    getRegistrationProgress('Type').then(progressData => {
      if (progressData) {
        setGender(progressData?.gender || '');
      }
    });
  }, []);
  const _handleNext = () => {
    if (gender.trim() !== '') {
      saveRegistrationProcess('Type', {gender});
    }

    navigation.navigateTo('Dating');
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <Ionicons
                name="male-female"
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
            title={'How would you like to define yourself?'}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <SecondaryText
            title={
              'Hinge users are matched based on their preferences, You can add more about it later'
            }
            fontSize={scale(14)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{textAlign: 'start'}}
          />
          <View style={styles.genderView}>
            {genders.map(genderOption => (
              <Pressable
                style={styles.genderPresableView}
                onPress={() => setGender(genderOption.value)}
                key={genderOption.id}>
                <SecondaryText
                  title={genderOption.label}
                  fontSize={scale(14)}
                  fontFamily={appFonts.quickSand_bold}
                  color={theme.black}
                  customStyle={{textAlign: 'start'}}
                />
                <RadioButton
                  value={genderOption.value}
                  status={
                    gender === genderOption.value ? 'checked' : 'unchecked'
                  }
                  color={theme.activeColor}
                  uncheckedColor={theme.inactiveColor}
                  onPress={() => setGender(genderOption.value)}
                />
              </Pressable>
            ))}
          </View>
          <Pressable
            style={styles.checkContainer}
            onPress={() => setVisible(!visible)}>
            <AntDesign
              name={visible ? 'checksquare' : 'checksquareo'}
              size={scale(22)}
              color={theme.black}
            />
            <SecondaryText
              title={'Visible on profile'}
              fontSize={scale(12)}
              fontFamily={appFonts.quickSand_bold}
              color={theme.black}
              customStyle={{textAlign: 'start'}}
            />
          </Pressable>

          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TypesScreen;

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
  genderView: {
    marginVertical: verticalScale(40),
  },
  genderPresableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.white,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(3),
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
});
