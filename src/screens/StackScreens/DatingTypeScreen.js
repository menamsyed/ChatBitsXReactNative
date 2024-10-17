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
  const [datingPref, setDatingPref] = useState([]);

  useEffect(() => {
    getRegistrationProgress('Dating').then(progressData => {
      if (progressData) {
        setDatingPref(progressData?.datingPref || []);
      }
    });
  }, []);
  const _chooseOption = option => {
    if (datingPref.includes(option.value)) {
      setDatingPref(
        datingPref.filter(selectedOption => selectedOption !== option.value),
      );
    } else {
      setDatingPref([...datingPref, option.value]);
    }
  };

  const _handleNext = () => {
    if (datingPref.length > 0) {
      saveRegistrationProcess('Dating', {datingPref});
    }
    navigation.navigateTo('LookingFor');
  };

  const Prefs = [
    {id: 1, label: 'Men', value: 'men'},
    {id: 2, label: 'Women', value: 'women'},
    {id: 3, label: 'Widow', value: 'widow'},
    {id: 4, label: 'Unmarried', value: 'unmarried'},
    {id: 5, label: 'Divorced', value: 'divorced'},
  ];

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <AntDesign name="hearto" size={scale(25)} color={theme.black} />
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
            title={'Who do you want to date?'}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <SecondaryText
            title={"Select all the people you're open to meet"}
            fontSize={scale(14)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{textAlign: 'start'}}
          />
          <View style={styles.genderView}>
            {Prefs.map(prefOption => (
              <Pressable
                style={styles.genderPresableView}
                onPress={() => _chooseOption(prefOption)}
                key={prefOption.id}>
                <SecondaryText
                  title={prefOption.label}
                  fontSize={scale(14)}
                  fontFamily={appFonts.quickSand_bold}
                  color={theme.black}
                  customStyle={{textAlign: 'start'}}
                />
                <RadioButton
                  value={prefOption.value}
                  status={
                    datingPref.includes(prefOption.value)
                      ? 'checked'
                      : 'unchecked'
                  }
                  color={theme.activeColor}
                  uncheckedColor={theme.inactiveColor}
                  onPress={() => _chooseOption(prefOption)}
                />
              </Pressable>
            ))}
          </View>
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
});
