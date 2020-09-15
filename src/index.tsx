import React, { useState, Fragment } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';

import Navigation from './config/Navigation';

import { AlertHelper } from './utils/alert';

export default () => {
  const [] = useState<string | undefined | null>(null);
  const [isReady, setIsReady] = useState(false);

  const cacheImages = (images: []) => {
    return images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const cacheFonts = (fonts: []) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/aaron-burden-c333d6YEhi0-unsplash.jpg'),
    ]);

    const fontAssets = cacheFonts([
      FontAwesome.font,
      MaterialIcons.font,
      Feather.font,
      { Montserrat: require('../assets/fonts/Montserrat-Regular.ttf') },
      { MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf') },
      { MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf') },
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <Fragment>
      <Navigation />
      <DropdownAlert
        ref={(ref: DropdownAlert) => {
          AlertHelper.setDropDown(ref);
        }}
        onClose={() => AlertHelper.invokeOnClose()}
        onTap={() => AlertHelper.invokeOnTap()}
      />
    </Fragment>
  );
};
