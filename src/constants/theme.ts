import colors from './colors';

export default {
  background: {
    hex: colors.blue.hawkes,
  },
  medium: {
    hex: colors.blue.normal,
    rgba: (alpha: number) => {
      return `rgba(61,97,135,${alpha})`;
    },
  },
  dark: {
    hex: colors.blue.dark,
    rgba: (alpha: number) => {
      return `rgba(5,55,90,${alpha})`;
    },
  },
  light: {
    hex: colors.blue.light,
    rgba: (alpha: number) => {
      return `rgba(108,142,183,${alpha})`;
    },
  },
  text: colors.white.normal,
  button: colors.green.light,
  buttonText: colors.white.normal,
  buttonBorder: colors.green.dark,
  buttonBackground: colors.green.dark,
  buttonTransparentBackground: 'transparent',
  buttonTransparentText: colors.white.normal,
  buttonTransparentBorder: colors.green.dark,
  disabledText: colors.gray.normal,
  successText: colors.green.normal,
  facebookBlue: colors.blue.facebook,
  googleBlue: colors.blue.google,
  errorText: colors.red.normal,
  pill: colors.blue.hawkes,
};
