import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native"; // Import act
import CartCard from "../CartCard"; // Assuming the component file is in the same directory
import { useTheme } from "@react-navigation/native";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";

// Mocks
jest.mock("@react-navigation/native", () => ({
  useTheme: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock theme
const theme = {
  colors: {
    card: "white",
    text: "black",
  },
};

beforeEach(() => {
  (useTheme as jest.Mock).mockReturnValue(theme);
  (getDownloadURL as jest.Mock).mockResolvedValue("http://dummyimage.com");
});

describe("CartCard", () => {
  const baseProps = {
    itemName: "Test Item",
    brandName: "Test Brand",
    itemCost: 99,
    imagePath: "path/to/image",
    onRemove: jest.fn(),
    width: 200,
  };

  test("renders correctly", () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    expect(getByText("Test Brand")).toBeTruthy();
    expect(getByText("Test Item")).toBeTruthy();
    expect(getByText("$99")).toBeTruthy();
  });

  test("calls onRemove when remove button is pressed", () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    const removeButton = getByText("Remove");
    fireEvent.press(removeButton);
    expect(baseProps.onRemove).toHaveBeenCalled();
  });

  test("navigates to item info when pressed", () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    fireEvent.press(getByText("Test Brand"));
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/item-info/[items]",
      params: {
        items: "Test Item",
        imageSource: "path/to/image",
        itemCost: 99,
        brandName: "Test Brand",
      },
    });
  });

  test("applies theme colors correctly", () => {
    const { getByText } = render(<CartCard {...baseProps} />);
    const textComponent = getByText("Test Brand");
    const style = textComponent.props.style;
    console.log("Style:", style);

    expect(style).toEqual(
      expect.objectContaining([
        { color: "#000" },
        [{ fontWeight: "bold" }, { color: "black" }],
      ])
    );
  });
});
