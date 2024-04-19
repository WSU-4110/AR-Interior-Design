import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";
import { signOut, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const signOutAndReroute = async () => {
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
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="font-bold text-xl" style={{ color: colors.text }}>
        Profile Screen
      </Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {currentUser ? (
        <Text
          className="text-center my-4 justify-center"
          style={{ color: colors.text }}
        >
          Logged in as {currentUser?.email}
        </Text>
      ) : (
        <Text
          className="text-center my-4 justify-center"
          style={{ color: colors.text }}
        >
          Currently browsing as a guest.
        </Text>
      )}

      {currentUser ? (
        <Pressable
          className="bg-primaryColor py-2 px-4 rounded-md"
          onPress={signOutAndReroute}
        >
          <Text className="text-white">Sign Out</Text>
        </Pressable>
      ) : (
        <Pressable
          className="bg-primaryColor py-2 px-4 rounded-md"
          onPress={() => router.navigate("/logIn")}
        >
          <Text className="text-white">Log In</Text>
        </Pressable>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
