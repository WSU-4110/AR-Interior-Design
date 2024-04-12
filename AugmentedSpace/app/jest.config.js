module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testPathIgnorePatterns: [
      '\\.snap$',
      '<rootDir>/node_modules/'
    ],
    cacheDirectory: '.jest/cache',
  };