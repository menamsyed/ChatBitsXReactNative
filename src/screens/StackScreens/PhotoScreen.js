import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ArrowBackButton from '../../components/ArrowBackButton';
import Gallery from '../../components/Gallery';
import PrimaryText from '../../components/Text/PrimaryText';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import CustomTextInput from '../../components/CustomTextInput';
import SecondaryText from '../../components/Text/SecondaryText';
import {
  getRegistrationProgress,
  saveRegistrationProcess,
} from '../../utils/registrationUtils';

const PhotoScreen = () => {
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigationHandler();

  useEffect(() => {
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData && progressData?.imageUrls) {
        setImageUrls(progressData?.imageUrls || '');
      }
    });
  }, []);
  const _handleNext = () => {
    if (imageUrls.length > 0) {
      saveRegistrationProcess('Photos', {imageUrls});
    }
    navigation.navigateTo('Prompts');
  };
  const _handleAddImage = () => {
    //find the first empty slot in the array.
    const index = imageUrls?.findIndex(url => url == '');
    if (index !== -1) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setImageUrls(updatedUrls);
      setImageUrl('');
    }
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <MaterialIcons
                name="photo-camera-back"
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
            title={'Pickup your photos & videos'}
            fontSize={scale(30)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <Gallery imageUrls={imageUrls} />
          <SecondaryText
            title={'Drag to reorder'}
            fontSize={scale(12)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
          />
          <SecondaryText
            title={'Add four to six photos'}
            fontSize={scale(12)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
          />
          <View style={styles.addImageContainer}>
            <CustomTextInput
              placeholder={'Enter your image URL'}
              autoFocus={true}
              value={imageUrl}
              onChangeText={text => setImageUrl(text)}
              customStyle={{
                borderColor: theme.black,
                borderWidth: scale(0.2),
                borderRadius: moderateScale(4),
                borderBottomWidth: null,
              }}
            />
            <TouchableOpacity
              style={styles.addImgButton}
              onPress={_handleAddImage}>
              <SecondaryText
                title={'Add Image'}
                fontSize={scale(12)}
                fontFamily={appFonts.quickSand_bold}
                color={theme.secondary}
              />
            </TouchableOpacity>
          </View>

          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PhotoScreen;

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
  addImageContainer: {
    alignItems: 'center',
  },
  addImgButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
    width: '30%',
    borderRadius: scale(3),
  },
});
