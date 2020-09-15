import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View } from 'react-native';

import { Picker } from '@react-native-community/picker';
import styles from './styles';
import { bibleVersions } from '../../constants/biblegatewayVersions';
import { ActionButton } from '../../components/Buttons';
import { StackActions, useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VersionContainer from './VersionContainer';
import AsyncStorage from '@react-native-community/async-storage';

const Version = () => {
  const [selectedVersion, setSelectedVersion] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const version = await AsyncStorage.getItem('version');
      setSelectedVersion(version);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('version', selectedVersion);
    })();
  }, [selectedVersion]);

  return (
    <VersionContainer>
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
            <TouchableOpacity style={{ position: 'absolute', left: 100 }}>
              <FontAwesome5 name="cog" size={24} color={theme.dark.hex} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Select Version</Text>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedVersion}
            style={{ height: 250, width: '90%' }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedVersion(itemValue);
            }}
          >
            {bibleVersions.map((b) => (
              <Picker.Item
                key={b.id.toString()}
                label={b.name}
                value={b.id.toString()}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Continue"
            handlePress={() => {
              navigation.dispatch(StackActions.replace('Verse', {}));
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.dark.hex}
            disabled={!selectedVersion}
          />
        </View>
      </View>
    </VersionContainer>
  );
};
export default Version;
