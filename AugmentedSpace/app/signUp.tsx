import { Text, View } from "@/components/Themed";
import { Button, Pressable, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { Linking } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "expo-router";

export default function SignUp() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const goToSignUp = () => {
    // Navigate to SignUp screen
    navigation.navigate("logIn");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  return (
    <View className="flex-1 items-center justify-center align-center px-6 flex flex-col w-full space-y-4 pt-8">
      {/* Email Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Email
        </Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center p-2">
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="example@email.com"
            onChangeText={(emailInput) => setEmail(emailInput)}
          />
        </View>
      </View>

      {/* Password Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Password
        </Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center p-2">
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="**********"
            secureTextEntry={true}
            onChangeText={(passwordInput) => setPassword(passwordInput)}
          />
        </View>
      </View>

      {/* Confirm Password Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Confirm Password
        </Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center p-2">
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="**********"
            secureTextEntry={true}
          />
        </View>
      </View>

      {/* Register */}
      <View className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center">
        <Pressable className="h-10 w-full border-2 bg-slate-500 mix-blend-difference rounded-lg text-center items-center justify-center font-semibold">
          <Text style={{ color: colors.text }}>Sign Up</Text>
        </Pressable>
        <Text className="py-6" style={{ color: colors.text }}>
          Already have an account? Log In
        </Text>
      </View>
    </View>
  );
}
