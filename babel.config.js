module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@theme': './src/theme',
          '@components': './src/components',
          '@screens': './src/screens',
          '@data': './src/data',
          '@app-types': './src/types',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
