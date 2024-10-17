import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import theme from '../themes/theme';
import {scale, verticalScale} from 'react-native-size-matters';
import appFonts from '../utils/fontLibrary';

const CustomTextInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    customStyle,
    placeholderTextColor = theme.defaultColor,
    keyboardType = 'default',
    autoFocus,
    maxLength,
  } = props;

  return (
    <TextInput
      maxLength={maxLength}
      autoCapitalize="words"
      autoFocus={autoFocus}
      style={[styles.input, customStyle]}
      placeholder={placeholder || 'defaultText'}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry || false}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      //{...props}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: scale(12),
    textAlign: 'left',
    fontFamily: appFonts.quickSand_bold,
    color: theme.placeholderText,
    borderColor: theme.black,
    borderBottomWidth: scale(1.5),
    paddingStart: scale(10),
    marginTop: verticalScale(10),
    marginBottom: scale(10),
  },
});
