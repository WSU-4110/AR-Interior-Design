import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartCard from '../CartCard';
import { useTheme } from '@react-navigation/native';
import { getDownloadURL } from 'firebase/storage';
import { StyleSheet } from 'react-native';

// Mocks
jest.mock('@react-navigation/native', () => ({
  useTheme: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

// Setup theme mock
const theme = {
  colors: {
    card: 'white',
    text: 'black',
  },
};

beforeEach(() => {
  (useTheme as jest.Mock).mockReturnValue(theme);
  (getDownloadURL as jest.Mock).mockResolvedValue('http://dummyimage.com');
});

describe('CartCard', () => {
  const baseProps = {
    itemName: 'Test Item',
    brandName: 'Test Brand',
    itemCost: 99,
    imagePath: 'path/to/image',
    onRemove: jest.fn(),
    width: 200,
  };

  test('renders correctly', () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    expect(getByText('Test Brand')).toBeTruthy();
    expect(getByText('Test Item')).toBeTruthy();
    expect(getByText('$99')).toBeTruthy();
  });

  test('calls onRemove when remove button is pressed', () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(baseProps.onRemove).toHaveBeenCalled();
  });

  test('applies theme colors correctly', () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    const textComponent = getByText('Test Brand');
  
    // This will check if any of the style objects in an array or a single object contains the correct color
    const style = StyleSheet.flatten(textComponent.props.style); // Flatten the style array if it is an array
    expect(style.color).toMatch(/black|^#000$/); // This regex matches "black" or "#000"
  });
});
