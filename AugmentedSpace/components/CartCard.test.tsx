import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartCard from './CartCard'; // Adjust the import path as necessary

// Mocking the necessary hooks and methods from Firebase and @react-navigation/native
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: 'test-user-id' },
  }),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(() => Promise.resolve('image-test-url')),
}));

jest.mock('@react-navigation/native', () => ({
  useTheme: jest.fn().mockReturnValue({
    colors: {
      card: 'white',
      text: 'black',
      shadow: 'grey',
      border: 'blue',
    },
  }),
}));

describe('<CartCard />', () => {
  const mockOnRemove = jest.fn();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    // Reset the mock calls before each test
    mockOnRemove.mockClear();
    mockOnPress.mockClear();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<CartCard
      itemName="Test Item"
      brandName="Test Brand"
      itemCost={9.99}
      imagePath="path/to/image.jpg"
      onRemove={mockOnRemove}
      onPress={mockOnPress}
    />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct itemName, brandName, and itemCost', () => {
    const { getByText } = render(<CartCard
      itemName="Unique Item Name"
      brandName="Unique Brand Name"
      itemCost={123.45}
      imagePath="path/to/image.jpg"
      onRemove={mockOnRemove}
      onPress={mockOnPress}
    />);
    
    expect(getByText('Unique Brand Name')).toBeTruthy();
    expect(getByText('Unique Item Name')).toBeTruthy();
    expect(getByText('$123.45')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const { getByTestId } = render(<CartCard
      itemName="Test Item"
      brandName="Test Brand"
      itemCost={9.99}
      imagePath="path/to/image.jpg"
      onRemove={mockOnRemove}
      onPress={mockOnPress}
    />);

    // Assuming you assign a testID to your Pressable component
    const pressable = getByTestId('cart-card-pressable');
    fireEvent.press(pressable);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onRemove when the remove button is pressed', () => {
    const { getByText } = render(<CartCard
      itemName="Test Item"
      brandName="Test Brand"
      itemCost={9.99}
      imagePath="path/to/image.jpg"
      onRemove={mockOnRemove}
      onPress={mockOnPress}
    />);
    
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
