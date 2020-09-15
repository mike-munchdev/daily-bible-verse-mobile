import React, { FC, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import theme from '../../constants/theme';
import { ActivityIndicator } from 'react-native-paper';

export interface ISplashProps {
  finishLoading?: Function;
  user?: any;
}

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
const Splash: FC<ISplashProps> = ({ finishLoading }) => {
  useEffect(() => {
    setTimeout(finishLoading, 1000);
  }, []);
  return (
    <Animatable.View style={styles.container}>
      <ActivityIndicator color={theme.text} size="large" />
    </Animatable.View>
  );
};
export default Splash;
