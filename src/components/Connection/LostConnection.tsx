import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../constants/theme';

import styles from './styles';

const LostConnection = () => {
  return (
    <View
      style={{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5
        size={96}
        name="unlink"
        style={{ color: theme.dark.hex }}
        color={theme.text}
      />
      <Text
        style={{
          fontFamily: 'MontserratBold',
          fontSize: 18,
          marginTop: 10,
          fontWeight: 'bold',
          color: theme.dark.hex,
        }}
      >
        Your internet connection has been lost.
      </Text>
      <Text
        style={{
          fontFamily: 'MontserratBold',
          fontSize: 18,
          marginTop: 10,
          fontWeight: 'bold',
          color: theme.dark.hex,
        }}
      >
        Please try restoring it.
      </Text>
    </View>
  );
};
export default LostConnection;
