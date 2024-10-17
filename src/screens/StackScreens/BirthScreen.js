import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
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

const BirthScreen = () => {
  const navigation = useNavigationHandler();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    getRegistrationProgress('Birth').then(progressData => {
      if (progressData) {
        const {DOB} = progressData;
        const [dayValue, monthValue, yearValue] = DOB.split('/');

        setDay(dayValue);
        setMonth(monthValue);
        setYear(yearValue);
      }
    });
  }, []);

  const _handleNext = () => {
    if (day.trim() & month.trim() & (year.trim() !== '')) {
      const DOB = `${day}/${month}/${year}`;
      saveRegistrationProcess('Birth', {DOB});
    }
    navigation.navigateTo('Location');
  };
  const _handleDayChange = text => {
    setDay(text);
    if (text.length == 2) {
      monthRef.current?.focus();
    }
  };
  const _handleMonthChange = text => {
    setMonth(text);
    if (text.length == 2) {
      yearRef.current?.focus();
    }
  };
  const _handleYearChange = text => {
    setYear(text);
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="cake-variant-outline"
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
            title={"What's your date of birth?"}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />

          <View style={styles.textInputView}>
            <CustomTextInput
              maxLength={2}
              placeholder={'DD'}
              autoFocus={true}
              value={day}
              onChangeText={_handleDayChange}
              customStyle={{
                width: '20%',
                textAlign: 'center',
                paddingStart: null,
              }}
              keyboardType={'number-pad'}
            />
            <CustomTextInput
              maxLength={2}
              placeholder={'MM'}
              autoFocus={true}
              value={month}
              onChangeText={_handleMonthChange}
              customStyle={{
                width: '20%',
                textAlign: 'center',
                paddingStart: null,
              }}
              keyboardType={'number-pad'}
            />
            <CustomTextInput
              maxLength={4}
              placeholder={'YYYY'}
              autoFocus={true}
              value={year}
              onChangeText={_handleYearChange}
              customStyle={{
                width: '20%',
                textAlign: 'center',
                paddingStart: null,
              }}
              keyboardType={'number-pad'}
            />
          </View>

          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default BirthScreen;

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
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: verticalScale(40),
  },
});
