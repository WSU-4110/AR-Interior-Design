import { Text, View } from "@/components/Themed";
import { Pressable, TextInput, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const { colors } = useTheme();

  const navigateToLogin = () => {
    router.navigate("logIn");
  };

  const navigateToTabs = () => {
    router.replace("/(tabs)");
  };

  const handleRegister = () => {
    if (password === passwordValidation) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((user) => {
          // if (user) router.replace("/(tabs)");
          if (user) navigateToTabs();
        })
        .catch((err) => {
          alert(err?.message);
        });
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center align-center px-6 flex flex-col w-full space-y-4 pt-8">
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
            onChangeText={(passwordValidationInput) =>
              setPasswordValidation(passwordValidationInput)
            }
          />
        </View>
      </View>

      {/* Register */}
      <View className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center">
        <View className="w-full">
          <Pressable
            className="h-10 w-full border-2 bg-slate-500 mix-blend-difference rounded-lg text-center items-center justify-center font-semibold"
            onPress={handleRegister}
          >
            <Text style={{ color: colors.text }}>Sign Up</Text>
          </Pressable>
          <Pressable onPress={navigateToLogin}>
            <Text className="py-6" style={{ color: colors.text }}>
              Already have an account? Log In
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={navigateToTabs}>
          <Text className="py-6" style={{ color: colors.text }}>
            Continue as Guest
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
