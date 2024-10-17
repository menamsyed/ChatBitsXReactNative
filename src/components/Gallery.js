import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import theme from '../themes/theme';

const Gallery = props => {
  const {imageUrls} = props;

  return (
    <>
      <View style={styles.MainContainer}>
        {imageUrls.map((url, index) => (
          <Pressable
            style={url ? styles.imageContainer : styles.Container}
            key={index}>
            {url ? (
              <Image
                source={{uri: url}}
                style={{height: '100%', width: '100%', borderRadius: scale(10)}}
                resizeMode="cover"
              />
            ) : (
              <EvilIcons name="image" size={scale(30)} color={theme.black} />
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: moderateScale(4),
    columnGap: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: verticalScale(20),
  },
  Container: {
    backgroundColor: theme.defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    width: scale(100),
    borderStyle: 'dashed',
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: theme.black,
  },
  imageContainer: {
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    width: scale(100),
  },
});
