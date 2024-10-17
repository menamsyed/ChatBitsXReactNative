import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import PrimaryText from '../../components/Text/PrimaryText';
import SecondaryText from '../../components/Text/SecondaryText';
import {scale, verticalScale} from 'react-native-size-matters';
import appFonts from '../../utils/fontLibrary';
import theme from '../../themes/theme';
import LottieView from 'lottie-react-native';
import {useNavigationHandler} from '../../routes/NavigationHandler';
const BasicInfoScreen = () => {
  const navigation = useNavigationHandler();
  const _handleNext = () => {
    navigation.navigateTo('Name');
  };
  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.textContainer}>
            <PrimaryText
              title={"You're one of a kind."}
              fontSize={scale(30)}
              fontFamily={appFonts.quickSand_bold}
              color={theme.black}
            />
            <SecondaryText
              title={'Your profile should be too!'}
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
        <Pressable style={styles.pressView} onPress={_handleNext}>
          <SecondaryText
            title={'Enter Basic Info'}
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

export default BasicInfoScreen;

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
