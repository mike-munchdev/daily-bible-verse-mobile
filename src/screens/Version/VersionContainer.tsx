import React, { FC, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import theme from '../../constants/theme';
import { useNetInfo } from '@react-native-community/netinfo';
import { LostConnection } from '../../components/Connection';
import { StackActions, useNavigation } from '@react-navigation/native';

const VerseContainer: FC = (props) => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigation.dispatch(StackActions.replace('Verse'));
      }
    );
    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      {netInfo.isConnected ? props.children : <LostConnection />}
    </SafeAreaView>
  );
};
export default VerseContainer;

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: theme.medium.rgba(0.6) },
});
