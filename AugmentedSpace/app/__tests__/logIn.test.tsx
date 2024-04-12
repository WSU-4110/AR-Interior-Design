import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LogInScreen from "../logIn";
import { ShowPopup } from "@/components/popup";
import { resetRouterAndReRoute } from "../_layout";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
  signInWithEmailAndPassword: jest
    .fn()
    .mockResolvedValueOnce({ user: { uid: "testUserId" } }),
  signOut: jest.fn(),
}));

// Mock resetRouterAndReRoute and ShowPopup functions
jest.mock("../_layout", () => ({
  resetRouterAndReRoute: jest.fn(),
}));
jest.mock("@/components/popup", () => ({
  ShowPopup: jest.fn(),
}));

// Mock the handleContinueAsGuest function
const handleContinueAsGuestMock = jest.fn();

jest.mock("../logIn", () => ({
  __esModule: true,
  default: () => ({
    handleContinueAsGuest: handleContinueAsGuestMock,
  }),
}));

// Mock router module
import { router } from "expo-router";
jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe("LogInScreen", () => {
  it("renders email and password inputs", () => {
    const { getByPlaceholderText } = render(<LogInScreen />);
    expect(getByPlaceholderText("example@email.com")).toBeTruthy();
    expect(getByPlaceholderText("**********")).toBeTruthy();
  });

  it("calls handleLogin function on pressing Login button", () => {
    const { getByText } = render(<LogInScreen />);
    const loginButton = getByText("Login");
    fireEvent.press(loginButton);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it("calls navigateToSignUp function on pressing Sign Up button", () => {
    const { getByText } = render(<LogInScreen />);
    const signUpButton = getByText("Sign Up");
    fireEvent.press(signUpButton);
    // Assert navigation
    expect(router.navigate).toHaveBeenCalledWith("/signUp");
  });

  it("calls handleContinueAsGuest function on pressing Continue as Guest button", () => {
    const { getByText } = render(<LogInScreen />);
    const continueAsGuestButton = getByText("Continue as Guest");
    fireEvent.press(continueAsGuestButton);

    // Expect handleContinueAsGuest to be called
    expect(handleContinueAsGuestMock).toHaveBeenCalledTimes(1);

    // Optionally, you can also check other expectations within handleContinueAsGuest
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(resetRouterAndReRoute).toHaveBeenCalledWith("/(tabs)");
  });

  it("logs in with valid email and password", async () => {
    const { getByPlaceholderText, getByText } = render(<LogInScreen />);
    const emailInput = getByPlaceholderText("example@email.com");
    const passwordInput = getByPlaceholderText("**********");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(loginButton);

    // Wait for asynchronous actions to complete
    await new Promise((r) => setTimeout(r, 100));

    // Expect that user logged in successfully
    expect(console.log).toHaveBeenCalledWith("User logged in successfully");
    expect(console.log).toHaveBeenCalledWith("User ID: ", "testUserId");
    expect(resetRouterAndReRoute).toHaveBeenCalledWith("/(tabs)");
  });

  it("shows error message on login failure", async () => {
    // Cast signInWithEmailAndPassword to jest.Mock and use mockRejectedValueOnce
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      message: "Login failed",
    });

    const { getByText } = render(<LogInScreen />);
    const loginButton = getByText("Login");
    fireEvent.press(loginButton);

    // Wait for asynchronous actions to complete
    await new Promise((r) => setTimeout(r, 100));

    // Expect that error message is shown
    expect(ShowPopup).toHaveBeenCalledWith("Login failed");
  });
});
