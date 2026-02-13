import {TextStyle, Platform} from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  default: 'sans-serif',
}) as string;

const fontFamilyBold = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  default: 'sans-serif',
}) as string;

export const Typography = {
  displayLarge: {
    fontFamily: fontFamilyBold,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1,
    lineHeight: 48,
  } as TextStyle,

  displayMedium: {
    fontFamily: fontFamilyBold,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 38,
  } as TextStyle,

  headerLarge: {
    fontFamily: fontFamilyBold,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 30,
  } as TextStyle,

  headerMedium: {
    fontFamily: fontFamilyBold,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
    lineHeight: 24,
  } as TextStyle,

  headerSmall: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 20,
  } as TextStyle,

  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodyMedium: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,

  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,

  buttonLabel: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  } as TextStyle,

  numberLarge: {
    fontFamily: fontFamilyBold,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 42,
  } as TextStyle,

  numberMedium: {
    fontFamily: fontFamilyBold,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 26,
  } as TextStyle,
} as const;
