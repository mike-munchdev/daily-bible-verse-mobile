import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  overlayContainer: {
    flex: 1,
    marginBottom: 10,
  },
  top: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // marginHorizontal: 4,
  },
  headerText: {
    fontSize: 40,
    color: theme.text,
    fontFamily: 'Montserrat',
  },
  verseContainer: {
    height: '70%',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightContainer: {
    marginHorizontal: 10,
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
