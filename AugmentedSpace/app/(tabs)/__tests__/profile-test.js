import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { signOut, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {signOutAndReroute} from "../profile.tsx";

//Mock sign out
const mockSignOut = jest.fn();
jest.mock('firebase/auth' , () => ({
    signOut: jest.fn()
}));

//Mock getAuth
const mockGetAuth = jest.fn(() => {
});
jest.mock('firebase/auth', () => ({
    getAuth: mockGetAuth
}));

//Mock router obj
const mockRouterReplace = jest.fn();
const mockRouter = {
    replace: mockRouterReplace
};

jest.mock('expo-router', () => ({
    __esModule: true,
    default: mockRouter
}));

describe('signOutAndReroute', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call signOut and router.replace', async () => {
        await mockGetAuth();
        expect(mockSignOut).toHaveBeenCalled();
        expect(mockRouterReplace).toHaveBeenCalledWith('/logIn');
    });
});