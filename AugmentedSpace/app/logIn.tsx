import { Text, View } from "@/components/Themed";
import { Pressable, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import { useNavigation, router } from "expo-router";
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate("signUp");
  };

  const navigateToTabs = () => {
    navigation.navigate("(tabs)");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        if (user) router.replace("/(tabs)");
        // if (user) navigateToTabs();
      })
      .catch((err) => {
        alert(err?.message);
      });
  };

  return (
    <View className="flex-1 items-center justify-center px-6 pt-4 flex flex-col w-full space-y-4">
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
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>

      {/* Password Input*/}
      <View className="flex flex-col w-full space-y-1">
        <Text className="text-md font-semibold" style={{ color: colors.text }}>
          Password
        </Text>
        <View className="w-full flex h-10 rounded border-2 border-slate-500 rounded-r-xl align-middle content-center text-center p-2">
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder="**********"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      {/* Login Button */}
      <View className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center">
        <Pressable
          className="h-10 w-full border-2 bg-slate-500 mix-blend-difference rounded-lg text-white text-center items-center justify-center font-semibold"
          onPress={handleLogin}
        >
          <Text style={{ color: colors.text }}>Login</Text>
        </Pressable>
        <Pressable onPress={navigateToSignUp}>
          <Text className="py-4" style={{ color: colors.text }}>
            Sign Up
          </Text>
        </Pressable>
        <Pressable className="flex-1 justify-end py-8" onPress={navigateToTabs}>
          <Text style={{ color: colors.text }}>Continue as Guest</Text>
        </Pressable>
      </View>
    </View>
  );
}
