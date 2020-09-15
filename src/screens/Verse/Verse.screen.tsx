import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import stripHtml from 'string-strip-html';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';

import theme from '../../constants/theme';

import VerseContainer from './VerseContainer';
import { bibleVersions } from '../../constants/biblegatewayVersions';
import { AlertHelper } from '../../utils/alert';

const Verse = () => {
  const [selectedVerse, setSelectedVerse] = useState({});
  const [selectedVersion, setSelectedVersion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const version = await AsyncStorage.getItem('version');
        if (version) {
          setSelectedVersion(version);

          // check to see if we already have the verse
          let verses = [];
          let verse;
          const versesString = await AsyncStorage.getItem('verses');

          const today = moment();
          if (versesString) {
            verses = JSON.parse(versesString);

            // remove verses that aren't from today's date.
            verses = verses.filter(
              (v) => moment(v.published).diff(today, 'day') === 0
            );
            await AsyncStorage.setItem('verses', JSON.stringify(verses));
          }

          // find today's verse in the selected version
          verse = verses.find(
            (v) =>
              v.version === version &&
              moment(v.published).diff(today, 'day') === 0
          );

          if (!verse) {
            // no verse found. get it from BibleGateway
            const response = await fetch(
              `https://www.biblegateway.com/usage/votd/rss/votd.rdf?${version}`
            );
            const data = await response.text();
            const rss = await rssParser.parse(data);
            const convertedVerse = stripHtml(rss.items[0].content).result;
            const verseArray = convertedVerse.split(' Brought');

            verse = {
              date: rss.items[0].published,
              version,
              title: rss.items[0].title,
              text: verseArray[0],
              copyright: `Brought ${verseArray[1].trim()}`.replace(
                ' Copyright',
                '\nCopyright'
              ),
            };

            verses = [...verses, verse];
            await AsyncStorage.setItem('verses', JSON.stringify(verses));
          }

          setSelectedVerse(verse);
        } else {
          navigation.dispatch(StackActions.replace('Version'));
        }
      } catch (error) {
        AlertHelper.show(
          'error',
          'Connection Error',
          'Could not connect to BibleGateway to retrieve verse.'
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <VerseContainer>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
              left: 15,
            }}
            onPress={() => {
              navigation.dispatch(StackActions.replace('Version'));
            }}
          >
            <Text
              style={{
                fontFamily: 'MontserratMedium',

                color: theme.dark.hex,
                fontSize: 20,
              }}
            >
              {selectedVersion
                ? bibleVersions.find((b) => b.id == selectedVersion)
                    ?.abbreviation
                : 'Select'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
            }}
            onPress={() => {
              navigation.dispatch(StackActions.replace('Notification'));
            }}
          >
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={theme.dark.hex}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.verseContainer}>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color={theme.dark.hex}
              size="large"
            />
          ) : (
            <>
              <Text
                style={{ fontSize: 28, marginHorizontal: 15, marginBottom: 20 }}
              >
                {selectedVerse ? selectedVerse.text : null}
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {selectedVerse ? selectedVerse.title : null}
              </Text>
            </>
          )}
        </View>
        <View style={styles.copyrightContainer}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            {selectedVerse ? selectedVerse.copyright : null}
          </Text>
        </View>
      </View>
    </VerseContainer>
  );
};
export default Verse;
