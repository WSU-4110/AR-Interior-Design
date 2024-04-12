import '@testing-library/jest-native/extend-expect';

setupFilesAfterEnv: ['<rootDir>/jest.setup.js']

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn()
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: { uid: '123' }
    }))
  }));
  
  jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    getDownloadURL: jest.fn(() => Promise.resolve('mocked-url'))
  }));
  
  jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(() => ({
      items: 'Sample Item',
      imageSource: 'path/to/image.jpg',
      itemCost: '$99',
      brandName: 'Sample Brand',
      itemName: 'Extended Item Name'
    })),
  }));