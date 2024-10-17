import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBackButton from '../../components/ArrowBackButton';
import PrimaryText from '../../components/Text/PrimaryText';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import Geolocation from '@react-native-community/geolocation';

const LocationScreen = () => {
  const navigation = useNavigationHandler();
  const [location, setLocation] = useState('');
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const _handleNext = () => {
    navigation.navigateTo('Gender');
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;

      console.log(latitude, longitude, 'currentLatLng');
    });
  }, []);
  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.Container}>
          <View style={styles.iconMainContainer}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="location-exit"
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
            title={'Where do you live?'}
            fontSize={scale(24)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.black}
            customStyle={{marginTop: verticalScale(30)}}
          />
          <MapView
            style={{
              width: '100%',
              height: verticalScale(400),
              marginTop: verticalScale(30),
              marginBottom: verticalScale(30),
            }}
            initialRegion={{
              latitude: 13.0451,
              longitude: 77.6269,
              longitudeDelta: 0.0421,
              latitudeDelta: 0.0922,
            }}>
            <Marker draggable coordinate={coordinates[1]}>
              <View>
                <PrimaryText
                  title={location}
                  fontSize={scale(10)}
                  fontFamily={appFonts.quickSand_bold}
                  color={theme.black}
                  customStyle={{marginTop: verticalScale(30)}}
                />
              </View>
            </Marker>
          </MapView>

          <ArrowBackButton onPress={_handleNext} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default LocationScreen;

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
