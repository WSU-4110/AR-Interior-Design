import { Text, View } from "@/components/Themed";
import { Button, Pressable, TextInput } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Linking } from "react-native";
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebaseConfig";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function LogIn() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goToSignUp = () => {
    // Navigate to SignUp screen
    navigation.navigate("signUp");
  };

  const goToTabs = () => {
    navigation.navigate("(tabs)");
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
          />
        </View>
      </View>

      {/* Register Password */}
      <View className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center">
        <Pressable className="h-10 w-full border-2 bg-slate-500 mix-blend-difference rounded-lg text-white text-center items-center justify-center font-semibold">
          <Text style={{ color: colors.text }}>Login</Text>
        </Pressable>
        <Pressable onPress={goToSignUp}>
          <Text className="py-4" style={{ color: colors.text }}>
            Sign Up
          </Text>
        </Pressable>
        <Pressable className="flex-1 justify-end py-8" onPress={goToTabs}>
          <Text style={{ color: colors.text }}>Continue as Guest</Text>
        </Pressable>
      </View>
    </View>
  );
}
