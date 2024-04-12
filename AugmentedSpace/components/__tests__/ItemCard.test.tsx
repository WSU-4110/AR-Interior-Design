import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ItemCard from "../ItemCard";
import FavButton from "../favButton";
import { router } from "expo-router";

// Mock firebase functions
jest.mock("@firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("https://example.com/image.jpg"),
}));

jest.mock("@firebase/auth", () => ({
  getAuth: jest.fn().mockReturnValue({ currentUser: {} }),
  onAuthStateChanged: () => jest.fn(),
}));

jest.mock("@firebase/firestore", () => ({
  collection: jest.fn().mockReturnValue({
    doc: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: () => ({
          // Mock data you expect to retrieve from Firestore
          itemName: "Mock Item",
          brandName: "Mock Brand",
          itemCost: 20,
        }),
      }),
    }),
  }),
}));

describe("ItemCard", () => {
  //props for each test
  const mockProps = {
    UUID: "123",
    itemName: "Item Name",
    brandName: "Brand Name",
    itemCost: 10,
    imagePath: "path/to/image",
    onPress: jest.fn(),
  };

  test("renders", async () => {
    render(<ItemCard {...mockProps} />);
  });

  //test vital card functions operate
  test("card renders correctly", async () => {
    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);

    // Check if item details are rendered correctly
    expect(getByText("Item Name")).toBeTruthy();
    expect(getByText("Brand Name")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
  });

  test("card button renders correctly", async () => {
    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);
    const cardButton = getByTestId("card-button");
    fireEvent.press(cardButton);
    expect(mockProps.onPress).toHaveBeenCalled();
  });

  test("ar button renders correctly", async () => {
    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);
    const onPress = jest.fn();
    // Simulate press on Quick Action Button
    const arButton = getByTestId("ar-button");
    fireEvent.press(arButton);
    expect(mockProps.onPress).toHaveBeenCalled();
  });

  test("cart button renders correctly", async () => {
    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);
    const cartButton = getByTestId("cart-button");
    fireEvent.press(cartButton);
    expect(mockProps.onPress).toHaveBeenCalled();
  });

  //test whether uri of image matches uri set by props
  test("image renders correctly", async () => {
    const { getByText, getByTestId } = render(<ItemCard {...mockProps} />);

    // Check if image is rendered correctly
    const image = getByTestId("item-image");
    expect(image.props.source).toEqual({
      uri: "https://example.com/image.jpg",
    });
  });
});
