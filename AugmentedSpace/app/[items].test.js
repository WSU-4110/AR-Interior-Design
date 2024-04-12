import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductScreen from '/Users/mahdisulaiman/Desktop/GitHub/AR-Interior-Design/AugmentedSpace/app/item-info/[items].tsx';
import * as Firestore from 'firebase/firestore';
import * as Auth from 'firebase/auth';

describe('ProductScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<ProductScreen />);
    expect(getByText("Sample Brand's Sample Item")).toBeTruthy();
    expect(getByTestId('product-image').props.source.uri).toBe('');
  });

  it('loads and displays image from Firebase storage on mount', async () => {
    const { getByTestId } = render(<ProductScreen />);
    await waitFor(() => expect(getByTestId('product-image').props.source.uri).toBe('mocked-url'));
  });

  it('shows login alert if user tries to add to cart when not signed in', () => {
    Auth.getAuth = jest.fn(() => ({ currentUser: null }));
    const { getByText } = render(<ProductScreen />);
    fireEvent.press(getByText('Add to Cart'));
    expect(Alert.alert).toHaveBeenCalledWith("Sign In Required", "Please sign in to add items to your cart");
  });

  it('adds item to cart successfully when user is signed in', async () => {
    const { getByText } = render(<ProductScreen />);
    fireEvent.press(getByText('Add to Cart'));
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith("Success", "Item added to cart"));
  });

  it('handles Firestore error during add to cart', async () => {
    Firestore.setDoc = jest.fn(() => Promise.reject(new Error('Firestore error')));
    const { getByText } = render(<ProductScreen />);
    fireEvent.press(getByText('Add to Cart'));
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith("Error", "There was an error adding the item to the cart"));
  });

  it('triggers the buy button', () => {
    const { getByText } = render(<ProductScreen />);
    fireEvent.press(getByText(/Buy/));
    expect(Alert.alert).toHaveBeenCalledWith("Buy button pressed");
  });
});