import { Text, View } from "@/components/Themed";
import { Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { resetRouterAndReRoute } from "./_layout";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const { colors } = useTheme();

  const handleRegister = () => {
    if (password === passwordValidation) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((user) => {
          if (user) resetRouterAndReRoute("/(tabs)");
        })
        .catch((err) => {
          alert(err?.message);
        });
    }
  };

  return (
    <View
      className="flex-1 items-center justify-center align-center px-6 flex flex-col w-full space-y-4 pt-8"
      style={{ backgroundColor: colors.background }}
    >
      {/* Email Input*/}
      <View
        className="flex flex-col w-full space-y-1"
        style={{ backgroundColor: colors.background }}
      >
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Email
        </Text>
        <View
          className="w-full flex h-10 border-2 border-slate-500 rounded-md align-middle content-center text-center p-2"
          style={{ backgroundColor: colors.background }}
        >
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="example@email.com"
            onChangeText={(emailInput) => setEmail(emailInput)}
          />
        </View>
      </View>

      {/* Password Input*/}
      <View
        className="flex flex-col w-full space-y-1"
        style={{ backgroundColor: colors.background }}
      >
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Password
        </Text>
        <View
          className="w-full flex h-10 border-2 border-slate-500 rounded-md align-middle content-center text-center p-2"
          style={{ backgroundColor: colors.background }}
        >
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
      <View
        className="flex flex-col w-full space-y-1"
        style={{ backgroundColor: colors.background }}
      >
        <Text
          className="text-md font-semibold text-white"
          style={{ color: colors.text }}
        >
          Confirm Password
        </Text>
        <View
          className="w-full flex h-10 border-2 border-slate-500 rounded-md align-middle content-center text-center p-2"
          style={{ backgroundColor: colors.background }}
        >
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="**********"
            secureTextEntry={true}
            onChangeText={(passwordValidationInput) =>
              setPasswordValidation(passwordValidationInput)
            }
          />
        </View>
      </View>

      {/* Sign Up Button*/}
      <View
        className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <View className="w-full" style={{ backgroundColor: colors.background }}>
          <Pressable
            className="h-10 w-full bg-primaryColor mix-blend-difference rounded-lg text-center items-center justify-center font-semibold"
            onPress={handleRegister}
          >
            <Text className="text-white">Sign Up</Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text
              className="py-6 text-center w-full"
              style={{ color: colors.text }}
            >
              Already have an account?{" "}
              <Text className="text-hyperlinkColor">Log In</Text>
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => resetRouterAndReRoute("/(tabs)")}>
          <Text className="py-6" style={{ color: colors.text }}>
            Continue as Guest
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
