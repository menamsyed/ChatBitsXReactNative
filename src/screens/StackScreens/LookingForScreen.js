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

const LookingForScreen = () => {
  const navigation = useNavigationHandler();
  const [selectedPref, setSelectedPref] = useState(null); // Single selection

  const _chooseOption = option => {
    setSelectedPref(option.value); // Set the selected value directly
  };
  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if (progressData) {
        setSelectedPref(progressData?.selectedPref || null);
      }
    });
  }, []);

  const Prefs = [
    {id: 1, label: 'Serious Relationship', value: 'serious'},
    {id: 2, label: 'Casual Dating', value: 'casual'},
    {id: 3, label: 'Friendship', value: 'friendship'},
    {id: 4, label: 'Hookup', value: 'hookup'},
    {id: 5, label: 'Exploring Options', value: 'exploring'},
  ];

  const _handleNext = () => {
    if (selectedPref.trim() !== '') {
      saveRegistrationProcess('LookingFor', {selectedPref});
    }
    navigation.navigateTo('Hometown');
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <Ionicons
                name="rose-outline"
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
            title={'Whats your dating intention?'}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
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
                    selectedPref === prefOption.value ? 'checked' : 'unchecked'
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

export default LookingForScreen;

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
