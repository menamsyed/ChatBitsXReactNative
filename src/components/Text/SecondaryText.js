import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SecondaryText = props => {
  const {title, customStyle, fontFamily, fontSize, color, textAlign} = props;
  return (
    <>
      <Text
        style={[
          styles.text,
          {color, fontSize, fontFamily, textAlign},
          customStyle,
        ]}>
        {title || 'default_secText'}
      </Text>
    </>
  );
};

export default SecondaryText;

const styles = StyleSheet.create({
  textStyle: {
    color: 'red',
    fontSize: 14,
  },
});
