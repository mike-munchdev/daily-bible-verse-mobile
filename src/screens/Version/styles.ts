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
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  headerText: {
    fontSize: 40,
    color: theme.text,
    fontFamily: 'Montserrat',
  },
  pickerContainer: {
    height: '50%',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginHorizontal: 10,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
