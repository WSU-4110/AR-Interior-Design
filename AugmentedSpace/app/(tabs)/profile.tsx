import React, { useEffect, useState } from "react";
import { StatusBar, Platform, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { signOut, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { router } from "expo-router";

const signOutAndReroute = async () => {
  await signOut(getAuth());
  router.replace("/logIn");
};

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}>
        Profile Screen
      </Text>
      <View
        style={{
          marginVertical: 16,
          height: 1,
          width: "80%",
          backgroundColor: colors.border,
        }}
      />

      {currentUser ? (
        <Text style={{ fontSize: 18, color: colors.text }}>
          Logged in as {currentUser?.email}
        </Text>
      ) : (
        <Text style={{ fontSize: 18, color: colors.text }}>
          Currently browsing as a guest.
        </Text>
      )}

      <Pressable
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          marginTop: 16,
        }}
        onPress={currentUser ? signOutAndReroute : () => router.navigate("/logIn")}
      >
        <Text style={{ fontSize: 16, color: "white" }}>
          {currentUser ? "Sign Out" : "Log In"}
        </Text>
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

