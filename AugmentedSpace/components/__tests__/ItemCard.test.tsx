import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ItemCard from '../ItemCard';

// Mock firebase functions
jest.mock('@firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue('https://example.com/image.jpg'),
}));
jest.mock('@firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: {} }),
  onAuthStateChanged: () => jest.fn(),
}));
jest.mock('@firebase/firestore', () => ({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({
          data: () => ({
            // Mock data you expect to retrieve from Firestore
            itemName: 'Mock Item',
            brandName: 'Mock Brand',
            itemCost: 20,
          }),
        }),
      }),
    }),
  }));

describe('ItemCard', () => {
  test('renders correctly', async () => {
    const mockProps = {
      UUID: '123',
      itemName: 'Item Name',
      brandName: 'Brand Name',
      itemCost: 10,
      imagePath: 'path/to/image',
      onPress: jest.fn(),
    };

    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);

    // Check if item details are rendered correctly
    expect(getByText('Item Name')).toBeTruthy();
    expect(getByText('Brand Name')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();

    // Check if image is rendered correctly
    const image = getByTestId('item-image');
    expect(image.props.source).toEqual({ uri: 'https://example.com/image.jpg' });

    // Simulate press on Quick Action Button
    const arButton = getByTestId('ar-button');
    fireEvent.press(arButton);
    // expect your router.push function to be called, maybe it should be mocked as well

    // Simulate press on Favorite Button
    //const favButton = getByTestId('fav-button');
    //fireEvent.press(favButton);
    // You might want to check if the press event calls the expected function or changes state as intended
  });
});
