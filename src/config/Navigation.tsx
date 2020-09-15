import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { Splash } from '../screens/Splash';

import { GetStarted } from '../screens/GetStarted';
import { Verse } from '../screens/Verse';
import { Version } from '../screens/Version';
import { Notification } from '../screens/Notification';

const AppStack = createStackNavigator();
const FirstUseStack = createStackNavigator();

const AppStackScreen = () => (
  <AppStack.Navigator
    initialRouteName="Verse"
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    <AppStack.Screen name="Version" component={Version} />
    <AppStack.Screen name="Verse" component={Verse} />
    <AppStack.Screen name="Notification" component={Notification} />
  </AppStack.Navigator>
);
const FirstUseStackScreen = () => (
  <FirstUseStack.Navigator
    initialRouteName="GetStarted"
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    <FirstUseStack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{ headerShown: false }}
    />
  </FirstUseStack.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = (props: any) => {
  const { previouslyUsed } = props;

  return (
    <RootStack.Navigator headerMode="none">
      {previouslyUsed ? (
        <RootStack.Screen
          name="App"
          component={AppStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={FirstUseStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  const [previouslyUsed, setPreviouslyUsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const previouslyUsed = await AsyncStorage.getItem('previouslyUsed');

      if (previouslyUsed) {
        setPreviouslyUsed(previouslyUsed);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('previouslyUsed', String(previouslyUsed));
    })();
  }, [previouslyUsed]);

  if (isLoading) {
    return (
      <Splash
        finishLoading={() => {
          setPreviouslyUsed(true);
          setIsLoading(false);
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <RootStackScreen previouslyUsed={previouslyUsed} />
    </NavigationContainer>
  );
};
