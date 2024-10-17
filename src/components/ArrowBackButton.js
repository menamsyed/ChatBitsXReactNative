import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../themes/theme';
import {scale, verticalScale} from 'react-native-size-matters';

const ArrowBackButton = (props) => {
    const {onPress} = props;
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <MaterialCommunityIcons
        name="arrow-right-circle"
        size={scale(35)}
        color={theme.white}
      />
    </TouchableOpacity>
  );
};

export default ArrowBackButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.secondary,
    
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: scale(20),
    borderRadius: scale(25),
    marginTop:verticalScale(15)
  },
});
