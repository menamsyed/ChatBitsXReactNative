import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PrimaryText = props => {
  const {title, customStyle, fontFamily, fontSize, color} = props;
  return (
    <>
      <Text style={[styles.text, {color, fontSize, fontFamily}, customStyle]}>
        {title || 'default_primaryText'}
      </Text>
    </>
  );
};

export default PrimaryText;

const styles = StyleSheet.create({
  textStyle: {
    color:'red',
    fontSize:18
    
    
  },
});
