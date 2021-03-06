import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: theme.dark.rgba(0.4),
  },
  top: {
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  headerText: {
    fontSize: 40,
    color: theme.text,
    fontFamily: 'Montserrat',
  },
  sloganContainer: {
    height: '10%',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    fontFamily: 'Montserrat',
    color: theme.text,
    fontSize: 20,
  },
  buttonContainer: {
    marginHorizontal: 10,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.buttonTransparentBackground,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  getStarted: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.buttonBackground,
    borderColor: theme.buttonBorder,
    borderWidth: 1,
  },
});
