import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';

import { Picker } from '@react-native-community/picker';
import { StackActions, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import { ActionButton } from '../../components/Buttons';
import theme from '../../constants/theme';
import NotificationContainer from './NotificationContainer';
import * as Notifications from 'expo-notifications';

import { registerForLocationNotificationsAsync } from '../../utils/notifications';
import moment from 'moment';

const Notification = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      if (notifications) {
        const { hour, minute } = notifications[0].trigger.dateComponents;
        const mDate = moment();
        setDate(
          new Date(mDate.year(), mDate.month(), mDate.date(), hour, minute)
        );
      }
      await registerForLocationNotificationsAsync();
    })();
  }, []);

  const scheduleNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const mDate = moment(date);

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Bible Verse',
        body: 'Time To Read Your Verse',
      },
      trigger: {
        hour: mDate.hour(),
        minute: mDate.minute(),
        repeats: true,
      },
    });
  };
  const cancelNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <NotificationContainer>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            {/* <TouchableOpacity style={{ position: 'absolute', left: 100 }}>
              <FontAwesome5 name="cog" size={24} color={theme.dark.hex} />
            </TouchableOpacity> */}
            <Text style={styles.headerText}>Schedule Daily Notification</Text>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            style={{ height: 250, width: '90%' }}
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Schedule Notification"
            handlePress={async () => {
              await scheduleNotification();
              navigation.dispatch(StackActions.replace('Verse'));
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.dark.hex}
          />
          <ActionButton
            title="Cancel Notification"
            handlePress={async () => {
              await cancelNotification();
              navigation.dispatch(StackActions.replace('Verse', {}));
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.errorText}
          />
          <ActionButton
            title="Cancel"
            handlePress={() => {
              navigation.dispatch(StackActions.replace('Verse', {}));
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.light}
          />
        </View>
      </View>
    </NotificationContainer>
  );
};
export default Notification;
