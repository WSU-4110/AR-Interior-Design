import { Text, View } from "@/components/Themed";
import { Pressable, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { resetRouterAndReRoute } from "./_layout";
import { ShowPopup } from "@/components/popup";

export default function LogInScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { colors } = useTheme();

  useEffect(() => {
    const { currentUser } = getAuth();
    if (currentUser) resetRouterAndReRoute("/(tabs)");
  }, []);

  const navigateToSignUp = () => {
    router.navigate("/signUp");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        if (user) resetRouterAndReRoute("/(tabs)");
      })
      .catch((err) => {
        ShowPopup(err?.message);
      });
  };

  return (
    <View
      className="flex-1 items-center justify-center px-6 pt-4 flex flex-col w-full space-y-4"
      style={{ backgroundColor: colors.background }}
    >
      {/* Email Input*/}
      <View
        className="flex flex-col w-full space-y-1 mt-[45%]"
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
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>

      {/* Password Input*/}
      <View
        className="flex flex-col w-full space-y-1"
        style={{ backgroundColor: colors.background }}
      >
        <Text className="text-md font-semibold" style={{ color: colors.text }}>
          Password
        </Text>
        <View
          className="w-full flex h-10 border-2 border-slate-500 rounded-md align-middle content-center text-center p-2"
          style={{ backgroundColor: colors.background }}
        >
          <TextInput
            className="align-middle h-full"
            style={{ color: colors.text }}
            placeholder={"**********"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      {/* Login Button */}
      <View
        className="pt-6 w-full flex-1 flex space-x-2 justify-between align-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <Pressable
          className="h-10 w-full bg-primaryColor mix-blend-difference rounded-lg text-center items-center justify-center font-semibold"
          onPress={handleLogin}
        >
          <Text className="text-white">Login</Text>
        </Pressable>
        <Pressable onPress={null}>
          <Text
            className="py-6 text-center w-full"
            style={{ color: colors.text }}
          >
            Forgot your password?
          </Text>
        </Pressable>

        <Pressable
          className="flex-1 justify-end"
          onPress={() => resetRouterAndReRoute("/(tabs)")}
        >
          <Text style={{ color: colors.text }}>Continue as Guest</Text>
        </Pressable>
        <Pressable onPress={navigateToSignUp}>
          <Text
            className="mt-4 mb-20 text-center w-full"
            style={{ color: colors.text }}
          >
            Don't have an account?{" "}
            <Text className="text-hyperlinkColor"> Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
