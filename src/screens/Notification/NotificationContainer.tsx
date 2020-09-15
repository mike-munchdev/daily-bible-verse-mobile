import React, { FC, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import theme from '../../constants/theme';

import { StackActions, useNavigation } from '@react-navigation/native';

const NotificationContainer: FC = (props) => {
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
      {props.children}
    </SafeAreaView>
  );
};
export default NotificationContainer;

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: theme.medium.rgba(0.6) },
});
