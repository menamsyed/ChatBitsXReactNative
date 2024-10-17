import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ArrowBackButton from '../../components/ArrowBackButton';
import PrimaryText from '../../components/Text/PrimaryText';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import SecondaryText from '../../components/Text/SecondaryText';
import { saveRegistrationProcess } from '../../utils/registrationUtils';

const PromptsScreen = () => {
  const navigation = useNavigationHandler();
  const route = useRoute();

  const _handleNext = () => {
    if (route?.params) {
      saveRegistrationProcess('Prompts',{prompts:route?.params?.prompts})
      navigation.navigateTo('PreFinal');
    } else {
      alert('Please Select The Required Prompts');
    }
  };
  console.log(route.params, 'routted params');

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />

      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <AntDesign name="eye" size={scale(25)} color={theme.black} />
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
            title={'Write your profile answers'}
            fontSize={scale(30)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <View style={styles.promptContainer}>
            {route?.params?.prompts ? (
              route?.params?.prompts?.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigateTo('ShowPrompts')}
                  style={styles.pressablePromptView}>
                  <SecondaryText
                    title={item?.questions}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                  <SecondaryText
                    title={item?.answer}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                </Pressable>
              ))
            ) : (
              <>
                <Pressable
                  onPress={() => navigation.navigateTo('ShowPrompts')}
                  style={styles.pressablePromptView}>
                  <SecondaryText
                    title={'Select a Prompt'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                  <SecondaryText
                    title={'write your own answer'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigateTo('ShowPrompts')}
                  style={styles.pressablePromptView}>
                  <SecondaryText
                    title={'Select a Prompt'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                  <SecondaryText
                    title={'write your own answer'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigateTo('ShowPrompts')}
                  style={styles.pressablePromptView}>
                  <SecondaryText
                    title={'Select a Prompt'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                  <SecondaryText
                    title={'write your own answer'}
                    fontSize={scale(12)}
                    fontFamily={appFonts.quickSand_bold}
                    color={theme.black}
                  />
                </Pressable>
              </>
            )}
          </View>

          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PromptsScreen;

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
  pressablePromptView: {
    borderColor: theme.defaultColor,
    borderWidth: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: scale(10),
    height: verticalScale(70),
    width: '90%',
    marginVertical: verticalScale(4),
  },
  promptContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: verticalScale(10),
  },
});
