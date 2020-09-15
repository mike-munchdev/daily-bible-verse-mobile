import React, { useEffect, useContext } from 'react';

import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/aaron-burden-c333d6YEhi0-unsplash.jpg')}
      style={styles.container}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <Animatable.Text animation="fadeIn" style={styles.headerText}>
            Daily Bible Verse
          </Animatable.Text>
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Hiding God's Word In Your Heart</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Continue"
            handlePress={() => navigation.navigate('Version')}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.dark.hex}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default GetStarted;
